# 模块化页面设计系统架构文档

## 系统概述

这是一个基于Vue 3 + TypeScript的低代码页面设计系统，通过模块化架构实现了页面的可视化配置和快速搭建。

## 架构设计

### 1. 核心架构层次

```
┌─────────────────────────────────────┐
│     管理后台界面 (Designer.vue)      │
│  - 可视化配置                       │
│  - 拖拽排序                         │
│  - 实时预览                         │
└─────────────────────────────────────┘
           ↓
┌─────────────────────────────────────┐
│     页面渲染器 (PageRenderer.vue)    │
│  - 模块组件映射                     │
│  - 配置解析                         │
│  - 样式应用                         │
└─────────────────────────────────────┘
           ↓
┌─────────────────────────────────────┐
│     模块组件层                       │
│  - HeaderModule                    │
│  - CarouselModule                  │
│  - GridModule                      │
│  - StatsModule                     │
│  - TimelineModule                  │
│  - ColumnModule                    │
│  - FooterModule                    │
└─────────────────────────────────────┘
           ↓
┌─────────────────────────────────────┐
│     基础支撑层                       │
│  - BaseModuleWrapper                │
│  - 样式系统 (StyleSystem)           │
│  - 效果系统 (EffectSystem)           │
│  - 配置生成器 (ConfigGenerator)      │
│  - 模块注册 (ModuleRegistry)         │
└─────────────────────────────────────┘
```

### 2. 目录结构

```
src/
├── types/
│   └── module.ts                    # 类型定义
├── core/
│   ├── BaseModule.ts               # 模块基类
│   ├── EffectSystem.ts              # 效果系统
│   ├── StyleSystem.ts               # 样式系统
│   ├── ConfigGenerator.ts           # 配置生成器
│   ├── ModuleRegistry.ts            # 模块注册
│   ├── PageRenderer.vue             # 页面渲染器
│   └── PageRenderer.ts              # 渲染器类型定义
├── components/
│   └── modules/
│       ├── BaseModuleWrapper.vue    # 模块包装器
│       ├── HeaderModule.vue         # 导航栏模块
│       ├── FooterModule.vue         # 页脚模块
│       ├── CarouselModule.vue       # 轮播模块
│       ├── GridModule.vue           # 宫格模块
│       ├── StatsModule.vue          # 统计模块
│       ├── TimelineModule.vue       # 时间轴模块
│       ├── ColumnModule.vue         # 分栏模块
│       └── index.ts                 # 模块导出
├── views/
│   └── Designer.vue                 # 设计器界面
└── assets/
    └── styles/
        ├── global.css               # 全局样式
        └── effects.css               # 动画效果样式
```

## 核心模块说明

### 1. 类型系统 (`types/module.ts`)

定义了所有模块、配置、效果的TypeScript类型：

- **ModuleType**: 模块类型枚举
- **EffectType**: 动画效果类型枚举
- **ModuleConfig**: 模块配置联合类型
- **PageConfig**: 页面配置接口
- **SiteConfig**: 网站配置接口

### 2. 样式系统 (`core/StyleSystem.ts`)

负责样式配置和应用：

- **createDefaultTheme()**: 创建默认主题
- **createFontConfig()**: 创建字体配置
- **createSpacingConfig()**: 创建间距配置
- **applyThemeToCSS()**: 应用主题到CSS变量
- **generateModuleStyles()**: 生成模块样式对象

### 3. 效果系统 (`core/EffectSystem.ts`)

管理动画效果：

- **createEffect()**: 创建单个效果
- **createCombinedEffect()**: 创建组合效果
- **fade()**, **slide()**, **zoom()** 等：快捷创建方法
- **combine()**, **sequence()**: 组合多个效果
- **getEffectClasses()**: 获取效果CSS类名
- **getEffectStyles()**: 获取效果CSS样式

### 4. 配置生成器 (`core/ConfigGenerator.ts`)

生成和验证配置：

- **generateDefaultPageConfig()**: 生成默认页面配置
- **generateDefaultModuleConfig()**: 生成默认模块配置
- **validateModuleConfig()**: 验证模块配置
- **sortModules()**: 排序模块
- **filterVisibleModules()**: 过滤可见模块
- **exportConfig()**: 导出配置为JSON
- **importConfig()**: 从JSON导入配置

### 5. 模块注册系统 (`core/ModuleRegistry.ts`)

管理模块注册和查找：

- **registerModule()**: 注册模块类
- **registerComponent()**: 注册模块组件
- **getModuleClass()**: 获取模块类
- **getComponent()**: 获取模块组件
- **createModule()**: 创建模块实例

### 6. 页面渲染器 (`core/PageRenderer.vue`)

渲染页面和模块：

- 模块组件映射
- 配置解析和应用
- 样式和效果应用
- 模块排序和过滤

## 模块组件设计

### BaseModuleWrapper

所有模块的基础包装器，提供：
- 样式配置应用
- 动画效果应用
- 可见性控制

### 具体模块组件

每个模块组件都：
- 接收对应的配置类型
- 使用BaseModuleWrapper包装
- 实现模块特定的渲染逻辑
- 支持模块特定的配置项

## 数据流

```
用户操作 → Designer.vue
    ↓
更新配置 → PageConfig
    ↓
配置解析 → PageRenderer.vue
    ↓
模块渲染 → 各Module组件
    ↓
样式/效果应用 → BaseModuleWrapper
    ↓
页面展示
```

## 扩展指南

### 添加新模块类型

1. **定义类型** (`types/module.ts`)
   ```typescript
   export enum ModuleType {
     NEW_MODULE = 'new_module'
   }
   
   export interface NewModuleConfig extends BaseModuleConfig {
     type: ModuleType.NEW_MODULE
     // 模块特定配置
   }
   ```

2. **创建组件** (`components/modules/NewModule.vue`)
   ```vue
   <template>
     <BaseModuleWrapper :module-config="config">
       <!-- 模块内容 -->
     </BaseModuleWrapper>
   </template>
   
   <script setup lang="ts">
   import type { NewModuleConfig } from '@/types/module'
   import BaseModuleWrapper from './BaseModuleWrapper.vue'
   
   interface Props {
     config: NewModuleConfig
   }
   const props = defineProps<Props>()
   </script>
   ```

3. **注册组件** (`core/PageRenderer.vue`)
   ```typescript
   import NewModule from '@/components/modules/NewModule.vue'
   
   moduleComponentMap.set(ModuleType.NEW_MODULE, NewModule)
   ```

4. **添加默认配置** (`core/ConfigGenerator.ts`)
   ```typescript
   case ModuleType.NEW_MODULE:
     return {
       ...base,
       // 默认配置
     }
   ```

### 添加新动画效果

1. **定义类型** (`types/module.ts`)
   ```typescript
   export enum EffectType {
     NEW_EFFECT = 'new_effect'
   }
   ```

2. **实现效果** (`core/EffectSystem.ts`)
   ```typescript
   static newEffect(duration = 600, delay = 0): EffectConfig {
     return this.createEffect(EffectType.NEW_EFFECT, { duration, delay })
   }
   ```

3. **添加CSS** (`assets/styles/effects.css`)
   ```css
   .effect-new-effect {
     animation: newEffectAnimation 0.6s ease-out forwards;
   }
   
   @keyframes newEffectAnimation {
     /* 动画定义 */
   }
   ```

## 配置结构

### 页面配置示例

```json
{
  "id": "page-1",
  "name": "首页",
  "route": "/",
  "modules": [
    {
      "id": "module-header-1",
      "type": "header",
      "name": "导航栏",
      "visible": true,
      "order": 0,
      "style": {
        "backgroundColor": "#ffffff",
        "padding": { "top": "0", "bottom": "0" },
        "font": {
          "family": "'PingFang SC', sans-serif",
          "size": "16px",
          "color": "#333333"
        }
      },
      "effect": {
        "type": "fade",
        "duration": 600,
        "delay": 0,
        "enabled": true
      },
      "logo": {
        "text": "智造科技"
      },
      "menu": {
        "items": [
          { "label": "首页", "link": "/" },
          { "label": "关于", "link": "/about" }
        ]
      },
      "fixed": true
    }
  ],
  "globalStyle": {
    "theme": {
      "primary": "#1e3a8a",
      "secondary": "#3b82f6",
      "background": "#ffffff"
    }
  }
}
```

## 最佳实践

1. **模块独立性**：每个模块应该是独立的，不依赖其他模块
2. **配置驱动**：模块行为应该由配置决定，而不是硬编码
3. **类型安全**：使用TypeScript确保类型安全
4. **可扩展性**：设计时考虑未来扩展需求
5. **性能优化**：合理使用计算属性和缓存

## 技术栈

- **框架**: Vue 3 + TypeScript
- **UI库**: Element Plus
- **状态管理**: Pinia
- **路由**: Vue Router
- **拖拽**: SortableJS
- **动画**: AOS + 自定义CSS动画

## 未来改进方向

1. 拖拽排序功能完善
2. 更多模块类型支持
3. 响应式配置增强
4. 模板系统
5. 多页面管理
6. 协作功能
7. 版本控制
8. 预览导出功能

