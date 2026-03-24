import { ReactNode } from "react"
import { ShieldCheck } from "lucide-react"
import { MobileMenu } from "@/components/shared/MobileMenu"

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black">
      {/* Global Header */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:bg-zinc-950/80 dark:border-zinc-800">
        <div className="container mx-auto flex h-16 max-w-7xl items-center px-4 md:px-6">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-indigo-900 dark:text-indigo-400">
            <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-500" />
            <a href="/">K-Beauty Answer Hub</a>
          </div>
          <nav className="ml-auto hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-300">
            <a href="/ingredients" className="hover:text-indigo-600 transition-colors">Ingredients</a>
            <a href="/concerns" className="hover:text-indigo-600 transition-colors">Concerns</a>
            <a href="/buyers-guides" className="hover:text-indigo-600 transition-colors">Buyer's Guides</a>
            <a href="/login" className="text-zinc-600 hover:text-indigo-600 dark:text-zinc-400 transition-colors">Login</a>
            <a href="/signup" className="text-emerald-700 hover:text-emerald-800 dark:text-emerald-400 font-semibold px-4 py-1.5 bg-emerald-50 rounded-full dark:bg-emerald-900/30 transition-colors border border-emerald-100 dark:border-emerald-800">
              브랜드 파트너 신청
            </a>
          </nav>
          
          <MobileMenu />
        </div>
      </header>

      {/* Main Content Area */}
      {children}

      {/* Global Footer */}
      <footer className="w-full py-8 text-center text-sm text-zinc-500 border-t border-zinc-200 dark:border-zinc-800 dark:bg-zinc-950 mt-auto">
        <p>© 2024 K-Beauty Answer Hub OS. All rights reserved.</p>
      </footer>
    </div>
  )
}
