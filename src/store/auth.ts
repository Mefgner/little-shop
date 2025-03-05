import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginUser, registerUser, updateUser, getUser, logoutUser } from '@/api/auth'

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

  function errorCatcher<T>(p: Promise<T>) {
    return p.catch((error) => {
      console.log('Error occurred: ', error?.status)
      return Promise.reject(error)
    })
  }

  function login(email: string, password: string) {
    console.info('login user')
    let res = null
    errorCatcher(loginUser(email, password)).then((response) => {
      res = response.data
    })
    return res
  }

  function logout() {
    console.info('logout user')
    user.value = null
    errorCatcher(logoutUser()).then(() => {
      console.info('logout success')
    })
  }

  function register(user: MinimalUser) {
    console.info('register user')
    let res = null
    errorCatcher(registerUser(user)).then((response) => {
      res = response.data
    })
    return res
  }

  function update(user: User) {
    console.info('update user')
    let res = null
    errorCatcher(updateUser(user)).then((response) => {
      res = response.data
    })
    return res
  }

  async function getUserData() {
    console.info('get user data')

    if (user.value) return user.value

    const res = await errorCatcher(getUser())
    user.value = res.data
    return user.value
  }

  return {
    login,
    logout,
    register,
    update,
    getUserData,
  }
})
