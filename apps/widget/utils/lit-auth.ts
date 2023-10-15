'use client'
import { LitAuthClient, GoogleProvider } from '@lit-protocol/lit-auth-client'
import { LitNodeClient } from '@lit-protocol/lit-node-client'
import { ProviderType } from '@lit-protocol/constants'

const getEnv = async () => {
  const res = await fetch('/api/env')
  const { env } = await res.json()
  return env
}

const litNodeClient = new LitNodeClient({
  litNetwork: 'cayenne',
  debug: false,
})

export async function getWebAuthnPkp(): Promise<any | void> {
  return
}

/*
  ref: https://github.com/LIT-Protocol/claim-key-demo-nodejs/blob/main/index.ts
*/
export async function getLitGooglePkp(token: string): Promise<any | void> {
  if (!token) return

  const { LIT_RELAY_API_KEY } = await getEnv()
  if (!LIT_RELAY_API_KEY) return

  await litNodeClient.connect()

  const authClient = new LitAuthClient({
    litRelayConfig: {
      relayApiKey: LIT_RELAY_API_KEY,
    },
    litNodeClient,
  })

  const decodedToken = JSON.parse(atob(token.split('.')[1]))
  const { sub, aud } = decodedToken

  const session = authClient.initProvider<GoogleProvider>(ProviderType.Google, {
    appId: sub,
    userId: aud,
    redirectUri: 'http://localhost:3003',
  })
  console.log('----003: ', session)

  const authMethod = await session.authenticate()
  console.log('----004: ', authMethod)

  const keyId = session.getAuthMethodId(authMethod)
  // const pubKey = session.litNodeClient.computePubkey(keyId)

  return { keyId, pubKey: 'pubKey' }
}
