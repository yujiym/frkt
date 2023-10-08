import { SITE_TITLE, SITE_DESCRIPTION } from '@@/common/lib/const'
import AdminLayout from '~/components/AdminLayout'
import type { MetaFunction } from '@remix-run/node'

export const meta: MetaFunction = () => {
  return [
    { title: `${SITE_TITLE} Dashboard` },
    { name: 'description', content: SITE_DESCRIPTION },
  ]
}

export default function Index() {
  return (
    <AdminLayout>
      <div className="p-6">aaaa</div>
    </AdminLayout>
  )
}
