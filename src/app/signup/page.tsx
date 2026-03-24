import { ShieldCheck, Building2, UserCircle, Briefcase } from "lucide-react"
import { signupBrand } from "./actions"

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 dark:bg-zinc-950">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center flex-col items-center">
          <ShieldCheck className="w-12 h-12 text-emerald-600 dark:text-emerald-500 mb-2" />
          <h2 className="mt-2 text-center text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">
            브랜드 파트너 등록
          </h2>
          <p className="mt-2 text-center text-sm text-zinc-600 dark:text-zinc-400">
            K-뷰티 Answer Hub OS 워크스페이스에 조직을 생성합니다.
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 dark:bg-zinc-900 dark:border dark:border-zinc-800">
          <form className="space-y-6" action={signupBrand}>
            
            <div className="border-b border-zinc-200 pb-4 mb-4 dark:border-zinc-800">
              <h3 className="text-lg font-medium leading-6 text-zinc-900 flex items-center dark:text-zinc-100">
                <Building2 className="w-5 h-5 mr-2 text-indigo-500" /> 브랜드 정보
              </h3>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                브랜드명 (회사명)
              </label>
              <div className="mt-1">
                <input
                  id="brand_name"
                  name="brand_name"
                  type="text"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
                  placeholder="Acme Skin"
                />
              </div>
            </div>

            <div className="border-b border-zinc-200 pb-4 mb-4 mt-8 dark:border-zinc-800">
              <h3 className="text-lg font-medium leading-6 text-zinc-900 flex items-center dark:text-zinc-100 pt-4">
                <UserCircle className="w-5 h-5 mr-2 text-emerald-500" /> 관리자 계정 생성
              </h3>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                관리자 이메일
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                비밀번호
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                테넌트 생성 및 계정 가입
              </button>
            </div>
            
            <div className="text-center pt-4 text-sm text-zinc-500">
              이미 계정이 있으신가요? <a href="/login" className="text-indigo-600 hover:text-indigo-500 font-semibold">로그인하기</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
