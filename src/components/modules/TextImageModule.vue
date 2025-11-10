<template>
  <BaseModuleWrapper :module-config="config">
    <section class="text-image-module section">
      <div class="container">
        <div
          class="text-image-content"
          :class="[
            `layout-${config.layout || 'left-image'}`,
            { 'stack-enabled': config.stackLayout?.enabled }
          ]"
          :style="containerStyle"
        >
          <div 
            class="text-section"
            :style="textSectionStyle"
          >
            <div 
              v-if="config.image && config.stackLayout?.enabled" 
              class="image-section"
              :style="imageStyle"
            >
              <img :src="config.image" :alt="config.title" />
            </div>
            <div 
              class="text-box"
              :style="textBoxStyle"
            >
              <h2 
                v-if="config.title" 
                class="content-title"
                :style="titleStyle"
              >
                {{ config.title }}
              </h2>
              <p 
                v-if="config.content" 
                class="content-text"
                :style="contentStyle"
              >
                {{ config.content }}
              </p>
              <div v-if="config.buttons" class="content-buttons">
                <el-button
                  v-for="(btn, index) in config.buttons"
                  :key="index"
                  :type="btn.type || 'primary'"
                  size="large"
                  @click="handleButtonClick(btn)"
                >
                  {{ btn.text }}
                </el-button>
              </div>
            </div>
          </div>
          <div 
            v-if="config.image && !config.stackLayout?.enabled" 
            class="image-section"
          >
            <img :src="config.image" :alt="config.title" />
          </div>
        </div>
      </div>
    </section>
  </BaseModuleWrapper>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { TextImageConfig, SpacingConfig } from '@/types/module'
import BaseModuleWrapper from './BaseModuleWrapper.vue'

interface Props {
  config: TextImageConfig
}

const props = defineProps<Props>()

// 工具函数：将数值转换为CSS值
const toCssValue = (value: string | number | undefined): string | undefined => {
  if (value === undefined) return undefined
  return typeof value === 'number' ? `${value}px` : value
}

// 处理间距配置
const processSpacing = (
  spacing?: string | number | SpacingConfig
): Record<string, string> => {
  if (!spacing) return {}
  
  const styles: Record<string, string> = {}
  
  if (typeof spacing === 'string' || typeof spacing === 'number') {
    return { padding: toCssValue(spacing) || '' }
  }
  
  // 处理 SpacingConfig 对象
  if (spacing.horizontal !== undefined) {
    const value = toCssValue(spacing.horizontal) || ''
    styles.paddingLeft = value
    styles.paddingRight = value
  } else {
    if (spacing.left !== undefined) {
      styles.paddingLeft = toCssValue(spacing.left) || ''
    }
    if (spacing.right !== undefined) {
      styles.paddingRight = toCssValue(spacing.right) || ''
    }
  }
  
  if (spacing.vertical !== undefined) {
    const value = toCssValue(spacing.vertical) || ''
    styles.paddingTop = value
    styles.paddingBottom = value
  } else {
    if (spacing.top !== undefined) {
      styles.paddingTop = toCssValue(spacing.top) || ''
    }
    if (spacing.bottom !== undefined) {
      styles.paddingBottom = toCssValue(spacing.bottom) || ''
    }
  }
  
  return styles
}

// 文本外框样式
const textBoxStyle = computed(() => {
  const box = props.config.textBox
  if (!box || !box.show) {
    return {}
  }
  
  const styles: Record<string, any> = {}
  
  // 外框颜色（边框颜色）
  if (box.color) {
    styles.borderColor = box.color
  }
  
  // 外框宽度（边框宽度）
  if (box.width !== undefined) {
    styles.borderWidth = toCssValue(box.width) || ''
    styles.borderStyle = 'solid'
  } else if (box.color) {
    // 如果设置了颜色但没有设置宽度，默认1px
    styles.borderWidth = '1px'
    styles.borderStyle = 'solid'
  }
  
  // 文本与外框距离（内边距）
  if (box.padding) {
    Object.assign(styles, processSpacing(box.padding))
  }
  
  // 外框弯曲度（圆角）
  if (box.borderRadius !== undefined) {
    styles.borderRadius = toCssValue(box.borderRadius) || ''
  }
  
  return styles
})

// 文本字体大小样式（标题和内容共用）
const textFontSizeStyle = computed(() => {
  if (!props.config.textStyle?.fontSize) return {}
  return {
    fontSize: toCssValue(props.config.textStyle.fontSize)
  }
})

// 标题样式
const titleStyle = computed(() => textFontSizeStyle.value)

// 内容样式
const contentStyle = computed(() => textFontSizeStyle.value)

// 文本区域样式
const textSectionStyle = computed(() => {
  const styles: Record<string, any> = {}
  
  if (props.config.stackLayout?.enabled) {
    styles.position = 'relative'
    styles.zIndex = props.config.stackLayout.zIndex || 1
    
    // 设置文本区域宽度，不占满整行
    const textWidth = props.config.stackLayout.textWidth
    if (textWidth !== undefined) {
      const width = toCssValue(textWidth) || ''
      styles.width = width
      styles.maxWidth = width
    } else {
      // 默认不占满整行，设置为最大宽度的一半
      styles.maxWidth = '50%'
    }
  }
  
  return styles
})

// 图片样式（堆叠效果）
const imageStyle = computed(() => {
  const stack = props.config.stackLayout
  if (!stack?.enabled) {
    return {}
  }
  
  const styles: Record<string, any> = {}
  
  // 堆叠层级
  if (stack.zIndex !== undefined) {
    styles.zIndex = stack.zIndex
  }
  
  // 图片大小
  if (stack.imageSize) {
    if (stack.imageSize.width !== undefined) {
      const width = toCssValue(stack.imageSize.width) || ''
      styles.width = width
      styles.maxWidth = width
    }
    if (stack.imageSize.height !== undefined) {
      const height = toCssValue(stack.imageSize.height) || ''
      styles.height = height
      styles.maxHeight = height
    }
  }
  
  // 位置和偏移
  const position = stack.position || 'right'
  const offset = stack.offset || {}
  const offsetX = toCssValue(offset.x) || '0'
  const offsetY = toCssValue(offset.y) || '0'
  
  styles.position = 'absolute'
  
  // 根据位置设置样式
  switch (position) {
    case 'overlay':
      styles.top = '50%'
      styles.left = '50%'
      styles.transform = `translate(calc(-50% + ${offsetX}), calc(-50% + ${offsetY}))`
      break
    case 'left':
      styles.left = offsetX
      if (offset.y !== undefined) {
        styles.top = offsetY
        styles.transform = 'none'
      } else {
        styles.top = '50%'
        styles.transform = 'translateY(-50%)'
      }
      break
    case 'right':
      styles.right = offsetX
      if (offset.y !== undefined) {
        styles.top = offsetY
        styles.transform = 'none'
      } else {
        styles.top = '50%'
        styles.transform = 'translateY(-50%)'
      }
      break
    case 'top':
      styles.top = offsetY
      if (offset.x !== undefined) {
        styles.left = offsetX
        styles.transform = 'none'
      } else {
        styles.left = '50%'
        styles.transform = 'translateX(-50%)'
      }
      break
    case 'bottom':
      styles.bottom = offsetY
      if (offset.x !== undefined) {
        styles.left = offsetX
        styles.transform = 'none'
      } else {
        styles.left = '50%'
        styles.transform = 'translateX(-50%)'
      }
      break
  }
  
  return styles
})

// 容器样式
const containerStyle = computed(() => {
  // 堆叠模式下不需要额外的容器样式，所有定位都在图片样式中处理
  return {}
})

const handleButtonClick = (btn: any) => {
  if (btn.link) {
    if (btn.link.startsWith('http')) {
      window.open(btn.link, '_blank')
    }
  }
}
</script>

<style scoped>
.text-image-module {
  width: 100%;
}

.text-image-content {
  display: grid;
  gap: 60px;
  align-items: center;
  position: relative;
  overflow: hidden; /* 确保内容不溢出 */
}

.text-image-content.stack-enabled {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 300px;
  overflow: hidden; /* 防止内容溢出容器 */
}

.text-image-content.stack-enabled .text-section {
  position: relative;
  flex: 0 0 auto; /* 不自动扩展，根据内容宽度 */
  z-index: 1;
  overflow: visible;
}

.layout-left-image {
  grid-template-columns: 1fr 1fr;
}

.layout-right-image {
  grid-template-columns: 1fr 1fr;
  direction: rtl;
}

.layout-right-image > * {
  direction: ltr;
}

.layout-top-image {
  grid-template-columns: 1fr;
}

.layout-top-image .image-section {
  order: -1;
}

.layout-bottom-image {
  grid-template-columns: 1fr;
}

.layout-bottom-image .image-section {
  order: 1;
}

.image-section {
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
}

.image-section img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.text-section {
  padding: 20px 0;
  position: relative;
}

.text-box {
  display: inline-block;
  width: 100%;
  box-sizing: border-box; /* 确保边框包含在宽度内 */
}

.content-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: var(--dark-color);
}

.content-text {
  font-size: 1.125rem;
  line-height: 1.8;
  color: var(--gray-color);
  margin-bottom: 30px;
}

.content-buttons {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

/* 堆叠模式下的样式调整 */
.text-image-content.stack-enabled .image-section {
  position: absolute !important; /* 堆叠模式下使用绝对定位 */
  width: auto;
  max-width: calc(100% - 40px); /* 留出边距，防止完全溢出 */
  min-width: 200px;
  max-height: calc(100% - 40px); /* 确保图片不超出容器高度 */
}

.text-image-content.stack-enabled .image-section img {
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}


@media (max-width: 1024px) {
  .text-image-content {
    grid-template-columns: 1fr !important;
    gap: 40px;
  }
  
  .layout-right-image {
    direction: ltr;
  }
  
  /* 移动端堆叠效果调整 */
  .text-image-content.stack-enabled .image-section {
    position: relative !important;
    transform: none !important;
    width: 100%;
  }
}
</style>

