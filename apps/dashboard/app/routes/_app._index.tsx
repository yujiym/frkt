import { SITE_TITLE, SITE_DESCRIPTION } from '@@/lib/const'
import type { MetaFunction } from '@remix-run/cloudflare'

export const meta: MetaFunction = () => {
  return [
    { title: `${SITE_TITLE} Dashboard` },
    { name: 'description', content: SITE_DESCRIPTION },
  ]
}

export default function Index() {
  return (
    <>
      <div className="px-4 pt-16 pb-16 flex items-center justify-center bg-yellow-100">
        <h2 className="font-bold text-3xl text-center">
          <p className="text-5xl mb-3">👋</p>
          Welcome to FRKT
        </h2>
      </div>
      <div className="mx-auto max-w-2xl py-12 px-6">
        <div>
          <button className="btn-outline w-full py-5 px-8">
            <span className="font-bold text-xl uppercase mr-4">1.</span>
            <span className="text-xl">Connect wallet</span>
          </button>
        </div>
        <div className="text-center my-4 text-xl">&#9661;</div>
        <div>
          <a href="/apps" className="btn-outline py-5 px-8 w-full">
            <span className="font-bold text-xl uppercase mr-4">2.</span>
            <span className="text-xl">Create app & configure</span>
          </a>
        </div>
        <div className="text-center my-4 text-xl">&#9661;</div>
        <div>
          <a href="/recipes" className="btn-outline py-5 px-8 w-full">
            <span className="font-bold text-xl uppercase mr-4">3.</span>
            <span className="text-xl">
              Setup recipe & integrate into your app
            </span>
          </a>
        </div>
        <div className="text-center my-4 text-xl">&#9661;</div>
        <div className="text-center py-8 text-5xl">🎉</div>
      </div>
    </>
  )
}
