"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/utils/supabase/server"

export async function updateBrand(formData: FormData): Promise<void> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return

  const brandId = user.user_metadata?.brand_id
  if (!brandId) return

  const name = formData.get("name") as string
  const positioningStatement = formData.get("positioning_statement") as string

  if (!name) return

  const { error } = await supabase
    .from("brands")
    .update({ 
      name,
      positioning_statement: positioningStatement
    })
    .eq('id', brandId)

  if (error) {
    console.error("Error updating brand:", error.message)
    return
  }

  revalidatePath("/app/brands")
}
