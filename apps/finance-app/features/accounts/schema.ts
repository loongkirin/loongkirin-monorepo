import { z } from "zod";

export const CaptchaSchema = z.object({
  captcha_id: z.string(),
  captcha_value: z.string(),
})

export const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
  password: z.string().min(1, "Password is required"),
  captcha: CaptchaSchema,
})

export const RegisterSchema = z.object({
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirm_password: z.string(),
  user_name: z.string().min(1, "User name is required"),
  tenant_name: z.string().min(1, "Tenant name is required"),
  captcha: CaptchaSchema,
}).refine((data) => data.password === data.confirm_password, {
  message: "Passwords don't match",
  path: ["confirm_password"],
})
