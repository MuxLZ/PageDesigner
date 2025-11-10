<template>
  <BaseModuleWrapper :module-config="config">
    <section
      class="stats-module section"
      :style="sectionStyles"
    >
      <div class="container">
        <div
          class="stats-grid"
          :style="gridStyles"
        >
          <div
            v-for="(item, index) in (config.items || [])"
            :key="index"
            class="stat-item"
            data-aos="fade-up"
            :data-aos-delay="index * 100"
          >
            <div v-if="item.icon" class="stat-icon">
              <el-icon :size="40">
                <component :is="item.icon" />
              </el-icon>
            </div>
            <div class="stat-number">
              <span v-if="item.prefix">{{ item.prefix }}</span>
              {{ item.number }}
              <span v-if="item.suffix">{{ item.suffix }}</span>
            </div>
            <div class="stat-label">{{ item.label }}</div>
          </div>
        </div>
      </div>
    </section>
  </BaseModuleWrapper>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { StatsConfig } from '@/types/module'
import BaseModuleWrapper from './BaseModuleWrapper.vue'

interface Props {
  config: StatsConfig
}

const props = defineProps<Props>()

const sectionStyles = computed(() => {
  const styles: Record<string, any> = {}
  if (props.config.backgroundColor) {
    styles.background = props.config.backgroundColor
  }
  if (props.config.textColor) {
    styles.color = props.config.textColor
  }
  return styles
})

const gridStyles = computed(() => {
  return {
    gridTemplateColumns: `repeat(${props.config.columns || 4}, 1fr)`
  }
})
</script>

<style scoped>
.stats-module {
  width: 100%;
}

.stats-grid {
  display: grid;
  gap: 40px;
  text-align: center;
}

.stat-item {
  padding: 20px;
}

.stat-icon {
  margin-bottom: 20px;
  color: var(--secondary-color);
}

.stat-number {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: inherit;
}

.stat-label {
  font-size: 1.125rem;
  opacity: 0.9;
  color: inherit;
}

@media (max-width: 1024px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr !important;
    gap: 30px;
  }
  
  .stat-number {
    font-size: 2.5rem;
  }
}
</style>

