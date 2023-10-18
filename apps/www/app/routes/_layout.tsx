import type { LayoutHandler } from '@sonikjs/preact'

const handler: LayoutHandler = ({ children, head }) => {
  return (
    <html lang="en">
      <head>
        <title>FRKT</title>
        <meta name="description" content="No-Code tools for Web2&3" />
        <meta property="og:title" content="FRKT - No-Code tools for Web2&3" />
        <meta property="og:site_name" content="FRKT" />
        <meta property="og:url" content="https://frkt.io" />
        <meta
          property="og:description"
          content="FRKT(/furɪkt/) provides a frictionless UX for any app"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content={`${
            import.meta.env.PROD ? 'https://frkt.io' : 'http://localhost:3001'
          }/static/ogp.png`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/static/favicon.svg" type="image/svg+xml" />
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
        <script async src="https://tally.so/widgets/embed.js" />
      </head>
      <body>{children}</body>
    </html>
  )
}

export default handler
