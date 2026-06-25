<script setup lang="ts">
// 品牌 Logo：Mint·AI，中间一个 accent 圆点。size 控制字号（header 24 / footer 22）
withDefaults(
  defineProps<{
    size?: number
  }>(),
  { size: 24 },
)
</script>

<template>
  <span class="brand" :style="{ fontSize: `${size}px` }">
    <span class="brand-word brand-mint">Mint</span>
    <span
      class="brand-dot"
      :style="{ width: `${size / 3}px`, height: `${size / 3}px` }"
    ></span>
    <span class="brand-word brand-ai">AI</span>
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

.brand-mint {
  letter-spacing: -0.01em;
}

.brand-ai {
  letter-spacing: 0.01em;
}

.brand-dot {
  border-radius: 50%;
  background: var(--accent);
  display: inline-block;
  margin-bottom: 0.18em;
}
</style>
