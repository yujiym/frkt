import { toast } from '@@/components/Toaster'
import { SITE_TITLE } from '@@/lib/const'
import type { MetaFunction } from '@remix-run/cloudflare'
import { BookCopy, CopyPlus } from 'lucide-react'

export const meta: MetaFunction = () => {
  return [{ title: `Recipes | ${SITE_TITLE} Dashboard` }]
}

export default function Recipes() {
  return (
    <>
      <div className="px-4 pt-16 pb-8 flex items-center justify-center">
        <h2 className="font-bold text-3xl">
          <BookCopy size={48} strokeWidth={1} className="mx-auto mb-3" />
          Recipes
        </h2>
      </div>
      <div className="py-8 px-6 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          className="card bg-white relative"
          onClick={() => toast.error('ok gooooooood', { icon: '😔' })}
        >
          <a className="flex flex-col h-full" href="/recipes/new">
            <div className="py-12 px-4 flex flex-1 items-center justify-center text-gray-500">
              <CopyPlus size={48} strokeWidth={1} />
            </div>
            <button className="w-full px-4 py-2 border-t border-black font-bold text-center uppercase">
              Submit new recipe
            </button>
          </a>
        </div>
        <div className="card bg-white">
          <a className="flex flex-col h-full" href="/recipes/nft">
            <div className="text-5xl pt-12 px-4 border-b border-black flex items-center justify-center bg-blue-100 flex-1">
              <div className="text-center">
                🖼️
                <h3 className="text-lg mt-6 mb-6">Mint Omnichain NFT</h3>
              </div>
            </div>
            <div className="px-4 py-2 text-sm">by Official</div>
            <button className="w-full px-4 py-2 border-t border-black font-bold text-center uppercase">
              Try This
            </button>
          </a>
        </div>
        <div
          className="card bg-white"
          onClick={() => toast.error('ok gooooooood', { icon: '😔' })}
        >
          <a>
            <div className="text-5xl pt-12 px-4 border-b border-black flex items-center justify-center bg-orange-100">
              <div className="text-center">
                🖋️
                <h3 className="text-lg mt-6 mb-6">Sign On-chain contract</h3>
              </div>
            </div>
            <div className="px-4 py-2 text-sm">by Official</div>
            <button className="w-full px-4 py-2 border-t border-black font-bold text-center uppercase">
              Try This
            </button>
          </a>
        </div>
      </div>
    </>
  )
}
