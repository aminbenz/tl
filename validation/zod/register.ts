import { z } from "zod"
import { emailSchema, passwordSchema, phoneSchema } from "."

export enum AccountType {
  CLIENT = "client",
  DELIVERYMAN = "deliveryman",
  SUPPLIER = "supplier",
}

const userSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})

export const clientSchema = userSchema

export const supplierSchema = z
  .object({
    account_type: z.literal(AccountType.SUPPLIER),
    name: z
      .string({
        required_error: "Please provide name",
        invalid_type_error: "Name must be a string",
      })
      .min(3, "Name must be at least 3 characters")
      .max(25) ,
    company_name: z
      .string({
        required_error: "Please provide company name",
        invalid_type_error: "company name must be a string",
      })
      .min(1, "Company name is required"),
    phone: phoneSchema,
  })
  .merge(userSchema)

export const deliverymanSchema = z
  .object({
    account_type: z.literal(AccountType.DELIVERYMAN),
    name: z
      .string({
        required_error: "Please provide name",
        invalid_type_error: "Name must be a string",
      })
      .min(3, "Name must be at least 3 characters")
      .max(25),
    phone: phoneSchema,
  })
  .merge(userSchema)

export const registrationSchema = z.union([
  clientSchema,
  supplierSchema,
  deliverymanSchema,
])

export type Registration = z.infer<typeof registrationSchema>
