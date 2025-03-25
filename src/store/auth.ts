import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getUser, loginUser, logoutUser, registerUser, updateUser } from '@/api/auth'
import { loginRequired } from '@/api/utils'
import type { AxiosResponse } from 'axios'

type MinimalUser = {
  id: number
  name: string
  password: string
  email: string
}

type User = MinimalUser & {
  phone: string
  privileges: 'user' | 'vip' | 'admin'
  deliveryAddress: string
  deliveryCity: string
  deliveryZipCode: string
  deliveryCountry: string
  created_at: Date
  updated_at: Date
}

export type { MinimalUser, User }

export default defineStore('auth', () => {
  const user = ref<User | null>()

  const _login = async (email: string, password: string) => {
    try {
      return await loginUser(email, password)
    } catch (e) {
      throw new Error('Failed to login')
    }
  }

  const _logout = async () => {
    user.value = null
    try {
      return await logoutUser()
    } catch (e) {
      throw new Error('Failed to logout')
    }
  }

  const _register = async (user: MinimalUser | User) => {
    try {
      return await registerUser(user)
    } catch (e) {
      throw new Error('Failed to register new user')
    }
  }

  const _update = async (user: User) => {
    try {
      return await updateUser(user)
    } catch (e) {
      throw new Error('Failed to login')
    }
  }

  const _getUserData = async () => {
    if (user.value) return user.value

    try {
      const response = await getUser()
      user.value = response.data
    } catch (e) {
      throw new Error('Failed to get user data')
    }
  }

  return {
    user: user,
    login: _login,
    logout: loginRequired<Promise<AxiosResponse>, never>(_logout),
    register: _register,
    update: loginRequired<Promise<AxiosResponse>, never>(_update),
    getUserData: loginRequired(_getUserData),
  }
})
