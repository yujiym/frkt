'use client'
import RecipeForm from '@@/components/RecipeForm'
import { cn } from '@@/lib/utils'
import { recipeData } from './../page'

export default function RecipePage({
  params,
}: {
  params: { recipeId: string }
}) {
  const item = recipeData?.find((item: any) => item.id === params.recipeId)

  return (
    item && (
      <>
        <div
          className={cn(
            'flex items-center justify-center px-4 pb-12 pt-16 text-center',
            item.bgColor
          )}
        >
          <h2 className="font-bold">
            <p className="text-5xl">{item.icon}</p>
            <p className="mt-4 text-2xl">{item.title}</p>
          </h2>
        </div>
        <div className="mx-auto  max-w-xl px-6 py-8">
          <RecipeForm />
        </div>
      </>
    )
  )
}
