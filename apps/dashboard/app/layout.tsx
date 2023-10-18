import '@@/css/dashboard.css'
import { SITE_TITLE, SITE_DESCRIPTION } from '@@/lib/const'
import faviconUrl from '@@/assets/img/favicon.svg'

export const metadata = {
  title: `${SITE_TITLE} Dashboard`,
  description: SITE_DESCRIPTION,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta property="og:title" content="FRKT - No-Code tools for Web2&3" />
        <meta property="og:site_name" content="FRKT" />
        <meta property="og:url" content="https://frkt.io" />
        <meta
          property="og:description"
          content="FRKT(/furɪkt/) provides a frictionless UX for any app"
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://frkt.io/static/ogp.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={faviconUrl.src} type="image/svg+xml" />
      </head>
      <body>{children}</body>
    </html>
  )
}
