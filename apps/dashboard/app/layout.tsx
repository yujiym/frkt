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
    <html lang="en">
      <head>
        <link rel="icon" href={faviconUrl.src} type="image/svg+xml" />
      </head>
      <body>{children}</body>
    </html>
  )
}
