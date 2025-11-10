<template>
  <div class="icon-picker">
    <el-input
      v-model="inputValue"
      :placeholder="placeholder"
      clearable
      @input="handleInput"
      @clear="handleClear"
    >
      <template #prepend>
        <el-button @click="showDialog = true" :icon="Search">选择图标</el-button>
      </template>
      <template #append v-if="currentIcon">
        <el-icon class="preview-icon"><component :is="currentIcon" /></el-icon>
      </template>
    </el-input>

    <el-dialog
      v-model="showDialog"
      title="选择图标"
      width="800px"
      :close-on-click-modal="false"
    >
      <div class="icon-picker-dialog">
        <!-- 搜索框 -->
        <el-input
          v-model="searchKeyword"
          placeholder="搜索图标..."
          clearable
          :prefix-icon="Search"
          style="margin-bottom: 16px"
        />

        <!-- 图标分类标签 -->
        <div class="icon-categories" style="margin-bottom: 16px">
          <el-tag
            v-for="category in categoryList"
            :key="category.key"
            :type="selectedCategory === category.key ? 'primary' : 'info'"
            class="category-tag"
            @click="selectedCategory = category.key"
            style="cursor: pointer; margin-right: 8px; margin-bottom: 8px"
          >
            {{ category.label }}
          </el-tag>
        </div>

        <!-- 图标网格 -->
        <div class="icon-grid-container">
          <div
            v-if="filteredIcons.length === 0"
            class="no-icons"
            style="text-align: center; padding: 40px; color: #909399"
          >
            未找到匹配的图标
          </div>
          <div
            v-else
            class="icon-grid"
          >
            <div
              v-for="iconName in filteredIcons"
              :key="iconName"
              class="icon-item"
              :class="{ 'icon-item-selected': isIconSelected(iconName) }"
              @click="selectIcon(iconName)"
              :title="iconName"
            >
              <el-icon :size="24">
                <component :is="iconName" />
              </el-icon>
              <span class="icon-name">{{ iconName }}</span>
            </div>
          </div>
        </div>
      </div>

      <template #footer>
        <div style="display: flex; justify-content: space-between; align-items: center">
          <span style="color: #909399; font-size: 12px">
            共 {{ filteredIcons.length }} 个图标
          </span>
          <div>
            <el-button @click="handleCancel">取消</el-button>
            <el-button type="primary" @click="handleConfirm">确定</el-button>
          </div>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { getAllIconNames, isElementIconName, iconCategories } from '@/utils/iconHelper'

interface Props {
  modelValue?: string
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: '请输入图标名称或点击选择'
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const showDialog = ref(false)
const searchKeyword = ref('')
const selectedCategory = ref<string | null>(null)
const inputValue = ref(props.modelValue)
const pendingIcon = ref<string>('')
// 保存打开对话框时的原始值，用于取消时恢复
const originalValueOnOpen = ref<string>('')

// 所有图标列表
const allIcons = getAllIconNames()

// 分类列表
const categoryList = [
  { key: null, label: '全部' },
  { key: 'basic', label: '基础操作' },
  { key: 'navigation', label: '导航' },
  { key: 'media', label: '媒体' },
  { key: 'communication', label: '通信' },
  { key: 'user', label: '用户' },
  { key: 'data', label: '数据' },
  { key: 'ui', label: '界面' },
  { key: 'business', label: '业务' },
  { key: 'other', label: '其他' }
]

// 根据分类和搜索关键词过滤图标
const filteredIcons = computed(() => {
  let icons = allIcons

  // 按分类过滤
  if (selectedCategory.value) {
    const categoryIcons = iconCategories[selectedCategory.value as keyof typeof iconCategories] || []
    if (categoryIcons.length > 0) {
      icons = icons.filter(icon => categoryIcons.includes(icon))
    }
  }

  // 按关键词过滤
  if (searchKeyword.value) {
    const lowerKeyword = searchKeyword.value.toLowerCase()
    icons = icons.filter(icon => icon.toLowerCase().includes(lowerKeyword))
  }

  return icons
})

// 当前选中的图标组件
const currentIcon = computed(() => {
  const iconValue = inputValue.value || props.modelValue
  if (!iconValue) return null
  // 检查是否是 Element Plus 图标名称（去除可能的 el-icon- 前缀）
  const iconName = iconValue.replace(/^el-icon-/, '')
  if (isElementIconName(iconName)) {
    return iconName
  }
  // 也检查原始值
  if (isElementIconName(iconValue)) {
    return iconValue
  }
  return null
})

// 判断图标是否被选中（包括已确认的和待确认的）
const isIconSelected = (iconName: string): boolean => {
  return props.modelValue === iconName || pendingIcon.value === iconName
}

// 选择图标（立即更新，提供即时反馈）
const selectIcon = (iconName: string) => {
  pendingIcon.value = iconName
  inputValue.value = iconName
  emit('update:modelValue', iconName)
}

// 取消选择（恢复原值并关闭对话框）
const handleCancel = () => {
  // 恢复打开对话框时的原始值
  if (inputValue.value !== originalValueOnOpen.value) {
    inputValue.value = originalValueOnOpen.value
    emit('update:modelValue', originalValueOnOpen.value)
  }
  showDialog.value = false
  pendingIcon.value = ''
}

// 确认选择（关闭对话框）
const handleConfirm = () => {
  showDialog.value = false
  // 清空待确认状态，因为值已经通过 selectIcon 更新了
  pendingIcon.value = ''
}

// 输入框输入处理
const handleInput = (value: string) => {
  inputValue.value = value
  emit('update:modelValue', value)
}

// 清空处理
const handleClear = () => {
  inputValue.value = ''
  emit('update:modelValue', '')
}

// 监听外部值变化
watch(() => props.modelValue, (newValue) => {
  if (newValue !== inputValue.value) {
    inputValue.value = newValue
  }
})

// 监听对话框打开，重置搜索和分类
watch(showDialog, (isOpen) => {
  if (isOpen) {
    // 保存打开对话框时的原始值
    originalValueOnOpen.value = props.modelValue || inputValue.value || ''
    searchKeyword.value = ''
    selectedCategory.value = null
    // 初始化待确认图标为当前值
    pendingIcon.value = originalValueOnOpen.value
  } else {
    // 对话框关闭时，清空待确认状态
    pendingIcon.value = ''
    originalValueOnOpen.value = ''
  }
})
</script>

<style scoped>
.icon-picker {
  width: 100%;
}

.preview-icon {
  color: var(--el-color-primary);
}

.icon-picker-dialog {
  max-height: 60vh;
  overflow-y: auto;
}

.icon-categories {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.category-tag {
  cursor: pointer;
  transition: all 0.3s;
}

.category-tag:hover {
  transform: scale(1.05);
}

.icon-grid-container {
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid var(--el-border-color);
  border-radius: 4px;
  padding: 12px;
}

.icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 12px;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 8px;
  border: 1px solid var(--el-border-color);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  background: var(--el-bg-color);
}

.icon-item:hover {
  border-color: var(--el-color-primary);
  background: var(--el-color-primary-light-9);
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.icon-item-selected {
  border-color: var(--el-color-primary);
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}

.icon-name {
  margin-top: 8px;
  font-size: 12px;
  color: var(--el-text-color-regular);
  text-align: center;
  word-break: break-all;
  line-height: 1.2;
}

.icon-item-selected .icon-name {
  color: var(--el-color-primary);
  font-weight: 500;
}

.no-icons {
  padding: 40px;
  text-align: center;
  color: var(--el-text-color-secondary);
}
</style>

