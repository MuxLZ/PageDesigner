/**
 * 模块基类
 */
import { ref, computed, Ref } from 'vue'
import type { BaseModuleConfig, ModuleStyleConfig, EffectConfig, CombinedEffect } from '@/types/module'

export abstract class BaseModule {
  protected config: Ref<BaseModuleConfig>
  
  constructor(config: BaseModuleConfig) {
    this.config = ref(config)
  }
  
  // 获取模块配置
  getConfig(): BaseModuleConfig {
    return this.config.value
  }
  
  // 更新配置
  updateConfig(updates: Partial<BaseModuleConfig>) {
    this.config.value = { ...this.config.value, ...updates }
  }
  
  // 获取样式配置
  getStyleConfig(): ModuleStyleConfig | undefined {
    return this.config.value.style
  }
  
  // 获取计算后的样式
  getComputedStyle(): Record<string, any> {
    const style = this.getStyleConfig()
    if (!style) return {}
    
    const computed: Record<string, any> = {}
    
    // 背景色
    if (style.backgroundColor) {
      computed.backgroundColor = style.backgroundColor
    }
    
    // 内边距
    if (style.padding) {
      const p = style.padding
      computed.padding = this.formatSpacing(p)
    }
    
    // 外边距
    if (style.margin) {
      const m = style.margin
      computed.margin = this.formatSpacing(m)
    }
    
    // 边框
    if (style.border) {
      computed.border = style.border
    }
    
    // 圆角
    if (style.borderRadius) {
      computed.borderRadius = style.borderRadius
    }
    
    // 阴影
    if (style.boxShadow) {
      computed.boxShadow = style.boxShadow
    }
    
    // 字体样式
    if (style.font) {
      const f = style.font
      if (f.family) computed.fontFamily = f.family
      if (f.size) computed.fontSize = f.size
      if (f.weight) computed.fontWeight = f.weight
      if (f.color) computed.color = f.color
      if (f.lineHeight) computed.lineHeight = f.lineHeight
      if (f.letterSpacing) computed.letterSpacing = f.letterSpacing
    }
    
    return computed
  }
  
  // 格式化间距
  protected formatSpacing(spacing: any): string {
    if (typeof spacing === 'string') return spacing
    if (typeof spacing === 'number') return `${spacing}px`
    
    if (typeof spacing === 'object') {
      const { top, right, bottom, left, horizontal, vertical, gap } = spacing
      
      if (top !== undefined || right !== undefined || bottom !== undefined || left !== undefined) {
        const t = this.formatValue(top)
        const r = this.formatValue(right)
        const b = this.formatValue(bottom)
        const l = this.formatValue(left)
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
    }
    
    return '0'
  }
  
  // 格式化值
  protected formatValue(value: string | number | undefined): string {
    if (value === undefined) return '0'
    if (typeof value === 'string') return value
    return `${value}px`
  }
  
  // 获取动画效果类名
  getEffectClasses(): string[] {
    const effect = this.config.value.effect
    if (!effect) return []
    
    const classes: string[] = []
    
    if ('effects' in effect) {
      // 组合效果
      effect.effects.forEach(e => {
        if (e.enabled !== false) {
          classes.push(...this.getEffectClassForConfig(e))
        }
      })
    } else {
      // 单个效果
      if (effect.enabled !== false) {
        classes.push(...this.getEffectClassForConfig(effect))
      }
    }
    
    return classes
  }
  
  // 获取单个效果的类名
  protected getEffectClassForConfig(effect: EffectConfig): string[] {
    const classes: string[] = []
    const { type, direction } = effect
    
    classes.push(`effect-${type}`)
    
    if (direction) {
      classes.push(`effect-${type}-${direction}`)
    }
    
    return classes
  }
  
  // 获取动画效果样式
  getEffectStyles(): Record<string, any> {
    const effect = this.config.value.effect
    if (!effect) return {}
    
    const styles: Record<string, any> = {}
    
    if ('effects' in effect) {
      // 组合效果
      effect.effects.forEach(e => {
        if (e.enabled !== false) {
          Object.assign(styles, this.getEffectStyleForConfig(e))
        }
      })
    } else {
      // 单个效果
      if (effect.enabled !== false) {
        Object.assign(styles, this.getEffectStyleForConfig(effect))
      }
    }
    
    return styles
  }
  
  // 获取单个效果的样式
  protected getEffectStyleForConfig(effect: EffectConfig): Record<string, any> {
    const styles: Record<string, any> = {}
    
    if (effect.duration) {
      styles.transitionDuration = `${effect.duration}ms`
    }
    
    if (effect.delay) {
      styles.transitionDelay = `${effect.delay}ms`
    }
    
    if (effect.easing) {
      styles.transitionTimingFunction = effect.easing
    }
    
    return styles
  }
  
  // 是否可见
  isVisible(): boolean {
    return this.config.value.visible
  }
  
  // 设置可见性
  setVisible(visible: boolean) {
    this.updateConfig({ visible })
  }
  
  // 获取排序
  getOrder(): number {
    return this.config.value.order
  }
  
  // 设置排序
  setOrder(order: number) {
    this.updateConfig({ order })
  }
  
  // 抽象方法：渲染模块
  abstract render(): any
}

