<script setup lang="ts">
import { onMounted } from 'vue'

import { useTheme } from '@/composables/useTheme'

const { syncTheme } = useTheme()

// onMounted 仅在客户端执行，SSR/SSG 预渲染阶段不触发。
// 水合期 theme 保持 LIGHT 与预渲染一致，挂载后再同步真实主题，消除 hydration mismatch。
onMounted(() => {
  syncTheme()
})
</script>

<template>
  <RouterView />
</template>
