/**
 * 模块导入/导出系统
 */
import type { ModuleType, ModuleConfig, ModuleCategory } from '@/types/module'
import { ModuleType as ModuleTypeEnum, ModuleCategory as ModuleCategoryEnum } from '@/types/module'

export interface ModulePackage {
  moduleType: string
  moduleName: string
  moduleCategory: ModuleCategory
  moduleIcon: string
  defaultConfig: Partial<ModuleConfig>
  componentPath?: string
  version: string
  description?: string
  author?: string
}

/**
 * 模块导入器
 */
export class ModuleImporter {
  /**
   * 验证模块包格式
   */
  static validateModulePackage(packageData: any): { valid: boolean; errors: string[] } {
    const errors: string[] = []

    if (!packageData.moduleType) {
      errors.push('缺少 moduleType 字段')
    }

    if (!packageData.moduleName) {
      errors.push('缺少 moduleName 字段')
    }

    if (!packageData.moduleCategory) {
      errors.push('缺少 moduleCategory 字段')
    } else if (!Object.values(ModuleCategoryEnum).includes(packageData.moduleCategory)) {
      errors.push(`无效的 moduleCategory: ${packageData.moduleCategory}`)
    }

    if (!packageData.defaultConfig) {
      errors.push('缺少 defaultConfig 字段')
    }

    if (!packageData.version) {
      errors.push('缺少 version 字段')
    }

    return {
      valid: errors.length === 0,
      errors
    }
  }

  /**
   * 导入模块包
   */
  static async importModulePackage(packageData: ModulePackage): Promise<{
    success: boolean
    message: string
    moduleType?: ModuleType
  }> {
    // 验证格式
    const validation = this.validateModulePackage(packageData)
    if (!validation.valid) {
      return {
        success: false,
        message: `模块包验证失败：${validation.errors.join(', ')}`
      }
    }

    // 检查模块类型是否已存在
    if (Object.values(ModuleTypeEnum).includes(packageData.moduleType as ModuleType)) {
      return {
        success: false,
        message: `模块类型 ${packageData.moduleType} 已存在`
      }
    }

    // 生成导入指南
    const guide = this.generateImportGuide(packageData)

    return {
      success: true,
      message: '模块包验证通过，请按照以下步骤完成导入：',
      moduleType: packageData.moduleType as ModuleType
    }
  }

  /**
   * 生成导入指南
   */
  static generateImportGuide(packageData: ModulePackage): string {
    const steps = [
      `1. 在 src/types/module.ts 的 ModuleType 枚举中添加：${packageData.moduleType}`,
      `2. 创建配置接口扩展 BaseModuleConfig`,
      `3. 在 src/utils/moduleHelper.ts 中添加：`,
      `   - moduleCategoryMap[ModuleType.${packageData.moduleType}] = ModuleCategory.${packageData.moduleCategory}`,
      `   - moduleNames[ModuleType.${packageData.moduleType}] = "${packageData.moduleName}"`,
      `   - moduleIcons[ModuleType.${packageData.moduleType}] = "${packageData.moduleIcon}"`,
      `4. 创建组件文件：${packageData.componentPath || 'src/components/modules/YourModule.vue'}`,
      `5. 在 src/core/PageRenderer.vue 中注册组件`,
      `6. 在 src/core/ConfigGenerator.ts 中添加默认配置生成逻辑`,
      `7. 在 src/views/Designer.vue 中添加配置编辑界面`
    ]

    return steps.join('\n')
  }

  /**
   * 导出模块配置为模块包
   */
  static exportModulePackage(
    moduleType: ModuleType,
    moduleName: string,
    moduleCategory: ModuleCategory,
    moduleIcon: string,
    defaultConfig: Partial<ModuleConfig>,
    options?: {
      version?: string
      description?: string
      author?: string
      componentPath?: string
    }
  ): ModulePackage {
    return {
      moduleType,
      moduleName,
      moduleCategory,
      moduleIcon,
      defaultConfig,
      componentPath: options?.componentPath,
      version: options?.version || '1.0.0',
      description: options?.description,
      author: options?.author
    }
  }

  /**
   * 将模块包导出为 JSON 文件
   */
  static exportModulePackageToJSON(packageData: ModulePackage): string {
    return JSON.stringify(packageData, null, 2)
  }

  /**
   * 从 JSON 文件导入模块包
   */
  static importModulePackageFromJSON(jsonString: string): ModulePackage {
    try {
      return JSON.parse(jsonString)
    } catch (error) {
      throw new Error('无效的 JSON 格式')
    }
  }
}

