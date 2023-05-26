import React, { useState, useEffect } from "react"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

export default async function ClientPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Supplier Dashboard"
        text="View and manage orders and products"
      />
    </DashboardShell>
  )
}
