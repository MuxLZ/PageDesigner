<template>
  <BaseModuleWrapper :module-config="config">
    <section class="solutions-module section">
      <div class="container">
        <div v-if="config.title || config.subtitle" class="section-header">
          <h2 v-if="config.title" class="section-title">{{ config.title }}</h2>
          <p v-if="config.subtitle" class="section-subtitle">{{ config.subtitle }}</p>
        </div>
        
        <div class="solutions-tabs">
          <el-tabs v-model="activeTab" @tab-click="handleTabClick">
            <el-tab-pane
              v-for="tab in config.tabs"
              :key="tab.name"
              :label="tab.name"
              :name="tab.name"
            >
              <div class="solution-content">
                <div class="solution-info" data-aos="fade-right">
                  <h3 v-if="tab.title">{{ tab.title }}</h3>
                  <p v-if="tab.description">{{ tab.description }}</p>
                  <ul v-if="tab.benefits" class="solution-benefits">
                    <li v-for="(benefit, index) in tab.benefits" :key="index">
                      <el-icon><Check /></el-icon>
                      {{ benefit }}
                    </li>
                  </ul>
                  <el-button type="primary" size="large">
                    了解方案详情
                  </el-button>
                </div>
                <div v-if="tab.image" class="solution-image" data-aos="fade-left">
                  <img :src="tab.image" :alt="tab.title" />
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </section>
  </BaseModuleWrapper>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Check } from '@element-plus/icons-vue'
import type { SolutionsConfig } from '@/types/module'
import BaseModuleWrapper from './BaseModuleWrapper.vue'

interface Props {
  config: SolutionsConfig
}

const props = defineProps<Props>()

const activeTab = ref(props.config.activeTab || (props.config.tabs?.[0]?.name || ''))

watch(() => props.config.activeTab, (newVal) => {
  if (newVal) {
    activeTab.value = newVal
  }
})

const handleTabClick = (tab: any) => {
  // 可以在这里处理切换逻辑
}
</script>

<style scoped>
.solutions-module {
  width: 100%;
}

.solutions-tabs {
  margin-top: 40px;
}

.solution-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  padding: 40px 0;
}

.solution-info h3 {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: var(--dark-color);
}

.solution-info p {
  color: var(--gray-color);
  margin-bottom: 30px;
  line-height: 1.8;
}

.solution-benefits {
  list-style: none;
  margin-bottom: 40px;
}

.solution-benefits li {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  color: var(--dark-color);
}

.solution-benefits .el-icon {
  color: var(--success-color);
  font-weight: 600;
}

.solution-image img {
  width: 100%;
  border-radius: 12px;
}

@media (max-width: 1024px) {
  .solution-content {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}
</style>

