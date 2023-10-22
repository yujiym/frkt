'use server'

import { LitNodeClient } from '@lit-protocol/lit-node-client'
import type { NextApiResponse } from 'next'

const litNodeClient = new LitNodeClient({
  litNetwork: 'cayenne',
  debug: false,
})

export async function POST(request: any, res: NextApiResponse) {
  if (request.method === 'POST') {
    await litNodeClient.connect()
    // get param data
    const body = await request.json()
    const claimReq = body.claimReq
    console.log('claimReq:', body.claimReq)

    const authMethod = body.claimReq.authMethod

    const result = await litNodeClient.claimKeyId(authMethod)

    return res.status(200).json(result)
  }
}
