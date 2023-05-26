import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { Card } from "@/components/ui/card"

export const metadata = {
  title: "General",
  description: "Manage..",
}

export default async function BillingPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="General" text="Manage" />
      <div className="grid gap-10">
        <Card>
          <Card.Header>
            <Card.Title>
              Hello {user.name} your role is {user.role}/{user.account_type}
            </Card.Title>
          </Card.Header>
          <Card.Content className="grid gap-1 space-y-4 pb-6 text-sm">
            <p>This is a demo app</p>
          </Card.Content>
        </Card>
      </div>
    </DashboardShell>
  )
}
