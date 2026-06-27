<script setup lang="ts">
// 品牌 Logo：mintpop，词尾一个 accent 圆点作点缀。size 控制字号（header 24 / footer 22）
withDefaults(
  defineProps<{
    size?: number
  }>(),
  { size: 24 },
)
</script>

<template>
  <span class="brand" :style="{ fontSize: `${size}px` }">
    <span class="brand-word">mintpop</span>
    <span
      class="brand-dot"
      :style="{ width: `${size / 3}px`, height: `${size / 3}px` }"
    ></span>
  </span>
</template>

<style scoped>
.brand {
  display: inline-flex;
  align-items: flex-end;
  gap: 6px;
}

.brand-word {
  font-family: 'Fredoka', sans-serif;
  font-weight: 600;
  line-height: 1;
  color: var(--text);
}

.brand-dot {
  border-radius: 50%;
  background: var(--accent);
  display: inline-block;
  margin-bottom: 0.18em;
}
</style>
