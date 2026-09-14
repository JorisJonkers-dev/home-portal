<script setup lang="ts">
import type { Project } from '../types'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useStatusPill } from '../composables/useStatusPill'

const props = defineProps<{
  project: Project
}>()

const statusPill = useStatusPill(() => props.project.status)

const detailTo = computed(() => `/projects/${props.project.id}`)
</script>

<template>
  <article
    data-testid="card"
    class="group relative flex flex-col rounded-xl border border-surface-border bg-surface-elevated p-6 transition-all duration-300 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5"
  >
    <!--
      Stretched link: one absolute overlay makes the whole card a single tab
      stop that navigates to the detail page. The card cannot simply be wrapped
      in an anchor — the `github` and `live` links below would nest inside it,
      which breaks keyboard and screen-reader navigation. Those two links carry
      `relative z-10` so they stay above the overlay and independently
      clickable and focusable.
    -->
    <RouterLink
      data-testid="card-link"
      :to="detailTo"
      :aria-label="project.title"
      class="absolute inset-0 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    />

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
    <p data-testid="card-summary" class="mt-2 flex-1 text-sm leading-relaxed text-[var(--color-text-muted)]">
      {{ project.summary }}
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
    <div class="mt-6 flex gap-4 font-mono text-sm">
      <a
        v-if="project.githubUrl"
        :href="project.githubUrl"
        class="relative z-10 text-[var(--color-text-muted)] transition-colors hover:text-terminal-green"
        rel="noopener noreferrer"
        target="_blank"
      >
        &gt; github
      </a>
      <a
        v-if="project.liveUrl"
        :href="project.liveUrl"
        class="relative z-10 text-[var(--color-text-muted)] transition-colors hover:text-terminal-cyan"
        rel="noopener noreferrer"
        target="_blank"
      >
        &gt; live
      </a>
    </div>
  </article>
</template>
