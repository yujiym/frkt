import DashboardLayout from '~/components/DashboardLayout'
import { SITE_TITLE } from '@@/lib/const'

export const metadata = {
  title: `Home | ${SITE_TITLE} Dashboard`,
}

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardLayout>{children}</DashboardLayout>
}
