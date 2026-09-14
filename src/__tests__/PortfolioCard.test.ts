import type { Project } from '../features/home/types'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { createI18n } from 'vue-i18n'
import { createMemoryHistory, createRouter } from 'vue-router'
import PortfolioCard from '../features/home/components/PortfolioCard.vue'
import en from '../i18n/locales/en'
import nl from '../i18n/locales/nl'

const i18n = createI18n({ legacy: false, locale: 'en', messages: { en, nl } })

/** The card's stretched link needs a real router to resolve `project-detail`. */
function createTestRouter() {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', component: { template: '<div />' } },
      { path: '/projects', redirect: '/' },
      { path: '/projects/:id', name: 'project-detail', component: { template: '<div />' } },
    ],
  })
}

function mountCard(project: Project) {
  return mount(PortfolioCard, {
    props: { project },
    global: { plugins: [i18n, createTestRouter()] },
  })
}

const baseProject: Project = {
  id: 'test-project',
  title: 'Test Project',
  summary: 'A one line summary.',
  description: 'A test project description.',
  highlights: ['First highlight', 'Second highlight'],
  technologies: ['Kotlin', 'Vue 3', 'Docker'],
  repos: [
    { name: 'libs/agent-kit', description: 'Generated skills and MCP server registry', url: 'https://github.com/x' },
  ],
  githubUrl: 'https://github.com/jorisjonkers/test-project',
  liveUrl: 'https://test-project.jorisjonkers.dev',
}

describe('portfolioCard', () => {
  it('renders the project title', () => {
    const wrapper = mountCard(baseProject)
    expect(wrapper.text()).toContain('Test Project')
  })

  it('renders the summary', () => {
    const wrapper = mountCard(baseProject)
    expect(wrapper.find('[data-testid="card-summary"]').text()).toBe('A one line summary.')
  })

  it('does not render the full description', () => {
    const wrapper = mountCard(baseProject)
    expect(wrapper.text()).not.toContain('A test project description.')
  })

  it('renders all technology tags', () => {
    const wrapper = mountCard(baseProject)
    for (const tag of baseProject.technologies) {
      expect(wrapper.text()).toContain(tag)
    }
  })

  it('links the whole card to the project detail page', () => {
    const wrapper = mountCard(baseProject)
    const link = wrapper.find('[data-testid="card-link"]')
    expect(link.attributes('href')).toBe('/projects/test-project')
  })

  it('does not list repositories on the card', () => {
    const wrapper = mountCard(baseProject)
    expect(wrapper.findAll('[data-testid="repo"]')).toHaveLength(0)
    expect(wrapper.text()).not.toContain('libs/agent-kit')
  })

  it('keeps the GitHub and Live links as real anchors above the overlay', () => {
    const wrapper = mountCard(baseProject)
    const githubLink = wrapper.findAll('a').find((a) => a.text() === '> github')
    const liveLink = wrapper.findAll('a').find((a) => a.text() === '> live')
    expect(githubLink?.attributes('href')).toBe(baseProject.githubUrl)
    expect(liveLink?.attributes('href')).toBe(baseProject.liveUrl)
    for (const link of [githubLink, liveLink]) {
      expect(link?.classes()).toContain('z-10')
    }
  })

  it('hides GitHub link when githubUrl is not provided', () => {
    const { githubUrl: _, ...rest } = baseProject
    const wrapper = mountCard(rest)
    const githubLink = wrapper.findAll('a').find((a) => a.text() === '> github')
    expect(githubLink).toBeUndefined()
  })

  it('hides Live link when liveUrl is not provided', () => {
    const { liveUrl: _, ...rest } = baseProject
    const wrapper = mountCard(rest)
    const liveLink = wrapper.findAll('a').find((a) => a.text() === '> live')
    expect(liveLink).toBeUndefined()
  })
})
