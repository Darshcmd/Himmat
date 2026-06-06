"use client";

import dynamic from "next/dynamic";
import { useCallback, useMemo, useState } from "react";
import { Brain, CalendarClock, HeartPulse, Moon, Sparkles, TrendingUp } from "lucide-react";
import { analyzeWellness, type WellnessAnalysis, type WellnessInput } from "@/lib/wellness";
import { defaultWellnessInput, getRiskTone } from "./dashboard-data";
import { InsightPanels } from "./InsightPanels";
import { MetricCard } from "./MetricCard";
import { RiskSummaryCard } from "./RiskSummaryCard";
import { SignalCheckInForm } from "./SignalCheckInForm";

const PanicMode = dynamic(() => import("./PanicMode").then((module) => module.PanicMode), {
  ssr: false,
});

export function HimmatDashboard() {
  const [input, setInput] = useState<WellnessInput>(defaultWellnessInput);
  const [showPanic, setShowPanic] = useState(false);
  const analysis: WellnessAnalysis = useMemo(() => analyzeWellness(input), [input]);
  const riskTone = getRiskTone(analysis.category);
  const closePanicMode = useCallback(() => setShowPanic(false), []);

  return (
    <>
      {showPanic ? <PanicMode open={showPanic} onClose={closePanicMode} /> : null}
      <main className="min-h-screen bg-[#07111f] text-white">
        <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top_left,#17434e,transparent_34%),linear-gradient(135deg,#07111f_0%,#111827_48%,#10201d_100%)]">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
            <div className="flex flex-col justify-center">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200">Himmat: By Darsh</p>
              <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">
                Helping JEE and Indian exam students stay strong before burnout begins.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                Predict burnout risk from sleep, coaching load, mood, JEE/NEET/CUET pressure, mock scores, screen time, and journal signals.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#check-in"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-100"
                >
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  Run check-in
                </a>
                <button
                  type="button"
                  onClick={() => setShowPanic(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-rose-200/30 bg-rose-400/10 px-5 py-3 text-sm font-semibold text-rose-100 transition hover:bg-rose-400/20 focus:outline-none focus:ring-2 focus:ring-rose-200"
                >
                  <HeartPulse className="h-4 w-4" aria-hidden="true" />
                  I feel overwhelmed
                </button>
              </div>
            </div>

            <RiskSummaryCard analysis={analysis} input={input} />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard label="Focus score" value={`${analysis.focusScore}%`} helper="Ability to sustain deep work today." icon={Brain} tone="cyan" />
            <MetricCard label="Recovery score" value={`${analysis.recoveryScore}%`} helper="Sleep and break readiness for tomorrow." icon={Moon} tone="emerald" />
            <MetricCard label="Exam readiness" value={`${analysis.examReadiness}%`} helper={`${input.daysUntilExam} days until ${input.targetExam}.`} icon={CalendarClock} tone="amber" />
            <MetricCard label="Mood trend" value={`${input.moodScore}/10`} helper={analysis.journalSignals.join(", ")} icon={TrendingUp} tone={riskTone} />
          </div>
        </section>

        <section id="check-in" className="mx-auto grid max-w-7xl gap-6 px-4 pb-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <SignalCheckInForm input={input} onInputChange={setInput} />
          <InsightPanels analysis={analysis} />
        </section>
      </main>
    </>
  );
}
