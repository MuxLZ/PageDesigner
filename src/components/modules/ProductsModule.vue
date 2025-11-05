<template>
  <BaseModuleWrapper :module-config="config">
    <section class="products-module section">
      <div class="container">
        <div v-if="config.title || config.subtitle" class="section-header">
          <h2 v-if="config.title" class="section-title">{{ config.title }}</h2>
          <p v-if="config.subtitle" class="section-subtitle">{{ config.subtitle }}</p>
        </div>
        
        <div
          class="products-grid"
          :style="gridStyles"
        >
          <div
            v-for="(product, index) in config.items"
            :key="index"
            class="product-card card"
            data-aos="fade-up"
            :data-aos-delay="index * 100"
          >
            <div v-if="product.image" class="product-image">
              <img :src="product.image" :alt="product.name" />
              <div class="product-overlay">
                <el-button type="primary" circle>
                  <el-icon><View /></el-icon>
                </el-button>
              </div>
            </div>
            <div class="product-content">
              <h3 v-if="product.name" class="product-name">{{ product.name }}</h3>
              <p v-if="product.description" class="product-desc">{{ product.description }}</p>
              <div v-if="product.features" class="product-features">
                <span v-for="feature in product.features" :key="feature" class="feature-tag">
                  {{ feature }}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div v-if="config.showMore" class="section-footer">
          <el-button type="primary" size="large" @click="handleMoreClick">
            查看更多产品
            <el-icon class="el-icon--right"><ArrowRight /></el-icon>
          </el-button>
        </div>
      </div>
    </section>
  </BaseModuleWrapper>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { View, ArrowRight } from '@element-plus/icons-vue'
import type { ProductsConfig } from '@/types/module'
import BaseModuleWrapper from './BaseModuleWrapper.vue'

interface Props {
  config: ProductsConfig
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
.products-module {
  width: 100%;
}

.products-grid {
  display: grid;
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

@media (max-width: 1024px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}

@media (max-width: 768px) {
  .products-grid {
    grid-template-columns: 1fr !important;
  }
}
</style>

