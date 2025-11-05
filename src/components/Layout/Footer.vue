<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="container">
        <div class="footer-grid">
          <!-- 公司信息 -->
          <div class="footer-section">
            <div class="footer-logo">
              <span class="logo-text">智造科技</span>
              <p class="company-desc">
                专注工业自动化领域20年，为企业提供智能制造解决方案，助力工业4.0转型升级。
              </p>
            </div>
            <div class="social-links">
              <a href="#" class="social-link">
                <el-icon><Platform /></el-icon>
              </a>
              <a href="#" class="social-link">
                <el-icon><ChatDotRound /></el-icon>
              </a>
              <a href="#" class="social-link">
                <el-icon><Share /></el-icon>
              </a>
            </div>
          </div>

          <!-- 产品服务 -->
          <div class="footer-section">
            <h4 class="footer-title">产品服务</h4>
            <ul class="footer-links">
              <li><a href="/products/automation">自动化设备</a></li>
              <li><a href="/products/robots">工业机器人</a></li>
              <li><a href="/products/plc">PLC控制系统</a></li>
              <li><a href="/products/sensors">智能传感器</a></li>
              <li><a href="/solutions">解决方案</a></li>
            </ul>
          </div>

          <!-- 公司信息 -->
          <div class="footer-section">
            <h4 class="footer-title">公司信息</h4>
            <ul class="footer-links">
              <li><a href="/about">关于我们</a></li>
              <li><a href="/about/culture">企业文化</a></li>
              <li><a href="/about/team">团队介绍</a></li>
              <li><a href="/news">新闻资讯</a></li>
              <li><a href="/careers">人才招聘</a></li>
            </ul>
          </div>

          <!-- 联系我们 -->
          <div class="footer-section">
            <h4 class="footer-title">联系我们</h4>
            <div class="contact-info">
              <div class="contact-item">
                <el-icon><Location /></el-icon>
                <span>上海市浦东新区科技园区创新路123号</span>
              </div>
              <div class="contact-item">
                <el-icon><Phone /></el-icon>
                <span>400-123-4567</span>
              </div>
              <div class="contact-item">
                <el-icon><Message /></el-icon>
                <span>info@zhizao.com</span>
              </div>
              <div class="contact-item">
                <el-icon><Clock /></el-icon>
                <span>周一至周五 9:00-18:00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部版权 -->
    <div class="footer-bottom">
      <div class="container">
        <div class="footer-bottom-content">
          <p>&copy; 2024 智造科技有限公司. 保留所有权利.</p>
          <div class="footer-links-bottom">
            <a href="/privacy">隐私政策</a>
            <a href="/terms">服务条款</a>
            <a href="/sitemap">网站地图</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// 无需逻辑
</script>

<style scoped>
.footer {
  background: var(--dark-color);
  color: white;
  margin-top: auto;
}

.footer-content {
  padding: 60px 0 40px;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: 40px;
}

.footer-section {
  display: flex;
  flex-direction: column;
}

.footer-logo .logo-text {
  font-size: 1.8rem;
  font-weight: 700;
  color: white;
  margin-bottom: 15px;
  display: block;
}

.company-desc {
  color: #9ca3af;
  line-height: 1.6;
  margin-bottom: 20px;
}

.social-links {
  display: flex;
  gap: 15px;
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

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #9ca3af;
}

.contact-item .el-icon {
  color: var(--secondary-color);
  font-size: 1.1rem;
}

.footer-bottom {
  background: rgba(0, 0, 0, 0.3);
  padding: 20px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #9ca3af;
  font-size: 0.9rem;
}

.footer-links-bottom {
  display: flex;
  gap: 20px;
}

.footer-links-bottom a {
  color: #9ca3af;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-links-bottom a:hover {
  color: var(--secondary-color);
}

@media (max-width: 1024px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }
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
  
  .footer-bottom-content {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
  
  .contact-item {
    justify-content: center;
  }
}
</style> 