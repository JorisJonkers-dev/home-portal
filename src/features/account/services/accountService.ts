import type { ChangePasswordRequest, ProfileResponse, UpdateProfileRequest } from '@jorisjonkers-dev/auth-api-client'
import {
  changePassword as changePasswordRequest,
  forgotPassword as forgotPasswordRequest,
  getProfile,
  resetPassword as resetPasswordRequest,
  updateProfile as updateProfileRequest,
} from '@jorisjonkers-dev/auth-api-client'
import { authApiOptions, toRequestError } from '@/lib/authApiClient'

export type ProfileData = ProfileResponse

interface AuthApiResult<T> {
  data: T
}

async function runAccountRequest<T>(operation: () => Promise<AuthApiResult<T>>, fallback: string): Promise<T> {
  try {
    return (await operation()).data
  } catch (error) {
    throw toRequestError(error, fallback)
  }
}

export async function fetchProfile(): Promise<ProfileData> {
  return runAccountRequest(() => getProfile(authApiOptions()), 'Request failed')
}

export async function updateProfile(data: UpdateProfileRequest): Promise<ProfileData> {
  return runAccountRequest(
    () => updateProfileRequest({ ...authApiOptions(true), body: data }),
    'Request failed',
  )
}

export async function changePassword(data: ChangePasswordRequest): Promise<void> {
  await runAccountRequest(
    () => changePasswordRequest({ ...authApiOptions(true), body: data }),
    'Request failed',
  )
}

export async function forgotPassword(email: string): Promise<void> {
  await runAccountRequest(
    () => forgotPasswordRequest({ ...authApiOptions(true), body: { email } }),
    'Request failed',
  )
}

export async function resetPassword(token: string, newPassword: string): Promise<void> {
  await runAccountRequest(
    () => resetPasswordRequest({ ...authApiOptions(true), body: { token, newPassword } }),
    'Request failed',
  )
}
