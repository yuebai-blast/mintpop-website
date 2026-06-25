<script setup lang="ts">
import { RouterLink } from 'vue-router'

import BrandLogo from '@/components/BrandLogo.vue'

// 占位页：设计稿未提供 Legal/Login/Register 的样式，先用统一占位承接路由
defineProps<{
  title: string
  description: string
}>()
</script>

<template>
  <section class="placeholder">
    <div class="inner">
      <RouterLink to="/" class="logo-link">
        <BrandLogo :size="26" />
      </RouterLink>

      <span class="tag">SOON</span>
      <h1 class="title">{{ title }}</h1>
      <p class="desc">{{ description }}</p>

      <RouterLink to="/" class="back">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M19 12H5M11 6l-6 6 6 6"
            stroke="currentColor"
            stroke-width="2.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        Back to home
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.placeholder {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 24px;
  background: var(--bg);
}

.inner {
  max-width: 520px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 18px;
}

.logo-link {
  display: flex;
  align-items: flex-end;
  margin-bottom: 8px;
}

.tag {
  font: 600 11px 'Space Grotesk', sans-serif;
  letter-spacing: 0.06em;
  color: var(--accent);
  background: var(--accent-soft);
  padding: 5px 12px;
  border-radius: 999px;
}

.title {
  margin: 0;
  font: 500 52px 'Newsreader', serif;
  letter-spacing: -0.015em;
  color: var(--text);
}

.desc {
  margin: 0;
  font: 400 18px 'Space Grotesk', sans-serif;
  line-height: 1.6;
  color: var(--text2);
}

.back {
  margin-top: 12px;
  display: inline-flex;
  align-items: center;
  gap: 9px;
  font: 600 15px 'Space Grotesk', sans-serif;
  color: var(--accent);
  padding: 13px 22px;
  border-radius: 12px;
  border: 1px solid var(--accent-border);
  background: var(--accent-soft);
  transition: background-color 0.18s ease;
}

.back:hover {
  background: var(--accent-soft2);
}

@media (max-width: 720px) {
  .title {
    font-size: 38px;
  }
}
</style>
