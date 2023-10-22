import { type ClaimRequest } from '@lit-protocol/types'

export const GetClaimKeyId = async (claimReq: ClaimRequest) => {
  const res = await fetch('/api/litClaimKeyId', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      claimReq: claimReq,
    }),
  })

  console.log('res:', res.json())

  const { claimKeyId } = await res.json()
  return claimKeyId
}
