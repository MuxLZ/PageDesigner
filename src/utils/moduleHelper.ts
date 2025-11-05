/**
 * 模块辅助工具
 */
import { ModuleType, ModuleCategory } from '@/types/module'

// 模块分类映射
export const moduleCategoryMap: Record<ModuleType, ModuleCategory> = {
  // 布局模块
  [ModuleType.HEADER]: ModuleCategory.LAYOUT,
  [ModuleType.FOOTER]: ModuleCategory.LAYOUT,
  [ModuleType.PAGE_HERO]: ModuleCategory.LAYOUT,
  
  // 内容模块
  [ModuleType.CAROUSEL]: ModuleCategory.CONTENT,
  [ModuleType.COLUMN]: ModuleCategory.CONTENT,
  [ModuleType.GRID]: ModuleCategory.CONTENT,
  [ModuleType.CARD_LIST]: ModuleCategory.CONTENT,
  [ModuleType.FEATURE_LIST]: ModuleCategory.CONTENT,
  [ModuleType.TEXT_IMAGE]: ModuleCategory.CONTENT,
  
  // 业务模块
  [ModuleType.PRODUCTS]: ModuleCategory.BUSINESS,
  [ModuleType.NEWS]: ModuleCategory.BUSINESS,
  [ModuleType.TEAM]: ModuleCategory.BUSINESS,
  [ModuleType.PARTNERS]: ModuleCategory.BUSINESS,
  [ModuleType.HONORS]: ModuleCategory.BUSINESS,
  [ModuleType.SOLUTIONS]: ModuleCategory.BUSINESS,
  [ModuleType.ABOUT]: ModuleCategory.BUSINESS,
  [ModuleType.CULTURE]: ModuleCategory.BUSINESS,
  
  // 交互模块
  [ModuleType.STATS]: ModuleCategory.INTERACTION,
  [ModuleType.TIMELINE]: ModuleCategory.INTERACTION,
  [ModuleType.CONTACT]: ModuleCategory.INTERACTION,
  [ModuleType.CONTACT_FORM]: ModuleCategory.INTERACTION,
  [ModuleType.CTA]: ModuleCategory.INTERACTION
}

// 模块分类显示名称
export const categoryNames: Record<ModuleCategory, string> = {
  [ModuleCategory.LAYOUT]: '布局模块',
  [ModuleCategory.CONTENT]: '内容模块',
  [ModuleCategory.BUSINESS]: '业务模块',
  [ModuleCategory.INTERACTION]: '交互模块'
}

// 模块显示名称
export const moduleNames: Record<ModuleType, string> = {
  // 布局模块
  [ModuleType.HEADER]: '导航栏',
  [ModuleType.FOOTER]: '页脚',
  [ModuleType.PAGE_HERO]: '页面头部',
  
  // 内容模块
  [ModuleType.CAROUSEL]: '轮播图',
  [ModuleType.COLUMN]: '分栏布局',
  [ModuleType.GRID]: '宫格布局',
  [ModuleType.CARD_LIST]: '卡片列表',
  [ModuleType.FEATURE_LIST]: '特性列表',
  [ModuleType.TEXT_IMAGE]: '图文混排',
  
  // 业务模块
  [ModuleType.PRODUCTS]: '产品展示',
  [ModuleType.NEWS]: '新闻资讯',
  [ModuleType.TEAM]: '团队介绍',
  [ModuleType.PARTNERS]: '合作伙伴',
  [ModuleType.HONORS]: '资质荣誉',
  [ModuleType.SOLUTIONS]: '解决方案',
  [ModuleType.ABOUT]: '公司简介',
  [ModuleType.CULTURE]: '企业文化',
  
  // 交互模块
  [ModuleType.STATS]: '数据统计',
  [ModuleType.TIMELINE]: '时间轴',
  [ModuleType.CONTACT]: '联系我们',
  [ModuleType.CONTACT_FORM]: '联系表单',
  [ModuleType.CTA]: '行动号召'
}

// 模块图标映射
export const moduleIcons: Record<ModuleType, string> = {
  // 布局模块
  [ModuleType.HEADER]: 'Menu',
  [ModuleType.FOOTER]: 'Grid',
  [ModuleType.PAGE_HERO]: 'Promotion',
  
  // 内容模块
  [ModuleType.CAROUSEL]: 'Picture',
  [ModuleType.COLUMN]: 'Menu',
  [ModuleType.GRID]: 'Grid',
  [ModuleType.CARD_LIST]: 'Document',
  [ModuleType.FEATURE_LIST]: 'Star',
  [ModuleType.TEXT_IMAGE]: 'PictureRounded',
  
  // 业务模块
  [ModuleType.PRODUCTS]: 'Box',
  [ModuleType.NEWS]: 'Document',
  [ModuleType.TEAM]: 'User',
  [ModuleType.PARTNERS]: 'Connection',
  [ModuleType.HONORS]: 'Trophy',
  [ModuleType.SOLUTIONS]: 'Setting',
  [ModuleType.ABOUT]: 'InfoFilled',
  [ModuleType.CULTURE]: 'Star',
  
  // 交互模块
  [ModuleType.STATS]: 'DataAnalysis',
  [ModuleType.TIMELINE]: 'Clock',
  [ModuleType.CONTACT]: 'Phone',
  [ModuleType.CONTACT_FORM]: 'EditPen',
  [ModuleType.CTA]: 'Bell'
}

// 获取模块分类
export function getModuleCategory(type: ModuleType): ModuleCategory {
  return moduleCategoryMap[type] || ModuleCategory.CONTENT
}

// 获取模块名称
export function getModuleName(type: ModuleType): string {
  return moduleNames[type] || type
}

// 获取模块图标
export function getModuleIcon(type: ModuleType): string {
  return moduleIcons[type] || 'Box'
}

// 按分类获取模块列表
export function getModulesByCategory(category: ModuleCategory): ModuleType[] {
  return Object.entries(moduleCategoryMap)
    .filter(([_, cat]) => cat === category)
    .map(([type]) => type as ModuleType)
}

