<template>
  <BaseModuleWrapper :module-config="config">
    <section class="honors-module section">
      <div class="container">
        <div v-if="config.title || config.subtitle" class="section-header">
          <h2 v-if="config.title" class="section-title">{{ config.title }}</h2>
          <p v-if="config.subtitle" class="section-subtitle">{{ config.subtitle }}</p>
        </div>
        
        <div
          class="honors-grid"
          :style="gridStyles"
        >
          <div
            v-for="(honor, index) in config.items"
            :key="index"
            class="honor-item"
            data-aos="zoom-in"
            :data-aos-delay="index * 100"
          >
            <div v-if="honor.image" class="honor-image">
              <img :src="honor.image" :alt="honor.title" />
            </div>
            <h4 v-if="honor.title" class="honor-title">{{ honor.title }}</h4>
          </div>
        </div>
      </div>
    </section>
  </BaseModuleWrapper>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { HonorsConfig } from '@/types/module'
import BaseModuleWrapper from './BaseModuleWrapper.vue'

interface Props {
  config: HonorsConfig
}

const props = defineProps<Props>()

const gridStyles = computed(() => {
  return {
    gridTemplateColumns: `repeat(${props.config.columns || 4}, 1fr)`,
    gap: '30px'
  }
})
</script>

<style scoped>
.honors-module {
  width: 100%;
}

.honors-grid {
  display: grid;
}

.honor-item {
  text-align: center;
  transition: transform 0.3s ease;
}

.honor-item:hover {
  transform: translateY(-5px);
}

.honor-image {
  width: 150px;
  height: 150px;
  margin: 0 auto 20px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.honor-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.honor-title {
  font-size: 1rem;
  font-weight: 500;
  color: var(--dark-color);
}

@media (max-width: 1024px) {
  .honors-grid {
    grid-template-columns: repeat(3, 1fr) !important;
  }
}

@media (max-width: 768px) {
  .honors-grid {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}
</style>

