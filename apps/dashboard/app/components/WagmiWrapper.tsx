import { WagmiConfig, createConfig, mainnet } from 'wagmi'
import { createPublicClient, http } from 'viem'

const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: mainnet,
    transport: http(),
  }),
})

export default function WagmiWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
}
