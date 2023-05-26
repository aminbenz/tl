import { notFound } from "next/navigation"

import { deliveryDashboardConfig } from "@/config/dashboard"
import { getCurrentUser } from "@/lib/session"
import { DashboardNav } from "@/components/nav"
import Header from "../../header"
import { PermissionDeniedError } from "@/lib/exceptions"

interface DashboardLayoutProps {
  children?: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user = await getCurrentUser()
  
  if (!user || (user.role !== "ADMIN" && user.account_type !== "deliveryman")) {
    throw new PermissionDeniedError("Only Deliveryman or Admins can access this resource.")
  }
  return (
    <div className="mx-auto flex flex-col space-y-6">
      <Header />
      <div className="container grid gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav items={deliveryDashboardConfig.sidebarNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  )
}
