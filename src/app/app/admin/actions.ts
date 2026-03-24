"use server"

import { createClient as createSupabaseAdmin } from "@supabase/supabase-js"
import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

export async function inviteTeamMember(formData: FormData): Promise<void> {
  const email = formData.get("email") as string
  const role = formData.get("role") as string // 'analyst' | 'reviewer'
  
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error("Missing SUPABASE_SERVICE_ROLE_KEY")
    return
  }

  const supabaseServer = await createClient()
  const { data: { user }, error: authError } = await supabaseServer.auth.getUser()
  
  if (authError || !user) {
    console.error("권한이 없습니다.")
    return
  }

  const brandId = user.user_metadata?.brand_id
  if (!brandId) {
    console.error("소속된 브랜드가 없습니다.")
    return
  }

  // Admin Client to bypass normal auth limits to invite users
  const supabaseAdmin = createSupabaseAdmin(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )

  const { data, error } = await supabaseAdmin.auth.admin.inviteUserByEmail(email, {
    data: {
      brand_id: brandId,
      role: role
    }
  })

  if (error) {
    console.error("Invite Error: ", error)
    return
  }

  revalidatePath('/app/admin')
}
