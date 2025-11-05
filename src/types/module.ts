/**
 * 模块化系统类型定义
 */

// 模块类型枚举
export enum ModuleType {
  CAROUSEL = 'carousel',           // 轮播
  GRID = 'grid',                   // 宫格
  COLUMN = 'column',               // 分栏
  TIMELINE = 'timeline',           // 时间轴
  HEADER = 'header',               // 导航栏
  FOOTER = 'footer',               // 页脚
  STATS = 'stats',                 // 数据统计
  PRODUCTS = 'products',           // 产品展示
  NEWS = 'news',                   // 新闻资讯
  PARTNERS = 'partners',           // 合作伙伴
  CONTACT = 'contact',             // 联系我们
  ABOUT = 'about',                 // 公司简介
  TEAM = 'team',                   // 团队介绍
  HONORS = 'honors',               // 资质荣誉
  CULTURE = 'culture',             // 企业文化
  SOLUTIONS = 'solutions'          // 解决方案
}

// 动画效果类型
export enum EffectType {
  FADE = 'fade',                   // 淡入淡出
  SLIDE = 'slide',                 // 滑动
  ZOOM = 'zoom',                   // 缩放
  ROTATE = 'rotate',               // 旋转
  BOUNCE = 'bounce',               // 弹跳
  FLIP = 'flip'                    // 翻转
}

// 动画方向
export enum EffectDirection {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right',
  CENTER = 'center'
}

// 动画效果配置
export interface EffectConfig {
  type: EffectType
  direction?: EffectDirection
  duration?: number                // 持续时间（ms）
  delay?: number                   // 延迟（ms）
  easing?: string                  // 缓动函数
  enabled?: boolean                // 是否启用
}

// 组合效果（多个效果组合）
export interface CombinedEffect {
  effects: EffectConfig[]
  sequence?: 'parallel' | 'sequence' // 并行或顺序执行
}

// 字体配置
export interface FontConfig {
  family?: string                  // 字体族
  size?: string                    // 字体大小
  weight?: string | number         // 字体粗细
  color?: string                   // 字体颜色
  lineHeight?: string              // 行高
  letterSpacing?: string           // 字间距
}

// 间距配置
export interface SpacingConfig {
  top?: string | number            // 上间距
  right?: string | number          // 右间距
  bottom?: string | number         // 下间距
  left?: string | number          // 左间距
  horizontal?: string | number     // 水平间距
  vertical?: string | number       // 垂直间距
  gap?: string | number            // 模块间距
}

// 颜色主题配置
export interface ColorTheme {
  primary?: string                 // 主色
  secondary?: string               // 次色
  accent?: string                  // 强调色
  success?: string                 // 成功色
  warning?: string                 // 警告色
  danger?: string                  // 危险色
  dark?: string                    // 深色
  light?: string                   // 浅色
  gray?: string                    // 灰色
  border?: string                  // 边框色
  background?: string              // 背景色
  text?: string                    // 文字色
}

// 布局配置
export interface LayoutConfig {
  type?: 'grid' | 'flex' | 'block' // 布局类型
  columns?: number                 // 列数（grid布局）
  gap?: string | number             // 间距
  align?: 'left' | 'center' | 'right' | 'justify' // 对齐方式
  justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around' // 主轴对齐
  direction?: 'row' | 'column'    // 方向（flex布局）
  wrap?: boolean                    // 是否换行
}

// 响应式配置
export interface ResponsiveConfig {
  mobile?: any                      // 移动端配置
  tablet?: any                      // 平板配置
  desktop?: any                     // 桌面端配置
}

// 模块样式配置
export interface ModuleStyleConfig {
  backgroundColor?: string          // 背景色
  padding?: SpacingConfig          // 内边距
  margin?: SpacingConfig           // 外边距
  border?: string                  // 边框
  borderRadius?: string            // 圆角
  boxShadow?: string              // 阴影
  font?: FontConfig               // 字体配置
  layout?: LayoutConfig           // 布局配置
  responsive?: ResponsiveConfig   // 响应式配置
}

// 模块基础配置
export interface BaseModuleConfig {
  id: string                       // 模块唯一ID
  type: ModuleType                 // 模块类型
  name: string                     // 模块名称
  visible: boolean                 // 是否显示
  order: number                    // 排序
  style?: ModuleStyleConfig        // 样式配置
  effect?: EffectConfig | CombinedEffect // 动画效果
  data?: any                       // 模块数据
}

// 导航栏配置
export interface HeaderConfig extends BaseModuleConfig {
  type: ModuleType.HEADER
  logo?: {
    image?: string
    text?: string
    link?: string
  }
  menu?: {
    items: Array<{
      label: string
      link: string
      children?: Array<{ label: string; link: string }>
    }>
    layout?: 'horizontal' | 'vertical' // 布局方式
    textColor?: string
    activeColor?: string
    hoverColor?: string
  }
  topBar?: {
    visible: boolean
    backgroundColor?: string
    textColor?: string
    items?: Array<{ icon?: string; text: string }>
  }
  backgroundColor?: string
  fixed?: boolean                  // 是否固定
  transparent?: boolean           // 是否透明
}

// 轮播配置
export interface CarouselConfig extends BaseModuleConfig {
  type: ModuleType.CAROUSEL
  slides: Array<{
    image?: string
    background?: string
    title?: string
    subtitle?: string
    content?: string
    buttons?: Array<{
      text: string
      link?: string
      type?: 'primary' | 'secondary'
    }>
  }>
  autoplay?: boolean
  interval?: number                // 自动播放间隔（ms）
  height?: string                  // 高度
  indicator?: boolean              // 是否显示指示器
  arrows?: boolean                 // 是否显示箭头
  effect?: 'slide' | 'fade' | 'cube' | 'coverflow' // 切换效果
}

// 宫格配置
export interface GridConfig extends BaseModuleConfig {
  type: ModuleType.GRID
  columns?: number                 // 列数
  items: Array<{
    image?: string
    title?: string
    description?: string
    link?: string
    icon?: string
    [key: string]: any
  }>
  layout?: 'grid' | 'masonry'      // 布局方式
  gap?: string | number
}

// 分栏配置
export interface ColumnConfig extends BaseModuleConfig {
  type: ModuleType.COLUMN
  columns: number                  // 栏数
  items: Array<{
    title?: string
    content?: string
    image?: string
    [key: string]: any
  }>
  layout?: 'left-image' | 'right-image' | 'alternate' // 布局方式
  gap?: string | number
}

// 时间轴配置
export interface TimelineConfig extends BaseModuleConfig {
  type: ModuleType.TIMELINE
  items: Array<{
    year?: string
    title: string
    description?: string
    icon?: string
    [key: string]: any
  }>
  layout?: 'vertical' | 'horizontal' | 'alternate' // 布局方式
  lineColor?: string
  markerColor?: string
}

// 页脚配置
export interface FooterConfig extends BaseModuleConfig {
  type: ModuleType.FOOTER
  sections?: Array<{
    title?: string
    links?: Array<{ text: string; link: string }>
    content?: string
  }>
  copyright?: string
  socialLinks?: Array<{
    icon: string
    link: string
  }>
  backgroundColor?: string
  textColor?: string
}

// 数据统计配置
export interface StatsConfig extends BaseModuleConfig {
  type: ModuleType.STATS
  items: Array<{
    number: string
    label: string
    suffix?: string
    prefix?: string
    icon?: string
  }>
  columns?: number
  backgroundColor?: string
  textColor?: string
}

// 产品展示配置
export interface ProductsConfig extends BaseModuleConfig {
  type: ModuleType.PRODUCTS
  title?: string
  subtitle?: string
  items: Array<{
    name: string
    description?: string
    image?: string
    features?: string[]
    link?: string
    [key: string]: any
  }>
  columns?: number
  showMore?: boolean
  moreLink?: string
}

// 新闻资讯配置
export interface NewsConfig extends BaseModuleConfig {
  type: ModuleType.NEWS
  title?: string
  subtitle?: string
  items: Array<{
    title: string
    excerpt?: string
    image?: string
    date?: string
    category?: string
    author?: string
    link?: string
    [key: string]: any
  }>
  columns?: number
  showMore?: boolean
  moreLink?: string
}

// 合作伙伴配置
export interface PartnersConfig extends BaseModuleConfig {
  type: ModuleType.PARTNERS
  title?: string
  subtitle?: string
  items: Array<{
    name: string
    logo: string
    link?: string
  }>
  columns?: number
  grayscale?: boolean              // 是否灰度显示
  hoverEffect?: boolean             // 是否悬停效果
}

// 联系我们配置
export interface ContactConfig extends BaseModuleConfig {
  type: ModuleType.CONTACT
  title?: string
  subtitle?: string
  buttons?: Array<{
    text: string
    link?: string
    type?: 'primary' | 'secondary'
    icon?: string
  }>
  backgroundColor?: string
  textColor?: string
}

// 公司简介配置
export interface AboutConfig extends BaseModuleConfig {
  type: ModuleType.ABOUT
  title?: string
  subtitle?: string
  content?: string
  image?: string
  features?: Array<{
    icon?: string
    title: string
    description?: string
  }>
  layout?: 'left-image' | 'right-image'
}

// 团队介绍配置
export interface TeamConfig extends BaseModuleConfig {
  type: ModuleType.TEAM
  title?: string
  subtitle?: string
  items: Array<{
    name: string
    position?: string
    bio?: string
    avatar?: string
    [key: string]: any
  }>
  columns?: number
}

// 资质荣誉配置
export interface HonorsConfig extends BaseModuleConfig {
  type: ModuleType.HONORS
  title?: string
  subtitle?: string
  items: Array<{
    title: string
    image?: string
    [key: string]: any
  }>
  columns?: number
}

// 企业文化配置
export interface CultureConfig extends BaseModuleConfig {
  type: ModuleType.CULTURE
  title?: string
  subtitle?: string
  content?: string
  image?: string
  items?: Array<{
    title: string
    description?: string
  }>
  layout?: 'left-image' | 'right-image'
}

// 解决方案配置
export interface SolutionsConfig extends BaseModuleConfig {
  type: ModuleType.SOLUTIONS
  title?: string
  subtitle?: string
  tabs?: Array<{
    name: string
    title?: string
    description?: string
    benefits?: string[]
    image?: string
    [key: string]: any
  }>
  activeTab?: string
}

// 模块配置联合类型
export type ModuleConfig =
  | HeaderConfig
  | FooterConfig
  | CarouselConfig
  | GridConfig
  | ColumnConfig
  | TimelineConfig
  | StatsConfig
  | ProductsConfig
  | NewsConfig
  | PartnersConfig
  | ContactConfig
  | AboutConfig
  | TeamConfig
  | HonorsConfig
  | CultureConfig
  | SolutionsConfig

// 页面配置
export interface PageConfig {
  id: string
  name: string
  route: string
  modules: ModuleConfig[]
  globalStyle?: {
    theme?: ColorTheme
    font?: FontConfig
    spacing?: SpacingConfig
  }
  meta?: {
    title?: string
    description?: string
    keywords?: string
  }
}

// 网站配置
export interface SiteConfig {
  pages: PageConfig[]
  globalSettings?: {
    theme?: ColorTheme
    font?: FontConfig
    spacing?: SpacingConfig
  }
}

