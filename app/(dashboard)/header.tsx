import { notFound } from "next/navigation"

import { dashboardConfig } from "@/config/dashboard"
import { getCurrentUser } from "@/lib/session"
import { MainNav } from "@/components/main-nav"
import { UserAccountNav } from "@/components/user-account-nav"
import { getSession } from "@/lib/session"
import { AuthRequiredError } from "@/lib/exceptions"

interface DashboardLayoutProps {
  children?: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const session = await getSession()
  const user = await getCurrentUser()

  const main = dashboardConfig.mainNav
  const accountType = user?.account_type?.toLowerCase()
  const role = session?.user.role?.toLowerCase()
  
  main.map((i) => {
    const t = i.title.toLowerCase()
    if (t === accountType || t === role) {
      i.disabled = false
    }
    return i
  })



  return (
    <header className="container sticky top-0 z-40 bg-white">
      <div className="flex h-16 items-center justify-between border-b border-b-slate-200 py-4">
        <MainNav items={main} />
        <UserAccountNav user={session?.user} />
      </div>
    </header>
  )
}
