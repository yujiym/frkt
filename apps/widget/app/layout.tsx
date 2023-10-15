import '@@/css/widget.css'

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
      <body>{children}</body>
    </html>
  )
}
