<template>
  <BaseModuleWrapper :module-config="config">
    <section class="grid-module section">
      <div class="container">
        <div
          class="grid-container"
          :style="gridStyles"
        >
          <div
            v-for="(item, index) in config.items"
            :key="index"
            class="grid-item card"
            @click="handleItemClick(item)"
          >
            <div v-if="item.image" class="item-image">
              <img :src="item.image" :alt="item.title" />
            </div>
            <div v-if="item.icon" class="item-icon">
              <el-icon :size="40">
                <component :is="item.icon" />
              </el-icon>
            </div>
            <div class="item-content">
              <h3 v-if="item.title" class="item-title">{{ item.title }}</h3>
              <p v-if="item.description" class="item-description">{{ item.description }}</p>
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
import type { GridConfig } from '@/types/module'
import BaseModuleWrapper from './BaseModuleWrapper.vue'

interface Props {
  config: GridConfig
}

const props = defineProps<Props>()

const gridStyles = computed(() => {
  const styles: Record<string, any> = {
    display: 'grid',
    gridTemplateColumns: `repeat(${props.config.columns || 3}, 1fr)`,
    gap: typeof props.config.gap === 'number' ? `${props.config.gap}px` : (props.config.gap || '30px')
  }
  return styles
})

const handleItemClick = (item: any) => {
  if (item.link) {
    if (item.link.startsWith('http')) {
      window.open(item.link, '_blank')
    } else {
      // router.push(item.link)
    }
  }
}
</script>

<style scoped>
.grid-module {
  width: 100%;
}

.grid-container {
  width: 100%;
}

.grid-item {
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
}

.item-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.grid-item:hover .item-image img {
  transform: scale(1.1);
}

.item-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  color: white;
}

.item-content {
  padding: 20px;
}

.item-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: var(--dark-color);
}

.item-description {
  color: var(--gray-color);
  line-height: 1.6;
}

@media (max-width: 1024px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}

@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: 1fr !important;
  }
}
</style>

