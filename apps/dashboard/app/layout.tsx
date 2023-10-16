import '@@/css/dashboard.css'
import { SITE_TITLE, SITE_DESCRIPTION } from '@@/lib/const'

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
      <body>{children}</body>
    </html>
  )
}
