import { redirect } from "next/navigation"
import { getAdminFromCookie, AdminUser } from "@/lib/auth"

export async function requireAdmin(): Promise<AdminUser> {
  const admin = await getAdminFromCookie()
  
  if (!admin) {
    redirect("/admin/login")
  }

  return admin
}

export async function getAdminUser(): Promise<AdminUser | null> {
  return await getAdminFromCookie()
}
