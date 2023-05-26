import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import { z, ZodError } from "zod"
import type { ZodSchema } from "zod"
import { NextResponse } from "next/server"
// export function withValidation<T extends ZodSchema>(
//   schema: T,
//   handler: NextApiHandler
// ) {
//   return async function (req: NextApiRequest, res: NextApiResponse) {
//     try {
//       const body = req.body ? req.body : {}

//       await schema.parse(body)

//       return handler(req, res)
//     } catch (error) {
//       if (error instanceof ZodError) {
//         console.log("🚀 ~ file: with-validation.ts:18 ~ error:", error)
//       }
//     }
//   }
// }

export function withValidation<T extends ZodSchema>(
  handler: NextApiHandler,
  schema: T
) {
  return async (request: any, response: any) => {
    try {
      schema.parse(await request.json())
      await handler(request, response)
    } catch (error) {
      if (error instanceof ZodError) {
        return response.status(422).json({
          message: error.errors[0].message,
          error: error,
        })
      }
      if (error instanceof ZodError) {
        return response.status(422).json({
          message: "Prisma",
          error: error,
        })
      } else {
        return response.status(500).json({
          message: "Something went wrong",
          error: error,
        })
      }
    }
  }
}
