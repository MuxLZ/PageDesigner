/**
 * 配置生成器 - 将配置转换为实际页面
 */
import type { ModuleConfig, PageConfig, SiteConfig } from '@/types/module'
import { ModuleType } from '@/types/module'

export class ConfigGenerator {
  /**
   * 生成默认页面配置
   */
  static generateDefaultPageConfig(name: string, route: string): PageConfig {
    return {
      id: `page-${Date.now()}`,
      name,
      route,
      modules: [],
      globalStyle: {
        theme: {
          primary: '#1e3a8a',
          secondary: '#3b82f6',
          accent: '#f59e0b',
          success: '#10b981',
          warning: '#f59e0b',
          danger: '#ef4444',
          dark: '#1f2937',
          light: '#f8fafc',
          gray: '#6b7280',
          border: '#e5e7eb',
          background: '#ffffff',
          text: '#333333'
        }
      }
    }
  }
  
  /**
   * 生成默认模块配置
   */
  static generateDefaultModuleConfig(type: ModuleType, name: string): Partial<ModuleConfig> {
    const base = {
      id: `module-${type}-${Date.now()}`,
      type,
      name,
      visible: true,
      order: 0
    }
    
    switch (type) {
      case ModuleType.CAROUSEL:
        return {
          ...base,
          slides: [
            {
              title: '专业医疗 · 健康守护',
              subtitle: '专业的医疗康养服务，为您的健康生活保驾护航',
              background: 'https://picsum.photos/1920/1080?random=1',
              buttons: [
                { text: '了解更多', type: 'primary', link: '/about' },
                { text: '联系我们', type: 'secondary', link: '/contact' }
              ]
            },
            {
              title: '康养服务 · 品质生活',
              subtitle: '先进的医疗技术和人性化服务，打造舒适、温馨的康养环境',
              background: 'https://picsum.photos/1920/1080?random=2',
              buttons: [
                { text: '查看方案', type: 'primary', link: '/solutions' }
              ]
            },
            {
              title: '医者仁心 · 专业服务',
              subtitle: '20年专业经验，为50000+患者提供优质医疗服务',
              background: 'https://picsum.photos/1920/1080?random=3',
              buttons: [
                { text: '医疗服务', type: 'primary', link: '/products' }
              ]
            }
          ],
          autoplay: true,
          interval: 5000,
          height: '100vh',
          indicator: true,
          arrows: true
        }
      
      case ModuleType.GRID:
        return {
          ...base,
          columns: 3,
          items: [
            {
              title: '专业医疗',
              description: '三甲医院标准，提供专业诊断和治疗服务',
              image: 'https://picsum.photos/400/300?random=10',
              icon: 'Tools'
            },
            {
              title: '康复治疗',
              description: '个性化康复方案，帮助患者恢复健康',
              image: 'https://picsum.photos/400/300?random=11',
              icon: 'Setting'
            },
            {
              title: '健康管理',
              description: '全方位健康管理服务，预防疾病发生',
              image: 'https://picsum.photos/400/300?random=12',
              icon: 'Monitor'
            },
            {
              title: '老年康养',
              description: '温馨舒适的康养环境，专业护理服务',
              image: 'https://picsum.photos/400/300?random=13',
              icon: 'View'
            },
            {
              title: '慢性病管理',
              description: '专业的慢性病管理服务，全程跟踪管理',
              image: 'https://picsum.photos/400/300?random=14',
              icon: 'Camera'
            },
            {
              title: '健康体检',
              description: '全面的健康体检服务，建立个人健康档案',
              image: 'https://picsum.photos/400/300?random=15',
              icon: 'DataAnalysis'
            }
          ]
        }
      
      case ModuleType.COLUMN:
        return {
          ...base,
          columns: 2,
          items: [
            {
              title: '医者仁心，健康守护',
              content: '康养医院专注医疗康养领域20年，为患者提供专业医疗服务和健康管理方案。医院拥有一支由资深医师组成的专业团队，在医疗诊断、康复治疗、健康管理、老年康养等领域积累了丰富的经验。',
              image: 'https://picsum.photos/600/400?random=20'
            },
            {
              title: '专业医疗团队',
              content: '我们的团队拥有20年以上的医疗康养经验，医疗技术实力雄厚。已成功服务50000+患者，医疗服务质量优秀。三级甲等医院认证，医疗质量管理体系完善，为患者提供全方位的医疗服务。',
              image: 'https://picsum.photos/600/400?random=21'
            }
          ]
        }
      
      case ModuleType.TIMELINE:
        return {
          ...base,
          items: [
            {
              year: '2024',
              title: '行业领先',
              description: '服务患者超过50000人，成为区域医疗康养标杆，荣获多项医疗奖项'
            },
            {
              year: '2020',
              title: '数字化升级',
              description: '完成医疗信息化建设，建立健康管理平台，推出综合康养服务方案'
            },
            {
              year: '2016',
              title: '战略转型',
              description: '全面转向医养结合，服务范围扩展至周边区域，服务患者超过10000人'
            },
            {
              year: '2012',
              title: '技术突破',
              description: '引进先进医疗设备和技术，医疗实力得到认可'
            },
            {
              year: '2008',
              title: '服务扩展',
              description: '服务范围扩展至周边区域，建立完善的医疗服务网络'
            },
            {
              year: '2004',
              title: '医院成立',
              description: '康养医院在上海成立，开始专注医疗康养领域'
            }
          ]
        }
      
      case ModuleType.HEADER:
        return {
          ...base,
          logo: {
            text: '康养医院',
            image: 'https://picsum.photos/120/40?random=100'
          },
          menu: {
            items: [
              { label: '首页', link: '/' },
              { 
                label: '医疗服务', 
                link: '/products',
                children: [
                  { label: '医疗设备', link: '/products/medical-equipment' },
                  { label: '康复治疗', link: '/products/rehabilitation' },
                  { label: '健康管理', link: '/products/health-management' }
                ]
              },
              { 
                label: '解决方案', 
                link: '/solutions',
                children: [
                  { label: '慢性病管理', link: '/solutions/chronic-disease' },
                  { label: '康复治疗', link: '/solutions/rehabilitation' }
                ]
              },
              { label: '关于我们', link: '/about' },
              { label: '新闻资讯', link: '/news' },
              { label: '联系我们', link: '/contact' }
            ]
          },
          topBar: {
            visible: true,
            items: [
              { icon: 'Phone', text: '400-123-4567' },
              { icon: 'Message', text: 'info@zhizao.com' },
              { icon: 'Location', text: '上海市浦东新区科技园' }
            ]
          },
          fixed: true
        }
      
      case ModuleType.FOOTER:
        return {
          ...base,
          sections: [
            {
              title: '医疗服务',
              links: [
                { text: '医疗设备', link: '/products/medical-equipment' },
                { text: '康复治疗', link: '/products/rehabilitation' },
                { text: '健康管理', link: '/products/health-management' },
                { text: '老年康养', link: '/products/elderly-care' },
                { text: '解决方案', link: '/solutions' }
              ]
            },
            {
              title: '医院信息',
              links: [
                { text: '关于我们', link: '/about' },
                { text: '医院文化', link: '/about/culture' },
                { text: '团队介绍', link: '/about/team' },
                { text: '健康资讯', link: '/news' },
                { text: '人才招聘', link: '/careers' }
              ]
            },
            {
              title: '联系我们',
              content: '上海市浦东新区医疗健康园区健康路123号\n电话：400-123-4567\n邮箱：info@kangyang.com\n工作时间：周一至周五 9:00-18:00'
            }
          ],
          socialLinks: [
            { icon: 'Platform', link: 'https://weibo.com' },
            { icon: 'ChatDotRound', link: 'https://wechat.com' },
            { icon: 'Share', link: 'https://linkedin.com' }
          ],
          copyright: `© ${new Date().getFullYear()} 康养医院. 保留所有权利.`,
          backgroundColor: '#1f2937',
          textColor: '#ffffff'
        }
      
      case ModuleType.STATS:
        return {
          ...base,
          items: [
            { number: '50000', label: '服务患者', suffix: '+' },
            { number: '20', label: '年专业经验', suffix: '' },
            { number: '200', label: '专业医师', suffix: '+' },
            { number: '98', label: '患者满意度', suffix: '%' }
          ],
          columns: 4,
          backgroundColor: 'linear-gradient(135deg, #1e3a8a, #3b82f6)',
          textColor: '#ffffff'
        }
      
      case ModuleType.PAGE_HERO:
        return {
          ...base,
          title: '页面标题',
          subtitle: '页面副标题',
          breadcrumb: [
            { label: '首页', link: '/' },
            { label: '当前页面' }
          ],
          backgroundColor: 'linear-gradient(135deg, #1e3a8a, #3b82f6)',
          textColor: '#ffffff'
        }
      
      case ModuleType.FEATURE_LIST:
        return {
          ...base,
          title: '核心优势',
          subtitle: '我们的专业服务',
          items: [
            { icon: 'Tools', title: '专业医疗', description: '20年医疗康养经验，医疗技术实力雄厚' },
            { icon: 'Trophy', title: '行业领先', description: '服务50000+患者，医疗服务质量优秀' },
            { icon: 'Star', title: '品质保证', description: '三级甲等医院认证，医疗质量管理体系完善' }
          ],
          layout: 'horizontal',
          columns: 3
        }
      
      case ModuleType.CARD_LIST:
        return {
          ...base,
          title: '卡片列表',
          subtitle: '展示卡片内容',
          items: [
            { title: '卡片1', description: '卡片描述1', image: 'https://picsum.photos/400/300?random=40' },
            { title: '卡片2', description: '卡片描述2', image: 'https://picsum.photos/400/300?random=41' },
            { title: '卡片3', description: '卡片描述3', image: 'https://picsum.photos/400/300?random=42' }
          ],
          columns: 3,
          cardStyle: 'default'
        }
      
      case ModuleType.TEXT_IMAGE:
        return {
          ...base,
          title: '标题内容',
          content: '这里是详细的文本内容描述，可以包含多段文字说明。',
          image: 'https://picsum.photos/600/400?random=50',
          layout: 'left-image',
          buttons: [
            { text: '了解更多', type: 'primary', link: '/about' }
          ]
        }
      
      case ModuleType.CONTACT_FORM:
        return {
          ...base,
          title: '在线留言',
          fields: [
            { name: 'name', label: '姓名', type: 'text', placeholder: '请输入您的姓名', required: true },
            { name: 'phone', label: '电话', type: 'tel', placeholder: '请输入联系电话', required: true },
            { name: 'email', label: '邮箱', type: 'email', placeholder: '请输入邮箱地址', required: true },
            { name: 'message', label: '留言', type: 'textarea', placeholder: '请输入留言内容', required: true }
          ],
          submitText: '提交留言'
        }
      
      case ModuleType.CTA:
        return {
          ...base,
          title: '准备开始您的健康之旅？',
          subtitle: '联系我们的专业团队，获取个性化健康管理方案',
          buttons: [
            { text: '免费咨询', type: 'primary', link: '/contact', icon: 'Phone' },
            { text: '在线留言', type: 'secondary', link: '/contact' }
          ],
          backgroundColor: 'linear-gradient(135deg, #1e3a8a, #3b82f6)',
          textColor: '#ffffff'
        }
      
      case ModuleType.PRODUCTS:
        return {
          ...base,
          title: '核心服务',
          subtitle: '为患者提供全方位的医疗康养服务',
          items: [
            {
              name: '专业医疗',
              description: '三甲医院标准，提供专业诊断和治疗服务',
              image: 'https://picsum.photos/400/300?random=60',
              features: ['专业医师', '先进设备', '精准诊断']
            },
            {
              name: '康复治疗',
              description: '个性化康复方案，帮助患者恢复健康',
              image: 'https://picsum.photos/400/300?random=61',
              features: ['个性化', '专业指导', '效果显著']
            },
            {
              name: '健康管理',
              description: '全方位健康管理服务，预防疾病发生',
              image: 'https://picsum.photos/400/300?random=62',
              features: ['定期体检', '健康档案', '专业咨询']
            }
          ],
          columns: 3
        }
      
      case ModuleType.NEWS:
        return {
          ...base,
          title: '健康资讯',
          subtitle: '了解医疗动态，掌握健康知识',
          items: [
            {
              title: '康养医院荣获2024年度医疗服务质量优秀奖',
              excerpt: '凭借在医疗康养领域的突出贡献，康养医院荣获行业权威奖项...',
              image: 'https://picsum.photos/400/250?random=70',
              category: '医院新闻',
              date: '2024-01-15',
              author: '康养医院'
            },
            {
              title: '慢性病管理新方法研究进展',
              excerpt: '随着医疗技术的发展，慢性病管理正朝着更加精准化和个性化的方向发展...',
              image: 'https://picsum.photos/400/250?random=71',
              category: '医疗动态',
              date: '2024-01-10',
              author: '医疗部'
            }
          ],
          columns: 3
        }
      
      case ModuleType.PARTNERS:
        return {
          ...base,
          title: '合作伙伴',
          subtitle: '与知名医疗机构建立长期合作关系',
          items: [
            { name: '医疗设备', logo: 'https://via.placeholder.com/120x60/f0f0f0/333333?text=医疗设备' },
            { name: '康复中心', logo: 'https://via.placeholder.com/120x60/f0f0f0/333333?text=康复中心' },
            { name: '健康管理', logo: 'https://via.placeholder.com/120x60/f0f0f0/333333?text=健康管理' },
            { name: '医疗研究', logo: 'https://via.placeholder.com/120x60/f0f0f0/333333?text=医疗研究' },
            { name: '康养机构', logo: 'https://via.placeholder.com/120x60/f0f0f0/333333?text=康养机构' },
            { name: '健康科技', logo: 'https://via.placeholder.com/120x60/f0f0f0/333333?text=健康科技' }
          ],
          columns: 6,
          grayscale: true,
          hoverEffect: true
        }
      
      case ModuleType.TEAM:
        return {
          ...base,
          title: '核心团队',
          subtitle: '汇聚行业精英，共创美好未来',
          items: [
            {
              name: '张建华',
              position: '院长兼主任医师',
              bio: '20年医疗康养经验，医学博士，医疗行业资深专家',
              avatar: 'https://i.pravatar.cc/150?img=33'
            },
            {
              name: '李明',
              position: '医疗总监',
              bio: '15年医疗临床经验，主导多项医疗技术突破',
              avatar: 'https://i.pravatar.cc/150?img=45'
            }
          ],
          columns: 4
        }
      
      case ModuleType.HONORS:
        return {
          ...base,
          title: '资质荣誉',
          subtitle: '权威认证，实力见证',
          items: [
            { title: '三级甲等医院认证', image: 'https://via.placeholder.com/200x200/1e3a8a/ffffff?text=三甲医院' },
            { title: '医保定点医疗机构', image: 'https://via.placeholder.com/200x200/3b82f6/ffffff?text=医保定点' },
            { title: '2023年度医疗服务质量优秀奖', image: 'https://via.placeholder.com/200x200/f59e0b/ffffff?text=服务优秀' }
          ],
          columns: 4
        }
      
      case ModuleType.ABOUT:
        return {
          ...base,
          title: '医者仁心，健康守护',
          subtitle: '康养医院专注医疗康养领域20年',
          content: '医院拥有一支由资深医师组成的专业团队，在医疗诊断、康复治疗、健康管理、老年康养等领域积累了丰富的经验。',
          image: 'https://picsum.photos/600/400?random=80',
          features: [
            { icon: 'Target', title: '使命', description: '提供优质医疗服务，守护患者健康' },
            { icon: 'View', title: '愿景', description: '成为区域领先的医疗康养服务提供商' }
          ],
          layout: 'left-image'
        }
      
      case ModuleType.CULTURE:
        return {
          ...base,
          title: '医院文化',
          subtitle: '以人为本，追求卓越',
          content: '我们坚持医者仁心、患者至上、团队协作、社会责任的文化理念。',
          image: 'https://picsum.photos/600/400?random=81',
          items: [
            { title: '医者仁心', description: '持续医疗创新，推动健康事业发展' },
            { title: '患者至上', description: '以患者需求为导向，提供优质医疗服务' }
          ],
          layout: 'left-image'
        }
      
      case ModuleType.SOLUTIONS:
        return {
          ...base,
          title: '医疗解决方案',
          subtitle: '针对不同需求提供定制化的医疗康养解决方案',
          tabs: [
            {
              name: '慢性病管理',
              title: '慢性病管理解决方案',
              description: '为慢性病患者提供全程健康管理，包括疾病监测、用药指导、生活方式干预等',
              benefits: ['提高治疗依从性', '降低并发症风险', '改善生活质量'],
              image: 'https://picsum.photos/500/350?random=90'
            },
            {
              name: '康复治疗',
              title: '康复治疗解决方案',
              description: '针对术后康复、运动损伤等提供专业康复训练和治疗方案',
              benefits: ['加速功能恢复', '个性化康复计划', '专业康复团队'],
              image: 'https://picsum.photos/500/350?random=91'
            }
          ],
          activeTab: '慢性病管理'
        }
      
      case ModuleType.CONTACT:
        return {
          ...base,
          title: '联系我们',
          subtitle: '专业团队为您提供优质服务',
          buttons: [
            { text: '立即咨询', type: 'primary', link: '/contact', icon: 'Phone' },
            { text: '在线留言', type: 'secondary', link: '/contact' }
          ]
        }
      
      default:
        return base
    }
  }
  
  /**
   * 验证模块配置
   */
  static validateModuleConfig(config: Partial<ModuleConfig>): boolean {
    if (!config.id || !config.type || !config.name) {
      return false
    }
    
    // 根据类型验证必需字段
    switch (config.type) {
      case ModuleType.CAROUSEL:
        return Array.isArray((config as any).slides) && (config as any).slides.length > 0
      
      case ModuleType.GRID:
        return Array.isArray((config as any).items) && (config as any).items.length > 0
      
      case ModuleType.COLUMN:
        return Array.isArray((config as any).items) && (config as any).items.length > 0
      
      case ModuleType.TIMELINE:
        return Array.isArray((config as any).items) && (config as any).items.length > 0
      
      default:
        return true
    }
  }
  
  /**
   * 排序模块
   */
  static sortModules(modules: ModuleConfig[]): ModuleConfig[] {
    return [...modules].sort((a, b) => a.order - b.order)
  }
  
  /**
   * 过滤可见模块
   */
  static filterVisibleModules(modules: ModuleConfig[]): ModuleConfig[] {
    return modules.filter(m => m.visible)
  }
  
  /**
   * 导出配置为JSON
   */
  static exportConfig(config: SiteConfig | PageConfig): string {
    return JSON.stringify(config, null, 2)
  }
  
  /**
   * 从JSON导入配置
   */
  static importConfig(json: string): SiteConfig | PageConfig {
    try {
      return JSON.parse(json)
    } catch (error) {
      throw new Error('Invalid JSON configuration')
    }
  }
  
  /**
   * 复制模块配置
   */
  static cloneModuleConfig(config: ModuleConfig): ModuleConfig {
    return {
      ...config,
      id: `module-${config.type}-${Date.now()}`,
      name: `${config.name} (副本)`
    }
  }
}

