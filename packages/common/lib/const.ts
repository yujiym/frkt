export const SITE_TITLE = 'FRKT'
export const SITE_DESCRIPTION = 'No-code tool for web2&3.'
export const HOST =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3002'
    : 'https://app.frkt.io'
