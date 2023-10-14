import Layout from '../components/Layout'
import useAuth from '../hooks/useAuth'
import { metaNFT as meta } from '../utils/const'

export default function Home() {
  const { user } = useAuth()

  return (
    <Layout name={meta.name}>
      <div className="bg-green-300 text-white px-6">
        <div className="mx-auto max-w-2xl py-20">
          <h2 className="font-dot font-bold text-6xl mt-6 mb-8 text-center">
            {meta.appName}
          </h2>
          <div>
            <p className="text-2xl">{meta.description}</p>
            <div className="space-y-2 mt-2">
              {meta.stacks.map((stack) => (
                <div className="rounded-full px-4 py-1.5 bg-slate-50/90 text-sm text-gray-600 inline-flex mr-3">
                  {stack}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="container max-w-4xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 pb-10">
        <div className="col-span-2 pt-10">
          <img src="/img/nft1.png" className="object-fill w-full rounded-lg" />
        </div>
        <div className="pt-10 flex flex-col justify-between">
          <div>
            <h3 className="font-black text-2xl mb-4">Sir Cedric ⭐⭐⭐</h3>
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
