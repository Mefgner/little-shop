import axios from 'axios'
import type { MinimalUser, User } from '@/store/auth.ts'

const authClient = axios.create({
  baseURL: import.meta.env.VITE_API_HOST + 'api/auth',
  withCredentials: true,
})

authClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401 && !error.config._retry) {
      try {
        error.config._retry = true
        console.info('refreshing token')
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

async function getCsrfToken() {
  const response = await authClient.get('/csrf')
  return response.data.csrfToken
}

export async function loginUser(email: string, password: string) {
  return authClient.post(
    '/login',
    {
      email: email,
      password: password,
    },
    {
      headers: {
        'X-CSRF-TOKEN': await getCsrfToken(),
      },
    },
  )
}

export async function logoutUser() {
  return authClient.post(
    '/logout',
    {},
    {
      headers: { 'X-CSRF-TOKEN': await getCsrfToken() },
    },
  )
}

export async function registerUser(userInfo: MinimalUser) {
  return authClient.post('/register', userInfo, {
    headers: { 'X-CSRF-TOKEN': await getCsrfToken() },
  })
}

export async function updateUser(userInfo: User) {
  return authClient.put('/user', userInfo, {
    headers: { 'X-CSRF-TOKEN': await getCsrfToken() },
  })
}

export async function getUser() {
  return authClient.get('/user-info')
}

export async function refreshToken() {
  return authClient.get('/refresh-access')
}
