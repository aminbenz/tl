"use client"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { toast } from "@/hooks/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { cn } from "@/lib/utils"
import { userRegisterSchema } from "@/validation/zod"
import { Icons } from "@/components/icons"
import { Input, Button } from "@components"
import getFormData from "@/lib/getFormData"
import api from "@/lib/axios"
import Link from "next/link"
import { Registration } from "@/validation/zod/register"

interface Helper {
  message: string
  isError: boolean
  href?: string
  field: string
}

const accountTypes = ["client", "deliveryman", "supplier"]

const formFields = [
  {
    name: "name",
    type: "text",
    placeholder: "Enter your name",
  },
  {
    name: "phone",
    type: "tel",
    placeholder: "Enter phone number",
  },
  {
    name: "company_name",
    type: "text",
    placeholder: "Enter Company name",
  },
  {
    name: "email",
    type: "email",
    placeholder: "Enter your email",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Enter your password",
  },
]

export default function UserAuthForm({ className, ...props }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Registration>()
  const [isLoading, setIsLoading] = useState(false)
  const [isGitHubLoading, setIsGitHubLoading] = useState(false)
  const [isEmailLoading, setIsEmailLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [error, setError] = useState(null)
  const [helper, setHelper] = useState<Helper | null>(null)
  const [accountType, setAccountType] = useState("client")
  const router = useRouter()

  const FormField = ({ name, ...props }) => {
    const err_pos =
      error &&
      error.fieldErrors &&
      error.fieldErrors[name]?.length &&
      error.fieldErrors[name][0]

    return (
      <div className="grid gap-1">
        <Input {...register(name)} {...props} />
        {errors[name] && (
          <p className="px-1 text-xs text-red-600">{errors[name].message}</p>
        )}
        {error && <p className="px-1 text-xs text-red-600">{err_pos}</p>}
      </div>
    )
  }

  async function onSubmit(data) {
    try {
      setIsEmailLoading(true)
      const {
        data: { message, result },
      } = await api.post(`/auth/register`, {
        ...data,
        account_type: accountType,
      })

      toast({
        title: `${message}`,
      })
      await signIn("credentials", {
        email: result.email,
        password: result.password,
        redirect: false,
      })
      const path = `${
        accountType === "/supplier"
          ? accountType
          : accountType === "/deliveryman"
          ? "/delivery"
          : ""
      }/dashboard`

      router.push(path)
    } catch ({ response: { data } }) {
      const { message, error, code } = data
      setError(error)

      if (code === 1 || code === 2) {
        const goTo = code === 1 ? "login" : code === 2 ? "register" : ""
        setHelper({
          message: `${message}, ${goTo}`,
          isError: true,
          href: goTo,
          field: "email",
        })
      }

      if (code === 3) {
        setHelper({
          message: `${message}, Forget password?`,
          href: "forget-password",
          field: "password",
          isError: true,
        })
      }

      toast({
        title: message,
        variant: "destructive",
      })
    } finally {
      setIsEmailLoading(false)
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setHelper(null)
    }, 20000)

    return () => clearTimeout(timeout)
  }, [error, helper])

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          {accountType === "supplier" ? (
            <>
              {formFields.slice(0, 3).map((field) => (
                <FormField {...field} />
              ))}
            </>
          ) : accountType === "deliveryman" ? (
            <>
              {formFields.slice(0, 2).map((field) => (
                <FormField {...field} />
              ))}
            </>
          ) : null}

          {formFields.slice(3).map((field) => (
            <FormField {...field} />
          ))}

          <div className="flex justify-between gap-2">
            {accountTypes.map((t) => {
              return (
                <Button
                  key={t}
                  type="button"
                  onClick={() => {
                    setAccountType(t)
                    console.log(t)
                  }}
                  variant={t !== accountType ? "outline" : "default"}
                  // isLoading={isEmailLoading}
                  disabled={isLoading}
                >
                  {t}
                </Button>
              )
            })}
          </div>

          <Button isLoading={isEmailLoading} disabled={isLoading}>
            Register as {accountType}
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-slate-300" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-slate-600">Or continue with</span>
        </div>
      </div>
      {/* Auth Providers */}
      <section className="grid gap-3">
        <Button
          icon={<Icons.google className="mr-2 h-4 w-4" />}
          type="button"
          variant="outline"
          onClick={() => {
            setIsGoogleLoading(true)
            signIn("google")
          }}
          isLoading={isGoogleLoading}
          disabled={isEmailLoading}
        >
          Google
        </Button>
      </section>
    </div>
  )
}
