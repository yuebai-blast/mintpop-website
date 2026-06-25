<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'

// 应用入口调用一次，完成主题首屏挂载（写 data-theme 与 --accent 到 :root）
useTheme()
</script>

<template>
  <RouterView />
</template>
