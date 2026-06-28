import { me } from '@jorisjonkers-dev/auth-api-client'
import { AUTH_BASE_URL, authApiOptions, toRequestError } from '@/lib/authApiClient'
import type { AuthUser } from '../types'

export function startLoginFlow(): void {
  const redirect = encodeURIComponent(window.location.href)
  window.location.href = `${AUTH_BASE_URL}/login?redirect=${redirect}`
}

export async function checkSession(): Promise<AuthUser> {
  try {
    const payload = await me(authApiOptions())
    return {
      sub: payload.id,
      username: payload.username,
      email: payload.email,
      firstName: payload.firstName,
      lastName: payload.lastName,
      roles: payload.roles,
    }
  } catch (error) {
    throw toRequestError(error, 'Session check failed')
  }
}

export function buildLogoutUrl(): string {
  return `${AUTH_BASE_URL}/api/v1/auth/logout`
}
