import { faker } from "@faker-js/faker"
import { DataTable } from "./data-table"
import { OrderStatus, Order, columns } from "./columns"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import api from "@/lib/axios"

export const metadata = {
  title: "Orders",
  description: "View and validate orders and manage their information.",
}

const items = 30
const delay = 2
export const revalidate = 10

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
      customerName: faker.person.firstName(),
      email: faker.internet.email(),
      orderName: faker.commerce.productName(),
      orderImage: faker.image.urlLoremFlickr({ category: "food" }),
      totalPrice: Number(faker.finance.amount()),
      orderDate: new Date(faker.date.past()).toLocaleDateString(
        "en-US",
        options
      ),
      status: faker.helpers.arrayElement([
        "confirmed",
        "shipped",
        "delivered",
        "cancelled",
        "processing",
        "returned",
        "refunded",
      ]),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      country: faker.location.country(),
      zip: faker.location.zipCode(),
      phone: faker.phone.number(),
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
        heading="My Orders history"
        text="View your orders history."
      />
      <div className="grid gap-4">
        <DataTable columns={columns} data={orders} />
      </div>
    </DashboardShell>
  )
}
