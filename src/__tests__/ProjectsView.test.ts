import type { RouteRecordRaw } from 'vue-router'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { createI18n } from 'vue-i18n'
import { createMemoryHistory, createRouter } from 'vue-router'
import { PROJECTS } from '../features/home/data/projects'
import ProjectsView from '../features/home/views/ProjectsView.vue'
import en from '../i18n/locales/en'
import nl from '../i18n/locales/nl'

const routes: RouteRecordRaw[] = [
  { path: '/projects', name: 'projects', component: { template: '<div />' } },
  { path: '/projects/:id', name: 'project-detail', component: { template: '<div />' } },
]

interface LocaleEntry {
  title: string
  summary: string
}

/** Reads a project's locale entry without asserting on the catalogue shape. */
function entryOf(locale: 'en' | 'nl', id: string): LocaleEntry {
  const catalogue = locale === 'en' ? en : nl
  const entries: Record<string, LocaleEntry> = catalogue.projects.entries
  const entry = entries[id]
  if (!entry) throw new Error(`no ${locale} entry for ${id}`)
  return entry
}

function mountView(locale: 'en' | 'nl' = 'en') {
  const i18n = createI18n({ legacy: false, locale, messages: { en, nl } })
  const router = createRouter({ history: createMemoryHistory(), routes })
  return mount(ProjectsView, { global: { plugins: [i18n, router] } })
}

describe('projectsView', () => {
  it('renders one row per project', () => {
    const wrapper = mountView()
    expect(wrapper.findAll('[data-testid="project-row"]')).toHaveLength(PROJECTS.length)
  })

  it('links every row to its project detail page', () => {
    const wrapper = mountView()
    const hrefs = wrapper.findAll('[data-testid="project-row-link"]').map((link) => link.attributes('href'))
    expect(hrefs).toEqual(PROJECTS.map((project) => `/projects/${project.id}`))
  })

  it('shows the title and summary of every project', () => {
    const wrapper = mountView()
    for (const project of PROJECTS) {
      const entry = entryOf('en', project.id)
      expect(wrapper.text()).toContain(entry.title)
      expect(wrapper.text()).toContain(entry.summary)
    }
  })

  it('renders a translated heading', () => {
    const wrapper = mountView()
    expect(wrapper.find('[data-testid="projects-index-title"]').text()).toContain(en.projects.indexTitle)
  })

  it('leaves a production project unmarked, like the card does', () => {
    const wrapper = mountView()
    // CONTEXT.md: production is "running, unmarked". Only in-progress and
    // parked carry a label, so six of the eight rows show no status pill.
    const marked = wrapper.findAll('[data-testid="project-row-status"]')
    const expected = PROJECTS.filter((p) => p.status && p.status !== 'production')
    expect(marked).toHaveLength(expected.length)
  })

  it('renders in Dutch when the locale is Dutch', () => {
    const wrapper = mountView('nl')
    const entry = entryOf('nl', 'knowledge')
    expect(wrapper.text()).toContain(entry.title)
    expect(wrapper.text()).toContain(entry.summary)
    expect(wrapper.text()).not.toContain('Seven-node k3s cluster on NixOS')
    expect(wrapper.find('[data-testid="projects-index-title"]').text()).toContain(nl.projects.indexTitle)
  })
})
