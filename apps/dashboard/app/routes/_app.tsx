import {
  json,
  type LoaderFunction,
  LoaderFunctionArgs,
} from '@remix-run/cloudflare'
import { Outlet, useLoaderData } from '@remix-run/react'
import DashboardLayout from '~/components/DashboardLayout'
import WagmiWrapper from '~/components/WagmiWrapper'
import { getAuthenticator } from '~/services/auth.server'

export const loader: LoaderFunction = async ({
  request,
  context,
}: LoaderFunctionArgs) => {
  const authenticator = getAuthenticator(context)
  const [env, auth] = await Promise.all([
    STORE_KV.get('env', 'json'),
    authenticator.isAuthenticated(request, {
      failureRedirect: '/login',
    }),
  ])
  // // const env = await STORE_KV.get('env', 'json')
  // // const auth = await authenticator.isAuthenticated(request, {
  //   failureRedirect: '/login',
  // })
  return json({ env })
}

export default function AppLayout() {
  const { env } = useLoaderData<any>()

  return (
    <WagmiWrapper env={env}>
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    </WagmiWrapper>
  )
}
