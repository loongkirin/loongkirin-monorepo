import React from "react"

import { LoginForm } from "@/features/accounts/components/login-form"

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  )
}

export default page