import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, FileText, AlertTriangle } from "lucide-react";

interface TrustStripProps {
  reviewedBy?: string;
  updatedAt: string;
  evidenceCount: number;
  cautionFlag?: boolean;
}

export function TrustStrip({ reviewedBy, updatedAt, evidenceCount, cautionFlag }: TrustStripProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 p-3 bg-zinc-50 border border-zinc-200 rounded-lg text-sm text-zinc-600 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400">
      {reviewedBy && (
        <div className="flex items-center gap-1.5 text-emerald-700 font-medium dark:text-emerald-500">
          <CheckCircle className="w-4 h-4" />
          <span>Reviewed by {reviewedBy}</span>
        </div>
      )}
      <div className="flex items-center gap-1.5">
        <Clock className="w-4 h-4" />
        <span>Updated: {updatedAt}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <FileText className="w-4 h-4" />
        <span>{evidenceCount} Evidence{evidenceCount > 1 ? 's' : ''}</span>
      </div>
      {cautionFlag && (
        <Badge variant="destructive" className="flex items-center gap-1 bg-amber-600 hover:bg-amber-700 transition-colors">
          <AlertTriangle className="w-3 h-3" />
          <span>Caution Advised</span>
        </Badge>
      )}
    </div>
  );
}
