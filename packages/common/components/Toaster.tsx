'use client'
import { useMediaQuery } from 'usehooks-ts'
import { toast, Toaster } from 'react-hot-toast'

export { toast }

export default function ToasterCustom() {
  const small = useMediaQuery('(min-width: 640px)')

  return (
    <Toaster
      position={!small ? 'bottom-center' : 'top-right'}
      toastOptions={{
        style: {
          border: '1px solid #222',
          borderRadius: '0.5rem',
          boxShadow: '0.125rem 0.125rem rgba(0, 0, 0, 0.75)',
          padding: '0.35rem 1rem',
          color: '#222',
        },
        success: {
          style: {
            backgroundColor: '#f0fdf4',
          },
        },
        error: {
          style: {
            backgroundColor: '#fff1f2',
          },
        },
      }}
    />
  )
}
