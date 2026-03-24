import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export async function signupBrand(formData: FormData) {
  "use server"
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const brandName = formData.get("brand_name") as string

  const supabase = await createClient()

  // 1. Insert the new Brand into public.brands
  const { data: brandData, error: brandError } = await supabase
    .from('brands')
    .insert([{ name: brandName, positioning_statement: '신규 브랜드' }])
    .select('id')
    .single()

  if (brandError || !brandData) {
    console.error("Brand creation failed:", brandError)
    redirect("/signup?error=BrandCreationFailed")
  }

  // 2. Sign up the user via Supabase Auth and inject the brand_id + role
  const { error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        brand_id: brandData.id,
        role: 'admin' // The creator is obviously the brand admin
      }
    }
  })

  if (authError) {
    console.error("Auth signup failed:", authError)
    // Rollback brand theoretically could happen here, but skipped for MVP
    redirect("/signup?error=SignupFailed")
  }

  // Redirect to workspace dashboard on success
  redirect("/app/dashboard")
}
