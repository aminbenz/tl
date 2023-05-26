import { z } from "zod"

import { NextResponse } from "next/server"

export const errorHandler = (error: any) => {
  console.log("🚀 ~ file: errors.ts:21 ~ errorHandler ~ error:", error)

  if (error.name === "ZodError") {
    return NextResponse.json(
      {
        message: error.errors[0].message,
        error: error.flatten(),
      },
      { status: 400 }
    )
  } else {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
