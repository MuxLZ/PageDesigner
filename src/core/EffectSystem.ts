/**
 * 动画效果系统
 */
import type { EffectConfig, EffectType, EffectDirection, CombinedEffect } from '@/types/module'

export class EffectSystem {
  /**
   * 创建单个效果
   */
  static createEffect(
    type: EffectType,
    options?: {
      direction?: EffectDirection
      duration?: number
      delay?: number
      easing?: string
      enabled?: boolean
    }
  ): EffectConfig {
    return {
      type,
      direction: options?.direction,
      duration: options?.duration ?? 600,
      delay: options?.delay ?? 0,
      easing: options?.easing ?? 'ease-in-out',
      enabled: options?.enabled ?? true
    }
  }
  
  /**
   * 创建组合效果
   */
  static createCombinedEffect(
    effects: EffectConfig[],
    sequence: 'parallel' | 'sequence' = 'parallel'
  ): CombinedEffect {
    return {
      effects,
      sequence
    }
  }
  
  /**
   * 创建淡入淡出效果
   */
  static fade(duration = 600, delay = 0): EffectConfig {
    return this.createEffect(EffectType.FADE, { duration, delay })
  }
  
  /**
   * 创建缩放效果
   */
  static zoom(duration = 600, delay = 0): EffectConfig {
    return this.createEffect(EffectType.ZOOM, { duration, delay })
  }
  
  /**
   * 创建旋转效果
   */
  static rotate(duration = 600, delay = 0): EffectConfig {
    return this.createEffect(EffectType.ROTATE, { duration, delay })
  }
  
  /**
   * 创建弹跳效果
   */
  static bounce(duration = 600, delay = 0): EffectConfig {
    return this.createEffect(EffectType.BOUNCE, { duration, delay })
  }
  
  /**
   * 创建翻转效果
   */
  static flip(direction: EffectDirection = EffectDirection.UP, duration = 600, delay = 0): EffectConfig {
    return this.createEffect(EffectType.FLIP, { direction, duration, delay })
  }
  
  /**
   * 组合多个效果（并行）
   */
  static combine(...effects: EffectConfig[]): CombinedEffect {
    return this.createCombinedEffect(effects, 'parallel')
  }
  
  /**
   * 组合多个效果（顺序）
   */
  static sequence(...effects: EffectConfig[]): CombinedEffect {
    return this.createCombinedEffect(effects, 'sequence')
  }
  
  /**
   * 创建常用组合效果
   */
  static fadeInZoom(duration = 600, delay = 0): CombinedEffect {
    return this.combine(
      this.fade(duration, delay),
      this.zoom(duration, delay)
    )
  }

  static zoomRotate(duration = 600, delay = 0): CombinedEffect {
    return this.combine(
      this.zoom(duration, delay),
      this.rotate(duration, delay)
    )
  }
  
  /**
   * 获取效果的CSS类名
   */
  static getEffectClasses(effect: EffectConfig | CombinedEffect): string[] {
    const classes: string[] = []
    
    if ('effects' in effect) {
      // 组合效果
      effect.effects.forEach(e => {
        if (e.enabled !== false) {
          classes.push(`effect-${e.type}`)
          if (e.direction) {
            classes.push(`effect-${e.type}-${e.direction}`)
          }
        }
      })
    } else {
      // 单个效果
      if (effect.enabled !== false) {
        classes.push(`effect-${effect.type}`)
        if (effect.direction) {
          classes.push(`effect-${effect.type}-${effect.direction}`)
        }
      }
    }
    
    return classes
  }
  
  /**
   * 获取效果的CSS样式
   */
  static getEffectStyles(effect: EffectConfig | CombinedEffect): Record<string, any> {
    const styles: Record<string, any> = {}
    
    if ('effects' in effect) {
      // 组合效果
      effect.effects.forEach(e => {
        if (e.enabled !== false) {
          if (e.duration) {
            styles.transitionDuration = `${e.duration}ms`
          }
          if (e.delay) {
            styles.transitionDelay = `${e.delay}ms`
          }
          if (e.easing) {
            styles.transitionTimingFunction = e.easing
          }
        }
      })
    } else {
      // 单个效果
      if (effect.enabled !== false) {
        if (effect.duration) {
          styles.transitionDuration = `${effect.duration}ms`
        }
        if (effect.delay) {
          styles.transitionDelay = `${effect.delay}ms`
        }
        if (effect.easing) {
          styles.transitionTimingFunction = effect.easing
        }
      }
    }
    
    return styles
  }
}

