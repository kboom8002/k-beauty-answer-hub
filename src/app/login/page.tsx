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
          
          <div className="mt-4 p-4 text-sm bg-orange-50 border border-orange-200 text-orange-800 rounded-lg whitespace-pre-line dark:bg-orange-950/20 dark:border-orange-900/40 dark:text-orange-400 leading-relaxed">
            <strong className="block mb-1">💡 테스트 접속 안내</strong>
            이메일 및 패스워드를 입력하여 접속하세요.<br/>
            최초 시작 시 <strong>Supabase Dashboard의 Auth 메뉴</strong>에서 직접 샘플 계정(예: admin@acmeskin.com)을 생성해야 합니다.
            <br/><br/>
            *생성 후 Auto-Confirm옵션을 켰는지 꼭 확인해 주세요! (또는 생성된 이메일 계정의 발송된 인증 메일에서 Confirm)
          </div>
        </form>
      </div>
    </div>
  )
}
