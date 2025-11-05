<template>
  <div class="news-page">
    <section class="page-hero gradient-bg">
      <div class="container">
        <div class="hero-content">
          <h1 class="page-title">健康资讯</h1>
          <p class="page-subtitle">了解医疗动态，掌握健康知识</p>
        </div>
      </div>
    </section>
    
    <section class="news-content section">
      <div class="container">
        <div class="news-grid">
          <div class="news-card card" v-for="news in newsList" :key="news.id">
            <div class="news-image">
              <img :src="news.image" :alt="news.title" />
              <div class="news-category">{{ news.category }}</div>
            </div>
            <div class="news-content">
              <div class="news-meta">
                <span>{{ news.date }}</span>
                <span>{{ news.author }}</span>
              </div>
              <h3>{{ news.title }}</h3>
              <p>{{ news.excerpt }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const newsList = ref([
  { id: 1, title: '康养医院荣获2024年度医疗服务质量优秀奖', excerpt: '医院在医疗康养领域的突出贡献获得认可...', category: '医院新闻', date: '2024-01-15', author: '康养医院', image: 'https://picsum.photos/400/250?random=30' },
  { id: 2, title: '慢性病管理新方法研究进展', excerpt: '医疗技术推动慢性病管理精准化发展...', category: '医疗动态', date: '2024-01-10', author: '医疗部', image: 'https://picsum.photos/400/250?random=31' },
  { id: 3, title: '健康管理助力生活品质提升', excerpt: '健康管理在现代生活中的重要作用...', category: '健康知识', date: '2024-01-05', author: '健康管理中心', image: 'https://picsum.photos/400/250?random=32' }
])
</script>

<style scoped>
.news-page { margin-top: 120px; }
.page-hero { padding: 100px 0; color: white; text-align: center; }
.page-title { font-size: 3rem; font-weight: 700; margin-bottom: 1rem; }
.page-subtitle { font-size: 1.25rem; opacity: 0.9; }
.news-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 30px; }
.news-card { overflow: hidden; }
.news-image { position: relative; height: 200px; overflow: hidden; }
.news-image img { width: 100%; height: 100%; object-fit: cover; }
.news-category { position: absolute; top: 15px; left: 15px; background: var(--primary-color); color: white; padding: 5px 12px; border-radius: 20px; font-size: 0.875rem; }
.news-content { padding: 25px; }
.news-meta { display: flex; gap: 15px; margin-bottom: 15px; font-size: 0.875rem; color: var(--gray-color); }
.news-content h3 { font-size: 1.125rem; margin-bottom: 15px; color: var(--dark-color); }
.news-content p { color: var(--gray-color); line-height: 1.6; }
</style> 