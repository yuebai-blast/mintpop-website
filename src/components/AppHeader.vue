<script setup lang="ts">
import { RouterLink } from 'vue-router'

import BrandLogo from '@/components/BrandLogo.vue'
import { useTheme } from '@/composables/useTheme'
import { CONSOLE_URL } from '@/config/site'

const { isDark, toggleTheme } = useTheme()
</script>

<template>
  <header class="header">
    <a href="#top" class="logo-link">
      <BrandLogo :size="24" />
    </a>

    <nav class="nav">
      <a href="#capabilities" class="nav-link">Capabilities</a>
      <a href="#modalities" class="nav-link">Modalities</a>
      <RouterLink to="/legal" class="nav-link">Legal</RouterLink>
      <RouterLink to="/legal#contact" class="nav-link nav-link--accent">
        Contact
      </RouterLink>
    </nav>

    <div class="actions">
      <span class="lang">EN</span>
      <button
        type="button"
        class="theme-toggle"
        title="Toggle theme"
        @click="toggleTheme"
      >
        <span class="theme-icon">{{ isDark() ? '☀' : '☾' }}</span>
      </button>
      <a
        :href="CONSOLE_URL"
        target="_blank"
        rel="noopener"
        class="login-btn"
      >
        Login
      </a>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  gap: 30px;
  padding: 0 44px;
  height: 74px;
  background: var(--bar);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--border);
}

.logo-link {
  display: flex;
  align-items: flex-end;
}

.nav {
  display: flex;
  align-items: center;
  gap: 2px;
  margin-left: 8px;
}

.nav-link {
  font: 500 14px 'Space Grotesk', sans-serif;
  padding: 9px 15px;
  border-radius: 10px;
  color: var(--text2);
  white-space: nowrap;
  cursor: pointer;
  transition: background-color 0.18s ease, color 0.18s ease;
}

.nav-link:hover {
  background: var(--muted);
}

.nav-link--accent {
  font-weight: 600;
  color: var(--accent);
}

.nav-link--accent:hover {
  background: var(--accent-soft);
}

.actions {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 14px;
}

.lang {
  font: 500 13px 'Space Grotesk', sans-serif;
  color: var(--text2);
  cursor: pointer;
}

.theme-toggle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--border);
  background: var(--card);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  color: var(--text2);
  transition: border-color 0.18s ease;
}

.theme-toggle:hover {
  border-color: var(--accent);
}

.theme-icon {
  font-size: 17px;
  line-height: 1;
}

.login-btn {
  font: 600 14px 'Space Grotesk', sans-serif;
  color: var(--accent);
  padding: 9px 18px;
  border-radius: 11px;
  border: 1px solid var(--accent-border);
  background: var(--accent-soft);
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 0.18s ease;
}

.login-btn:hover {
  background: var(--accent-soft2);
}

@media (max-width: 720px) {
  .header {
    padding: 0 18px;
    gap: 14px;
  }

  .nav {
    display: none;
  }
}
</style>
