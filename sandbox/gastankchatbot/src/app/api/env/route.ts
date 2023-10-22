'use server'

export async function GET() {
  const env = {
    PUSH_SIGNER_KEY: process.env.PUSH_SIGNER_KEY,
  }

  return Response.json({ env })
}