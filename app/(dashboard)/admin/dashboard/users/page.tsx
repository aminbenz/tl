import { faker } from "@faker-js/faker"
import { Client, columns } from "./columns"
import { DataTable } from "./data-table"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import api from "@/lib/axios"

export const metadata = {
  title: "User Accounts",
  description: "View and validate user accounts and manage their information.",
}

export const revalidate = 10

async function generateData(
  items: number = 20,
  delay: number = 0
): Promise<Client[]> {
  const clients: Client[] = []
  for (let i = 0; i < items; i++) {
    const elp = (v: string, n: number) =>
      (v = v.length >= n ? v.slice(0, n) + "..." : v)

    const client: Client = {
      id: faker.string.uuid(),
      name: elp(faker.person.fullName(), 15),
      email: elp(faker.internet.email(), 20),
      role: faker.helpers.arrayElement([
        "admin",
        "supplier",
        "user",
        "deliveryman",
      ]),

      phoneNumber: faker.phone.number("5# ### ###"),
      status: faker.helpers.arrayElement(["active", "suspended", "disabled"]),
      registrationDate: new Date(faker.date.past()).toLocaleDateString(),
      avatar: faker.image.avatar(),
    }

    clients.push(client)

    if (delay) {
      await new Promise((resolve) => setTimeout(resolve, delay * 1000))
    }
    // Delay execution for the specified number of seconds
  }

  return clients
}

export default async function DemoPage() {
  const clients = await generateData(10)

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Manage Client Accounts"
        text="View and validate client accounts and manage their information."
      />
      <div className="grid gap-4">
        <DataTable columns={columns} data={clients} />
      </div>
    </DashboardShell>
  )
}
