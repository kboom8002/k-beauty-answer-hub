import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, TrendingUp, Search, Eye, Share2, Award } from "lucide-react"

export default function ObservatoryPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="mb-6 border-b border-zinc-200 pb-6 dark:border-zinc-800">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">AEO Observatory</h1>
        <p className="text-zinc-500 mt-2 text-lg dark:text-zinc-400">발행된 Answer Card가 AI 엔진과 퍼블릭 서치에서 어떤 실질적 성과를 만들어내는지 한눈에 추적합니다.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 shadow-sm border-t-4 border-t-indigo-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-500 dark:text-zinc-400 flex items-center justify-between">
              AEO Share of Voice
              <Award className="w-4 h-4 text-indigo-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">14.2%</div>
            <p className="text-xs font-semibold text-emerald-600 mt-1 dark:text-emerald-400 flex items-center"><TrendingUp className="w-3 h-3 mr-1" />+2.4% vs last mo.</p>
          </CardContent>
        </Card>
        
        <Card className="bg-white border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-500 dark:text-zinc-400 flex items-center justify-between">
              Total Impressions
              <Eye className="w-4 h-4 text-zinc-400" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">42,501</div>
            <p className="text-xs text-emerald-600 mt-1 font-semibold dark:text-emerald-400 flex items-center"><TrendingUp className="w-3 h-3 mr-1" />+12% vs last mo.</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-500 dark:text-zinc-400 flex items-center justify-between">
              Public Search Clicks
              <Search className="w-4 h-4 text-zinc-400" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">3,205</div>
            <p className="text-xs text-zinc-400 mt-1">Direct from Public Hub</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-500 dark:text-zinc-400 flex items-center justify-between">
              Link Shares
              <Share2 className="w-4 h-4 text-zinc-400" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">890</div>
            <p className="text-xs text-emerald-600 mt-1 font-semibold dark:text-emerald-400 flex items-center"><TrendingUp className="w-3 h-3 mr-1" />Viral Lift 20%</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <Card className="shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
          <CardHeader className="border-b border-zinc-100 pb-4 dark:border-zinc-800">
            <CardTitle className="text-lg font-semibold dark:text-zinc-100">Top Performing Answer Cards</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {[
                { title: '수부지에게 무기자차가 건조한 이유', views: '12.4K', convert: '4.2%' },
                { title: '세라마이드 크림이 좁쌀을 유발하나요?', views: '8.1K', convert: '3.8%' },
                { title: '낮과 밤 비타민C, 언제 바르는 게 맞나요?', views: '5.6K', convert: '2.9%' }
              ].map((item, i) => (
                <li key={i} className="p-5 flex justify-between items-center hover:bg-zinc-50 transition-colors dark:hover:bg-zinc-800/50">
                  <div className="font-medium text-zinc-900 text-sm dark:text-zinc-200">Q. {item.title}</div>
                  <div className="flex gap-4 text-sm">
                    <span className="text-zinc-500"><Eye className="w-4 h-4 inline mr-1" />{item.views}</span>
                    <span className="text-emerald-600 font-semibold dark:text-emerald-400">{item.convert} CTR</span>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
          <CardHeader className="border-b border-zinc-100 pb-4 dark:border-zinc-800">
            <CardTitle className="text-lg font-semibold flex items-center gap-2 dark:text-zinc-100">
              <Activity className="w-5 h-5 text-indigo-500" />
              AI Agent Search Simulation (Benchmark)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-5 mb-6 dark:bg-indigo-950/20 dark:border-indigo-900/40">
              <h4 className="font-bold text-indigo-900 mb-2 dark:text-indigo-400">Simulation Run: "올리브영 세라마이드 크림 추천 좀"</h4>
              <p className="text-sm text-indigo-800 leading-relaxed dark:text-indigo-300">
                AI Agent Benchmark 시스템이 최신 트렌드를 모사하여 주요 검색 시나리오를 구동한 결과, 폐사의 브랜드가 상위 3순위에 지속적으로 노출되고 있습니다. 특히 '안전성' 및 '임상 검증' 키워드 가중치에서 경쟁 브랜드 대비 15% 우위를 보입니다.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="font-semibold text-zinc-700 dark:text-zinc-300">Acme Skin (Our Brand)</span>
                <span className="text-emerald-600 font-bold dark:text-emerald-500">82 pts</span>
              </div>
              <div className="w-full bg-zinc-100 rounded-full h-2.5 dark:bg-zinc-800">
                <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: '82%' }}></div>
              </div>

              <div className="flex justify-between text-sm mb-1 mt-4">
                <span className="text-zinc-500">Competitor A</span>
                <span className="text-zinc-500 font-bold">65 pts</span>
              </div>
              <div className="w-full bg-zinc-100 rounded-full h-2.5 dark:bg-zinc-800">
                <div className="bg-zinc-400 h-2.5 rounded-full" style={{ width: '65%' }}></div>
              </div>
              
              <div className="flex justify-between text-sm mb-1 mt-4">
                <span className="text-zinc-500">Competitor B</span>
                <span className="text-zinc-500 font-bold">58 pts</span>
              </div>
              <div className="w-full bg-zinc-100 rounded-full h-2.5 dark:bg-zinc-800">
                <div className="bg-zinc-400 h-2.5 rounded-full" style={{ width: '58%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
