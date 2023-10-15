import { SITE_TITLE } from '@@/lib/const'
import type { MetaFunction } from '@remix-run/cloudflare'
import { useState } from 'react'

export const meta: MetaFunction = () => {
  return [{ title: `Recipe | ${SITE_TITLE} Dashboard` }]
}

export default function Recipe() {
  const [isLoading, setIsLoading] = useState<Boolean>(false)

  return (
    <>
      <div className="px-4 pt-16 pb-16 flex items-center justify-center bg-yellow-100">
        <h2 className="font-bold text-3xl text-center">
          <p className="text-5xl mb-3">👋</p>
          Welocome to submit New Recipe page!
        </h2>
      </div>
      <div className="mx-auto max-w-2xl py-12 px-6">
        <div>
          <button className="btn-outline w-full py-5 px-8" onClick={() => {}}>
            <span className="text-xl">1. Choose your App ID</span>
          </button>
          <div className="bg-white shadow-md rounded p-6 my-6">
            <h2 className="text-xl mb-4 font-semibold">Your App ID</h2>
            <form>
              <div className="mb-4">
                <label
                  htmlFor="select"
                  className="block text-gray-600 text-sm font-medium mb-2"
                >
                  App IDs
                </label>
                <div className="relative">
                  <select
                    id="select"
                    name="select"
                    className="block appearance-none w-full bg-white border border-gray-400 text-gray-700 py-3 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-blue-400 focus:shadow-outline-blue"
                  >
                    <option value="option1">111111</option>
                    <option value="option2">222222</option>
                    <option value="option3">333333</option>
                  </select>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div>
          <button className="btn-outline w-full py-5 px-8" onClick={() => {}}>
            <span className="text-xl">1. Setup Your Contract Info</span>
          </button>
        </div>
        <div className="bg-white shadow-md rounded p-6 my-6">
          <h2 className="text-xl mb-4 font-semibold">Your Contract info</h2>
          <form>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-600 text-sm font-medium mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-400"
              />
              <label
                htmlFor="symbol"
                className="block text-gray-600 text-sm font-medium mb-2"
              >
                Symbol
              </label>
              <input
                type="text"
                id="symbol"
                name="symbol"
                className="w-full border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-400"
              />
              <label
                htmlFor="description"
                className="block text-gray-600 text-sm font-medium mb-2"
              >
                Description
              </label>
              <input
                type="text"
                id="description"
                name="description"
                className="w-full border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-400"
              />
              <label
                htmlFor="baseTokenUri"
                className="block text-gray-600 text-sm font-medium mb-2"
              >
                BaseToken URI
              </label>
              <input
                type="text"
                id="baseTokenUri"
                name="baseTokenUri"
                className="w-full border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-400"
              />
            </div>
          </form>
        </div>
        <div className="text-center my-4 text-xl">&#9661;</div>
        <div className="text-center my-4 text-xl"></div>
        <div>
          <button className="btn-outline w-full py-5 px-8" onClick={() => {}}>
            <span className="text-xl">2. Deploy Contract</span>
          </button>
        </div>
        <div className="text-center my-4 text-xl">&#9661;</div>
        <div className="text-center my-4 text-xl"></div>
        <div>
          <button className="btn-outline w-full py-5 px-8" onClick={() => {}}>
            <span className="text-xl">3. Choose auth mehod</span>
          </button>
          <div className="bg-white shadow-md rounded p-6 my-6">
            <h2 className="text-xl mb-4 font-semibold">auth method</h2>
            <form>
              <div className="mb-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="googleAuth"
                    name="authMethod"
                    className="form-radio text-blue-500"
                  />
                  <label htmlFor="googleAuth" className="ml-2 text-sm">
                    Google Auth
                  </label>
                </div>
                <div className="flex items-center mt-2">
                  <input
                    type="radio"
                    id="webAuthn"
                    name="authMethod"
                    className="form-radio text-pink-500"
                  />
                  <label htmlFor="fwebAuthn" className="ml-2 text-sm">
                    WebAuthn
                  </label>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="text-center my-4 text-xl">&#9661;</div>
        <div className="text-center my-4 text-xl"></div>
        <div>
          <button className="btn-outline w-full py-5 px-8" onClick={() => {}}>
            <span className="text-xl">4. Generate Widget</span>
          </button>
        </div>
        <div className="text-center my-4 text-xl">&#9661;</div>
        <div className="bg-white shadow-md rounded p-6 my-6">
          <h2 className="text-xl mb-4 font-semibold">Created Widget</h2>
          <div className="rounded-md border p-2 overflow-auto bg-black text-white">
            <pre>
              <code className="language-javascript">
                <div>Widgetをここに生成</div>
              </code>
            </pre>
          </div>
        </div>
        <div className="text-center my-4 text-xl">&#9661;</div>
        <div className="text-center py-8 text-5xl">🎉</div>
      </div>
    </>
  )
}
