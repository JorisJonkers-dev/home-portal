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

  it('renders tenure bars for the hands-on categories only', () => {
    const wrapper = mountSection()
    const bars = SKILL_CATEGORIES.filter((c) => c.display === 'bars')
    const withYears = bars.flatMap((c) => c.skills).filter((s) => s.years)
    // One "Ny" label per bar; pill categories contribute none.
    const tenures = wrapper.text().match(/\d+y/g) ?? []
    expect(tenures).toHaveLength(withYears.length)
    expect(bars.map((c) => c.key)).toEqual(['languages', 'frameworks'])
  })

  it('gives every bar skill a year and every pill skill none', () => {
    for (const category of SKILL_CATEGORIES) {
      for (const skill of category.skills) {
        if (category.display === 'bars') {
          expect(skill.years, `${skill.name} is a bar but has no years`).toBeTypeOf('number')
        } else {
          expect(skill.years, `${skill.name} is a pill but has years`).toBeUndefined()
        }
      }
    }
  })

  it('keeps runtimes out of the frameworks category', () => {
    const frameworks = SKILL_CATEGORIES.find((c) => c.key === 'frameworks')!
    const names = frameworks.skills.map((s) => s.name)
    for (const runtime of ['k3s', 'NixOS', 'Nomad', 'Docker']) {
      expect(names, `${runtime} is not a framework`).not.toContain(runtime)
    }
  })

  it('keeps JavaScript and TypeScript on one row', () => {
    const languages = SKILL_CATEGORIES.find((c) => c.key === 'languages')!
    expect(languages.skills.map((s) => s.name)).toContain('JavaScript / TypeScript')
    expect(languages.skills).toHaveLength(7)
  })

  it('has a Dutch heading for every category', () => {
    const dutchKeys = Object.keys(nl.skills.categories)
    for (const category of SKILL_CATEGORIES) {
      expect(dutchKeys).toContain(category.key)
    }
  })

  it('lists each skill in exactly one category', () => {
    const names = SKILL_CATEGORIES.flatMap((c) => c.skills.map((s) => s.name))
    const duplicates = names.filter((n, i) => names.indexOf(n) !== i)
    expect(duplicates, `duplicated skills: ${duplicates.join(', ')}`).toEqual([])
  })

  it('drops the retired stack', () => {
    const text = mountSection().text()
    expect(text).not.toContain('Keel')
    expect(text).not.toContain('MATLAB')
  })
})
