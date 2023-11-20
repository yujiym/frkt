import { redirect } from 'next/navigation'
import { auth } from '~/auth'
import DashboardClientLayout from '~/components/DashboardClientLayout'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactPortal
}) {
  const session = await auth()
  if (!session) redirect('/login')

  return (
    <DashboardClientLayout session={session}>{children}</DashboardClientLayout>
  )
}
