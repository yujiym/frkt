import { redirect } from 'next/navigation'
import { auth } from '~/auth'

export default async function useAuth() {
  const session = await auth()
  if (!session) redirect('/login')
  return session
}
