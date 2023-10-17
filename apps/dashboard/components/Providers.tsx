'use client'
import { Provider as StoreProvider } from 'jotai'
import { SessionProvider } from 'next-auth/react'
import WagmiWrapper from '~components/WagmiWrapper'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <StoreProvider>
        <WagmiWrapper>{children}</WagmiWrapper>
      </StoreProvider>
    </SessionProvider>
  )
}
