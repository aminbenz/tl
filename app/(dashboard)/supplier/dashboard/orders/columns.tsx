"use client"
import { Button } from "@/components"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "../../../shared-props/col-header"

import clsx from "clsx"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export enum OrderStatus {
  Pending = "pending",
  Confirmed = "confirmed",
  Shipped = "shipped",
  Delivered = "delivered",
  Cancelled = "cancelled",
  Processing = "processing",
  Returned = "returned", // new option
  Refunded = "refunded", // new option
}

type OrderBadgeProps = {
  status: OrderStatus
}

export type Order = {
  id: string
  customerName: string
  email: string
  orderName: string
  orderImage: string
  orderDate: string | Date
  totalPrice: number
  status: OrderStatus
  address: string
  city: string
  state: string
  country: string
  zip: string
  phone: string
  created_at: string
}

export function OrderBadge({ status }: OrderBadgeProps) {
  const getStatusClasses = () => {
    switch (status) {
      case OrderStatus.Pending:
        return "bg-yellow-200 text-yellow-800"
      case OrderStatus.Processing:
        return "bg-blue-200 text-blue-800"
      case OrderStatus.Shipped:
        return "bg-green-200 text-green-800"
      case OrderStatus.Delivered:
        return "bg-green-500 text-white"
      case OrderStatus.Cancelled:
        return "bg-red-200 text-red-800"
      default:
        return "bg-gray-200 text-gray-800"
    }
  }

  return (
    <span
      className={clsx(
        "inline-block rounded-full px-2 py-1 text-xs font-semibold",
        getStatusClasses()
      )}
    >
      {status}
    </span>
  )
}

export const columns: ColumnDef<Order>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order ID" />
    ),
    cell: ({ row }) => `${row.original.id.slice(0, 10)}...`,
  },
  {
    accessorKey: "customerName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Client Name" />
    ),
  },
  {
    accessorKey: "orderName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order Name" />
    ),
    cell: ({ row }) => `${row.original.orderName.slice(0, 10)}...`,
  },
  // {
  //   accessorKey: "email",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Customer Email" />
  //   ),
  // },
  {
    accessorKey: "orderImage",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order Image" />
    ),
    cell: ({ row }) => (
      <img
        src={row.original.orderImage}
        width="50"
        height="50"
        className="rounded-md"
      />
    ),
  },

  // {
  //   accessorKey: "orderItems",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Order Items" />
  //   ),
  // },
  {
    accessorKey: "totalPrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Price" />
    ),
    cell: ({ row }) => {
      const tndPrice = Number(row.original.totalPrice).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      })
      return <span>{tndPrice}</span>
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const badgeClasses = `inline-block rounded-full px-2 text-xs font-semibold ${
        row.original.status === "shipped"
          ? "text-green-800"
          : row.original.status === "pending"
          ? "text-gray-800"
          : "text-red-800"
      }`
      return (
        <select
          defaultValue={row.original.status}
          className={`${badgeClasses} focus:shadow-outline center block w-full appearance-none rounded border border-gray-400 bg-white p-2 leading-tight shadow hover:border-gray-500 focus:outline-none`}
          onChange={async (e) => {
            const newStatus = e.target.value
            try {
              // await api.patch("/config", {
              //   id: row.original.id,
              //   status: newStatus,
              // })
              // return toast({ title: "Status updated" })
            } catch (error) {
              // return toast({ title: "Something wrong", variant: "destructive" })
            }
          }}
        >
          <option value="pending">pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">shipped</option>
          <option value="rejected">Rejected</option>
        </select>
      )
    },
  },
  {
    accessorKey: "orderDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order Date" />
    ),
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="center rounded-2 flex rounded-sm border-2 border-gray-200">
          <DropdownMenu>
            <DropdownMenuTrigger> ... </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  // copyScriptToClipboard(row.original.script)
                }}
              >
                View order details
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  window.location.href =
                    "/admin/dashboard/users/" + row.original.id
                }}
              >
                View customer
              </DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
  // {
  //   accessorKey: "shippingAddress",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Shipping Address" />
  //   ),
  // },
  // {
  //   accessorKey: "billingAddress",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Billing Address" />
  //   ),
  // },
  // {
  //   accessorKey: "paymentMethod",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Payment Method" />
  //   ),
  // },
]

// Export the fake orders data
export default columns
