'use client'

import { signIn } from 'next-auth/react'
import { GoogleIcon, GithubIcon } from '@@/components/Icons'
import { DASHBOARD_HOST } from '@@/lib/const'

export default function LoginPage() {
  const callbackUrl: string = `${DASHBOARD_HOST}/home`

  return (
    <>
      <button
        className="btn-outline mb-6 h-16 w-full"
        onClick={() => signIn('github', { callbackUrl })}
      >
        <span className="mr-5 h-6 w-6 fill-gray-800">
          <GithubIcon />
        </span>
        Signin with GitHub
      </button>
      <button
        disabled
        className="btn-outline mb-6 h-16 w-full"
        onClick={() => signIn('google', { callbackUrl })}
      >
        <span className="mr-5 h-6 w-6 fill-gray-800">
          <GoogleIcon />
        </span>
        Signin with Google
      </button>
    </>
  )
}
