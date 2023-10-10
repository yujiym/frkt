/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/cloudflare" />
/// <reference types="@cloudflare/workers-types" />

declare module '__STATIC_CONTENT_MANIFEST' {
  const manifest: string
  export default manifest
}

declare interface Env {
  SESSION_SECRET: string
  SESSION_KV: KVNamespace
  DB: D1Database
  GOOGLE_AUTH_CLIENT_ID: string
  GOOGLE_AUTH_CLIENT_SECRET: string
  GITHUB_AUTH_CLIENT_ID: string
  GITHUB_AUTH_CLIENT_SECRET: string
}
