import type { RouteRecordRaw } from 'vue-router'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { createI18n } from 'vue-i18n'
import { createMemoryHistory, createRouter } from 'vue-router'
import { PROJECTS } from '../features/home/data/projects'
import ProjectDetailView from '../features/home/views/ProjectDetailView.vue'
import en from '../i18n/locales/en'
import nl from '../i18n/locales/nl'

const routes: RouteRecordRaw[] = [
  { path: '/', component: { template: '<div />' } },
  { path: '/projects/:id', name: 'project-detail', component: ProjectDetailView },
]

function createTestI18n(locale: 'en' | 'nl' = 'en') {
  return createI18n({ legacy: false, locale, messages: { en, nl } })
}

/** Push first, then mount: the view reads its id from the active route. */
async function mountAt(path: string, locale: 'en' | 'nl' = 'en') {
  const i18n = createTestI18n(locale)
  const router = createRouter({ history: createMemoryHistory(), routes })
  await router.push(path)
  await router.isReady()
  const wrapper = mount(ProjectDetailView, { global: { plugins: [i18n, router] } })
  await wrapper.vm.$nextTick()
  return { wrapper, i18n, router }
}

afterEach(() => {
  document.title = ''
})

describe('projectDetailView', () => {
  it('renders the description of a known project', async () => {
    const { wrapper } = await mountAt('/projects/knowledge')
    const entry = en.projects.entries.knowledge
    expect(wrapper.find('[data-testid="detail-description"]').text()).toBe(entry.description)
    expect(wrapper.find('[data-testid="detail-title"]').text()).toBe(entry.title)
  })

  it('renders every highlight of a known project', async () => {
    const { wrapper } = await mountAt('/projects/knowledge')
    const highlights = wrapper.findAll('[data-testid="highlight"]').map((node) => node.text())
    expect(highlights).toEqual(en.projects.entries.knowledge.highlights)
  })

  it('renders every repo with its description', async () => {
    const project = PROJECTS.find((p) => p.id === 'homelab-platform')
    const { wrapper } = await mountAt('/projects/homelab-platform')
    const expected = project?.repos ?? []
    const rendered = wrapper.findAll('[data-testid="repo"]').map((node) => node.text())
    expect(rendered).toHaveLength(expected.length)
    for (const repo of expected) {
      const match = rendered.find((text) => text.includes(repo.name))
      expect(match).toBeDefined()
      expect(match).toContain(repo.description)
    }
  })

  it('links a public repo and names a private one', async () => {
    const { wrapper } = await mountAt('/projects/homelab-platform')
    const repos = wrapper.findAll('[data-testid="repo"]')
    // platform/flux-modules is public, platform/fleet-infra is not.
    const publicRepo = repos.find((repo) => repo.text().includes('platform/flux-modules'))
    const privateRepo = repos.find((repo) => repo.text().includes('platform/fleet-infra'))
    const link = publicRepo?.find('[data-testid="repo-name"]')
    expect(link?.element.tagName).toBe('A')
    expect(link?.attributes('href')).toBe('https://github.com/JorisJonkers-dev/flux-modules')
    expect(link?.attributes('target')).toBe('_blank')
    expect(link?.attributes('rel')).toContain('noopener')
    expect(privateRepo?.find('[data-testid="repo-name"]').element.tagName).not.toBe('A')
    expect(privateRepo?.find('[data-testid="repo-private"]').exists()).toBe(true)
  })

  it('renders a not-found message for an unknown id', async () => {
    const { wrapper } = await mountAt('/projects/does-not-exist')
    expect(wrapper.find('[data-testid="project-not-found"]').text()).toBe(en.projects.notFound)
    expect(wrapper.find('[data-testid="detail-title"]').exists()).toBe(false)
    expect(wrapper.findAll('[data-testid="repo"]')).toHaveLength(0)
  })

  it('always offers a translated way back to the projects overview', async () => {
    const { wrapper } = await mountAt('/projects/knowledge')
    const back = wrapper.find('[data-testid="back-link"]')
    expect(back.text()).toContain(en.projects.backToIndex)
    expect(back.attributes('href')).toBe('/#projects')
  })

  it('sets the document title to the project', async () => {
    await mountAt('/projects/auth')
    expect(document.title).toBe(`${en.projects.entries.auth.title} — jorisjonkers.dev`)
  })

  it('follows the locale when rendering and titling the page', async () => {
    const { wrapper } = await mountAt('/projects/knowledge', 'nl')
    expect(wrapper.find('[data-testid="detail-description"]').text()).toBe(nl.projects.entries.knowledge.description)
    expect(document.title).toBe(`${nl.projects.entries.knowledge.title} — jorisjonkers.dev`)
  })
})
