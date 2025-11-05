<template>
  <header class="header">
    <!-- 顶部联系栏 -->
    <div class="top-bar">
      <div class="container">
        <div class="top-info">
          <span><el-icon><Phone /></el-icon> 400-123-4567</span>
          <span><el-icon><Message /></el-icon> info@zhizao.com</span>
          <span><el-icon><Location /></el-icon> 上海市浦东新区科技园</span>
        </div>
      </div>
    </div>

    <!-- 主导航 -->
    <nav class="main-nav">
      <div class="container">
        <div class="nav-content">
          <!-- Logo -->
          <div class="logo">
            <router-link to="/">
              <img src="https://picsum.photos/120/40?random=291" alt="智造科技" class="logo-img" />
              <span class="logo-text">智造科技</span>
            </router-link>
          </div>

          <!-- 导航菜单 -->
          <el-menu
            mode="horizontal"
            :default-active="activeIndex"
            class="nav-menu"
            @select="handleSelect"
          >
            <el-menu-item index="/">首页</el-menu-item>
            <el-menu-item index="/about">关于我们</el-menu-item>
            <el-menu-item index="/products">产品中心</el-menu-item>
            <el-menu-item index="/solutions">解决方案</el-menu-item>
            <el-menu-item index="/news">新闻资讯</el-menu-item>
            <el-menu-item index="/contact">联系我们</el-menu-item>
          </el-menu>

          <!-- 移动端菜单按钮 -->
          <div class="mobile-menu-btn" @click="toggleMobileMenu">
            <el-icon><Menu /></el-icon>
          </div>
        </div>
      </div>
    </nav>

    <!-- 移动端菜单 -->
    <div class="mobile-menu" :class="{ active: mobileMenuActive }">
      <div class="mobile-menu-overlay" @click="closeMobileMenu"></div>
      <div class="mobile-menu-content">
        <div class="mobile-menu-header">
          <span class="logo-text">智造科技</span>
          <el-icon class="close-btn" @click="closeMobileMenu"><Close /></el-icon>
        </div>
        <ul class="mobile-nav-list">
          <li><router-link to="/" @click="closeMobileMenu">首页</router-link></li>
          <li><router-link to="/about" @click="closeMobileMenu">关于我们</router-link></li>
          <li><router-link to="/products" @click="closeMobileMenu">产品中心</router-link></li>
          <li><router-link to="/solutions" @click="closeMobileMenu">解决方案</router-link></li>
          <li><router-link to="/news" @click="closeMobileMenu">新闻资讯</router-link></li>
          <li><router-link to="/contact" @click="closeMobileMenu">联系我们</router-link></li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const mobileMenuActive = ref(false)
const isScrolled = ref(false)

const activeIndex = computed(() => route.path)

const handleSelect = (key: string) => {
  router.push(key)
}

const toggleMobileMenu = () => {
  mobileMenuActive.value = !mobileMenuActive.value
}

const closeMobileMenu = () => {
  mobileMenuActive.value = false
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.top-bar {
  background: var(--dark-color);
  color: white;
  padding: 8px 0;
  font-size: 0.875rem;
}

.top-info {
  display: flex;
  justify-content: flex-end;
  gap: 30px;
}

.top-info span {
  display: flex;
  align-items: center;
  gap: 5px;
}

.main-nav {
  background: white;
  padding: 0;
}

.nav-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
}

.logo {
  display: flex;
  align-items: center;
}

.logo a {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: var(--dark-color);
}

.logo-img {
  height: 40px;
  margin-right: 10px;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
}

.nav-menu {
  flex: 1;
  justify-content: center;
  border-bottom: none;
}

.nav-menu .el-menu-item,
.nav-menu .el-sub-menu__title {
  font-weight: 500;
  color: var(--dark-color);
  border-bottom: 3px solid transparent;
  transition: all 0.3s;
}

.nav-menu .el-menu-item:hover,
.nav-menu .el-sub-menu__title:hover {
  color: var(--primary-color);
  border-bottom-color: var(--primary-color);
}

.nav-menu .el-menu-item.is-active {
  color: var(--primary-color);
  border-bottom-color: var(--primary-color);
}

.mobile-menu-btn {
  display: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: var(--dark-color);
}

.mobile-menu {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2000;
}

.mobile-menu.active {
  display: block;
}

.mobile-menu-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}

.mobile-menu-content {
  position: absolute;
  top: 0;
  right: 0;
  width: 280px;
  height: 100%;
  background: white;
  transform: translateX(100%);
  transition: transform 0.3s ease;
}

.mobile-menu.active .mobile-menu-content {
  transform: translateX(0);
}

.mobile-menu-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid var(--border-color);
}

.close-btn {
  font-size: 1.5rem;
  cursor: pointer;
}

.mobile-nav-list {
  list-style: none;
  padding: 20px 0;
}

.mobile-nav-list li {
  margin-bottom: 10px;
}

.mobile-nav-list a {
  display: block;
  padding: 12px 20px;
  color: var(--dark-color);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s;
}

.mobile-nav-list a:hover,
.mobile-nav-list a.router-link-active {
  color: var(--primary-color);
  background: var(--light-color);
}

@media (max-width: 768px) {
  .top-bar {
    display: none;
  }
  
  .nav-menu {
    display: none;
  }
  
  .mobile-menu-btn {
    display: block;
  }
  
  .top-info {
    justify-content: center;
    gap: 20px;
  }
  
  .top-info span {
    font-size: 0.8rem;
  }
}
</style> 