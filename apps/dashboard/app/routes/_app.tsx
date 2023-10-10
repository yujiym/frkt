import DashboardLayout from '~/components/DashboardLayout'
import WagmiWrapper from '~/components/WagmiWrapper'
import { Outlet } from '@remix-run/react'
import type { LoaderFunction, LoaderFunctionArgs } from '@remix-run/cloudflare'
import { getAuthenticator } from '~/services/auth.server'

export const loader: LoaderFunction = async ({
  request,
  context,
}: LoaderFunctionArgs) => {
  const authenticator = getAuthenticator(context)
  return await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  })
}
export default function AppLayout() {
  return (
    <WagmiWrapper>
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    </WagmiWrapper>
  )
}
