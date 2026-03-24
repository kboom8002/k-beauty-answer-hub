import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, BarChart2, PlusCircle, AlertCircle, FileText, CheckCircle2 } from "lucide-react"
import { createClient } from "@/utils/supabase/server"

export default async function WorkspaceDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const brandId = user?.user_metadata?.brand_id || '33333333-3333-3333-3333-333333333331' 

  // Count active products for this brand
  const { count: productsCount } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
    .eq('brand_id', brandId)

  // Count pending reviews
  const { count: pendingReviewsCount } = await supabase
    .from('answer_assets')
    .select('*', { count: 'exact', head: true })
    .eq('brand_id', brandId)
    .or('status.eq.in_review,status.eq.approved')

  // Fetch recent assets
  const { data: recentAssets } = await supabase
    .from('answer_assets')
    .select('*, product:products(name)')
    .eq('brand_id', brandId)
    .order('updated_at', { ascending: false })
    .limit(3)

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* KPI Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Total Brands</CardTitle>
            <BarChart2 className="w-4 h-4 text-zinc-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">1</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Active Products</CardTitle>
            <BoxIcon className="w-4 h-4 text-zinc-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{productsCount || 0}</div>
          </CardContent>
        </Card>

        <Card className="shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Review Pending</CardTitle>
            <FileText className="w-4 h-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{pendingReviewsCount || 0}</div>
            <p className="text-xs text-indigo-600 mt-1 font-medium dark:text-indigo-400">Updates required</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm dark:bg-zinc-900 dark:border-zinc-800 border-l-4 border-l-amber-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Observatory Alerts</CardTitle>
            <AlertCircle className="w-4 h-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">0</div>
            <p className="text-xs text-amber-600 mt-1 font-medium dark:text-amber-500">All clear</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Col: Tasks & Recent Assets */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
            <CardHeader className="border-b border-zinc-100 pb-4 dark:border-zinc-800">
              <CardTitle className="text-lg font-semibold flex items-center justify-between dark:text-zinc-100">
                해야 할 일 (Task List)
                <Badge variant="secondary" className="bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">3 Tasks</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {[
                  { text: "[세럼 A] 처방된 3가지 질문 카드 초안 작성하기", type: "Drafting", priority: "High" },
                  { text: "[크림 B] 벤치마크 점수 향상을 위한 Trust FAQ 추가", type: "Action", priority: "High" },
                  { text: "전문가 리뷰 반려 사유 점검 및 패치", type: "Revision", priority: "Medium" }
                ].map((task, i) => (
                  <li key={i} className="p-5 flex items-center justify-between hover:bg-zinc-50 transition-colors dark:hover:bg-zinc-800/50">
                    <div className="flex flex-col gap-1">
                      <span className="font-medium text-zinc-900 dark:text-zinc-200">{task.text}</span>
                      <span className="text-sm text-zinc-500 flex items-center gap-2 dark:text-zinc-400">
                        {task.priority === 'High' && <span className="w-1.5 h-1.5 rounded-full bg-red-500" />}
                        {task.type}
                      </span>
                    </div>
                    <Button variant="outline" size="sm" className="dark:border-zinc-700 dark:text-zinc-300">시작하기</Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between border-b border-zinc-100 pb-4 dark:border-zinc-800">
              <CardTitle className="text-lg font-semibold dark:text-zinc-100">최근 수정된 에셋 (Recent Assets)</CardTitle>
              <Button variant="ghost" size="sm" className="text-indigo-600 dark:text-indigo-400">View All</Button>
            </CardHeader>
            <CardContent className="p-0">
              <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {recentAssets?.map((asset: any) => (
                  <li key={asset.id} className="p-5 flex items-center justify-between hover:bg-zinc-50 transition-colors dark:hover:bg-zinc-800/50">
                    <div className="flex flex-col gap-1">
                      <span className="font-medium text-zinc-800 truncate max-w-[300px] sm:max-w-md dark:text-zinc-200">Q. {asset.question_text}</span>
                      <div className="flex items-center gap-2 mt-1">
                        {asset.status === 'in_review' && <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-900/40 dark:text-indigo-400 border-0">In Review</Badge>}
                        {asset.status === 'draft' && <Badge variant="outline" className="text-zinc-500 dark:border-zinc-700 dark:text-zinc-400 border-zinc-200">Draft</Badge>}
                        {asset.status === 'published' && <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-900/40 dark:text-emerald-400 border-0">Published</Badge>}
                        <span className="text-xs text-zinc-400">{new Date(asset.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400"><ArrowUpRight className="w-4 h-4" /></Button>
                  </li>
                ))}
                {(!recentAssets || recentAssets.length === 0) && (
                  <div className="p-5 text-center text-zinc-500">생성된 Answer Asset이 없습니다.</div>
                )}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Right Col: Quick Actions & Alerts */}
        <div className="space-y-8">
          <Card className="shadow-sm bg-gradient-to-br from-indigo-600 to-violet-800 text-white border-0">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">새로운 자산 구축하기</h3>
              <p className="text-indigo-100 text-sm mb-6 leading-relaxed">
                AI Agent를 활용해 빈 질문 포트폴리오를 채우고 검색 신뢰도를 확보하세요.
              </p>
              <div className="space-y-3">
                <a href="/app/products" className="inline-flex h-9 px-4 items-center w-full justify-start rounded-lg text-sm font-semibold text-indigo-900 bg-white hover:bg-zinc-50 transition-all">
                  <PlusCircle className="mr-2 h-4 w-4" /> Generate Question Prescription
                </a>
                <a href="/app/products" className="inline-flex h-9 px-4 items-center w-full justify-start rounded-lg text-sm font-semibold text-white bg-indigo-500/30 hover:bg-indigo-500/50 border border-indigo-400 transition-all">
                  <PlusCircle className="mr-2 h-4 w-4" /> Create Answer Card Draft
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function BoxIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  )
}
