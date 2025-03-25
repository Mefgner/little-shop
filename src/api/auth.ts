import axios, { type AxiosResponse } from 'axios'
import type { MinimalUser, User } from '@/store/auth.ts'
import Cookies from 'js-cookie'

export const authClient = axios.create({
  baseURL: import.meta.env.VITE_API_HOST + 'api/auth',
  withCredentials: true,
})

export function getAccessToken() {
  return Cookies.get('accessToken') || ''
}

export function getRefreshToken() {
  return Cookies.get('refreshToken') || ''
}

authClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401 && !error.config._retry) {
      try {
        error.config._retry = true

        if (!(await getAuthStatus()).data.couldBeRefreshed) {
          return Promise.reject(error)
        }
        console.debug('trying to refresh token')
        await refreshToken()

        return authClient.request(error.config)
      } catch (refreshError) {
        console.error('Failed to refresh token:', refreshError)
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)

type AuthStatus = { isAuth: boolean; couldBeRefreshed: boolean }

export async function getAuthStatus(): Promise<AxiosResponse<AuthStatus>> {
  return authClient.post(
    '/auth-status',
    {
      refreshToken: getRefreshToken(),
    },
    {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    },
  )
}

export async function loginUser(email: string, password: string) {
  return authClient.post('/login', {
    email: email,
    password: password,
  })
}

export async function logoutUser() {
  return authClient.post('/logout', {})
}

export async function registerUser(userInfo: MinimalUser) {
  return authClient.post('/register', userInfo)
}

export async function updateUser(userInfo: User) {
  return authClient.put('/user', userInfo, {
    headers: { Authorization: `Bearer ${getAccessToken()}` },
  })
}

export async function getUser(): Promise<AxiosResponse<User>> {
  return authClient.get('/user-info', { headers: { Authorization: `Bearer ${getAccessToken()}` } })
}

export async function refreshToken() {
  return authClient.post('/refresh-access', { refreshToken: getRefreshToken() })
}
