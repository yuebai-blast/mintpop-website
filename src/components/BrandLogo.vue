<script setup lang="ts">
// 品牌 Logo：使用 mintpop 词标图（已裁掉留白、白底抠成透明）。
// size 沿用原文字 logo 的字号语义（header 24 / footer 22 / 占位页 26），
// 这里按比例换算成图片高度，使视觉大小与原文字 logo 接近。
import wordmark from '@/assets/mintpop-wordmark.png'

const props = withDefaults(
  defineProps<{
    size?: number
  }>(),
  { size: 24 },
)

// 词标图含上下“pop”爆点装饰，字身高度约为整图的 7 成；
// 放大 1.3 倍让字身高度与原文字 logo 的字号大致相当。
const height = props.size * 1.3
</script>

<template>
  <img
    class="brand-img"
    :src="wordmark"
    alt="mintpop"
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

<!-- 深色主题规则放在非 scoped 块：需按 <html> 上的 data-theme 祖先选择，
     scoped 块用 :global() 包裹祖先会被编译器丢掉后代、误把 filter 加到整页。
     .brand-img 仅本组件使用，全局命中安全。 -->
<style>
/* 词标为黑字+青点：invert 反相让黑字变白；再叠 hue-rotate(180deg)
   把被反相偏移的青点旋回原色（灰阶笔画不受 hue 影响）。 */
:root[data-theme='DARK'] .brand-img {
  filter: invert(1) hue-rotate(180deg);
}
</style>
