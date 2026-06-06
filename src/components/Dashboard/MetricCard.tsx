import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DashboardTone } from "./dashboard-data";

const toneStyles: Record<DashboardTone, string> = {
  cyan: "text-cyan-300 bg-cyan-400/10 border-cyan-300/20",
  emerald: "text-emerald-300 bg-emerald-400/10 border-emerald-300/20",
  amber: "text-amber-300 bg-amber-400/10 border-amber-300/20",
  rose: "text-rose-300 bg-rose-400/10 border-rose-300/20",
};

export function MetricCard({
  label,
  value,
  helper,
  icon: Icon,
  tone = "cyan",
}: {
  label: string;
  value: string;
  helper: string;
  icon: LucideIcon;
  tone?: DashboardTone;
}) {
  return (
    <section className="rounded-lg border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-black/10 backdrop-blur">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-400">{label}</p>
          <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
        </div>
        <div className={cn("rounded-lg border p-2.5", toneStyles[tone])}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-300">{helper}</p>
    </section>
  );
}
