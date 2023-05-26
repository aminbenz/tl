import { DashboardHeader } from "@/components/header"
import { PostItem } from "@/components/post-item"
import { DashboardShell } from "@/components/shell"

const rows = 6

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Manage Orders"
        text="Create and manage orders."
      />
      <div className="divide-y divide-neutral-200 rounded-md border border-slate-200">
        {Array(rows)
          .fill(rows)
          .map(() => (
            <PostItem.Skeleton />
          ))}
      </div>
    </DashboardShell>
  )
}
