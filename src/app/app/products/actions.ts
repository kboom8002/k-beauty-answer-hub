"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"

export async function createProduct(formData: FormData): Promise<void> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const brandId = user.user_metadata?.brand_id
  if (!brandId) {
    console.error("User does not have a brand associated")
    return
  }

  const name = formData.get("name") as string
  const sectorId = formData.get("sector_id") as string
  
  if (!name) return

  const { data, error } = await supabase
    .from("products")
    .insert([{ 
      name, 
      sector_id: sectorId || null, 
      brand_id: brandId 
    }])
    .select("id")
    .single()

  if (error) {
    console.error("Error creating product:", error.message)
    redirect(`/app/products/new?error=${encodeURIComponent(error.message)}`)
  }
  
  // Optionally, create an empty dossier immediately so it's "Drafting" status
  await supabase.from("product_dossiers").insert([{ product_id: data.id }])

  revalidatePath("/app/products")
  redirect("/app/products")
}
