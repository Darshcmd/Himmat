import type { WellnessInput, RiskCategory } from "@/lib/wellness";

export type DashboardTone = "cyan" | "emerald" | "amber" | "rose";

export const targetExams = ["JEE Main / Advanced", "NEET UG", "CUET", "Board Exams", "UPSC / NDA / Other Indian Exams"];

export const weeklyBurnoutTrend = [42, 48, 45, 58, 52, 61, 57];

export const defaultWellnessInput: WellnessInput = {
  targetExam: "JEE Main / Advanced",
  sleepHours: 5.8,
  studyHours: 10,
  moodScore: 5,
  screenTime: 8,
  mockTestScore: 64,
  daysUntilExam: 28,
  journalEntry: "I am trying hard but feel stressed and stuck after mock tests.",
};

export function getRiskTone(category: RiskCategory): DashboardTone {
  if (category === "Critical") return "rose";
  if (category === "High") return "amber";
  if (category === "Low") return "emerald";
  return "cyan";
}
