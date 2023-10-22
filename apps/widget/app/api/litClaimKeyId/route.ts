'use server'

import type { NextApiRequest, NextApiResponse } from 'next'

const litNodeClient = new LitNodeClient({
  litNetwork: 'cayenne',
  debug: false,
})

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await litNodeClient.connect()
    // get param data
    const claimReq = req.body.claimReq
    console.log('claimReq:', claimReq)

    const result = await litNodeClient.claimKeyId(claimReq)

    return res.status(200).json(result)
  }
}
