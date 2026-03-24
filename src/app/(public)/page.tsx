import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, TrendingUp, ShieldCheck } from "lucide-react"

export default function Home() {
  return (
    <main className="flex-1 w-full flex flex-col items-center">
      {/* Section B. Hero Search */}
      <section className="w-full py-20 px-4 md:py-32 bg-gradient-to-b from-indigo-50/50 to-white dark:from-zinc-900 dark:to-black">
        <div className="container mx-auto max-w-5xl flex flex-col items-center text-center space-y-8">
          <div className="space-y-4 max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 leading-[1.15]">
              K-Beauty 질문의 <br/><span className="text-indigo-600 dark:text-indigo-400">최종 결론</span>을 찾으세요
            </h1>
            <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto mt-4 px-2">
              광고 없는 성분 분석부터 내 피부 고민에 맞는 진짜 추천까지, 전문가가 검증한 단 하나의 정답.
            </p>
          </div>
          
          <div className="w-full max-w-2xl relative mt-8">
            <Search className="absolute left-4 top-3.5 h-6 w-6 text-zinc-400" />
            <Input 
              className="h-14 w-full rounded-full pl-12 pr-24 text-lg shadow-lg border-zinc-200 focus-visible:ring-indigo-500 dark:bg-zinc-900 dark:border-zinc-700" 
              placeholder="어떤 성분이나 피부 고민을 찾고 계신가요?" 
            />
            <Button className="absolute right-2 top-2 h-10 rounded-full px-6 bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm dark:bg-indigo-500 dark:hover:bg-indigo-600">
              검색
            </Button>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-2 pt-6">
            <span className="text-sm font-medium text-zinc-500 flex items-center mr-2 dark:text-zinc-400">
              <TrendingUp className="w-4 h-4 mr-1" /> 추천 검색
            </span>
            {['민감성 피부 선크림', '세라마이드 토너', 'PDRN 효능', '장벽 강화'].map(chip => (
              <Badge key={chip} variant="secondary" className="rounded-full px-4 py-1.5 text-sm bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-100 cursor-pointer shadow-sm dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-700">
                {chip}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Section C. Trending Blocks */}
      <section className="w-full py-16 md:py-24 bg-white dark:bg-black">
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8 text-zinc-900 dark:text-zinc-100">지금 뜨는 뷰티 트렌드</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* 성분 */}
            <div className="flex flex-col space-y-4 p-6 rounded-2xl bg-zinc-50 border border-zinc-100 dark:bg-zinc-900/50 dark:border-zinc-800">
              <h3 className="text-xl font-bold text-indigo-900 dark:text-indigo-400 border-b border-zinc-200 dark:border-zinc-800 pb-3">🔥 급상승 성분</h3>
              <ul className="space-y-4 pt-2">
                {['나이아신아마이드', '엑소좀', '바쿠치올', '판테놀'].map((item, i) => (
                  <li key={i} className="flex justify-between items-center group cursor-pointer">
                    <span className="text-zinc-700 font-medium group-hover:text-indigo-600 transition-colors dark:text-zinc-300 dark:group-hover:text-indigo-400">{item}</span>
                    <span className="text-xs text-zinc-500 font-medium bg-white px-2 py-1 rounded-md border border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-400">+{(12-i*2)}%</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* 고민 */}
            <div className="flex flex-col space-y-4 p-6 rounded-2xl bg-zinc-50 border border-zinc-100 dark:bg-zinc-900/50 dark:border-zinc-800">
              <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-500 border-b border-zinc-200 dark:border-zinc-800 pb-3">💡 급상승 고민</h3>
              <ul className="space-y-4 pt-2">
                {['환절기 속당김', '마스크 트러블 진정', '눈가 잔주름', '블랙헤드 제거'].map((item, i) => (
                  <li key={i} className="flex justify-between items-center group cursor-pointer">
                    <span className="text-zinc-700 font-medium group-hover:text-emerald-600 transition-colors dark:text-zinc-300 dark:group-hover:text-emerald-400">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 가이드 */}
            <div className="flex flex-col space-y-4 p-6 rounded-2xl bg-zinc-50 border border-zinc-100 dark:bg-zinc-900/50 dark:border-zinc-800">
              <h3 className="text-xl font-bold text-amber-800 dark:text-amber-500 border-b border-zinc-200 dark:border-zinc-800 pb-3">🏆 인기 가이드</h3>
              <ul className="space-y-4 pt-2">
                <li className="group cursor-pointer">
                  <div className="text-zinc-800 font-semibold group-hover:text-amber-600 transition-colors dark:text-zinc-200 dark:group-hover:text-amber-400">지성 피부용 무기자차 Top 5</div>
                  <div className="text-xs text-zinc-500 mt-1.5 dark:text-zinc-500">Updated 2 days ago</div>
                </li>
                <li className="group cursor-pointer pt-3">
                  <div className="text-zinc-800 font-semibold group-hover:text-amber-600 transition-colors dark:text-zinc-200 dark:group-hover:text-amber-400">레티놀 입문자용 세럼 백서</div>
                  <div className="text-xs text-zinc-500 mt-1.5 dark:text-zinc-500">Updated 1 week ago</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section E. Why Trust Us */}
      <section className="w-full py-16 md:py-24 bg-zinc-900 text-zinc-50 dark:bg-zinc-950 border-t items-center flex flex-col dark:border-zinc-800">
        <div className="container mx-auto max-w-5xl px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-white">검증된 전문가의 타협 없는 뷰티 데이터</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 pt-4">
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-emerald-900/50 rounded-2xl flex items-center justify-center mb-4 border border-emerald-800/50">
                <ShieldCheck className="w-7 h-7 text-emerald-400" />
              </div>
              <h4 className="text-lg font-semibold text-zinc-100">전문가 블라인드 리뷰</h4>
              <p className="text-sm text-zinc-400 mt-2 leading-relaxed">피부과 전문의 및 제형 연구원이 직접 교차 검증한 사실만 노출합니다.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-indigo-900/50 rounded-2xl flex items-center justify-center font-bold text-2xl text-indigo-400 mb-4 border border-indigo-800/50">
                #1
              </div>
              <h4 className="text-lg font-semibold text-zinc-100">100% 데이터 기반</h4>
              <p className="text-sm text-zinc-400 mt-2 leading-relaxed">광고성 문구를 배제하고 임상 저널 및 논문 에비던스를 직접 탑재합니다.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-amber-900/50 rounded-2xl flex items-center justify-center border border-amber-800/50 mb-4">
                <div className="w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.8)]" />
              </div>
              <h4 className="text-lg font-semibold text-zinc-100">AEO (AI 엔진) 최적화</h4>
              <p className="text-sm text-zinc-400 mt-2 leading-relaxed">복잡한 검색 시나리오에 완벽히 대응하는 정답형 포맷으로 구성됩니다.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
