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
              title: '智能制造 · 引领未来',
              subtitle: '专业的工业自动化解决方案，助力企业数字化转型升级',
              background: 'https://picsum.photos/1920/1080?random=1',
              buttons: [
                { text: '了解更多', type: 'primary', link: '/about' },
                { text: '联系我们', type: 'secondary', link: '/contact' }
              ]
            },
            {
              title: '工业4.0 · 智慧工厂',
              subtitle: '先进的智能制造技术，打造高效、节能的现代化工厂',
              background: 'https://picsum.photos/1920/1080?random=2',
              buttons: [
                { text: '查看方案', type: 'primary', link: '/solutions' }
              ]
            },
            {
              title: '技术创新 · 品质卓越',
              subtitle: '20年专业经验，为全球500+企业提供优质服务',
              background: 'https://picsum.photos/1920/1080?random=3',
              buttons: [
                { text: '产品中心', type: 'primary', link: '/products' }
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
              title: '自动化生产线',
              description: '高效、稳定的自动化生产线解决方案',
              image: 'https://picsum.photos/400/300?random=10',
              icon: 'Tools'
            },
            {
              title: '工业机器人',
              description: '精密、灵活的工业机器人系统',
              image: 'https://picsum.photos/400/300?random=11',
              icon: 'Setting'
            },
            {
              title: 'PLC控制系统',
              description: '稳定可靠的工业控制系统',
              image: 'https://picsum.photos/400/300?random=12',
              icon: 'Monitor'
            },
            {
              title: '智能传感器',
              description: '高精度的智能检测设备',
              image: 'https://picsum.photos/400/300?random=13',
              icon: 'View'
            },
            {
              title: '视觉检测系统',
              description: 'AI驱动的智能视觉检测',
              image: 'https://picsum.photos/400/300?random=14',
              icon: 'Camera'
            },
            {
              title: 'MES管理系统',
              description: '智能制造执行系统',
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
              title: '智造未来，科技领先',
              content: '智造科技专注工业自动化领域20年，为全球客户提供智能制造解决方案。公司拥有一支由资深工程师组成的专业团队，在工业自动化、智能制造、工业4.0等领域积累了丰富的经验。',
              image: 'https://picsum.photos/600/400?random=20'
            },
            {
              title: '专业技术团队',
              content: '我们的团队拥有20年以上的工业自动化经验，技术实力雄厚。已成功服务500+企业，行业标杆案例丰富。ISO9001认证，品质管理体系完善，为客户提供全方位的技术支持。',
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
              description: '服务客户超过500家，成为行业领军企业，荣获多项行业大奖'
            },
            {
              year: '2020',
              title: '数字化升级',
              description: '完成数字化转型，建立智能工厂示范基地，推出工业4.0解决方案'
            },
            {
              year: '2016',
              title: '战略转型',
              description: '全面转向智能制造，业务范围扩展至全国，服务客户超过100家'
            },
            {
              year: '2012',
              title: '技术突破',
              description: '自主研发的PLC控制系统获得国家专利，技术实力得到认可'
            },
            {
              year: '2008',
              title: '业务扩展',
              description: '业务范围扩展至全国多个城市，建立完善的销售和服务网络'
            },
            {
              year: '2004',
              title: '公司成立',
              description: '智造科技在上海成立，开始专注工业自动化领域'
            }
          ]
        }
      
      case ModuleType.HEADER:
        return {
          ...base,
          logo: {
            text: '智造科技',
            image: 'https://picsum.photos/120/40?random=100'
          },
          menu: {
            items: [
              { label: '首页', link: '/' },
              { label: '关于我们', link: '/about' },
              { label: '产品中心', link: '/products' },
              { label: '解决方案', link: '/solutions' },
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
              title: '产品服务',
              links: [
                { text: '自动化设备', link: '/products/automation' },
                { text: '工业机器人', link: '/products/robots' },
                { text: 'PLC控制系统', link: '/products/plc' },
                { text: '智能传感器', link: '/products/sensors' },
                { text: '解决方案', link: '/solutions' }
              ]
            },
            {
              title: '公司信息',
              links: [
                { text: '关于我们', link: '/about' },
                { text: '企业文化', link: '/about/culture' },
                { text: '团队介绍', link: '/about/team' },
                { text: '新闻资讯', link: '/news' },
                { text: '人才招聘', link: '/careers' }
              ]
            },
            {
              title: '联系我们',
              content: '上海市浦东新区科技园区创新路123号\n电话：400-123-4567\n邮箱：info@zhizao.com\n工作时间：周一至周五 9:00-18:00'
            }
          ],
          socialLinks: [
            { icon: 'Platform', link: 'https://weibo.com' },
            { icon: 'ChatDotRound', link: 'https://wechat.com' },
            { icon: 'Share', link: 'https://linkedin.com' }
          ],
          copyright: `© ${new Date().getFullYear()} 智造科技有限公司. 保留所有权利.`,
          backgroundColor: '#1f2937',
          textColor: '#ffffff'
        }
      
      case ModuleType.STATS:
        return {
          ...base,
          items: [
            { number: '500', label: '服务企业', suffix: '+' },
            { number: '20', label: '年专业经验', suffix: '' },
            { number: '1000', label: '成功案例', suffix: '+' },
            { number: '98', label: '客户满意度', suffix: '%' }
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
            { icon: 'Tools', title: '专业技术', description: '20年工业自动化经验，技术实力雄厚' },
            { icon: 'Trophy', title: '行业领先', description: '服务500+企业，行业标杆案例丰富' },
            { icon: 'Star', title: '品质保证', description: 'ISO9001认证，品质管理体系完善' }
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
          title: '准备开始您的智能制造之旅？',
          subtitle: '联系我们的专业团队，获取定制化解决方案',
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
          title: '核心产品',
          subtitle: '为企业提供全方位的工业自动化解决方案',
          items: [
            {
              name: '自动化生产线',
              description: '高效、稳定的自动化生产线解决方案',
              image: 'https://picsum.photos/400/300?random=60',
              features: ['高效率', '低能耗', '智能化']
            },
            {
              name: '工业机器人',
              description: '精密、灵活的工业机器人系统',
              image: 'https://picsum.photos/400/300?random=61',
              features: ['精度高', '速度快', '可靠性强']
            },
            {
              name: 'PLC控制系统',
              description: '稳定可靠的工业控制系统',
              image: 'https://picsum.photos/400/300?random=62',
              features: ['稳定性', '扩展性', '易维护']
            }
          ],
          columns: 3
        }
      
      case ModuleType.NEWS:
        return {
          ...base,
          title: '新闻资讯',
          subtitle: '了解行业动态，掌握前沿技术',
          items: [
            {
              title: '智造科技荣获2024年度工业自动化创新奖',
              excerpt: '凭借在工业4.0领域的突出贡献，智造科技荣获行业权威奖项...',
              image: 'https://picsum.photos/400/250?random=70',
              category: '公司新闻',
              date: '2024-01-15',
              author: '智造科技'
            },
            {
              title: '工业机器人技术发展趋势分析',
              excerpt: '随着人工智能技术的发展，工业机器人正朝着更加智能化的方向发展...',
              image: 'https://picsum.photos/400/250?random=71',
              category: '行业动态',
              date: '2024-01-10',
              author: '技术部'
            }
          ],
          columns: 3
        }
      
      case ModuleType.PARTNERS:
        return {
          ...base,
          title: '合作伙伴',
          subtitle: '与全球知名企业建立长期合作关系',
          items: [
            { name: 'Siemens', logo: 'https://via.placeholder.com/120x60/f0f0f0/333333?text=Siemens' },
            { name: 'ABB', logo: 'https://via.placeholder.com/120x60/f0f0f0/333333?text=ABB' },
            { name: 'Schneider', logo: 'https://via.placeholder.com/120x60/f0f0f0/333333?text=Schneider' },
            { name: 'Rockwell', logo: 'https://via.placeholder.com/120x60/f0f0f0/333333?text=Rockwell' },
            { name: 'KUKA', logo: 'https://via.placeholder.com/120x60/f0f0f0/333333?text=KUKA' },
            { name: 'Fanuc', logo: 'https://via.placeholder.com/120x60/f0f0f0/333333?text=Fanuc' }
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
              position: '创始人兼CEO',
              bio: '20年工业自动化经验，清华大学硕士，行业资深专家',
              avatar: 'https://i.pravatar.cc/150?img=33'
            },
            {
              name: '李明',
              position: '技术总监',
              bio: '15年技术研发经验，主导多项核心技术突破',
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
            { title: 'ISO9001质量管理体系认证', image: 'https://via.placeholder.com/200x200/1e3a8a/ffffff?text=ISO9001' },
            { title: '国家高新技术企业', image: 'https://via.placeholder.com/200x200/3b82f6/ffffff?text=高新企业' },
            { title: '2023年度创新企业奖', image: 'https://via.placeholder.com/200x200/f59e0b/ffffff?text=创新奖' }
          ],
          columns: 4
        }
      
      case ModuleType.ABOUT:
        return {
          ...base,
          title: '智造未来，科技领先',
          subtitle: '智造科技专注工业自动化领域20年',
          content: '公司拥有一支由资深工程师组成的专业团队，在工业自动化、智能制造、工业4.0等领域积累了丰富的经验。',
          image: 'https://picsum.photos/600/400?random=80',
          features: [
            { icon: 'Target', title: '使命', description: '推动制造业智能化转型' },
            { icon: 'View', title: '愿景', description: '成为全球领先的智能制造解决方案提供商' }
          ],
          layout: 'left-image'
        }
      
      case ModuleType.CULTURE:
        return {
          ...base,
          title: '企业文化',
          subtitle: '以人为本，追求卓越',
          content: '我们坚持创新驱动、客户至上、团队协作、社会责任的企业文化理念。',
          image: 'https://picsum.photos/600/400?random=81',
          items: [
            { title: '创新驱动', description: '持续技术创新，推动行业进步' },
            { title: '客户至上', description: '以客户需求为导向，提供优质服务' }
          ],
          layout: 'left-image'
        }
      
      case ModuleType.SOLUTIONS:
        return {
          ...base,
          title: '行业解决方案',
          subtitle: '针对不同行业提供定制化的智能制造解决方案',
          tabs: [
            {
              name: '汽车制造',
              title: '汽车制造智能化解决方案',
              description: '为汽车制造企业提供从零部件生产到整车装配的全流程自动化解决方案',
              benefits: ['提高生产效率30%以上', '降低人工成本40%', '提升产品质量稳定性'],
              image: 'https://picsum.photos/500/350?random=90'
            },
            {
              name: '电子制造',
              title: '电子制造精密化解决方案',
              description: '针对电子产品制造的高精度、高速度自动化生产线',
              benefits: ['提升产品精度和一致性', '缩短生产周期50%', '降低不良品率'],
              image: 'https://picsum.photos/500/350?random=91'
            }
          ],
          activeTab: '汽车制造'
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

