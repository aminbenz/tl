"use client"
import { z } from "zod"
import { Input, Button } from "@components"
import { useState, useEffect, useRef } from "react"
import { toast } from "@/hooks/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import api from "@/lib/axios"

interface FieldsProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string
}

interface FormProps {
  name?: string
  title?: string
  header?: {
    logo?: any
    title: string
    description?: string
  }
  redirect?: string | boolean
  description?: string
  maxWidth?: string | number
  height?: string | number
  as?: "modal" | "form"
  fields: Array<any>
  schema?: z.ZodObject<any>
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
  endpoint?: string
  onSubmit?: (
    formData: FormData,
    endpoint: string,
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
  ) => Promise<void>
}

function Form({
  name,
  title,
  description,
  height,
  fields,
  schema,
  endpoint,
  onSubmit,
  header,
  as = "form",
  maxWidth = "450px",
  method = "POST",
}: FormProps) {
  const resolver = schema
    ? {
        resolver: zodResolver(schema),
      }
    : {}

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>(resolver)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSubmitForm = async (data: FormData) => {
    setIsLoading(true)
    try {
      if (onSubmit) {
        await onSubmit(data, endpoint as string, method)
      } else if (endpoint) {
        const {
          data: { message },
        } = await api[method.toLowerCase()](endpoint, data)

        toast({ title: message })
      }
    } catch (error) {
      toast({
        title: error.response.data.message,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const modalRef = useRef<HTMLDialogElement>(null)

  const open = () => {
    modalRef.current?.showModal()
  }
  const Form = ({ ...props }) => {
    return (
      <form
        style={{
          maxWidth: maxWidth,
        }}
        method={method}
        action={endpoint}
        onSubmit={handleSubmit(handleSubmitForm)}
        className="grid gap-2"
        {...props}
      >
        <div className="mb-4 flex flex-col space-y-2 text-center">
          {/* <Icons.logo className="mx-auto h-6 w-6" /> */}
          {title && (
            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          )}
          {description && (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {description}
            </p>
          )}
        </div>
        <div className="grid gap-2">
          {fields.map((field) => (
            <div className="grid gap-1">
              <Input
                // maxWidth="inherit"
                {...field}
                disabled={isLoading}
                {...register(field.name)}
              />
              {errors[field.name] && (
                <p className="px-1 text-xs text-red-600">
                  {errors[field.name].message}
                </p>
              )}
            </div>
          ))}
        </div>
        {as === "modal" ? (
          <div className="flex justify-end gap-2">
            <Button variant="outline" value="cancel" formMethod="dialog">
              Cancel
            </Button>
            <Button isLoading={isLoading} disabled={isLoading}>
              Submit
            </Button>
          </div>
        ) : (
          <Button isLoading={isLoading} disabled={isLoading}>
            Submit
          </Button>
        )}
      </form>
    )
  }

  const FormWrapper = ({ children }) => {
    if (as === "modal") {
      return (
        <>
          <button onClick={open}>Show the dialog</button>
          <dialog style={{ maxWidth }} ref={modalRef}>
            {children}
          </dialog>
        </>
      )
    }
    return children
  }

  return (
    <FormWrapper>
      <>
        {header && (
          <div className="flex flex-col space-y-2 text-center">
            {/* <Icons.logo className="mx-auto h-6 w-6" /> */}
            {header.title && (
              <h1 className="text-2xl font-semibold tracking-tight">
                Welcome back
              </h1>
            )}
            {header.description && (
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Enter your email or username to sign in to your account
              </p>
            )}
          </div>
        )}
        <form
          style={{
            maxWidth: maxWidth,
          }}
          method={method}
          action={endpoint}
          onSubmit={handleSubmit(handleSubmitForm)}
          className="grid gap-2"
        >
          <div className="mb-4 flex flex-col space-y-2 text-center">
            {/* <Icons.logo className="mx-auto h-6 w-6" /> */}
            {title && (
              <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
            )}
            {description && (
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {description}
              </p>
            )}
          </div>
          <div className="grid gap-2">
            {fields.map((field) => (
              <div className="grid gap-1">
                <Input
                  // maxWidth="inherit"
                  {...field}
                  disabled={isLoading}
                  {...register(field.name)}
                />
                {errors[field.name] && (
                  <p className="px-1 text-xs text-red-600">
                    {errors[field.name].message}
                  </p>
                )}
              </div>
            ))}
          </div>
          {as === "modal" ? (
            <div className="flex justify-end gap-2">
              <Button variant="outline" value="cancel" formMethod="dialog">
                Cancel
              </Button>
              <Button
                isLoading={isLoading}
                type="submit"
                formMethod="dialog"
                disabled={isLoading}
              >
                Submit
              </Button>
            </div>
          ) : (
            <Button isLoading={isLoading} disabled={isLoading}>
              s
            </Button>
          )}
        </form>
        {/* {footer && (
         <p className="px-8 text-center text-sm text-slate-500 dark:text-slate-400">
         <Link
           href="/register"
           className="hover:text-brand underline underline-offset-4"
         >
           Don&apos;t have an account? Create account
         </Link>
       </p>
      )} */}
      </>
    </FormWrapper>
  )
}

export default Form
