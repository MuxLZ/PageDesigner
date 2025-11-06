<template>
  <div class="preview-page">
    <div v-if="!pageConfig" class="preview-loader">
      <div class="loader-container">
        <h2>页面预览</h2>
        <p class="loader-description">请上传您的页面配置文件（JSON格式）</p>
        
        <el-upload
          ref="uploadRef"
          :auto-upload="false"
          :on-change="handleFileChange"
          :show-file-list="false"
          accept=".json,application/json"
          drag
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">
            将文件拖到此处，或<em>点击上传</em>
          </div>
          <template #tip>
            <div class="el-upload__tip">
              支持 JSON 格式的页面配置文件
            </div>
          </template>
        </el-upload>

        <el-divider>或者</el-divider>

        <el-button 
          type="primary" 
          @click="loadFromLocalStorage"
          :disabled="!hasLocalConfig"
        >
          从本地存储加载
        </el-button>

        <div v-if="error" class="error-message">
          <el-alert
            :title="error"
            type="error"
            :closable="true"
            @close="error = ''"
          />
        </div>
      </div>
    </div>

    <div v-else class="preview-content">
      <div 
        class="preview-toolbar" 
        :class="{ 'toolbar-hidden': !showToolbar }"
        @mouseenter="showToolbar = true"
        @mouseleave="handleToolbarMouseLeave"
      >
        <div class="toolbar-left">
          <span class="page-name">{{ pageConfig.name }}</span>
        </div>
        <div class="toolbar-right">
          <el-button size="small" @click="downloadConfig">
            <el-icon><Download /></el-icon>
            下载配置
          </el-button>
          <el-button size="small" @click="resetPreview">
            <el-icon><Refresh /></el-icon>
            重新加载
          </el-button>
          <el-button size="small" type="primary" @click="editInDesigner">
            <el-icon><Edit /></el-icon>
            在设计器中编辑
          </el-button>
          <el-button size="small" @click="toggleToolbar">
            <el-icon><Hide v-if="showToolbar" /><View v-else /></el-icon>
            {{ showToolbar ? '隐藏' : '显示' }}
          </el-button>
        </div>
      </div>

      <!-- 悬浮按钮，用于显示工具栏 -->
      <div 
        v-if="!showToolbar" 
        class="toolbar-toggle-btn"
        @click="showToolbar = true"
      >
        <el-icon><Setting /></el-icon>
      </div>

      <PageRenderer 
        :config="pageConfig" 
        :selectable="false"
        :is-designer="false"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { UploadFilled, Download, Refresh, Edit, Hide, View, Setting } from '@element-plus/icons-vue'
import type { PageConfig } from '@/types/module'
import { ConfigGenerator } from '@/core/ConfigGenerator'
import PageRenderer from '@/core/PageRenderer.vue'

const router = useRouter()
const route = useRoute()

const pageConfig = ref<PageConfig | null>(null)
const error = ref('')
const uploadRef = ref()
const hasLocalConfig = ref(false)
const showToolbar = ref(true)
let toolbarHideTimer: number | null = null

onMounted(() => {
  checkLocalStorage()
  loadFromURL()
})

const checkLocalStorage = () => {
  try {
    const stored = localStorage.getItem('pageConfig')
    hasLocalConfig.value = !!stored
  } catch (e) {
    hasLocalConfig.value = false
  }
}

const loadFromURL = () => {
  const configParam = route.query.config as string
  if (configParam) {
    try {
      const decoded = decodeURIComponent(configParam)
      const config = ConfigGenerator.importConfig(decoded)
      pageConfig.value = config as PageConfig
      ElMessage.success('配置加载成功')
      // 加载完成后3秒自动隐藏工具栏
      setTimeout(() => {
        showToolbar.value = false
      }, 3000)
    } catch (e: any) {
      error.value = '从URL加载配置失败：' + (e.message || '配置格式错误')
    }
  }
}

const handleFileChange = (file: any) => {
  const reader = new FileReader()
  reader.onload = (e: any) => {
    try {
      const config = ConfigGenerator.importConfig(e.target.result)
      pageConfig.value = config as PageConfig
      localStorage.setItem('pageConfig', JSON.stringify(config))
      hasLocalConfig.value = true
      router.replace({
        query: {
          ...route.query,
          config: encodeURIComponent(JSON.stringify(config))
        }
      })
      ElMessage.success('配置加载成功')
      error.value = ''
      // 加载完成后3秒自动隐藏工具栏
      setTimeout(() => {
        showToolbar.value = false
      }, 3000)
    } catch (e: any) {
      error.value = '加载配置失败：' + (e.message || '配置文件格式错误')
      pageConfig.value = null
    }
  }
  reader.onerror = () => {
    error.value = '读取文件失败'
    pageConfig.value = null
  }
  reader.readAsText(file.raw)
}

const loadFromLocalStorage = () => {
  try {
    const stored = localStorage.getItem('pageConfig')
    if (stored) {
      const config = ConfigGenerator.importConfig(stored)
      pageConfig.value = config as PageConfig
      ElMessage.success('从本地存储加载成功')
      error.value = ''
      // 加载完成后3秒自动隐藏工具栏
      setTimeout(() => {
        showToolbar.value = false
      }, 3000)
    } else {
      ElMessage.warning('本地存储中没有配置')
    }
  } catch (e: any) {
    error.value = '从本地存储加载失败：' + (e.message || '配置格式错误')
  }
}

const downloadConfig = () => {
  if (!pageConfig.value) return
  const json = ConfigGenerator.exportConfig(pageConfig.value)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${pageConfig.value.name}.json`
  a.click()
  URL.revokeObjectURL(url)
  ElMessage.success('配置已下载')
}

const resetPreview = () => {
  pageConfig.value = null
  error.value = ''
  router.replace({ query: {} })
  checkLocalStorage()
}

const editInDesigner = () => {
  if (pageConfig.value) {
    localStorage.setItem('pageConfig', JSON.stringify(pageConfig.value))
    router.push({
      path: '/designer',
      query: { loadConfig: 'true' }
    })
  }
}

const toggleToolbar = () => {
  showToolbar.value = !showToolbar.value
}

const handleToolbarMouseLeave = () => {
  // 鼠标离开工具栏时，延迟隐藏
  if (toolbarHideTimer) {
    clearTimeout(toolbarHideTimer)
  }
  toolbarHideTimer = window.setTimeout(() => {
    showToolbar.value = false
  }, 1000)
}
</script>

<style scoped>
.preview-page {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.preview-loader {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
}

.loader-container {
  max-width: 600px;
  width: 100%;
  background: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.loader-container h2 {
  margin: 0 0 10px 0;
  text-align: center;
  color: #333;
}

.loader-description {
  text-align: center;
  color: #666;
  margin-bottom: 30px;
}

:deep(.el-upload) {
  width: 100%;
}

:deep(.el-upload-dragger) {
  width: 100%;
  padding: 40px;
}

.el-divider {
  margin: 20px 0;
}

:deep(.el-button) {
  width: 100%;
  margin-top: 10px;
}

.error-message {
  margin-top: 20px;
}

.preview-content {
  background: white;
}

.preview-toolbar {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 12px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, opacity 0.3s ease;
  transform: translateY(0);
  opacity: 1;
}

.preview-toolbar.toolbar-hidden {
  transform: translateY(-100%);
  opacity: 0;
  pointer-events: none;
}

.toolbar-left {
  display: flex;
  align-items: center;
}

.page-name {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.toolbar-right {
  display: flex;
  gap: 10px;
}

:deep(.el-button) {
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.toolbar-toggle-btn {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1001;
  width: 40px;
  height: 40px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.toolbar-toggle-btn:hover {
  background: #f5f5f5;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transform: scale(1.1);
}

.toolbar-toggle-btn .el-icon {
  font-size: 20px;
  color: #333;
}
</style>
