<template>
  <div class="about-page">
    <!-- 页面头部 -->
    <section class="page-hero gradient-bg">
      <div class="container">
        <div class="hero-content" data-aos="fade-up">
          <h1 class="page-title">关于我们</h1>
          <p class="page-subtitle">智造科技 - 您身边的工业自动化专家</p>
          <nav class="breadcrumb">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>关于我们</el-breadcrumb-item>
            </el-breadcrumb>
          </nav>
        </div>
      </div>
    </section>

    <!-- 公司简介 -->
    <section class="company-intro section">
      <div class="container">
        <div class="intro-grid">
          <div class="intro-content" data-aos="fade-right">
            <h2 class="section-title">智造未来，科技领先</h2>
            <p class="intro-text">
              智造科技成立于2004年，是一家专注于工业自动化领域的高科技企业。20年来，我们始终坚持技术创新，致力于为客户提供最优质的智能制造解决方案。
            </p>
            <p class="intro-text">
              公司拥有一支由资深工程师组成的专业团队，在工业自动化、智能制造、工业4.0等领域积累了丰富的经验。我们的产品和服务已成功应用于汽车、电子、食品、医药等多个行业。
            </p>
            <div class="company-values">
              <div class="value-item">
                <el-icon class="value-icon"><Target /></el-icon>
                <h4>使命</h4>
                <p>推动制造业智能化转型，提升企业竞争力</p>
              </div>
              <div class="value-item">
                <el-icon class="value-icon"><View /></el-icon>
                <h4>愿景</h4>
                <p>成为全球领先的智能制造解决方案提供商</p>
              </div>
              <div class="value-item">
                <el-icon class="value-icon"><Star /></el-icon>
                <h4>价值观</h4>
                <p>创新、专业、诚信、合作、共赢</p>
              </div>
            </div>
          </div>
          <div class="intro-image" data-aos="fade-left">
            <img src="https://picsum.photos/600/400?random=15" alt="公司简介" />
          </div>
        </div>
      </div>
    </section>

    <!-- 发展历程 -->
    <section class="timeline-section section" style="background: var(--light-color);">
      <div class="container">
        <div class="section-header" data-aos="fade-up">
          <h2 class="section-title">发展历程</h2>
          <p class="section-subtitle">20年发展路程，见证行业变迁</p>
        </div>
        
        <div class="timeline">
          <div class="timeline-item" v-for="(milestone, index) in milestones" :key="index"
               data-aos="fade-up" :data-aos-delay="index * 100">
            <div class="timeline-marker"></div>
            <div class="timeline-content">
              <div class="timeline-year">{{ milestone.year }}</div>
              <h3 class="timeline-title">{{ milestone.title }}</h3>
              <p class="timeline-desc">{{ milestone.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 团队介绍 -->
    <section class="team-section section">
      <div class="container">
        <div class="section-header" data-aos="fade-up">
          <h2 class="section-title">核心团队</h2>
          <p class="section-subtitle">汇聚行业精英，共创美好未来</p>
        </div>
        
        <div class="team-grid">
          <div class="team-card card" v-for="(member, index) in teamMembers" :key="index"
               data-aos="fade-up" :data-aos-delay="index * 100">
            <div class="member-avatar">
              <img :src="member.avatar" :alt="member.name" />
            </div>
            <div class="member-info">
              <h3 class="member-name">{{ member.name }}</h3>
              <p class="member-position">{{ member.position }}</p>
              <p class="member-bio">{{ member.bio }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 资质荣誉 -->
    <section class="honors-section section" style="background: var(--light-color);">
      <div class="container">
        <div class="section-header" data-aos="fade-up">
          <h2 class="section-title">资质荣誉</h2>
          <p class="section-subtitle">权威认证，实力见证</p>
        </div>
        
        <div class="honors-grid">
          <div class="honor-item" v-for="(honor, index) in honors" :key="index"
               data-aos="zoom-in" :data-aos-delay="index * 100">
            <div class="honor-image">
              <img :src="honor.image" :alt="honor.title" />
            </div>
            <h4 class="honor-title">{{ honor.title }}</h4>
          </div>
        </div>
      </div>
    </section>

    <!-- 企业文化 -->
    <section class="culture-section section">
      <div class="container">
        <div class="culture-content">
          <div class="culture-text" data-aos="fade-right">
            <h2 class="section-title">企业文化</h2>
            <p class="section-subtitle">以人为本，追求卓越</p>
            <div class="culture-items">
              <div class="culture-item">
                <h4>创新驱动</h4>
                <p>持续技术创新，推动行业进步</p>
              </div>
              <div class="culture-item">
                <h4>客户至上</h4>
                <p>以客户需求为导向，提供优质服务</p>
              </div>
              <div class="culture-item">
                <h4>团队协作</h4>
                <p>发挥团队力量，实现共同目标</p>
              </div>
              <div class="culture-item">
                <h4>社会责任</h4>
                <p>积极承担社会责任，回馈社会</p>
              </div>
            </div>
          </div>
          <div class="culture-image" data-aos="fade-left">
            <img src="https://picsum.photos/600/400?random=16" alt="企业文化" />
          </div>
        </div>
      </div>
    </section>

    <!-- 联系我们 -->
    <section class="contact-cta gradient-bg">
      <div class="container">
        <div class="cta-content" data-aos="fade-up">
          <h2>想了解更多？</h2>
          <p>欢迎联系我们，让我们一起创造更美好的未来</p>
          <el-button type="primary" size="large" @click="$router.push('/contact')">
            联系我们
            <el-icon class="el-icon--right"><ArrowRight /></el-icon>
          </el-button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 发展历程数据
const milestones = ref([
  {
    year: '2004',
    title: '公司成立',
    description: '智造科技在上海成立，开始专注工业自动化领域'
  },
  {
    year: '2008',
    title: '技术突破',
    description: '自主研发的PLC控制系统获得国家专利，技术实力得到认可'
  },
  {
    year: '2012',
    title: '业务扩展',
    description: '业务范围扩展至全国，服务客户超过100家'
  },
  {
    year: '2016',
    title: '战略转型',
    description: '全面转向智能制造，推出工业4.0解决方案'
  },
  {
    year: '2020',
    title: '数字化升级',
    description: '完成数字化转型，建立智能工厂示范基地'
  },
  {
    year: '2024',
    title: '行业领先',
    description: '服务客户超过500家，成为行业领军企业'
  }
])

// 团队成员数据
const teamMembers = ref([
  {
    name: '张建华',
    position: '创始人兼CEO',
    bio: '20年工业自动化经验，清华大学硕士，行业资深专家',
    avatar: 'https://i.pravatar.cc/150?img=33'
  },
  {
    name: '李明',
    position: '技术总监',
    bio: '15年技术研发经验，主导多项核心技术突破',
    avatar: 'https://i.pravatar.cc/150?img=45'
  },
  {
    name: '王丽',
    position: '市场总监',
    bio: '12年市场营销经验，深谙行业发展趋势',
    avatar: 'https://i.pravatar.cc/150?img=44'
  },
  {
    name: '陈强',
    position: '生产总监',
    bio: '18年生产管理经验，精通智能制造工艺',
    avatar: 'https://i.pravatar.cc/150?img=50'
  }
])

// 资质荣誉数据
const honors = ref([
  {
    title: 'ISO9001质量管理体系认证',
    image: 'https://via.placeholder.com/200x200/1e3a8a/ffffff?text=ISO9001'
  },
  {
    title: '国家高新技术企业',
    image: 'https://via.placeholder.com/200x200/3b82f6/ffffff?text=高新企业'
  },
  {
    title: '2023年度创新企业奖',
    image: 'https://via.placeholder.com/200x200/f59e0b/ffffff?text=创新奖'
  },
  {
    title: '工业自动化优秀供应商',
    image: 'https://via.placeholder.com/200x200/10b981/ffffff?text=优秀供应商'
  },
  {
    title: '智能制造示范企业',
    image: 'https://via.placeholder.com/200x200/8b5cf6/ffffff?text=示范企业'
  },
  {
    title: '科技进步奖',
    image: 'https://via.placeholder.com/200x200/ef4444/ffffff?text=科技奖'
  }
])
</script>

<style scoped>
.about-page {
  margin-top: 120px;
}

/* 页面头部 */
.page-hero {
  padding: 100px 0;
  color: white;
  text-align: center;
}

.page-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.page-subtitle {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.breadcrumb {
  display: flex;
  justify-content: center;
}

.breadcrumb :deep(.el-breadcrumb__inner) {
  color: rgba(255, 255, 255, 0.8);
}

.breadcrumb :deep(.el-breadcrumb__inner:hover) {
  color: white;
}

/* 公司简介 */
.intro-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.intro-text {
  font-size: 1.125rem;
  line-height: 1.8;
  color: var(--gray-color);
  margin-bottom: 1.5rem;
}

.company-values {
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
  margin-top: 40px;
}

.value-item {
  display: flex;
  align-items: flex-start;
  gap: 20px;
}

.value-icon {
  width: 50px;
  height: 50px;
  background: var(--primary-color);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.25rem;
  flex-shrink: 0;
}

.value-item h4 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: var(--dark-color);
}

.value-item p {
  color: var(--gray-color);
  line-height: 1.6;
}

.intro-image img {
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

/* 发展历程 */
.timeline {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--primary-color);
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

/* 团队介绍 */
.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
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

/* 资质荣誉 */
.honors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
}

.honor-item {
  text-align: center;
  transition: transform 0.3s ease;
}

.honor-item:hover {
  transform: translateY(-5px);
}

.honor-image {
  width: 150px;
  height: 150px;
  margin: 0 auto 20px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.honor-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.honor-title {
  font-size: 1rem;
  font-weight: 500;
  color: var(--dark-color);
}

/* 企业文化 */
.culture-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.culture-items {
  display: grid;
  grid-template-columns: 1fr;
  gap: 25px;
  margin-top: 40px;
}

.culture-item h4 {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--dark-color);
}

.culture-item p {
  color: var(--gray-color);
  line-height: 1.6;
}

.culture-image img {
  width: 100%;
  border-radius: 12px;
}

/* 联系CTA */
.contact-cta {
  padding: 80px 0;
  text-align: center;
  color: white;
}

.cta-content h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 20px;
}

.cta-content p {
  font-size: 1.25rem;
  margin-bottom: 40px;
  opacity: 0.9;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .intro-grid,
  .culture-content {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .timeline::before {
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

@media (max-width: 768px) {
  .about-page {
    margin-top: 70px;
  }
  
  .page-title {
    font-size: 2.5rem;
  }
  
  .team-grid {
    grid-template-columns: 1fr;
  }
  
  .honors-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .company-values {
    gap: 20px;
  }
  
  .value-item {
    flex-direction: column;
    text-align: center;
  }
}
</style> 