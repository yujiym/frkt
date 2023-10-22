'use client'
import Logo from '@@/components/svgs/Logo'
import { HOST } from '@@/lib/const'
import { useParams, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getLitGooglePkp } from '~/utils/lit-auth'

export default function Widget() {
  const { appId, recipeId } = useParams()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [error, setError] = useState<any | null>(null)

  // config from table, props
  const textColor: string = null ?? '#1d4ed8'
  const bgColor: string = null ?? '#fff'
  const authType: 'google' | 'webauthn' = 'google'
  const title: string = 'NFT widget'

  const initFunc = async () => {
    try {
      if (authType === 'google') {
        if (!token) return
        console.log('google Auth here')
        const res = await getLitGooglePkp(token)
        console.log(res)
      } else if (authType === 'webauthn') {
        console.log('webauthn here')
      }
    } catch (error) {
      console.log(':::::Errror:::::', error)
      setError(error)
    }
  }

  useEffect(() => {
    if (!appId || !recipeId) return
    setTimeout(() => initFunc(), 600)
  }, [])

  return (
    <div className="flex h-[480px] w-full items-center justify-center pb-0.5 pr-0.5">
      <div
        className="shadow-solid container relative mx-auto h-full w-full rounded-lg border-2"
        style={{
          color: textColor,
          backgroundColor: bgColor,
          borderColor: textColor,
        }}
      >
        <div className="px-6 pb-16 pt-8">
          <h1 className="pb-6 text-center text-2xl font-bold">{title}</h1>
          <p>Description here.....</p>
          <div className="flex min-h-[196px] w-full items-center justify-center">
            {error ? (
              <div className="my-24 text-center text-lg">
                <div className="mb-2 text-6xl">😵‍💫</div>Something wrong
              </div>
            ) : (
              <div className="loader-sq" />
            )}
          </div>
        </div>
        <footer className="absolute inset-0 flex items-center justify-center border-t border-current py-3 text-center text-sm">
          Powerd by{' '}
          <a href={HOST} target="_blank" className="mx-2">
            <Logo size={54} />
          </a>
        </footer>
      </div>
    </div>
  )
}
