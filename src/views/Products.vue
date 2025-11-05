<template>
  <div class="products-page">
    <!-- 页面头部 -->
    <section class="page-hero gradient-bg">
      <div class="container">
        <div class="hero-content" data-aos="fade-up">
          <h1 class="page-title">产品中心</h1>
          <p class="page-subtitle">专业的工业自动化设备，助力企业智能化升级</p>
          <nav class="breadcrumb">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>产品中心</el-breadcrumb-item>
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
          <h2 class="section-title">产品优势</h2>
          <p class="section-subtitle">为什么选择我们的产品</p>
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
            <h2 class="section-title">全方位技术支持</h2>
            <p class="section-subtitle">从售前咨询到售后维护，我们提供全程专业服务</p>
            <div class="support-features">
              <div class="support-feature">
                <el-icon><Headset /></el-icon>
                <div>
                  <h4>24/7 技术支持</h4>
                  <p>全天候技术热线，随时为您解答问题</p>
                </div>
              </div>
              <div class="support-feature">
                <el-icon><Tools /></el-icon>
                <div>
                  <h4>免费安装调试</h4>
                  <p>专业工程师上门安装调试，确保设备正常运行</p>
                </div>
              </div>
              <div class="support-feature">
                <el-icon><Medal /></el-icon>
                <div>
                  <h4>质保服务</h4>
                  <p>提供完善的质保服务，让您使用无忧</p>
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
          <h2>需要定制化解决方案？</h2>
          <p>联系我们的技术专家，为您量身定制最适合的产品方案</p>
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

// 当前激活的产品分类
const activeCategory = ref('自动化设备')

// 产品详情弹窗
const productDialogVisible = ref(false)
const selectedProduct = ref(null)

// 产品分类数据
const productCategories = ref([
  {
    name: '自动化设备',
    products: [
      {
        name: '全自动装配线',
        model: 'ZZ-AL-2000',
        description: '高效智能的全自动装配生产线，适用于各种精密零件的自动化装配',
        image: 'https://picsum.photos/400/300?random=17',
        specs: [
          { name: '生产效率', value: '200件/小时' },
          { name: '精度', value: '±0.02mm' },
          { name: '功率', value: '15KW' },
          { name: '重量', value: '2000kg' }
        ],
        features: [
          '高精度定位系统',
          '智能视觉检测',
          '故障自诊断功能',
          '人机界面操作'
        ]
      },
      {
        name: '自动化包装线',
        model: 'ZZ-PL-1500',
        description: '多功能自动化包装生产线，支持多种包装方式',
        image: 'https://picsum.photos/400/300?random=18',
        specs: [
          { name: '包装速度', value: '150包/分钟' },
          { name: '包装规格', value: '可调节' },
          { name: '功率', value: '12KW' },
          { name: '占地面积', value: '15㎡' }
        ],
        features: [
          '多种包装方式',
          '自动计数功能',
          '废品自动剔除',
          '远程监控系统'
        ]
      }
    ]
  },
  {
    name: '工业机器人',
    products: [
      {
        name: '六轴工业机器人',
        model: 'ZZ-R6-1800',
        description: '高精度六轴工业机器人，适用于焊接、搬运、装配等作业',
        image: 'https://picsum.photos/400/300?random=19',
        specs: [
          { name: '负载能力', value: '20kg' },
          { name: '工作半径', value: '1800mm' },
          { name: '重复精度', value: '±0.03mm' },
          { name: '防护等级', value: 'IP54' }
        ],
        features: [
          '高精度伺服控制',
          '多种编程方式',
          '安全防护系统',
          '维护简便'
        ]
      },
      {
        name: 'SCARA机器人',
        model: 'ZZ-SCARA-800',
        description: '高速SCARA机器人，适用于电子产品装配和包装',
        image: 'https://picsum.photos/400/300?random=20',
        specs: [
          { name: '负载能力', value: '5kg' },
          { name: '工作半径', value: '800mm' },
          { name: '最大速度', value: '10m/s' },
          { name: '重复精度', value: '±0.01mm' }
        ],
        features: [
          '超高速运动',
          '紧凑型设计',
          '易于集成',
          '高性价比'
        ]
      }
    ]
  },
  {
    name: 'PLC控制系统',
    products: [
      {
        name: '中型PLC控制器',
        model: 'ZZ-PLC-300',
        description: '功能强大的中型PLC控制器，适用于中等规模的自动化控制',
        image: 'https://picsum.photos/400/300?random=21',
        specs: [
          { name: 'I/O点数', value: '256点' },
          { name: '程序容量', value: '128K步' },
          { name: '扫描速度', value: '0.1ms/K步' },
          { name: '通信接口', value: '以太网/串口' }
        ],
        features: [
          '高速处理能力',
          '丰富的扩展模块',
          '多种通信协议',
          '友好的编程环境'
        ]
      },
      {
        name: '触摸屏HMI',
        model: 'ZZ-HMI-10',
        description: '10寸彩色触摸屏人机界面，支持多种通信协议',
        image: 'https://picsum.photos/400/300?random=22',
        specs: [
          { name: '屏幕尺寸', value: '10.1英寸' },
          { name: '分辨率', value: '1024×600' },
          { name: '显示颜色', value: '65536色' },
          { name: '存储容量', value: '256MB' }
        ],
        features: [
          '高清彩色显示',
          '多点触控',
          '丰富的图形库',
          '多语言支持'
        ]
      }
    ]
  },
  {
    name: '智能传感器',
    products: [
      {
        name: '激光位移传感器',
        model: 'ZZ-LD-100',
        description: '高精度激光位移传感器，适用于精密测量应用',
        image: 'https://picsum.photos/400/300?random=23',
        specs: [
          { name: '测量范围', value: '100mm' },
          { name: '分辨率', value: '0.1μm' },
          { name: '线性度', value: '±0.01%' },
          { name: '响应频率', value: '50kHz' }
        ],
        features: [
          '超高精度测量',
          '非接触式检测',
          '抗干扰能力强',
          '体积小巧'
        ]
      },
      {
        name: '视觉检测系统',
        model: 'ZZ-VS-2000',
        description: '智能视觉检测系统，支持多种缺陷检测功能',
        image: 'https://picsum.photos/400/300?random=24',
        specs: [
          { name: '相机分辨率', value: '2000万像素' },
          { name: '检测精度', value: '0.01mm' },
          { name: '检测速度', value: '100件/分钟' },
          { name: '光源', value: 'LED环形光源' }
        ],
        features: [
          '深度学习算法',
          '多种检测模式',
          '实时图像处理',
          '简单易用'
        ]
      }
    ]
  }
])

// 产品优势
const advantages = ref([
  {
    icon: 'Medal',
    title: '品质卓越',
    description: '严格的质量控制体系，确保每一件产品都达到最高标准'
  },
  {
    icon: 'Tools',
    title: '技术先进',
    description: '采用最新的技术和工艺，保持行业领先地位'
  },
  {
    icon: 'Headset',
    title: '服务专业',
    description: '专业的技术团队提供全方位的技术支持和服务'
  },
  {
    icon: 'TrendCharts',
    title: '性价比高',
    description: '合理的价格配置，为客户提供最优的投资回报'
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