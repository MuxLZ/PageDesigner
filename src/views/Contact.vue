<template>
  <div class="contact-page">
    <section class="page-hero gradient-bg">
      <div class="container">
        <div class="hero-content">
          <h1 class="page-title">联系我们</h1>
          <p class="page-subtitle">专业团队为您提供优质服务</p>
        </div>
      </div>
    </section>
    
    <section class="contact-section section">
      <div class="container">
        <div class="contact-grid">
          <div class="contact-info">
            <h2>联系信息</h2>
            <div class="info-items">
              <div class="info-item">
                <el-icon><Location /></el-icon>
                <div>
                  <h4>医院地址</h4>
                  <p>上海市浦东新区医疗健康园区健康路123号</p>
                </div>
              </div>
              <div class="info-item">
                <el-icon><Phone /></el-icon>
                <div>
                  <h4>联系电话</h4>
                  <p>400-123-4567</p>
                </div>
              </div>
              <div class="info-item">
                <el-icon><Message /></el-icon>
                <div>
                  <h4>邮箱地址</h4>
                  <p>info@kangyang.com</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="contact-form">
            <h2>在线留言</h2>
            <el-form>
              <el-form-item label="姓名">
                <el-input placeholder="请输入您的姓名" />
              </el-form-item>
              <el-form-item label="电话">
                <el-input placeholder="请输入联系电话" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input placeholder="请输入邮箱地址" />
              </el-form-item>
              <el-form-item label="留言">
                <el-input type="textarea" :rows="4" placeholder="请输入留言内容" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" style="width: 100%">提交留言</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>



<style scoped>
.contact-page { margin-top: 120px; }
.page-hero { padding: 100px 0; color: white; text-align: center; }
.page-title { font-size: 3rem; font-weight: 700; margin-bottom: 1rem; }
.page-subtitle { font-size: 1.25rem; opacity: 0.9; }
.contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; }
.info-items { margin-top: 30px; }
.info-item { display: flex; align-items: center; gap: 15px; margin-bottom: 25px; }
.info-item h4 { margin-bottom: 5px; color: var(--dark-color); }
.info-item p { color: var(--gray-color); }
.contact-form { background: white; padding: 30px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); }
@media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr; gap: 30px; } }
</style> 