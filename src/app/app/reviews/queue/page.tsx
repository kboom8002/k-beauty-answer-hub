import { createClient } from "@/utils/supabase/server"
import { ReviewQueueClient } from "./ReviewQueueClient"

export default async function ReviewQueuePage() {
  const supabase = await createClient()
  
  // Fetch only pending assets
  const { data: queue } = await supabase
    .from('answer_assets')
    .select('*, product:products(name)')
    .eq('status', 'in_review')
    .order('created_at', { ascending: true })

  return <ReviewQueueClient initialQueue={queue || []} />
}
