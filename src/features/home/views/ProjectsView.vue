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

// A card cannot call a composable per item, so the pill is derived through the
// same pure function the composable wraps: production stays unmarked here too.
const rows = computed(() =>
  projects.value.map((project) => ({
    id: project.id,
    title: project.title,
    summary: project.summary,
    technologies: project.technologies,
    repoCount: project.repos?.length ?? 0,
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

      <ul class="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5" data-testid="project-grid">
        <li v-for="row in rows" :key="row.id" data-testid="project-row">
          <RouterLink
            data-testid="project-row-link"
            :to="`/projects/${row.id}`"
            class="group flex h-full flex-col rounded-xl border border-surface-border bg-surface-elevated p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5"
          >
            <div class="flex items-start justify-between gap-3">
              <span
                data-testid="project-row-title"
                class="text-base font-semibold text-[var(--color-text-primary)] group-hover:text-accent-light"
              >
                {{ row.title }}
              </span>
              <span
                v-if="row.pill"
                data-testid="project-row-status"
                class="shrink-0 rounded-md border px-2 py-0.5 font-mono text-xs"
                :class="row.pill.class"
              >
                {{ row.pill.label }}
              </span>
            </div>

            <p
              data-testid="project-row-summary"
              class="mt-2 flex-1 text-sm leading-relaxed text-[var(--color-text-muted)]"
            >
              {{ row.summary }}
            </p>

            <div class="mt-4 flex items-center gap-3 border-t border-surface-border/40 pt-3">
              <span class="font-mono text-xs text-[var(--color-text-subtle)]">
                {{ row.repoCount }} {{ row.repoCount === 1 ? 'repo' : 'repos' }}
              </span>
              <span
                aria-hidden="true"
                class="ml-auto font-mono text-sm text-terminal-green transition-transform duration-300 group-hover:translate-x-0.5"
                >&rarr;</span
              >
            </div>
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>
