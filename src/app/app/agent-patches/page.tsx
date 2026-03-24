import { createClient } from "@/utils/supabase/server"
import { ShieldAlert, MessageSquarePlus, Trash2, Save, Wand2 } from "lucide-react"
import { savePatch, deletePatch } from "./actions"

export default async function AgentPatchesPage() {
  const supabase = await createClient()
  const { data: patches } = await supabase.from('agent_patches').select('*').order('created_at', { ascending: false })

  return (
    <div className="max-w-4xl space-y-8">
      <div className="mb-6 border-b border-zinc-200 pb-6 dark:border-zinc-800">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-3">
          <Wand2 className="w-8 h-8 text-indigo-500" />
          Agent Patches (AI Guardrails)
        </h1>
        <p className="text-zinc-500 mt-2 text-lg dark:text-zinc-400">
          AI가 초안을 작성할 때 반드시 지켜야 할 우리 브랜드만의 톤앤매너와 금칙어를 정의합니다.
        </p>
      </div>

      {/* New Patch Form */}
      <div className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100 dark:bg-indigo-950/20 dark:border-indigo-900/40">
        <h3 className="text-lg font-bold text-indigo-900 mb-4 flex items-center dark:text-indigo-400">
          <MessageSquarePlus className="w-5 h-5 mr-2" /> 새로운 패치 주입
        </h3>
        <form action={savePatch} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">패치 유형</label>
              <select name="patch_type" className="w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100">
                <option value="prohibited_words">🚫 금칙어 (Prohibited)</option>
                <option value="tone">💬 톤앤매너 (Tone)</option>
                <option value="evidence_required">📚 필수 근거 (Evidence)</option>
              </select>
            </div>
            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">내용 (Instruction)</label>
              <input 
                name="content" 
                required 
                placeholder="예: '완치', '기적' 같은 단어 사용 금지 / 어미는 반드시 ~해요 체로 통일"
                className="w-full px-4 py-2 border border-zinc-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100" 
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition shadow-sm dark:bg-indigo-500 dark:hover:bg-indigo-600">
              패치 적용하기
            </button>
          </div>
        </form>
      </div>

      {/* Patches List */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">활성화된 패치 목록</h3>
        {patches?.length === 0 ? (
          <div className="p-12 text-center border-2 border-dashed border-zinc-200 rounded-2xl text-zinc-400 dark:border-zinc-800">
            등록된 AI 가드레일이 없습니다. 첫 패치를 추가해 보세요.
          </div>
        ) : (
          <div className="grid gap-4">
            {patches?.map(patch => (
              <div key={patch.id} className="bg-white border border-zinc-200 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow dark:bg-zinc-900 dark:border-zinc-800 flex justify-between items-start">
                <div className="space-y-2">
                   <div className="flex items-center gap-2">
                     <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                       patch.patch_type === 'prohibited_words' ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/30' : 
                       patch.patch_type === 'tone' ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/30' :
                       'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30'
                     }`}>
                       {patch.patch_type}
                     </span>
                     <span className="text-xs text-zinc-400">{new Date(patch.created_at).toLocaleDateString()}</span>
                   </div>
                   <p className="text-zinc-800 font-medium dark:text-zinc-200">{patch.content}</p>
                </div>
                
                <form action={async () => { "use server"; await deletePatch(patch.id) }}>
                  <button type="submit" className="p-2 text-zinc-400 hover:text-rose-600 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </form>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-5 bg-amber-50 border border-amber-100 rounded-xl flex gap-3 dark:bg-amber-950/20 dark:border-amber-900/40">
        <ShieldAlert className="w-6 h-6 text-amber-600 shrink-0" />
        <p className="text-sm text-amber-800 dark:text-amber-400 leading-relaxed">
          <strong>Tip:</strong> 여기서 정의된 패치들은 AI가 초안을 작성하기 직전에 자동으로 시스템 프롬프트에 주입됩니다. 금칙어를 설정하면 해당 단어가 포함된 문장은 생성 단계에서 원천 차단되거나 수정이 요청됩니다.
        </p>
      </div>
    </div>
  )
}
