import {useLocalStorage} from '../hooks/useLocalStorage'

export default function authHeader() {
  const {token} = useLocalStorage()

  if (token) {
    return {Authorization: 'Bearer ' + token}
  } else {
    return {}
  }
}
