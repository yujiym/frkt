import Layout from '../components/Layout'
import useAuth from '../hooks/useAuth'
import { metaNFT as meta } from '../utils/const'

export default function Home() {
  const { user } = useAuth()

  return (
    <Layout name={meta.name}>
      <div className="bg-green-300 px-6 text-center text-white">
        <div className="mx-auto max-w-2xl py-20">
          <h2 className="font-dot mb-8 mt-6 text-6xl font-bold">
            {meta.appName}
          </h2>
          <div>
            <p className="text-2xl">{meta.description}</p>
            <div className="mt-2 space-y-2">
              {meta.stacks.map((stack) => (
                <div
                  key={stack.toLocaleLowerCase()}
                  className="mr-3 inline-flex rounded-full bg-slate-50/90 px-4 py-1.5 text-sm text-gray-600"
                >
                  {stack}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto grid max-w-4xl grid-cols-1 gap-0 px-6 pb-10 md:grid-cols-3 md:gap-8">
        <div className="col-span-2 pt-10">
          <img src="/img/nft1.png" className="w-full rounded-lg object-fill" />
        </div>
        <div className="flex flex-col justify-between pt-10">
          <div>
            <h3 className="mb-4 text-2xl font-black">Sir Cedric ⭐⭐⭐</h3>
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
          <button
            className="btn btn-success mt-12 w-full"
            disabled={!user}
            data-frkt-widget="open"
          >
            {user ? 'Mint' : 'Login to mint'}
          </button>
        </div>
      </div>
    </Layout>
  )
}
