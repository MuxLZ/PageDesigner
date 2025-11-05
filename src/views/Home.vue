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
            <h2 class="section-title">智造未来，科技领先</h2>
            <p class="section-subtitle">
              智造科技专注工业自动化领域20年，为全球客户提供智能制造解决方案
            </p>
            <div class="about-features">
              <div class="feature-item">
                <div class="feature-icon">
                  <el-icon><Tools /></el-icon>
                </div>
                <div class="feature-content">
                  <h4>专业技术</h4>
                  <p>20年工业自动化经验，技术实力雄厚</p>
                </div>
              </div>
              <div class="feature-item">
                <div class="feature-icon">
                  <el-icon><Trophy /></el-icon>
                </div>
                <div class="feature-content">
                  <h4>行业领先</h4>
                  <p>服务500+企业，行业标杆案例丰富</p>
                </div>
              </div>
              <div class="feature-item">
                <div class="feature-icon">
                  <el-icon><Star /></el-icon>
                </div>
                <div class="feature-content">
                  <h4>品质保证</h4>
                  <p>ISO9001认证，品质管理体系完善</p>
                </div>
              </div>
            </div>
            <el-button type="primary" size="large" class="about-btn">
              了解更多
            </el-button>
          </div>
          <div class="about-image" data-aos="fade-left">
            <img src="https://picsum.photos/600/400?random=1" alt="智能工厂" />
          </div>
        </div>
      </div>
    </section>

    <!-- 数据统计 -->
    <section class="stats-section gradient-bg">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-item" data-aos="fade-up" data-aos-delay="0">
            <div class="stat-number">500+</div>
            <div class="stat-label">服务企业</div>
          </div>
          <div class="stat-item" data-aos="fade-up" data-aos-delay="100">
            <div class="stat-number">20</div>
            <div class="stat-label">年专业经验</div>
          </div>
          <div class="stat-item" data-aos="fade-up" data-aos-delay="200">
            <div class="stat-number">1000+</div>
            <div class="stat-label">成功案例</div>
          </div>
          <div class="stat-item" data-aos="fade-up" data-aos-delay="300">
            <div class="stat-number">98%</div>
            <div class="stat-label">客户满意度</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 产品展示 -->
    <section class="products-section section">
      <div class="container">
        <div class="section-header" data-aos="fade-up">
          <h2 class="section-title">核心产品</h2>
          <p class="section-subtitle">为企业提供全方位的工业自动化解决方案</p>
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
            查看更多产品
            <el-icon class="el-icon--right"><ArrowRight /></el-icon>
          </el-button>
        </div>
      </div>
    </section>

    <!-- 解决方案 -->
    <section class="solutions-section section" style="background: var(--light-color);">
      <div class="container">
        <div class="section-header" data-aos="fade-up">
          <h2 class="section-title">行业解决方案</h2>
          <p class="section-subtitle">针对不同行业提供定制化的智能制造解决方案</p>
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
                    了解方案详情
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
          <h2 class="section-title">新闻资讯</h2>
          <p class="section-subtitle">了解行业动态，掌握前沿技术</p>
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
          <p class="section-subtitle">与全球知名企业建立长期合作关系</p>
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
          <h2>准备开始您的智能制造之旅？</h2>
          <p>联系我们的专业团队，获取定制化解决方案</p>
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
    title: '智能制造 · 引领未来',
    subtitle: '专业的工业自动化解决方案，助力企业数字化转型升级',
    background: 'https://picsum.photos/1920/1080?random=2'
  },
  {
    title: '工业4.0 · 智慧工厂',
    subtitle: '先进的智能制造技术，打造高效、节能的现代化工厂',
    background: 'https://picsum.photos/1920/1080?random=3'
  },
  {
    title: '技术创新 · 品质卓越',
    subtitle: '20年专业经验，为全球500+企业提供优质服务',
    background: 'https://picsum.photos/1920/1080?random=4'
  }
])

// 产品数据
const products = ref([
  {
    name: '自动化生产线',
    description: '高效、稳定的自动化生产线解决方案',
    image: 'https://picsum.photos/400/300?random=5',
    features: ['高效率', '低能耗', '智能化']
  },
  {
    name: '工业机器人',
    description: '精密、灵活的工业机器人系统',
    image: 'https://picsum.photos/400/300?random=6',
    features: ['精度高', '速度快', '可靠性强']
  },
  {
    name: 'PLC控制系统',
    description: '稳定可靠的工业控制系统',
    image: 'https://picsum.photos/400/300?random=7',
    features: ['稳定性', '扩展性', '易维护']
  },
  {
    name: '智能传感器',
    description: '高精度的智能检测设备',
    image: 'https://picsum.photos/400/300?random=8',
    features: ['高精度', '实时监控', '数据分析']
  }
])

// 解决方案数据
const activeSolution = ref('汽车制造')
const solutions = ref([
  {
    name: '汽车制造',
    title: '汽车制造智能化解决方案',
    description: '为汽车制造企业提供从零部件生产到整车装配的全流程自动化解决方案',
    benefits: [
      '提高生产效率30%以上',
      '降低人工成本40%',
      '提升产品质量稳定性',
      '实现柔性化生产'
    ],
    image: 'https://picsum.photos/500/350?random=9'
  },
  {
    name: '电子制造',
    title: '电子制造精密化解决方案',
    description: '针对电子产品制造的高精度、高速度自动化生产线',
    benefits: [
      '提升产品精度和一致性',
      '缩短生产周期50%',
      '降低不良品率',
      '实现无人化生产'
    ],
    image: 'https://picsum.photos/500/350?random=10'
  },
  {
    name: '食品饮料',
    title: '食品饮料安全化解决方案',
    description: '确保食品安全的全自动化生产和包装系统',
    benefits: [
      '保证食品安全标准',
      '提高包装效率',
      '降低人工接触风险',
      '实现可追溯管理'
    ],
    image: 'https://picsum.photos/500/350?random=11'
  }
])

// 新闻数据
const latestNews = ref([
  {
    title: '智造科技荣获2024年度工业自动化创新奖',
    excerpt: '凭借在工业4.0领域的突出贡献，智造科技荣获行业权威奖项...',
    image: 'https://picsum.photos/400/250?random=12',
    category: '公司新闻',
    date: '2024-01-15',
    author: '智造科技'
  },
  {
    title: '工业机器人技术发展趋势分析',
    excerpt: '随着人工智能技术的发展，工业机器人正朝着更加智能化的方向发展...',
    image: 'https://picsum.photos/400/250?random=13',
    category: '行业动态',
    date: '2024-01-10',
    author: '技术部'
  },
  {
    title: '智能制造助力企业数字化转型',
    excerpt: '数字化转型已成为企业发展的必然趋势，智能制造技术发挥着重要作用...',
    image: 'https://picsum.photos/400/250?random=14',
    category: '技术分享',
    date: '2024-01-05',
    author: '研发中心'
  }
])

// 合作伙伴数据
const partners = ref([
  { name: 'Siemens', logo: 'https://via.placeholder.com/120x60/f0f0f0/333333?text=Siemens' },
  { name: 'ABB', logo: 'https://via.placeholder.com/120x60/f0f0f0/333333?text=ABB' },
  { name: 'Schneider', logo: 'https://via.placeholder.com/120x60/f0f0f0/333333?text=Schneider' },
  { name: 'Rockwell', logo: 'https://via.placeholder.com/120x60/f0f0f0/333333?text=Rockwell' },
  { name: 'KUKA', logo: 'https://via.placeholder.com/120x60/f0f0f0/333333?text=KUKA' },
  { name: 'Fanuc', logo: 'https://via.placeholder.com/120x60/f0f0f0/333333?text=Fanuc' }
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