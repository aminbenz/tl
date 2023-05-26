import React from "react"

interface IChart {
  children: React.ReactNode
  title: string
}

function Chart({ children, title }: IChart) {
  return (
    <div className="shadow-xs min-w-0 rounded-lg bg-white p-4 dark:bg-gray-800">
      <p className="mb-4 font-semibold text-gray-800 dark:text-gray-300">
        {title}
      </p>
      {children}
    </div>
  )
}

export default Chart
