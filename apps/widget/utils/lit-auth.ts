'use client'
import { LitAuthClient, GoogleProvider } from '@lit-protocol/lit-auth-client'
import { LitNodeClient } from '@lit-protocol/lit-node-client'
import { ProviderType, AuthMethodType } from '@lit-protocol/constants'

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
export async function getLitGooglePkp(token: string): Promise<any | void> {
  if (!token) return

  const { LIT_RELAY_API_KEY } = await getEnv()
  if (!LIT_RELAY_API_KEY) return

  await client.connect()

  let authMethod = {
    AuthMethodType: AuthMethodType.Google,
    accessToken: token,
  }

  let claimReq: ClaimRequest<ContractClaimProcessor> = {
    authMethod,
    signer: new ethers.Wallet(
      LIT_RELAY_API_KEY, // <your private key>
      new JsonRpcProvider('https://chain-rpc.litprotocol.com/http')
    ),
    mintCallback: (claimRes: ClaimResponse<ClientClaimProcessor>) => {
      const litContracts = new LitContracts({ signer: claimRes.signer })
      await litContracts.connect()
      let tokenId = litContracts.claimAndMint(
        claimRes.keyId,
        claimRes.signatures
      )
    },
  }

  const res = await client.claimKeyId(claimReq)

  console.log('mint tx hash: ', res.mintTx)
  console.log('pkp public key: ', res.pubkey)

  // const session = authClient.initProvider<GoogleProvider>(ProviderType.Google, {
  //   appId: sub,
  //   userId: aud,
  //   redirectUri: 'http://localhost:3003',
  // })
  // console.log('----003: ', session)

  // const authMethod = await session.authenticate()
  // console.log('----004: ', authMethod)

  // const keyId = client.computeHdKeyId('<your user id>', '<your project id>')

  // const keyId = session.getAuthMethodId(authMethod)
  // const pubKey = session.litNodeClient.computePubkey(keyId)
}
