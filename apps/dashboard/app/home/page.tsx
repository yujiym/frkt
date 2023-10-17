'use client'
import { useAccount, useConnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

export default function Home() {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })

  return (
    <>
      <div className="flex items-center justify-center bg-yellow-100 px-4 pb-16 pt-16">
        <h2 className="text-center text-3xl font-bold">
          <p className="mb-3 text-5xl">👋</p>
          Welcome to FRKT
        </h2>
      </div>
      <div className="mx-auto max-w-2xl px-6 py-12">
        <div>
          <button
            className="btn-outline w-full px-8 py-5"
            onClick={() => connect()}
          >
            <span className="mr-4 text-xl font-bold uppercase">1.</span>
            <span className="text-xl">
              {isConnected ? `Linked with ${address}` : 'Link wallet'}
            </span>
          </button>
        </div>
        <div className="my-4 text-center text-xl">&#9661;</div>
        <div>
          <a href="/apps" className="btn-outline w-full px-8 py-5">
            <span className="mr-4 text-xl font-bold uppercase">2.</span>
            <span className="text-xl">Create app & configure</span>
          </a>
        </div>
        <div className="my-4 text-center text-xl">&#9661;</div>
        <div>
          <a href="/recipes" className="btn-outline w-full px-8 py-5">
            <span className="mr-4 text-xl font-bold uppercase">3.</span>
            <span className="text-xl">
              Setup recipe & integrate into your app
            </span>
          </a>
        </div>
        <div className="my-4 text-center text-xl">&#9661;</div>
        <div className="py-8 text-center text-5xl">🎉</div>
      </div>
    </>
  )
}
