<template>
  <BaseModuleWrapper :module-config="config">
    <section class="partners-module section">
      <div class="container">
        <div v-if="config.title || config.subtitle" class="section-header">
          <h2 v-if="config.title" class="section-title">{{ config.title }}</h2>
          <p v-if="config.subtitle" class="section-subtitle">{{ config.subtitle }}</p>
        </div>
        
        <div
          class="partners-grid"
          :style="gridStyles"
          data-aos="fade-up"
        >
          <div
            v-for="(partner, index) in (config.items || [])"
            :key="index"
            class="partner-item"
            :class="{ 'grayscale': config.grayscale, 'hover-effect': config.hoverEffect }"
            @click="handlePartnerClick(partner)"
          >
            <img :src="partner.logo" :alt="partner.name" />
          </div>
        </div>
      </div>
    </section>
  </BaseModuleWrapper>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { PartnersConfig } from '@/types/module'
import BaseModuleWrapper from './BaseModuleWrapper.vue'

interface Props {
  config: PartnersConfig
}

const props = defineProps<Props>()

const gridStyles = computed(() => {
  return {
    gridTemplateColumns: `repeat(${props.config.columns || 6}, 1fr)`,
    gap: '40px'
  }
})

const handlePartnerClick = (partner: any) => {
  if (partner.link) {
    if (partner.link.startsWith('http')) {
      window.open(partner.link, '_blank')
    }
  }
}
</script>

<style scoped>
.partners-module {
  width: 100%;
}

.partners-grid {
  display: grid;
  align-items: center;
}

.partner-item {
  text-align: center;
  opacity: 0.6;
  transition: opacity 0.3s;
  cursor: pointer;
}

.partner-item:hover {
  opacity: 1;
}

.partner-item img {
  max-width: 120px;
  height: 60px;
  object-fit: contain;
  transition: filter 0.3s;
}

.partner-item.grayscale img {
  filter: grayscale(100%);
}

.partner-item.hover-effect:hover img {
  filter: grayscale(0%);
}

@media (max-width: 1024px) {
  .partners-grid {
    grid-template-columns: repeat(3, 1fr) !important;
  }
}

@media (max-width: 768px) {
  .partners-grid {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 30px;
  }
}
</style>

