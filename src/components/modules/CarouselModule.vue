<template>
  <BaseModuleWrapper :module-config="config">
    <section class="carousel-module">
      <el-carousel
        :height="config.height || '100vh'"
        :interval="config.interval || 5000"
        :arrow="config.arrows ? 'hover' : 'never'"
        :indicator-position="config.indicator ? 'outside' : 'none'"
        :autoplay="config.autoplay !== false"
      >
        <el-carousel-item v-for="(slide, index) in config.slides" :key="index">
          <div
            class="carousel-slide"
            :style="{ backgroundImage: slide.background ? `url(${slide.background})` : undefined }"
          >
            <div v-if="slide.background" class="slide-overlay"></div>
            <div class="container">
              <div class="slide-content">
                <h1 v-if="slide.title" class="slide-title">{{ slide.title }}</h1>
                <p v-if="slide.subtitle" class="slide-subtitle">{{ slide.subtitle }}</p>
                <p v-if="slide.content" class="slide-text">{{ slide.content }}</p>
                <div v-if="slide.buttons" class="slide-buttons">
                  <el-button
                    v-for="(btn, btnIndex) in slide.buttons"
                    :key="btnIndex"
                    :type="btn.type || 'primary'"
                    size="large"
                    @click="handleButtonClick(btn)"
                  >
                    {{ btn.text }}
                  </el-button>
                </div>
              </div>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </section>
  </BaseModuleWrapper>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CarouselConfig } from '@/types/module'
import BaseModuleWrapper from './BaseModuleWrapper.vue'

interface Props {
  config: CarouselConfig
}

const props = defineProps<Props>()

const handleButtonClick = (btn: any) => {
  if (btn.link) {
    if (btn.link.startsWith('http')) {
      window.open(btn.link, '_blank')
    } else {
      // 使用路由导航
      // router.push(btn.link)
    }
  }
}
</script>

<style scoped>
.carousel-module {
  position: relative;
}

.carousel-slide {
  position: relative;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.slide-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
}

.slide-content {
  position: relative;
  z-index: 2;
  color: white;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.slide-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.slide-subtitle {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  opacity: 0.9;
}

.slide-text {
  font-size: 1rem;
  margin-bottom: 2.5rem;
  opacity: 0.8;
}

.slide-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .slide-title {
    font-size: 2.5rem;
  }
  
  .slide-buttons {
    flex-direction: column;
    align-items: center;
  }
}
</style>

