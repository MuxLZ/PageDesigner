<template>
  <BaseModuleWrapper :module-config="config">
    <section
      class="cta-module section"
      :style="ctaStyles"
    >
      <div class="container">
        <div class="cta-content">
          <h2 v-if="config.title" class="cta-title">{{ config.title }}</h2>
          <p v-if="config.subtitle" class="cta-subtitle">{{ config.subtitle }}</p>
          <div v-if="config.buttons" class="cta-buttons">
            <el-button
              v-for="(btn, index) in config.buttons"
              :key="index"
              :type="btn.type || 'primary'"
              size="large"
              @click="handleButtonClick(btn)"
            >
              <el-icon v-if="btn.icon" style="margin-right: 5px">
                <component :is="btn.icon" />
              </el-icon>
              {{ btn.text }}
            </el-button>
          </div>
        </div>
      </div>
    </section>
  </BaseModuleWrapper>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CTAConfig } from '@/types/module'
import BaseModuleWrapper from './BaseModuleWrapper.vue'

interface Props {
  config: CTAConfig
}

const props = defineProps<Props>()

const ctaStyles = computed(() => {
  const styles: Record<string, any> = {}
  if (props.config.backgroundColor) {
    styles.background = props.config.backgroundColor
  }
  if (props.config.backgroundImage) {
    styles.backgroundImage = `url(${props.config.backgroundImage})`
    styles.backgroundSize = 'cover'
    styles.backgroundPosition = 'center'
    styles.position = 'relative'
  }
  if (props.config.textColor) {
    styles.color = props.config.textColor
  }
  return styles
})

const handleButtonClick = (btn: any) => {
  if (btn.link) {
    if (btn.link.startsWith('http')) {
      window.open(btn.link, '_blank')
    }
  }
}
</script>

<style scoped>
.cta-module {
  padding: 80px 0;
  text-align: center;
}

.cta-content {
  max-width: 800px;
  margin: 0 auto;
}

.cta-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: inherit;
}

.cta-subtitle {
  font-size: 1.25rem;
  margin-bottom: 40px;
  opacity: 0.9;
  color: inherit;
}

.cta-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .cta-title {
    font-size: 2rem;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
}
</style>

