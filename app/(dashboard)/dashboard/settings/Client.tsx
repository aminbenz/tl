"use client"
import useClient from "@/hooks/useClient"

export default function MyComponent() {
  const clientData = useClient()

  if (!clientData) return null

  return <div>aa</div>
}
