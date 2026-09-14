import type { Project } from '../features/home/types'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { createI18n } from 'vue-i18n'
import PortfolioCard from '../features/home/components/PortfolioCard.vue'
import en from '../i18n/locales/en'
import nl from '../i18n/locales/nl'

const i18n = createI18n({ legacy: false, locale: 'en', messages: { en, nl } })

function mountCard(project: Project) {
  return mount(PortfolioCard, { props: { project }, global: { plugins: [i18n] } })
}

function project(overrides: Partial<Project> = {}): Project {
  return {
    id: 'test-project',
    title: 'Test Project',
    description: 'A test project description.',
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

describe('portfolioCard repos', () => {
  it('renders nothing when the project lists no repos', () => {
    const wrapper = mountCard(project())
    expect(wrapper.findAll('[data-testid="repo"]')).toHaveLength(0)
  })

  it('links a public repo', () => {
    const wrapper = mountCard(
      project({
        repos: [
          {
            name: 'libs/agent-kit',
            description: 'Generated skills and MCP server registry for every agent',
            url: 'https://github.com/JorisJonkers-dev/agent-kit',
          },
        ],
      }),
    )
    const repo = wrapper.find('[data-testid="repo"]')
    expect(repo.text()).toContain('libs/agent-kit')
    expect(repo.element.tagName).toBe('A')
    expect(repo.attributes('href')).toBe('https://github.com/JorisJonkers-dev/agent-kit')
    expect(repo.attributes('target')).toBe('_blank')
    expect(repo.attributes('rel')).toContain('noopener')
  })

  it('names a private repo without linking it', () => {
    const wrapper = mountCard(
      project({
        repos: [
          {
            name: 'platform/fleet-infra',
            description: 'Flux manifests and cluster bootstrapping for the whole fleet',
            private: true,
          },
        ],
      }),
    )
    const repo = wrapper.find('[data-testid="repo"]')
    expect(repo.text()).toContain('platform/fleet-infra')
    expect(repo.element.tagName).not.toBe('A')
    expect(repo.text()).toContain('private')
    expect(wrapper.find('[data-testid="repo-private"]').exists()).toBe(true)
  })

  it('renders every repo in order', () => {
    const wrapper = mountCard(
      project({
        repos: [
          {
            name: 'platform/fleet-infra',
            description: 'Flux manifests and cluster bootstrapping for the whole fleet',
            private: true,
          },
          {
            name: 'platform/flux-modules',
            description: 'Versioned Flux module packs and the shared backup scripts',
            url: 'https://github.com/JorisJonkers-dev/flux-modules',
          },
        ],
      }),
    )
    const names = wrapper.findAll('[data-testid="repo"]').map((r) => r.text())
    expect(names[0]).toContain('platform/fleet-infra')
    expect(names[1]).toContain('platform/flux-modules')
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
