import DashboardLayout from '~components/DashboardLayout'
import { SITE_TITLE } from '@@/lib/const'

export const metadata = {
  title: `Recipes | ${SITE_TITLE} Dashboard`,
}

export default function MyRecipesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardLayout>{children}</DashboardLayout>
}
