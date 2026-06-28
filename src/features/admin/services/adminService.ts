import type { AdminUserResponse } from '@jorisjonkers-dev/auth-api-client'
import {
  deleteUser as deleteUserRequest,
  getUser as getUserRequest,
  listUsers,
  updateRole,
  updateServicePermissions,
} from '@jorisjonkers-dev/auth-api-client'
import { SERVICE_REGISTRY } from '@/features/apps'
import { authApiOptions, toRequestError } from '@/lib/authApiClient'

export type AdminUser = AdminUserResponse

interface AuthApiResult<T> {
  data: T
}

async function runAdminRequest<T>(operation: () => Promise<AuthApiResult<T>>, fallback: string): Promise<T> {
  try {
    return (await operation()).data
  } catch (error) {
    throw toRequestError(error, fallback)
  }
}

export async function fetchUsers(): Promise<AdminUser[]> {
  return runAdminRequest(() => listUsers(authApiOptions()), 'Request failed')
}

export async function fetchUser(id: string): Promise<AdminUser> {
  return runAdminRequest(() => getUserRequest({ ...authApiOptions(), path: { id } }), 'Request failed')
}

export async function updateUserRole(id: string, role: string): Promise<AdminUser> {
  return runAdminRequest(
    () => updateRole({ ...authApiOptions(true), body: { role }, path: { id } }),
    'Request failed',
  )
}

export async function updateUserServices(id: string, services: string[]): Promise<AdminUser> {
  return runAdminRequest(
    () => updateServicePermissions({ ...authApiOptions(true), body: { services }, path: { id } }),
    'Request failed',
  )
}

export async function deleteUser(id: string): Promise<void> {
  await runAdminRequest(() => deleteUserRequest({ ...authApiOptions(true), path: { id } }), 'Request failed')
}

export const ALL_ROLES = ['ADMIN', 'USER', 'READONLY'] as const
export const ALL_SERVICES = SERVICE_REGISTRY.map((s) => s.permission)
