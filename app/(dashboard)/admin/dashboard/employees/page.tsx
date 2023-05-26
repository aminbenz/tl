import { faker } from "@faker-js/faker"
import { Employee, columns } from "./columns"
import { DataTable } from "./data-table"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

export const metadata = {
  title: "User Accounts",
  description: "View and validate user accounts and manage their information.",
}

const items = 30
const delay = 2
export const revalidate = 2

async function generateData(
  items: number = 20,
  delay: number = 0
): Promise<Employee[]> {
  const employees: Employee[] = []
  for (let i = 0; i < items; i++) {
    const elp = (v: string, n: number) =>
      (v = v.length >= n ? v.slice(0, n) + "..." : v)

    const employee: Employee = {
      id: faker.string.uuid(),
      email: elp(faker.internet.email(), 20),
      name: elp(faker.person.fullName(), 15),
      avatar: faker.image.avatar(),
      hireDate: new Date(faker.date.past()).toLocaleDateString(),
      jobTitle: elp(faker.person.jobTitle(), 15),
      department: faker.commerce.department(),
      salary: faker.number
        .int({ min: 200, max: 5000 })
        .toLocaleString("en-US", {
          style: "currency",
          currency: "TND",
        }),
    }
    employees.push(employee)

    // Delay execution for the specified number of seconds
  }
  await new Promise((resolve) => setTimeout(resolve, delay * 1000))

  return employees
}

export default async function DemoPage() {
  const employees = await generateData()

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Manage Employees Accounts"
        text="View and validate employees accounts and manage their information."
      />
      <div className="grid gap-4">
        <DataTable columns={columns} data={employees} />
      </div>
    </DashboardShell>
  )
}
