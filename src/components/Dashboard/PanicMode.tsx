"use client";

import { useEffect, useRef } from "react";
import { TimerReset } from "lucide-react";

export function PanicMode({ open, onClose }: { open: boolean; onClose: () => void }) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
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
          ref={closeButtonRef}
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
