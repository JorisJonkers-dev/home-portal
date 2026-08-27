import { afterEach, describe, expect, it } from 'vitest'
import { authApiOptions, getCsrfToken } from '@/lib/authApiClient'

const TOKEN = '0a213898-5624-4b57-bdcc-58176a2f4efb'

function setCookie(value: string) {
  Object.defineProperty(document, 'cookie', {
    value,
    writable: true,
    configurable: true,
  })
}

afterEach(() => setCookie(''))

describe('authApiOptions', () => {
  it('reads the CSRF token from the cookie', () => {
    setCookie(`SESSION=abc; XSRF-TOKEN=${TOKEN}; JSESSIONID=def`)
    expect(getCsrfToken()).toBe(TOKEN)
  })

  it('omits the CSRF header when not requested', () => {
    setCookie(`XSRF-TOKEN=${TOKEN}`)
    expect({ ...authApiOptions().headers }).toEqual({})
  })

  // The regression this file exists for.
  //
  // The generated client merges headers as
  //   headers: { 'Content-Type': 'application/json', ...options.headers }
  // and `headers` used to be a Headers instance. Spreading one yields {} --
  // its entries are internal, not own enumerable properties -- so X-XSRF-TOKEN
  // was dropped from every mutating request and auth-api answered 401. GETs
  // were unaffected because CSRF only guards state-changing methods, and the
  // auth-api integration tests never caught it because MockMvc's `with(csrf())`
  // bypasses this client entirely.
  //
  // Asserting through a spread, rather than on the object directly, is the
  // point: reading headers['X-XSRF-TOKEN'] passes even with a Headers instance
  // in some environments, and would not have caught the bug.
  it('survives the object spread the generated client performs on it', () => {
    setCookie(`XSRF-TOKEN=${TOKEN}`)
    const merged: Record<string, string> = {
      'Content-Type': 'application/json',
      ...authApiOptions(true).headers,
    }
    expect(merged['X-XSRF-TOKEN']).toBe(TOKEN)
    expect(merged['Content-Type']).toBe('application/json')
  })

  it('sends no CSRF header when the cookie is absent', () => {
    setCookie('SESSION=abc')
    expect({ ...authApiOptions(true).headers }).toEqual({})
  })
})
