import DashboardLayout from '~/components/DashboardLayout'
import { SITE_TITLE } from '@@/lib/const'

export const metadata = {
  title: `Recipes | ${SITE_TITLE} Dashboard`,
}

export default async function MyRecipesLayout({
  children,
}: {
  children: React.ReactPortal
}) {
  return <DashboardLayout>{children}</DashboardLayout>
}
