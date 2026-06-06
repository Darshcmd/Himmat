import { describe, expect, it } from "vitest";
import { analyzeJournal, analyzeWellness, normalizeWellnessInput } from "./wellness";

describe("wellness risk engine", () => {
  it("detects high-risk JEE pressure and produces an Indian exam recovery plan", () => {
    const analysis = analyzeWellness({
      targetExam: "JEE Main / Advanced",
      sleepHours: 4.5,
      studyHours: 12,
      moodScore: 3,
      screenTime: 10,
      mockTestScore: 48,
      daysUntilExam: 10,
      journalEntry: "I feel anxious, stressed, stuck, and worried about rank tension.",
    });

    expect(analysis.category).toBe("Critical");
    expect(analysis.burnoutRisk).toBeGreaterThanOrEqual(82);
    expect(analysis.journalSignals).toEqual(expect.arrayContaining(["stress", "anxiety", "frustration"]));
    expect(analysis.factors.join(" ")).toContain("JEE Main / Advanced");
    expect(analysis.recoveryPlan.tomorrowStudyPlan).toContain("JEE Main / Advanced");
    expect(analysis.recoveryPlan.examPreparationCorrection).toContain("JEE Main / Advanced");
  });

  it("keeps stable students low risk with practical guidance", () => {
    const analysis = analyzeWellness({
      targetExam: "Board Exams",
      sleepHours: 8,
      studyHours: 5,
      moodScore: 8,
      screenTime: 4,
      mockTestScore: 82,
      daysUntilExam: 90,
      journalEntry: "I feel calm, prepared, and consistent today.",
    });

    expect(analysis.category).toBe("Low");
    expect(analysis.examReadiness).toBeGreaterThan(70);
    expect(analysis.journalSignals).toEqual(expect.arrayContaining(["motivation", "confidence"]));
  });

  it("normalizes unsafe and invalid input values", () => {
    const input = normalizeWellnessInput({
      targetExam: "<script>NEET UG</script>",
      sleepHours: Number.NaN,
      studyHours: 99,
      moodScore: -10,
      screenTime: "not a number" as unknown as number,
      mockTestScore: 999,
      daysUntilExam: -5,
      journalEntry: "<b>panic</b> ".repeat(200),
    });

    expect(input.targetExam).not.toContain("<");
    expect(input.sleepHours).toBe(6.5);
    expect(input.studyHours).toBe(16);
    expect(input.moodScore).toBe(1);
    expect(input.screenTime).toBe(6);
    expect(input.mockTestScore).toBe(100);
    expect(input.daysUntilExam).toBe(0);
    expect(input.journalEntry.length).toBeLessThanOrEqual(800);
    expect(input.journalEntry).not.toContain("<");
  });

  it("detects Indian exam journal language", () => {
    expect(analyzeJournal("Backlog and coaching pressure are making me nervous, but I solved a PYQ.")).toEqual(
      expect.arrayContaining(["stress", "anxiety", "frustration", "confidence"])
    );
  });
});
