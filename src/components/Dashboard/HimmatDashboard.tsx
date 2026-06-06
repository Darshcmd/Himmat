"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  Brain,
  CalendarClock,
  CheckCircle2,
  Flame,
  HeartPulse,
  Moon,
  ShieldCheck,
  Sparkles,
  TimerReset,
  TrendingUp,
} from "lucide-react";
import { analyzeWellness, type WellnessAnalysis, type WellnessInput } from "@/lib/wellness";
import { cn } from "@/lib/utils";

const trend = [42, 48, 45, 58, 52, 61, 57];
const targetExams = ["JEE Main / Advanced", "NEET UG", "CUET", "Board Exams", "UPSC / NDA / Other Indian Exams"];

const defaultInput: WellnessInput = {
  targetExam: "JEE Main / Advanced",
  sleepHours: 5.8,
  studyHours: 10,
  moodScore: 5,
  screenTime: 8,
  mockTestScore: 64,
  daysUntilExam: 28,
  journalEntry: "I am trying hard but feel stressed and stuck after mock tests.",
};

function MetricCard({
  label,
  value,
  helper,
  icon: Icon,
  tone = "cyan",
}: {
  label: string;
  value: string;
  helper: string;
  icon: typeof Activity;
  tone?: "cyan" | "emerald" | "amber" | "rose";
}) {
  const tones = {
    cyan: "text-cyan-300 bg-cyan-400/10 border-cyan-300/20",
    emerald: "text-emerald-300 bg-emerald-400/10 border-emerald-300/20",
    amber: "text-amber-300 bg-amber-400/10 border-amber-300/20",
    rose: "text-rose-300 bg-rose-400/10 border-rose-300/20",
  };

  return (
    <section className="rounded-lg border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-black/10 backdrop-blur">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-400">{label}</p>
          <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
        </div>
        <div className={cn("rounded-lg border p-2.5", tones[tone])}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-300">{helper}</p>
    </section>
  );
}

function RangeField({
  label,
  value,
  min,
  max,
  step = 1,
  suffix,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  suffix: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block">
      <div className="mb-2 flex items-center justify-between gap-3 text-sm">
        <span className="font-medium text-slate-200">{label}</span>
        <span className="text-slate-400">
          {value}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full accent-cyan-300"
        aria-label={label}
      />
    </label>
  );
}

function PanicMode({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="panic-title"
        aria-describedby="panic-description"
        className="w-full max-w-xl rounded-lg border border-cyan-200/20 bg-slate-950 p-6 shadow-2xl"
      >
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-cyan-300/10 p-3 text-cyan-200">
            <TimerReset className="h-6 w-6" aria-hidden="true" />
          </div>
          <div>
            <h2 id="panic-title" className="text-2xl font-semibold text-white">
              60-second reset
            </h2>
            <p id="panic-description" className="mt-2 text-sm leading-6 text-slate-300">
              You are having a hard moment, not a failed day. Step away from the study table, coaching material, or mock paper if you can.
            </p>
          </div>
        </div>

        <ol className="mt-6 space-y-3 text-sm leading-6 text-slate-200">
          <li>1. Breathe in for 4 counts, hold for 2, breathe out for 6. Repeat five times.</li>
          <li>2. Name 5 things you see, 4 you feel, 3 you hear, 2 you smell, and 1 steady next action.</li>
          <li>3. Drink water, loosen your shoulders, and put your phone face down for one minute.</li>
          <li>4. If you feel unsafe or unable to cope, contact a trusted person or local emergency support now.</li>
        </ol>

        <p className="mt-5 rounded-lg border border-amber-200/20 bg-amber-300/10 p-3 text-sm text-amber-100">
          Himmat is a study wellness aid. It does not replace therapy, medical advice, or emergency care.
        </p>

        <button
          type="button"
          onClick={onClose}
          className="mt-5 w-full rounded-lg bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-200"
        >
          I am ready for one small next step
        </button>
      </section>
    </div>
  );
}

export function HimmatDashboard() {
  const [input, setInput] = useState<WellnessInput>(defaultInput);
  const [showPanic, setShowPanic] = useState(false);
  const analysis: WellnessAnalysis = useMemo(() => analyzeWellness(input), [input]);

  const riskTone =
    analysis.category === "Critical" ? "rose" : analysis.category === "High" ? "amber" : analysis.category === "Medium" ? "cyan" : "emerald";

  return (
    <>
      <PanicMode open={showPanic} onClose={() => setShowPanic(false)} />
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

            <div className="rounded-lg border border-white/10 bg-slate-950/45 p-6 shadow-2xl backdrop-blur">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Burnout risk for {input.targetExam}</p>
                  <p className="mt-2 text-6xl font-semibold" aria-live="polite">{analysis.burnoutRisk}</p>
                </div>
                <div className={cn("rounded-full px-3 py-1 text-sm font-semibold", riskTone === "rose" ? "bg-rose-300/15 text-rose-100" : riskTone === "amber" ? "bg-amber-300/15 text-amber-100" : riskTone === "emerald" ? "bg-emerald-300/15 text-emerald-100" : "bg-cyan-300/15 text-cyan-100")}>
                  {analysis.category}
                </div>
              </div>
              <div className="mt-6 h-3 rounded-full bg-white/10">
                <div className="h-3 rounded-full bg-gradient-to-r from-emerald-300 via-cyan-300 to-rose-300" style={{ width: `${analysis.burnoutRisk}%` }} />
              </div>
              <div className="mt-6 grid grid-cols-7 items-end gap-2" aria-label="Weekly burnout trend">
                {trend.map((value, index) => (
                  <div key={index} className="rounded-t bg-cyan-200/70" style={{ height: `${value * 1.2}px` }} />
                ))}
              </div>
              <p className="mt-5 text-sm leading-6 text-slate-300">{analysis.suggestedRecoveryAction}</p>
            </div>
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
          <form className="rounded-lg border border-white/10 bg-white/[0.06] p-6 backdrop-blur" onSubmit={(event) => event.preventDefault()}>
            <h2 className="text-2xl font-semibold">Indian student signal check-in</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">Adjust JEE, NEET, CUET, Boards, or other Indian exam signals. Himmat recalculates locally in your browser.</p>
            <div className="mt-6 space-y-5">
              <label className="block">
                <span className="text-sm font-medium text-slate-200">Target exam</span>
                <select
                  value={input.targetExam}
                  onChange={(event) => setInput({ ...input, targetExam: event.target.value })}
                  className="mt-2 w-full rounded-lg border border-white/10 bg-slate-950/70 p-3 text-sm text-white outline-none transition focus:border-cyan-200"
                >
                  {targetExams.map((exam) => (
                    <option key={exam} value={exam}>
                      {exam}
                    </option>
                  ))}
                </select>
              </label>
              <RangeField label="Sleep hours" min={0} max={12} step={0.1} value={input.sleepHours} suffix="h" onChange={(sleepHours) => setInput({ ...input, sleepHours })} />
              <RangeField label="Study hours" min={0} max={16} value={input.studyHours} suffix="h" onChange={(studyHours) => setInput({ ...input, studyHours })} />
              <RangeField label="Mood score" min={1} max={10} value={input.moodScore} suffix="/10" onChange={(moodScore) => setInput({ ...input, moodScore })} />
              <RangeField label="Screen time" min={0} max={18} value={input.screenTime} suffix="h" onChange={(screenTime) => setInput({ ...input, screenTime })} />
              <RangeField label="Mock test score" min={0} max={100} value={input.mockTestScore} suffix="%" onChange={(mockTestScore) => setInput({ ...input, mockTestScore })} />
              <RangeField label="Days until exam" min={0} max={180} value={input.daysUntilExam} suffix="d" onChange={(daysUntilExam) => setInput({ ...input, daysUntilExam })} />
              <label className="block">
                <span className="text-sm font-medium text-slate-200">Journal entry</span>
                <textarea
                  value={input.journalEntry}
                  maxLength={800}
                  onChange={(event) => setInput({ ...input, journalEntry: event.target.value })}
                  className="mt-2 min-h-28 w-full rounded-lg border border-white/10 bg-slate-950/70 p-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-200"
                  placeholder="Write what studying, coaching, mocks, or school felt like today."
                />
              </label>
            </div>
          </form>

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
        </section>
      </main>
    </>
  );
}
