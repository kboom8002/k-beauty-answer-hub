"use server"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

export async function savePatch(formData: FormData) {
  const patchType = formData.get("patch_type") as string
  const content = formData.get("content") as string
  const patchId = formData.get("patch_id") as string

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "로그인이 필요합니다." }

  const brandId = user.user_metadata?.brand_id
  if (!brandId) return { error: "브랜드 정보가 없습니다." }

  if (patchId) {
    // Update existing
    const { error } = await supabase
      .from('agent_patches')
      .update({ content, patch_type: patchType })
      .eq('id', patchId)
      .eq('brand_id', brandId)
    if (error) return { error: error.message }
  } else {
    // Insert new
    const { error } = await supabase
      .from('agent_patches')
      .insert([{ brand_id: brandId, patch_type: patchType, content }])
    if (error) return { error: error.message }
  }

  revalidatePath('/app/agent-patches')
  return { success: true }
}

export async function deletePatch(patchId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "로그인이 필요합니다." }

  const { error } = await supabase
    .from('agent_patches')
    .delete()
    .eq('id', patchId)
    .eq('brand_id', user.user_metadata?.brand_id)

  if (error) return { error: error.message }
  
  revalidatePath('/app/agent-patches')
  return { success: true }
}
