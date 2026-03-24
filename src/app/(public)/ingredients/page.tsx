import { Badge } from "@/components/ui/badge"
import { createClient } from "@/utils/supabase/server"
import { Suspense } from "react"
import { IngredientFilterState } from "./IngredientFilterState"

export const revalidate = 3600;

export default async function IngredientsIndex(
  props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }
) {
  const searchParams = await props.searchParams;
  const q = typeof searchParams?.q === 'string' ? searchParams.q : '';
  const tag = typeof searchParams?.tag === 'string' ? searchParams.tag : '';

  const supabase = await createClient()
  let query = supabase.from('ingredients').select('*').order('name')
  
  if (q) {
    query = query.or(`name.ilike.%${q}%,description.ilike.%${q}%`)
  }
  if (tag) {
    query = query.contains('benefits_tags', [tag])
  }

  const { data: ingredients } = await query

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-4 text-zinc-900 dark:text-zinc-100">성분 질문 허브</h1>
        <p className="text-zinc-500 dark:text-zinc-400">K-뷰티 제품의 핵심 성분별 결론과 효과를 확인하세요.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <Suspense fallback={<aside className="w-full md:w-64 space-y-6 shrink-0 h-32 animate-pulse bg-zinc-100 dark:bg-zinc-800 rounded-xl" />}>
          <IngredientFilterState />
        </Suspense>
        
        <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ingredients?.map(ing => (
            <a key={ing.slug} href={`/ingredients/${ing.slug}`} className="block group">
              <div className="p-5 rounded-xl border border-zinc-200 bg-white hover:border-indigo-300 hover:shadow-md transition-all dark:bg-zinc-900 dark:border-zinc-800 dark:hover:border-indigo-500">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-zinc-900 group-hover:text-indigo-600 dark:text-zinc-100 dark:group-hover:text-indigo-400">{ing.name}</h3>
                  <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-400">Guides</Badge>
                </div>
                <p className="text-sm text-zinc-500 mb-4 dark:text-zinc-400 line-clamp-2">{ing.description}</p>
                <div className="flex gap-1.5 flex-wrap">
                  {ing.benefits_tags?.map((tag: string) => (
                    <span key={tag} className="text-xs px-2 py-0.5 bg-zinc-100 text-zinc-600 rounded-md dark:bg-zinc-800 dark:text-zinc-300">#{tag}</span>
                  ))}
                </div>
              </div>
            </a>
          ))}
          {(!ingredients || ingredients.length === 0) && (
            <div className="col-span-2 text-center py-10 text-zinc-500 dark:text-zinc-400">
              해당하는 성분 검색 결과가 없습니다.
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
