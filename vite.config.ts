import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    host: '0.0.0.0', // 支持公网访问
    port: 8091,
    open: true
  },
  preview: {
    host: '0.0.0.0', // 生产预览模式也支持公网访问
    port: 8091,
    open: false, // 生产环境不自动打开浏览器，避免服务器环境报错
    strictPort: true, // 如果端口被占用则退出
    cors: true // 启用 CORS
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    // 确保构建时正确处理路由
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  }
}) 