"use server"

import { cookies } from "next/headers"
import axios, { createRequest, createResponse, Response } from "@/lib/rest-api-client"
import { CaptchaData, LoginRequest, OAuth, RegisterRequest, User } from "./types"

const AccessTokenKey = "access_token"
const RefreshTokenKey = "refresh_token"
const SessionKey = "session_id"

export async function login(data: LoginRequest): Promise<Response<User>> {
//   console.log("login data", data)
  const requestData = createRequest(data)
  const response = await axios.post("/auth/login", requestData)
//   console.log("login response", response)
  return response.data  
}

export async function register(data: RegisterRequest): Promise<Response<User>> {
  console.log("register data", data)
  const requestData = createRequest(data)
  const response = await axios.post("/auth/register", requestData)
  console.log("register response", response)
  return response.data
// return createResponse(response.data.code, response.data.message, { ...response.data.result?.data } as User)
}

export async function logout(): Promise<Response<void>> {
  const response = await axios.post("/auth/logout")
  console.log("logout response", response)
  return response.data
}
    
export async function fetchCaptcha(): Promise<Response<CaptchaData>> {
  const response = await axios.get("/auth/captcha")
// console.log("fetchCaptcha response", response)
  return response.data
}

export async function getAccessToken() {
  const cookieStore = await cookies()
  return cookieStore.get(AccessTokenKey)?.value
}

export async function getRefreshToken() {
  const cookieStore = await cookies()
  return cookieStore.get(RefreshTokenKey)?.value
}

export async function getSession() {
  const cookieStore = await cookies()
  return cookieStore.get(SessionKey)?.value
}

export async function saveOAuth(oauth: OAuth) {
  const cookieStore = await cookies()
  const secure = process.env.NODE_ENV === 'production'
  cookieStore.set(AccessTokenKey, oauth.access_token, {
    httpOnly: true,
    secure: secure,
    sameSite: "lax",
  })
  cookieStore.set(RefreshTokenKey, oauth.refresh_token, {
    httpOnly: true,
    secure: secure,
    sameSite: "lax",
  })
  cookieStore.set(SessionKey, oauth.session_id, {
    httpOnly: true,
    secure: secure,
    sameSite: "lax",
  })
}