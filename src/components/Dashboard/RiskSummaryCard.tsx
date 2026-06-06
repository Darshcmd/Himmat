import { cn } from "@/lib/utils";
import type { WellnessAnalysis, WellnessInput } from "@/lib/wellness";
import { getRiskTone, weeklyBurnoutTrend } from "./dashboard-data";

export function RiskSummaryCard({ analysis, input }: { analysis: WellnessAnalysis; input: WellnessInput }) {
  const riskTone = getRiskTone(analysis.category);
  const toneClass =
    riskTone === "rose"
      ? "bg-rose-300/15 text-rose-100"
      : riskTone === "amber"
        ? "bg-amber-300/15 text-amber-100"
        : riskTone === "emerald"
          ? "bg-emerald-300/15 text-emerald-100"
          : "bg-cyan-300/15 text-cyan-100";

  return (
    <div className="rounded-lg border border-white/10 bg-slate-950/45 p-6 shadow-2xl backdrop-blur">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">Burnout risk for {input.targetExam}</p>
          <p className="mt-2 text-6xl font-semibold" aria-live="polite">
            {analysis.burnoutRisk}
          </p>
        </div>
        <div className={cn("rounded-full px-3 py-1 text-sm font-semibold", toneClass)}>{analysis.category}</div>
      </div>
      <div className="mt-6 h-3 rounded-full bg-white/10">
        <div className="h-3 rounded-full bg-gradient-to-r from-emerald-300 via-cyan-300 to-rose-300" style={{ width: `${analysis.burnoutRisk}%` }} />
      </div>
      <div className="mt-6 grid grid-cols-7 items-end gap-2" aria-label="Weekly burnout trend">
        {weeklyBurnoutTrend.map((value, index) => (
          <div key={`${value}-${index}`} className="rounded-t bg-cyan-200/70" style={{ height: `${value * 1.2}px` }} />
        ))}
      </div>
      <p className="mt-5 text-sm leading-6 text-slate-300">{analysis.suggestedRecoveryAction}</p>
    </div>
  );
}
