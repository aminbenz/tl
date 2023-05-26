import { adminDashboardConfig } from "@/config/dashboard"
import { DashboardNav } from "@/components/nav"
import { getSession } from "@/lib/session"
import { PermissionDeniedError } from "@/lib/exceptions"
import Header from "../../header"

interface DashboardLayoutProps {
  children?: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const session = await getSession()

  if (session?.user.role !== "ADMIN") {
    throw new PermissionDeniedError("Only admins can access this resource.")
  }

  return (
    <div className="mx-auto flex flex-col space-y-6">
      <Header />
      <div className="container grid gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav items={adminDashboardConfig.sidebarNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  )
}
