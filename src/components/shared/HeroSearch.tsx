"use client"

import { useState, useEffect, useRef } from "react"
import { Search, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { searchGlobal } from "@/app/actions/search"

export function HeroSearch() {
  const [q, setQ] = useState('')
  const [results, setResults] = useState<{ingredients: any[], concerns: any[]}>({ingredients: [], concerns: []})
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchResults = async () => {
      if (q.length < 2) {
        setResults({ingredients: [], concerns: []})
        setIsOpen(false)
        return
      }
      const data = await searchGlobal(q)
      setResults(data)
      setIsOpen(data.ingredients.length > 0 || data.concerns.length > 0)
    }
    
    // Debounce API calls
    const handler = setTimeout(() => {
      fetchResults()
    }, 300)
    return () => clearTimeout(handler)
  }, [q])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearchClick = () => {
    if (q) {
      router.push(`/ingredients?q=${encodeURIComponent(q)}`)
      setIsOpen(false)
    }
  }

  return (
    <div className="w-full max-w-2xl relative mt-8 z-50 text-left" ref={wrapperRef}>
      <Search className="absolute left-4 top-3.5 h-6 w-6 text-zinc-400" />
      <Input 
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onKeyDown={(e) => { if(e.key === 'Enter') handleSearchClick() }}
        onFocus={() => { if(results.ingredients.length || results.concerns.length) setIsOpen(true) }}
        className="h-14 w-full rounded-full pl-12 pr-24 text-lg shadow-lg border-zinc-200 focus-visible:ring-indigo-500 dark:bg-zinc-900 dark:border-zinc-700" 
        placeholder="어떤 성분이나 피부 고민을 찾고 계신가요?" 
      />
      <Button 
        onClick={handleSearchClick}
        className="absolute right-2 top-2 h-10 rounded-full px-6 bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm dark:bg-indigo-500 dark:hover:bg-indigo-600"
      >
        검색
      </Button>
      
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2">
          {results.ingredients.length > 0 && (
            <div className="p-2">
              <div className="px-3 py-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">성분 (Ingredients)</div>
              {results.ingredients.map(ing => (
                <button 
                  key={ing.slug} 
                  onClick={() => router.push(`/ingredients/${ing.slug}`)}
                  className="w-full text-left flex items-center justify-between px-3 py-2.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg group"
                >
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">{ing.name}</span>
                  <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-indigo-500" />
                </button>
              ))}
            </div>
          )}
          
          {results.ingredients.length > 0 && results.concerns.length > 0 && <div className="h-px bg-zinc-100 dark:bg-zinc-800 mx-4" />}
          
          {results.concerns.length > 0 && (
            <div className="p-2">
              <div className="px-3 py-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">피부 고민 (Concerns)</div>
              {results.concerns.map(con => (
                <button 
                  key={con.slug} 
                  onClick={() => router.push(`/concerns/${con.slug}`)}
                  className="w-full text-left flex items-center justify-between px-3 py-2.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg group"
                >
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">{con.name}</span>
                  <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-emerald-500" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
