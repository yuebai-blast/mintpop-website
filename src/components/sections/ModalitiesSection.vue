<script setup lang="ts">
// 模态卡片区：Text / Vision / Voice 已支持，More 为「即将上线」占位卡。
</script>

<template>
  <section id="modalities" class="modalities">
    <div class="wrap">
      <header class="head">
        <h2 class="title">One API, Every Modality</h2>
        <p class="subtitle">Build once, ship across modalities.</p>
      </header>

      <div class="grid">
        <article class="card">
          <div class="icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--accent)"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M4 6h16M4 6V4M20 6V4M12 6v14M8 20h8" />
            </svg>
          </div>
          <div class="card-foot">
            <h3 class="card-title">Text</h3>
            <span class="badge badge-supported">SUPPORTED</span>
          </div>
        </article>

        <article class="card">
          <div class="icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--accent)"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
          <div class="card-foot">
            <h3 class="card-title">Vision</h3>
            <span class="badge badge-supported">SUPPORTED</span>
          </div>
        </article>

        <article class="card">
          <div class="icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--accent)"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M3 12v0M7 8v8M11 4v16M15 8v8M19 11v2" />
            </svg>
          </div>
          <div class="card-foot">
            <h3 class="card-title">Voice</h3>
            <span class="badge badge-supported">SUPPORTED</span>
          </div>
        </article>

        <article class="card card-soon">
          <div class="icon icon-muted">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--ph)"
              stroke-width="1.9"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </div>
          <div class="card-foot">
            <h3 class="card-title card-title-muted">More</h3>
            <span class="badge badge-soon">SOON</span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.modalities {
  padding: 24px 44px 110px;
}

.wrap {
  max-width: 1140px;
  margin: 0 auto;
}

.head {
  text-align: center;
  margin-bottom: 54px;
}

.title {
  margin: 0;
  font: 500 48px 'Newsreader', serif;
  letter-spacing: -0.015em;
  color: var(--text);
}

.subtitle {
  margin: 16px 0 0;
  font: 400 18px 'Space Grotesk', sans-serif;
  color: var(--text2);
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
}

.card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 28px 24px;
  box-shadow: 0 2px 14px rgba(0, 0, 0, 0.045);
}

.card-soon {
  background: var(--cream);
  border: 1px dashed var(--border2);
  box-shadow: none;
}

.icon {
  width: 48px;
  height: 48px;
  border-radius: 13px;
  background: var(--accent-soft);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.icon-muted {
  background: var(--muted);
}

.card-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-title {
  margin: 0;
  font: 600 19px 'Space Grotesk', sans-serif;
  color: var(--text);
}

.card-title-muted {
  color: var(--text2);
}

.badge {
  font: 600 11px 'Space Grotesk', sans-serif;
  letter-spacing: 0.04em;
  padding: 4px 10px;
  border-radius: 999px;
}

.badge-supported {
  color: var(--accent);
  background: var(--accent-soft);
}

.badge-soon {
  color: var(--ph);
  background: var(--muted);
}

@media (max-width: 920px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 720px) {
  .modalities {
    padding: 8px 18px 72px;
  }

  .title {
    font-size: 34px;
  }

  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
