'use client'
import { GoogleIcon, GithubIcon } from '@@/components/Icons'
import { signIn } from 'next-auth/react'

export default function LoginPage() {
  return (
    <>
      <button
        className="btn-outline mb-6 h-16 w-full"
        onClick={() => signIn('github')}
      >
        <span className="mr-5 h-6 w-6 fill-gray-800">
          <GithubIcon />
        </span>
        Signin with GitHub
      </button>
      <button
        disabled
        className="btn-outline mb-6 h-16 w-full"
        onClick={() => signIn('google')}
      >
        <span className="mr-5 h-6 w-6 fill-gray-800">
          <GoogleIcon />
        </span>
        Signin with Google
      </button>
    </>
  )
}
