"use client"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <div className="md:hidden ml-auto">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="p-2 -mr-2 text-zinc-600 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400 focus:outline-none"
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
      
      {isOpen && (
        <div className="absolute top-[64px] left-0 right-0 w-full bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 p-4 flex flex-col gap-2 shadow-lg z-50 animate-in slide-in-from-top-2">
          <a href="/ingredients" className="block px-4 py-3 text-zinc-700 dark:text-zinc-300 font-medium hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-md">
            Ingredients (성분)
          </a>
          <a href="/concerns" className="block px-4 py-3 text-zinc-700 dark:text-zinc-300 font-medium hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-md">
            Concerns (피부 고민)
          </a>
          <a href="/buyers-guides" className="block px-4 py-3 text-zinc-700 dark:text-zinc-300 font-medium hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-md">
            Buyer's Guides (가이드)
          </a>
          <div className="pt-2 mt-2 border-t border-zinc-100 dark:border-zinc-800">
            <a href="/login" className="block w-full text-center px-4 py-3 text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/50 font-bold rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors">
              For Brands (B2B 로그인)
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
