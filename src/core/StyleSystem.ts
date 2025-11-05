/**
 * 样式配置系统
 */
import type { ColorTheme, FontConfig, SpacingConfig, ModuleStyleConfig } from '@/types/module'

export class StyleSystem {
  /**
   * 创建默认主题
   */
  static createDefaultTheme(): ColorTheme {
    return {
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
  
  /**
   * 创建字体配置
   */
  static createFontConfig(config?: Partial<FontConfig>): FontConfig {
    return {
      family: config?.family ?? "'PingFang SC', 'Microsoft YaHei', sans-serif",
      size: config?.size ?? '16px',
      weight: config?.weight ?? 'normal',
      color: config?.color ?? '#333',
      lineHeight: config?.lineHeight ?? '1.6',
      letterSpacing: config?.letterSpacing ?? 'normal',
      ...config
    }
  }
  
  /**
   * 创建间距配置
   */
  static createSpacingConfig(config?: Partial<SpacingConfig>): SpacingConfig {
    return {
      top: config?.top ?? 0,
      right: config?.right ?? 0,
      bottom: config?.bottom ?? 0,
      left: config?.left ?? 0,
      horizontal: config?.horizontal,
      vertical: config?.vertical,
      gap: config?.gap ?? '20px',
      ...config
    }
  }
  
  /**
   * 格式化间距为CSS值
   */
  static formatSpacing(spacing: SpacingConfig | string | number): string {
    if (typeof spacing === 'string') return spacing
    if (typeof spacing === 'number') return `${spacing}px`
    
    const { top, right, bottom, left, horizontal, vertical, gap } = spacing
    
    if (top !== undefined || right !== undefined || bottom !== undefined || left !== undefined) {
      const t = this.formatValue(top)
      const r = this.formatValue(right ?? top)
      const b = this.formatValue(bottom ?? top)
      const l = this.formatValue(left ?? right ?? top)
      return `${t} ${r} ${b} ${l}`
    }
    
    if (vertical !== undefined || horizontal !== undefined) {
      const v = this.formatValue(vertical)
      const h = this.formatValue(horizontal)
      return `${v} ${h}`
    }
    
    if (gap !== undefined) {
      return this.formatValue(gap)
    }
    
    return '0'
  }
  
  /**
   * 格式化值为CSS值
   */
  static formatValue(value: string | number | undefined): string {
    if (value === undefined) return '0'
    if (typeof value === 'string') return value
    return `${value}px`
  }
  
  /**
   * 应用主题到CSS变量
   */
  static applyThemeToCSS(theme: ColorTheme, element?: HTMLElement): void {
    const root = element || document.documentElement
    
    // CSS变量名映射（匹配global.css中的变量名）
    const cssVarMap: Record<string, string> = {
      primary: '--primary-color',
      secondary: '--secondary-color',
      accent: '--accent-color',
      success: '--success-color',
      warning: '--warning-color',
      danger: '--danger-color',
      dark: '--dark-color',
      light: '--light-color',
      gray: '--gray-color',
      border: '--border-color',
      background: '--background-color',
      text: '--text-color'
    }
    
    Object.entries(theme).forEach(([key, value]) => {
      if (value) {
        // 使用映射的变量名，如果没有映射则使用默认转换
        const cssVar = cssVarMap[key] || `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`
        root.style.setProperty(cssVar, value)
      }
    })
  }
  
  /**
   * 生成模块样式对象
   */
  static generateModuleStyles(config: ModuleStyleConfig): Record<string, any> {
    const styles: Record<string, any> = {}
    
    // 背景色
    if (config.backgroundColor) {
      styles.backgroundColor = config.backgroundColor
    }
    
    // 内边距
    if (config.padding) {
      styles.padding = this.formatSpacing(config.padding)
    }
    
    // 外边距
    if (config.margin) {
      styles.margin = this.formatSpacing(config.margin)
    }
    
    // 边框
    if (config.border) {
      styles.border = config.border
    }
    
    // 圆角
    if (config.borderRadius) {
      styles.borderRadius = config.borderRadius
    }
    
    // 阴影
    if (config.boxShadow) {
      styles.boxShadow = config.boxShadow
    }
    
    // 字体样式
    if (config.font) {
      const font = config.font
      if (font.family) styles.fontFamily = font.family
      if (font.size) styles.fontSize = font.size
      if (font.weight) styles.fontWeight = font.weight
      if (font.color) styles.color = font.color
      if (font.lineHeight) styles.lineHeight = font.lineHeight
      if (font.letterSpacing) styles.letterSpacing = font.letterSpacing
    }
    
    // 布局
    if (config.layout) {
      const layout = config.layout
      if (layout.type === 'grid') {
        styles.display = 'grid'
        if (layout.columns) {
          styles.gridTemplateColumns = `repeat(${layout.columns}, 1fr)`
        }
        if (layout.gap) {
          styles.gap = this.formatValue(layout.gap)
        }
      } else if (layout.type === 'flex') {
        styles.display = 'flex'
        if (layout.direction) {
          styles.flexDirection = layout.direction
        }
        if (layout.justify) {
          styles.justifyContent = layout.justify
        }
        if (layout.align) {
          styles.alignItems = layout.align
        }
        if (layout.gap) {
          styles.gap = this.formatValue(layout.gap)
        }
        if (layout.wrap !== undefined) {
          styles.flexWrap = layout.wrap ? 'wrap' : 'nowrap'
        }
      }
    }
    
    return styles
  }
  
  /**
   * 合并主题配置
   */
  static mergeTheme(base: ColorTheme, override: Partial<ColorTheme>): ColorTheme {
    return { ...base, ...override }
  }
  
  /**
   * 获取主题CSS变量名
   */
  static getThemeCSSVarName(key: keyof ColorTheme): string {
    return `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`
  }
}

