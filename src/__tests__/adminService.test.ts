import type { AdminUserResponse } from '@jorisjonkers-dev/auth-api-client'
import {

  deleteUser as deleteUserRequest,
  listUsers,
  updateRole,
  updateServicePermissions,
} from '@jorisjonkers-dev/auth-api-client'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { deleteUser, fetchUsers, updateUserRole, updateUserServices } from '../features/admin/services/adminService'

vi.mock('@jorisjonkers-dev/auth-api-client', () => ({
  deleteUser: vi.fn(),
  getUser: vi.fn(),
  listUsers: vi.fn(),
  updateRole: vi.fn(),
  updateServicePermissions: vi.fn(),
}))

function adminUser(overrides: Partial<AdminUserResponse> = {}): AdminUserResponse {
  return {
    id: '00000000-0000-4000-8000-000000000001',
    username: 'alice',
    email: 'alice@example.com',
    firstName: 'Alice',
    lastName: 'Smith',
    role: 'USER',
    emailConfirmed: true,
    totpEnabled: false,
    servicePermissions: [],
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

describe('fetchUsers', () => {
  it('returns list of users', async () => {
    const users = [adminUser()]
    vi.mocked(listUsers).mockResolvedValue(clientResult(users))
    const result = await fetchUsers()
    expect(result).toHaveLength(1)
    expect(result[0]?.username).toBe('alice')
  })

  it('throws on client error', async () => {
    vi.mocked(listUsers).mockRejectedValue(new Error('Request failed: 403'))
    await expect(fetchUsers()).rejects.toThrow('Request failed: 403')
  })
})

describe('updateUserRole', () => {
  it('sends PATCH request and returns updated user', async () => {
    const updated = adminUser({ role: 'ADMIN' })
    vi.mocked(updateRole).mockResolvedValue(clientResult(updated))
    const result = await updateUserRole('1', 'ADMIN')
    expect(result.role).toBe('ADMIN')
  })
})

describe('updateUserServices', () => {
  it('sends PUT request and returns updated user', async () => {
    const updated = adminUser({ servicePermissions: ['GRAFANA'] })
    vi.mocked(updateServicePermissions).mockResolvedValue(clientResult(updated))
    const result = await updateUserServices('1', ['GRAFANA'])
    expect(result.servicePermissions).toContain('GRAFANA')
  })
})

describe('deleteUser', () => {
  it('sends DELETE request without error', async () => {
    vi.mocked(deleteUserRequest).mockResolvedValue(clientResult(undefined))
    await expect(deleteUser('1')).resolves.toBeUndefined()
  })

  it('throws on client error', async () => {
    vi.mocked(deleteUserRequest).mockRejectedValue(new Error('Request failed: 404'))
    await expect(deleteUser('1')).rejects.toThrow('Request failed: 404')
  })
})

describe('request details', () => {
  it('fetchUsers calls client with credentials', async () => {
    vi.mocked(listUsers).mockResolvedValue(clientResult([]))
    await fetchUsers()

    expect(listUsers).toHaveBeenCalledWith(expect.objectContaining({ credentials: 'include' }))
  })

  it('updateUserRole sends role body and path', async () => {
    vi.mocked(updateRole).mockResolvedValue(clientResult(adminUser({ role: 'ADMIN' })))
    await updateUserRole('1', 'ADMIN')

    expect(updateRole).toHaveBeenCalledWith(
      expect.objectContaining({ body: { role: 'ADMIN' }, credentials: 'include', path: { id: '1' } }),
    )
  })

  it('updateUserRole sends CSRF header when token cookie exists', async () => {
    document.cookie = 'XSRF-TOKEN=test-csrf-token; path=/'
    vi.mocked(updateRole).mockResolvedValue(clientResult(adminUser({ role: 'ADMIN' })))

    await updateUserRole('1', 'ADMIN')

    expect(lastHeaders(vi.mocked(updateRole)).get('X-XSRF-TOKEN')).toBe('test-csrf-token')
  })

  it('updateUserServices sends services array', async () => {
    vi.mocked(updateServicePermissions).mockResolvedValue(
      clientResult(adminUser({ servicePermissions: ['GRAFANA', 'VAULT'] })),
    )
    await updateUserServices('1', ['GRAFANA', 'VAULT'])

    expect(updateServicePermissions).toHaveBeenCalledWith(
      expect.objectContaining({
        body: { services: ['GRAFANA', 'VAULT'] },
        credentials: 'include',
        path: { id: '1' },
      }),
    )
  })

  it('deleteUser sends path', async () => {
    vi.mocked(deleteUserRequest).mockResolvedValue(clientResult(undefined))
    await deleteUser('42')

    expect(deleteUserRequest).toHaveBeenCalledWith(
      expect.objectContaining({ credentials: 'include', path: { id: '42' } }),
    )
  })

  it('deleteUser sends CSRF header when token cookie exists', async () => {
    document.cookie = 'XSRF-TOKEN=delete-token; path=/'
    vi.mocked(deleteUserRequest).mockResolvedValue(clientResult(undefined))

    await deleteUser('42')

    expect(lastHeaders(vi.mocked(deleteUserRequest)).get('X-XSRF-TOKEN')).toBe('delete-token')
  })

  it('all requests use credentials include', async () => {
    vi.mocked(listUsers).mockResolvedValue(clientResult([]))
    await fetchUsers()
    expect(listUsers).toHaveBeenCalledWith(expect.objectContaining({ credentials: 'include' }))

    vi.mocked(updateRole).mockResolvedValue(clientResult(adminUser()))
    await updateUserRole('1', 'USER')
    expect(updateRole).toHaveBeenCalledWith(expect.objectContaining({ credentials: 'include' }))

    vi.mocked(updateServicePermissions).mockResolvedValue(clientResult(adminUser()))
    await updateUserServices('1', [])
    expect(updateServicePermissions).toHaveBeenCalledWith(expect.objectContaining({ credentials: 'include' }))

    vi.mocked(deleteUserRequest).mockResolvedValue(clientResult(undefined))
    await deleteUser('1')
    expect(deleteUserRequest).toHaveBeenCalledWith(expect.objectContaining({ credentials: 'include' }))
  })
})
