"use client"
import Link from "next/link"
import { FiLogOut } from "react-icons/fi"
import { Button } from "@/components"
import { signOut } from "next-auth/react"
export default function Error() {
  const type = "danger"

  return (
    <main className={`error-page gradient-bg-anim bg bg-${type}`}>
      <span className={`badge ${type}`}>ErrorUserNotFound</span>
      <h1 className="title"> User not found</h1>
      <p className="desc">
        Try to <strong>logout</strong> or <strong>clear session</strong>. to
        clear session
      </p>
      <ul>
        <li>Open developer tools (ctrl + shift + i)</li>
        <li>Go to Application TAB</li>
        <li>Go to Cockies</li>
        <li>Clear data</li>
      </ul>
      <div className="btn-group">
        {/* @ts-ignore */}
        <Button color={type} size="lg" variant="outline" onClick={signOut}>
          <FiLogOut />
          <span>Logout</span>
        </Button>
        <Link href="/">
          {/* @ts-ignore */}
          <Button size="lg">Take me home</Button>
        </Link>
      </div>
    </main>
  )
}
