import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getAuthStatus, getUser, loginUser, logoutUser, registerUser, updateUser } from '@/api/auth'

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

  function loginRequired<T, A>(fn: (...args: A[]) => Promise<T> | T) {
    return function (...args: A[]): Promise<T | void> {
      return new Promise<T>(async (resolve, reject) => {
        const authStatus = (await getAuthStatus()).data
        console.log('authStatus', authStatus)
        if (authStatus.isAuth) {
          try {
            resolve(await fn(...args))
          } catch (error) {
            reject(error)
          }
        } else {
          reject(new Error('Not logged in'))
        }
      }).catch((err) => {
        console.info(err)
      })
    }
  }

  const _login = (email: string, password: string) => {
    console.info('login user')
    let res = null
    loginUser(email, password).then((response) => {
      res = response.data
    })
    return res
  }

  const _logout = () => {
    console.info('logout user')
    user.value = null
    logoutUser().then(() => {
      console.info('logout success')
    })
  }

  const _register = (user: MinimalUser) => {
    console.info('register user')
    let res = null
    registerUser(user).then((response) => {
      res = response.data
    })
    return res
  }

  const _update = (user: User) => {
    console.info('update user')
    let res = null
    updateUser(user).then((response) => {
      res = response.data
    })
    return res
  }

  const _getUserData = async () => {
    console.info('get user data')

    if (user.value) return user.value

    const res = await getUser()
    user.value = res.data
    return user.value
  }

  return {
    login: _login,
    logout: loginRequired<void, never>(_logout),
    register: _register,
    update: loginRequired<null, never>(_update),
    getUserData: loginRequired<User, never>(_getUserData),
  }
})
