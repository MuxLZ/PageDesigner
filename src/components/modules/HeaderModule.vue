<template>
  <BaseModuleWrapper :module-config="config">
    <header
      class="header-module"
      :class="{ 'header-fixed': config.fixed && !isDesigner, 'header-transparent': config.transparent }"
      :style="headerStyles"
    >
      <!-- 顶部联系栏 -->
      <div
        v-if="config.topBar?.visible"
        class="top-bar"
        :style="topBarStyles"
      >
        <div class="container">
          <div class="top-info">
            <span
              v-for="(item, index) in config.topBar?.items"
              :key="index"
            >
              <el-icon v-if="item.icon"><component :is="item.icon" /></el-icon>
              {{ item.text }}
            </span>
          </div>
        </div>
      </div>

      <!-- 主导航 -->
      <nav class="main-nav" :style="navStyles">
        <div class="container">
          <div class="nav-content">
            <!-- Logo -->
            <div v-if="config.logo" class="logo">
              <router-link to="/">
                <img v-if="config.logo.image" :src="config.logo.image" alt="" class="logo-img" />
                <span v-if="config.logo.text" class="logo-text">{{ config.logo.text }}</span>
              </router-link>
            </div>

            <!-- 导航菜单 -->
            <el-menu
              v-if="config.menu"
              mode="horizontal"
              :default-active="activeIndex"
              class="nav-menu"
              :style="menuStyles"
              @select="handleSelect"
            >
              <el-menu-item
                v-for="(item, index) in config.menu.items"
                :key="index"
                :index="item.link"
              >
                {{ item.label }}
              </el-menu-item>
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
            <span v-if="config.logo?.text" class="logo-text">{{ config.logo.text }}</span>
            <el-icon class="close-btn" @click="closeMobileMenu"><Close /></el-icon>
          </div>
          <ul class="mobile-nav-list">
            <li
              v-for="(item, index) in config.menu?.items"
              :key="index"
            >
              <router-link :to="item.link" @click="closeMobileMenu">{{ item.label }}</router-link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  </BaseModuleWrapper>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { HeaderConfig } from '@/types/module'
import BaseModuleWrapper from './BaseModuleWrapper.vue'

interface Props {
  config: HeaderConfig
  isDesigner?: boolean  // 是否在设计器模式
}

const props = withDefaults(defineProps<Props>(), {
  isDesigner: false
})

const route = useRoute()
const router = useRouter()

const mobileMenuActive = ref(false)
const activeIndex = computed(() => route.path)

const headerStyles = computed(() => {
  const styles: Record<string, any> = {}
  if (props.config.backgroundColor) {
    styles.backgroundColor = props.config.backgroundColor
  }
  return styles
})

const topBarStyles = computed(() => {
  const styles: Record<string, any> = {}
  if (props.config.topBar?.backgroundColor) {
    styles.backgroundColor = props.config.topBar.backgroundColor
  }
  if (props.config.topBar?.textColor) {
    styles.color = props.config.topBar.textColor
  }
  return styles
})

const navStyles = computed(() => {
  const styles: Record<string, any> = {}
  if (props.config.backgroundColor) {
    styles.backgroundColor = props.config.backgroundColor
  }
  return styles
})

const menuStyles = computed(() => {
  const styles: Record<string, any> = {}
  if (props.config.menu?.textColor) {
    styles.color = props.config.menu.textColor
  }
  return styles
})

const handleSelect = (key: string) => {
  router.push(key)
}

const toggleMobileMenu = () => {
  mobileMenuActive.value = !mobileMenuActive.value
}

const closeMobileMenu = () => {
  mobileMenuActive.value = false
}
</script>

<style scoped>
.header-module {
  position: relative;
  z-index: 1000;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.header-fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}

/* 在设计器模式下，即使有 fixed 类也不使用 fixed 定位 */
.designer-preview .header-fixed {
  position: relative;
  top: auto;
  left: auto;
  right: auto;
}

.header-transparent {
  background: transparent;
  box-shadow: none;
}

.top-bar {
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
}
</style>

