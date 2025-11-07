<template>
  <div
    v-if="moduleConfig.visible"
    :class="moduleClasses"
    :style="moduleStyles"
    :data-module-id="moduleConfig.id"
    :data-module-type="moduleConfig.type"
  >
    <!-- 标题显示模块 -->
    <div v-if="titleDisplayConfig?.enabled" class="module-title-display" :class="titleDisplayClasses">
      <div class="title-display-container">
        <!-- 左侧：图标 + 主标题 -->
        <div class="title-section" :class="titlePositionClass">
          <span v-if="titleDisplayConfig.icon" class="title-icon">
            <img v-if="isImageUrl(titleDisplayConfig.icon)" :src="titleDisplayConfig.icon" alt="icon" />
            <i v-else :class="titleDisplayConfig.icon"></i>
          </span>
          <h2 v-if="titleDisplayConfig.title" class="module-title">{{ titleDisplayConfig.title }}</h2>
        </div>
        
        <!-- 右侧：子模块 -->
        <div class="sub-modules-section" :class="subModulesPositionClass">
          <div v-if="titleDisplayConfig.subModules && titleDisplayConfig.subModules.length > 0" class="sub-modules">
            <div
              v-for="(subModule, index) in titleDisplayConfig.subModules"
              :key="index"
              class="sub-module-item"
              :style="getSubModuleStyle(subModule)"
            >
              <span v-if="subModule.icon" class="sub-module-icon">
                <img v-if="isImageUrl(subModule.icon)" :src="subModule.icon" alt="icon" />
                <i v-else :class="subModule.icon"></i>
              </span>
              <span class="sub-module-content">{{ subModule.content }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 分割线 -->
      <div v-if="titleDisplayConfig.divider" class="title-divider"></div>
    </div>
    
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { BaseModuleConfig, TitleSubModuleConfig } from '@/types/module'
import { StyleSystem } from '@/core/StyleSystem'
import { EffectSystem } from '@/core/EffectSystem'

interface Props {
  moduleConfig: BaseModuleConfig
}

const props = defineProps<Props>()

// 标题显示配置
const titleDisplayConfig = computed(() => {
  return props.moduleConfig.titleDisplay
})

// 标题位置类
const titlePositionClass = computed(() => {
  const position = titleDisplayConfig.value?.position?.titlePosition || 'left'
  return `title-position-${position}`
})

// 子模块位置类
const subModulesPositionClass = computed(() => {
  const position = titleDisplayConfig.value?.position?.subModulesPosition || 'right'
  return `sub-modules-position-${position}`
})

// 标题显示容器类
const titleDisplayClasses = computed(() => {
  return {
    'has-divider': titleDisplayConfig.value?.divider || false
  }
})

// 判断是否为图片URL
const isImageUrl = (str: string): boolean => {
  return str.startsWith('http://') || str.startsWith('https://') || str.startsWith('/') || str.startsWith('./')
}

// 获取子模块样式
const getSubModuleStyle = (subModule: TitleSubModuleConfig): Record<string, any> => {
  const styles: Record<string, any> = {}
  
  if (subModule.backgroundColor) {
    styles.backgroundColor = subModule.backgroundColor
  }
  
  if (subModule.border) {
    styles.border = subModule.border
  }
  
  if (subModule.borderRadius !== undefined) {
    const borderRadius = typeof subModule.borderRadius === 'number' 
      ? `${subModule.borderRadius}px` 
      : subModule.borderRadius
    styles.borderRadius = borderRadius
  }
  
  if (subModule.color) {
    styles.color = subModule.color
  }
  
  return styles
}

// 模块类名
const moduleClasses = computed(() => {
  const classes = ['module-wrapper', `module-${props.moduleConfig.type}`]
  
  // 添加效果类
  if (props.moduleConfig.effect) {
    classes.push(...EffectSystem.getEffectClasses(props.moduleConfig.effect))
  }
  
  return classes
})

// 模块样式
const moduleStyles = computed(() => {
  const styles: Record<string, any> = {}
  
  // 应用模块样式配置
  if (props.moduleConfig.style) {
    Object.assign(styles, StyleSystem.generateModuleStyles(props.moduleConfig.style))
  }
  
  // 应用效果样式
  if (props.moduleConfig.effect) {
    Object.assign(styles, EffectSystem.getEffectStyles(props.moduleConfig.effect))
  }
  
  return styles
})
</script>

<style scoped>
.module-wrapper {
  position: relative;
  width: 100%;
}

/* 标题显示模块样式 */
.module-title-display {
  width: 100%;
  margin-bottom: 20px;
}

.title-display-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 16px 0;
}

/* 标题区域 */
.title-section {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.title-section.title-position-left {
  justify-content: flex-start;
}

.title-section.title-position-center {
  justify-content: center;
}

.title-section.title-position-right {
  justify-content: flex-end;
}

.title-icon {
  display: inline-flex;
  align-items: center;
  font-size: 24px;
}

.title-icon img {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.module-title {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  line-height: 1.4;
}

/* 子模块区域 */
.sub-modules-section {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.sub-modules-section.sub-modules-position-left {
  justify-content: flex-start;
}

.sub-modules-section.sub-modules-position-center {
  justify-content: center;
}

.sub-modules-section.sub-modules-position-right {
  justify-content: flex-end;
}

.subtitle {
  font-size: 16px;
  color: #666;
}

.sub-modules {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.sub-module-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  font-size: 14px;
  transition: all 0.3s;
}

.sub-module-icon {
  display: inline-flex;
  align-items: center;
  font-size: 16px;
}

.sub-module-icon img {
  width: 16px;
  height: 16px;
  object-fit: contain;
}

.sub-module-content {
  white-space: nowrap;
}

/* 分割线 */
.title-divider {
  width: 100%;
  height: 1px;
  background-color: #e4e7ed;
  margin-top: 16px;
}

.module-title-display.has-divider {
  padding-bottom: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .title-display-container {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .title-section,
  .sub-modules-section {
    width: 100%;
    justify-content: flex-start !important;
  }
  
  .module-title {
    font-size: 20px;
  }
}
</style>

