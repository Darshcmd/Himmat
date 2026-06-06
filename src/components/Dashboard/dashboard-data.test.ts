import { describe, expect, it } from "vitest";
import { defaultWellnessInput, getRiskTone, targetExams, weeklyBurnoutTrend } from "./dashboard-data";

describe("dashboard data", () => {
  it("keeps Indian exam defaults aligned with the product focus", () => {
    expect(defaultWellnessInput.targetExam).toBe("JEE Main / Advanced");
    expect(targetExams).toEqual(expect.arrayContaining(["JEE Main / Advanced", "NEET UG", "CUET", "Board Exams"]));
    expect(weeklyBurnoutTrend).toHaveLength(7);
  });

  it("maps risk categories to stable UI tones", () => {
    expect(getRiskTone("Low")).toBe("emerald");
    expect(getRiskTone("Medium")).toBe("cyan");
    expect(getRiskTone("High")).toBe("amber");
    expect(getRiskTone("Critical")).toBe("rose");
  });
});
