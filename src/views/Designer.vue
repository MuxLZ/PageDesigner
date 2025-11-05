<template>
  <div class="designer-container">
    <!-- 工具栏 -->
    <div class="designer-toolbar">
      <div class="toolbar-left">
        <h2>页面设计器</h2>
        <el-button type="primary" @click="saveConfig">保存配置</el-button>
        <el-button @click="exportConfig">导出配置</el-button>
        <el-button @click="importConfig">导入配置</el-button>
      </div>
      <div class="toolbar-right">
        <el-button @click="previewMode = !previewMode">
          {{ previewMode ? '编辑模式' : '预览模式' }}
        </el-button>
      </div>
    </div>

    <div class="designer-content">
      <!-- 左侧：模块库 -->
      <div v-if="!previewMode" class="designer-sidebar">
        <div class="sidebar-section">
          <h3>模块库</h3>
          <div class="module-library">
            <div
              v-for="moduleType in availableModules"
              :key="moduleType"
              class="module-item"
              @click="addModule(moduleType)"
            >
              <el-icon><component :is="getModuleIcon(moduleType)" /></el-icon>
              <span>{{ getModuleName(moduleType) }}</span>
            </div>
          </div>
        </div>

        <!-- 页面设置 -->
        <div class="sidebar-section">
          <h3>页面设置</h3>
          <el-form label-width="80px" size="small">
            <el-form-item label="页面名称">
              <el-input v-model="pageConfig.name" />
            </el-form-item>
            <el-form-item label="路由路径">
              <el-input v-model="pageConfig.route" />
            </el-form-item>
          </el-form>
        </div>

        <!-- 全局样式 -->
        <div class="sidebar-section">
          <h3>全局样式</h3>
          <el-form label-width="80px" size="small">
            <el-form-item label="主题色">
              <el-color-picker v-model="globalTheme.primary" />
            </el-form-item>
            <el-form-item label="次色">
              <el-color-picker v-model="globalTheme.secondary" />
            </el-form-item>
            <el-form-item label="背景色">
              <el-color-picker v-model="globalTheme.background" />
            </el-form-item>
          </el-form>
        </div>
      </div>

      <!-- 中间：页面预览 -->
      <div class="designer-preview">
        <div class="preview-container">
          <PageRenderer
            :config="pageConfig"
            :selectable="!previewMode"
            :selected-module-id="selectedModule?.id"
            @module-select="selectModule"
          />
        </div>
      </div>

      <!-- 右侧：属性面板或模块列表 -->
      <div v-if="!previewMode" class="designer-right-panel">
        <!-- 属性面板 -->
        <div v-if="selectedModule" class="designer-properties">
        <div class="properties-header">
          <h3>{{ selectedModule.name }} - 属性设置</h3>
          <el-button type="danger" size="small" @click="deleteModule">删除模块</el-button>
        </div>

        <div class="properties-content">
          <!-- 基础设置 -->
          <el-collapse v-model="activeCollapse">
            <el-collapse-item title="基础设置" name="basic">
              <el-form label-width="100px" size="small">
                <el-form-item label="模块名称">
                  <el-input v-model="selectedModule.name" />
                </el-form-item>
                <el-form-item label="是否显示">
                  <el-switch v-model="selectedModule.visible" />
                </el-form-item>
                <el-form-item label="排序">
                  <el-input-number v-model="selectedModule.order" :min="0" />
                </el-form-item>
              </el-form>
            </el-collapse-item>

            <!-- 样式设置 -->
            <el-collapse-item title="样式设置" name="style">
              <el-form label-width="100px" size="small">
                <el-form-item label="背景色">
                  <el-color-picker v-model="selectedModule.style.backgroundColor" />
                </el-form-item>
                <el-form-item label="内边距">
                  <el-input v-model="selectedModule.style.padding" placeholder="例: 20px" />
                </el-form-item>
                <el-form-item label="外边距">
                  <el-input v-model="selectedModule.style.margin" placeholder="例: 20px" />
                </el-form-item>
                <el-form-item label="字体大小">
                  <el-input v-model="selectedModule.style.font.size" placeholder="例: 16px" />
                </el-form-item>
                <el-form-item label="字体颜色">
                  <el-color-picker v-model="selectedModule.style.font.color" />
                </el-form-item>
              </el-form>
            </el-collapse-item>

            <!-- 动画效果 -->
            <el-collapse-item title="动画效果" name="effect">
              <el-form label-width="100px" size="small">
                <el-form-item label="效果类型">
                  <el-select v-model="selectedModule.effect.type" placeholder="选择效果">
                    <el-option label="淡入淡出" value="fade" />
                    <el-option label="滑动" value="slide" />
                    <el-option label="缩放" value="zoom" />
                    <el-option label="旋转" value="rotate" />
                  </el-select>
                </el-form-item>
                <el-form-item label="持续时间">
                  <el-input-number v-model="selectedModule.effect.duration" :min="0" />
                </el-form-item>
                <el-form-item label="延迟">
                  <el-input-number v-model="selectedModule.effect.delay" :min="0" />
                </el-form-item>
              </el-form>
            </el-collapse-item>

            <!-- 模块特定配置 -->
            <el-collapse-item title="模块配置" name="module">
              <div v-if="selectedModule">
                <el-form label-width="100px" size="small">
                  <el-form-item v-if="selectedModule.type === 'carousel'" label="轮播高度">
                    <el-input v-model="(selectedModule as any).height" />
                  </el-form-item>
                  <el-form-item v-if="selectedModule.type === 'grid'" label="列数">
                    <el-input-number v-model="(selectedModule as any).columns" :min="1" :max="12" />
                  </el-form-item>
                  <el-form-item v-if="selectedModule.type === 'stats'" label="列数">
                    <el-input-number v-model="(selectedModule as any).columns" :min="1" :max="6" />
                  </el-form-item>
                  <!-- 可以根据不同模块类型添加更多配置项 -->
                </el-form>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
        </div>

        <!-- 模块列表 -->
        <div class="designer-module-list">
          <div class="module-list-header">
            <h3>模块列表</h3>
            <el-button
              v-if="selectedModule"
              type="text"
              size="small"
              @click="selectedModule = null"
            >
              取消选择
            </el-button>
          </div>
          <div class="module-list">
            <div
              v-for="(module, index) in sortedModules"
              :key="module.id"
              class="module-list-item"
              :class="{ active: selectedModule?.id === module.id }"
              @click="selectModule(module)"
            >
              <div class="module-item-info">
                <el-icon><component :is="getModuleIcon(module.type)" /></el-icon>
                <span>{{ module.name }}</span>
              </div>
              <div class="module-item-actions">
                <el-switch v-model="module.visible" size="small" @click.stop />
                <el-button type="text" size="small" @click.stop="deleteModuleById(module.id)">删除</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { Edit } from '@element-plus/icons-vue'
import type { PageConfig, ModuleConfig } from '@/types/module'
import { ModuleType } from '@/types/module'
import { ConfigGenerator } from '@/core/ConfigGenerator'
import { StyleSystem } from '@/core/StyleSystem'
import PageRenderer from '@/core/PageRenderer.vue'

// 页面配置
const pageConfig = ref<PageConfig>(ConfigGenerator.generateDefaultPageConfig('新页面', '/new-page'))

// 选中的模块
const selectedModule = ref<ModuleConfig | null>(null)

// 预览模式
const previewMode = ref(false)

// 折叠面板
const activeCollapse = ref(['basic', 'style', 'effect', 'module'])

// 全局主题
const globalTheme = computed({
  get: () => pageConfig.value.globalStyle?.theme || StyleSystem.createDefaultTheme(),
  set: (val) => {
    if (!pageConfig.value.globalStyle) {
      pageConfig.value.globalStyle = {}
    }
    pageConfig.value.globalStyle.theme = val
    StyleSystem.applyThemeToCSS(val)
  }
})

// 可用模块列表
const availableModules = [
  ModuleType.HEADER,
  ModuleType.CAROUSEL,
  ModuleType.GRID,
  ModuleType.COLUMN,
  ModuleType.STATS,
  ModuleType.TIMELINE,
  ModuleType.FOOTER
]

// 排序后的模块
const sortedModules = computed(() => {
  return ConfigGenerator.sortModules(pageConfig.value.modules)
})

// 获取模块图标
const getModuleIcon = (type: ModuleType) => {
  const iconMap: Record<ModuleType, string> = {
    [ModuleType.HEADER]: 'Menu',
    [ModuleType.FOOTER]: 'Grid',
    [ModuleType.CAROUSEL]: 'Picture',
    [ModuleType.GRID]: 'Grid',
    [ModuleType.COLUMN]: 'Menu',
    [ModuleType.TIMELINE]: 'Clock',
    [ModuleType.STATS]: 'DataAnalysis',
    [ModuleType.PRODUCTS]: 'Box',
    [ModuleType.NEWS]: 'Document',
    [ModuleType.PARTNERS]: 'Connection',
    [ModuleType.CONTACT]: 'Phone',
    [ModuleType.ABOUT]: 'InfoFilled',
    [ModuleType.TEAM]: 'User',
    [ModuleType.HONORS]: 'Trophy',
    [ModuleType.CULTURE]: 'Star',
    [ModuleType.SOLUTIONS]: 'Setting'
  }
  return iconMap[type] || 'Box'
}

// 获取模块名称
const getModuleName = (type: ModuleType) => {
  const nameMap: Record<ModuleType, string> = {
    [ModuleType.HEADER]: '导航栏',
    [ModuleType.FOOTER]: '页脚',
    [ModuleType.CAROUSEL]: '轮播',
    [ModuleType.GRID]: '宫格',
    [ModuleType.COLUMN]: '分栏',
    [ModuleType.TIMELINE]: '时间轴',
    [ModuleType.STATS]: '数据统计',
    [ModuleType.PRODUCTS]: '产品展示',
    [ModuleType.NEWS]: '新闻资讯',
    [ModuleType.PARTNERS]: '合作伙伴',
    [ModuleType.CONTACT]: '联系我们',
    [ModuleType.ABOUT]: '公司简介',
    [ModuleType.TEAM]: '团队介绍',
    [ModuleType.HONORS]: '资质荣誉',
    [ModuleType.CULTURE]: '企业文化',
    [ModuleType.SOLUTIONS]: '解决方案'
  }
  return nameMap[type] || type
}

// 添加模块
const addModule = (type: ModuleType) => {
  const defaultConfig = ConfigGenerator.generateDefaultModuleConfig(type, getModuleName(type))
  const newModule: ModuleConfig = {
    ...defaultConfig,
    id: `module-${type}-${Date.now()}`,
    order: pageConfig.value.modules.length,
    style: {
      backgroundColor: '',
      padding: StyleSystem.createSpacingConfig({ top: '20px', bottom: '20px' }),
      margin: StyleSystem.createSpacingConfig({ top: '0', bottom: '0' }),
      font: StyleSystem.createFontConfig()
    },
    effect: {
      type: 'fade' as any,
      duration: 600,
      delay: 0,
      enabled: true
    }
  } as ModuleConfig
  
  pageConfig.value.modules.push(newModule)
  selectModule(newModule)
  ElMessage.success(`已添加${getModuleName(type)}模块`)
}

// 选择模块
const selectModule = (module: ModuleConfig) => {
  // 从模块数组中获取最新的模块引用，确保响应式
  const moduleIndex = pageConfig.value.modules.findIndex(m => m.id === module.id)
  if (moduleIndex > -1) {
    selectedModule.value = pageConfig.value.modules[moduleIndex]
  } else {
    selectedModule.value = module
  }
}

// 删除模块
const deleteModule = () => {
  if (selectedModule.value) {
    deleteModuleById(selectedModule.value.id)
  }
}

// 根据ID删除模块
const deleteModuleById = (id: string) => {
  const index = pageConfig.value.modules.findIndex(m => m.id === id)
  if (index > -1) {
    pageConfig.value.modules.splice(index, 1)
    selectedModule.value = null
    ElMessage.success('模块已删除')
  }
}

// 更新模块配置
const updateModuleConfig = (updates: Partial<ModuleConfig>) => {
  if (selectedModule.value) {
    Object.assign(selectedModule.value, updates)
  }
}


// 保存配置
const saveConfig = () => {
  // 保存到本地存储或后端
  localStorage.setItem('pageConfig', JSON.stringify(pageConfig.value))
  ElMessage.success('配置已保存')
}

// 导出配置
const exportConfig = () => {
  const json = ConfigGenerator.exportConfig(pageConfig.value)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${pageConfig.value.name}.json`
  a.click()
  URL.revokeObjectURL(url)
  ElMessage.success('配置已导出')
}

// 导入配置
const importConfig = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'application/json'
  input.onchange = (e: any) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e: any) => {
        try {
          const config = ConfigGenerator.importConfig(e.target.result)
          pageConfig.value = config as PageConfig
          ElMessage.success('配置已导入')
        } catch (error) {
          ElMessage.error('导入失败：配置文件格式错误')
        }
      }
      reader.readAsText(file)
    }
  }
  input.click()
}

// 监听全局主题变化
watch(globalTheme, (newTheme) => {
  StyleSystem.applyThemeToCSS(newTheme)
}, { deep: true })
</script>

<style scoped>
.designer-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.designer-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: white;
  border-bottom: 1px solid var(--border-color);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.toolbar-left {
  display: flex;
  align-items: center;
  gap: 15px;
}

.toolbar-left h2 {
  margin: 0;
  font-size: 1.25rem;
}

.designer-content {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.designer-sidebar {
  width: 280px;
  background: white;
  border-right: 1px solid var(--border-color);
  overflow-y: auto;
  padding: 20px;
}

.sidebar-section {
  margin-bottom: 30px;
}

.sidebar-section h3 {
  font-size: 1rem;
  margin-bottom: 15px;
  color: var(--dark-color);
}

.module-library {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.module-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
}

.module-item:hover {
  background: var(--light-color);
  border-color: var(--primary-color);
}

.designer-preview {
  flex: 1;
  overflow-y: auto;
  background: #f5f5f5;
  padding: 20px;
}

.preview-container {
  max-width: 100%;
  margin: 0 auto;
  background: white;
  min-height: 100%;
}

.designer-right-panel {
  width: 320px;
  background: white;
  border-left: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.designer-properties {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.properties-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.properties-header h3 {
  font-size: 1rem;
  margin: 0;
}

.properties-content {
  /* 属性面板内容样式 */
}

.designer-module-list {
  border-top: 1px solid var(--border-color);
  max-height: 300px;
  overflow-y: auto;
  padding: 20px;
  background: var(--light-color);
}

.module-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.module-list-header h3 {
  font-size: 1rem;
  margin: 0;
  color: var(--dark-color);
}

.module-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.module-list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
}

.module-list-item:hover {
  background: var(--light-color);
}

.module-list-item.active {
  border-color: var(--primary-color);
  background: var(--light-color);
}

.module-item-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.module-item-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>

