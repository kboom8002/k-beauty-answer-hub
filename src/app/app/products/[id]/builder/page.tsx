"use client"

import { useState, use, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { draftAnswerCard } from "@/app/actions/gemini"
import { saveAnswerDraft } from "@/app/actions/assets"
import { Sparkles, Save, Send } from "lucide-react"
import { useSearchParams } from "next/navigation"

function BuilderForm({ productId }: { productId: string }) {
  const searchParams = useSearchParams()
  const currentQuestion = searchParams.get('q') || "세라마이드 크림, 지성이 써도 트러블 안 나나요?"

  const [loading, setLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [draft, setDraft] = useState<any>(null)
  
  const [editedAnswer, setEditedAnswer] = useState("")
  const [editedBoundary, setEditedBoundary] = useState("")
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const handleDraft = async () => {
    setLoading(true)
    try {
      const res = await draftAnswerCard(
        currentQuestion, 
        "인텐시브 베리어 세라마이드 크림 (모공 막힘 없는 논코메도제닉 테스트 완료, 세라마이드 20,000ppm)"
      )
      setDraft(res)
      setEditedAnswer(res.answerText || "")
      setEditedBoundary(res.boundaryText || "")
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setErrorMsg(null)
    try {
      const res = await saveAnswerDraft(productId, currentQuestion, editedAnswer, editedBoundary, draft?.suggestedEvidence || [])
      if (res?.error) {
        setErrorMsg(res.error)
      }
    } catch (e) {
      console.error(e)
      setErrorMsg("알 수 없는 오류가 발생했습니다.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-1 space-y-6">
        <div className="mb-4">
          <div className="text-sm font-semibold text-indigo-600 mb-2 uppercase tracking-wider dark:text-indigo-400">Target Question</div>
          <h1 className="text-2xl font-bold bg-white p-5 rounded-xl border border-zinc-200 shadow-sm leading-snug text-zinc-900 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-100">
            Q. {currentQuestion}
          </h1>
        </div>

        <Card className="border-zinc-200 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800 mb-4">
            <CardTitle className="text-lg flex items-center gap-2 dark:text-zinc-100">
              Answer Editor
            </CardTitle>
            <Button onClick={handleDraft} disabled={loading || isSubmitting} variant="secondary" size="sm" className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-semibold dark:bg-indigo-900/40 dark:text-indigo-300 dark:hover:bg-indigo-900/60">
              <Sparkles className="w-4 h-4 mr-1.5" />
              {loading ? "AI Drafting..." : "AI 초안 생성"}
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {errorMsg && (
              <div className="p-3 text-sm text-red-800 bg-red-50 border border-red-200 rounded-lg dark:bg-red-950/30 dark:text-red-400 dark:border-red-900/50">
                ⚠️ 검수 요청 실패 (데이터베이스 RLS 권한 거부 또는 필수값 누락): {errorMsg}
              </div>
            )}
            <div className="space-y-3">
              <label className="text-sm font-bold text-zinc-800 dark:text-zinc-200">A. 핵심 답변 (Answer)</label>
              <Textarea 
                value={editedAnswer}
                onChange={(e) => setEditedAnswer(e.target.value)}
                placeholder="답변을 trực접 입력하거나 우측 상단의 [AI 초안 생성]을 클릭하세요."
                className="min-h-[180px] text-base leading-relaxed bg-zinc-50 focus-visible:bg-white resize-none dark:bg-zinc-950 dark:border-zinc-800"
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-bold text-amber-800 dark:text-amber-500">한계점 및 주의사항 (Boundary Limits)</label>
              <Textarea 
                value={editedBoundary}
                onChange={(e) => setEditedBoundary(e.target.value)}
                placeholder="어떤 피부가 피해야 하는지, 발생 가능한 부작용이 있다면 명확히 기재하세요."
                className="min-h-[100px] bg-amber-50/50 border-amber-200 focus-visible:ring-amber-500 resize-none dark:bg-amber-950/20 dark:border-amber-900/40 dark:text-amber-100"
              />
            </div>
            
            <div className="flex gap-3 justify-end pt-6 border-t border-zinc-100 mt-2 dark:border-zinc-800">
              <Button variant="outline" className="font-medium dark:border-zinc-700 dark:text-zinc-300"><Save className="w-4 h-4 mr-2" /> 임시저장</Button>
              <Button onClick={handleSubmit} disabled={isSubmitting || !editedAnswer} className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-sm dark:bg-indigo-500 dark:hover:bg-indigo-600">
                <Send className="w-4 h-4 mr-2" /> {isSubmitting ? "Submitting..." : "검수 요청 (Submit)"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <aside className="w-full lg:w-80 space-y-6">
        <Card className="bg-zinc-50 border-zinc-200 shadow-sm dark:bg-zinc-900/50 dark:border-zinc-800">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold dark:text-zinc-100">AI Draft Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 text-sm">
            {draft ? (
              <div className="animate-in fade-in duration-300">
                <div className="flex justify-between items-center border-b border-zinc-200 pb-3 mb-4 dark:border-zinc-800">
                  <span className="text-zinc-600 font-medium dark:text-zinc-400">신뢰도 점수 (Confidence)</span>
                  <span className="font-extrabold text-lg text-emerald-600 dark:text-emerald-500">{draft.confidenceScore} <span className="text-xs text-emerald-600/60">/100</span></span>
                </div>
                <div>
                  <span className="block text-zinc-900 font-bold mb-3 dark:text-zinc-100">발견된 에비던스 맥락</span>
                  <ul className="space-y-2 text-zinc-600 dark:text-zinc-400">
                    {draft.suggestedEvidence?.map((ev: string, i: number) => (
                      <li key={i} className="flex gap-2 items-start bg-white p-2.5 rounded-md border border-zinc-100 shadow-sm dark:bg-zinc-950 dark:border-zinc-800">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                        <span className="leading-tight">{ev}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center text-zinc-500 bg-white rounded-lg border border-dashed border-zinc-300 dark:bg-zinc-950 dark:border-zinc-700 dark:text-zinc-400">
                <Sparkles className="w-8 h-8 mx-auto text-zinc-300 mb-2 dark:text-zinc-700" />
                <p>AI 초안을 생성하면 에비던스 분석 및 품질 점수가 표시됩니다.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </aside>
    </div>
  )
}

export default function AnswerBuilderPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Suspense fallback={<div className="h-64 flex items-center justify-center font-medium text-zinc-500">Loading editor...</div>}>
        <BuilderForm productId={resolvedParams.id} />
      </Suspense>
    </div>
  )
}
