import type { LayoutHandler } from '@sonikjs/preact'

const handler: LayoutHandler = ({ children, head }) => {
  return (
    <html lang="en">
      <head>
        <title>FRKT</title>
        <meta name="description" content="No-Code tools for Web2&3." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {import.meta.env.PROD ? (
          <>
            <link href="/static/style.css" rel="stylesheet" />
            <script type="module" src="/static/client.js"></script>
          </>
        ) : (
          <>
            <link href="/app/style.css" rel="stylesheet" />
            <script type="module" src="/app/client.ts"></script>
          </>
        )}
        {head.createTags()}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}

export default handler
