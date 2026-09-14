import type { ComputedRef, MaybeRefOrGetter } from 'vue'
import type { ProjectStatus } from '../types'
import { computed, toValue } from 'vue'
import { useI18n } from 'vue-i18n'

const STATUS_CLASSES: Partial<Record<ProjectStatus, string>> = {
  'in-progress': 'border-terminal-amber/30 bg-terminal-amber/10 text-terminal-amber',
  'parked': 'border-surface-border bg-surface-elevated text-[var(--color-text-subtle)]',
}

export interface StatusPill {
  label: string
  class: string | undefined
}

/**
 * The pill for one status, in the language of the translator handed in.
 * Production projects get no pill at all — the absence of a label says it.
 *
 * Pure, so a list view can map over it where a composable per row would not
 * work; the composable below is the reactive wrapper around it.
 */
export function statusPill(t: (key: string) => string, status?: ProjectStatus): StatusPill | undefined {
  if (!status || status === 'production') return undefined
  return { label: t(`projects.status.${status}`), class: STATUS_CLASSES[status] }
}

/**
 * The status pill as it appears next to a project title, in the active locale.
 * Production projects get no pill at all — the absence of a label says it.
 */
export function useStatusPill(
  status: MaybeRefOrGetter<ProjectStatus | undefined>,
): ComputedRef<StatusPill | undefined> {
  const { t } = useI18n()

  return computed(() => statusPill(t, toValue(status)))
}
