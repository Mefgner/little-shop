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
    console.debug('login user')
    try {
      return await loginUser(email, password)
    } catch (e) {
      throw e
    }
  }

  const _logout = async () => {
    console.debug('logout user')
    user.value = null
    try {
      return await logoutUser()
    } catch (e) {
      throw e
    }
  }

  const _register = async (user: MinimalUser | User) => {
    console.debug('register user')
    try {
      return await registerUser(user)
    } catch (e) {
      throw e
    }
  }

  const _update = async (user: User) => {
    console.debug('update user')
    try {
      return await updateUser(user)
    } catch (e) {
      throw e
    }
  }

  const _getUserData = async () => {
    console.debug('get user data')

    if (user.value) return user.value

    try {
      const response = await getUser()
      user.value = response.data
    } catch (e) {
      throw e
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
