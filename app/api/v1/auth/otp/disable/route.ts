import prisma from "@/lib/prisma"
import speakeasy from "speakeasy"
import { NextResponse } from "next/server"

export async function POST(req: Request, res: Response) {
  const { user_id } = await req.json()

  if (!user_id) {
    return NextResponse.json({ message: "user_id required" }, { status: 400 })
  }

  try {
    // Find the OTP record in the database
    await prisma.user.update({
      where: { id: user_id },
      data: { otp_enabled: false },
    })

    await prisma.otp.deleteMany({
      where: { user_id },
    })

    return NextResponse.json({ message: "OTP disabled" })
  } catch (error) {
    return NextResponse.json({ message: "Failed to verify OTP code" })
  }
}

// updated user phone_verified to date if user is verified
