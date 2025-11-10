import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 缓存图标列表，避免重复计算
let cachedIconNames: string[] | null = null

/**
 * 获取所有可用的 Element Plus 图标名称列表（带缓存）
 */
export function getAllIconNames(): string[] {
  if (cachedIconNames === null) {
    cachedIconNames = Object.keys(ElementPlusIconsVue).sort()
  }
  return cachedIconNames
}

/**
 * 检查是否为有效的 Element Plus 图标名称（使用 Set 提高查找性能）
 */
let iconNameSet: Set<string> | null = null
export function isElementIconName(iconName: string): boolean {
  if (iconNameSet === null) {
    iconNameSet = new Set(getAllIconNames())
  }
  return iconNameSet.has(iconName)
}

/**
 * 根据搜索关键词过滤图标名称
 */
export function filterIconsByKeyword(keyword: string): string[] {
  const allIcons = getAllIconNames()
  if (!keyword) {
    return allIcons
  }
  const lowerKeyword = keyword.toLowerCase()
  return allIcons.filter(iconName => 
    iconName.toLowerCase().includes(lowerKeyword)
  )
}

/**
 * 图标分类（可选，用于更好的组织）
 */
export const iconCategories = {
  // 基础操作
  basic: ['Edit', 'Delete', 'Add', 'Remove', 'Check', 'Close', 'Search', 'Refresh', 'Download', 'Upload'],
  // 导航
  navigation: ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Back', 'Right', 'Top', 'Bottom'],
  // 媒体
  media: ['Picture', 'Video', 'Camera', 'Microphone', 'Headset'],
  // 通信
  communication: ['Message', 'Phone', 'Chat', 'Notification', 'Bell'],
  // 用户
  user: ['User', 'Avatar', 'Setting', 'Lock', 'Unlock'],
  // 数据
  data: ['Document', 'Folder', 'Files', 'DataAnalysis', 'TrendCharts'],
  // 界面
  ui: ['Menu', 'Grid', 'List', 'View', 'Hide', 'FullScreen', 'Minus'],
  // 业务
  business: ['Shop', 'ShoppingCart', 'Box', 'Trophy', 'Medal', 'Star', 'Promotion'],
  // 其他
  other: ['Location', 'Time', 'Clock', 'Calendar', 'Connection', 'Link']
}

/**
 * 根据分类获取图标
 */
export function getIconsByCategory(category: keyof typeof iconCategories): string[] {
  return iconCategories[category] || []
}

/**
 * 获取图标所属的分类
 */
export function getIconCategory(iconName: string): string | null {
  for (const [category, icons] of Object.entries(iconCategories)) {
    if (icons.includes(iconName)) {
      return category
    }
  }
  return 'other'
}

