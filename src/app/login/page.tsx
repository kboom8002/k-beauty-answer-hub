import { login } from './actions'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default async function LoginPage(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const searchParams = await props.searchParams;
  const message = searchParams?.message as string | undefined;

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-zinc-50 dark:bg-black">
      <div className="w-full max-w-md p-8 bg-white border border-zinc-200 rounded-2xl shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
        <h1 className="text-2xl font-bold mb-2 dark:text-zinc-100">Workspace Login</h1>
        <p className="text-zinc-500 mb-6 dark:text-zinc-400">브랜드 매니저 및 K-뷰티 전문가 전용 구역입니다.</p>
        
        {message && (
          <div className="mb-6 p-4 text-sm bg-red-50 border border-red-200 text-red-800 rounded-lg dark:bg-red-950/20 dark:border-red-900/40 dark:text-red-400">
            {message === 'Could not authenticate user' ? '이메일 또는 비밀번호가 올바르지 않거나, 아직 메일 인증이 완료되지 않았습니다.' : '로그인에 실패했습니다. 다시 시도해주세요.'}
          </div>
        )}

        <form action={login} className="space-y-4">
          <div>
            <label className="text-sm font-medium dark:text-zinc-200" htmlFor="email">Email</label>
            <Input id="email" name="email" type="email" required placeholder="admin@acmeskin.com" className="dark:bg-zinc-950 dark:border-zinc-800" />
          </div>
          <div>
            <label className="text-sm font-medium dark:text-zinc-200" htmlFor="password">Password</label>
            <Input id="password" name="password" type="password" required placeholder="••••••••" className="dark:bg-zinc-950 dark:border-zinc-800" />
          </div>
          
          <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm dark:bg-indigo-500 dark:hover:bg-indigo-600">
            Log in
          </Button>
          
          <div className="mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-800 text-center">
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
              아직 우리 브랜드 전용 워크스페이스가 없으신가요?
            </p>
            <a href="/signup" className="inline-flex items-center justify-center w-full px-4 py-2 border border-emerald-200 text-sm font-medium rounded-md text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-400 dark:hover:bg-emerald-900/40">
              새로운 브랜드 테넌트 가입하기 &rarr;
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}
