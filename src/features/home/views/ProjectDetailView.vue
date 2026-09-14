<script setup lang="ts">
import { watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink, useRoute } from 'vue-router'
import { useProject } from '../composables/useProjects'
import { useStatusPill } from '../composables/useStatusPill'

const { t } = useI18n()
const route = useRoute()

// Reading the id through a computed keeps the page reactive when the locale
// switches and when the user navigates straight to another project.
const project = useProject(() => {
  const param = route.params.id
  return Array.isArray(param) ? param[0] : param
})
const statusPill = useStatusPill(() => project.value?.status)

watchEffect(() => {
  document.title = `${project.value?.title ?? t('projects.notFound')} — jorisjonkers.dev`
})
</script>

<template>
  <div class="min-h-screen px-4 py-12 sm:px-6 sm:py-16">
    <div class="mx-auto max-w-3xl">
      <RouterLink
        data-testid="back-link"
        to="/projects"
        class="font-mono text-xs text-[var(--color-text-muted)] transition-colors hover:text-terminal-green"
      >
        &larr; {{ t('projects.backToIndex') }}
      </RouterLink>

      <template v-if="project">
        <div class="mt-6 flex flex-wrap items-center gap-3">
          <h1 data-testid="detail-title" class="text-2xl font-semibold text-[var(--color-text-primary)]">
            {{ project.title }}
          </h1>
          <span
            v-if="statusPill"
            data-testid="status-pill"
            class="rounded-md border px-2 py-0.5 font-mono text-xs"
            :class="statusPill.class"
            >{{ statusPill.label }}</span
          >
        </div>
        <p data-testid="detail-path" class="mt-1 font-mono text-xs text-[var(--color-text-subtle)]">
          ~/projects/{{ project.id }}
        </p>

        <p data-testid="detail-description" class="mt-6 text-sm leading-relaxed text-[var(--color-text-muted)]">
          {{ project.description }}
        </p>

        <h3 class="mt-10 font-mono text-sm font-semibold uppercase tracking-widest text-terminal-green">
          {{ t('projects.highlights') }}
        </h3>
        <ul class="mt-4 space-y-2">
          <li
            v-for="highlight in project.highlights"
            :key="highlight"
            class="flex gap-3 text-sm text-[var(--color-text-muted)]"
          >
            <span aria-hidden="true" class="font-mono text-terminal-green">&gt;</span>
            <span data-testid="highlight">{{ highlight }}</span>
          </li>
        </ul>

        <h3 class="mt-10 font-mono text-sm font-semibold uppercase tracking-widest text-terminal-green">
          {{ t('projects.repositories') }}
        </h3>
        <ul class="mt-4 divide-y divide-surface-border/40">
          <li v-for="repo in project.repos ?? []" :key="repo.name" data-testid="repo" class="py-3">
            <component
              :is="repo.url ? 'a' : 'span'"
              :href="repo.url"
              :target="repo.url ? '_blank' : undefined"
              :rel="repo.url ? 'noopener noreferrer' : undefined"
              data-testid="repo-name"
              class="font-mono text-sm text-[var(--color-text-primary)]"
              :class="repo.url ? 'transition-colors hover:text-terminal-green' : ''"
            >
              {{ repo.name }}
              <span v-if="repo.private" data-testid="repo-private" class="ml-1 text-[var(--color-text-subtle)]"
                >· private</span
              >
            </component>
            <p data-testid="repo-description" class="mt-1 text-sm text-[var(--color-text-muted)]">
              {{ repo.description }}
            </p>
          </li>
        </ul>
      </template>

      <p v-else data-testid="project-not-found" class="mt-10 text-sm text-[var(--color-text-muted)]">
        {{ t('projects.notFound') }}
      </p>
    </div>
  </div>
</template>
