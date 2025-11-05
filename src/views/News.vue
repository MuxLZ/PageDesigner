<template>
  <div class="news-page">
    <section class="page-hero gradient-bg">
      <div class="container">
        <div class="hero-content">
          <h1 class="page-title">新闻资讯</h1>
          <p class="page-subtitle">了解行业动态，掌握前沿技术</p>
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
  { id: 1, title: '智造科技荣获2024年度创新奖', excerpt: '公司在工业4.0领域的突出贡献获得认可...', category: '公司新闻', date: '2024-01-15', author: '智造科技', image: 'https://picsum.photos/400/250?random=30' },
  { id: 2, title: '工业机器人技术发展趋势', excerpt: '人工智能推动工业机器人智能化发展...', category: '行业动态', date: '2024-01-10', author: '技术部', image: 'https://picsum.photos/400/250?random=31' },
  { id: 3, title: '智能制造助力数字化转型', excerpt: '智能制造技术在企业转型中的重要作用...', category: '技术分享', date: '2024-01-05', author: '研发中心', image: 'https://picsum.photos/400/250?random=32' }
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