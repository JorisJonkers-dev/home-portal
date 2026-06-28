import type { AuthUser } from '../features/auth'
import { createPinia, setActivePinia } from 'pinia'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { buildLogoutUrl, checkSession } from '../features/auth/services/authService'
import { useAuthStore } from '../features/auth/stores/auth'

vi.mock('../features/auth/services/authService', () => ({
  buildLogoutUrl: vi.fn(() => 'https://auth.jorisjonkers.dev/api/v1/auth/logout'),
  checkSession: vi.fn(),
  startLoginFlow: vi.fn(),
}))

function authUser(overrides: Partial<AuthUser> = {}): AuthUser {
  return {
    sub: 'user-1',
    username: 'alice',
    email: 'alice@example.com',
    firstName: 'Alice',
    lastName: 'Smith',
    roles: ['ROLE_USER'],
    ...overrides,
  }
}

describe('auth store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { origin: 'http://localhost:5175', href: '' },
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('is not authenticated when no session is loaded', () => {
    const store = useAuthStore()
    expect(store.isAuthenticated).toBe(false)
    expect(store.user).toBeNull()
  })

  it('fetchSession sets user and roles on success', async () => {
    vi.mocked(checkSession).mockResolvedValue(authUser({ roles: ['ROLE_USER', 'SERVICE_GRAFANA'] }))

    const store = useAuthStore()
    await store.fetchSession()

    expect(store.isAuthenticated).toBe(true)
    expect(store.user?.username).toBe('alice')
    expect(store.servicePermissions).toContain('GRAFANA')
  })

  it('isAdmin is true when ROLE_ADMIN is in roles', async () => {
    vi.mocked(checkSession).mockResolvedValue(
      authUser({ sub: 'admin-1', username: 'admin', email: 'admin@example.com', roles: ['ROLE_ADMIN'] }),
    )

    const store = useAuthStore()
    await store.fetchSession()

    expect(store.isAdmin).toBe(true)
  })

  it('isAdmin is false when no ROLE_ADMIN in roles', async () => {
    vi.mocked(checkSession).mockResolvedValue(authUser({ sub: 'u1', roles: ['ROLE_USER', 'SERVICE_GRAFANA'] }))

    const store = useAuthStore()
    await store.fetchSession()

    expect(store.isAdmin).toBe(false)
  })

  it('logout clears user state and redirects', async () => {
    vi.mocked(checkSession).mockResolvedValue(authUser({ roles: ['ROLE_USER'] }))

    const store = useAuthStore()
    await store.fetchSession()

    store.logout()

    expect(store.isAuthenticated).toBe(false)
    expect(store.user).toBeNull()
    expect(buildLogoutUrl).toHaveBeenCalled()
    expect(window.location.href).toContain('/api/v1/auth/logout')
  })

  it('servicePermissions filters only SERVICE_ prefixed roles', async () => {
    vi.mocked(checkSession).mockResolvedValue(
      authUser({ sub: 'u1', roles: ['ROLE_USER', 'ROLE_ADMIN', 'SERVICE_GRAFANA', 'SERVICE_VAULT'] }),
    )

    const store = useAuthStore()
    await store.fetchSession()

    expect(store.servicePermissions).toEqual(['GRAFANA', 'VAULT'])
    expect(store.servicePermissions).not.toContain('USER')
    expect(store.servicePermissions).not.toContain('ADMIN')
  })

  it('fetchSession throws on failed session check', async () => {
    vi.mocked(checkSession).mockRejectedValue(new Error('Session check failed'))

    const store = useAuthStore()
    await expect(store.fetchSession()).rejects.toThrow('Session check failed')
  })
})
