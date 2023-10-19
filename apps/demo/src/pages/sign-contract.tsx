import { useEffect, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { useQuery } from 'urql'
import Layout from '../components/Layout'
import Loading from '../components/Loading'
import query from '../graphql/query'
import useAuth from '../hooks/useAuth'
import { SignContractInfos, signContract as meta } from '../utils/const'

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`

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
  const [safeAddress, setSafeAddress] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [encodeUri, setEncodeUri] = useState<string>('')
  const [numPages, setNumPages] = useState<number>()
  const [pageNumber, setPageNumber] = useState<number>(1)

  // signId
  const signId = 1

  // execute subgraph query
  const [result] = useQuery({
    query,
    variables: { signId },
  })
  const { data, fetching } = result
  const queryResult: SignContractInfos = data

  console.log('data:', queryResult)

  const { user } = useAuth()

  useEffect(() => {
    if (data != undefined) {
      const uri = data.signContractCreateds[0].uri
      console.log('uri:', uri)
      setEncodeUri(uri)
      setFileName(data.signContractCreateds[0].name)
      setSafeAddress(data.signContractCreateds[0].safeAddress)
    }
  })

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages)
  }

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
      {fetching ? (
        <Loading />
      ) : (
        <div className="container max-w-4xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-8 pb-10">
          <div className="pt-10 flex flex-col">
            <h1>{fileName}</h1>
            <button
              className="btn btn-success w-full mt-12"
              disabled={!user}
              onClick={() =>
                handleClick(
                  `http://localhost:3005/a/0002/r/0002?token=${user.accessToken!}&signId=${signId}&safeAddress=${safeAddress}`
                )
              }
            >
              {user ? 'Sign' : 'Login to Sign'}
            </button>
            <div className="col-span-2 pt-10">
              <Document file={encodeUri} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} height={1000} />
              </Document>
              <p>
                Page {pageNumber} of {numPages}
              </p>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}
