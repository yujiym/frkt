'use client'
import { LitAbility, LitActionResource } from '@lit-protocol/auth-helpers'
import { AuthMethodType, ProviderType } from '@lit-protocol/constants'
import {
  GoogleProvider,
  LitAuthClient,
  WebAuthnProvider,
} from '@lit-protocol/lit-auth-client'
import { LitNodeClient } from '@lit-protocol/lit-node-client'
import { PKPEthersWallet } from '@lit-protocol/pkp-ethers'
import { AuthMethod, IRelayPKP, type ClaimRequest } from '@lit-protocol/types'
import { GetClaimKeyId } from '~/utils/get-ClaimKeyId'
import { getEnv } from '~/utils/get-env'

type AuthType = 'webauthn' | 'google'

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

  await litNodeClient.connect()

  const authMethod: AuthMethod = {
    authMethodType: AuthMethodType.Google,
    accessToken,
  }

  const claimReq: ClaimRequest = {
    authMethod,
    relayApiKey: LIT_RELAY_API_KEY,
  }

  //const res = await litNodeClient.claimKeyId(claimReq)
  const res = await GetClaimKeyId(claimReq)

  return { authMethod, pubKey: res.pubkey }
}

export async function getPkpWallet(
  authType: AuthType,
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

  if (authType === 'google') {
    provider = authClient.initProvider<GoogleProvider>(ProviderType.Google)
  } else if (authType === 'webauthn') {
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
