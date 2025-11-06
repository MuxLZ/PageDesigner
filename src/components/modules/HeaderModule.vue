<template>
  <BaseModuleWrapper :module-config="config">
    <header
      class="header-module"
      :class="{ 'header-fixed': config.fixed && !isDesigner, 'header-transparent': config.transparent }"
      :style="headerStyles"
    >
      <!-- 顶部联系栏 -->
      <div
        v-if="config.topBar?.visible || shouldShowLogoInTop"
        class="top-bar"
        :class="{ 'has-logo': shouldShowLogoInTop }"
        :style="topBarStyles"
      >
        <div class="container">
          <div class="top-bar-content" :class="topBarContentClass">
            <!-- Logo在顶部 -->
            <div v-if="shouldShowLogoInTop" class="logo-top">
              <router-link :to="logoLink">
                <img v-if="config.logo?.image" :src="config.logo.image" :alt="config.logo?.text || 'Logo'" class="logo-img" />
                <span v-if="config.logo?.text" class="logo-text">{{ config.logo.text }}</span>
              </router-link>
            </div>
            <!-- 顶部联系信息 -->
            <div 
              class="top-info" 
              :class="topInfoClass"
              v-if="config.topBar?.visible && config.topBar?.items && config.topBar.items.length > 0"
            >
              <span
                v-for="(item, index) in config.topBar.items"
                :key="index"
              >
                <el-icon v-if="item.icon"><component :is="item.icon" /></el-icon>
                {{ item.text }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- 主导航 -->
      <nav class="main-nav" :style="navStyles">
        <div class="container">
          <div class="nav-content">
            <!-- Logo在主导航栏 -->
            <div v-if="shouldShowLogoInNav" class="logo">
              <router-link :to="logoLink">
                <img v-if="config.logo?.image" :src="config.logo.image" :alt="config.logo?.text || 'Logo'" class="logo-img" />
                <span v-if="config.logo?.text" class="logo-text">{{ config.logo.text }}</span>
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
              <template v-for="(item, index) in config.menu.items" :key="index">
                <!-- 带下拉菜单的菜单项 -->
                <el-sub-menu
                  v-if="item.children && item.children.length > 0"
                  :index="(item.link && item.link !== '') ? item.link : `submenu-${index}`"
                >
                  <template #title>
                    <span :style="menuItemStyles">{{ item.label }}</span>
                  </template>
                  <el-menu-item
                    v-for="(child, childIndex) in item.children"
                    :key="childIndex"
                    :index="child.link"
                    :style="subMenuItemStyles"
                  >
                    {{ child.label }}
                  </el-menu-item>
                </el-sub-menu>
                <!-- 普通菜单项 -->
                <el-menu-item
                  v-else
                  :index="item.link"
                  :style="menuItemStyles"
                >
                  {{ item.label }}
                </el-menu-item>
              </template>
            </el-menu>

            <!-- 移动端菜单按钮 -->
            <div v-if="config.menu" class="mobile-menu-btn" @click="toggleMobileMenu">
              <el-icon><Menu /></el-icon>
            </div>
          </div>
        </div>
      </nav>

      <!-- 移动端菜单 -->
      <transition name="mobile-menu">
        <div v-if="mobileMenuActive" class="mobile-menu">
          <div class="mobile-menu-overlay" @click="closeMobileMenu"></div>
          <div class="mobile-menu-content">
          <div class="mobile-menu-header">
            <div v-if="config.logo && logoVisible" class="mobile-logo">
              <img v-if="config.logo.image" :src="config.logo.image" :alt="config.logo.text || 'Logo'" class="logo-img" />
              <span v-if="config.logo.text" class="logo-text">{{ config.logo.text }}</span>
            </div>
            <el-icon class="close-btn" @click="closeMobileMenu"><Close /></el-icon>
          </div>
          <ul class="mobile-nav-list">
            <li
              v-for="(item, index) in config.menu?.items"
              :key="index"
            >
              <router-link
                v-if="!item.children || item.children.length === 0"
                :to="item.link"
                @click="closeMobileMenu"
              >
                {{ item.label }}
              </router-link>
              <div v-else class="mobile-submenu">
                <div class="mobile-submenu-title">{{ item.label }}</div>
                <ul class="mobile-submenu-list">
                  <li
                    v-for="(child, childIndex) in item.children"
                    :key="childIndex"
                  >
                    <router-link :to="child.link" @click="closeMobileMenu">{{ child.label }}</router-link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
          </div>
        </div>
      </transition>
    </header>
  </BaseModuleWrapper>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Menu, Close } from '@element-plus/icons-vue'
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

// Logo相关计算属性
const logoVisible = computed(() => {
  // 如果logo配置不存在，默认不显示
  if (!props.config.logo) {
    return false
  }
  // 如果明确设置了visible，使用该值；否则默认true（向后兼容）
  return props.config.logo.visible !== false
})

const logoPosition = computed(() => {
  // 默认位置为 'nav'（主导航栏）
  return props.config.logo?.position || 'nav'
})

const logoLink = computed(() => {
  return props.config.logo?.link || '/'
})

const shouldShowLogoInNav = computed(() => {
  return logoVisible.value && logoPosition.value === 'nav'
})

const shouldShowLogoInTop = computed(() => {
  return logoVisible.value && logoPosition.value === 'top'
})

// 顶部联系栏位置
const topBarPosition = computed(() => {
  return props.config.topBar?.position || 'right'
})

// 顶部联系信息是否可见
const topBarInfoVisible = computed(() => {
  return props.config.topBar?.visible && 
         props.config.topBar?.items && 
         props.config.topBar.items.length > 0
})

// 顶部栏内容布局类
const topBarContentClass = computed(() => {
  const classes: string[] = []
  
  // 如果联系信息不可见，Logo应该默认在左侧，不受位置设置影响
  if (!topBarInfoVisible.value) {
    // 只有Logo显示时，使用默认左侧布局
    if (shouldShowLogoInTop.value) {
      classes.push('position-left')
    }
    return classes
  }
  
  // 联系信息可见时，根据位置和Logo位置决定布局
  const position = topBarPosition.value
  
  // Logo在顶部时的处理
  if (shouldShowLogoInTop.value) {
    // Logo应该始终在左侧，联系信息根据position设置位置
    if (position === 'left') {
      // Logo在左，联系信息在Logo右侧（使用flex gap）
      classes.push('has-logo-left')
    } else {
      // Logo在左，联系信息在center/right，使用特殊布局
      classes.push('has-logo-with-info')
    }
  } else {
    // Logo不在顶部，按联系信息位置布局
    classes.push(`position-${position}`)
  }
  
  return classes
})

// 顶部联系信息类
const topInfoClass = computed(() => {
  const classes: string[] = []
  const position = topBarPosition.value
  
  // 如果Logo在顶部且联系信息在左侧，不应用位置类，使用flex布局
  if (!shouldShowLogoInTop.value || position !== 'left') {
    classes.push(`position-${position}`)
  }
  
  return classes
})

// 规范化路径用于匹配（移除hash和query）
const activeIndex = computed(() => {
  const path = route.path
  // 移除hash和query参数，只保留路径部分
  return path.split('?')[0].split('#')[0]
})

// 提取公共的背景色获取逻辑
const getBackgroundColor = computed(() => {
  // 如果是透明模式，返回transparent
  if (props.config.transparent) {
    return 'transparent'
  }
  // 优先使用样式设置中的背景色，如果没有则使用导航栏配置的背景色
  return props.config.style?.backgroundColor || props.config.backgroundColor
})

const headerStyles = computed(() => {
  const styles: Record<string, any> = {}
  const bgColor = getBackgroundColor.value
  if (bgColor) {
    styles.backgroundColor = bgColor
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
  const bgColor = getBackgroundColor.value
  if (bgColor) {
    styles.backgroundColor = bgColor
  }
  return styles
})

const menuStyles = computed(() => {
  const styles: Record<string, any> = {}
  const bgColor = getBackgroundColor.value
  if (bgColor) {
    styles.backgroundColor = bgColor
  }
  return styles
})

const menuItemStyles = computed(() => {
  const styles: Record<string, any> = {}
  // 优先使用样式设置中的字体颜色（主导航栏）
  if (props.config.style?.font?.color) {
    styles.color = props.config.style.font.color
  } else if (props.config.menu?.textColor) {
    // 兼容旧配置
    styles.color = props.config.menu.textColor
  }
  // 应用字体大小（主导航栏）
  if (props.config.style?.font?.size) {
    styles.fontSize = props.config.style.font.size
  }
  return styles
})

// 子菜单项样式（可以独立配置）
const subMenuItemStyles = computed(() => {
  const styles: Record<string, any> = {}
  // 子菜单可以使用不同的字体大小
  if (props.config.style?.font?.size) {
    // 子菜单字体可以稍微小一点
    const baseSize = parseFloat(props.config.style.font.size)
    if (!isNaN(baseSize)) {
      styles.fontSize = `${baseSize * 0.9}px`
    }
  } else {
    styles.fontSize = '0.9rem'
  }
  return styles
})

const handleSelect = (key: string) => {
  // 检查是否是子菜单索引（子菜单索引格式为 submenu-{index}）
  if (key.startsWith('submenu-')) {
    // 子菜单索引不进行路由跳转，由el-sub-menu自己处理
    return
  }
  
  // 验证路由路径
  if (key && key.startsWith('/')) {
    router.push(key).catch((error) => {
      console.warn(`Route navigation failed for: ${key}`, error)
    })
  }
}

const toggleMobileMenu = () => {
  mobileMenuActive.value = !mobileMenuActive.value
}

const closeMobileMenu = () => {
  mobileMenuActive.value = false
}

// 监听路由变化，自动关闭移动端菜单
watch(() => route.path, () => {
  mobileMenuActive.value = false
})
</script>

<style scoped>
.header-module {
  position: relative;
  z-index: 1000;
  /* 默认背景色，可通过内联样式覆盖 */
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

.top-bar-content {
  display: flex;
  align-items: center;
  width: 100%;
}

/* 默认布局（右侧） */
.top-bar-content.position-right {
  justify-content: flex-end;
}

/* 中间布局 */
.top-bar-content.position-center {
  justify-content: center;
}

/* 左侧布局（无Logo时） */
.top-bar-content.position-left {
  justify-content: flex-start;
}

/* Logo在顶部且联系信息在左侧时的布局 */
.top-bar-content.has-logo-left {
  justify-content: flex-start;
  gap: 20px;
}

/* Logo在顶部且联系信息在中间/右侧时的布局 */
.top-bar-content.has-logo-with-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.top-info {
  display: flex;
  gap: 30px;
}

/* 右侧位置（默认） */
.top-info.position-right {
  justify-content: flex-end;
  margin-left: auto;
}

/* 中间位置 */
.top-info.position-center {
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
}

/* 左侧位置（无Logo时） */
.top-info.position-left {
  justify-content: flex-start;
}

.top-info span {
  display: flex;
  align-items: center;
  gap: 5px;
}

.logo-top {
  display: flex;
  align-items: center;
}

.logo-top a {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: var(--dark-color);
}

.logo-top .logo-img {
  height: 32px;
  margin-right: 8px;
}

.logo-top .logo-text {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--primary-color);
}

.main-nav {
  /* 默认背景色，可通过内联样式覆盖 */
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
  /* 确保菜单背景色可以通过内联样式设置 */
  background: transparent;
}

/* 确保菜单背景色能够通过内联样式设置 */
/* 移除Element Plus默认背景色，让内联样式生效 */
.nav-menu :deep(.el-menu),
.nav-menu :deep(.el-menu--horizontal) {
  background-color: transparent;
}

/* 确保菜单项样式正确应用，优先级高于Element Plus默认样式 */
.nav-menu :deep(.el-menu-item) {
  transition: all 0.3s;
}

.nav-menu :deep(.el-menu-item.is-active) {
  border-bottom-color: var(--primary-color) !important;
}

/* 下拉菜单样式 */
.nav-menu :deep(.el-sub-menu__title) {
  transition: all 0.3s;
}

.nav-menu :deep(.el-sub-menu.is-active .el-sub-menu__title) {
  color: var(--primary-color);
}

.nav-menu :deep(.el-sub-menu__icon) {
  margin-left: 4px;
  font-size: 12px;
}

.mobile-menu-btn {
  display: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: var(--dark-color);
}

.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2000;
}

/* Vue Transition 动画 */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.3s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
}

.mobile-menu-enter-active .mobile-menu-content,
.mobile-menu-leave-active .mobile-menu-content {
  transition: transform 0.3s ease;
}

.mobile-menu-enter-from .mobile-menu-content,
.mobile-menu-leave-to .mobile-menu-content {
  transform: translateX(100%);
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

.mobile-logo {
  display: flex;
  align-items: center;
  gap: 8px;
}

.mobile-logo .logo-img {
  height: 32px;
}

.mobile-logo .logo-text {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--primary-color);
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

.mobile-submenu {
  margin-bottom: 10px;
}

.mobile-submenu-title {
  padding: 12px 20px;
  color: var(--dark-color);
  font-weight: 600;
  border-bottom: 1px solid var(--border-color);
}

.mobile-submenu-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.mobile-submenu-list li {
  margin: 0;
}

.mobile-submenu-list a {
  display: block;
  padding: 10px 20px 10px 40px;
  color: var(--gray-color);
  text-decoration: none;
  font-weight: 400;
  font-size: 0.9rem;
  transition: all 0.3s;
}

.mobile-submenu-list a:hover,
.mobile-submenu-list a.router-link-active {
  color: var(--primary-color);
  background: var(--light-color);
}

@media (max-width: 768px) {
  .top-bar {
    display: none;
  }
  
  /* 移动端：如果Logo在顶部，仍然显示顶部栏 */
  .top-bar.has-logo {
    display: block;
    padding: 12px 0;
  }
  
  /* 移动端：顶部Logo和联系信息改为垂直布局 */
  .top-bar.has-logo .top-bar-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  /* 移动端：Logo在左侧时的布局调整 */
  .top-bar.has-logo .top-bar-content.has-logo-left,
  .top-bar.has-logo .top-bar-content.has-logo-with-info {
    flex-direction: row;
    align-items: center;
    gap: 15px;
    flex-wrap: wrap;
  }
  
  .top-bar.has-logo .top-info {
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 15px;
  }
  
  /* 移动端：移除位置特定的margin */
  .top-info.position-center,
  .top-info.position-right {
    margin-left: 0;
    margin-right: 0;
  }
  
  .nav-menu {
    display: none;
  }
  
  .mobile-menu-btn {
    display: block;
  }
}
</style>

