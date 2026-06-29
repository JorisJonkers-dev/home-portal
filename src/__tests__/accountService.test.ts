import type { ProfileResponse } from '@jorisjonkers-dev/auth-api-client'
import {
  changePassword as changePasswordRequest,
  forgotPassword as forgotPasswordRequest,
  getProfile,

  resetPassword as resetPasswordRequest,
  updateProfile as updateProfileRequest,
} from '@jorisjonkers-dev/auth-api-client'
import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  changePassword,
  fetchProfile,
  forgotPassword,
  resetPassword,
  updateProfile,
} from '../features/account/services/accountService'
import { authApiOptions } from '../lib/authApiClient'

vi.mock('@jorisjonkers-dev/auth-api-client', () => ({
  changePassword: vi.fn(),
  forgotPassword: vi.fn(),
  getProfile: vi.fn(),
  resetPassword: vi.fn(),
  updateProfile: vi.fn(),
}))

function profile(overrides: Partial<ProfileResponse> = {}): ProfileResponse {
  return {
    id: '00000000-0000-4000-8000-000000000001',
    username: 'alice',
    email: 'alice@example.com',
    firstName: 'Alice',
    lastName: 'Smith',
    role: 'USER',
    totpEnabled: false,
    createdAt: '2026-01-01T00:00:00Z',
    ...overrides,
  }
}

function clientResult<T>(data: T): { data: T; request: Request; response: Response } {
  return {
    data,
    request: new Request('https://auth.jorisjonkers.dev'),
    response: new Response(null),
  }
}

function lastHeaders(operation: ReturnType<typeof vi.fn>): Headers {
  const call = operation.mock.calls.at(-1)
  expect(call).toBeDefined()

  const headers = call?.[0]?.headers
  expect(headers).toBeInstanceOf(Headers)
  if (!(headers instanceof Headers)) {
    throw new TypeError('Expected client call to use Headers')
  }

  return headers
}

afterEach(() => {
  document.cookie = 'XSRF-TOKEN=; Max-Age=0; path=/'
  vi.clearAllMocks()
})

describe('fetchProfile', () => {
  it('fetches profile with credentials', async () => {
    vi.mocked(getProfile).mockResolvedValue(clientResult(profile()))

    const result = await fetchProfile()

    expect(result.username).toBe('alice')
    expect(getProfile).toHaveBeenCalledWith(expect.objectContaining({ credentials: 'include' }))
  })
})

describe('updateProfile', () => {
  it('sends firstName/lastName body', async () => {
    const updated = profile({ firstName: 'Bob', lastName: 'Jones' })
    vi.mocked(updateProfileRequest).mockResolvedValue(clientResult(updated))

    const result = await updateProfile({ firstName: 'Bob', lastName: 'Jones' })

    expect(result.firstName).toBe('Bob')
    expect(updateProfileRequest).toHaveBeenCalledWith(
      expect.objectContaining({ body: { firstName: 'Bob', lastName: 'Jones' }, credentials: 'include' }),
    )
  })
})

describe('changePassword', () => {
  it('sends passwords', async () => {
    vi.mocked(changePasswordRequest).mockResolvedValue(clientResult(undefined))

    await changePassword({ currentPassword: 'old123', newPassword: 'new456' })

    expect(changePasswordRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        body: { currentPassword: 'old123', newPassword: 'new456' },
        credentials: 'include',
      }),
    )
  })
})

describe('forgotPassword', () => {
  it('sends email', async () => {
    vi.mocked(forgotPasswordRequest).mockResolvedValue(clientResult({}))

    await forgotPassword('alice@example.com')

    expect(forgotPasswordRequest).toHaveBeenCalledWith(
      expect.objectContaining({ body: { email: 'alice@example.com' }, credentials: 'include' }),
    )
  })
})

describe('resetPassword', () => {
  it('sends token and newPassword', async () => {
    vi.mocked(resetPasswordRequest).mockResolvedValue(clientResult({}))

    await resetPassword('reset-token-123', 'newPass456')

    expect(resetPasswordRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        body: { token: 'reset-token-123', newPassword: 'newPass456' },
        credentials: 'include',
      }),
    )
  })
})

describe('authApiOptions', () => {
  it('includes CSRF token when requested', () => {
    document.cookie = 'XSRF-TOKEN=test-csrf-token; path=/'

    const options = authApiOptions(true)

    expect(options.headers.get('X-XSRF-TOKEN')).toBe('test-csrf-token')
  })

  it('sends CSRF token for mutating account calls', async () => {
    document.cookie = 'XSRF-TOKEN=account-token; path=/'
    vi.mocked(updateProfileRequest).mockResolvedValue(clientResult(profile({ firstName: 'Bob', lastName: 'Jones' })))

    await updateProfile({ firstName: 'Bob', lastName: 'Jones' })

    expect(lastHeaders(vi.mocked(updateProfileRequest)).get('X-XSRF-TOKEN')).toBe('account-token')
  })
})
