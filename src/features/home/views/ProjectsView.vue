<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import { useProjects } from '../composables/useProjects'
import { statusPill } from '../composables/useStatusPill'

const { t } = useI18n()

// The same joined projects the home page and the detail page use, so a title
// or summary cannot read differently here. Composing inside a computed keeps
// a locale switch reactive.
const projects = useProjects()

// A row cannot call a composable per item, so the pill is derived through the
// same pure function the composable wraps: production stays unmarked here too.
const rows = computed(() =>
  projects.value.map((project) => ({
    id: project.id,
    title: project.title,
    summary: project.summary,
    pill: statusPill(t, project.status),
  })),
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
              v-if="row.pill"
              data-testid="project-row-status"
              class="w-fit rounded-md border px-2 py-0.5 font-mono text-xs"
              :class="row.pill.class"
            >
              {{ row.pill.label }}
            </span>
            <span v-else class="font-mono text-xs text-[var(--color-text-subtle)]">&mdash;</span>
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
