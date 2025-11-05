<template>
  <BaseModuleWrapper :module-config="config">
    <footer
      class="footer-module"
      :style="footerStyles"
    >
      <div class="footer-content">
        <div class="container">
          <div class="footer-grid">
            <div
              v-for="(section, index) in config.sections"
              :key="index"
              class="footer-section"
            >
              <h4 v-if="section.title" class="footer-title">{{ section.title }}</h4>
              <ul v-if="section.links" class="footer-links">
                <li v-for="(link, linkIndex) in section.links" :key="linkIndex">
                  <a :href="link.link">{{ link.text }}</a>
                </li>
              </ul>
              <p v-if="section.content" class="footer-content-text">{{ section.content }}</p>
            </div>
          </div>
          
          <div v-if="config.socialLinks" class="social-links">
            <a
              v-for="(social, index) in config.socialLinks"
              :key="index"
              :href="social.link"
              class="social-link"
              target="_blank"
            >
              <el-icon><component :is="social.icon" /></el-icon>
            </a>
          </div>
        </div>
      </div>

      <!-- 底部版权 -->
      <div v-if="config.copyright" class="footer-bottom">
        <div class="container">
          <div class="footer-bottom-content">
            <p>{{ config.copyright }}</p>
          </div>
        </div>
      </div>
    </footer>
  </BaseModuleWrapper>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { FooterConfig } from '@/types/module'
import BaseModuleWrapper from './BaseModuleWrapper.vue'

interface Props {
  config: FooterConfig
}

const props = defineProps<Props>()

const footerStyles = computed(() => {
  const styles: Record<string, any> = {}
  if (props.config.backgroundColor) {
    styles.backgroundColor = props.config.backgroundColor
  }
  if (props.config.textColor) {
    styles.color = props.config.textColor
  }
  return styles
})
</script>

<style scoped>
.footer-module {
  background: var(--dark-color);
  color: white;
  margin-top: auto;
}

.footer-content {
  padding: 60px 0 40px;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px;
  margin-bottom: 40px;
}

.footer-section {
  display: flex;
  flex-direction: column;
}

.footer-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: white;
}

.footer-links {
  list-style: none;
}

.footer-links li {
  margin-bottom: 8px;
}

.footer-links a {
  color: #9ca3af;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-links a:hover {
  color: var(--secondary-color);
}

.footer-content-text {
  color: #9ca3af;
  line-height: 1.6;
}

.social-links {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 40px;
}

.social-link {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  transition: all 0.3s;
}

.social-link:hover {
  background: var(--primary-color);
  transform: translateY(-2px);
}

.footer-bottom {
  background: rgba(0, 0, 0, 0.3);
  padding: 20px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-bottom-content {
  text-align: center;
  color: #9ca3af;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 30px;
    text-align: center;
  }
  
  .footer-content {
    padding: 40px 0 30px;
  }
}
</style>

