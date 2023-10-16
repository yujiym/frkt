'use client'
import DashboardLayout from '~/components/DashboardLayout'
import WagmiWrapper from '~/components/WagmiWrapper'

export default function Providers({children}: {children: React.ReactNode}}) {
  return (
    <WagmiWrapper>
      <DashboardLayout>{children}</DashboardLayout>
    </WagmiWrapper>
  )
}
