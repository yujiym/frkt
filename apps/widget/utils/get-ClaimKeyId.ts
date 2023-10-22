import { type ClaimRequest } from '@lit-protocol/types'

export const GetClaimKeyId = async (claimReq: ClaimRequest) => {
  const requestBody = {
    claimReq: claimReq,
  }

  const res = await fetch('/api/litClaimKeyId', {
    method: 'POST',
    body: JSON.stringify(requestBody),
  })

  console.log('res:', res.json())

  const { claimKeyId } = await res.json()
  return claimKeyId
}
