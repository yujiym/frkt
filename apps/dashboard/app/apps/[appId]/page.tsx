'use client'
import { LayoutPanelLeft } from 'lucide-react'
import AppForm from '@@/components/AppForm'
import AppGasForm from '@@/components/AppGasForm'

export default function AppPage() {
  return (
    <>
      <div className="flex items-center justify-center bg-orange-100 px-4 pb-12 pt-16">
        <h2 className="text-3xl font-bold">
          <LayoutPanelLeft
            size={48}
            strokeWidth={1}
            className="mx-auto mb-2 text-gray-900"
          />
          Setup your app
        </h2>
      </div>
      <div className="mx-auto  max-w-xl px-6 py-8">
        <AppForm />
        <div className="mb-8 mt-12 border-b border-black" />
        <AppGasForm />
      </div>
    </>
  )
}
