'use client'
import { BookCopy, CopyPlus } from 'lucide-react'
import { toast } from '@@/components/Toaster'

export default function RecipesPage() {
  return (
    <>
      <div className="flex items-center justify-center px-4 pb-8 pt-16">
        <h2 className="text-3xl font-bold">
          <BookCopy size={48} strokeWidth={1} className="mx-auto mb-3" />
          Recipes
        </h2>
      </div>
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 px-6 py-8 md:grid-cols-2 lg:grid-cols-3">
        <div
          className="card relative bg-white"
          onClick={() => toast.error('ok gooooooood', { icon: '😔' })}
        >
          <a className="flex h-full flex-col" href="/recipes/new">
            <div className="flex flex-1 items-center justify-center px-4 py-12 text-gray-500">
              <CopyPlus size={48} strokeWidth={1} />
            </div>
            <button className="w-full border-t border-black px-4 py-2 text-center font-bold uppercase">
              Submit new recipe
            </button>
          </a>
        </div>
        <div className="card bg-white">
          <a className="flex h-full flex-col" href="/recipes/nft">
            <div className="flex flex-1 items-center justify-center border-b border-black bg-blue-100 px-4 pt-12 text-5xl">
              <div className="text-center">
                🖼️
                <h3 className="mb-6 mt-6 text-lg">Mint Omnichain NFT</h3>
              </div>
            </div>
            <div className="px-4 py-2 text-sm">by Official</div>
            <button className="w-full border-t border-black px-4 py-2 text-center font-bold uppercase">
              Try This
            </button>
          </a>
        </div>
        <div
          className="card bg-white"
          onClick={() => toast.error('ok gooooooood', { icon: '😔' })}
        >
          <a>
            <div className="flex items-center justify-center border-b border-black bg-orange-100 px-4 pt-12 text-5xl">
              <div className="text-center">
                🖋️
                <h3 className="mb-6 mt-6 text-lg">Sign On-chain contract</h3>
              </div>
            </div>
            <div className="px-4 py-2 text-sm">by Official</div>
            <button className="w-full border-t border-black px-4 py-2 text-center font-bold uppercase">
              Try This
            </button>
          </a>
        </div>
      </div>
    </>
  )
}
