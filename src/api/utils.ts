import { getAuthStatus } from '@/api/auth.ts'

// decorator used to stop brutforcing
export function loginRequired<T, A>(fn: (...args: A[]) => Promise<T> | T) {
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
