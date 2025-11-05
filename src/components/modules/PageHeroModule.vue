<template>
  <BaseModuleWrapper :module-config="config">
    <section
      class="page-hero-module section"
      :style="heroStyles"
    >
      <div class="container">
        <div class="hero-content">
          <h1 v-if="config.title" class="page-title">{{ config.title }}</h1>
          <p v-if="config.subtitle" class="page-subtitle">{{ config.subtitle }}</p>
          <nav v-if="config.breadcrumb && config.breadcrumb.length > 0" class="breadcrumb">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item
                v-for="(item, index) in config.breadcrumb"
                :key="index"
                :to="item.link ? { path: item.link } : undefined"
              >
                {{ item.label }}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </nav>
        </div>
      </div>
    </section>
  </BaseModuleWrapper>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { PageHeroConfig } from '@/types/module'
import BaseModuleWrapper from './BaseModuleWrapper.vue'

interface Props {
  config: PageHeroConfig
}

const props = defineProps<Props>()

const heroStyles = computed(() => {
  const styles: Record<string, any> = {}
  if (props.config.backgroundColor) {
    styles.background = props.config.backgroundColor
  }
  if (props.config.backgroundImage) {
    styles.backgroundImage = `url(${props.config.backgroundImage})`
    styles.backgroundSize = 'cover'
    styles.backgroundPosition = 'center'
  }
  if (props.config.textColor) {
    styles.color = props.config.textColor
  }
  return styles
})
</script>

<style scoped>
.page-hero-module {
  padding: 100px 0;
  text-align: center;
  position: relative;
}

.hero-content {
  position: relative;
  z-index: 2;
}

.page-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: inherit;
}

.page-subtitle {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  color: inherit;
}

.breadcrumb {
  display: flex;
  justify-content: center;
}

.breadcrumb :deep(.el-breadcrumb__inner) {
  color: rgba(255, 255, 255, 0.8);
}

.breadcrumb :deep(.el-breadcrumb__inner:hover) {
  color: white;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2.5rem;
  }
}
</style>

