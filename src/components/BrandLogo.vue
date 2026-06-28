<script setup lang="ts">
// 品牌 Logo：使用 MintPop 词标图（已裁掉留白、白底抠成透明）。
// 浅色界面用深色词标（黑字），深色界面用浅色词标（白字），按主题切换图源。
// size 沿用原文字 logo 的字号语义（header 24 / footer 22 / 占位页 26），
// 这里按比例换算成图片高度，使视觉大小与原文字 logo 接近。
import { computed } from 'vue'
import { useTheme } from '@/composables/useTheme'
import wordmarkDark from '@/assets/mintpop-wordmark.png'
import wordmarkLight from '@/assets/mintpop-wordmark-light.png'

const props = withDefaults(
  defineProps<{
    size?: number
  }>(),
  { size: 24 },
)

const { isDark } = useTheme()

// 深色界面取浅色（白字）词标，浅色界面取深色（黑字）词标
const wordmark = computed(() => (isDark() ? wordmarkLight : wordmarkDark))

// 词标图含上下“pop”爆点装饰，字身高度约为整图的 7 成；
// 放大 1.3 倍让字身高度与原文字 logo 的字号大致相当。
const height = props.size * 1.3
</script>

<template>
  <img
    class="brand-img"
    :src="wordmark"
    alt="MintPop"
    :style="{ height: `${height}px` }"
  />
</template>

<style scoped>
.brand-img {
  display: block;
  width: auto;
  /* 避免被 flex 父容器拉伸 */
  flex: none;
}
</style>
