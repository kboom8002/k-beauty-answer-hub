"use client"

import { useState, use } from "react"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { generateQuestionPrescription } from "@/app/actions/gemini"
import { savePrescription } from "@/app/actions/assets"
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react"

export default function PrescriptionPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [loading, setLoading] = useState(false)
  const [isCommitting, setIsCommitting] = useState(false)
  const [questions, setQuestions] = useState<any[]>([])

  const handleGenerate = async () => {
    setLoading(true)
    try {
      const res = await generateQuestionPrescription("인텐시브 베리어 세라마이드 크림", "수분크림")
      setQuestions(res)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const handleCommit = async () => {
    setIsCommitting(true)
    try {
      await savePrescription(resolvedParams.id, questions)
    } catch (e) {
      console.error(e)
    } finally {
      setIsCommitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="mb-8 border-b border-zinc-200 pb-6 dark:border-zinc-800">
        <h1 className="text-3xl font-bold mb-2 text-zinc-900 dark:text-zinc-100">Question Prescription</h1>
        <p className="text-zinc-500 dark:text-zinc-400">AI 에이전트가 제품 속성과 타겟 고객을 분석하여 결제 전환율이 가장 높은 핵심 질문 세트를 제안합니다.</p>
      </div>

      <Card className="bg-gradient-to-br from-indigo-50 to-white border-indigo-100 dark:from-indigo-950/30 dark:to-zinc-900 dark:border-indigo-900/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-indigo-900 dark:text-indigo-400">
            <Sparkles className="w-5 h-5 text-indigo-500" />
            AI 질문 추천 엔진
          </CardTitle>
          <CardDescription className="dark:text-indigo-200/70">
            현재 선택된 "인텐시브 베리어 세라마이드 크림"에 대한 AEO 최적화 질문을 추출합니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={handleGenerate} 
            disabled={loading || isCommitting}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-sm dark:bg-indigo-500 dark:hover:bg-indigo-600"
          >
            {loading ? "Generating Prescription..." : "Generate Prescription"}
          </Button>
        </CardContent>
      </Card>

      {questions.length > 0 && (
        <div className="space-y-4 mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h3 className="text-xl font-bold mb-4 text-zinc-900 dark:text-zinc-100">추천 질문 목록</h3>
          {questions.map((q, idx) => (
            <Card key={idx} className="hover:border-indigo-300 transition-colors shadow-sm dark:bg-zinc-900 dark:border-zinc-800 dark:hover:border-indigo-500">
              <CardContent className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <Badge className="mb-3 bg-zinc-100 text-zinc-600 hover:bg-zinc-200 border-0 dark:bg-zinc-800 dark:text-zinc-300">{q.intentType}</Badge>
                  <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100 leading-snug">{q.questionText}</p>
                </div>
                <a href={`/app/products/${resolvedParams.id}/builder?q=${encodeURIComponent(q.questionText)}`} className={buttonVariants({ variant: "outline", size: "sm", className: "shrink-0 font-medium dark:border-zinc-700 dark:text-zinc-300" })}>
                  초안 직접 작성하기 <ArrowRight className="w-4 h-4 ml-1.5" />
                </a>
              </CardContent>
            </Card>
          ))}
          
          <div className="flex justify-end pt-6 border-t border-zinc-100 mt-6 dark:border-zinc-800">
            <Button onClick={handleCommit} disabled={isCommitting} className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm dark:bg-emerald-500 dark:hover:bg-emerald-600">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              {isCommitting ? "Saving..." : "선택한 질문으로 확정 (Dossier 추가)"}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
