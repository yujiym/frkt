import { KeySquare } from 'lucide-react'
import { SITE_TITLE } from '@@/lib/const'
import Logo from '@@/components/svgs/Logo'
import { HOST } from '@@/lib/const'

export const metadata = {
  title: `Login | ${SITE_TITLE} Dashboard`,
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="bg-primary flex flex-1 lg:basis-7/12">
        <div className="flex w-full flex-col justify-center px-10 py-8 md:items-start md:justify-between">
          <div>
            <Logo size={160} />
            <h1 className="mb-8 mt-3 text-3xl font-bold">
              No-Code tools for Web2
              <span className="mx-0.5 text-2xl">&amp;</span>3
            </h1>
          </div>
          <div>
            This is an alpha version.
            <br />
            Pre-registration is available from{' '}
            <a className="underline" href={`${HOST}#presignup`}>
              here
            </a>
            .
          </div>
        </div>
      </div>
      <div className="order-first flex flex-1 items-center justify-center md:order-none lg:basis-5/12">
        <div className="flex w-full max-w-md flex-col px-8 py-16">
          <h2 className="mb-10 mr-6 flex items-center justify-center text-center text-4xl font-bold">
            <KeySquare className="mr-3" size={32} strokeWidth={2.5} />
            Login
          </h2>
          {children}
        </div>
      </div>
    </div>
  )
}
