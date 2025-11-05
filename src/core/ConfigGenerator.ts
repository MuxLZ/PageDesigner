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

