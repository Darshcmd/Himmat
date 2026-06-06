import { CheckCircle2, Flame, ShieldCheck, Sparkles } from "lucide-react";
import type { WellnessAnalysis } from "@/lib/wellness";

export function InsightPanels({ analysis }: { analysis: WellnessAnalysis }) {
  return (
    <div className="grid gap-6">
      <section className="rounded-lg border border-white/10 bg-white/[0.06] p-6 backdrop-blur">
        <div className="flex items-center gap-3">
          <Flame className="h-5 w-5 text-amber-200" aria-hidden="true" />
          <h2 className="text-2xl font-semibold">Main risk factors</h2>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {analysis.factors.map((factor) => (
            <div key={factor} className="rounded-lg border border-white/10 bg-slate-950/45 p-4 text-sm leading-6 text-slate-200">
              {factor}
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-white/10 bg-white/[0.06] p-6 backdrop-blur">
        <div className="flex items-center gap-3">
          <Sparkles className="h-5 w-5 text-cyan-200" aria-hidden="true" />
          <h2 className="text-2xl font-semibold">AI recovery plan</h2>
        </div>
        <div className="mt-5 grid gap-3">
          {Object.entries(analysis.recoveryPlan).map(([label, value]) => (
            <div key={label} className="rounded-lg border border-white/10 bg-slate-950/45 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">{label.replace(/([A-Z])/g, " $1")}</p>
              <p className="mt-2 text-sm leading-6 text-slate-200">{value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-emerald-200/20 bg-emerald-300/10 p-5 text-emerald-50">
          <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
          <h3 className="mt-3 font-semibold">Journal insight</h3>
          <p className="mt-2 text-sm leading-6">{analysis.journalSignals.join(", ")} detected from today&apos;s entry.</p>
        </div>
        <div className="rounded-lg border border-amber-200/20 bg-amber-300/10 p-5 text-amber-50">
          <ShieldCheck className="h-5 w-5" aria-hidden="true" />
          <h3 className="mt-3 font-semibold">Safety note</h3>
          <p className="mt-2 text-sm leading-6">For crisis, self-harm, or medical concerns, contact a trusted person or emergency support.</p>
        </div>
      </section>
    </div>
  );
}
