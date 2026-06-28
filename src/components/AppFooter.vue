<script setup lang="ts">
import { RouterLink } from 'vue-router'

import BrandLogo from '@/components/BrandLogo.vue'
</script>

<template>
  <footer class="footer">
    <div class="inner">
      <a href="#top" class="logo-link">
        <BrandLogo :size="22" />
      </a>

      <nav class="links">
        <RouterLink to="/legal#terms" class="link">Terms of Service</RouterLink>
        <span class="sep">·</span>
        <RouterLink to="/legal#privacy" class="link">Privacy Policy</RouterLink>
        <span class="sep">·</span>
        <RouterLink to="/legal#refund" class="link">Refund Policy</RouterLink>
        <span class="sep">·</span>
        <RouterLink to="/legal#aup" class="link">Acceptable Use</RouterLink>
        <span class="sep">·</span>
        <RouterLink to="/legal#contact" class="link">Contact</RouterLink>
      </nav>

      <div class="operated">
        <span class="operated-icon">
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--accent)"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M4 21V6a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v15" />
            <path d="M15 11h4a1 1 0 0 1 1 1v9" />
            <path d="M2 21h20M8 8h0M8 12h0M8 16h0" />
          </svg>
        </span>
        <span class="operated-by">Operated by</span>
        <span class="operated-name">Energyline</span>
        <span class="sep">·</span>
        <span class="operated-loc">United States</span>
      </div>

      <p class="copyright">© 2026 mintpop. All rights reserved.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--border);
  background: var(--footer);
  padding: 56px 44px 44px;
}

.inner {
  max-width: 1140px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 26px;
  text-align: center;
}

.logo-link {
  display: flex;
  align-items: flex-end;
}

.links {
  display: flex;
  align-items: center;
  gap: 8px 22px;
  flex-wrap: wrap;
  justify-content: center;
}

.link {
  font: 500 14px 'Space Grotesk', sans-serif;
  color: var(--text2);
  cursor: pointer;
  transition: color 0.18s ease;
}

.link:hover {
  color: var(--accent);
}

.sep {
  color: var(--border2);
}

.operated {
  display: inline-flex;
  align-items: center;
  gap: 11px;
  padding: 11px 18px;
  border-radius: 13px;
  background: var(--card);
  border: 1px solid var(--accent-border);
  box-shadow: 0 3px 12px rgba(23, 209, 167, 0.1);
}

.operated-icon {
  width: 30px;
  height: 30px;
  border-radius: 9px;
  background: var(--accent-soft);
  display: flex;
  align-items: center;
  justify-content: center;
  flex: none;
}

.operated-by {
  font: 400 13px 'Space Grotesk', sans-serif;
  color: var(--text2);
}

.operated-name {
  font: 600 15px 'Space Grotesk', sans-serif;
  color: var(--text);
  letter-spacing: 0.01em;
}

.operated-loc {
  font: 500 13px 'Space Grotesk', sans-serif;
  color: var(--text2);
}

.copyright {
  margin: 0;
  font: 400 13px 'Space Grotesk', sans-serif;
  color: var(--ph);
}

@media (max-width: 720px) {
  .footer {
    padding: 40px 18px 32px;
  }
}
</style>
