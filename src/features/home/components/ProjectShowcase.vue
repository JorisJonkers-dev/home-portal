<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import { useProjects } from '../composables/useProjects'
import PortfolioCard from './PortfolioCard.vue'

const { t } = useI18n()

// Metadata comes from code; the prose comes from the active locale. Composing
// them keeps a locale switch reactive.
const projects = useProjects()
</script>

<template>
  <section id="projects" class="border-t border-surface-border/40 bg-surface-card px-4 py-12 sm:px-6 sm:py-24">
    <div class="mx-auto max-w-5xl">
      <h2 class="font-mono text-sm font-semibold uppercase tracking-widest text-terminal-green">
        <span class="text-[var(--color-text-subtle)]">03.</span>
        {{ t('projects.title') }}
      </h2>
      <p class="mt-3 text-[var(--color-text-muted)]">
        {{ t('projects.subtitle') }}
      </p>
      <div class="mt-6">
        <RouterLink
          data-testid="projects-overview-link"
          to="/projects"
          class="group inline-flex items-center gap-2 rounded-md border border-accent/30 bg-accent/10 px-4 py-2 font-mono text-sm text-accent-light transition-colors hover:border-accent/50 hover:bg-accent/20"
        >
          {{ t('projects.viewAll') }}
          <span aria-hidden="true" class="transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span>
        </RouterLink>
      </div>
      <div class="mt-6 grid gap-4 sm:mt-10 sm:gap-6 sm:grid-cols-2">
        <PortfolioCard v-for="project in projects" :key="project.id" :project="project" />
      </div>
    </div>
  </section>
</template>
