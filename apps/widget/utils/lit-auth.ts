'use client'
import { LitAbility, LitActionResource } from '@lit-protocol/auth-helpers'
import { ProviderType } from '@lit-protocol/constants'
import { LitAuthClient, WebAuthnProvider } from '@lit-protocol/lit-auth-client'
import { LitNodeClient } from '@lit-protocol/lit-node-client'
import { PKPEthersWallet } from '@lit-protocol/pkp-ethers'
import { AuthMethod, IRelayPKP } from '@lit-protocol/types'

const getEnv = async () => {
  const res = await fetch('/api/env')
  const { env } = await res.json()
  return env
}

const AuthType = {
  WebAuthn: 'webauthn',
  Google: 'google',
}

const litNodeClient = new LitNodeClient({
  litNetwork: 'cayenne',
  debug: false,
})

export async function registerWebAuthn(): Promise<IRelayPKP | any> {
  const { LIT_RELAY_API_KEY } = await getEnv()
  if (!LIT_RELAY_API_KEY) return

  await litNodeClient.connect()

  const authClient = new LitAuthClient({
    litRelayConfig: {
      relayApiKey: LIT_RELAY_API_KEY,
    },
    litNodeClient,
  })

  const provider = authClient.initProvider<WebAuthnProvider>(
    ProviderType.WebAuthn
  )
  // Register new WebAuthn credential
  const options = await provider.register()

  // Verify registration and mint PKP through relay server
  const txHash = await provider.verifyAndMintPKPThroughRelayer(options)
  const response = await provider.relay.pollRequestUntilTerminalState(txHash)
  if (response.status !== 'Succeeded') {
    throw new Error('Minting failed')
  }
  // create IRelayPKP Object
  const pkp: IRelayPKP = {
    tokenId: response.pkpTokenId!,
    publicKey: response.pkpPublicKey!,
    ethAddress: response.pkpEthAddress!,
  }
  return pkp
}

export async function getWebAuthnPkp(): Promise<any | void> {
  const { LIT_RELAY_API_KEY } = await getEnv()
  if (!LIT_RELAY_API_KEY) return

  await litNodeClient.connect()

  const authClient = new LitAuthClient({
    litRelayConfig: {
      relayApiKey: LIT_RELAY_API_KEY,
    },
    litNodeClient,
  })

  let provider = authClient.initProvider<WebAuthnProvider>(
    ProviderType.WebAuthn
  )

  if (!provider) {
    provider = authClient.initProvider<WebAuthnProvider>(ProviderType.WebAuthn)
  }
  // authenticate by WebAuthn
  const authMethod = await provider!.authenticate()
  const pkps = await provider!.fetchPKPsThroughRelayer(authMethod)
  const pkpInfo = pkps[0]
  console.log('pkpInfo:', pkpInfo)
  console.log('authMethod:', authMethod)
  return { authMethod, pkp: pkpInfo }
}

/*
  ref: https://github.com/LIT-Protocol/claim-key-demo-nodejs/blob/main/index.ts
*/
export async function getLitGooglePkp(
  accessToken: string
): Promise<any | void> {
  if (!accessToken) return

  const { LIT_RELAY_API_KEY } = await getEnv()
  if (!LIT_RELAY_API_KEY) return

  await client.connect()

  let authMethod: AuthMethod = {
    authMethodType: AuthMethodType.Google,
    accessToken,
  }

  const decodedToken = JSON.parse(atob(token.split('.')[1]))
  console.log('----002: ', decodedToken)
  const { sub, aud } = decodedToken

  let session = authClient.initProvider<GoogleProvider>(ProviderType.Google, {
    appId: sub,
    userId: aud,
    redirectUri: 'http://localhost:3003',
  })

  if (!session) {
    session = authClient.initProvider<GoogleProvider>(ProviderType.Google, {
      appId: sub,
      userId: aud,
      redirectUri: 'http://localhost:3003',
    })
  }

  console.log('----003: ', session)

  const authMethod = await session.authenticate()
  console.log('----004: ', authMethod)

  const keyId = session.getAuthMethodId(authMethod)
  // const pubKey = session.litNodeClient.computePubkey(keyId)

  return { authMethod, pubKey: 'pubKey' }
}

export async function getPkpWallet(
  authType: string,
  pkpPublicKey: any,
  authMethod: AuthMethod,
  rpc_url: string
): Promise<PKPEthersWallet | any> {
  const { LIT_RELAY_API_KEY } = await getEnv()
  if (!LIT_RELAY_API_KEY) return

  await litNodeClient.connect()

  const authClient = new LitAuthClient({
    litRelayConfig: {
      relayApiKey: LIT_RELAY_API_KEY,
    },
    litNodeClient,
  })

  let provider

  if (authType === AuthType.Google) {
    provider = authClient.initProvider<GoogleProvider>(ProviderType.Google)
  } else if (authType === AuthType.WebAuthn) {
    provider = authClient.initProvider<WebAuthnProvider>(ProviderType.WebAuthn)
  }

  console.log('provider:', provider)
  console.log('authMethod:', authMethod)

  const sessionSigs = await provider!.getSessionSigs({
    authMethod: authMethod,
    pkpPublicKey: pkpPublicKey,
    sessionSigsParams: {
      chain: 'ethereum',
      resourceAbilityRequests: [
        {
          resource: new LitActionResource('*'),
          ability: LitAbility.PKPSigning,
        },
      ],
    },
  })

  console.log('sessionSigs:', sessionSigs)

  // create PKP instance
  const pkpWallet = new PKPEthersWallet({
    pkpPubKey: pkpPublicKey,
    rpc: rpc_url,
    controllerSessionSigs: sessionSigs,
  })
  await pkpWallet.init()

  console.log('pkpWallet:', pkpWallet)
  console.log('pkpWallets address:', await pkpWallet.getAddress())

  return pkpWallet
}
