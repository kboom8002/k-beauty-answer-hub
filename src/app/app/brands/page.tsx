import { createClient } from "@/utils/supabase/server"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Briefcase, Save } from "lucide-react"
import { updateBrand } from "./actions"

export default async function BrandSettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const brandId = user?.user_metadata?.brand_id

  if (!brandId) {
    return <div className="p-8 text-center text-zinc-500">브랜드 테넌트 정보가 없습니다. (어드민 확인 필요)</div>
  }

  const { data: brand } = await supabase.from('brands').select('*').eq('id', brandId).single()

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="mb-8 border-b border-zinc-200 pb-6 dark:border-zinc-800">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-indigo-500" /> 브랜드 시스템 설정
        </h1>
        <p className="text-zinc-500 mt-2 dark:text-zinc-400">
          워크스페이스에 연결된 브랜드 테넌트의 기본 정보를 관리합니다.
        </p>
      </div>

      <div className="bg-white border border-zinc-200 rounded-xl p-6 md:p-8 shadow-sm dark:bg-zinc-900/50 dark:border-zinc-800">
        <form action={updateBrand} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              브랜드 명 (Brand Name)
            </label>
            <Input 
              id="name" 
              name="name" 
              required 
              defaultValue={brand?.name}
              className="dark:bg-zinc-950 dark:border-zinc-800"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="positioning_statement" className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              브랜드 포지셔닝 & T&M 기조 (Positioning Statement)
            </label>
            <Textarea 
              id="positioning_statement" 
              name="positioning_statement" 
              rows={4}
              defaultValue={brand?.positioning_statement || ''}
              placeholder="예: 클린 뷰티를 지향하며, 자극 없고 착한 성분만을 고집하는 비건 화장품 브랜드"
              className="dark:bg-zinc-950 dark:border-zinc-800 resize-y"
            />
            <p className="text-xs text-zinc-500">
              여기에 작성된 기조는 Agent Patches와 함께 AI 답변 생성 시 톤앤매너 프롬프트에 자동 반영됩니다.
            </p>
          </div>

          <div className="pt-4 border-t border-zinc-100 mt-6 flex justify-end dark:border-zinc-800">
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-500 dark:hover:bg-indigo-600">
              <Save className="w-4 h-4 mr-2" />
              변경 사항 저장
            </Button>
          </div>
        </form>
      </div>

      <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-6 shadow-sm dark:bg-zinc-950 dark:border-zinc-800">
        <h3 className="text-sm font-semibold text-zinc-800 mb-2 dark:text-zinc-200">시스템 정보</h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">
          Tenant ID (Brand UUID): <code className="bg-zinc-200 px-1 py-0.5 rounded text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">{brand?.id}</code>
        </p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Created At: {new Date(brand?.created_at).toLocaleDateString()}
        </p>
      </div>
    </div>
  )
}
