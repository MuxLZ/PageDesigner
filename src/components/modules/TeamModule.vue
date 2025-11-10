<template>
  <BaseModuleWrapper :module-config="config">
    <section class="team-module section">
      <div class="container">
        <div v-if="config.title || config.subtitle" class="section-header">
          <h2 v-if="config.title" class="section-title">{{ config.title }}</h2>
          <p v-if="config.subtitle" class="section-subtitle">{{ config.subtitle }}</p>
        </div>
        
        <div
          class="team-grid"
          :style="gridStyles"
        >
          <div
            v-for="(member, index) in (config.items || [])"
            :key="index"
            class="team-card card"
            data-aos="fade-up"
            :data-aos-delay="index * 100"
          >
            <div v-if="member.avatar" class="member-avatar">
              <img :src="member.avatar" :alt="member.name" />
            </div>
            <div class="member-info">
              <h3 v-if="member.name" class="member-name">{{ member.name }}</h3>
              <p v-if="member.position" class="member-position">{{ member.position }}</p>
              <p v-if="member.bio" class="member-bio">{{ member.bio }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </BaseModuleWrapper>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { TeamConfig } from '@/types/module'
import BaseModuleWrapper from './BaseModuleWrapper.vue'

interface Props {
  config: TeamConfig
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
.team-module {
  width: 100%;
}

.team-grid {
  display: grid;
}

.team-card {
  text-align: center;
  padding: 30px 20px;
}

.member-avatar {
  width: 120px;
  height: 120px;
  margin: 0 auto 20px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid var(--border-color);
}

.member-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.member-name {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 5px;
  color: var(--dark-color);
}

.member-position {
  color: var(--primary-color);
  font-weight: 500;
  margin-bottom: 15px;
}

.member-bio {
  color: var(--gray-color);
  line-height: 1.6;
}

@media (max-width: 1024px) {
  .team-grid {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}

@media (max-width: 768px) {
  .team-grid {
    grid-template-columns: 1fr !important;
  }
}
</style>

