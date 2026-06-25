import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HOME',
      component: HomeView,
    },
    // 以下三页设计稿暂未提供，先用占位视图占位，后续补设计再填充
    {
      path: '/legal',
      name: 'LEGAL',
      component: () => import('@/views/LegalView.vue'),
    },
    {
      path: '/login',
      name: 'LOGIN',
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'REGISTER',
      component: () => import('@/views/RegisterView.vue'),
    },
    // 兜底：未匹配路由回首页
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
  // 支持锚点滚动（#capabilities / #modalities 等），并在普通跳转时回到顶部
  scrollBehavior(to, _from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  },
})

export default router
