<template>
  <div id="app">
    <Header v-if="!hideLayout" />
    <router-view />
    <Footer v-if="!hideLayout" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Header from '@/components/Layout/Header.vue'
import Footer from '@/components/Layout/Footer.vue'

const route = useRoute()

// 根据路由meta判断是否隐藏布局
const hideLayout = computed(() => {
  const shouldHide = (route.meta as any)?.hideLayout === true
  // 调试信息（开发环境）
  if (import.meta.env.DEV) {
    console.log('Current route:', route.path, 'hideLayout:', shouldHide, 'meta:', route.meta)
  }
  return shouldHide
})
</script>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style> 