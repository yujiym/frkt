'use client'
import { LitAbility, LitActionResource } from '@lit-protocol/auth-helpers'
import { ProviderType } from '@lit-protocol/constants'
import {
  LitAuthClient,
  WebAuthnProvider
} from '@lit-protocol/lit-auth-client'
import { LitNodeClient } from '@lit-protocol/lit-node-client'
import { PKPEthersWallet } from '@lit-protocol/pkp-ethers'
import { AuthMethod, IRelayPKP } from '@lit-protocol/types'

const getEnv = async () => {
  const res = await fetch('/api/env')
  const { env } = await res.json()
  return env
}

const client = new LitNodeClient({
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
  return { authClient, authMethod, pkp: pkpInfo }
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

  let claimReq: ClaimRequest = {
    authMethod,
    relayApiKey: LIT_RELAY_API_KEY,
  }

  console.log('claimReq', claimReq)

  const res = await client.claimKeyId(claimReq)
  console.log(res)
}

export async function getPkpWallet(
  pkpPublicKey: any,
  authClient: LitAuthClient,
  authMethod: AuthMethod,
  rpc_url: string
): Promise<PKPEthersWallet | any> {
  await litNodeClient.connect()

  let provider = authClient.getProvider(ProviderType.WebAuthn)

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
  console.log("pkpWallet's address:", await pkpWallet.getAddress())
  console.log("pkpWallet's add:", await pkpWallet.getAddress())

  return pkpWallet
}
