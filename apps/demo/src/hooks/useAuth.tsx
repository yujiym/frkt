import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../utils/firebase'

export default function useAuth() {
  const [user, loading, error] = useAuthState(auth)

  return {
    user,
    logout: auth.signOut,
    loading,
    error,
  }
}
