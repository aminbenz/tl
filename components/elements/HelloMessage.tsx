"use client"
import { useSession } from "next-auth/react"

export default function Hello() {
  const { data: session, status } = useSession()

  if (!session) return

  return (
    <h2 className="text-2xl underline decoration-sky-900">
      Hello, {session?.user?.name}
    </h2>
  )
}
