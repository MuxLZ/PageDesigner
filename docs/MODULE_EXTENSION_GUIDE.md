# 模块扩展指南

本指南将帮助您了解如何向页面设计器添加新的自定义模块。

## 📋 目录

1. [概述](#概述)
2. [快速开始](#快速开始)
3. [详细步骤](#详细步骤)
4. [模块组件开发规范](#模块组件开发规范)
5. [配置类型定义](#配置类型定义)
6. [模块注册流程](#模块注册流程)
7. [示例：创建自定义模块](#示例创建自定义模块)
8. [常见问题](#常见问题)

## 概述

页面设计器采用模块化架构，每个模块都是独立的 Vue 组件，可以通过配置进行自定义。要添加新模块，需要完成以下步骤：

1. **定义模块类型** - 在类型系统中添加新模块类型
2. **创建模块组件** - 开发 Vue 组件实现模块 UI
3. **注册模块** - 在系统中注册模块组件
4. **添加默认配置** - 为模块提供默认配置生成器
5. **配置编辑器** - 在设计器中添加模块配置界面

## 快速开始

### 方法一：使用模块导入功能（推荐）

1. 在页面设计器中，点击"模块库" → "导入模块"
2. 选择或上传模块配置文件（JSON 格式）
3. 系统会自动验证并注册模块

### 方法二：手动添加（开发者）

按照以下步骤手动添加模块：

## 详细步骤

### 步骤 1: 定义模块类型

在 `src/types/module.ts` 中添加新的模块类型：

```typescript
// 在 ModuleType 枚举中添加
export enum ModuleType {
  // ... 现有类型
  MY_CUSTOM_MODULE = 'my-custom-module',  // 新模块类型
}

// 定义模块配置接口
export interface MyCustomModuleConfig extends BaseModuleConfig {
  type: ModuleType.MY_CUSTOM_MODULE
  // 添加模块特定的配置项
  title?: string
  content?: string
  image?: string
  // ... 其他配置
}
```

### 步骤 2: 更新模块辅助工具

在 `src/utils/moduleHelper.ts` 中添加映射：

```typescript
// 添加分类映射
export const moduleCategoryMap: Record<ModuleType, ModuleCategory> = {
  // ... 现有映射
  [ModuleType.MY_CUSTOM_MODULE]: ModuleCategory.CONTENT,  // 选择合适的分类
}

// 添加显示名称
export const moduleNames: Record<ModuleType, string> = {
  // ... 现有名称
  [ModuleType.MY_CUSTOM_MODULE]: '我的自定义模块',
}

// 添加图标（Element Plus 图标名称）
export const moduleIcons: Record<ModuleType, string> = {
  // ... 现有图标
  [ModuleType.MY_CUSTOM_MODULE]: 'Box',  // 使用 Element Plus 图标
}
```

### 步骤 3: 创建模块组件

在 `src/components/modules/` 目录下创建模块组件：

```vue
<!-- MyCustomModule.vue -->
<template>
  <BaseModuleWrapper :module-config="config">
    <div class="my-custom-module">
      <h2>{{ config.title }}</h2>
      <p>{{ config.content }}</p>
      <img v-if="config.image" :src="config.image" alt="" />
    </div>
  </BaseModuleWrapper>
</template>

<script setup lang="ts">
import type { MyCustomModuleConfig } from '@/types/module'
import BaseModuleWrapper from './BaseModuleWrapper.vue'

interface Props {
  config: MyCustomModuleConfig
  isDesigner?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isDesigner: false
})
</script>

<style scoped>
.my-custom-module {
  padding: 40px;
  text-align: center;
}
</style>
```

### 步骤 4: 注册模块组件

在 `src/core/PageRenderer.vue` 中注册模块：

```typescript
// 导入模块组件
import MyCustomModule from '@/components/modules/MyCustomModule.vue'

// 在 moduleComponentMap 中添加
const moduleComponentMap = new Map<ModuleType, any>([
  // ... 现有映射
  [ModuleType.MY_CUSTOM_MODULE, MyCustomModule],
])
```

### 步骤 5: 添加默认配置生成器

在 `src/core/ConfigGenerator.ts` 中添加：

```typescript
static generateDefaultModuleConfig(type: ModuleType, name: string): Partial<ModuleConfig> {
  const base = {
    id: `module-${type}-${Date.now()}`,
    type,
    name,
    visible: true,
    order: 0
  }
  
  switch (type) {
    // ... 现有 case
    case ModuleType.MY_CUSTOM_MODULE:
      return {
        ...base,
        title: '自定义模块标题',
        content: '这是自定义模块的内容',
        image: 'https://picsum.photos/800/400?random=1'
      }
  }
}
```

### 步骤 6: 添加配置编辑器

在 `src/views/Designer.vue` 中添加模块配置界面：

```vue
<!-- 在模块配置区域添加 -->
<div v-if="selectedModule.type === 'my-custom-module'" class="module-config-content">
  <el-form label-width="100px" size="small">
    <el-form-item label="标题">
      <el-input v-model="(selectedModule as any).title" />
    </el-form-item>
    <el-form-item label="内容">
      <el-input v-model="(selectedModule as any).content" type="textarea" :rows="4" />
    </el-form-item>
    <el-form-item label="图片">
      <el-input v-model="(selectedModule as any).image" placeholder="图片URL" />
    </el-form-item>
  </el-form>
</div>
```

## 模块组件开发规范

### 1. 组件结构

每个模块组件应该：

- 继承 `BaseModuleWrapper` 组件
- 接收 `config` 和 `isDesigner` 两个 props
- 使用 scoped 样式

### 2. Props 接口

```typescript
interface Props {
  config: YourModuleConfig  // 模块配置对象
  isDesigner?: boolean       // 是否在设计器模式下
}
```

### 3. BaseModuleWrapper

`BaseModuleWrapper` 提供了：
- 模块间距控制
- 动画效果应用
- 响应式布局支持

### 4. 样式配置

模块可以通过 `config.style` 访问样式配置：
- `backgroundColor` - 背景色
- `padding` - 内边距
- `margin` - 外边距
- `font` - 字体配置

## 配置类型定义

### 基础模块配置

所有模块都继承自 `BaseModuleConfig`：

```typescript
interface BaseModuleConfig {
  id: string              // 模块唯一ID
  type: ModuleType        // 模块类型
  name: string           // 模块名称
  visible: boolean       // 是否显示
  order: number         // 排序
  style?: ModuleStyleConfig  // 样式配置
  effect?: EffectConfig     // 动画效果
  data?: any             // 模块数据
}
```

### 样式配置

```typescript
interface ModuleStyleConfig {
  backgroundColor?: string
  padding?: SpacingConfig
  margin?: SpacingConfig
  border?: string
  borderRadius?: string
  boxShadow?: string
  font?: FontConfig
  layout?: LayoutConfig
}
```

## 模块注册流程

系统会自动识别以下位置的模块：

1. **类型定义** (`src/types/module.ts`) - 模块类型和配置接口
2. **辅助工具** (`src/utils/moduleHelper.ts`) - 模块元数据
3. **组件文件** (`src/components/modules/*.vue`) - 模块组件
4. **组件注册** (`src/core/PageRenderer.vue`) - 组件映射
5. **配置生成** (`src/core/ConfigGenerator.ts`) - 默认配置
6. **配置编辑** (`src/views/Designer.vue`) - 属性编辑界面

## 示例：创建自定义模块

### 示例：创建一个"视频播放器"模块

#### 1. 类型定义

```typescript
// src/types/module.ts
export enum ModuleType {
  VIDEO_PLAYER = 'video-player',
}

export interface VideoPlayerConfig extends BaseModuleConfig {
  type: ModuleType.VIDEO_PLAYER
  videoUrl?: string
  poster?: string
  autoplay?: boolean
  controls?: boolean
}
```

#### 2. 模块组件

```vue
<!-- src/components/modules/VideoPlayerModule.vue -->
<template>
  <BaseModuleWrapper :module-config="config">
    <div class="video-player-module">
      <video
        :src="config.videoUrl"
        :poster="config.poster"
        :autoplay="config.autoplay"
        :controls="config.controls"
        class="video"
      ></video>
    </div>
  </BaseModuleWrapper>
</template>

<script setup lang="ts">
import type { VideoPlayerConfig } from '@/types/module'
import BaseModuleWrapper from './BaseModuleWrapper.vue'

interface Props {
  config: VideoPlayerConfig
  isDesigner?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isDesigner: false
})
</script>

<style scoped>
.video-player-module {
  width: 100%;
}

.video {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: block;
}
</style>
```

#### 3. 注册和配置

按照上述步骤在相应文件中注册模块。

## 常见问题

### Q: 如何添加自定义动画效果？

A: 在 `src/types/module.ts` 的 `EffectType` 枚举中添加新类型，然后在 `src/core/EffectSystem.ts` 中实现效果逻辑。

### Q: 模块组件如何访问全局样式？

A: 通过 CSS 变量访问全局主题色，例如 `var(--primary-color)`。

### Q: 如何让模块支持响应式布局？

A: 在 `config.style.layout` 中配置布局选项，使用 CSS Grid 或 Flexbox。

### Q: 模块可以嵌套其他模块吗？

A: 目前不支持模块嵌套，但可以通过在模块内部渲染子组件来实现类似效果。

### Q: 如何导出模块配置供其他项目使用？

A: 使用设计器的"导出配置"功能，可以导出包含模块配置的 JSON 文件。

## 模块导入/导出格式

### 模块配置 JSON 格式

```json
{
  "moduleType": "my-custom-module",
  "moduleName": "我的自定义模块",
  "moduleCategory": "content",
  "moduleIcon": "Box",
  "defaultConfig": {
    "title": "默认标题",
    "content": "默认内容"
  },
  "componentPath": "@/components/modules/MyCustomModule.vue",
  "version": "1.0.0"
}
```

## 技术支持

如有问题，请查看：
- 项目文档：`/docs`
- 示例模块：`src/components/modules/`
- 类型定义：`src/types/module.ts`

---

**提示**：建议在开发新模块前，先参考现有模块的实现方式，保持代码风格一致。

