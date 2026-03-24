import { AnswerCard } from "@/components/shared/AnswerCard"
import { Badge } from "@/components/ui/badge"
import { AlertCircle } from "lucide-react"

export default async function ConcernDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const concernName = slug === 'barrier' ? '장벽 손상' : slug;

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Hero */}
      <div className="mb-10 text-center max-w-3xl mx-auto border-b border-zinc-200 pb-10 dark:border-zinc-800">
        <Badge className="bg-emerald-100 text-emerald-800 mb-4 hover:bg-emerald-100 dark:bg-emerald-950/50 dark:text-emerald-400">Skin Concern</Badge>
        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 mb-4 dark:text-zinc-100">
          {concernName}
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          홍조, 세안 후 극심한 당김, 평소 쓰던 화장품이 따갑게 느껴진다면 피부 장벽(각질층 지질 수분 보호막)이 무너진 상태일 수 있습니다.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left Column */}
        <div className="flex-1 space-y-10">
          <section>
            <h2 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-zinc-100">자주 묻는 질문 (FAQ)</h2>
            <div className="space-y-6">
              <AnswerCard 
                title="원인 파악"
                questionText="왜 갑자기 피부 장벽이 무너지나요?"
                answerText="과도한 각질 제거나 세안, 레티놀/AHA 성분의 오남용, 일교차가 크고 건조한 외부 환경 스트레스가 주 원인입니다. 특히 피부의 약산성 보호막을 씻어내는 알칼리성 폼클렌저의 잦은 사용이 장벽 지질 속 세라마이드를 유실하게 만듭니다."
                evidenceCount={8}
                reviewedBy="피부과 전문의 코스메팀"
                updatedAt="2024. 04. 11"
              />
              <AnswerCard 
                title="해결 성분 (Key Ingredients)"
                questionText="어떤 성분이 들어간 화장품을 발라야 하나요?"
                answerText="손상된 지질막을 그대로 재건해주는 세안지(세라마이드, 콜레스테롤, 지방산 황금비율 결합) 크림이나 보습과 재생을 돕는 판테놀(비타민 B5), 자생력을 높이는 병풀 추출물(마데카소사이드)이 가장 효과적입니다."
                boundaryText="장벽이 무너진 상태에서는 비타민C, 레티놀, 살리실산(BHA) 계열은 각질층을 자극하여 염증을 악화시킬 수 있으므로 스킨케어 루틴에서 무조건 제외해야 합니다."
                evidenceCount={15}
                reviewedBy="제형 연구원 B"
                updatedAt="2024. 06. 02"
              />
            </div>
          </section>

          <section className="pt-8 border-t border-zinc-200 dark:border-zinc-800">
            <h2 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-zinc-100">추천 가이드 (Recommended)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 border border-amber-200 rounded-xl bg-amber-50 hover:border-amber-300 transition-colors dark:bg-amber-950/20 dark:border-amber-900/50 dark:hover:border-amber-700">
                <h3 className="font-bold text-amber-900 mb-2 dark:text-amber-500">장벽 복구 세라마이드 크림 Top 5</h3>
                <p className="text-sm text-amber-800 mb-4 dark:text-amber-600/80">세-콜-지 황금 비율이 적용된 시중의 최적 제품들을 비교 분석했습니다.</p>
                <a href="/buyers-guides/ceramide-cream-top5" className="font-semibold text-amber-700 text-sm hover:underline dark:text-amber-400">가이드 읽기 &rarr;</a>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column */}
        <aside className="w-full lg:w-80 space-y-6">
          <div className="p-5 bg-red-50 border border-red-100 rounded-xl text-red-900 dark:bg-red-950/20 dark:border-red-900/40 dark:text-red-300">
            <div className="flex items-center gap-2 font-bold mb-3">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-500" />
              <span>주의할 포인트 (Caution)</span>
            </div>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" /> 스크럽, 필링 패드 주 1회 이상 사용 금지</li>
              <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" /> 뽀득뽀득한 알칼리성 클렌저 사용 중단</li>
              <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" /> 뜨거운 물 세안 피하기</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}
