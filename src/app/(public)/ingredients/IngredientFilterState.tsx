"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useRouter, useSearchParams } from "next/navigation"

const ALL_FILTERS = ['보습', '진정', '미백', '장벽', '탄력', '주름', '저자극']

export function IngredientFilterState() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const currentQ = searchParams.get('q') || ''
  const currentTag = searchParams.get('tag') || ''
  
  const [q, setQ] = useState(currentQ)
  
  useEffect(() => {
    // Debounce to prevent querying heavily on every keystroke
    const handler = setTimeout(() => {
        // If the query string has not changed significantly, ignore
        if (q === currentQ) return;
        
        const params = new URLSearchParams(searchParams.toString())
        if (q) params.set('q', q)
        else params.delete('q')
        
        router.push(`/ingredients?${params.toString()}`, { scroll: false })
    }, 400)
    return () => clearTimeout(handler)
  }, [q, currentQ, router, searchParams])

  const toggleTag = (tag: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (currentTag === tag) {
      params.delete('tag')
    } else {
      params.set('tag', tag)
    }
    // Setting page 1 logic goes here if pagination was implemented
    router.push(`/ingredients?${params.toString()}`, { scroll: false })
  }

  return (
    <aside className="w-full md:w-64 space-y-6 shrink-0">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
        <Input 
          type="search" 
          placeholder="성분 검색..." 
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="pl-9 dark:bg-zinc-800 dark:border-zinc-700" 
        />
      </div>
      <div className="space-y-3">
        <h3 className="font-semibold text-sm text-zinc-900 border-b pb-2 dark:text-zinc-200 dark:border-zinc-800">
          기능별 필터
        </h3>
        <div className="flex flex-wrap gap-2 pt-2">
          {ALL_FILTERS.map(filter => {
            const isActive = currentTag === filter
            return (
              <Badge 
                key={filter} 
                variant={isActive ? "default" : "outline"}
                onClick={() => toggleTag(filter)}
                className={`cursor-pointer transition-colors dark:border-zinc-700 ${isActive ? 'bg-indigo-600 text-white dark:bg-indigo-500' : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
              >
                {filter}
              </Badge>
            )
          })}
        </div>
      </div>
    </aside>
  )
}
