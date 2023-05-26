import { object, string, literal, union, z } from "zod"
import { validateUsername } from "../pure"
import { USERNAME_REGEX, EMAIL_REGEX, PASSWORD_REGEX } from "@/validation/regex"

export const passwordSchema = string({
  required_error: "Please enter a password",
  invalid_type_error: "Password must be a string",
})
  .min(8, {
    message: "Password must be at least 8 characters long",
  })
  .max(20, { message: "Password must be 20 or fewer characters long" })
  .refine((value) => PASSWORD_REGEX.test(value), {
    message:
      "Password must contain at least one uppercase letter, one lowercase letter, and one number",
  })

export const emailSchema = z
  .string({
    required_error: "Please enter a email",
    invalid_type_error: "Email must be a text",
  })
  .email({ message: "Please enter a valid email address" })

export const phoneSchema = z
  .string({
    required_error: "Please provide phone number",
    invalid_type_error: "Phone must be a string",
  })
  .min(8, "Phone number must be at least 8 characters")
  .max(20, "phone number must be at max 20 characters")

export const usernameSchema = string({
  required_error: "Please enter a username",
  invalid_type_error: "Username must be a text",
})
  .min(4, {
    message: "Username = must be at least 4 characters long",
  })
  .refine(
    (val) => {
      return USERNAME_REGEX.test(val) && val.length >= 4 && val.length <= 20
    },
    {
      message:
        "Username contains invalid characters or is not between 4 and 20 characters",
    }
  )

// Define an enum for the account types

export const userRegisterSchema = object({
  email: emailSchema,
  password: passwordSchema,
})

export const userLoginSchema = object({
  username: string({
    required_error: "Please provide your email or username",
    invalid_type_error: "Email or username must be a text",
  })
    .nonempty({ message: "Please provide your email or username" })
    .refine(
      (val) => {
        return val.includes("@")
          ? EMAIL_REGEX.test(val)
          : USERNAME_REGEX.test(val)
      },
      {
        message: "Please provide your email or username",
      }
    ),
  password: string({
    required_error: "Please provide your password",
    invalid_type_error: "Password must be a string",
  }).nonempty({ message: "Please provide your password" }),
}).strict()

export const smsSchema = object({
  phone: string().min(10).max(20),
  method: z.enum(["sms", "call"]),
})

export const resetPasswordSchema = object({
  user_id: string().optional(),
  phone: string().optional(),
  email: string().optional(),
  new_password: passwordSchema,
  confirm_new_password: string(),
}).refine((data) => data.new_password === data.confirm_new_password, {
  path: ["new_password"],
  message: "Password don't match",
})
