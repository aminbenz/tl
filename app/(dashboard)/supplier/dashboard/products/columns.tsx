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

export enum ProductStatus {
  InStock = "in_stock",
  OutOfStock = "out_of_stock",
  Discontinued = "discontinued",
}

type ProductBadgeProps = {
  status: ProductStatus
}

export type Product = {
  id: string
  name: string
  description: string
  image: string
  price: number
  status: ProductStatus
}

export function ProductBadge({ status }: ProductBadgeProps) {
  const getStatusClasses = () => {
    switch (status) {
      case ProductStatus.InStock:
        return "bg-green-500 text-white"
      case ProductStatus.OutOfStock:
        return "bg-red-500 text-white"
      case ProductStatus.Discontinued:
        return "bg-gray-500 text-white"
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

export const columns: ColumnDef<Product>[] = [
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
      <DataTableColumnHeader column={column} title="Product ID" />
    ),
    cell: ({ row }) => `${row.original.id.slice(0, 10)}...`,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product Name" />
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => `${row.original.description.slice(0, 10)}...`,
  },
  {
    accessorKey: "image",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product Image" />
    ),
    cell: ({ row }) => (
      <img
        src={row.original.image}
        width="50"
        height="50"
        className="rounded-md"
      />
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => {
      const formattedPrice = Number(row.original.price).toLocaleString(
        "en-US",
        {
          style: "currency",
          currency: "USD",
        }
      )
      return <span>{formattedPrice}</span>
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => <ProductBadge status={row.original.status} />,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button icon={<MoreHorizontal />} variant="outline" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>View</DropdownMenuItem>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    enableSorting: false,
    enableHiding: false,
  },
]
