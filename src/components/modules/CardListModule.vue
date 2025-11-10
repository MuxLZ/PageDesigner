<template>
  <BaseModuleWrapper :module-config="config">
    <section class="card-list-module section">
      <div class="container">
        <div v-if="config.title || config.subtitle" class="section-header">
          <h2 v-if="config.title" class="section-title">{{ config.title }}</h2>
          <p v-if="config.subtitle" class="section-subtitle">{{ config.subtitle }}</p>
        </div>
        
        <div
          class="card-list"
          :class="`card-style-${config.cardStyle || 'default'}`"
          :style="listStyles"
        >
          <div
            v-for="(item, index) in (config.items || [])"
            :key="index"
            class="card-item card"
            @click="handleItemClick(item)"
          >
            <div v-if="item.image" class="card-image">
              <img :src="item.image" :alt="item.title" />
            </div>
            <div class="card-content">
              <h3 v-if="item.title" class="card-title">{{ item.title }}</h3>
              <p v-if="item.description" class="card-description">{{ item.description }}</p>
              <div v-if="item.tags" class="card-tags">
                <span v-for="(tag, tagIndex) in item.tags" :key="tagIndex" class="tag">
                  {{ tag }}
                </span>
              </div>
              <div v-if="item.meta" class="card-meta">
                <span v-for="(value, key) in item.meta" :key="key" class="meta-item">
                  {{ key }}: {{ value }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </BaseModuleWrapper>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CardListConfig } from '@/types/module'
import BaseModuleWrapper from './BaseModuleWrapper.vue'

interface Props {
  config: CardListConfig
}

const props = defineProps<Props>()

const listStyles = computed(() => {
  return {
    gridTemplateColumns: `repeat(${props.config.columns || 3}, 1fr)`,
    gap: '30px'
  }
})

const handleItemClick = (item: any) => {
  if (item.link) {
    if (item.link.startsWith('http')) {
      window.open(item.link, '_blank')
    }
  }
}
</script>

<style scoped>
.card-list-module {
  width: 100%;
}

.card-list {
  display: grid;
}

.card-item {
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
}

.card-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.card-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.card-item:hover .card-image img {
  transform: scale(1.1);
}

.card-content {
  padding: 25px;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: var(--dark-color);
}

.card-description {
  color: var(--gray-color);
  line-height: 1.6;
  margin-bottom: 15px;
}

.card-tags {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 15px;
}

.tag {
  background: var(--light-color);
  color: var(--primary-color);
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
}

.card-meta {
  display: flex;
  gap: 15px;
  font-size: 0.875rem;
  color: var(--gray-color);
}

.card-style-hover .card-item {
  border: 2px solid transparent;
}

.card-style-hover .card-item:hover {
  border-color: var(--primary-color);
}

.card-style-minimal .card-item {
  box-shadow: none;
  border: 1px solid var(--border-color);
}

@media (max-width: 1024px) {
  .card-list {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}

@media (max-width: 768px) {
  .card-list {
    grid-template-columns: 1fr !important;
  }
}
</style>

