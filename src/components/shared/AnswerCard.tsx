import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TrustStrip } from "./TrustStrip";
import { Button, buttonVariants } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface AnswerCardProps {
  title: string;
  questionText: string;
  answerText: string;
  evidenceCount?: number;
  reviewedBy?: string;
  updatedAt: string;
  boundaryText?: string;
  ctaUrl?: string;
}

export function AnswerCard({
  title,
  questionText,
  answerText,
  evidenceCount = 0,
  reviewedBy,
  updatedAt,
  boundaryText,
  ctaUrl
}: AnswerCardProps) {
  return (
    <Card className="w-full border-zinc-200 shadow-sm overflow-hidden dark:border-zinc-800">
      <CardHeader className="bg-zinc-50 border-b border-zinc-100 pb-4 dark:bg-zinc-900 dark:border-zinc-800">
        <div className="text-xs text-indigo-600 font-semibold mb-1 uppercase tracking-wider dark:text-indigo-400">{title}</div>
        <CardTitle className="text-xl font-bold text-zinc-900 leading-snug dark:text-zinc-100">
          Q. {questionText}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="text-zinc-800 text-base leading-relaxed dark:text-zinc-300">
          <span className="font-bold text-emerald-700 mr-2 dark:text-emerald-500">A.</span>
          {answerText}
        </div>
        
        {boundaryText && (
          <div className="bg-amber-50 text-amber-900 p-4 rounded-md border border-amber-200 text-sm leading-relaxed dark:bg-amber-950/30 dark:border-amber-900/50 dark:text-amber-200">
            <span className="font-semibold block mb-1">⚠️ 한계점 및 주의사항:</span>
            {boundaryText}
          </div>
        )}
        
        <TrustStrip 
          reviewedBy={reviewedBy} 
          updatedAt={updatedAt} 
          evidenceCount={evidenceCount} 
        />
      </CardContent>
      {ctaUrl && (
        <CardFooter className="bg-zinc-50 border-t border-zinc-100 py-3 dark:bg-zinc-900 dark:border-zinc-800">
          <a href={ctaUrl} className={buttonVariants({ variant: "ghost", className: "w-full justify-between text-indigo-700 hover:text-indigo-800 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:text-indigo-300 dark:hover:bg-indigo-950/50" })}>
            자세히 보기 <ChevronRight className="w-4 h-4 ml-2" />
          </a>
        </CardFooter>
      )}
    </Card>
  );
}
