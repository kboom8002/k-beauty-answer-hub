"use client"
import { useEffect } from "react"
import { AlertCircle } from "lucide-react"

export default function WorkspaceError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Workspace Global Error Captured:", error)
  }, [error])

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4 dark:bg-zinc-950">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-2xl w-full border border-red-200 dark:bg-zinc-900 dark:border-red-900/50">
        <div className="flex items-center gap-3 text-red-600 mb-6 dark:text-red-500">
          <AlertCircle className="w-8 h-8" />
          <h2 className="text-2xl font-bold">오류가 발생했습니다 (Server/Runtime Error)</h2>
        </div>
        
        <div className="bg-red-50 text-red-800 p-4 rounded-lg font-mono text-sm whitespace-pre-wrap overflow-auto max-h-96 dark:bg-red-950/30 dark:text-red-400">
          <strong>Message:</strong> {error.message}
          <br /><br />
          <strong>Stack Trace:</strong><br />
          {error.stack}
        </div>

        <div className="mt-8 flex gap-4">
          <button
            onClick={() => reset()}
            className="px-6 py-2 bg-zinc-900 text-white font-medium rounded-lg hover:bg-zinc-800 transition dark:bg-zinc-100 dark:text-zinc-900"
          >
            다시 시도 (Try again)
          </button>
          <a
            href="/login"
            className="px-6 py-2 bg-red-100 text-red-700 font-medium rounded-lg hover:bg-red-200 transition dark:bg-red-900/40 dark:text-red-400"
          >
            로그인 화면으로 돌아가기
          </a>
        </div>
      </div>
    </div>
  )
}
