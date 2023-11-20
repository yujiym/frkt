'use client'
import { Provider as StoreProvider, createStore } from 'jotai'
import WagmiWrapper from '~/components/WagmiWrapper'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider store={createStore()}>
      <WagmiWrapper>{children}</WagmiWrapper>
    </StoreProvider>
  )
}
