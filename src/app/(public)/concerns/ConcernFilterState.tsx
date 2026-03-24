"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useRouter, useSearchParams } from "next/navigation"

export function ConcernFilterState() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const currentQ = searchParams.get('q') || ''
  const [q, setQ] = useState(currentQ)
  
  useEffect(() => {
    const handler = setTimeout(() => {
      if (q === currentQ) return;
      const params = new URLSearchParams(searchParams.toString())
      if (q) params.set('q', q)
      else params.delete('q')
      router.push(`/concerns?${params.toString()}`, { scroll: false })
    }, 400)
    return () => clearTimeout(handler)
  }, [q, currentQ, router, searchParams])

  return (
    <div className="relative mt-8 mx-auto max-w-xl">
      <Search className="absolute left-5 top-4 h-6 w-6 text-zinc-400" />
      <Input 
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className="h-14 w-full rounded-full pl-14 pr-6 text-lg border-zinc-200 shadow-sm focus-visible:ring-emerald-500 hover:border-zinc-300 dark:bg-zinc-900/50 dark:border-zinc-700 dark:hover:border-zinc-600 transition-all" 
        placeholder="예: 마스크 트러블, 속당김, 붉은기..." 
      />
    </div>
  )
}
