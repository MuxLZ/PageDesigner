<template>
  <BaseModuleWrapper :module-config="config">
    <section class="feature-list-module section">
      <div class="container">
        <div v-if="config.title || config.subtitle" class="section-header">
          <h2 v-if="config.title" class="section-title">{{ config.title }}</h2>
          <p v-if="config.subtitle" class="section-subtitle">{{ config.subtitle }}</p>
        </div>
        
        <div
          class="feature-list"
          :class="`feature-list-${config.layout || 'horizontal'}`"
          :style="listStyles"
        >
          <div
            v-for="(item, index) in config.items"
            :key="index"
            class="feature-item"
            data-aos="fade-up"
            :data-aos-delay="index * 100"
          >
            <div v-if="item.icon" class="feature-icon">
              <el-icon :size="40">
                <component :is="item.icon" />
              </el-icon>
            </div>
            <div class="feature-content">
              <h4 class="feature-title">{{ item.title }}</h4>
              <p v-if="item.description" class="feature-description">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </BaseModuleWrapper>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { FeatureListConfig } from '@/types/module'
import BaseModuleWrapper from './BaseModuleWrapper.vue'

interface Props {
  config: FeatureListConfig
}

const props = defineProps<Props>()

const listStyles = computed(() => {
  const styles: Record<string, any> = {}
  if (props.config.layout === 'grid' && props.config.columns) {
    styles.gridTemplateColumns = `repeat(${props.config.columns}, 1fr)`
  }
  return styles
})
</script>

<style scoped>
.feature-list-module {
  width: 100%;
}

.feature-list {
  display: flex;
  gap: 40px;
}

.feature-list-horizontal {
  flex-direction: row;
  flex-wrap: wrap;
}

.feature-list-vertical {
  flex-direction: column;
}

.feature-list-grid {
  display: grid;
  gap: 40px;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  flex: 1;
  min-width: 250px;
}

.feature-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  flex-shrink: 0;
}

.feature-content {
  flex: 1;
}

.feature-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: var(--dark-color);
}

.feature-description {
  color: var(--gray-color);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .feature-list {
    flex-direction: column;
  }
  
  .feature-item {
    min-width: auto;
  }
}
</style>

