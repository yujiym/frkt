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
  const { user } = useAuth()

  return (
    <Layout name={meta.name}>
      <div className="bg-blue-300 text-white px-6 text-center">
        <div className="mx-auto max-w-2xl py-20">
          <h2 className="font-dot font-bold text-6xl mt-6 mb-8">
            {meta.appName}
          </h2>
          <div>
            <p className="text-2xl">{meta.description}</p>
            <div className="space-y-2 mt-2">
              {meta.stacks.map((stack) => (
                <div className="rounded-full px-4 py-1.5 bg-slate-50/90 text-sm text-gray-600 inline-flex mr-3">
                  {stack}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="container max-w-4xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-8 pb-10">
        <div className="pt-10 flex flex-col">
          <button
            className="btn btn-success w-full mt-12"
            disabled={!user}
            onClick={() =>
              handleClick(
                `http://localhost:3003/a/000/r/001?token=${user.accessToken!}`
              )
            }
          >
            {user ? 'Sign' : 'Login to Sign'}
          </button>
          <div className="col-span-2 pt-10">Contract is here</div>
        </div>
      </div>
    </Layout>
  )
}
