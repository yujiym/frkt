'use client'
import { BookCopy, CopyPlus } from 'lucide-react'
import { toast } from '@@/components/Toaster'
import { cn } from '@@/lib/utils'

export const recipeData = [
  {
    id: 'nft',
    title: 'Mint Omnichain NFT',
    icon: '🖼️',
    bgColor: 'bg-blue-100',
  },
  {
    id: 'docment',
    title: 'Sign Document On-chain ',
    icon: '🖋️',
    bgColor: 'bg-orange-100',
  },
]

const RecipeCards = () => (
  <>
    {recipeData.map((item: any) => (
      <div key={item.id} className="card bg-white">
        <a className="flex h-full flex-col" href={`/recipes/${item.id}`}>
          <div
            className={cn(
              'flex flex-1 items-center justify-center rounded-t-lg px-4',
              item.bgColor
            )}
          >
            <div className="text-center">
              <p className="pt-12 text-5xl">{item.icon}</p>
              <h3 className="my-6 text-lg">{item.title}</h3>
            </div>
          </div>
          <div className="border-t border-black px-4 py-2 text-sm">
            by Official
          </div>
          <button className="w-full border-t border-black px-4 py-2 text-center font-bold uppercase">
            Try This
          </button>
        </a>
      </div>
    ))}
  </>
)

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
          onClick={() =>
            toast.error('This feature is restricted', { icon: '😔' })
          }
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
        <RecipeCards />
      </div>
    </>
  )
}
