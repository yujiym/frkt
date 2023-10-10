import {
  redirect,
  type ActionFunctionArgs,
  type ActionFunction,
  type LoaderFunction,
} from '@remix-run/cloudflare'
import { getAuthenticator } from '~/services/auth.server'

export const loader: LoaderFunction = async () => redirect('/login')

export const action: ActionFunction = async ({
  request,
  context,
}: ActionFunctionArgs) => {
  const authenticator = getAuthenticator(context)
  return await authenticator.logout(request, { redirectTo: '/login' })
}
