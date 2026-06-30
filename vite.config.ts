/// <reference types="vite-ssg" />
/// <reference types="vitest/config" />
import { fileURLToPath, URL } from 'node:url'
import { writeFile } from 'node:fs/promises'

import { INDEXABLE_ROUTES, SITE_URL } from './src/config/site'
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
    async onFinished() {
      const body = INDEXABLE_ROUTES.map(
        (path) => `  <url><loc>${SITE_URL}${path}</loc></url>`,
      ).join('\n')
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`
      await writeFile('dist/sitemap.xml', xml)
      console.log('Sitemap written to dist/sitemap.xml')
    },
  },
  // 单元测试(Vitest):测纯逻辑与 composables,故需 jsdom 提供 window/localStorage 等浏览器全局
  test: {
    environment: 'jsdom',
    // jsdom 不实现 matchMedia 等,在 setup 里 stub,避免 useTheme 读取系统偏好时抛错
    setupFiles: ['./vitest.setup.ts'],
  },
})
