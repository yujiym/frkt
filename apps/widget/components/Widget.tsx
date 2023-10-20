'use client'
import Logo from '@@/components/svgs/Logo'
import { HOST } from '@@/lib/const'
import { BiconomySmartAccountV2 } from '@biconomy/account'
import { ChainId } from '@biconomy/core-types'
import { ethers } from 'ethers'
import { useParams, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FUJI_RPC_URL } from '~/utils/constants'
import {
  getLitGooglePkp,
  getPkpWallet,
  getWebAuthnPkp,
  registerWebAuthn,
} from '~/utils/lit-auth'
import { createSmartWallet, crossMintNft } from './../hooks/biconomy'
import Loading from './Loading'

export default function Widget() {
  const { appId, recipeId } = useParams()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<any | null>(null)
  const [smartAccount, setSmartAccount] =
    useState<BiconomySmartAccountV2 | null>(null)
  const [pkpWalletAddress, setPkpWalletAddress] = useState<string | null>(null)
  const [resultMessage, setResultMessage] = useState<string | null>(null)
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
    let newPkpWallet
    let pkpPublicKey
    let authMethodInfo
    let newPkpEthAddress

    try {
      setIsLoading(true)

      if (authType === AuthType.Google) {
        if (!token) return
        const res = await getLitGooglePkp(token)
        console.log('::::', res)
      } else if (authType === AuthType.WebAuthn) {
        console.log('webauthn here')

        // get pkp Info by webAuthn
        const { authMethod, pkp } = await getWebAuthnPkp()
        console.log('pkp info by webAuth:', pkp)
        console.log('authMethod by webAuth:', authMethod)

        pkpPublicKey = pkp.publicKey
        authMethodInfo = authMethod
        newPkpEthAddress = pkp.ethAddress

        if (authMethod === null || pkp === null) {
          // call register method
          await registerWebAuthn()
          const { authMethod, pkp } = await getWebAuthnPkp()
          console.log('pkp info by webAuth:', pkp)
          console.log('authMethod by webAuth:', authMethod)

          pkpPublicKey = pkp.publicKey
          authMethodInfo = authMethod
          newPkpEthAddress = pkp.ethAddress
        }
      }

      // get pkp Wallet
      newPkpWallet = await getPkpWallet(
        authType,
        pkpPublicKey,
        authMethodInfo,
        FUJI_RPC_URL
      )
      setPkpWalletAddress(newPkpEthAddress)

      // create SmartWallet for biconomy
      // TODO Change chain ID by recepiId
      const { biconomySmartAccount } = await createSmartWallet(
        ChainId.AVALANCHE_TESTNET,
        newPkpWallet
      )
      // set SmartAccount
      setSmartAccount(biconomySmartAccount)
      setError(null)
    } catch (error) {
      console.log(':::::Errror:::::', error)
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleMintCrossNFT = async () => {
    // TODO set rpc url info from DB
    const provider = new ethers.providers.JsonRpcProvider(FUJI_RPC_URL)
    try {
      setIsLoading(true)

      // call crossMintNft method
      const transactionHash = await crossMintNft(
        smartAccount!,
        provider,
        pkpWalletAddress!
      )

      setTxLink(`https://testnet.snowtrace.io/tx/${transactionHash}`)

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
    <div className="flex h-screen items-center justify-center">
      <div
        className="sm:shadow-solid container relative mx-auto max-w-sm rounded-none border shadow-none sm:rounded-lg"
        style={{
          color: textColor,
          backgroundColor: bgColor,
          borderColor: textColor,
        }}
      >
        <div className="px-6 pb-16 pt-8">
          <h1 className="pb-6 text-center text-2xl font-bold">NFT widget</h1>
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
                          onClick={handleMintCrossNFT}
                        >
                          Mint NFT
                        </button>
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
        <footer className="absolute bottom-0 left-0 right-0 flex items-center justify-center pb-5 text-center text-sm">
          Powerd by{' '}
          <a href={HOST} target="_blank" className="mx-2">
            <Logo size={54} />
          </a>
        </footer>
      </div>
    </div>
  )
}
