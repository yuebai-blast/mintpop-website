import { ViteSSG } from 'vite-ssg'

import './styles/theme.css'
import './styles/base.css'

import App from './App.vue'
import { routes, scrollBehavior } from './router'

// vite-ssg 约定:导出 createApp 工厂;构建期对每个路由调用、浏览器端用于 hydration
export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL, scrollBehavior },
  // setup 回调:本站暂无需在此安装额外插件
  () => {},
)
