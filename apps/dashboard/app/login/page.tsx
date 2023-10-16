import { KeySquare } from 'lucide-react'
import { SITE_TITLE } from '@@/lib/const'
import Logo from '@@/components/svgs/Logo'
import { GoogleIcon, GithubIcon } from '@@/components/Icons'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@@/components/ui/Tooltip'
import { HOST } from '@@/lib/const'

export const metadata = {
  title: `Login | ${SITE_TITLE} Dashboard`,
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="flex lg:basis-7/12 flex-1 bg-primary">
        <div className="flex flex-col justify-center md:items-start md:justify-between py-8 px-10 w-full">
          <div>
            <Logo size={160} />
            <h1 className="text-3xl font-bold mb-8 mt-3">
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
      <div className="flex lg:basis-5/12 flex-1 items-center justify-center order-first md:order-none">
        <div className="px-8 py-16 flex flex-col w-full max-w-md">
          <h2 className="text-4xl font-bold text-center mb-10 flex items-center justify-center mr-6">
            <KeySquare className="mr-3" size={32} strokeWidth={2.5} />
            Login
          </h2>
          <button className="btn-outline h-16 w-full mb-6">
            <span className="w-6 h-6 fill-gray-800 mr-5">
              <GithubIcon />
            </span>
            Signin with GitHub
          </button>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="w-full">
                <button disabled className="btn-outline h-16 w-full mb-6">
                  <span className="w-6 h-6 fill-gray-800 mr-5">
                    <GoogleIcon />
                  </span>
                  Signin with Google
                </button>
              </TooltipTrigger>
              <TooltipContent>Not available at the moment.</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  )
}
