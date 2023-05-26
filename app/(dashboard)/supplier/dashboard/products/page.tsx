import { faker } from "@faker-js/faker"
import { DataTable } from "./data-table"
import { ProductStatus, Product, columns } from "./columns"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import api from "@/lib/axios"

export const metadata = {
  title: "Products",
  description: "View and manage products in your inventory.",
}

const items = 30
const delay = 2
export const revalidate = 10

// Generate fake product data for testing purposes
async function generateData(
  items: number = 20,
  delay: number = 2
): Promise<Product[]> {
  const products: Product[] = []
  for (let i = 0; i < items; i++) {
    const product: Product = {
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
      image: faker.image.urlLoremFlickr({ category: "product" }),
      description: faker.commerce.productDescription(),
      price: Number(faker.finance.amount()),
      status: faker.helpers.arrayElement([
        "available",
        "out_of_stock",
        "backordered",
      ]),
    }

    products.push(product)
  }
  await new Promise((resolve) => setTimeout(resolve, delay * 1000))
  return products
}

export default async function DemoPage() {
  const numProducts = 10
  const products = await generateData(numProducts)

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Manage Products"
        text="View and manage products in your inventory."
      />
      <div className="grid gap-4">
        <DataTable columns={columns} data={products} />
      </div>
    </DashboardShell>
  )
}
