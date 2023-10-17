'use client'
import { LitNodeClient } from '@lit-protocol/lit-node-client'
import { AuthMethodType } from '@lit-protocol/constants'
import type { ClaimRequest, AuthMethod } from '@lit-protocol/types'

const getEnv = async () => {
  const res = await fetch('/api/env')
  const { env } = await res.json()
  return env
}

const client = new LitNodeClient({
  litNetwork: 'cayenne',
  debug: false,
})

export async function getWebAuthnPkp(): Promise<any | void> {
  return
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
