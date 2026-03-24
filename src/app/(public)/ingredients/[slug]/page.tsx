import { AnswerCard } from "@/components/shared/AnswerCard"
import { TrustStrip } from "@/components/shared/TrustStrip"
import { Badge } from "@/components/ui/badge"

export default async function IngredientDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Mock data for the ingredient
  const ingredientName = slug === 'niacinamide' ? '나이아신아마이드' : slug === 'panthenol' ? '판테놀' : slug;
  
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Hero Row */}
      <div className="mb-10 border-b border-zinc-200 pb-8 dark:border-zinc-800">
        <div className="flex items-center gap-3 mb-4">
          <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-950/50 dark:text-emerald-400">Ingredient</Badge>
          <span className="text-sm text-zinc-500 dark:text-zinc-400">#미백 #장벽강화</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 mb-4 dark:text-zinc-100">
          {ingredientName}
        </h1>
        <p className="text-xl text-zinc-600 max-w-3xl dark:text-zinc-400">
          비타민 B3의 일종으로, 식약처 고시 미백 기능성 성분이자 피부 장벽 개선에 도움을 주는 올라운더 성분입니다.
        </p>
      </div>

      {/* Main 2-column layout */}
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left Column (Primary) */}
        <div className="flex-1 space-y-10">
          <section>
            <h2 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-zinc-100">성분 핵심 질문</h2>
            <div className="space-y-6">
              <AnswerCard 
                title="정의 및 효능"
                questionText={`${ingredientName}는 정확히 피부에 어떤 작용을 하나요?`}
                answerText="멜라닌 색소가 표피로 이동하는 것을 억제하여 미백에 도움을 주며, 피부 지질 구성 성분인 세라마이드 합성을 촉진해 장벽을 튼튼하게 만듭니다. 또한 피지 분비 조절 기능이 있어 트러블 피부에도 효과적입니다."
                evidenceCount={12}
                reviewedBy="Dr. 피부과 전문의 A"
                updatedAt="2024. 05. 20"
              />
              <AnswerCard 
                title="적합성 (Who it fits)"
                questionText="어떤 피부 타입이 쓰면 가장 좋고, 피해야 할 피부가 있나요?"
                answerText="수부지(수분 부족형 지성) 및 여드름성 피부, 칙칙한 피부톤이 고민인 분들에게 가장 추천합니다. 대부분의 피부에 안정적이나, 10% 이상의 고농도 제품은 민감성 피부에 따가움이나 홍조를 유발할 수 있습니다."
                boundaryText="처음 사용할 때는 2~5% 농도부터 시작하는 것을 권장하며, 레티놀이나 고농도 비타민C와 함께 사용할 경우 자극이 배가될 수 있으니 주의가 필요합니다."
                evidenceCount={5}
                reviewedBy="제형 연구원 B"
                updatedAt="2024. 06. 11"
              />
            </div>
          </section>

          <section className="pt-8 border-t border-zinc-200 dark:border-zinc-800">
            <h2 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-zinc-100">관련 제품 (Products)</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[1, 2].map((i) => (
                <div key={i} className="p-4 border border-zinc-200 rounded-xl flex gap-4 dark:border-zinc-800">
                  <div className="w-20 h-20 bg-zinc-100 rounded-md flex-shrink-0 dark:bg-zinc-800" />
                  <div>
                    <Badge variant="outline" className="mb-1 dark:border-zinc-700 dark:text-zinc-300">Brand {i}</Badge>
                    <h4 className="font-semibold text-zinc-900 mb-1 dark:text-zinc-100">{ingredientName} 10% 세럼</h4>
                    <a href="#" className="text-sm text-indigo-600 hover:underline dark:text-indigo-400">Deep dive Review &rarr;</a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column (Secondary) */}
        <aside className="w-full lg:w-80 space-y-6">
          <div className="sticky top-24 space-y-6">
            <TrustStrip 
              reviewedBy="K-Beauty Answer Hub 의학 검수팀"
              evidenceCount={34}
              updatedAt="2024. 06. 15"
              cautionFlag={true}
            />

            <div className="p-5 bg-zinc-50 border border-zinc-200 rounded-xl dark:bg-zinc-900/50 dark:border-zinc-800">
              <h3 className="font-bold text-zinc-900 mb-4 dark:text-zinc-100">Quick Facts</h3>
              <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                <li className="flex justify-between border-b pb-2 dark:border-zinc-800"><span className="font-medium">EWG 등급</span> <span className="text-emerald-600 font-bold dark:text-emerald-500">1 (그린)</span></li>
                <li className="flex justify-between border-b pb-2 dark:border-zinc-800"><span className="font-medium">임산부 사용</span> <span>가능</span></li>
                <li className="flex justify-between pb-1"><span className="font-medium">적정 농도</span> <span>2% ~ 5%</span></li>
              </ul>
            </div>

            <div className="p-5 bg-zinc-50 border border-zinc-200 rounded-xl dark:bg-zinc-900/50 dark:border-zinc-800">
              <h3 className="font-bold text-zinc-900 mb-3 dark:text-zinc-100">같이 보면 좋은 가이드</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm font-medium text-indigo-700 hover:underline dark:text-indigo-400">고농도 나이아신아마이드 부작용 피하는 법</a></li>
                <li><a href="#" className="text-sm font-medium text-indigo-700 hover:underline dark:text-indigo-400">레티놀과 나이아신아마이드 조합의 진실</a></li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
