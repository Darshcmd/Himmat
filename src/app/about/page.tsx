import { Brain, GraduationCap, ShieldCheck } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200">About Himmat</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">Predictive wellness for Indian exam pressure.</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
          Himmat helps JEE aspirants and Indian students preparing for NEET, CUET, Boards, UPSC, NDA, CA, and other exams notice burnout risk before it becomes a shutdown. It turns everyday signals into a practical recovery plan without pretending to be a therapist or a generic chatbot.
        </p>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Student-first",
              text: "Built around sleep, coaching hours, mock tests, PYQs, school pressure, journal tone, screen time, and exam countdowns.",
              icon: GraduationCap,
            },
            {
              title: "Predictive",
              text: "The risk engine explains why a student is trending toward pressure, not just what the score is.",
              icon: Brain,
            },
            {
              title: "Responsible",
              text: "No secret keys are required for the demo, inputs are bounded, and safety messaging is explicit.",
              icon: ShieldCheck,
            },
          ].map((item) => (
            <article key={item.title} className="rounded-lg border border-white/10 bg-white/[0.06] p-5">
              <item.icon className="h-6 w-6 text-cyan-200" aria-hidden="true" />
              <h2 className="mt-4 text-xl font-semibold">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">{item.text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
