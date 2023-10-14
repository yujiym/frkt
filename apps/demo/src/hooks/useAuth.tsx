import { useAuthState, useSignOut } from 'react-firebase-hooks/auth'
import { auth } from '../utils/firebase'

export default function useAuth() {
  const [user, loading, error] = useAuthState(auth)
  const [signOut] = useSignOut(auth)

  return {
    user,
    logout: signOut,
    loading,
    error,
  }
}
