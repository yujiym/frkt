'use client'
import Logo from '@@/components/svgs/Logo'
import { HOST } from '@@/lib/const'
import { ChainId } from '@biconomy/core-types'
import { PKPEthersWallet } from '@lit-protocol/pkp-ethers'
import { useParams, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { BASE_RPC_URL } from '~/utils/constants'
import {
  getLitGooglePkp,
  getPkpWallet,
  getWebAuthnPkp,
  registerWebAuthn,
} from '~/utils/lit-auth'
import { addSigNature } from './../hooks/safe'
import Loading from './Loading'

export default function Widget() {
  const { appId, recipeId } = useParams()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const signId = searchParams.get('signId')
  const safeAddress = searchParams.get('safeAddress')

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<any | null>(null)
  const [pkpWalletAddress, setPkpWalletAddress] = useState<string | null>(null)
  const [resultMessage, setResultMessage] = useState<string | null>(null)
  const [chainId, setChainId] = useState<number>(ChainId.BASE_GOERLI_TESTNET)
  const [pkpWallet, setPkpWallet] = useState<PKPEthersWallet | null>(null)
  const [txLink, setTxLink] = useState<string | null>(null)

  // config from table, props
  const textColor: string = null ?? '#1d4ed8'
  const bgColor: string = null ?? '#fff'
  // const authType: 'google' | 'webauthn' = 'google'

  const AuthType = {
    WebAuthn: 'webauthn',
    Google: 'google',
  }

  const authType = 'webauthn'

  const initFunc = async () => {
    let newPkpWallet: PKPEthersWallet
    let pkpPublicKey
    let authMethodInfo

    try {
      setIsLoading(true)
      if (authType === AuthType.Google) {
        if (!token) return
        const res = await getLitGooglePkp(token)
        console.log('::::', res)
        console.log('pkp info by googleAuth:', res.pubKey)
        console.log('authMethod by googleAuth:', res.authMethod)

        pkpPublicKey = res.pubKey
        authMethodInfo = res.authMethod
      } else if (authType === AuthType.WebAuthn) {
        console.log('webauthn here')

        const { authMethod, pkp } = await getWebAuthnPkp()
        console.log('pkp info by webAuth:', pkp)
        console.log('authMethod by webAuth:', authMethod)

        pkpPublicKey = pkp.publicKey
        authMethodInfo = authMethod

        if (authMethod === null || pkp === null) {
          // call register method
          await registerWebAuthn()
          const { authMethod, pkp } = await getWebAuthnPkp()
          console.log('pkp info by webAuth:', pkp)
          console.log('authMethod by webAuth:', authMethod)

          pkpPublicKey = pkp.publicKey
          authMethodInfo = authMethod
        }
      }

      // get pkp Wallet
      newPkpWallet = await getPkpWallet(
        authType,
        pkpPublicKey,
        authMethodInfo,
        BASE_RPC_URL
      )
      setPkpWallet(newPkpWallet)
      setPkpWalletAddress(await newPkpWallet.getAddress())
      setError(null)
    } catch (error) {
      console.log(':::::Errror:::::', error)
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignContract = async () => {
    // TODO set rpc url info from DB

    try {
      setIsLoading(true)

      // get signature
      const signature = await pkpWallet!.signMessage(
        `I sign to ${appId}/${recipeId}/${signId}/${safeAddress} Contract!`
      )

      // call addSignature method
      const response = await addSigNature(
        appId,
        recipeId,
        signId,
        chainId,
        safeAddress,
        signature
      )

      console.log(
        `Relay Transaction Task ID: https://relay.gelato.digital/tasks/status/${response.taskId}`
      )
      setTxLink(`https://relay.gelato.digital/tasks/status/${response.taskId}`)

      setResultMessage('🎉Congratulations!🎉')
    } catch (err: any) {
      console.log(':::::Errror:::::', error)
      setError(error)
    } finally {
      setIsLoading(false)
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
          <h1 className="font-bold text-2xl text-center pb-6">
            SignContract widget
          </h1>
          <p>Description here.....</p>
          <div className="w-full flex justify-center items-center min-h-[196px]">
            {isLoading ? (
              <Loading />
            ) : (
              <>
                {error ? (
                  <div className="text-center my-24 text-lg">
                    <div className="text-6xl mb-2">😵‍💫</div>Something wrong
                  </div>
                ) : (
                  <>
                    {resultMessage !== null ? (
                      <>
                        <div>
                          {resultMessage}
                          <br />
                          You can see result:
                          <a href={txLink!}> here </a>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="loader-sq" />
                        <button
                          className="btn btn-success w-full mt-12"
                          onClick={handleSignContract}
                        >
                          Sign
                        </button>
                      </>
                    )}
                  </>
                )}
              </>
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
