import { Badge } from "@/components/ui/badge"

const guides = [
  { slug: 'ceramide-cream-top5', title: '장벽 복구 세라마이드 크림 Top 5', sector: '수분크림', bestFor: '극건성, 민감성', count: 5, date: '2024.06.12' },
  { slug: 'retinol-beginners', title: '레티놀 입문자용 세럼 가이드', sector: '안티에이징 세럼', bestFor: '주름 탄력 입문자', count: 4, date: '2024.05.28' },
  { slug: 'oily-sunscreen', title: '지성 피부용 무기자차 추천 팩트체크', sector: '선케어', bestFor: '수부지, 지성, 여드름성', count: 5, date: '2024.06.20' }
]

export default function BuyersGuidesIndex() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="mb-10 border-b border-zinc-200 pb-10 dark:border-zinc-800">
        <h1 className="text-3xl font-bold tracking-tight mb-4 text-amber-900 dark:text-amber-500">Buyer's Guides</h1>
        <p className="text-zinc-600 text-lg dark:text-zinc-400">카테고리별로 가장 확실한 에비던스와 전문가 평가를 마친 제품군 Top 5를 심층 비교합니다.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guides.map(g => (
          <a key={g.slug} href={`/buyers-guides/${g.slug}`} className="block group">
            <div className="flex flex-col h-full bg-white border border-zinc-200 rounded-xl p-5 hover:border-amber-300 hover:shadow-md transition-all dark:bg-zinc-900 dark:border-zinc-800 dark:hover:border-amber-600">
              <Badge className="w-fit mb-3 bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-950/40 dark:text-amber-400">{g.sector}</Badge>
              <h3 className="text-xl font-bold text-zinc-900 mb-2 group-hover:text-amber-700 leading-snug dark:text-zinc-100 dark:group-hover:text-amber-400">{g.title}</h3>
              <div className="flex-1" />
              <div className="text-sm text-zinc-500 mt-6 pt-4 border-t border-zinc-100 flex justify-between items-center dark:border-zinc-800 dark:text-zinc-400">
                <span>Best for: <span className="font-semibold text-zinc-700 dark:text-zinc-300">{g.bestFor}</span></span>
                <span className="text-xs">{g.date}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
