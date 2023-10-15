import {
  LitAuthClient,
  GoogleProvider,
} from '@lit-protocol/lit-auth-client/src/index.js'
import { LitNodeClientNodeJs } from '@lit-protocol/lit-node-client-nodejs'
import { ProviderType } from '@lit-protocol/constants'

export async function getLitAuth(sub: string, aud: string) {
  console.log('00000', aud, sub)
  const litNodeClient = new LitNodeClientNodeJs({
    litNetwork: 'cayenne',
    debug: false,
    connectTimeout: 100000,
  })
  console.log('00001')
  const res = await litNodeClient.connect()
  console.log('00002', res)
  const authClient = new LitAuthClient({
    litRelayConfig: {
      relayApiKey: process.env.LIT_RELAY_API_KEY,
    },
    litNodeClient,
  })
  console.log('00003', aud, sub)

  // const session = authClient.initProvider<GoogleProvider>(ProviderType.Google, {
  //   aud,
  //   sub,
  // })
  // const authMethod = await session.authenticate({
  //   accessToken: sessionStatus.session_jwt,
  // })
  // const publicKey = await session.computePublicKeyFromAuthMethod(authMethod)
  // console.log('local public key computed: ', publicKey)
  // if (process.argv.length >= 3 && process.argv[2] === '--claim') {
  //   let claimResp = await session.claimKeyId({
  //     authMethod,
  //   })
  //   console.log('claim response public key: ', claimResp.pubkey)
  // } else if (process.argv.length >= 3 && process.argv[2] === '--lookup') {
  //   const pkpInfo = await session.fetchPKPsThroughRelayer(authMethod)
  //   console.log(pkpInfo)
  // }
}
