import { Badge } from "@/components/ui/badge"
import { createClient } from "@/utils/supabase/server"
import { Suspense } from "react"
import { ConcernFilterState } from "./ConcernFilterState"

export const revalidate = 3600;

export default async function ConcernsIndex(
  props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }
) {
  const searchParams = await props.searchParams;
  const q = typeof searchParams?.q === 'string' ? searchParams.q : '';

  const supabase = await createClient()
  let query = supabase.from('concerns').select('*').order('name')
  
  if (q) {
    query = query.or(`name.ilike.%${q}%,definition.ilike.%${q}%`)
  }

  const { data: concerns } = await query

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-4 text-zinc-900 dark:text-zinc-100">피부 고민 질의 허브</h1>
        <p className="text-lg text-zinc-500 dark:text-zinc-400">현재 겪고 있는 증상이나 문제를 선택하세요. 증상에 대한 원인 분석과 명확한 해결 성분을 제안합니다.</p>
        
        <Suspense fallback={<div className="h-14 max-w-xl mx-auto rounded-full mt-8 bg-zinc-100 dark:bg-zinc-800 animate-pulse" />}>
          <ConcernFilterState />
        </Suspense>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {concerns?.map(concern => (
          <a key={concern.slug} href={`/concerns/${concern.slug}`} className="block group">
            <div className="p-6 rounded-2xl border border-zinc-200 bg-white hover:border-emerald-300 hover:shadow-lg transition-all h-full flex flex-col dark:bg-zinc-900 dark:border-zinc-800 dark:hover:border-emerald-500">
              <h3 className="text-xl font-bold text-zinc-900 mb-2 group-hover:text-emerald-600 dark:text-zinc-100 dark:group-hover:text-emerald-400">{concern.name}</h3>
              <p className="text-sm text-zinc-500 mb-6 flex-1 dark:text-zinc-400">{concern.definition}</p>
              
              <div className="flex gap-2 border-t pt-4 border-zinc-100 mt-auto dark:border-zinc-800">
                <Badge variant="secondary" className="bg-zinc-100 text-zinc-600 font-normal dark:bg-zinc-800 dark:text-zinc-300">
                  Guides
                </Badge>
              </div>
            </div>
          </a>
        ))}
        {(!concerns || concerns.length === 0) && (
          <div className="col-span-3 text-center py-10 text-zinc-500 dark:text-zinc-400">
            데이터베이스에 등록된 피부 고민이 없습니다.
          </div>
        )}
      </div>
    </div>
  )
}
