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
import Toaster from '@@/components/Toaster'
import logoUrl from '@@/assets/img/logo-sq.svg'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
]

export const meta: MetaFunction = () => {
  return [
    { title: 'FRKT Dashboard' },
    { name: 'description', content: 'no-code tool for web2/3.' },
  ]
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={logoUrl} />
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
