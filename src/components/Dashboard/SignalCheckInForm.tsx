import type { WellnessInput } from "@/lib/wellness";
import { targetExams } from "./dashboard-data";
import { RangeField } from "./RangeField";

export function SignalCheckInForm({
  input,
  onInputChange,
}: {
  input: WellnessInput;
  onInputChange: (input: WellnessInput) => void;
}) {
  const updateInput = (partial: Partial<WellnessInput>) => onInputChange({ ...input, ...partial });

  return (
    <form className="rounded-lg border border-white/10 bg-white/[0.06] p-6 backdrop-blur" onSubmit={(event) => event.preventDefault()}>
      <h2 className="text-2xl font-semibold">Indian student signal check-in</h2>
      <p className="mt-2 text-sm leading-6 text-slate-400">
        Adjust JEE, NEET, CUET, Boards, or other Indian exam signals. Himmat recalculates locally in your browser.
      </p>
      <div className="mt-6 space-y-5">
        <label className="block">
          <span className="text-sm font-medium text-slate-200">Target exam</span>
          <select
            value={input.targetExam}
            onChange={(event) => updateInput({ targetExam: event.target.value })}
            className="mt-2 w-full rounded-lg border border-white/10 bg-slate-950/70 p-3 text-sm text-white outline-none transition focus:border-cyan-200"
          >
            {targetExams.map((exam) => (
              <option key={exam} value={exam}>
                {exam}
              </option>
            ))}
          </select>
        </label>
        <RangeField label="Sleep hours" min={0} max={12} step={0.1} value={input.sleepHours} suffix="h" onChange={(sleepHours) => updateInput({ sleepHours })} />
        <RangeField label="Study hours" min={0} max={16} value={input.studyHours} suffix="h" onChange={(studyHours) => updateInput({ studyHours })} />
        <RangeField label="Mood score" min={1} max={10} value={input.moodScore} suffix="/10" onChange={(moodScore) => updateInput({ moodScore })} />
        <RangeField label="Screen time" min={0} max={18} value={input.screenTime} suffix="h" onChange={(screenTime) => updateInput({ screenTime })} />
        <RangeField label="Mock test score" min={0} max={100} value={input.mockTestScore} suffix="%" onChange={(mockTestScore) => updateInput({ mockTestScore })} />
        <RangeField label="Days until exam" min={0} max={180} value={input.daysUntilExam} suffix="d" onChange={(daysUntilExam) => updateInput({ daysUntilExam })} />
        <label className="block">
          <span className="text-sm font-medium text-slate-200">Journal entry</span>
          <textarea
            value={input.journalEntry}
            maxLength={800}
            onChange={(event) => updateInput({ journalEntry: event.target.value })}
            className="mt-2 min-h-28 w-full rounded-lg border border-white/10 bg-slate-950/70 p-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-200"
            placeholder="Write what studying, coaching, mocks, or school felt like today."
          />
        </label>
      </div>
    </form>
  );
}
