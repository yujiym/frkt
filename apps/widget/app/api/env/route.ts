'use server'

export async function GET() {
  const env = {
    LIT_RELAY_API_KEY: process.env.LIT_RELAY_API_KEY,
    BICONOMY_BUNDLER_KEY: process.env.BICONOMY_BUNDLER_KEY,
    BICONOMY_PAYMASTER_KEY: process.env.BICONOMY_PAYMASTER_KEY,
  }

  return Response.json({ env })
}
