<script setup lang="ts">
import { CONSOLE_URL } from '@/config/site'
</script>

<template>
  <section id="top" class="hero">
    <!-- 装饰层：warhol 网点渐变 + 网点底纹 + 中央光晕（纯展示，不可交互） -->
    <div class="deco deco-dots-accent" aria-hidden="true"></div>
    <div class="deco deco-dots-ink" aria-hidden="true"></div>
    <div class="deco deco-glow" aria-hidden="true"></div>

    <div class="hero-inner">
      <div class="badge">
        <span class="badge-icon">✦</span>
        <span class="badge-text">
          mintpop &nbsp;·&nbsp; Multimodal AI infrastructure for developers
        </span>
      </div>

      <h1 class="headline">
        One API for <span class="em em-accent">text</span>,
        <span class="em">vision</span>, and <span class="em">voice</span>.
      </h1>

      <p class="subtitle">
        Build multimodal AI into your product through a single, unified
        endpoint.
      </p>
      <p class="byline">Built by Energyline &nbsp;·&nbsp; Based in the United States</p>

      <div class="cta-row">
        <a
          :href="CONSOLE_URL"
          target="_blank"
          rel="noopener"
          class="btn btn-primary"
        >
          Get Started
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12h14M13 6l6 6-6 6"
              stroke="#fff"
              stroke-width="2.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </a>
        <a href="#capabilities" class="btn btn-ghost">Explore capabilities</a>
      </div>

      <div class="tags">
        <span class="tag">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--accent)"
            stroke-width="1.9"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M7 8l-4 4 4 4" />
            <path d="M17 8l4 4-4 4" />
            <path d="M14 4l-4 16" />
          </svg>
          Unified API
        </span>
        <span class="tag">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--accent)"
            stroke-width="1.9"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M12 3l8 4v5c0 4.4-3.1 7.6-8 9-4.9-1.4-8-4.6-8-9V7l8-4z" />
            <path d="M9 12l2 2 4-4" />
          </svg>
          Session Persistence
        </span>
        <span class="tag">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--accent)"
            stroke-width="1.9"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M4 20V10M10 20V4M16 20v-8M22 20H2" />
          </svg>
          Pay As You Go
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  padding: 120px 44px 96px;
}

.deco {
  position: absolute;
  pointer-events: none;
}

.deco-dots-accent {
  right: -180px;
  top: -40px;
  width: 560px;
  height: 560px;
  background: linear-gradient(
    150deg,
    #0fb389 0%,
    #17d1a7 45%,
    rgba(23, 209, 167, 0) 92%
  );
  -webkit-mask-image: radial-gradient(#000 2px, transparent 2.2px);
  mask-image: radial-gradient(#000 2px, transparent 2.2px);
  -webkit-mask-size: 20px 20px;
  mask-size: 20px 20px;
  opacity: 0.14;
}

.deco-dots-ink {
  left: -130px;
  bottom: -120px;
  width: 400px;
  height: 400px;
  background: radial-gradient(var(--ink) 1.8px, transparent 2px);
  background-size: 17px 17px;
  opacity: 0.05;
}

.deco-glow {
  left: 50%;
  top: 120px;
  transform: translateX(-50%);
  width: 900px;
  height: 480px;
  background: radial-gradient(
    closest-side,
    rgba(23, 209, 167, 0.18),
    rgba(23, 209, 167, 0) 72%
  );
  filter: blur(10px);
}

.hero-inner {
  position: relative;
  z-index: 2;
  max-width: 920px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 9px 18px;
  border-radius: 999px;
  background: var(--pill);
  border: 1px solid var(--pill-border);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  backdrop-filter: blur(6px);
}

.badge-icon {
  width: 18px;
  height: 18px;
  border-radius: 6px;
  background: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font: 700 11px 'Space Grotesk', sans-serif;
}

.badge-text {
  font: 500 14px 'Space Grotesk', sans-serif;
  color: var(--text);
  white-space: nowrap;
}

.headline {
  margin: 34px 0 0;
  font: 500 78px 'Newsreader', serif;
  line-height: 1.04;
  letter-spacing: -0.02em;
  color: var(--text);
  text-wrap: balance;
}

.em {
  font-style: italic;
}

.em-accent {
  color: var(--accent);
}

.subtitle {
  margin: 26px 0 0;
  max-width: 620px;
  font: 400 20px 'Space Grotesk', sans-serif;
  line-height: 1.6;
  color: var(--text2);
}

.byline {
  margin: 12px 0 0;
  font: 500 13px 'Space Grotesk', sans-serif;
  letter-spacing: 0.01em;
  color: var(--ph);
}

.cta-row {
  margin-top: 38px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font: 600 16px 'Space Grotesk', sans-serif;
  border-radius: 13px;
  cursor: pointer;
  transition: background-color 0.18s ease, border-color 0.18s ease;
}

.btn-primary {
  color: #fff;
  background: var(--accent);
  padding: 15px 28px;
  box-shadow: 0 6px 18px rgba(23, 209, 167, 0.34);
}

.btn-primary:hover {
  background: var(--accent-deep);
}

.btn-ghost {
  gap: 8px;
  color: var(--text);
  padding: 15px 24px;
  border: 1px solid var(--border2);
  background: var(--card);
}

.btn-ghost:hover {
  border-color: var(--accent);
}

.tags {
  margin-top: 46px;
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}

.tag {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  font: 500 14px 'Space Grotesk', sans-serif;
  color: var(--text2);
  background: var(--card);
  border: 1px solid var(--border);
  padding: 10px 18px;
  border-radius: 999px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
}

@media (max-width: 720px) {
  .hero {
    padding: 72px 18px 64px;
  }

  .headline {
    font-size: 44px;
  }

  .subtitle {
    font-size: 17px;
  }

  .badge-text {
    white-space: normal;
  }

  .cta-row {
    flex-direction: column;
    align-self: stretch;
  }

  .btn {
    justify-content: center;
  }
}
</style>
