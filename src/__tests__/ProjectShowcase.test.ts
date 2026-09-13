import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { createI18n } from 'vue-i18n'
import ProjectShowcase from '../features/home/components/ProjectShowcase.vue'
import { PROJECTS } from '../features/home/data/projects'
import en from '../i18n/locales/en'
import nl from '../i18n/locales/nl'

const i18n = createI18n({ legacy: false, locale: 'en', messages: { en, nl } })

describe('projectShowcase', () => {
  it('renders every project', () => {
    const wrapper = mount(ProjectShowcase, { global: { plugins: [i18n] } })
    expect(wrapper.findAll('[data-testid="card"]')).toHaveLength(PROJECTS.length)
  })

  it('renders in the fixed card order', () => {
    const wrapper = mount(ProjectShowcase, { global: { plugins: [i18n] } })
    const paths = wrapper.findAll('[data-testid="card-path"]').map((n) => n.text())
    expect(paths).toEqual(PROJECTS.map((p) => `~/projects/${p.id}`))
  })

  it('re-renders in Dutch after a locale switch', async () => {
    const wrapper = mount(ProjectShowcase, { global: { plugins: [i18n] } })
    const dutchTitle = nl.projects.entries.knowledge.title
    expect(wrapper.text()).toContain('Knowledge System')

    i18n.global.locale.value = 'nl'
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain(dutchTitle)
    expect(wrapper.text()).not.toContain('A k3s cluster on NixOS spanning seven nodes')
    i18n.global.locale.value = 'en'
  })
})
