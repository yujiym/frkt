import { getServerSession as getServerSessionOrg } from 'next-auth'
import { authOptions } from '../app/api/auth/[...nextauth]'

export const getServerSession = () => getServerSessionOrg(authOptions)
