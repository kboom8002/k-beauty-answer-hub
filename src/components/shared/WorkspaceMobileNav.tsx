"use client"
import { useState } from "react"
import { Menu, X, BarChart2, Activity, Briefcase, Box, ClipboardCheck, Code2, Users, LogOut } from "lucide-react"

export function WorkspaceMobileNav({ role, email }: { role: string, email: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden">
      <button 
        onClick={() => setIsOpen(true)} 
        className="p-2 -ml-2 text-zinc-600 hover:text-indigo-600 focus:outline-none dark:text-zinc-400 dark:hover:text-indigo-400"
      >
        <Menu className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
          <div className="relative flex flex-col w-72 max-w-sm h-full bg-white dark:bg-zinc-950 shadow-xl animate-in slide-in-from-left">
            <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800">
              <span className="font-bold text-lg text-indigo-900 dark:text-indigo-400">Answer Hub OS</span>
              <button onClick={() => setIsOpen(false)} className="p-2 text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <nav className="space-y-1">
                <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2 px-3 pt-2">Overview</div>
                <a onClick={() => setIsOpen(false)} href="/app/dashboard" className="flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-md bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
                  <BarChart2 className="w-5 h-5" /> Dashboard
                </a>
                <a onClick={() => setIsOpen(false)} href="/app/benchmarks" className="flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-md text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800">
                  <Activity className="w-5 h-5" /> Benchmarks
                </a>

                <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2 px-3 pt-6 mt-4 border-t border-zinc-100 dark:border-zinc-800">Assets</div>
                {role !== 'reviewer' && (
                  <>
                    <a onClick={() => setIsOpen(false)} href="/app/brands" className="flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-md text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800">
                      <Briefcase className="w-5 h-5" /> Brands
                    </a>
                    <a onClick={() => setIsOpen(false)} href="/app/products" className="flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-md text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800">
                      <Box className="w-5 h-5" /> Products
                    </a>
                  </>
                )}
                <a onClick={() => setIsOpen(false)} href="/app/reviews/queue" className="flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-md text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800">
                  <ClipboardCheck className="w-5 h-5" /> Review Queue
                </a>

                {(role === 'admin' || role === 'analyst') && (
                  <>
                    <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2 px-3 pt-6 mt-4 border-t border-zinc-100 dark:border-zinc-800">Operations</div>
                    <a onClick={() => setIsOpen(false)} href="/app/observatory" className="flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-md text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800">
                      <Activity className="w-5 h-5" /> Observatory
                    </a>
                    <a onClick={() => setIsOpen(false)} href="/app/agent-patches" className="flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-md text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800">
                      <Code2 className="w-5 h-5" /> Agent Patches
                    </a>
                    <a onClick={() => setIsOpen(false)} href="/app/admin" className="flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-md text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800">
                      <Users className="w-5 h-5" /> Admin
                    </a>
                  </>
                )}
              </nav>
            </div>
            
            <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs dark:bg-indigo-900/50 dark:text-indigo-400">
                  {email.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="text-sm font-medium text-zinc-900 truncate dark:text-zinc-100">{role === 'reviewer' ? 'Expert Reviewer' : 'Brand Admin'}</div>
                  <div className="text-xs text-zinc-500 truncate dark:text-zinc-400">{email}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
