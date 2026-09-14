<script setup lang="ts">
import type { ProjectStatus } from '../types'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import { PROJECTS } from '../data/projects'

const { t } = useI18n()

const STATUS_CLASSES: Record<ProjectStatus, string> = {
  'production': 'border-terminal-green/30 bg-terminal-green/10 text-terminal-green',
  'in-progress': 'border-terminal-amber/30 bg-terminal-amber/10 text-terminal-amber',
  'parked': 'border-surface-border bg-surface-elevated text-[var(--color-text-subtle)]',
}

interface ProjectRow {
  id: string
  title: string
  summary: string
  status: ProjectStatus
  statusLabel: string
  statusClass: string
}

// Metadata comes from code, the prose from the active locale. Composing the
// rows in a computed (instead of once at setup) keeps a locale switch reactive.
const rows = computed<ProjectRow[]>(() =>
  PROJECTS.map((project) => {
    const status: ProjectStatus = project.status ?? 'production'
    return {
      id: project.id,
      title: t(`projects.entries.${project.id}.title`),
      summary: t(`projects.entries.${project.id}.summary`),
      status,
      statusLabel: t(`projects.status.${status}`),
      statusClass: STATUS_CLASSES[status],
    }
  }),
)
</script>

<template>
  <div class="min-h-screen px-4 py-12 sm:px-6 sm:py-16">
    <div class="mx-auto max-w-5xl">
      <h1
        data-testid="projects-index-title"
        class="font-mono text-xl font-semibold text-[var(--color-text-primary)] sm:text-2xl"
      >
        <span class="text-[var(--color-text-subtle)]">~/</span>{{ t('projects.indexTitle') }}
      </h1>
      <p class="mt-2 text-sm text-[var(--color-text-muted)]">
        {{ t('projects.indexSubtitle') }}
      </p>

      <ul class="mt-8 divide-y divide-surface-border/40 border-y border-surface-border/40">
        <li v-for="row in rows" :key="row.id" data-testid="project-row">
          <RouterLink
            data-testid="project-row-link"
            :to="`/projects/${row.id}`"
            class="grid grid-cols-1 items-baseline gap-x-4 gap-y-1 py-3 transition-colors hover:bg-surface-card sm:grid-cols-[minmax(0,16rem)_7rem_minmax(0,1fr)_1.5rem] sm:items-center"
          >
            <span
              data-testid="project-row-title"
              class="truncate text-sm font-semibold text-[var(--color-text-primary)]"
            >
              {{ row.title }}
            </span>
            <span
              data-testid="project-row-status"
              class="w-fit rounded-md border px-2 py-0.5 font-mono text-xs"
              :class="row.statusClass"
            >
              {{ row.statusLabel }}
            </span>
            <span data-testid="project-row-summary" class="truncate text-sm text-[var(--color-text-muted)]">
              {{ row.summary }}
            </span>
            <span aria-hidden="true" class="font-mono text-sm text-terminal-green">&rarr;</span>
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>
