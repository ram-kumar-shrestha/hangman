import {useLocalStorage} from './useLocalStorage'

export const useTokenExpire = () => {
  const {token} = useLocalStorage()

  return {
    isTokenExpired: token
      ? JSON.parse(atob(token.split('.')[1])).exp * 1000 < Date.now()
      : null,
  }
}
