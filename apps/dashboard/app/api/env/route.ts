'use server'

export async function GET() {
  const env = {
    LIT_RELAY_API_KEY: process.env.LIT_RELAY_API_KEY,
  }

  return Response.json({ env })
}
