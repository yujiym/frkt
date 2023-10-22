import Layout from '../components/Layout'

export default function Home() {
  return (
    <Layout hideHeader>
      <div className="bg-pink-600 px-6 py-32 text-white">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-dot mb-6 text-8xl font-bold">FRKT demos</h2>
          <p className="text-2xl">
            <a href="https://frkt.io" target="_blank" className="underline">
              FRKT
            </a>{' '}
            integration demos for ETHOnline 2023
          </p>
        </div>
      </div>
      <div className="bg-green-50 px-6 py-28 text-gray-600">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-6 text-3xl font-black">🖼️ Mint Omnichain NFT</h2>
          <p className="mb-14">widget description here</p>
          <a
            className="rounded-full bg-gray-500 px-12 py-4 text-white hover:opacity-90"
            href="/nft-mint"
          >
            Try this
          </a>
        </div>
      </div>
      <div className="bg-blue-300 px-6 py-28 text-white">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-6 text-3xl font-black">🖋 Sign Document Onchain</h2>
          <p className="mb-14">widget description here</p>
          <a
            className="rounded-full bg-blue-500 px-12 py-4 normal-case text-white hover:opacity-90"
            href="/sign-document"
          >
            Try this
          </a>
        </div>
      </div>
      {/* <div className="bg-purple-100 px-6 py-28 text-stone-600">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-6 text-3xl font-black">Demo 3</h2>
          <p className="mb-14">widget description here</p>
          <a
            className="rounded-full bg-violet-500 px-12 py-4 text-white hover:opacity-90"
            href="/"
          >
            Try this
          </a>
        </div>
      </div>
      <div className="bg-slate-400 px-6 py-28 text-white">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-6 text-3xl font-black">Demo 4</h2>
          <p className="mb-14">widget description here</p>
          <a
            className="rounded-full bg-slate-500 px-12 py-4 normal-case text-white hover:opacity-90"
            href="/"
          >
            Try this
          </a>
        </div>
      </div> */}
    </Layout>
  )
}
