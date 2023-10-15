'use client'
import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import Logo from '@@/components/svgs/Logo'
import { HOST } from '@@/lib/const'
import { getLitGooglePkp } from '~/utils/lit-auth'

export default async function Widget() {
  const { appId, recipeId } = useParams()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [error, setError] = useState<any | null>(null)

  // config from table, props
  const textColor: string = null ?? '#1d4ed8'
  const bgColor: string = null ?? '#fff'
  const authType: 'google' | 'webauthn' = 'google'

  const initFunc = async () => {
    try {
      if (authType === 'google') {
        if (!token) return
        const res = await getLitGooglePkp(token)
        console.log('::::', res)
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
    <div className="flex items-center justify-center h-screen">
      <div
        className="container mx-auto max-w-sm relative border sm:rounded-lg rounded-none sm:shadow-solid shadow-none"
        style={{
          color: textColor,
          backgroundColor: bgColor,
          borderColor: textColor,
        }}
      >
        <div className="px-6 pt-8 pb-16">
          <h1 className="font-bold text-2xl text-center pb-6">NFT widget</h1>
          <p>Description here.....</p>
          <div className="w-full flex justify-center items-center min-h-[196px]">
            {error ? (
              <div className="text-center my-24 text-lg">
                <div className="text-6xl mb-2">😵‍💫</div>Something wrong
              </div>
            ) : (
              <div className="loader-sq" />
            )}
          </div>
        </div>
        <footer className="absolute bottom-0 right-0 left-0 text-sm text-center pb-5 flex items-center justify-center">
          Powerd by{' '}
          <a href={HOST} target="_blank" className="mx-2">
            <Logo size={54} />
          </a>
        </footer>
      </div>
    </div>
  )
}
