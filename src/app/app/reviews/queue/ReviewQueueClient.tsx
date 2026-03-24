"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Search, CheckCircle, XCircle, Clock } from "lucide-react"
import { processReviewDecision } from "@/app/actions/assets"

export function ReviewQueueClient({ initialQueue }: { initialQueue: any[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(initialQueue[0]?.id || null)
  const [comment, setComment] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  
  const selectedAsset = initialQueue.find(a => a.id === selectedId)

  const handleDecision = async (isApproved: boolean) => {
    if (!selectedAsset) return
    setIsProcessing(true)
    try {
      await processReviewDecision(selectedAsset.id, isApproved, comment)
      setComment("")
      // Auto-select the next item after processing
      const currentIndex = initialQueue.findIndex(a => a.id === selectedId)
      if (currentIndex + 1 < initialQueue.length) {
        setSelectedId(initialQueue[currentIndex + 1].id)
      } else {
        setSelectedId(null)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto flex flex-col h-full gap-6">
      <div className="flex justify-between items-end mb-2 border-b border-zinc-200 pb-6 dark:border-zinc-800">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">임상/의학 검수 대기열 (Review Queue)</h1>
          <p className="text-zinc-500 mt-1 dark:text-zinc-400">브랜드 측에서 초안 작성을 마치고 제출한 'Answer Card' 에비던스를 교차 검증합니다.</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="text-amber-600 bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-900/50 dark:text-amber-400 font-medium py-1 px-3 text-sm">
            <Clock className="w-4 h-4 mr-1.5" /> 대기 중: {initialQueue.length}건
          </Badge>
        </div>
      </div>

      <div className="flex gap-6 h-[calc(100vh-280px)] mt-2">
        {/* List Pane */}
        <div className="w-1/3 bg-white border border-zinc-200 rounded-xl overflow-hidden flex flex-col shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
          <div className="p-4 border-b border-zinc-100 bg-zinc-50 dark:bg-zinc-950 dark:border-zinc-800">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-400" />
              <input type="text" placeholder="제품명, 질문 검색..." className="w-full pl-9 pr-3 py-2 text-sm border-zinc-200 rounded-md bg-white dark:bg-zinc-900 dark:border-zinc-700" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {initialQueue.map((item) => (
              <div 
                key={item.id} 
                onClick={() => setSelectedId(item.id)}
                className={`p-4 border-b border-zinc-100 cursor-pointer transition-colors dark:border-zinc-800 ${item.id === selectedId ? 'bg-indigo-50/50 border-l-4 border-l-indigo-500 dark:bg-indigo-950/20' : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/50'}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline" className="text-xs bg-white dark:bg-zinc-800 dark:border-zinc-700">{item.product?.name || "Unknown Product"}</Badge>
                  <span className="text-xs text-zinc-400">{new Date(item.created_at).toLocaleDateString()}</span>
                </div>
                <h4 className="font-semibold text-zinc-900 text-sm leading-snug dark:text-zinc-100 line-clamp-2 mb-2">Q. {item.question_text}</h4>
              </div>
            ))}
            {initialQueue.length === 0 && (
              <div className="p-8 text-center text-zinc-500 text-sm">대기 중인 검수 요청이 없습니다.</div>
            )}
          </div>
        </div>

        {/* Editor Pane */}
        <div className="flex-1 bg-white border border-zinc-200 rounded-xl flex flex-col overflow-hidden shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
          {selectedAsset ? (
            <>
              <div className="p-6 border-b border-zinc-100 bg-zinc-50 flex justify-between items-start dark:bg-zinc-950 dark:border-zinc-800">
                <div>
                  <div className="text-xs font-semibold text-indigo-600 mb-2 uppercase tracking-wide">Target Question</div>
                  <h2 className="text-xl font-bold bg-white px-4 py-3 rounded-md border border-zinc-200 shadow-sm dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-100">
                    Q. {selectedAsset.question_text}
                  </h2>
                </div>
              </div>
              <div className="p-6 flex-1 overflow-y-auto space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-zinc-800 dark:text-zinc-200">초안 답변 (브랜드 제출)</label>
                  <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-lg text-sm leading-relaxed text-zinc-700 dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-300">
                    {selectedAsset.answer_body}
                  </div>
                </div>
                
                {selectedAsset.boundary_text && (
                  <div className="space-y-2 mt-4">
                    <label className="text-sm font-bold text-amber-800 dark:text-amber-500">한계점 및 주의사항 (Boundary)</label>
                    <div className="p-4 bg-amber-50/50 border border-amber-200 rounded-lg text-sm leading-relaxed text-amber-900 dark:bg-amber-950/20 dark:border-amber-900/40 dark:text-amber-100">
                      {selectedAsset.boundary_text}
                    </div>
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border border-zinc-200 bg-zinc-50 rounded-lg dark:bg-zinc-800/50 dark:border-zinc-700">
                    <div className="text-xs font-bold text-zinc-600 mb-1 dark:text-zinc-400">References (Attached Evidence)</div>
                    <ul className="text-xs text-indigo-600 space-y-1 dark:text-indigo-400">
                      {(selectedAsset.evidence_refs || []).map((ref: string, i: number) => (
                        <li key={i}>{ref}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-zinc-800 flex justify-between dark:text-zinc-200">
                    <span>리뷰어 코멘트 및 보완 지시 (반려 시 필수)</span>
                  </label>
                  <Textarea 
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="의학적 한계점, 표현 완화가 필요한 부분을 남겨주세요." 
                    className="min-h-[120px] dark:bg-zinc-900 dark:border-zinc-800" 
                  />
                </div>
              </div>
              <div className="p-4 border-t border-zinc-100 bg-zinc-50 flex justify-end gap-3 dark:bg-zinc-950 dark:border-zinc-800">
                <Button 
                  onClick={() => handleDecision(false)} 
                  disabled={isProcessing || !comment} 
                  variant="outline" 
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:border-zinc-700 dark:text-red-400 dark:hover:bg-red-950/30"
                >
                  <XCircle className="w-4 h-4 mr-1.5" /> 반려 (Requires Revision)
                </Button>
                <Button 
                  onClick={() => handleDecision(true)} 
                  disabled={isProcessing} 
                  className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm dark:bg-emerald-500 dark:hover:bg-emerald-600"
                >
                  <CheckCircle className="w-4 h-4 mr-1.5" /> 패스 및 발행 (Approve & Publish)
                </Button>
              </div>
            </>
          ) : (
             <div className="flex-1 flex items-center justify-center text-zinc-500 dark:text-zinc-400">
               좌측 목록에서 항목을 선택해주세요.
             </div>
          )}
        </div>
      </div>
    </div>
  )
}
