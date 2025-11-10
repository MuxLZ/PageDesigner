<template>
  <BaseModuleWrapper :module-config="config">
    <section class="news-module section">
      <div class="container">
        <div v-if="config.title || config.subtitle" class="section-header">
          <h2 v-if="config.title" class="section-title">{{ config.title }}</h2>
          <p v-if="config.subtitle" class="section-subtitle">{{ config.subtitle }}</p>
        </div>
        
        <div
          class="news-grid"
          :style="gridStyles"
        >
          <div
            v-for="(news, index) in (config.items || [])"
            :key="index"
            class="news-card card"
            data-aos="fade-up"
            :data-aos-delay="index * 100"
          >
            <div v-if="news.image" class="news-image">
              <img :src="news.image" :alt="news.title" />
              <div v-if="news.category" class="news-category">{{ news.category }}</div>
            </div>
            <div class="news-content">
              <div v-if="news.date || news.author" class="news-meta">
                <span v-if="news.date" class="news-date">{{ news.date }}</span>
                <span v-if="news.author" class="news-author">{{ news.author }}</span>
              </div>
              <h3 v-if="news.title" class="news-title">{{ news.title }}</h3>
              <p v-if="news.excerpt" class="news-excerpt">{{ news.excerpt }}</p>
              <a v-if="news.link" :href="news.link" class="news-link">
                阅读更多
                <el-icon><ArrowRight /></el-icon>
              </a>
            </div>
          </div>
        </div>
        
        <div v-if="config.showMore" class="section-footer">
          <el-button type="primary" size="large" @click="handleMoreClick">
            查看更多资讯
            <el-icon class="el-icon--right"><ArrowRight /></el-icon>
          </el-button>
        </div>
      </div>
    </section>
  </BaseModuleWrapper>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ArrowRight } from '@element-plus/icons-vue'
import type { NewsConfig } from '@/types/module'
import BaseModuleWrapper from './BaseModuleWrapper.vue'

interface Props {
  config: NewsConfig
}

const props = defineProps<Props>()

const gridStyles = computed(() => {
  return {
    gridTemplateColumns: `repeat(${props.config.columns || 3}, 1fr)`,
    gap: '30px'
  }
})

const handleMoreClick = () => {
  if (props.config.moreLink) {
    // router.push(props.config.moreLink)
  }
}
</script>

<style scoped>
.news-module {
  width: 100%;
}

.news-grid {
  display: grid;
  margin-bottom: 50px;
}

.news-card {
  overflow: hidden;
}

.news-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.news-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.news-category {
  position: absolute;
  top: 15px;
  left: 15px;
  background: var(--primary-color);
  color: white;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.875rem;
}

.news-content {
  padding: 25px;
}

.news-meta {
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
  font-size: 0.875rem;
  color: var(--gray-color);
}

.news-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 15px;
  color: var(--dark-color);
  line-height: 1.4;
}

.news-excerpt {
  color: var(--gray-color);
  margin-bottom: 20px;
  line-height: 1.6;
}

.news-link {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: color 0.3s;
}

.news-link:hover {
  color: var(--secondary-color);
}

@media (max-width: 1024px) {
  .news-grid {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}

@media (max-width: 768px) {
  .news-grid {
    grid-template-columns: 1fr !important;
  }
}
</style>

