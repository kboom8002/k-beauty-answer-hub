"use server"

import { createClient } from "@/utils/supabase/server"

export async function searchGlobal(query: string) {
  if (!query || query.length < 2) return { ingredients: [], concerns: [] }
  
  const supabase = await createClient()
  
  const [ingRes, conRes] = await Promise.all([
    supabase.from('ingredients').select('name, slug').ilike('name', `%${query}%`).limit(3),
    supabase.from('concerns').select('name, slug').ilike('name', `%${query}%`).limit(3)
  ])
  
  return {
    ingredients: ingRes.data || [],
    concerns: conRes.data || []
  }
}
