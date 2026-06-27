/// <reference types="vite-ssg" />
import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // 用 @ 指向 src,简化深层引用
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // vite-ssg 预渲染选项
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    // nginx 按目录路由(访问 /legal/ 读取 dist/legal/index.html),需嵌套目录结构
    dirStyle: 'nested',
  },
})
