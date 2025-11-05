<template>
  <div class="page-renderer" :style="pageStyles">
    <div
      v-for="module in sortedVisibleModules"
      :key="module.id"
      class="module-wrapper"
      :class="{ 'module-selected': selectedModuleId === module.id }"
      @click.stop="handleModuleClick(module)"
    >
      <div class="module-selector" v-if="selectable">
        <el-icon><Edit /></el-icon>
        <span>{{ module.name }}</span>
      </div>
      <component
        :is="getModuleComponent(module.type)"
        :config="module"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Edit } from '@element-plus/icons-vue'
import type { PageConfig, ModuleConfig } from '@/types/module'
import { ModuleType } from '@/types/module'
import { ConfigGenerator } from './ConfigGenerator'
import { StyleSystem } from './StyleSystem'

// 导入模块组件
import HeaderModule from '@/components/modules/HeaderModule.vue'
import FooterModule from '@/components/modules/FooterModule.vue'
import CarouselModule from '@/components/modules/CarouselModule.vue'
import GridModule from '@/components/modules/GridModule.vue'
import StatsModule from '@/components/modules/StatsModule.vue'
import TimelineModule from '@/components/modules/TimelineModule.vue'
import ColumnModule from '@/components/modules/ColumnModule.vue'

interface Props {
  config: PageConfig
  selectable?: boolean  // 是否可选择
  selectedModuleId?: string  // 当前选中的模块ID
}

const props = withDefaults(defineProps<Props>(), {
  selectable: false,
  selectedModuleId: undefined
})

const emit = defineEmits<{
  'module-select': [module: ModuleConfig]
}>()

// 处理模块点击
const handleModuleClick = (module: ModuleConfig) => {
  if (props.selectable) {
    emit('module-select', module)
  }
}

// 注册模块组件映射
const moduleComponentMap = new Map<ModuleType, any>([
  [ModuleType.HEADER, HeaderModule],
  [ModuleType.FOOTER, FooterModule],
  [ModuleType.CAROUSEL, CarouselModule],
  [ModuleType.GRID, GridModule],
  [ModuleType.STATS, StatsModule],
  [ModuleType.TIMELINE, TimelineModule],
  [ModuleType.COLUMN, ColumnModule]
])

// 获取模块组件
const getModuleComponent = (type: ModuleType) => {
  return moduleComponentMap.get(type) || null
}

// 排序并过滤可见模块
const sortedVisibleModules = computed(() => {
  const sorted = ConfigGenerator.sortModules(props.config.modules)
  return ConfigGenerator.filterVisibleModules(sorted)
})

// 页面样式
const pageStyles = computed(() => {
  const styles: Record<string, any> = {}
  
  if (props.config.globalStyle) {
    const { theme, font, spacing } = props.config.globalStyle
    
    // 应用主题
    if (theme) {
      StyleSystem.applyThemeToCSS(theme)
    }
    
    // 应用字体
    if (font) {
      if (font.family) styles.fontFamily = font.family
      if (font.size) styles.fontSize = font.size
      if (font.color) styles.color = font.color
    }
    
    // 应用间距
    if (spacing) {
      // 可以设置页面的默认间距
    }
  }
  
  return styles
})
</script>

<style scoped>
.page-renderer {
  min-height: 100vh;
  width: 100%;
}

.module-wrapper {
  position: relative;
  border: 2px solid transparent;
  transition: all 0.3s;
  cursor: pointer;
}

.module-wrapper:hover {
  border-color: var(--primary-color);
}

.module-wrapper.module-selected {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(30, 58, 138, 0.1);
}

.module-selector {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1000;
  display: none;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  background: var(--primary-color);
  color: white;
  border-radius: 4px;
  font-size: 0.875rem;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.module-wrapper:hover .module-selector,
.module-wrapper.module-selected .module-selector {
  display: flex;
}
</style>

