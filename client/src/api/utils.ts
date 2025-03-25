import { getAuthStatus, refreshToken } from '@/api/auth.ts'

// decorator used to stop bruteforce
export function loginRequired<T, A>(fn: (...args: A[]) => Promise<T> | T) {
  return async function (...args: A[]): Promise<T | void> {
    return new Promise<T>(async (resolve, reject) => {
      const authStatus = (await getAuthStatus()).data
      // console.info('authStatus', authStatus)
      if (authStatus.isAuth) {
        try {
          resolve(await fn(...args))
        } catch (error) {
          reject(error)
        }
      } else if (authStatus.couldBeRefreshed) {
        try {
          await refreshToken()
          resolve(await fn(...args))
        } catch (error) {
          reject(error)
        }
      } else {
        reject(new Error('Not logged in'))
      }
    }).catch((err) => {
      console.debug(err)
    })
  }
}
