import { createClient } from "@/utils/supabase/server"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Box } from "lucide-react"
import { createProduct } from "../actions"

export default async function NewProductPage(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const searchParams = await props.searchParams;
  const error = searchParams?.error as string | undefined;
  
  const supabase = await createClient()
  
  // Fetch available sectors for the dropdown
  const { data: sectors } = await supabase.from('sectors').select('id, name').order('name')

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="mb-8">
        <a href="/app/products" className="inline-flex items-center text-sm text-zinc-500 hover:text-zinc-800 mb-4 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" /> 돌아가기
        </a>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <Box className="w-6 h-6 text-indigo-500" /> 새 제품 등록
        </h1>
        <p className="text-zinc-500 mt-2 dark:text-zinc-400">
          우리 브랜드의 신규 제품을 워크스페이스에 등록하고, AI 에코시스템 자산을 구축을 시작하세요.
        </p>
      </div>

      <div className="bg-white border border-zinc-200 rounded-xl p-6 md:p-8 shadow-sm dark:bg-zinc-900/50 dark:border-zinc-800">
        {error && (
          <div className="mb-6 p-4 text-sm bg-red-50 border border-red-200 text-red-800 rounded-lg dark:bg-red-950/30 dark:border-red-900/50 dark:text-red-400 font-medium">
            ⚠️ 제품 등록 실패: 권한 부족(RLS) 또는 데이터베이스 오류입니다.
            <br />
            <span className="text-xs opacity-80 mt-1 block">사유: {error}</span>
          </div>
        )}
        <form action={createProduct} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              제품명 (Product Name) <span className="text-red-500">*</span>
            </label>
            <Input 
              id="name" 
              name="name" 
              required 
              placeholder="예: 인텐시브 리페어 세라마이드 크림" 
              className="dark:bg-zinc-950 dark:border-zinc-800"
            />
            <p className="text-xs text-zinc-500">공식 풀네임을 입력해주세요.</p>
          </div>

          <div className="space-y-2">
            <label htmlFor="sector_id" className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              카테고리 (Sector)
            </label>
            <select 
              id="sector_id" 
              name="sector_id"
              className="flex h-9 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300 dark:bg-zinc-950"
            >
              <option value="">카테고리 선택 안 함</option>
              {sectors?.map(sector => (
                <option key={sector.id} value={sector.id}>{sector.name}</option>
              ))}
            </select>
          </div>

          <div className="pt-4 border-t border-zinc-100 mt-6 flex justify-end gap-3 dark:border-zinc-800">
            <a href="/app/products" className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md border border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-800">
              취소
            </a>
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-500 dark:hover:bg-indigo-600">
              등록 완료
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
