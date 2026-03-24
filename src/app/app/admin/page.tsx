import { createClient } from "@/utils/supabase/server"
import { Users, MailPlus, Shield } from "lucide-react"
import { inviteTeamMember } from "./actions"

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  const role = user?.user_metadata?.role
  
  if (role !== 'admin') {
    return (
      <div className="flex h-full items-center justify-center p-8 text-center bg-zinc-50 dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800">
        <div>
          <Shield className="w-12 h-12 text-rose-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">접근 대상이 아닙니다</h2>
          <p className="text-zinc-500 dark:text-zinc-400 mt-2">브랜드 관리자(Admin)만 팀원을 초대할 수 있습니다.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl space-y-8">
      <div className="mb-6 border-b border-zinc-200 pb-6 dark:border-zinc-800">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-3">
          <Users className="w-8 h-8 text-indigo-500" />
          Team & Access Control
        </h1>
        <p className="text-zinc-500 mt-2 text-lg dark:text-zinc-400">
          우리 브랜드 테넌트에 소속될 내부 마케터(Analyst)나 외부 피부과 전문의(Reviewer)를 초대합니다.
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
        <h3 className="text-lg font-bold text-zinc-900 mb-4 flex items-center dark:text-zinc-100">
          <MailPlus className="w-5 h-5 mr-2 text-emerald-500" /> 새로운 멤버 초대
        </h3>
        
        <form className="space-y-4 max-w-lg" action={inviteTeamMember}>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              초대 받을 이메일 주소
            </label>
            <input 
              name="email"
              type="email" 
              required
              placeholder="doctor@hospital.com"
              className="w-full px-4 py-2 border border-zinc-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              부여할 권한 (Role)
            </label>
            <select 
              name="role"
              className="w-full px-4 py-2 border border-zinc-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
            >
              <option value="reviewer">전문 검수자 (Reviewer - 읽기/승인 권한)</option>
              <option value="analyst">내부 분석가 (Analyst - 쓰기/생성 권한)</option>
            </select>
          </div>

          <button type="submit" className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 shadow-sm transition-colors dark:bg-indigo-500 dark:hover:bg-indigo-600">
            초대 링크 발송하기
          </button>
          
          <p className="text-xs text-zinc-400 mt-2">
            ※ 실제 메일 발송이 처리되기 위해서는 Vercel/로컬 환경변수 `SUPABASE_SERVICE_ROLE_KEY`가 올바르게 세팅되어 있어야 합니다.
          </p>
        </form>
      </div>
    </div>
  )
}
