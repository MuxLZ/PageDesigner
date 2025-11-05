<template>
  <BaseModuleWrapper :module-config="config">
    <section class="timeline-module section">
      <div class="container">
        <div
          class="timeline"
          :class="`timeline-${config.layout || 'vertical'}`"
          :style="timelineStyles"
        >
          <div
            v-for="(item, index) in config.items"
            :key="index"
            class="timeline-item"
            data-aos="fade-up"
            :data-aos-delay="index * 100"
          >
            <div class="timeline-marker" :style="markerStyles"></div>
            <div class="timeline-content">
              <div v-if="item.year" class="timeline-year">{{ item.year }}</div>
              <h3 class="timeline-title">{{ item.title }}</h3>
              <p v-if="item.description" class="timeline-desc">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </BaseModuleWrapper>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { TimelineConfig } from '@/types/module'
import BaseModuleWrapper from './BaseModuleWrapper.vue'

interface Props {
  config: TimelineConfig
}

const props = defineProps<Props>()

const timelineStyles = computed(() => {
  const styles: Record<string, any> = {}
  if (props.config.lineColor) {
    styles['--timeline-line-color'] = props.config.lineColor
  }
  return styles
})

const markerStyles = computed(() => {
  const styles: Record<string, any> = {}
  if (props.config.markerColor) {
    styles.backgroundColor = props.config.markerColor
    styles.borderColor = props.config.markerColor
  }
  return styles
})
</script>

<style scoped>
.timeline-module {
  width: 100%;
}

.timeline {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

.timeline-vertical::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--timeline-line-color, var(--primary-color));
  transform: translateX(-50%);
}

.timeline-item {
  position: relative;
  margin-bottom: 60px;
}

.timeline-item:nth-child(odd) .timeline-content {
  padding-right: 53%;
  text-align: right;
}

.timeline-item:nth-child(even) .timeline-content {
  padding-left: 53%;
  text-align: left;
}

.timeline-marker {
  position: absolute;
  left: 50%;
  top: 0;
  width: 20px;
  height: 20px;
  background: var(--primary-color);
  border: 4px solid white;
  border-radius: 50%;
  transform: translateX(-50%);
  box-shadow: 0 0 0 4px var(--border-color);
}

.timeline-year {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 10px;
}

.timeline-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: var(--dark-color);
}

.timeline-desc {
  color: var(--gray-color);
  line-height: 1.6;
}

@media (max-width: 1024px) {
  .timeline-vertical::before {
    left: 30px;
  }
  
  .timeline-item:nth-child(odd) .timeline-content,
  .timeline-item:nth-child(even) .timeline-content {
    padding-left: 80px;
    padding-right: 0;
    text-align: left;
  }
  
  .timeline-marker {
    left: 30px;
  }
}
</style>

