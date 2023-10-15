import { WagmiConfig, createConfig, mainnet } from 'wagmi'
import { createPublicClient, http } from 'viem'

// import { alchemyProvider } from 'wagmi/providers/alchemy'
// import { publicProvider } from 'wagmi/providers/public'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

const config = (env: any) =>
  createConfig({
    autoConnect: true,
    connectors: [
      new MetaMaskConnector({ chains: [mainnet] }),
      new WalletConnectConnector({
        chains: [mainnet],
        options: {
          projectId: env.WALLET_CONNECT_PROJECT_ID,
        },
      }),
      new InjectedConnector({
        chains: [mainnet],
        options: {
          name: 'Injected',
          shimDisconnect: true,
        },
      }),
    ],
    publicClient: createPublicClient({
      chain: mainnet,
      transport: http(
        `https://eth-mainnet.g.alchemy.com/v2/${env.ALCHEMY_API_KEY}`
      ),
    }),
  })

export default function WagmiWrapper({
  env,
  children,
}: {
  env: any
  children: React.ReactNode
}) {
  return <WagmiConfig config={config(env)}>{children}</WagmiConfig>
}
