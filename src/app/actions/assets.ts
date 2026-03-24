'use server'

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from 'next/navigation'

export async function savePrescription(productId: string, questions: any[]) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  // Insert dossier
  const { error } = await supabase.from('product_dossiers').insert({
    product_id: productId,
    questions_ladder: JSON.stringify(questions),
    summary: "AI Generated Prescription Flow"
  })
  
  if (error) {
    console.error(error)
    throw new Error("Failed to save dossier")
  }

  revalidatePath('/app/products')
  redirect('/app/products')
}

export async function saveAnswerDraft(productId: string, questionText: string, answerText: string, boundaryText: string, evidenceRefs: string[]) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")
    
  const brandId = user?.user_metadata?.brand_id || '33333333-3333-3333-3333-333333333331' 

  const { error } = await supabase.from('answer_assets').insert({
    brand_id: brandId,
    product_id: productId,
    asset_type: 'card',
    status: 'in_review',
    title: questionText.substring(0, 40) + '...',
    question_text: questionText,
    answer_body: answerText,
    boundary_text: boundaryText,
    evidence_refs: JSON.stringify(evidenceRefs)
  })
  
  if (error) {
    console.error(error)
    throw new Error("Failed to save answer draft")
  }
  
  revalidatePath('/app/dashboard')
  revalidatePath('/app/products/[id]/builder', 'page')
  redirect('/app/dashboard')
}

export async function processReviewDecision(assetId: string, isApproved: boolean, comment: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  const status = isApproved ? 'published' : 'draft'
  
  // 1. Update Asset Status and Visibility
  const { error: updateErr } = await supabase.from('answer_assets').update({
    status: status,
    visibility: isApproved
  }).eq('id', assetId)

  if (updateErr) throw new Error("Update target asset failed")

  // 2. Insert Review Record Log
  const { error: reviewErr } = await supabase.from('expert_reviews').insert({
    asset_id: assetId,
    reviewer_id: user.id,
    decision: status,
    reason_codes: comment ? [comment] : []
  })

  revalidatePath('/app/reviews/queue')
  revalidatePath('/app/dashboard')
  revalidatePath('/')
  
  return true
}
