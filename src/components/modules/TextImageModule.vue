<template>
  <BaseModuleWrapper :module-config="config">
    <section class="text-image-module section">
      <div class="container">
        <div
          class="text-image-content"
          :class="`layout-${config.layout || 'left-image'}`"
        >
          <div v-if="config.image" class="image-section">
            <img :src="config.image" :alt="config.title" />
          </div>
          <div class="text-section">
            <h2 v-if="config.title" class="content-title">{{ config.title }}</h2>
            <p v-if="config.content" class="content-text">{{ config.content }}</p>
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
      </div>
    </section>
  </BaseModuleWrapper>
</template>

<script setup lang="ts">
import type { TextImageConfig } from '@/types/module'
import BaseModuleWrapper from './BaseModuleWrapper.vue'

interface Props {
  config: TextImageConfig
}

const props = defineProps<Props>()

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

@media (max-width: 1024px) {
  .text-image-content {
    grid-template-columns: 1fr !important;
    gap: 40px;
  }
  
  .layout-right-image {
    direction: ltr;
  }
}
</style>

