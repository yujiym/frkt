import Logo from '@@/common/assets/img/logo.svg'
import { GoogleIcon, GithubIcon } from '@@/common/components/Icons'
import { KeySquare } from 'lucide-react'
import type { MetaFunction } from '@remix-run/node'

export const meta: MetaFunction = () => {
  return [{ title: 'Login | FRKT Dashboard' }]
}

export default function Index() {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="flex flex-1 items-center justify-center">
        <div className="p-10">
          <img src={Logo} width={192} className="mb-4" />
          <h1 className="text-3xl font-bold mt-4 mb-8">
            No-code tools for web2
            <span className="mx-0.5 text-2xl">&amp;</span>3
          </h1>
          <p>
            This is an alpha version.
            <br />
            Pre-registration is available from <a className="underline">here</a>
            .
          </p>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-orange-300 order-first md:order-none">
        <div className="p-10 flex flex-col w-full max-w-md">
          <h2 className="text-4xl font-bold text-center mb-10 flex items-center justify-center mr-6">
            <KeySquare className="mr-3" size={32} strokeWidth={2.5} />
            Login
          </h2>
          <button className="btn h-16 w-full mb-6">
            <span className="w-6 h-6 fill-gray-800 mr-5">
              <GoogleIcon />
            </span>
            Signin with Google
          </button>
          <button className="btn h-16 w-full mb-6">
            <span className="w-6 h-6 fill-gray-800 mr-5">
              <GithubIcon />
            </span>
            Signin with GitHub
          </button>
        </div>
      </div>
    </div>
  )
}
