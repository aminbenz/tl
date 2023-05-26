"use client"
import { Button } from "@/components"
import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "../../../shared-props/col-header"
import OrderBadge from "../../../shared-props/orderBadge"
import Link from "next/link"

export type Order = {
  id: string
  customerName: string
  email: string
  orderName: string
  orderImage: string
  orderDate: string | Date
  totalPrice: number
  status: string
  address: string
  city: string
  state: string
  country: string
  zip: string
  phone: string
  orderNumber: number
  deliveryAddress: string
}

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "orderNumber",
    header: "Order Number",
  },
  {
    accessorKey: "customerName",
    header: "Customer Name",
  },
  {
    accessorKey: "orderDate",
    header: "Order Date",
  },
  {
    accessorKey: "status",
    header: "Order Status",
    cell: ({ row }) => <OrderBadge status={row.original.status} />,
  },
  {
    accessorKey: "deliveryAddress",
    header: "Delivery Address",
  },
  {
    accessorKey: "deliveryTime",
    header: "Delivery Time",
  },
  {
    accessorKey: "contactCustomer",
    header: "Contact Customer",
    cell: ({ row }) => <a href={`mailto:${row.original.email}`}>Contact</a>,
  },
  {
    accessorKey: "acceptOrder",
    header: "Accept Order",
    cell: ({ row }) => (
      <Button onClick={() => alert("Order accepted")}>Accept</Button>
    ),
  },
  {
    accessorKey: "orderHistory",
    header: "Order History",
    cell: ({ row }) => <Link href={`/order-history/${11}`}>View History</Link>,
  },
  {
    accessorKey: "validateOrder",
    header: "Validate Order",
    cell: ({ row }) => (
      <Button onClick={() => alert("Order validated")}>Validate</Button>
    ),
  },
]

export default columns
