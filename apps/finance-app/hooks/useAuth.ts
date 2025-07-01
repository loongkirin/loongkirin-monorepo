import { OAuth, Tenant, User } from "@/features/accounts/types"
import { create } from "zustand"

type AuthSate = {
  user: User,
  oauth: OAuth,
  tenant: Tenant,
  setUser: (user: User) => void,
  setOAuth: (oauth: OAuth) => void,
  setTenant: (tenant: Tenant) => void,
}

export const useAuth = create<AuthSate>((set) => ({
  user: {} as User,
  oauth: {} as OAuth,
  tenant: {} as Tenant,
  setUser: (user: User) => set(() => ({ user: user })),
  setOAuth: (oauth: OAuth) => set(() => ({ oauth: oauth })),
  setTenant: (tenant: Tenant) => set(() => ({ tenant: tenant })),
}))