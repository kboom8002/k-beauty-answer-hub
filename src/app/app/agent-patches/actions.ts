"use server"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

export async function savePatch(formData: FormData): Promise<void> {
  const patchType = formData.get("patch_type") as string
  const content = formData.get("content") as string
  const patchId = formData.get("patch_id") as string

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const brandId = user.user_metadata?.brand_id
  if (!brandId) return

  if (patchId) {
    // Update existing
    const { error } = await supabase
      .from('agent_patches')
      .update({ content, patch_type: patchType })
      .eq('id', patchId)
      .eq('brand_id', brandId)
    if (error) { console.error(error.message); return; }
  } else {
    // Insert new
    const { error } = await supabase
      .from('agent_patches')
      .insert([{ brand_id: brandId, patch_type: patchType, content }])
    if (error) { console.error(error.message); return; }
  }

  revalidatePath('/app/agent-patches')
}

export async function deletePatch(patchId: string): Promise<void> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const { error } = await supabase
    .from('agent_patches')
    .delete()
    .eq('id', patchId)
    .eq('brand_id', user.user_metadata?.brand_id)

  if (error) { console.error(error.message); return; }
  
  revalidatePath('/app/agent-patches')
}
