<template>
  <BaseModuleWrapper :module-config="config">
    <section class="column-module section">
      <div class="container">
        <!-- 灵活布局模式 -->
        <div
          v-if="isFlexibleLayout"
          class="column-container flexible-layout"
          :style="flexibleGridStyles"
        >
          <div
            v-for="(item, index) in config.items"
            :key="index"
            class="flexible-item"
            :style="getFlexibleItemStyle(item)"
          >
            <div v-if="item.image" class="column-image">
              <img :src="item.image" :alt="item.title || ''" />
            </div>
            <div v-if="item.title || item.content" class="column-content">
              <h3 v-if="item.title" class="column-title">{{ item.title }}</h3>
              <p v-if="item.content" class="column-text">{{ item.content }}</p>
              <slot name="item" :item="item" :index="index" />
            </div>
          </div>
        </div>
        <!-- 传统布局模式 -->
        <div
          v-else
          class="column-container"
          :class="`column-${config.layout || 'left-image'}`"
          :style="columnStyles"
        >
          <div
            v-for="(item, index) in config.items"
            :key="index"
            class="column-item"
            :class="{ 'reverse': config.layout === 'alternate' && index % 2 === 1 }"
          >
            <div v-if="item.image" class="column-image">
              <img :src="item.image" :alt="item.title || ''" />
            </div>
            <div class="column-content">
              <h3 v-if="item.title" class="column-title">{{ item.title }}</h3>
              <p v-if="item.content" class="column-text">{{ item.content }}</p>
              <slot name="item" :item="item" :index="index" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </BaseModuleWrapper>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ColumnConfig } from '@/types/module'
import BaseModuleWrapper from './BaseModuleWrapper.vue'

interface Props {
  config: ColumnConfig
}

const props = defineProps<Props>()

// 处理间距值的工具函数
const formatGap = (gap?: string | number): string | undefined => {
  if (!gap) return undefined
  return typeof gap === 'number' ? `${gap}px` : gap
}

// 传统布局样式
const columnStyles = computed(() => {
  const styles: Record<string, any> = {}
  const gap = formatGap(props.config.gap)
  if (gap) {
    styles.gap = gap
  }
  return styles
})

// 灵活布局的 Grid 样式
const flexibleGridStyles = computed(() => {
  const styles: Record<string, any> = {}
  const gridColumns = props.config.gridColumns || 2
  styles.gridTemplateColumns = `repeat(${gridColumns}, 1fr)`
  
  // 使用配置的 gap，如果没有则使用默认值
  const gap = formatGap(props.config.gap) || '20px'
  styles.gap = gap
  
  return styles
})

// 计算每个灵活布局项的样式
const getFlexibleItemStyle = (item: any) => {
  const styles: Record<string, any> = {}
  const gridColumns = props.config.gridColumns || 2
  
  // 如果用户明确指定了 gridColumn 或 gridRow，直接使用
  if (item.gridColumn !== undefined && item.gridColumn !== null) {
    styles.gridColumn = item.gridColumn
  } else {
    // 否则根据 columnSpan 计算
    const columnSpan = item.columnSpan ?? 1
    const actualColumnSpan = Math.max(1, Math.min(columnSpan, gridColumns))
    styles.gridColumn = `span ${actualColumnSpan}`
  }
  
  if (item.gridRow !== undefined && item.gridRow !== null) {
    styles.gridRow = item.gridRow
  } else {
    // 只有当 rowSpan > 1 时才设置 grid-row
    const rowSpan = item.rowSpan ?? 1
    if (rowSpan > 1) {
      styles.gridRow = `span ${rowSpan}`
    }
  }
  
  return styles
}

// 判断是否为灵活布局
const isFlexibleLayout = computed(() => props.config.layout === 'flexible')
</script>

<style scoped>
.column-module {
  width: 100%;
}

.column-container {
  display: flex;
  flex-direction: column;
}

/* 灵活布局模式 */
.flexible-layout {
  display: grid;
  grid-auto-rows: minmax(200px, auto);
  align-items: start;
}

.flexible-item {
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
  min-height: 200px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.flexible-item .column-image {
  width: 100%;
  flex: 1;
  min-height: 200px;
  overflow: hidden;
}

.flexible-item .column-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.flexible-item .column-content {
  padding: 20px;
  flex-shrink: 0;
}

/* 只有图片时，让图片占据全部空间 */
.flexible-item:has(.column-image):not(:has(.column-content)) .column-image {
  flex: 1;
  min-height: 100%;
}

/* 只有内容时，让内容占据全部空间 */
.flexible-item:has(.column-content):not(:has(.column-image)) .column-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* 传统布局模式 */
.column-item {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.column-item.reverse {
  direction: rtl;
}

.column-item.reverse > * {
  direction: ltr;
}

.column-image {
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
}

.column-image img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.column-content {
  padding: 20px 0;
}

.column-title {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: var(--dark-color);
}

.column-text {
  color: var(--gray-color);
  line-height: 1.8;
  margin-bottom: 20px;
}


.column-right-image .column-item {
  direction: rtl;
}

.column-right-image .column-item > * {
  direction: ltr;
}

@media (max-width: 1024px) {
  .column-item {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .column-item.reverse {
    direction: ltr;
  }
  
  .flexible-layout {
    grid-template-columns: 1fr !important;
  }
  
  .flexible-item {
    grid-column: span 1 !important;
    grid-row: span 1 !important;
  }
}
</style>

