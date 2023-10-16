import '@@/css/widget.css'
import faviconUrl from '@@/assets/img/favicon.svg'

export const metadata = {
  title: 'FRKT widget',
  description: 'A FRKT widget demo ',
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
