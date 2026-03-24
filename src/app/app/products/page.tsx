import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Filter } from "lucide-react"
import { createClient } from "@/utils/supabase/server"

export default async function WorkspaceProducts() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const brandId = user?.user_metadata?.brand_id || '33333333-3333-3333-3333-333333333331' // Fallback to seed brand

  const { data: products } = await supabase
    .from('products')
    .select(`
      id,
      name,
      sector:sectors(name),
      product_dossiers(id),
      answer_assets(id, status)
    `)
    .eq('brand_id', brandId)

  // Map products to the view model
  const formattedProducts = products?.map((p: any) => {
    const assetsCount = p.answer_assets?.length || 0
    const pendingReviews = p.answer_assets?.filter((a: any) => a.status === 'in_review').length || 0
    const hasDossier = p.product_dossiers && p.product_dossiers.length > 0
    return {
      id: p.id,
      name: p.name,
      sector: p.sector?.name || 'Unknown',
      status: hasDossier ? 'Active' : 'Drafting',
      assets: assetsCount,
      reviews: pendingReviews > 0 ? `${pendingReviews} Pending` : 'All Clear'
    }
  }) || []

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-end mb-6 border-b border-zinc-200 pb-6 dark:border-zinc-800">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Products</h1>
          <p className="text-zinc-500 mt-1 dark:text-zinc-400">관리 중인 제품 목록과 자산 구축 상태 (MRI 진단 ~ Dossier ~ Answer Assets)</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-500 dark:hover:bg-indigo-600">
          <Plus className="w-4 h-4 mr-2" /> 새 제품 등록
        </Button>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-3 text-zinc-400" />
          <Input placeholder="제품명 검색..." className="pl-9 dark:bg-zinc-900 dark:border-zinc-800" />
        </div>
        <Button variant="outline" className="dark:border-zinc-700 dark:text-zinc-300">
          <Filter className="w-4 h-4 mr-2" /> 뷰 필터
        </Button>
      </div>

      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-400">
            <tr>
              <th className="px-6 py-4 font-medium">Product Name</th>
              <th className="px-6 py-4 font-medium">Sector</th>
              <th className="px-6 py-4 font-medium">Status / Dossier</th>
              <th className="px-6 py-4 font-medium">Answer Assets</th>
              <th className="px-6 py-4 font-medium">Reviews</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-zinc-700 dark:text-zinc-300">
            {formattedProducts.map(p => (
              <tr key={p.id} className="hover:bg-zinc-50 transition-colors dark:hover:bg-zinc-800/50">
                <td className="px-6 py-4 font-medium text-zinc-900 dark:text-zinc-100 cursor-pointer hover:text-indigo-600">
                  <a href={`/app/products/${p.id}/prescription`}>{p.name}</a>
                </td>
                <td className="px-6 py-4">
                  <Badge variant="outline" className="dark:border-zinc-700 text-zinc-600 dark:text-zinc-300">{p.sector}</Badge>
                </td>
                <td className="px-6 py-4">
                  {p.status === 'Active' ? 
                    <span className="text-emerald-600 font-medium dark:text-emerald-400 flex items-center gap-1.5"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> Built</span> : 
                    <span className="text-amber-600 font-medium dark:text-amber-400 flex items-center gap-1.5"><div className="w-1.5 h-1.5 bg-amber-500 rounded-full" /> Drafting</span>}
                </td>
                <td className="px-6 py-4 font-mono">{p.assets} Cards</td>
                <td className="px-6 py-4">
                  {p.reviews.includes('Pending') ? 
                    <span className="text-indigo-600 font-medium dark:text-indigo-400">{p.reviews}</span> : 
                    <span className="text-zinc-400">{p.reviews}</span>}
                </td>
                <td className="px-6 py-4 text-right">
                  <a href={`/app/products/${p.id}/prescription`} className="font-semibold text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 mr-4">처방받기 (AI)</a>
                  <a href={`/app/products/${p.id}/builder`} className="font-semibold text-zinc-600 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-300">초안 작성</a>
                </td>
              </tr>
            ))}
            {formattedProducts.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-zinc-500">등록된 제품이 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
