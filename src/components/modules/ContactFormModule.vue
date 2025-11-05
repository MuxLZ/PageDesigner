<template>
  <BaseModuleWrapper :module-config="config">
    <section class="contact-form-module section">
      <div class="container">
        <h2 v-if="config.title" class="section-title">{{ config.title }}</h2>
        <el-form
          :model="formData"
          :rules="formRules"
          label-width="100px"
          class="contact-form"
        >
          <el-form-item
            v-for="field in config.fields"
            :key="field.name"
            :label="field.label"
            :prop="field.name"
            :required="field.required"
          >
            <el-input
              v-if="field.type === 'text' || field.type === 'email' || field.type === 'tel'"
              v-model="formData[field.name]"
              :type="field.type"
              :placeholder="field.placeholder"
            />
            <el-input
              v-else-if="field.type === 'textarea'"
              v-model="formData[field.name]"
              type="textarea"
              :rows="4"
              :placeholder="field.placeholder"
            />
            <el-select
              v-else-if="field.type === 'select'"
              v-model="formData[field.name]"
              :placeholder="field.placeholder"
            >
              <el-option
                v-for="option in field.options"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="large" @click="handleSubmit">
              {{ config.submitText || '提交' }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </section>
  </BaseModuleWrapper>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import type { ContactFormConfig } from '@/types/module'
import BaseModuleWrapper from './BaseModuleWrapper.vue'

interface Props {
  config: ContactFormConfig
}

const props = defineProps<Props>()

const formData = ref<Record<string, any>>({})

const formRules = computed(() => {
  const rules: Record<string, any> = {}
  props.config.fields?.forEach(field => {
    if (field.required) {
      rules[field.name] = [
        { required: true, message: `请输入${field.label}`, trigger: 'blur' }
      ]
      if (field.type === 'email') {
        rules[field.name].push({ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' })
      }
    }
  })
  return rules
})

const handleSubmit = () => {
  ElMessage.success('表单提交成功！')
  // 这里可以调用API提交表单
}
</script>

<style scoped>
.contact-form-module {
  width: 100%;
}

.contact-form {
  max-width: 600px;
  margin: 0 auto;
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}
</style>

