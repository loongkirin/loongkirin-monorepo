"use client"

import { Card, CardContent } from "@loongkirin/ui/components/card"
import { useRouter } from "next/navigation"
import Link from "next/link"
// import { useMutation } from "@tanstack/react-query"
import { Query } from "@loongkirin/ui/providers/query-provider"
import { register } from "@/features/accounts/actions"
// import { toast } from "sonner"
import { Sonner } from "@loongkirin/ui/components/sonner"
import { useAppForm } from "@loongkirin/ui/components/form"
import { Form, FormContent, FormFooter, FormHeader, FormTitle } from "@loongkirin/ui/components/form-components"
import { RegisterRequest } from "../types"
import { RegisterSchema } from "../schema"

export function RegisterForm() {
  const router = useRouter()

  const form = useAppForm({
    defaultValues:{
      email: "",
      phone: "",
      password: "",
      captcha: {
        captcha_id: "",
        captcha_value: "",
      },
      confirm_password: "",
      tenant_name: "",
      user_name: "",
    } as RegisterRequest,
    validators: {
      onChange: RegisterSchema,
    },
    onSubmit: ({ value }) => {
      console.log("register form value:", value)
      mutation.mutate(value);
    },
  })

  const mutation = Query.useMutation({
    mutationFn: (data: RegisterRequest) => {
      return register(data);
    },
    onSuccess: (data) => {
      console.log("register success", data);
      if(data.isSuccess()) {
        Sonner.toast.success("Register success, please login")
        router.push("/account/login")
      } else {
        Sonner.toast.error(data.message || "Error occured while registering, please try again later")
      }
    },
    onError: (error) => {
      console.log("register error", error);
      Sonner.toast.error("Error occured while registering, please try again later")
    }
  })

  return (
    <>
      <Card className="overflow-hidden p-0 min-w-[400px]">
        <CardContent className="p-0">
          <Form>
            <FormHeader>
              <FormTitle>
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Register</h1>
                  <p className="text-muted-foreground text-balance">
                    Register your family finance account
                  </p>
                </div>
              </FormTitle>
            </FormHeader>
            <FormContent
              onSubmit={e => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}>
              <form.AppField
                name="user_name"
                children={(field) => <field.FormInputField label="User Name" placeholder="Your Name" />}
              />
              <form.AppField
                name="email"
                children={(field) => <field.FormInputField type={"email"} label="Email" placeholder="exampe@exampe.com" />}
              />
              <form.AppField
                name="phone"
                children={(field) => <field.FormInputField label="Phone" placeholder="Your phone" />}
              />
              <form.AppField
                name="password"
                children={(field) => <field.FormInputField label="Password" placeholder="Password" type="password" />}
              />
              <form.AppField
                name="confirm_password"
                children={(field) => <field.FormInputField label="Confirm Password" placeholder="Confirm Password" type="password" />}
              />
              <form.AppField
                name="tenant_name"
                children={(field) => <field.FormInputField label="Family Name" placeholder="Your Family Name" classesName={{root: "md:col-span-2"}}/>}
              />
              <form.AppField
                name="captcha"
                children={(field) => <field.FormCaptchaField label="Captcha" fetchUrl="/api/v1/auth/captcha"/>}
              />
              <form.AppForm>
                <form.FormSubscribeButton className="md:mt-5 xl:mt-0">Register</form.FormSubscribeButton>
              </form.AppForm>
            </FormContent>
            <FormFooter className="flex flex-col">
              <div className="w-full after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or
                </span>
              </div>
              <div className="text-center text-sm mt-2">
                Already have an account?{" "}
                <Link href="/account/login" className="underline underline-offset-4">
                  Login
                </Link>
              </div>
            </FormFooter>
          </Form>
        </CardContent>
      </Card>   
    </>
  )
}
