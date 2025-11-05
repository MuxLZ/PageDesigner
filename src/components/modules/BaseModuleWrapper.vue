<template>
  <div
    v-if="moduleConfig.visible"
    :class="moduleClasses"
    :style="moduleStyles"
    :data-module-id="moduleConfig.id"
    :data-module-type="moduleConfig.type"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { BaseModuleConfig } from '@/types/module'
import { StyleSystem } from '@/core/StyleSystem'
import { EffectSystem } from '@/core/EffectSystem'

interface Props {
  moduleConfig: BaseModuleConfig
}

const props = defineProps<Props>()

// 模块类名
const moduleClasses = computed(() => {
  const classes = ['module-wrapper', `module-${props.moduleConfig.type}`]
  
  // 添加效果类
  if (props.moduleConfig.effect) {
    classes.push(...EffectSystem.getEffectClasses(props.moduleConfig.effect))
  }
  
  return classes
})

// 模块样式
const moduleStyles = computed(() => {
  const styles: Record<string, any> = {}
  
  // 应用模块样式配置
  if (props.moduleConfig.style) {
    Object.assign(styles, StyleSystem.generateModuleStyles(props.moduleConfig.style))
  }
  
  // 应用效果样式
  if (props.moduleConfig.effect) {
    Object.assign(styles, EffectSystem.getEffectStyles(props.moduleConfig.effect))
  }
  
  return styles
})
</script>

<style scoped>
.module-wrapper {
  position: relative;
  width: 100%;
}
</style>

