import Layout from '../components/Layout'

export default function Home() {
  return (
    <Layout hideHeader>
      <div className="bg-pink-500 text-white py-32 px-6">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-dot font-bold text-8xl mb-6">FRKT demos</h2>
          <p className="text-2xl">
            <a href="https://frkt.io" target="_blank" className="underline">
              FRKT
            </a>{' '}
            integration demos for ETHOnline 2023
          </p>
        </div>
      </div>
      <div className="py-28 px-6 bg-slate-300 text-white">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-black text-3xl mb-6">🖼️ Mint omnichain NFT</h2>
          <p className="mb-14">widget description here</p>
          <a
            className="btn bg-gray-500 hover:opacity-90 border-none normal-case text-white px-12"
            href="/nft-mint"
          >
            Try this
          </a>
        </div>
      </div>
    </Layout>
  )
}
