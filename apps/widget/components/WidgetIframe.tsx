'use client'
import Logo from '@@/components/svgs/Logo'
import { HOST } from '@@/lib/const'
import { BiconomySmartAccountV2 } from '@biconomy/account'
import { ChainId } from '@biconomy/core-types'
import { PKPEthersWallet } from '@lit-protocol/pkp-ethers'
import { ethers } from 'ethers'
import { useParams, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createSmartWallet, crossMintNft } from '~/hooks/biconomy'
import {
  getLitGooglePkp,
  getPkpWallet,
  getWebAuthnPkp,
  registerWebAuthn,
} from '~/utils/lit-auth'
import { FUJI_RPC_URL } from './../utils/constants'

export default function Widget() {
  const { appId, recipeId } = useParams()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [smartAccount, setSmartAccount] =
    useState<BiconomySmartAccountV2 | null>(null)
  const [error, setError] = useState<any | null>(null)
  const [pkpWalletAddress, setPkpWalletAddress] = useState<string | null>(null)
  const [resultMessage, setResultMessage] = useState<string | null>(null)
  const [pkpWallet, setPkpWallet] = useState<PKPEthersWallet | null>(null)
  const [txLink, setTxLink] = useState<string | null>(null)

  // config from table, props
  const textColor: string = null ?? '#1d4ed8'
  const bgColor: string = null ?? '#fff'
  // const authType: 'google' | 'webauthn' = 'google'
  const authType = 'webauthn'
  const title: string = 'NFT widget'
  const rpcUrl: string = FUJI_RPC_URL
  const chainId = ChainId.AVALANCHE_TESTNET

  const initFunc = async () => {
    let newPkpWallet: PKPEthersWallet
    let pkpPublicKey
    let authMethodInfo

    try {
      if (authType === 'google') {
        if (!token) return
        console.log('google Auth here')
        const res = await getLitGooglePkp(token)
        console.log(res)
      } else if (authType === 'webauthn') {
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
        rpcUrl
      )

      // create SmartWallet for biconomy
      // TODO Change chain ID by recepiId
      const { biconomySmartAccount } = await createSmartWallet(
        chainId,
        newPkpWallet
      )
      // set SmartAccount
      setSmartAccount(biconomySmartAccount)
      setPkpWallet(newPkpWallet)
      setPkpWalletAddress(await newPkpWallet.getAddress())
      setError(null)
    } catch (error) {
      console.log(':::::Errror:::::', error)
      setError(error)
    }
  }

  const handleMintCrossNFT = async () => {
    // TODO set rpc url info from DB
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl)
    try {
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
    }
  }

  useEffect(() => {
    if (!appId || !recipeId) return
    setTimeout(() => initFunc(), 600)
  }, [])

  return (
    <div className="relative flex h-[480px] w-full items-center justify-center pb-0.5 pr-0.5">
      <div
        className="shadow-solid container mx-auto h-full w-full rounded-lg border-2"
        style={{
          color: textColor,
          backgroundColor: bgColor,
          borderColor: textColor,
        }}
      >
        <div className="px-6 pb-16 pt-8">
          <h1 className="pb-6 text-center text-2xl font-bold">{title}</h1>
          <p>
            You can mint omnichain NFT!!
            <br />
            Let’s try it!
          </p>
          <div className="flex min-h-[196px] w-full items-center justify-center">
            {error ? null : (
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
                    <button
                      className="btn btn-success mt-12 w-full"
                      onClick={handleMintCrossNFT}
                    >
                      Mint NFT
                    </button>
                    <div className="loader-sq" />
                  </>
                )}
              </>
            )}
          </div>
          <footer className="absolute inset-x-0 bottom-0 flex items-center justify-center border-t border-current py-3 text-center text-sm">
            Powerd by{' '}
            <a href={HOST} target="_blank" className="mx-2">
              <Logo size={54} />
            </a>
          </footer>
        </div>
      </div>
    </div>
  )
}
