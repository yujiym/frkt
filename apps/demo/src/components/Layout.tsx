// import { useState } from 'react'
import {
  //signInWithEmail,
  signInWithGoogle,
} from '../utils/auth'
import useAuth from '../hooks/useAuth'

export default function Layout({
  hideHeader = false,
  name = '',
  children,
}: {
  children: React.ReactNode
  hideHeader?: boolean
  name?: string
}) {
  const { user, loading, logout } = useAuth()
  console.log(user)

  return (
    <div>
      {loading && (
        <div className="flex items-center justify-center h-screen w-screen fixed top-0 right-0 left-0 bg-slate-600/30 text-gray-700">
          <span className="loading loading-dots loading-lg" />
        </div>
      )}
      {!hideHeader && (
        <nav className="fixed top-0 right-0 left-0 h-16 flex items-center px-6">
          <div className="flex-1">
            <div className="breadcrumbs">
              <ul>
                <li>
                  <a href="/">FRKT demos</a>
                </li>
                <li className="font-bold">{name}</li>
              </ul>
            </div>
          </div>
          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="">
                <a className="rounded-full bg-slate-50/90 px-5 py-2.5 cursor-pointer">
                  {user.email}
                </a>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-4 shadow menu menu-sm dropdown-content bg-base-300 rounded-box w-36"
              >
                <li>
                  <a
                    className="justify-between px-4 py-1.5"
                    onClick={() => {
                      logout()
                    }}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <LoginButton />
          )}
        </nav>
      )}
      <main>{children}</main>
    </div>
  )
}

const LoginButton = () => {
  // const [formData, setFormData] = useState({
  //   email: '',
  //   password: '',
  // })

  // const signInEmail = async () => {
  //   const user = await signInWithEmail(formData.email, formData.password)
  //   if (user) {
  //     document.getElementById('login_modal').hideModal()
  //   }
  // }

  return (
    <>
      <button
        className="btn bg-gray-400/80 hover:opacity-90 border-none text-white px-5 normal-case rounded-full"
        onClick={() =>
          (document as any).getElementById('login_modal')!.showModal()
        }
      >
        Login to try
      </button>
      <dialog id="login_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box text-gray-800">
          <h3 className="text-4xl text-center font-dot mt-6 mb-10">Login</h3>
          <a
            className="btn btn-lg w-full mb-0 bg-gray-200 normal-case"
            onClick={() => signInWithGoogle()}
          >
            <span className="text-xl mr-1">
              <img src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg" />
            </span>{' '}
            Login with Google
          </a>
          {/* <hr />
          <div className="px-1 space-y-4 mb-4 mt-8">
            <input
              type="email"
              placeholder="email"
              value={formData.email || ''}
              className="input input-bordered w-full"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="password"
              value={formData.password || ''}
              className="input input-bordered w-full"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          <a
            className="btn btn-lg w-full bg-gray-200 normal-case"
            onClick={() => signInEmail()}
          >
            <span className="text-xl">✉️</span> Login with Email
          </a> */}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}
