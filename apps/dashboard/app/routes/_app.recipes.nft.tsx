import type { MetaFunction } from '@remix-run/cloudflare'
import { SITE_TITLE } from '@@/lib/const'

export const meta: MetaFunction = () => {
  return [{ title: `Recipe | ${SITE_TITLE} Dashboard` }]
}

export default function Recipe() {
  return (
    <div>
      <h2>A NFT RECIPE</h2>
    </div>
  )
}
