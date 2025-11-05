<template>
  <div class="solutions-page">
    <section class="page-hero gradient-bg">
      <div class="container">
        <div class="hero-content">
          <h1 class="page-title">医疗解决方案</h1>
          <p class="page-subtitle">为不同需求提供定制化的医疗康养解决方案</p>
        </div>
      </div>
    </section>
    
    <section class="solutions-content section">
      <div class="container">
        <div class="solutions-grid">
          <div class="solution-card card" v-for="solution in solutions" :key="solution.id">
            <div class="solution-image">
              <img :src="solution.image" :alt="solution.title" />
            </div>
            <div class="solution-content">
              <h3>{{ solution.title }}</h3>
              <p>{{ solution.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const solutions = ref([
      { id: 1, title: '慢性病管理解决方案', description: '为慢性病患者提供全程健康管理和治疗方案', image: 'https://picsum.photos/400/300?random=27' },
    { id: 2, title: '康复治疗解决方案', description: '专业康复训练和治疗方案', image: 'https://picsum.photos/400/300?random=28' },
    { id: 3, title: '老年康养解决方案', description: '医养结合的综合康养服务方案', image: 'https://picsum.photos/400/300?random=29' }
])
</script>

<style scoped>
.solutions-page { margin-top: 120px; }
.page-hero { padding: 100px 0; color: white; text-align: center; }
.page-title { font-size: 3rem; font-weight: 700; margin-bottom: 1rem; }
.page-subtitle { font-size: 1.25rem; opacity: 0.9; }
.solutions-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; }
.solution-card { overflow: hidden; }
.solution-image { height: 200px; overflow: hidden; }
.solution-image img { width: 100%; height: 100%; object-fit: cover; }
.solution-content { padding: 25px; }
.solution-content h3 { font-size: 1.25rem; margin-bottom: 15px; color: var(--dark-color); }
.solution-content p { color: var(--gray-color); line-height: 1.6; }
</style> 