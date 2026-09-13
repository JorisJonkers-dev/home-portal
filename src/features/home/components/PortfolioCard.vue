<script setup lang="ts">
import type { Project } from '../types'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  project: {
    id: string
    status?: Project['status']
    title: string
    description: string
    technologies: string[]
    repos?: Project['repos']
    githubUrl?: string
    liveUrl?: string
  }
}>()

const { t } = useI18n()

const STATUS_CLASSES: Record<string, string> = {
  'in-progress': 'border-terminal-amber/30 bg-terminal-amber/10 text-terminal-amber',
  'parked': 'border-surface-border bg-surface-elevated text-[var(--color-text-subtle)]',
}

const statusPill = computed(() => {
  const status = props.project.status
  if (!status || status === 'production') return undefined
  return { label: t(`projects.status.${status}`), class: STATUS_CLASSES[status] }
})
</script>

<template>
  <article
    data-testid="card"
    class="group flex flex-col rounded-xl border border-surface-border bg-surface-elevated p-6 transition-all duration-300 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5"
  >
    <!-- Terminal-style title bar -->
    <div class="mb-4 flex items-center gap-2">
      <div class="flex gap-1.5">
        <div class="h-2.5 w-2.5 rounded-full bg-red-500/60" />
        <div class="h-2.5 w-2.5 rounded-full bg-terminal-amber/60" />
        <div class="h-2.5 w-2.5 rounded-full bg-terminal-green/60" />
      </div>
      <span data-testid="card-path" class="font-mono text-xs text-[var(--color-text-subtle)]"
        >~/projects/{{ project.id }}</span
      >
      <span
        v-if="statusPill"
        data-testid="status-pill"
        class="ml-auto rounded-md border px-2 py-0.5 font-mono text-xs"
        :class="statusPill.class"
        >{{ statusPill.label }}</span
      >
    </div>

    <h3 class="text-lg font-semibold text-[var(--color-text-primary)] group-hover:text-accent-light">
      {{ project.title }}
    </h3>
    <p class="mt-2 flex-1 text-sm leading-relaxed text-[var(--color-text-muted)]">
      {{ project.description }}
    </p>
    <div class="mt-4 flex flex-wrap gap-2">
      <span
        v-for="tag in project.technologies"
        :key="tag"
        class="rounded-md border border-accent/20 bg-accent/10 px-2.5 py-0.5 font-mono text-xs text-accent-light"
      >
        {{ tag }}
      </span>
    </div>
    <div v-if="project.repos?.length" class="mt-4 flex flex-wrap gap-2">
      <component
        :is="repo.url ? 'a' : 'span'"
        v-for="repo in project.repos"
        :key="repo.name"
        :href="repo.url"
        :target="repo.url ? '_blank' : undefined"
        :rel="repo.url ? 'noopener noreferrer' : undefined"
        data-testid="repo"
        class="rounded-md border border-surface-border bg-surface-card px-2 py-0.5 font-mono text-xs text-[var(--color-text-muted)]"
        :class="repo.url ? 'transition-colors hover:border-terminal-green/40 hover:text-terminal-green' : ''"
      >
        {{ repo.name }}
        <span
          v-if="repo.private"
          data-testid="repo-private"
          class="ml-1 text-[var(--color-text-subtle)]"
          >· private</span
        >
      </component>
    </div>
    <div class="mt-6 flex gap-4 font-mono text-sm">
      <a
        v-if="project.githubUrl"
        :href="project.githubUrl"
        class="text-[var(--color-text-muted)] transition-colors hover:text-terminal-green"
        rel="noopener noreferrer"
        target="_blank"
      >
        &gt; github
      </a>
      <a
        v-if="project.liveUrl"
        :href="project.liveUrl"
        class="text-[var(--color-text-muted)] transition-colors hover:text-terminal-cyan"
        rel="noopener noreferrer"
        target="_blank"
      >
        &gt; live
      </a>
    </div>
  </article>
</template>
