/**
 * 模块注册系统
 */
import type { ModuleConfig, ModuleType } from '@/types/module'
import { BaseModule } from './BaseModule'

// 模块注册表
const moduleRegistry = new Map<ModuleType, typeof BaseModule>()
const moduleComponents = new Map<ModuleType, any>()

export class ModuleRegistry {
  /**
   * 注册模块类
   */
  static registerModule(type: ModuleType, moduleClass: typeof BaseModule) {
    moduleRegistry.set(type, moduleClass)
  }
  
  /**
   * 注册模块组件
   */
  static registerComponent(type: ModuleType, component: any) {
    moduleComponents.set(type, component)
  }
  
  /**
   * 获取模块类
   */
  static getModuleClass(type: ModuleType): typeof BaseModule | undefined {
    return moduleRegistry.get(type)
  }
  
  /**
   * 获取模块组件
   */
  static getComponent(type: ModuleType): any {
    return moduleComponents.get(type)
  }
  
  /**
   * 创建模块实例
   */
  static createModule(config: ModuleConfig): BaseModule | null {
    const moduleClass = this.getModuleClass(config.type)
    if (!moduleClass) {
      console.warn(`Module type ${config.type} not registered`)
      return null
    }
    
    return new moduleClass(config) as BaseModule
  }
  
  /**
   * 检查模块类型是否已注册
   */
  static isRegistered(type: ModuleType): boolean {
    return moduleRegistry.has(type) && moduleComponents.has(type)
  }
  
  /**
   * 获取所有已注册的模块类型
   */
  static getRegisteredTypes(): ModuleType[] {
    return Array.from(moduleRegistry.keys())
  }
  
  /**
   * 卸载所有模块
   */
  static unregisterAll() {
    moduleRegistry.clear()
    moduleComponents.clear()
  }
}

