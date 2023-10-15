'use client'
import { Suspense } from 'react'
import Widget from '~/components/Widget'

export default async function WidgetPage() {
  return (
    <Suspense>
      <Widget />
    </Suspense>
  )
}
