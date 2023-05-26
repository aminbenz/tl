"use client"
import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "../../../shared-props/col-header"
import { toast } from "@/hooks/use-toast"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type Client = {
  id: string
  name: string
  avatar: string
  registrationDate: string
  role: string
  email: string
  phoneNumber: string
  status: string
}

export const columns: ColumnDef<Client>[] = [
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
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <img
          src={row.original.avatar}
          width="30"
          height="30"
          className="rounded-full"
        />
        <span>{row.original.name}</span>
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      return <a href={`mailto:${row.original.email}`}>{row.original.email}</a>
    },
  },
  {
    accessorKey: "phoneNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const badgeClasses = `inline-block rounded-full px-2 text-xs font-semibold ${
        row.original.status === "active"
          ? "text-green-800"
          : row.original.status === "suspended"
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
              // await api.patch("/users", {
              //   id: row.original.id,
              //   status: newStatus,
              // })
              return toast({ title: "Status updated" })
            } catch (error) {
              return toast({ title: "Something wrong", variant: "destructive" })
            }
          }}
        >
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
          <option value="rejected">Rejected</option>
        </select>
      )
    },
  },
  {
    accessorKey: "role",
    header: "role",
    cell: ({ row }) => {
      const badgeClasses = `inline-block rounded-full px-2 text-xs font-semibold ${
        row.original.role === "admin"
          ? "text-yellow-800"
          : row.original.role === "supplier"
          ? "text-green-800"
          : row.original.role === "deliveryman"
          ? "text-gray-800"
          : "text-gray-800"
      }`
      return (
        <select
          defaultValue={row.original.role}
          className={`${badgeClasses} focus:shadow-outline center block w-full appearance-none rounded border border-gray-400 bg-white p-2 leading-tight shadow hover:border-gray-500 focus:outline-none`}
          onChange={async (e) => {
            const newrole = e.target.value
            try {
              // await api.patch("/users", {
              //   id: row.original.id,
              //   role: newrole,
              // })
              return toast({ title: "role updated" })
            } catch (error) {
              return toast({ title: "Something wrong", variant: "destructive" })
            }
          }}
        >
          <option value="admin">Admin</option>
          <option value="supplier">Supplier</option>
          <option value="deliveryman">Delivery man</option>
        </select>
      )
    },
  },
  {
    accessorKey: "registrationDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Registration Date" />
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
]
