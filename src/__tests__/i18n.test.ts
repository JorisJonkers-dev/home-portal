import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// getSavedLocale runs at import time, so each case has to set the environment
// up and then load the module fresh.
async function loadI18n(): Promise<typeof import('../i18n')> {
  vi.resetModules()
  return import('../i18n')
}

function setNavigatorLanguage(language: string): void {
  Object.defineProperty(window.navigator, 'language', {
    configurable: true,
    value: language,
  })
}

describe('locale selection at startup', () => {
  beforeEach(() => {
    localStorage.clear()
    setNavigatorLanguage('en-GB')
  })

  afterEach(() => {
    localStorage.clear()
  })

  it('uses a stored locale when it is one this app supports', async () => {
    localStorage.setItem('ps_locale', 'nl')
    setNavigatorLanguage('en-GB')
    const { i18n } = await loadI18n()
    expect(i18n.global.locale.value).toBe('nl')
  })

  it('prefers the stored locale over the browser language', async () => {
    localStorage.setItem('ps_locale', 'en')
    setNavigatorLanguage('nl-NL')
    const { i18n } = await loadI18n()
    expect(i18n.global.locale.value).toBe('en')
  })

  it('ignores a stored value that is not a supported locale', async () => {
    // A stale or hand-edited key must not select an unsupported locale.
    localStorage.setItem('ps_locale', 'de')
    setNavigatorLanguage('nl-NL')
    const { i18n } = await loadI18n()
    expect(i18n.global.locale.value).toBe('nl')
  })

  it('falls back to Dutch for any nl browser language, including regional variants', async () => {
    for (const language of ['nl', 'nl-NL', 'NL-be']) {
      localStorage.clear()
      setNavigatorLanguage(language)
      const { i18n } = await loadI18n()
      expect(i18n.global.locale.value).toBe('nl')
    }
  })

  it('falls back to English for any other browser language', async () => {
    for (const language of ['en-US', 'de-DE', 'fr-BE', 'zh']) {
      localStorage.clear()
      setNavigatorLanguage(language)
      const { i18n } = await loadI18n()
      expect(i18n.global.locale.value).toBe('en')
    }
  })

  it('declares English as the fallback locale', async () => {
    const { i18n } = await loadI18n()
    expect(i18n.global.fallbackLocale.value).toBe('en')
  })

  it('registers both message catalogues', async () => {
    const { i18n } = await loadI18n()
    expect(Object.keys(i18n.global.messages.value).sort()).toEqual(['en', 'nl'])
  })
})

describe('setLocale', () => {
  beforeEach(() => {
    localStorage.clear()
    setNavigatorLanguage('en-GB')
  })

  it('switches the active locale', async () => {
    const { i18n, setLocale } = await loadI18n()
    setLocale('nl')
    expect(i18n.global.locale.value).toBe('nl')
  })

  it('persists the choice so the next visit keeps it', async () => {
    const { setLocale } = await loadI18n()
    setLocale('nl')
    expect(localStorage.getItem('ps_locale')).toBe('nl')
  })

  it('updates the document language for assistive technology and hyphenation', async () => {
    const { setLocale } = await loadI18n()
    setLocale('nl')
    expect(document.documentElement.lang).toBe('nl')
  })

  it('round-trips back to English', async () => {
    const { i18n, setLocale } = await loadI18n()
    setLocale('nl')
    setLocale('en')
    expect(i18n.global.locale.value).toBe('en')
    expect(localStorage.getItem('ps_locale')).toBe('en')
    expect(document.documentElement.lang).toBe('en')
  })
})
