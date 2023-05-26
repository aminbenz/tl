import bcrypt from "bcrypt"
import prisma from "@/lib/prisma"
import { errorHandler } from "@/helpers/errors"
import { NextResponse } from "next/server"
import generateUsernameFromEmail from "@/helpers/generateUsernameFromEmail"
import {
  registrationSchema,
  Registration,
  AccountType,
  clientSchema,
  deliverymanSchema,
  supplierSchema,
} from "@/validation/zod/register"

async function generateUniqueUsername(username) {
  let newUsername = username
  let counter = 1
  while (await prisma.user.findUnique({ where: { username: newUsername } })) {
    counter++
    newUsername = `${username}${counter}`
  }
  return counter > 1 ? newUsername : username
}

export async function POST(request: Request, response: Response) {
  try {
    const body: Registration = await request.json()
    const { email, password, account_type, phone, ...restProps } = body

    let parsedSchema
    switch (account_type) {
      case AccountType.CLIENT:
        parsedSchema = clientSchema.parse(body)
        break
      case AccountType.DELIVERYMAN:
        parsedSchema = deliverymanSchema.parse(body)
        break
      case AccountType.SUPPLIER:
        parsedSchema = supplierSchema.parse(body)
        break
      default:
        parsedSchema = clientSchema.parse(body)
    }

    const username = generateUsernameFromEmail(email)
    const suggestedUsername = await generateUniqueUsername(username)

    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (
      account_type === AccountType.SUPPLIER ||
      account_type === AccountType.DELIVERYMAN
    ) {
      const existingUserByPhone = await prisma.user.findUnique({
        where: { phone },
      })

      if (existingUserByPhone) {
        return NextResponse.json(
          {
            message: `User with this phone number already exists`,
            result: null,
          },
          { status: 400 }
        )
      }
    }

    if (existingUser) {
      return NextResponse.json(
        {
          message: `User with this email already exists`,
          result: null,
          code: 1,
        },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = await prisma.user.create({
      data: {
        // first_name,
        // last_name,
        // name: `${first_name} ${last_name}`,
        account_type,
        phone,
        email,
        password: hashedPassword,
        username: suggestedUsername,
        name: username,
        ...restProps,
      },
    })

    return NextResponse.json(
      {
        message: `User created successfully`,
        result: user,
      },
      { status: 201 }
    )
  } catch (error) {
    console.log("🚀 ~ file: route.ts:87 ~ POST ~ error:", error)
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
        { error: error, message: error.message },
        { status: 500 }
      )
    }
  }
}
