"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const QUESTIONS = [
  "How rested do you feel after last night's sleep?",
  "How sustainable does today's study load feel?",
  "How steady is your mood right now?",
  "How confident do you feel after recent mock tests?",
  "How well are you taking breaks away from screens?",
  "How prepared do you feel for the next exam milestone?",
];

export default function SurveyForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [completed, setCompleted] = useState(false);
  const progress = ((currentStep + 1) / QUESTIONS.length) * 100;

  const handleAnswer = (score: number) => {
    setAnswers({ ...answers, [currentStep]: score });

    if (currentStep < QUESTIONS.length - 1) {
      window.setTimeout(() => setCurrentStep((step) => step + 1), 180);
      return;
    }

    setCompleted(true);
    window.setTimeout(() => router.push("/dashboard"), 900);
  };

  if (completed) {
    return (
      <div className="rounded-lg border border-emerald-200/20 bg-emerald-300/10 p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-100" aria-hidden="true" />
        <h2 className="mt-4 text-2xl font-semibold">Check-in saved</h2>
        <p className="mt-2 text-sm text-emerald-50">Opening your Himmat dashboard.</p>
      </div>
    );
  }

  return (
    <section className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.06] shadow-2xl backdrop-blur">
      <div className="h-1 bg-white/10">
        <div className="h-full bg-cyan-300 transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>

      <div className="p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
          Question {currentStep + 1} of {QUESTIONS.length}
        </p>
        <h2 className="mt-4 min-h-20 text-2xl font-semibold leading-snug text-white">{QUESTIONS[currentStep]}</h2>

        <div className="mt-8 grid grid-cols-5 gap-3">
          {[1, 2, 3, 4, 5].map((score) => (
            <button
              key={score}
              type="button"
              onClick={() => handleAnswer(score)}
              className={cn(
                "h-14 rounded-lg border text-lg font-semibold transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-cyan-200",
                answers[currentStep] === score
                  ? "border-cyan-200 bg-cyan-300 text-slate-950"
                  : "border-white/10 bg-slate-950/55 text-slate-200 hover:border-cyan-200/70"
              )}
              aria-label={`Answer ${score} out of 5`}
            >
              {score}
            </button>
          ))}
        </div>

        <div className="mt-4 flex justify-between text-xs font-medium text-slate-400">
          <span>Low</span>
          <span>Strong</span>
        </div>
      </div>
    </section>
  );
}
