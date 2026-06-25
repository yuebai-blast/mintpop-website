import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // 用 @ 指向 src，简化深层引用
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
