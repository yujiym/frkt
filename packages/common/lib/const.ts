export const SITE_TITLE = 'FRKT'
export const SITE_DESCRIPTION = 'No-Code Tools for Web2 & 3.'
export const DASHBOARD_HOST =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3002'
    : 'https://app.frkt.io'
