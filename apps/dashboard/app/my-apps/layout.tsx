import DashboardLayout from '~components/DashboardLayout'
import { SITE_TITLE } from '@@/lib/const'

export const metadata = {
  title: `My Apps | ${SITE_TITLE} Dashboard`,
}

export default function MyAppsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardLayout>{children}</DashboardLayout>
}
