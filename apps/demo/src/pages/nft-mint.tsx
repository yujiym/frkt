import Layout from '../components/Layout'
import useAuth from '../hooks/useAuth'

export default function Home() {
  const { user } = useAuth()

  return (
    <Layout name="Mint omnichain NFT">
      <div className="bg-green-300 text-white px-6">
        <div className="mx-auto max-w-2xl py-20">
          <h2 className="font-dot font-bold text-6xl mt-12 mb-8 text-center">
            🖼️ Mint omnichain NFT
          </h2>
          <p className="text-2xl mb-1">
            <a href="https://frkt.io">FRKT</a> widget demo for minting omnichain
            NFT.
            <br />
            Staks: Lit Protocol MPC, Biconomy AA, Chainlink CCIP, ...
          </p>
        </div>
      </div>
      <div className="container max-w-4xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 pb-10">
        <div className="col-span-2 pt-10">
          <img src="/img/nft1.png" className="object-fill w-full rounded-lg" />
        </div>
        <div className="pt-10 flex flex-col justify-between">
          <div>
            <h3 className="font-black text-2xl mb-4">Sir Cedric</h3>
            <p className="whitespace-pre-wrap text-slate-700">
              In the pixelated land of Pixelonia, Sir Cedric, the Pixel Paladin,
              stood overlooking his kingdom. Dressed in white and purple armor,
              his red plumed helmet signaled his high rank. His sword, an
              ancestral heirloom, shimmered with tales of past victories. Today,
              Sir Cedric faced a new challenge. Whispers spoke of a glitch
              threatening to turn Pixelonia into chaos. With determination, he
              prepared for his quest to vanquish this digital darkness. As dawn
              broke, Sir Cedric, the guardian of Pixelonia, stepped forward,
              ready to safeguard his realm's pixelated legacy.
            </p>
          </div>
          <button className="btn btn-success w-full mt-12" disabled={!user}>
            {user ? 'Mint' : 'Login to mint'}
          </button>
        </div>
      </div>
    </Layout>
  )
}
