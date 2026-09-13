import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { createI18n } from 'vue-i18n'
import SkillsSection from '../features/home/components/SkillsSection.vue'
import { SKILL_CATEGORIES, SOFT_SKILLS } from '../features/home/data/skills'
import en from '../i18n/locales/en'
import nl from '../i18n/locales/nl'

const i18n = createI18n({ legacy: false, locale: 'en', messages: { en } })

function mountSection() {
  return mount(SkillsSection, { global: { plugins: [i18n] } })
}

describe('skillsSection', () => {
  it('renders every category heading', () => {
    const text = mountSection().text()
    for (const heading of Object.values(en.skills.categories)) {
      expect(text).toContain(heading)
    }
  })

  it('renders every skill', () => {
    const text = mountSection().text()
    for (const category of SKILL_CATEGORIES) {
      for (const skill of category.skills) expect(text).toContain(skill.name)
    }
    for (const skill of SOFT_SKILLS) expect(text).toContain(skill)
  })

  it('renders tenure bars for languages only', () => {
    const wrapper = mountSection()
    const languages = SKILL_CATEGORIES.find((c) => c.key === 'languages')!
    expect(wrapper.text()).toContain(`${languages.skills[0]?.years}y`)
    // Every other category renders pills, so no other "Ny" label appears.
    const tenures = wrapper.text().match(/\d+y/g) ?? []
    expect(tenures).toHaveLength(languages.skills.length)
  })

  it('has a Dutch heading for every category', () => {
    const dutchKeys = Object.keys(nl.skills.categories)
    for (const category of SKILL_CATEGORIES) {
      expect(dutchKeys).toContain(category.key)
    }
  })

  it('drops the retired stack', () => {
    const text = mountSection().text()
    expect(text).not.toContain('Keel')
    expect(text).not.toContain('MATLAB')
  })
})
