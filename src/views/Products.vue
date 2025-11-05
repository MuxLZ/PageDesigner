<template>
  <div class="products-page">
    <!-- 页面头部 -->
    <section class="page-hero gradient-bg">
      <div class="container">
        <div class="hero-content" data-aos="fade-up">
          <h1 class="page-title">医疗服务</h1>
          <p class="page-subtitle">专业的医疗康养服务，助力健康生活品质提升</p>
          <nav class="breadcrumb">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>医疗服务</el-breadcrumb-item>
            </el-breadcrumb>
          </nav>
        </div>
      </div>
    </section>

    <!-- 产品分类 -->
    <section class="product-categories section">
      <div class="container">
        <div class="category-tabs">
          <el-tabs v-model="activeCategory" @tab-click="handleCategoryChange">
            <el-tab-pane
              v-for="category in productCategories"
              :key="category.name"
              :label="category.name"
              :name="category.name"
            >
              <div class="products-grid">
                <div class="product-card card" v-for="(product, index) in category.products" :key="index"
                     data-aos="fade-up" :data-aos-delay="index * 100">
                  <div class="product-image">
                    <img :src="product.image" :alt="product.name" />
                    <div class="product-overlay">
                      <el-button type="primary" @click="viewProduct(product)">
                        查看详情
                      </el-button>
                    </div>
                  </div>
                  <div class="product-content">
                    <h3 class="product-name">{{ product.name }}</h3>
                    <p class="product-model">型号：{{ product.model }}</p>
                    <p class="product-desc">{{ product.description }}</p>
                    <div class="product-specs">
                      <div class="spec-item" v-for="spec in product.specs" :key="spec.name">
                        <span class="spec-name">{{ spec.name }}:</span>
                        <span class="spec-value">{{ spec.value }}</span>
                      </div>
                    </div>
                    <div class="product-actions">
                      <el-button type="primary" @click="viewProduct(product)">
                        查看详情
                      </el-button>
                      <el-button @click="contactUs">
                        询价
                      </el-button>
                    </div>
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </section>

    <!-- 产品优势 -->
    <section class="product-advantages section" style="background: var(--light-color);">
      <div class="container">
        <div class="section-header" data-aos="fade-up">
          <h2 class="section-title">服务优势</h2>
          <p class="section-subtitle">为什么选择我们的服务</p>
        </div>
        
        <div class="advantages-grid">
          <div class="advantage-item" v-for="(advantage, index) in advantages" :key="index"
               data-aos="fade-up" :data-aos-delay="index * 100">
            <div class="advantage-icon">
              <el-icon :size="40">
                <component :is="advantage.icon"></component>
              </el-icon>
            </div>
            <h3 class="advantage-title">{{ advantage.title }}</h3>
            <p class="advantage-desc">{{ advantage.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 技术支持 -->
    <section class="tech-support section">
      <div class="container">
        <div class="support-content">
          <div class="support-text" data-aos="fade-right">
            <h2 class="section-title">全方位医疗服务</h2>
            <p class="section-subtitle">从健康咨询到治疗康复，我们提供全程专业服务</p>
            <div class="support-features">
              <div class="support-feature">
                <el-icon><Headset /></el-icon>
                <div>
                  <h4>24/7 医疗咨询</h4>
                  <p>全天候医疗热线，随时为您解答健康问题</p>
                </div>
              </div>
              <div class="support-feature">
                <el-icon><Tools /></el-icon>
                <div>
                  <h4>专业诊疗服务</h4>
                  <p>专业医师团队提供精准诊断和治疗服务</p>
                </div>
              </div>
              <div class="support-feature">
                <el-icon><Medal /></el-icon>
                <div>
                  <h4>康复跟踪服务</h4>
                  <p>提供完善的康复跟踪服务，让您康复无忧</p>
                </div>
              </div>
            </div>
          </div>
          <div class="support-image" data-aos="fade-left">
            <img src="https://picsum.photos/600/400?random=25" alt="技术支持" />
          </div>
        </div>
      </div>
    </section>

    <!-- 联系我们 -->
    <section class="contact-cta gradient-bg">
      <div class="container">
        <div class="cta-content" data-aos="fade-up">
          <h2>需要个性化健康方案？</h2>
          <p>联系我们的医疗专家，为您量身定制最适合的健康管理方案</p>
          <div class="cta-buttons">
            <el-button type="primary" size="large" @click="contactUs">
              立即咨询
              <el-icon class="el-icon--right"><Phone /></el-icon>
            </el-button>
            <el-button size="large" class="btn-secondary">
              下载资料
              <el-icon class="el-icon--right"><Download /></el-icon>
            </el-button>
          </div>
        </div>
      </div>
    </section>

    <!-- 产品详情弹窗 -->
    <el-dialog
      v-model="productDialogVisible"
      :title="selectedProduct?.name"
      width="80%"
      :before-close="closeProductDialog"
    >
      <div class="product-detail" v-if="selectedProduct">
        <div class="detail-grid">
          <div class="detail-image">
            <img :src="selectedProduct.image" :alt="selectedProduct.name" />
          </div>
          <div class="detail-info">
            <h3>{{ selectedProduct.name }}</h3>
            <p class="detail-model">型号：{{ selectedProduct.model }}</p>
            <p class="detail-desc">{{ selectedProduct.description }}</p>
            <div class="detail-specs">
              <h4>技术参数</h4>
              <table class="specs-table">
                <tr v-for="spec in selectedProduct.specs" :key="spec.name">
                  <td>{{ spec.name }}</td>
                  <td>{{ spec.value }}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div class="detail-features" v-if="selectedProduct.features">
          <h4>产品特点</h4>
          <ul>
            <li v-for="feature in selectedProduct.features" :key="feature">
              <el-icon><Check /></el-icon>
              {{ feature }}
            </li>
          </ul>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="closeProductDialog">关闭</el-button>
          <el-button type="primary" @click="contactUs">询价</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 当前激活的服务分类
const activeCategory = ref('医疗设备')

// 产品详情弹窗
const productDialogVisible = ref(false)
const selectedProduct = ref(null)

// 服务分类数据
const productCategories = ref([
  {
    name: '医疗设备',
    products: [
      {
        name: 'CT扫描设备',
        model: 'KY-CT-3000',
        description: '先进的CT扫描设备，提供高精度医学影像诊断',
        image: 'https://picsum.photos/400/300?random=17',
        specs: [
          { name: '扫描速度', value: '0.5秒/层' },
          { name: '分辨率', value: '0.625mm' },
          { name: '最大扫描范围', value: '200cm' },
          { name: '辐射剂量', value: '低剂量' }
        ],
        features: [
          '高精度成像',
          '快速扫描',
          '低辐射剂量',
          '智能诊断辅助'
        ]
      },
      {
        name: '核磁共振设备',
        model: 'KY-MRI-1500',
        description: '高场强核磁共振设备，提供清晰软组织成像',
        image: 'https://picsum.photos/400/300?random=18',
        specs: [
          { name: '场强', value: '1.5T' },
          { name: '扫描序列', value: '多种序列' },
          { name: '扫描范围', value: '全身' },
          { name: '检查时间', value: '30-60分钟' }
        ],
        features: [
          '高场强成像',
          '多种扫描序列',
          '舒适检查体验',
          '精确诊断'
        ]
      }
    ]
  },
  {
    name: '康复治疗',
    products: [
      {
        name: '物理治疗设备',
        model: 'KY-PT-200',
        description: '专业物理治疗设备，适用于各种康复训练',
        image: 'https://picsum.photos/400/300?random=19',
        specs: [
          { name: '治疗模式', value: '多种模式' },
          { name: '频率范围', value: '1-100Hz' },
          { name: '强度调节', value: '可调节' },
          { name: '适用部位', value: '全身' }
        ],
        features: [
          '多种治疗模式',
          '个性化参数设置',
          '安全可靠',
          '操作简便'
        ]
      },
      {
        name: '运动康复设备',
        model: 'KY-REHAB-500',
        description: '专业运动康复设备，帮助患者恢复运动功能',
        image: 'https://picsum.photos/400/300?random=20',
        specs: [
          { name: '训练模式', value: '主动/被动' },
          { name: '阻力范围', value: '0-100kg' },
          { name: '训练部位', value: '四肢/躯干' },
          { name: '数据记录', value: '实时记录' }
        ],
        features: [
          '主动被动结合',
          '个性化训练计划',
          '实时数据监测',
          '专业指导'
        ]
      }
    ]
  },
  {
    name: '健康管理',
    products: [
      {
        name: '健康体检套餐',
        model: 'KY-HEALTH-300',
        description: '全面的健康体检服务，建立个人健康档案',
        image: 'https://picsum.photos/400/300?random=21',
        specs: [
          { name: '检查项目', value: '50+项' },
          { name: '检查时间', value: '2-3小时' },
          { name: '报告时间', value: '3-5个工作日' },
          { name: '档案管理', value: '电子档案' }
        ],
        features: [
          '全面检查项目',
          '专业医师解读',
          '健康档案建立',
          '定期随访'
        ]
      },
      {
        name: '慢性病管理服务',
        model: 'KY-CHRONIC-100',
        description: '专业的慢性病管理服务，全程跟踪管理',
        image: 'https://picsum.photos/400/300?random=22',
        specs: [
          { name: '管理周期', value: '长期跟踪' },
          { name: '服务内容', value: '监测/用药/指导' },
          { name: '随访频率', value: '每月1次' },
          { name: '档案管理', value: '电子档案' }
        ],
        features: [
          '全程跟踪管理',
          '用药指导',
          '生活方式干预',
          '定期随访'
        ]
      }
    ]
  },
  {
    name: '老年康养',
    products: [
      {
        name: '医养结合服务',
        model: 'KY-ELDERLY-200',
        description: '专业的医养结合服务，医疗护理一体化',
        image: 'https://picsum.photos/400/300?random=23',
        specs: [
          { name: '服务内容', value: '医疗/护理/生活' },
          { name: '护理等级', value: '多等级' },
          { name: '医疗支持', value: '24小时' },
          { name: '居住环境', value: '舒适温馨' }
        ],
        features: [
          '医养结合',
          '专业护理团队',
          '24小时医疗支持',
          '舒适居住环境'
        ]
      },
      {
        name: '康养社区',
        model: 'KY-COMMUNITY-500',
        description: '现代化康养社区，提供全方位康养服务',
        image: 'https://picsum.photos/400/300?random=24',
        specs: [
          { name: '社区规模', value: '500床位' },
          { name: '服务设施', value: '齐全完善' },
          { name: '医疗支持', value: '三甲医院' },
          { name: '文化生活', value: '丰富多彩' }
        ],
        features: [
          '现代化设施',
          '医疗资源丰富',
          '文化生活丰富',
          '贴心服务'
        ]
      }
    ]
  }
])

// 服务优势
const advantages = ref([
  {
    icon: 'Medal',
    title: '医疗品质',
    description: '严格的医疗质量控制体系，确保每一项服务都达到最高标准'
  },
  {
    icon: 'Tools',
    title: '技术先进',
    description: '采用最新的医疗技术和设备，保持行业领先地位'
  },
  {
    icon: 'Headset',
    title: '服务专业',
    description: '专业的医疗团队提供全方位的医疗服务和健康管理'
  },
  {
    icon: 'TrendCharts',
    title: '医者仁心',
    description: '以患者为中心，提供贴心、专业的医疗服务'
  }
])

const handleCategoryChange = (tab: any) => {
  console.log('切换产品分类:', tab.props.name)
}

const viewProduct = (product: any) => {
  selectedProduct.value = product
  productDialogVisible.value = true
}

const closeProductDialog = () => {
  productDialogVisible.value = false
  selectedProduct.value = null
}

const contactUs = () => {
  router.push('/contact')
}
</script>

<style scoped>
.products-page {
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

/* 产品网格 */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  margin-top: 40px;
}

.product-card {
  overflow: hidden;
  transition: all 0.3s ease;
}

.product-image {
  position: relative;
  height: 250px;
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
  margin-bottom: 8px;
  color: var(--dark-color);
}

.product-model {
  color: var(--primary-color);
  font-weight: 500;
  margin-bottom: 12px;
}

.product-desc {
  color: var(--gray-color);
  margin-bottom: 20px;
  line-height: 1.6;
}

.product-specs {
  margin-bottom: 20px;
}

.spec-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 0.9rem;
}

.spec-name {
  color: var(--gray-color);
}

.spec-value {
  color: var(--dark-color);
  font-weight: 500;
}

.product-actions {
  display: flex;
  gap: 10px;
}

/* 产品优势 */
.advantages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
}

.advantage-item {
  text-align: center;
  padding: 30px 20px;
}

.advantage-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  color: white;
}

.advantage-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 15px;
  color: var(--dark-color);
}

.advantage-desc {
  color: var(--gray-color);
  line-height: 1.6;
}

/* 技术支持 */
.support-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.support-features {
  margin-top: 40px;
}

.support-feature {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 30px;
}

.support-feature .el-icon {
  width: 50px;
  height: 50px;
  background: var(--light-color);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-color);
  font-size: 1.5rem;
  flex-shrink: 0;
}

.support-feature h4 {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--dark-color);
}

.support-feature p {
  color: var(--gray-color);
  line-height: 1.6;
}

.support-image img {
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

.cta-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid white;
  color: white;
}

/* 产品详情弹窗 */
.product-detail {
  max-height: 70vh;
  overflow-y: auto;
}

.detail-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 30px;
}

.detail-image img {
  width: 100%;
  border-radius: 8px;
}

.detail-info h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: var(--dark-color);
}

.detail-model {
  color: var(--primary-color);
  font-weight: 500;
  margin-bottom: 15px;
}

.detail-desc {
  color: var(--gray-color);
  margin-bottom: 25px;
  line-height: 1.6;
}

.detail-specs h4 {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 15px;
  color: var(--dark-color);
}

.specs-table {
  width: 100%;
  border-collapse: collapse;
}

.specs-table td {
  padding: 8px 0;
  border-bottom: 1px solid var(--border-color);
}

.specs-table td:first-child {
  color: var(--gray-color);
  width: 40%;
}

.specs-table td:last-child {
  color: var(--dark-color);
  font-weight: 500;
}

.detail-features h4 {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 15px;
  color: var(--dark-color);
}

.detail-features ul {
  list-style: none;
  padding: 0;
}

.detail-features li {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  color: var(--dark-color);
}

.detail-features .el-icon {
  color: var(--success-color);
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .support-content,
  .detail-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .advantages-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .products-page {
    margin-top: 70px;
  }
  
  .page-title {
    font-size: 2.5rem;
  }
  
  .products-grid {
    grid-template-columns: 1fr;
  }
  
  .advantages-grid {
    grid-template-columns: 1fr;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .product-actions {
    flex-direction: column;
  }
}
</style> 