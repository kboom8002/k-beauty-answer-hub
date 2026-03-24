import { ReactNode } from "react"
import { ShieldCheck, BarChart2, Briefcase, Box, ClipboardCheck, Activity, LogOut, Code2, Users } from "lucide-react"
import { createClient } from '@/utils/supabase/server'
import { logout } from '@/app/login/actions'
import { WorkspaceMobileNav } from '@/components/shared/WorkspaceMobileNav'

export default async function WorkspaceLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  // Extract role for UI RBAC logic
  const role = user?.user_metadata?.role || 'brand_admin' 

  return (
    <div className="flex h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-200 bg-white dark:bg-zinc-950 dark:border-zinc-800 flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2 font-bold text-lg tracking-tight text-indigo-900 dark:text-indigo-400">
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-500" />
            Answer Hub OS
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2 px-3 pt-2">Overview</div>
          <a href="/app/dashboard" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
            <BarChart2 className="w-4 h-4" /> Dashboard
          </a>
          <a href="/app/benchmarks" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800">
            <Activity className="w-4 h-4" /> Benchmarks
          </a>

          <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2 px-3 pt-6 mt-4 border-t border-zinc-100 dark:border-zinc-800">Assets</div>
          
          {role !== 'reviewer' && (
            <>
              <a href="/app/brands" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800">
                <Briefcase className="w-4 h-4" /> Brands
              </a>
              <a href="/app/products" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800">
                <Box className="w-4 h-4" /> Products
              </a>
            </>
          )}

          <a href="/app/reviews/queue" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800">
            <ClipboardCheck className="w-4 h-4" /> Review Queue
          </a>

          {(role === 'admin' || role === 'analyst') && (
            <>
              <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2 px-3 pt-6 mt-4 border-t border-zinc-100 dark:border-zinc-800">Operations</div>
              <a href="/app/observatory" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800">
                <Activity className="w-4 h-4" /> Observatory
              </a>
              <a href="/app/agent-patches" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800">
                <Code2 className="w-4 h-4" /> Agent Patches
              </a>
              <a href="/app/admin" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800">
                <Users className="w-4 h-4" /> Admin
              </a>
            </>
          )}
        </nav>

        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs dark:bg-indigo-900/50 dark:text-indigo-400">
              {user?.email?.charAt(0).toUpperCase() || 'B'}
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="text-sm font-medium text-zinc-900 truncate dark:text-zinc-100">{role === 'reviewer' ? 'Expert Reviewer' : 'Brand Admin'}</div>
              <div className="text-xs text-zinc-500 truncate dark:text-zinc-400">{user?.email || 'admin@acmeskin.com'}</div>
            </div>
            <form action={logout}>
              <button type="submit" className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 mt-1 cursor-pointer">
                <LogOut className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden w-full">
        <header className="h-16 flex items-center px-4 md:px-8 border-b border-zinc-200 bg-white dark:bg-zinc-950 dark:border-zinc-800 shrink-0">
          <WorkspaceMobileNav role={role} email={user?.email || 'admin@acmeskin.com'} />
          <h2 className="text-xl font-bold text-zinc-800 hidden md:block dark:text-zinc-100 ml-2 md:ml-0">Workspace</h2>
          <div className="md:hidden flex-1 text-center font-bold text-lg text-indigo-900 dark:text-indigo-400">
            K-뷰티 Answer HUB
          </div>
          {/* Topbar actions could go here */}
        </header>
        <div className="flex-1 overflow-y-auto p-4 md:p-8 w-full max-w-full">
          {children}
        </div>
      </main>
    </div>
  )
}
