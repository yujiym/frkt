'use server'

export async function GET() {
  const env = {
    LIT_RELAY_API_KEY: process.env.LIT_RELAY_API_KEY,
    GELATO_RELAY_API_KEY: process.env.GELATO_RELAY_API_KEY,
    SAFE_SIGNER_KEY: process.env.SAFE_SIGNER_KEY,
  }

  return Response.json({ env })
}
