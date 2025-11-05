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
  return (route.meta as any)?.hideLayout === true
})
</script>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style> 