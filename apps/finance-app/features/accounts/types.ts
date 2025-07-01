import { z } from "zod"
import { CaptchaSchema, LoginSchema, RegisterSchema } from "./schema"

export type Captcha = z.infer<typeof CaptchaSchema>

export interface CaptchaData{
  captcha_id: string,
  pic_path: string,
  captcha_length: number,
}

export type LoginRequest = z.infer<typeof LoginSchema>
export type RegisterRequest = z.infer<typeof RegisterSchema>

export interface Tenant {
  tenant_id: string,
  tenant_name: string,
  created_at: number,
}

export interface OAuth {
  session_id: string,
  access_token: string,
  refresh_token: string,
}

export interface User {
  user_id: string,
  user_name: string,
  phone: string,
  email: string,
  password: string,
  access_token: string,
  refresh_token: string,
  session_id: string,
  tenant: Tenant,
}