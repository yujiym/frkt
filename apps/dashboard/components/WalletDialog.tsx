/* eslint-disable */
'use client'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogTrigger,
} from '@@/components/ui/Dialog'
import { PanelTop } from 'lucide-react'
import { useConnect, useAccount } from 'wagmi'
import metamaskLogo from '@@/assets/img/metamask-logo.svg'
import walletConnectLogo from '@@/assets/img/walletconnect-logo.svg'

export default function WalletDialog({
  children,
}: {
  children: React.ReactNode
}) {
  const { connect, connectors } = useConnect()
  const { isConnected } = useAccount()

  const getConnector = (id: string): any => {
    const connector = connectors.find((item: any) => item.id === id)
    return { connector }
  }

  return isConnected ? (
    children
  ) : (
    <Dialog>
      <DialogTrigger className="flex h-full w-full items-center">
        {children}
      </DialogTrigger>
      {/* <DialogContent className="px-10 py-16 ">
        <DialogTitle>Connect Wallet</DialogTitle>
        <div className="mt-10 space-y-5">
          <button
            className="btn-outline flex h-14 w-full items-center justify-between px-10 py-2"
            disabled={!getConnector('injected').ready}
            onClick={() => connect(getConnector('injected'))}
          >
            <PanelTop size={28} />
            <span className="ml-2 flex-1">Browser wallet</span>
          </button>
          <button
            className="btn-outline flex h-14 w-full items-center justify-between px-10 py-2"
            disabled={!getConnector('metaMask').ready}
            onClick={() => connect(getConnector('metaMask'))}
          >
            <img src={metamaskLogo} width={28} height={28} />
            <span className="ml-2 flex-1">MetaMask</span>
          </button>
          <button
            className="btn-outline flex h-14 w-full items-center justify-between px-10 py-2"
            disabled={!getConnector('walletConnect').ready}
            onClick={() => connect(getConnector('walletConnect'))}
          >
            <img src={walletConnectLogo} width={28} height={28} />
            <span className="ml-2 flex-1">WalletConnect</span>
          </button>
        </div>
      </DialogContent> */}
    </Dialog>
  )
}
