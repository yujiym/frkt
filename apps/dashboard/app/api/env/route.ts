'use server'

export async function GET() {
  const env = {}

  return Response.json({ env })
}
