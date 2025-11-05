<template>
  <BaseModuleWrapper :module-config="config">
    <section class="column-module section">
      <div class="container">
        <div
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
              <img :src="item.image" :alt="item.title" />
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

const columnStyles = computed(() => {
  const styles: Record<string, any> = {}
  if (props.config.gap) {
    styles.gap = typeof props.config.gap === 'number' ? `${props.config.gap}px` : props.config.gap
  }
  return styles
})
</script>

<style scoped>
.column-module {
  width: 100%;
}

.column-container {
  display: flex;
  flex-direction: column;
  gap: 60px;
}

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

.column-left-image .column-item {
  /* 默认左图右文 */
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
}
</style>

