import { me } from '@jorisjonkers-dev/auth-api-client'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { buildLogoutUrl, checkSession, startLoginFlow } from '../features/auth/services/authService'

vi.mock('@jorisjonkers-dev/auth-api-client', () => ({
  me: vi.fn(),
}))

function clientResult<T>(data: T): { data: T; request: Request; response: Response } {
  return {
    data,
    request: new Request('https://auth.jorisjonkers.dev'),
    response: new Response(null),
  }
}

describe('startLoginFlow', () => {
  const originalLocation = window.location

  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { origin: 'http://localhost:5175', href: 'http://localhost:5175/apps' },
    })
  })

  afterEach(() => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: originalLocation,
    })
    vi.restoreAllMocks()
  })

  it('redirects to auth login page with redirect parameter', () => {
    startLoginFlow()
    expect(window.location.href).toContain('/login?redirect=')
    expect(window.location.href).toContain(encodeURIComponent('http://localhost:5175/apps'))
  })
})

describe('checkSession', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('returns user on success', async () => {
    const mockUser = {
      id: 'user-1',
      username: 'alice',
      email: 'alice@example.com',
      firstName: 'Alice',
      lastName: 'Smith',
      role: 'USER',
      roles: ['ROLE_USER'],
    }
    vi.mocked(me).mockResolvedValue(clientResult(mockUser))

    const result = await checkSession()
    expect(result.username).toBe('alice')
    expect(result.sub).toBe('user-1')
  })

  it('throws when session check fails', async () => {
    vi.mocked(me).mockRejectedValue(new Error('Session check failed: 401'))
    await expect(checkSession()).rejects.toThrow('Session check failed')
  })

  it('calls auth client with credentials included', async () => {
    const mockUser = {
      id: 'user-1',
      username: 'alice',
      email: 'alice@example.com',
      firstName: 'Alice',
      lastName: 'Smith',
      role: 'USER',
      roles: ['ROLE_USER'],
    }
    vi.mocked(me).mockResolvedValue(clientResult(mockUser))

    await checkSession()

    expect(me).toHaveBeenCalledWith(
      expect.objectContaining({ credentials: 'include' }),
    )
  })
})

describe('buildLogoutUrl', () => {
  it('returns the auth logout endpoint', () => {
    const url = buildLogoutUrl()
    expect(url).toContain('/api/v1/auth/logout')
  })
})
