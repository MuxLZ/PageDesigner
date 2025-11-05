/**
 * 页面渲染器 - TypeScript版本（用于类型检查）
 */
import type { PageConfig, ModuleConfig } from '@/types/module'
import { ModuleType } from '@/types/module'

// 模块组件映射类型
export type ModuleComponentMap = Map<ModuleType, any>

// 创建默认模块组件映射
export function createModuleComponentMap(): ModuleComponentMap {
  return new Map()
}

// 注册模块组件
export function registerModuleComponent(
  map: ModuleComponentMap,
  type: ModuleType,
  component: any
) {
  map.set(type, component)
}

// 获取模块组件
export function getModuleComponent(
  map: ModuleComponentMap,
  type: ModuleType
): any {
  return map.get(type) || null
}

