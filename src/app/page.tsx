import Link from "next/link";
import { ArrowRight, Brain, CalendarCheck, HeartPulse, ShieldCheck } from "lucide-react";

const features = [
  {
    title: "Burnout risk engine",
    text: "Scores sleep, coaching load, mood, screens, mock performance, exam proximity, and journal tone.",
    icon: Brain,
  },
  {
    title: "Exam readiness",
    text: "Combines focus, recovery, and mock-test signals for JEE, NEET, CUET, Boards, and other Indian exams.",
    icon: CalendarCheck,
  },
  {
    title: "Panic mode",
    text: "A calm 60-second reset flow with grounding steps and responsible safety language.",
    icon: HeartPulse,
  },
  {
    title: "Privacy-first demo",
    text: "Runs deterministic analysis locally with no required API key and no secret-bearing client code.",
    icon: ShieldCheck,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_20%_0%,#155e75,transparent_32%),linear-gradient(135deg,#07111f,#111827_52%,#0f2a25)]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200">Himmat: By Darsh</p>
            <h1 className="mt-5 max-w-4xl text-5xl font-semibold tracking-tight sm:text-7xl">
              Helping students stay strong before burnout begins.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              A premium predictive wellness dashboard for JEE aspirants and Indian students preparing for NEET, CUET, Boards, UPSC, NDA, CA, and other high-pressure exams.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-100"
              >
                Open dashboard
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/survey"
                className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
              >
                Start check-in
              </Link>
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-slate-950/45 p-6 shadow-2xl backdrop-blur">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Live demo profile</p>
                <p className="mt-2 text-4xl font-semibold">High pressure</p>
              </div>
              <span className="rounded-full bg-amber-300/15 px-3 py-1 text-sm font-semibold text-amber-100">64 risk</span>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {["JEE Main", "5.8h sleep", "10h study", "64% mock"].map((item) => (
                <div key={item} className="rounded-lg border border-white/10 bg-white/[0.06] p-4 text-sm text-slate-200">
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-lg border border-cyan-200/20 bg-cyan-300/10 p-4">
              <p className="text-sm font-semibold text-cyan-100">Tomorrow&apos;s correction</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Three focused JEE blocks, one PYQ/error-log review, protected sleep cutoff, and a real break after every third cycle.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-10 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {features.map((feature) => (
          <article key={feature.title} className="rounded-lg border border-white/10 bg-white/[0.06] p-5">
            <feature.icon className="h-6 w-6 text-cyan-200" aria-hidden="true" />
            <h2 className="mt-4 text-lg font-semibold">{feature.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">{feature.text}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
