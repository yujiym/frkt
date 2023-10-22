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

export default function SignDoc() {
  // signId
  const signId = 5

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
      <div className="container mx-auto max-w-3xl px-6 pb-24 pt-10">
        <h2 className="mb-1 text-3xl font-bold">SIGN DOCUMENT for XXXXXXX</h2>
        <h2 className="text-xl font-bold">Contract No. 202310220000XXXXX</h2>
        <div className="pt-10">
          <img
            src="/img/simpleContract.png"
            className="w-full border-2 border-gray-700 object-fill"
          />
        </div>
        <div className="flex flex-col justify-between pt-10">
          <button
            className="btn btn-neutral mt-8 w-full "
            disabled={!user}
            onClick={() =>
              handleClick(
                `http://localhost:3003/a/0002/r/0002?w=true&signId=${signId}`
              )
            }
          >
            {user ? 'Sign Document' : 'Login to Sign Document'}
          </button>
        </div>
      </div>
    </Layout>
  )
}
