import type { ComputedRef, MaybeRefOrGetter } from 'vue'
import type { ProjectMeta } from '../data/projects'
import type { Project } from '../types'
import { computed, toValue } from 'vue'
import { useI18n } from 'vue-i18n'
import { PROJECTS } from '../data/projects'

/**
 * Joins the code-side metadata with the active locale's prose.
 *
 * The mapping lives in a closure over `t`/`tm` so a locale switch recomposes
 * every project — a card and the detail page stay in sync, and neither has to
 * know that titles live in a message catalogue.
 */
function useProjectComposer(): (meta: ProjectMeta) => Project {
  const { t, tm } = useI18n()

  return (meta: ProjectMeta): Project => {
    const entry = `projects.entries.${meta.id}`
    // `highlights` is a list message, so it has to be read as a message
    // rather than interpolated as a string.
    const highlights = tm(`${entry}.highlights`)
    return {
      ...meta,
      title: t(`${entry}.title`),
      summary: t(`${entry}.summary`),
      description: t(`${entry}.description`),
      highlights: Array.isArray(highlights) ? highlights.map((highlight) => String(highlight)) : [],
    }
  }
}

/** Every project, composed in the active locale. */
export function useProjects(): ComputedRef<Project[]> {
  const compose = useProjectComposer()
  return computed(() => PROJECTS.map((meta) => compose(meta)))
}

/** One project by id, or `undefined` for an id nobody owns. */
export function useProject(id: MaybeRefOrGetter<string | undefined>): ComputedRef<Project | undefined> {
  const compose = useProjectComposer()
  return computed(() => {
    const meta = PROJECTS.find((project) => project.id === toValue(id))
    return meta ? compose(meta) : undefined
  })
}
