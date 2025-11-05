import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

import App from './App.vue'
import router from './router'
import './assets/styles/global.css'
import './assets/styles/effects.css'

const app = createApp(App)
const pinia = createPinia()

// 注册ElementPlus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 按照正确顺序配置插件
app.use(pinia)
app.use(router)
app.use(ElementPlus, { locale: zhCn })

// 初始化AOS动画库
AOS.init({
  duration: 1000,
  once: true,
  offset: 100
})

app.mount('#app') 