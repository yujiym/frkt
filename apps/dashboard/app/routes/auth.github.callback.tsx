import { type LoaderFunctionArgs } from '@remix-run/cloudflare'
import { getAuthenticator } from '~/services/auth.server'

export async function loader({ request, context }: LoaderFunctionArgs) {
  const authenticator = getAuthenticator(context)
  return authenticator.authenticate('github', request, {
    successRedirect: '/',
    failureRedirect: '/login',
  })
}
