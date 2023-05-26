import { DataTable } from "./data-table"
import { Order, columns } from "./columns"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { faker } from "@faker-js/faker"

export const metadata = {
  title: "Orders",
  description: "View and validate orders and manage their information.",
}

// Generate fake orders data for testing purposes
async function generateData(
  items: number = 20,
  delay: number = 2
): Promise<Order[]> {
  const options = { year: "numeric", month: "short", day: "numeric" } as any
  const orders: Order[] = []
  for (let i = 0; i < items; i++) {
    const order: Order = {
      id: faker.string.uuid(),
      orderNumber: faker.number.int({ min: 0, max: 20 }),
      customerName: faker.person.firstName(),
      orderDate: new Date(faker.date.past()).toLocaleDateString(
        "en-US",
        options
      ),
      status: faker.helpers.arrayElement([
        "pending",
        "confirmed",
        "shipped",
        "delivered",
        "cancelled",
        "processing",
        "returned",
        "refunded",
      ]),
      deliveryAddress: faker.location.streetAddress(),
      deliveryTime: faker.date.future().toLocaleTimeString("en-US"),
    }

    orders.push(order)
  }
  await new Promise((resolve) => setTimeout(resolve, delay * 1000))
  return orders
}

export default async function DemoPage() {
  const numOrders = 10
  const orders = await generateData(numOrders)

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Orders accepted"
        text="Manage Orders accepted history"
      />
      <div className="grid gap-4">
        <DataTable columns={columns} data={orders} />
      </div>
    </DashboardShell>
  )
}
