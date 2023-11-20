'use client'
import Logo from '@@/components/svgs/Logo'
import { WWW_HOST } from '@@/lib/const'
import { ChainId } from '@biconomy/core-types'
import { PKPEthersWallet } from '@lit-protocol/pkp-ethers'
import { useParams, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Client, Provider, cacheExchange, fetchExchange, useQuery } from 'urql'
import query from '~/graphql/query'
import { addSigNature } from '~/hooks/safe'
import {
  BASE_RPC_URL,
  GRAPHQL_API_ENDPOINT,
  SignContractInfos,
} from '~/utils/constants'
import {
  getLitGooglePkp,
  getPkpWallet,
  getWebAuthnPkp,
  registerWebAuthn,
} from '~/utils/lit-auth'

// create client instance for GraphQL
const client = new Client({
  url: GRAPHQL_API_ENDPOINT,
  exchanges: [cacheExchange, fetchExchange],
})

export default function Widget() {
  return (
    <Provider value={client}>
      <WidgetContent />
    </Provider>
  )
}

function WidgetContent() {
  const { appId, recipeId } = useParams()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  // const signId = searchParams.get('signId')

  const signId = 5

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<any | null>(null)
  const [pkpWalletAddress, setPkpWalletAddress] = useState<string | null>(null)
  const [resultMessage, setResultMessage] = useState<string | null>(null)
  const [chainId, setChainId] = useState<number>(ChainId.BASE_GOERLI_TESTNET)
  const [pkpWallet, setPkpWallet] = useState<PKPEthersWallet | null>(null)
  const [txLink, setTxLink] = useState<string | null>(null)
  // TODO get fileName & safeAddress from DB or grahpql
  const [fileName, setFileName] = useState<string | null>('FrktSampleContract4')
  const [safeAddress, setSafeAddres] = useState<string | null>(
    '0x9aC51CfdCdF343D6d7410a23880Eb25F20756098'
  )

  // config from table, props
  const textColor: string = null ?? '#1d4ed8'
  const bgColor: string = null ?? '#fff'
  // const authType: 'google' | 'webauthn' = 'google'

  console.log('signId:', signId)

  // execute subgraph query
  const [result] = useQuery({
    query,
    variables: { signId: signId },
  })
  const { data } = result

  const queryResult: SignContractInfos = data
  console.log('data:', queryResult)

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

      if (data != undefined) {
        setFileName(data.signContractCreateds[0].name)
        setSafeAddres(data.signContractCreateds[0].safeAddress)
      }

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
      console.log(':::::Errror:::::', err)
      setError(err)
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
          <h1 className="pb-6 text-center text-2xl font-bold">
            SignContract widget
          </h1>
          <p>fileName: {fileName}</p>
          <div className="flex min-h-[196px] w-full items-center justify-center">
            {isLoading ? (
              <div className="loader-sq" />
            ) : (
              <>
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
                          className="btn btn-neutral mt-12 w-full"
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
        <footer className="absolute inset-x-0 bottom-0 flex items-center justify-center pb-5 text-center text-sm">
          Powerd by{' '}
          <a href={WWW_HOST} target="_blank" className="mx-2">
            <Logo size={54} />
          </a>
        </footer>
      </div>
    </div>
  )
}
