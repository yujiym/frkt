import { useEffect } from 'react'
import { HOST } from '@@/lib/const'
import Logo from '@@/components/svgs/Logo'

export default function Widget() {
  // const { appId, recipeId, auth } =
  // console.log(appId, recipeId, auth)

  return (
    <div className="container mx-auto max-w-xs max-h-[50vh] min-h-fit bg-red-200 text-red-700 relative">
      <div className="px-6 pt-8 pb-20">
        <h1 className="font-bold text-2xl text-center pb-6">NFT widget</h1>
        <p>Description here.....</p>
        {/* <h1>app: {appId}</h1>
              <h1>recipe: {recipeId}</h1> */}
        {true ? (
          <div className="my-24 w-full flex justify-center">
            <div className="loader-sq" />
          </div>
        ) : (
          <div className="text-center my-24 text-lg">
            <div className="text-6xl mb-2">😵‍💫</div>Something wrong
          </div>
        )}
      </div>
      <footer className="absolute bottom-0 right-0 left-0 text-sm text-center pb-6 flex items-center justify-center">
        Powerd by{' '}
        <a href={HOST} target="_blank" className="mx-2">
          <Logo size={54} />
        </a>
      </footer>
    </div>
  )
}
