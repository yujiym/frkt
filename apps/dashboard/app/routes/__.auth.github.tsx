import { type ActionFunctionArgs } from '@remix-run/cloudflare'
import { getAuthenticator } from '~/services/auth.server'

export async function action({ request, context }: ActionFunctionArgs) {
  const authenticator = getAuthenticator(context)
  return authenticator.authenticate('github', request, {
    successRedirect: '/',
    failureRedirect: '/login',
  })
}
