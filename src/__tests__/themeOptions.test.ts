import { describe, expect, it, vi } from 'vitest'
import { personalStackThemeOptions, useTheme } from '../lib/vueWebCommons'

vi.mock('@jorisjonkers-dev/vue-web-commons', () => ({
  useTheme: vi.fn((options: unknown) => ({ options })),
}))

describe('personalStackThemeOptions', () => {
  it('namespaces the storage key so it cannot collide with another app on the domain', () => {
    // Every app under jorisjonkers.dev shares localStorage, so the ps_ prefix
    // is load-bearing rather than cosmetic.
    expect(personalStackThemeOptions.storageKey).toBe('ps_theme')
  })

  it('defaults to following the operating system', () => {
    expect(personalStackThemeOptions.defaultMode).toBe('system')
  })

  it('allows exactly light, dark and system', () => {
    expect([...personalStackThemeOptions.allowedModes].sort()).toEqual(['dark', 'light', 'system'])
  })

  it('drives the theme through data-theme and the dark class', () => {
    // The published pages read data-theme, and Tailwind reads the class; both
    // have to be set or one of the two styling paths goes stale.
    expect(personalStackThemeOptions.attribute).toBe('data-theme')
    expect(personalStackThemeOptions.className).toBe('dark')
  })

  it('targets the document element when a document exists', () => {
    expect(personalStackThemeOptions.target()).toBe(document.documentElement)
  })

  it('returns no target when there is no document, so server-side rendering does not throw', () => {
    const original = globalThis.document
    // @ts-expect-error deliberately removing document to exercise the guard
    delete globalThis.document
    try {
      expect(personalStackThemeOptions.target()).toBeNull()
    } finally {
      globalThis.document = original
    }
  })
})

describe('useTheme', () => {
  it('applies this app\'s options rather than the library defaults', async () => {
    const commons = await import('@jorisjonkers-dev/vue-web-commons')
    useTheme()
    expect(commons.useTheme).toHaveBeenCalledWith(personalStackThemeOptions)
  })
})
