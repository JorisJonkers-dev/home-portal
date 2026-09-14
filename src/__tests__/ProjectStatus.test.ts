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
    routes: [{ path: '/projects/:id', name: 'project-detail', component: { template: '<div />' } }],
  })
}

function mountCard(project: Project) {
  return mount(PortfolioCard, {
    props: { project },
    global: { plugins: [i18n, createTestRouter()] },
  })
}

function project(overrides: Partial<Project> = {}): Project {
  return {
    id: 'test-project',
    title: 'Test Project',
    summary: 'A one line summary.',
    description: 'A test project description.',
    highlights: ['First highlight'],
    technologies: ['Kotlin'],
    ...overrides,
  }
}

describe('portfolioCard status', () => {
  it('renders no pill for a production project', () => {
    const wrapper = mountCard(project())
    expect(wrapper.find('[data-testid="status-pill"]').exists()).toBe(false)
  })

  it('renders no pill when status is explicitly production', () => {
    const wrapper = mountCard(project({ status: 'production' }))
    expect(wrapper.find('[data-testid="status-pill"]').exists()).toBe(false)
  })

  it('renders an amber pill for an in-progress project', () => {
    const wrapper = mountCard(project({ status: 'in-progress' }))
    const pill = wrapper.find('[data-testid="status-pill"]')
    expect(pill.exists()).toBe(true)
    expect(pill.text()).toBe('in progress')
    expect(pill.classes()).toContain('text-terminal-amber')
  })

  it('renders a grey pill for a parked project', () => {
    const wrapper = mountCard(project({ status: 'parked' }))
    const pill = wrapper.find('[data-testid="status-pill"]')
    expect(pill.exists()).toBe(true)
    expect(pill.text()).toBe('parked')
    expect(pill.classes()).toContain('text-[var(--color-text-subtle)]')
  })
})

describe('portfolioCard status is translated', () => {
  it('renders the Dutch status label after a locale switch', async () => {
    const wrapper = mountCard(project({ status: 'parked' }))
    expect(wrapper.find('[data-testid="status-pill"]').text()).toBe('parked')

    i18n.global.locale.value = 'nl'
    await wrapper.vm.$nextTick()

    expect(wrapper.find('[data-testid="status-pill"]').text()).toBe('geparkeerd')
    i18n.global.locale.value = 'en'
  })
})
