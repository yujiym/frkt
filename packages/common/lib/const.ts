export const SITE_TITLE = 'FRKT'
export const SITE_DESCRIPTION = 'No-Code tools for Web2&3.'
export const HOST =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001'
    : 'https://frkt.io'
export const DASHBOARD_HOST =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3002'
    : 'https://app.frkt.io'
