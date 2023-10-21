'use server'
import WidgetIframe from '~/components/WidgetIframe'
import Widget from '~/components/Widget'

export default async function WidgetPage({
  searchParams,
}: {
  searchParams: any
}) {
  const sp = await searchParams
  return sp?.w ? <Widget /> : <WidgetIframe />
}
