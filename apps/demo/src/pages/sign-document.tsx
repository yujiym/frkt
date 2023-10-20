import Layout from '../components/Layout'
import useAuth from '../hooks/useAuth'
import { signContract as meta } from '../utils/const'

function handleClick(url: string) {
  const popup = window.open(url, '_blank', 'width=480,height=780')
  // Check if the popup was blocked
  if (!popup || popup.closed || typeof popup.closed === 'undefined') {
    // Popup blocked, fallback to redirect flow
    window.location.href = url
  } else {
    // If the popup wasn't blocked, proceed with the popup flow
    // (e.g., listen for messages from the popup, etc.)
  }
}

export default function Home() {
  // signId 
  const signId = 4

  const { user } = useAuth()

  return (
    <Layout name={meta.name}>
      <div className="bg-blue-300 px-6 text-center text-white">
        <div className="mx-auto max-w-2xl py-20">
          <h2 className="font-dot mb-8 mt-6 text-6xl font-bold">
            {meta.appName}
          </h2>
          <div>
            <p className="text-2xl">{meta.description}</p>
            <div className="mt-2 space-y-2">
              {meta.stacks.map((stack) => (
                <div
                  key={stack.toLocaleLowerCase()}
                  className="mr-3 inline-flex rounded-full bg-slate-50/90 px-4 py-1.5 text-sm text-gray-600"
                >
                  {stack}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto grid max-w-4xl grid-cols-1 gap-0 px-6 pb-10 md:grid-cols-3 md:gap-8">
        <div className="col-span-2 pt-10">
          <img src="/img/simpleContract.png" className="w-full rounded-lg object-fill" />
        </div>
        <div className="flex flex-col justify-between pt-10">
          <button
              className="btn btn-success w-full mt-12"
              disabled={!user}
              onClick={() =>
                handleClick(
                  `http://localhost:3005/a/0002/r/0002?token=${user.accessToken!}&signId=${signId}`
                )
              }
            >
              {user ? 'Sign' : 'Login to Sign'}
            </button>
        </div>
      </div>
    </Layout>
  )
}
