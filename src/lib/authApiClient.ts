const AUTH_BASE_URL: string = import.meta.env.VITE_AUTH_URL ?? 'https://auth.jorisjonkers.dev'

export { AUTH_BASE_URL }

export interface AuthApiOptions {
  baseUrl: string
  credentials: RequestCredentials
  headers: Headers
  responseStyle: 'data'
  throwOnError: true
}

export function getCsrfToken(): string | null {
  if (typeof document === 'undefined') return null
  const cookie = document.cookie.split('; ').find((entry) => entry.startsWith('XSRF-TOKEN='))
  return cookie ? decodeURIComponent(cookie.slice('XSRF-TOKEN='.length)) : null
}

export function authApiOptions(includeCsrf = false): AuthApiOptions {
  const headers = new Headers()
  const csrf = includeCsrf ? getCsrfToken() : null
  if (csrf) {
    headers.set('X-XSRF-TOKEN', csrf)
  }

  return {
    baseUrl: AUTH_BASE_URL,
    credentials: 'include' as const,
    headers,
    responseStyle: 'data' as const,
    throwOnError: true as const,
  }
}

export function toRequestError(error: unknown, fallback: string): Error {
  if (error instanceof Error) return error
  if (typeof error === 'string' && error) return new Error(error)
  return new Error(fallback)
}
