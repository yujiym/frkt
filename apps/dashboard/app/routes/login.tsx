import { Form } from '@remix-run/react'
import type {
  MetaFunction,
  LoaderFunction,
  LoaderFunctionArgs,
} from '@remix-run/cloudflare'
import { KeySquare } from 'lucide-react'
import { SITE_TITLE } from '@@/lib/const'
import Logo from '@@/assets/img/logo.svg'
import { GoogleIcon, GithubIcon } from '@@/components/Icons'
import { getAuthenticator } from '~/services/auth.server'

export const meta: MetaFunction = () => {
  return [{ title: `Login | ${SITE_TITLE} Dashboard` }]
}

export const loader: LoaderFunction = async ({
  request,
  context,
}: LoaderFunctionArgs) => {
  const authenticator = getAuthenticator(context)
  return await authenticator.isAuthenticated(request, {
    successRedirect: '/',
  })
}

export default function Index() {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="flex flex-1 items-center justify-center">
        <div className="px-8 py-16">
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
        <div className="px-8 py-16 flex flex-col w-full max-w-md">
          <h2 className="text-4xl font-bold text-center mb-10 flex items-center justify-center mr-6">
            <KeySquare className="mr-3" size={32} strokeWidth={2.5} />
            Login
          </h2>
          <Form method="post" action="/auth/github">
            <button className="btn-outline h-16 w-full mb-6">
              <span className="w-6 h-6 fill-gray-800 mr-5">
                <GithubIcon />
              </span>
              Signin with GitHub
            </button>
          </Form>
          <Form method="post" action="/auth/google">
            <button disabled className="btn-outline h-16 w-full mb-6">
              <span className="w-6 h-6 fill-gray-800 mr-5">
                <GoogleIcon />
              </span>
              Signin with Google
            </button>
          </Form>
        </div>
      </div>
    </div>
  )
}
