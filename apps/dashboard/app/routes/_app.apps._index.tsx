import { LayoutPanelLeft } from 'lucide-react'
import type { MetaFunction } from '@remix-run/cloudflare'
import { PlusSquare } from 'lucide-react'
import { SITE_TITLE } from '@@/lib/const'
import { toast } from '@@/components/Toaster'

export const meta: MetaFunction = () => {
  return [{ title: `My Apps | ${SITE_TITLE} Dashboard` }]
}

export default function Apps() {
  return (
    <>
      <div className="px-4 pt-16 pb-12 flex items-center justify-center">
        <h2 className="font-bold text-3xl">
          <LayoutPanelLeft
            size={48}
            strokeWidth={1}
            className="mx-auto mb-2 text-gray-900"
          />
          My Apps
        </h2>
      </div>
      <div className="py-8 px-6 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          className="card bg-white relative"
          onClick={() => toast.error('ok gooooooood', { icon: '😔' })}
        >
          <a className="flex flex-col h-full">
            <div className="py-12 px-4 flex flex-1 items-center justify-center text-gray-500">
              <PlusSquare size={48} strokeWidth={1} />
            </div>
            <button className="w-full px-4 py-2 border-t border-black font-bold text-center uppercase">
              Create new app
            </button>
          </a>
        </div>
        <div className="card bg-white">
          <a className="flex flex-col h-full">
            <div className="py-12 px-4 flex-1 bg-slate-100">
              <div className="flex items-center justify-center text-lg ">
                My EC App
              </div>
            </div>
            <div className="w-full px-4 py-2 border-t border-black text-sm text-right">
              Created at .....
            </div>
            <button className="w-full px-4 py-2 border-t border-black font-bold text-center uppercase">
              Show
            </button>
          </a>
        </div>
      </div>
    </>
  )
}
