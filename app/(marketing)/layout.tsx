import { SiteFooter } from "@/components/site-footer"
import { getSession } from "@/lib/session"
import Header from "../(dashboard)/header"
import { MainNav } from "@/components/main-nav"
import { UserAccountNav } from "@/components/user-account-nav"
interface MarketingLayoutProps {
  children: React.ReactNode
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  const session = await getSession()
  const user = session?.user

  const main = [
    {
      title: "Dashboard",
      href: `/${user?.role.toLowerCase()}/dashboard`,
      disabled: user?.role === "USER",
    },
    {
      title: "Contact",
      href: "/contact",
      disabled: false,
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="container sticky top-0 z-40 bg-white">
        <div className="flex h-16 items-center justify-between border-b border-b-slate-200 py-4">
          <MainNav items={main} />
          <UserAccountNav user={user} />
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}
