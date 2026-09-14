import { describe, expect, it } from 'vitest'
import { PROJECTS } from '../features/home/data/projects'
import { ALL_SKILL_NAMES } from '../features/home/data/skills'
import en from '../i18n/locales/en'
import nl from '../i18n/locales/nl'

type Entries = Record<string, { title?: string; description?: string; summary?: string; highlights?: string[] }>

const enEntries: Entries = en.projects.entries
const nlEntries: Entries = nl.projects.entries

describe('project prose', () => {
  it('has an English title and description for every project', () => {
    for (const project of PROJECTS) {
      const entry = enEntries[project.id]
      expect(entry, `missing EN entry for ${project.id}`).toBeDefined()
      expect(entry?.title, `missing EN title for ${project.id}`).toBeTruthy()
      expect(entry?.description, `missing EN description for ${project.id}`).toBeTruthy()
    }
  })

  it('has a Dutch title and description for every project', () => {
    for (const project of PROJECTS) {
      const entry = nlEntries[project.id]
      expect(entry, `missing NL entry for ${project.id}`).toBeDefined()
      expect(entry?.title, `missing NL title for ${project.id}`).toBeTruthy()
      expect(entry?.description, `missing NL description for ${project.id}`).toBeTruthy()
    }
  })

  it('has an English summary and highlights for every project', () => {
    for (const project of PROJECTS) {
      const entry = enEntries[project.id]
      expect(entry, `missing EN entry for ${project.id}`).toBeDefined()
      expect(entry?.summary, `missing EN summary for ${project.id}`).toBeTruthy()
      expect(entry?.highlights, `missing EN highlights for ${project.id}`).toBeDefined()
      expect(entry?.highlights?.length, `empty EN highlights for ${project.id}`).toBeGreaterThan(0)
    }
  })

  it('has a Dutch summary and highlights for every project', () => {
    for (const project of PROJECTS) {
      const entry = nlEntries[project.id]
      expect(entry, `missing NL entry for ${project.id}`).toBeDefined()
      expect(entry?.summary, `missing NL summary for ${project.id}`).toBeTruthy()
      expect(entry?.highlights, `missing NL highlights for ${project.id}`).toBeDefined()
      expect(entry?.highlights?.length, `empty NL highlights for ${project.id}`).toBeGreaterThan(0)
    }
  })

  it('has no locale entry for a project that no longer exists', () => {
    const ids = new Set(PROJECTS.map((p) => p.id))
    for (const [id, entry] of Object.entries(enEntries)) {
      expect(ids.has(id), `EN entry ${id} has no project`).toBe(true)
      expect(entry).toBeDefined()
    }
    for (const id of Object.keys(nlEntries)) {
      expect(ids.has(id), `NL entry ${id} has no project`).toBe(true)
    }
  })

  it('keeps both locales in step', () => {
    expect(Object.keys(nlEntries).sort()).toEqual(Object.keys(enEntries).sort())
  })
})

describe('project tag vocabulary', () => {
  it('uses only tags that appear in the skills section', () => {
    const known = new Set(ALL_SKILL_NAMES)
    for (const project of PROJECTS) {
      for (const tag of project.technologies) {
        expect(known.has(tag), `tag "${tag}" on ${project.id} is not a listed skill`).toBe(true)
      }
    }
  })
})

describe('project repos', () => {
  it('describes every repo', () => {
    for (const project of PROJECTS) {
      for (const repo of project.repos ?? []) {
        expect(repo.description.trim(), `${repo.name} has no description`).not.toBe('')
      }
    }
  })

  it('never links a private repo', () => {
    for (const project of PROJECTS) {
      for (const repo of project.repos ?? []) {
        if (repo.private) expect(repo.url, `${repo.name} is private and linked`).toBeUndefined()
      }
    }
  })

  it('links every public repo', () => {
    for (const project of PROJECTS) {
      for (const repo of project.repos ?? []) {
        if (!repo.private) expect(repo.url, `${repo.name} is public but unlinked`).toBeTruthy()
      }
    }
  })

  it('uses unique project ids', () => {
    const ids = PROJECTS.map((p) => p.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})
