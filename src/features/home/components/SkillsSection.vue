<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { barWidth, SKILL_CATEGORIES, SOFT_SKILLS } from '../data/skills'

const { t } = useI18n()
</script>

<template>
  <section id="skills" class="px-4 py-12 sm:px-6 sm:py-24">
    <div class="mx-auto max-w-4xl">
      <h2 class="font-mono text-sm font-semibold uppercase tracking-widest text-terminal-green">
        <span class="text-[var(--color-text-subtle)]">04.</span>
        {{ t('skills.title') }}
      </h2>
      <p class="mt-3 text-[var(--color-text-muted)]">
        {{ t('skills.subtitle') }}
      </p>

      <div class="mt-6 grid gap-8 sm:mt-10 sm:gap-12 md:grid-cols-2">
        <div v-for="category in SKILL_CATEGORIES" :key="category.key">
          <h3 class="mb-4 font-mono text-xs font-semibold uppercase tracking-widest" :class="category.accent">
            {{ t(`skills.categories.${category.key}`) }}
          </h3>

          <ul v-if="category.display === 'bars'" class="space-y-3">
            <li v-for="skill in category.skills" :key="skill.name">
              <div class="flex items-center justify-between font-mono text-sm">
                <span class="text-[var(--color-text-primary)]">{{ skill.name }}</span>
                <span class="text-[var(--color-text-subtle)]">{{ skill.years }}y</span>
              </div>
              <div class="mt-1.5 h-1.5 overflow-hidden rounded-full bg-surface-elevated">
                <div
                  class="h-full rounded-full bg-gradient-to-r from-accent to-terminal-cyan transition-all duration-500"
                  :style="{ width: barWidth(skill.years ?? 0) }"
                />
              </div>
            </li>
          </ul>

          <div v-else class="flex flex-wrap gap-2">
            <span
              v-for="skill in category.skills"
              :key="skill.name"
              data-testid="skill"
              class="rounded-md border border-terminal-cyan/20 bg-terminal-cyan/10 px-3 py-1.5 font-mono text-sm text-terminal-cyan"
            >
              {{ skill.name }}
            </span>
          </div>
        </div>

        <div>
          <h3 class="mb-4 font-mono text-xs font-semibold uppercase tracking-widest text-terminal-green">
            {{ t('skills.categories.soft') }}
          </h3>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="skill in SOFT_SKILLS"
              :key="skill"
              class="rounded-md border border-terminal-green/20 bg-terminal-green/10 px-3 py-1.5 font-mono text-sm text-terminal-green"
            >
              {{ skill }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
