<template>
  <BaseModuleWrapper :module-config="config">
    <section class="carousel-module">
      <el-carousel
        :height="config.height || '100vh'"
        :interval="config.interval || 5000"
        :arrow="config.arrows ? 'hover' : 'never'"
        :indicator-position="config.indicator ? 'outside' : 'none'"
        :autoplay="config.autoplay !== false"
      >
        <el-carousel-item v-for="(slide, index) in config.slides" :key="index">
          <div
            class="carousel-slide"
            :class="slideAnimationClass"
            :style="{
              backgroundImage: slide.background ? `url(${slide.background})` : undefined,
              animationDuration: animationDuration,
              backgroundSize: animationBackgroundSize
            }"
          >
            <div v-if="slide.background" class="slide-overlay"></div>
            <div class="container">
              <div class="slide-content">
                <h1 
                  v-if="slide.title" 
                  class="slide-title"
                  :style="titleStyle"
                >{{ slide.title }}</h1>
                <p 
                  v-if="slide.subtitle" 
                  class="slide-subtitle"
                  :style="subtitleStyle"
                >{{ slide.subtitle }}</p>
                <p v-if="slide.content" class="slide-text">{{ slide.content }}</p>
                <div v-if="slide.buttons" class="slide-buttons">
                  <el-button
                    v-for="(btn, btnIndex) in slide.buttons"
                    :key="btnIndex"
                    :type="btn.type || 'primary'"
                    size="large"
                    @click="handleButtonClick(btn)"
                  >
                    {{ btn.text }}
                  </el-button>
                </div>
              </div>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </section>
  </BaseModuleWrapper>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CarouselConfig, CarouselTextStyleConfig, SpacingConfig } from '@/types/module'
import BaseModuleWrapper from './BaseModuleWrapper.vue'

interface Props {
  config: CarouselConfig
}

const props = defineProps<Props>()

// 处理间距配置（margin 或 padding）
const processSpacing = (
  spacing?: SpacingConfig,
  prefix: 'margin' | 'padding' = 'margin'
): Record<string, string> => {
  if (!spacing) return {}
  
  const styles: Record<string, string> = {}
  
  // 优先处理 horizontal 和 vertical（如果存在则覆盖单独的 left/right/top/bottom）
  if (spacing.horizontal !== undefined) {
    const value = typeof spacing.horizontal === 'number' 
      ? `${spacing.horizontal}px` 
      : spacing.horizontal
    styles[`${prefix}Left`] = value
    styles[`${prefix}Right`] = value
  } else {
    // 只有在没有 horizontal 时才处理单独的 left/right
    if (spacing.left !== undefined) {
      styles[`${prefix}Left`] = typeof spacing.left === 'number' 
        ? `${spacing.left}px` 
        : spacing.left
    }
    if (spacing.right !== undefined) {
      styles[`${prefix}Right`] = typeof spacing.right === 'number' 
        ? `${spacing.right}px` 
        : spacing.right
    }
  }
  
  if (spacing.vertical !== undefined) {
    const value = typeof spacing.vertical === 'number' 
      ? `${spacing.vertical}px` 
      : spacing.vertical
    styles[`${prefix}Top`] = value
    styles[`${prefix}Bottom`] = value
  } else {
    // 只有在没有 vertical 时才处理单独的 top/bottom
    if (spacing.top !== undefined) {
      styles[`${prefix}Top`] = typeof spacing.top === 'number' 
        ? `${spacing.top}px` 
        : spacing.top
    }
    if (spacing.bottom !== undefined) {
      styles[`${prefix}Bottom`] = typeof spacing.bottom === 'number' 
        ? `${spacing.bottom}px` 
        : spacing.bottom
    }
  }
  
  return styles
}

// 生成文本样式
const generateTextStyle = (styleConfig?: CarouselTextStyleConfig): Record<string, any> => {
  if (!styleConfig) return {}
  
  const styles: Record<string, any> = {}
  
  // 字体配置
  if (styleConfig.font) {
    if (styleConfig.font.family) {
      styles.fontFamily = styleConfig.font.family
    }
    if (styleConfig.font.size) {
      styles.fontSize = styleConfig.font.size
    }
    if (styleConfig.font.weight) {
      styles.fontWeight = styleConfig.font.weight
    }
    if (styleConfig.font.color) {
      styles.color = styleConfig.font.color
    }
    if (styleConfig.font.lineHeight) {
      styles.lineHeight = styleConfig.font.lineHeight
    }
    if (styleConfig.font.letterSpacing) {
      styles.letterSpacing = styleConfig.font.letterSpacing
    }
  }
  
  // 文本对齐
  if (styleConfig.textAlign) {
    styles.textAlign = styleConfig.textAlign
  }
  
  // 位置配置
  if (styleConfig.position) {
    if (styleConfig.position.top !== undefined) {
      styles.top = typeof styleConfig.position.top === 'number' 
        ? `${styleConfig.position.top}px` 
        : styleConfig.position.top
    }
    if (styleConfig.position.right !== undefined) {
      styles.right = typeof styleConfig.position.right === 'number' 
        ? `${styleConfig.position.right}px` 
        : styleConfig.position.right
    }
    if (styleConfig.position.bottom !== undefined) {
      styles.bottom = typeof styleConfig.position.bottom === 'number' 
        ? `${styleConfig.position.bottom}px` 
        : styleConfig.position.bottom
    }
    if (styleConfig.position.left !== undefined) {
      styles.left = typeof styleConfig.position.left === 'number' 
        ? `${styleConfig.position.left}px` 
        : styleConfig.position.left
    }
  }
  
  // 外边距（使用辅助函数）
  Object.assign(styles, processSpacing(styleConfig.margin, 'margin'))
  
  // 内边距（使用辅助函数）
  Object.assign(styles, processSpacing(styleConfig.padding, 'padding'))
  
  // Transform
  if (styleConfig.transform) {
    styles.transform = styleConfig.transform
  }
  
  // 透明度
  if (styleConfig.opacity !== undefined) {
    styles.opacity = styleConfig.opacity
  }
  
  // 文字阴影
  if (styleConfig.textShadow) {
    styles.textShadow = styleConfig.textShadow
  }
  
  return styles
}

// 标题样式
const titleStyle = computed(() => generateTextStyle(props.config.titleStyle))

// 副标题样式
const subtitleStyle = computed(() => generateTextStyle(props.config.subtitleStyle))

// 轮播动画类
const slideAnimationClass = computed(() => {
  const animation = props.config.slideAnimation
  // 简化逻辑：只有启用且类型有效时才返回动画类
  if (!animation?.enabled || !animation.type || animation.type === 'none') {
    return ''
  }
  return `slide-animation-${animation.type}`
})

// 动画持续时间
const animationDuration = computed(() => {
  const animation = props.config.slideAnimation
  if (!animation?.enabled || !animation.type || animation.type === 'none') {
    return undefined
  }
  // 使用配置的 duration，如果没有则使用 interval，最后使用默认值
  const duration = animation.duration ?? props.config.interval ?? 5000
  return `${duration}ms`
})

// 动画背景尺寸（仅用于平移动画）
const animationBackgroundSize = computed(() => {
  const animation = props.config.slideAnimation
  if (!animation?.enabled || !animation.type) {
    return undefined
  }
  // 只有平移动画需要特殊的 background-size
  if (animation.type.startsWith('pan-')) {
    if (animation.type === 'pan-left' || animation.type === 'pan-right') {
      return '120% auto'
    }
    if (animation.type === 'pan-up' || animation.type === 'pan-down') {
      return 'auto 120%'
    }
  }
  return undefined
})

interface ButtonConfig {
  text: string
  link?: string
  type?: 'primary' | 'secondary'
}

const handleButtonClick = (btn: ButtonConfig) => {
  if (btn.link) {
    if (btn.link.startsWith('http') || btn.link.startsWith('https')) {
      window.open(btn.link, '_blank')
    } else {
      // 使用路由导航
      // router.push(btn.link)
    }
  }
}
</script>

<style scoped>
.carousel-module {
  position: relative;
}

.carousel-slide {
  position: relative;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-slide[class*="slide-animation-"] {
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

/* 缩放动画 - 由大到小 */
.slide-animation-zoom-in {
  animation-name: zoomIn;
}

@keyframes zoomIn {
  from {
    transform: scale(1.2);
  }
  to {
    transform: scale(1);
  }
}

/* 缩放动画 - 由小到大 */
.slide-animation-zoom-out {
  animation-name: zoomOut;
}

@keyframes zoomOut {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.2);
  }
}

/* 平移动画 - 从左到右 */
.slide-animation-pan-left {
  animation-name: panLeft;
}

@keyframes panLeft {
  from {
    background-position: 0% center;
  }
  to {
    background-position: 100% center;
  }
}

/* 平移动画 - 从右到左 */
.slide-animation-pan-right {
  animation-name: panRight;
}

@keyframes panRight {
  from {
    background-position: 100% center;
  }
  to {
    background-position: 0% center;
  }
}

/* 平移动画 - 从上到下 */
.slide-animation-pan-up {
  animation-name: panUp;
}

@keyframes panUp {
  from {
    background-position: center 0%;
  }
  to {
    background-position: center 100%;
  }
}

/* 平移动画 - 从下到上 */
.slide-animation-pan-down {
  animation-name: panDown;
}

@keyframes panDown {
  from {
    background-position: center 100%;
  }
  to {
    background-position: center 0%;
  }
}

/* 旋转动画 */
.slide-animation-rotate {
  animation-name: rotate;
}

@keyframes rotate {
  from {
    transform: rotate(0deg) scale(1.1);
  }
  to {
    transform: rotate(360deg) scale(1.1);
  }
}

.slide-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
}

.slide-content {
  position: relative;
  z-index: 2;
  color: white;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.slide-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  position: relative; /* 允许通过样式配置调整位置 */
}

.slide-subtitle {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  opacity: 0.9;
  position: relative; /* 允许通过样式配置调整位置 */
}

.slide-text {
  font-size: 1rem;
  margin-bottom: 2.5rem;
  opacity: 0.8;
}

.slide-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .slide-title {
    font-size: 2.5rem;
  }
  
  .slide-buttons {
    flex-direction: column;
    align-items: center;
  }
}
</style>

