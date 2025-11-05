/**
 * 模块组件导出
 */
import HeaderModule from './HeaderModule.vue'
import FooterModule from './FooterModule.vue'
import CarouselModule from './CarouselModule.vue'
import GridModule from './GridModule.vue'
import StatsModule from './StatsModule.vue'
import TimelineModule from './TimelineModule.vue'
import ColumnModule from './ColumnModule.vue'
import BaseModuleWrapper from './BaseModuleWrapper.vue'

import { ModuleType } from '@/types/module'
import { ModuleRegistry } from '@/core/ModuleRegistry'

// 注册所有模块组件
ModuleRegistry.registerComponent(ModuleType.HEADER, HeaderModule)
ModuleRegistry.registerComponent(ModuleType.FOOTER, FooterModule)
ModuleRegistry.registerComponent(ModuleType.CAROUSEL, CarouselModule)
ModuleRegistry.registerComponent(ModuleType.GRID, GridModule)
ModuleRegistry.registerComponent(ModuleType.STATS, StatsModule)
ModuleRegistry.registerComponent(ModuleType.TIMELINE, TimelineModule)
ModuleRegistry.registerComponent(ModuleType.COLUMN, ColumnModule)

export {
  HeaderModule,
  FooterModule,
  CarouselModule,
  GridModule,
  StatsModule,
  TimelineModule,
  ColumnModule,
  BaseModuleWrapper
}

export default {
  HeaderModule,
  FooterModule,
  CarouselModule,
  GridModule,
  StatsModule,
  TimelineModule,
  ColumnModule,
  BaseModuleWrapper
}

