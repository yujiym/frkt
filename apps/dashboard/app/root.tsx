import stylesheet from './globals.css'
import type { LinksFunction, MetaFunction } from '@remix-run/cloudflare'
import { cssBundleHref } from '@remix-run/css-bundle'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'
import { SITE_TITLE, SITE_DESCRIPTION } from '@@/lib/const'
import Toaster from '@@/components/Toaster'
import faviconUrl from '@@/assets/img/favicon.svg'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
]

export const meta: MetaFunction = () => {
  return [
    { title: `${SITE_TITLE} Dashboard` },
    { name: 'description', content: SITE_DESCRIPTION },
  ]
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={faviconUrl} type="image/svg+xml" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Toaster />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
