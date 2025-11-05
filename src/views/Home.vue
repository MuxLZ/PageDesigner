<template>
  <div class="home">
    <!-- 首屏轮播 -->
    <section class="hero-section">
      <el-carousel height="100vh" :interval="5000" arrow="never" indicator-position="none">
        <el-carousel-item v-for="(slide, index) in heroSlides" :key="index">
          <div class="hero-slide" :style="{ backgroundImage: `url(${slide.background})` }">
            <div class="hero-overlay"></div>
            <div class="container">
              <div class="hero-content" data-aos="fade-up">
                <h1 class="hero-title">{{ slide.title }}</h1>
                <p class="hero-subtitle">{{ slide.subtitle }}</p>
                <div class="hero-buttons">
                  <el-button type="primary" size="large" class="hero-btn">
                    了解更多
                    <el-icon class="el-icon--right"><ArrowRight /></el-icon>
                  </el-button>
                  <el-button size="large" class="hero-btn-secondary">
                    联系我们
                  </el-button>
                </div>
              </div>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
      
      <!-- 滚动指示器 -->
      <div class="scroll-indicator">
        <div class="scroll-arrow">
          <el-icon><ArrowDown /></el-icon>
        </div>
      </div>
    </section>

    <!-- 公司简介 -->
    <section class="about-section section">
      <div class="container">
        <div class="about-grid">
          <div class="about-content" data-aos="fade-right">
            <h2 class="section-title">医者仁心，健康守护</h2>
            <p class="section-subtitle">
              康养医院专注医疗康养领域20年，为患者提供专业医疗服务和健康管理方案
            </p>
            <div class="about-features">
              <div class="feature-item">
                <div class="feature-icon">
                  <el-icon><Tools /></el-icon>
                </div>
                <div class="feature-content">
                  <h4>专业医疗</h4>
                  <p>20年医疗康养经验，医疗技术实力雄厚</p>
                </div>
              </div>
              <div class="feature-item">
                <div class="feature-icon">
                  <el-icon><Trophy /></el-icon>
                </div>
                <div class="feature-content">
                  <h4>行业领先</h4>
                  <p>服务50000+患者，医疗服务质量优秀</p>
                </div>
              </div>
              <div class="feature-item">
                <div class="feature-icon">
                  <el-icon><Star /></el-icon>
                </div>
                <div class="feature-content">
                  <h4>品质保证</h4>
                  <p>三级甲等医院认证，医疗质量管理体系完善</p>
                </div>
              </div>
            </div>
            <el-button type="primary" size="large" class="about-btn">
              了解更多
            </el-button>
          </div>
          <div class="about-image" data-aos="fade-left">
            <img src="https://picsum.photos/600/400?random=1" alt="康养医院" />
          </div>
        </div>
      </div>
    </section>

    <!-- 数据统计 -->
    <section class="stats-section gradient-bg">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-item" data-aos="fade-up" data-aos-delay="0">
            <div class="stat-number">50000+</div>
            <div class="stat-label">服务患者</div>
          </div>
          <div class="stat-item" data-aos="fade-up" data-aos-delay="100">
            <div class="stat-number">20</div>
            <div class="stat-label">年专业经验</div>
          </div>
          <div class="stat-item" data-aos="fade-up" data-aos-delay="200">
            <div class="stat-number">200+</div>
            <div class="stat-label">专业医师</div>
          </div>
          <div class="stat-item" data-aos="fade-up" data-aos-delay="300">
            <div class="stat-number">98%</div>
            <div class="stat-label">患者满意度</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 产品展示 -->
    <section class="products-section section">
      <div class="container">
        <div class="section-header" data-aos="fade-up">
          <h2 class="section-title">核心服务</h2>
          <p class="section-subtitle">为患者提供全方位的医疗康养服务</p>
        </div>
        
        <div class="products-grid">
          <div class="product-card card" v-for="(product, index) in products" :key="index"
               data-aos="fade-up" :data-aos-delay="index * 100">
            <div class="product-image">
              <img :src="product.image" :alt="product.name" />
              <div class="product-overlay">
                <el-button type="primary" circle>
                  <el-icon><View /></el-icon>
                </el-button>
              </div>
            </div>
            <div class="product-content">
              <h3 class="product-name">{{ product.name }}</h3>
              <p class="product-desc">{{ product.description }}</p>
              <div class="product-features">
                <span v-for="feature in product.features" :key="feature" class="feature-tag">
                  {{ feature }}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="section-footer" data-aos="fade-up">
          <el-button type="primary" size="large">
            查看更多服务
            <el-icon class="el-icon--right"><ArrowRight /></el-icon>
          </el-button>
        </div>
      </div>
    </section>

    <!-- 解决方案 -->
    <section class="solutions-section section" style="background: var(--light-color);">
      <div class="container">
        <div class="section-header" data-aos="fade-up">
          <h2 class="section-title">医疗解决方案</h2>
          <p class="section-subtitle">针对不同需求提供定制化的医疗康养解决方案</p>
        </div>
        
        <div class="solutions-tabs">
          <el-tabs v-model="activeSolution" @tab-click="handleSolutionTab">
            <el-tab-pane
              v-for="solution in solutions"
              :key="solution.name"
              :label="solution.name"
              :name="solution.name"
            >
              <div class="solution-content">
                <div class="solution-info" data-aos="fade-right">
                  <h3>{{ solution.title }}</h3>
                  <p>{{ solution.description }}</p>
                  <ul class="solution-benefits">
                    <li v-for="benefit in solution.benefits" :key="benefit">
                      <el-icon><Check /></el-icon>
                      {{ benefit }}
                    </li>
                  </ul>
                  <el-button type="primary" size="large">
                    了解服务详情
                  </el-button>
                </div>
                <div class="solution-image" data-aos="fade-left">
                  <img :src="solution.image" :alt="solution.title" />
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </section>

    <!-- 新闻资讯 -->
    <section class="news-section section">
      <div class="container">
        <div class="section-header" data-aos="fade-up">
          <h2 class="section-title">健康资讯</h2>
          <p class="section-subtitle">了解医疗动态，掌握健康知识</p>
        </div>
        
        <div class="news-grid">
          <div class="news-card card" v-for="(news, index) in latestNews" :key="index"
               data-aos="fade-up" :data-aos-delay="index * 100">
            <div class="news-image">
              <img :src="news.image" :alt="news.title" />
              <div class="news-category">{{ news.category }}</div>
            </div>
            <div class="news-content">
              <div class="news-meta">
                <span class="news-date">{{ news.date }}</span>
                <span class="news-author">{{ news.author }}</span>
              </div>
              <h3 class="news-title">{{ news.title }}</h3>
              <p class="news-excerpt">{{ news.excerpt }}</p>
              <a href="#" class="news-link">
                阅读更多
                <el-icon><ArrowRight /></el-icon>
              </a>
            </div>
          </div>
        </div>
        
        <div class="section-footer" data-aos="fade-up">
          <el-button type="primary" size="large">
            查看更多资讯
            <el-icon class="el-icon--right"><ArrowRight /></el-icon>
          </el-button>
        </div>
      </div>
    </section>

    <!-- 合作伙伴 -->
    <section class="partners-section section" style="background: var(--light-color);">
      <div class="container">
        <div class="section-header" data-aos="fade-up">
          <h2 class="section-title">合作伙伴</h2>
          <p class="section-subtitle">与知名医疗机构建立长期合作关系</p>
        </div>
        
        <div class="partners-grid" data-aos="fade-up">
          <div class="partner-item" v-for="(partner, index) in partners" :key="index">
            <img :src="partner.logo" :alt="partner.name" />
          </div>
        </div>
      </div>
    </section>

    <!-- 联系我们 -->
    <section class="contact-section gradient-bg">
      <div class="container">
        <div class="contact-content" data-aos="fade-up">
          <h2>准备开始您的健康之旅？</h2>
          <p>联系我们的专业团队，获取个性化健康管理方案</p>
          <div class="contact-buttons">
            <el-button type="primary" size="large" class="contact-btn">
              免费咨询
              <el-icon class="el-icon--right"><Phone /></el-icon>
            </el-button>
            <el-button size="large" class="contact-btn-secondary">
              在线留言
            </el-button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 轮播数据
const heroSlides = ref([
  {
    title: '专业医疗 · 健康守护',
    subtitle: '专业的医疗康养服务，为您的健康生活保驾护航',
    background: 'https://picsum.photos/1920/1080?random=2'
  },
  {
    title: '康养服务 · 品质生活',
    subtitle: '先进的医疗技术和人性化服务，打造舒适、温馨的康养环境',
    background: 'https://picsum.photos/1920/1080?random=3'
  },
  {
    title: '医者仁心 · 专业服务',
    subtitle: '20年专业经验，为50000+患者提供优质医疗服务',
    background: 'https://picsum.photos/1920/1080?random=4'
  }
])

// 服务数据
const products = ref([
  {
    name: '专业医疗',
    description: '三甲医院标准，提供专业诊断和治疗服务',
    image: 'https://picsum.photos/400/300?random=5',
    features: ['专业医师', '先进设备', '精准诊断']
  },
  {
    name: '康复治疗',
    description: '个性化康复方案，帮助患者恢复健康',
    image: 'https://picsum.photos/400/300?random=6',
    features: ['个性化', '专业指导', '效果显著']
  },
  {
    name: '健康管理',
    description: '全方位健康管理服务，预防疾病发生',
    image: 'https://picsum.photos/400/300?random=7',
    features: ['定期体检', '健康档案', '专业咨询']
  },
  {
    name: '老年康养',
    description: '温馨舒适的康养环境，专业护理服务',
    image: 'https://picsum.photos/400/300?random=8',
    features: ['专业护理', '舒适环境', '贴心服务']
  }
])

// 解决方案数据
const activeSolution = ref('慢性病管理')
const solutions = ref([
  {
    name: '慢性病管理',
    title: '慢性病管理解决方案',
    description: '为慢性病患者提供全程健康管理，包括疾病监测、用药指导、生活方式干预等',
    benefits: [
      '提高治疗依从性',
      '降低并发症风险',
      '改善生活质量',
      '建立健康档案'
    ],
    image: 'https://picsum.photos/500/350?random=9'
  },
  {
    name: '康复治疗',
    title: '康复治疗解决方案',
    description: '针对术后康复、运动损伤等提供专业康复训练和治疗方案',
    benefits: [
      '加速功能恢复',
      '个性化康复计划',
      '专业康复团队',
      '全程跟踪指导'
    ],
    image: 'https://picsum.photos/500/350?random=10'
  },
  {
    name: '老年康养',
    title: '老年康养解决方案',
    description: '为老年人提供医养结合的综合康养服务，包括医疗、护理、生活照料等',
    benefits: [
      '医养结合服务',
      '专业护理团队',
      '舒适居住环境',
      '24小时照护'
    ],
    image: 'https://picsum.photos/500/350?random=11'
  }
])

// 新闻数据
const latestNews = ref([
  {
    title: '康养医院荣获2024年度医疗服务质量优秀奖',
    excerpt: '凭借在医疗康养领域的突出贡献，康养医院荣获行业权威奖项...',
    image: 'https://picsum.photos/400/250?random=12',
    category: '医院新闻',
    date: '2024-01-15',
    author: '康养医院'
  },
  {
    title: '慢性病管理新方法研究进展',
    excerpt: '随着医疗技术的发展，慢性病管理正朝着更加精准化和个性化的方向发展...',
    image: 'https://picsum.photos/400/250?random=13',
    category: '医疗动态',
    date: '2024-01-10',
    author: '医疗部'
  },
  {
    title: '健康管理助力生活品质提升',
    excerpt: '健康管理已成为现代生活的必然需求，专业医疗服务发挥着重要作用...',
    image: 'https://picsum.photos/400/250?random=14',
    category: '健康知识',
    date: '2024-01-05',
    author: '健康管理中心'
  }
])

// 合作伙伴数据
const partners = ref([
  { name: '医疗设备', logo: 'https://via.placeholder.com/120x60/f0f0f0/333333?text=医疗设备' },
  { name: '康复中心', logo: 'https://via.placeholder.com/120x60/f0f0f0/333333?text=康复中心' },
  { name: '健康管理', logo: 'https://via.placeholder.com/120x60/f0f0f0/333333?text=健康管理' },
  { name: '医疗研究', logo: 'https://via.placeholder.com/120x60/f0f0f0/333333?text=医疗研究' },
  { name: '康养机构', logo: 'https://via.placeholder.com/120x60/f0f0f0/333333?text=康养机构' },
  { name: '健康科技', logo: 'https://via.placeholder.com/120x60/f0f0f0/333333?text=健康科技' }
])

const handleSolutionTab = (tab: any) => {
  console.log('切换解决方案:', tab.props.name)
}
</script>

<style scoped>
.home {
  margin-top: 120px; /* 为固定头部留出空间 */
}

/* 首屏轮播 */
.hero-section {
  position: relative;
  height: 100vh;
}

.hero-slide {
  position: relative;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
}

.hero-content {
  position: relative;
  z-index: 2;
  color: white;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.25rem;
  margin-bottom: 2.5rem;
  opacity: 0.9;
}

.hero-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.hero-btn,
.hero-btn-secondary {
  padding: 15px 30px;
  font-size: 1.1rem;
  border-radius: 50px;
}

.hero-btn-secondary {
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid white;
  color: white;
}

.scroll-indicator {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
  40% { transform: translateX(-50%) translateY(-10px); }
  60% { transform: translateX(-50%) translateY(-5px); }
}

/* 公司简介 */
.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.about-features {
  margin: 40px 0;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
}

.feature-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
}

.feature-content h4 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 5px;
  color: var(--dark-color);
}

.feature-content p {
  color: var(--gray-color);
}

.about-image img {
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

/* 数据统计 */
.stats-section {
  padding: 80px 0;
  color: white;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  text-align: center;
}

.stat-number {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 10px;
}

.stat-label {
  font-size: 1.125rem;
  opacity: 0.9;
}

/* 产品展示 */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  margin-bottom: 50px;
}

.product-card {
  overflow: hidden;
  transition: all 0.3s ease;
}

.product-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(30, 58, 138, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.product-card:hover .product-overlay {
  opacity: 1;
}

.product-card:hover .product-image img {
  transform: scale(1.1);
}

.product-content {
  padding: 25px;
}

.product-name {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: var(--dark-color);
}

.product-desc {
  color: var(--gray-color);
  margin-bottom: 15px;
}

.product-features {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.feature-tag {
  background: var(--light-color);
  color: var(--primary-color);
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
}

/* 解决方案 */
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

/* 新闻资讯 */
.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
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

/* 合作伙伴 */
.partners-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 40px;
  align-items: center;
}

.partner-item {
  text-align: center;
  opacity: 0.6;
  transition: opacity 0.3s;
}

.partner-item:hover {
  opacity: 1;
}

.partner-item img {
  max-width: 120px;
  height: 60px;
  object-fit: contain;
  filter: grayscale(100%);
  transition: filter 0.3s;
}

.partner-item:hover img {
  filter: grayscale(0%);
}

/* 联系我们 */
.contact-section {
  padding: 100px 0;
  text-align: center;
  color: white;
}

.contact-content h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 20px;
}

.contact-content p {
  font-size: 1.25rem;
  margin-bottom: 40px;
  opacity: 0.9;
}

.contact-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.contact-btn,
.contact-btn-secondary {
  padding: 15px 30px;
  font-size: 1.1rem;
  border-radius: 50px;
}

.contact-btn-secondary {
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid white;
  color: white;
}

/* 通用样式 */
.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-footer {
  text-align: center;
  margin-top: 40px;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .about-grid,
  .solution-content {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .partners-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .home {
    margin-top: 70px;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .products-grid,
  .news-grid {
    grid-template-columns: 1fr;
  }
  
  .contact-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .partners-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }
}
</style> 