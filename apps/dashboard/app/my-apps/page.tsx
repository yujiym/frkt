'use client'
import { LayoutPanelLeft } from 'lucide-react'
import { PlusSquare } from 'lucide-react'
import { toast } from '@@/components/Toaster'

export default function MyAppsPage() {
  return (
    <>
      <div className="flex items-center justify-center px-4 pb-12 pt-16">
        <h2 className="text-3xl font-bold">
          <LayoutPanelLeft
            size={48}
            strokeWidth={1}
            className="mx-auto mb-2 text-gray-900"
          />
          My Apps
        </h2>
      </div>
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 px-6 py-8 md:grid-cols-2 lg:grid-cols-3">
        <div
          className="card relative bg-white"
          onClick={() => toast.error('ok gooooooood', { icon: '😔' })}
        >
          <a className="flex h-full flex-col">
            <div className="flex flex-1 items-center justify-center px-4 py-12 text-gray-500">
              <PlusSquare size={48} strokeWidth={1} />
            </div>
            <button className="w-full border-t border-black px-4 py-2 text-center font-bold uppercase">
              Create new app
            </button>
          </a>
        </div>
        <div className="card bg-white">
          <a className="flex h-full flex-col">
            <div className="flex-1 bg-slate-100 px-4 py-12">
              <div className="flex items-center justify-center text-lg ">
                My EC App
              </div>
            </div>
            <div className="w-full border-t border-black px-4 py-2 text-right text-sm">
              Created at .....
            </div>
            <button className="w-full border-t border-black px-4 py-2 text-center font-bold uppercase">
              Show
            </button>
          </a>
        </div>
      </div>
    </>
  )
}
