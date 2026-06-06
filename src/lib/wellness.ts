export type RiskCategory = "Low" | "Medium" | "High" | "Critical";

export type WellnessInput = {
  targetExam: string;
  sleepHours: number;
  studyHours: number;
  moodScore: number;
  screenTime: number;
  mockTestScore: number;
  daysUntilExam: number;
  journalEntry: string;
};

export type SentimentSignal =
  | "stress"
  | "anxiety"
  | "frustration"
  | "motivation"
  | "hopelessness"
  | "confidence";

export type WellnessAnalysis = {
  burnoutRisk: number;
  category: RiskCategory;
  focusScore: number;
  recoveryScore: number;
  examReadiness: number;
  factors: string[];
  journalSignals: SentimentSignal[];
  suggestedRecoveryAction: string;
  recoveryPlan: {
    tomorrowStudyPlan: string;
    sleepTarget: string;
    breakSchedule: string;
    recoveryActivity: string;
    motivationNote: string;
    examPreparationCorrection: string;
  };
};

const KEYWORDS: Record<SentimentSignal, string[]> = {
  stress: ["stress", "pressure", "overload", "exhausted", "tired", "burden", "coaching pressure"],
  anxiety: ["anxious", "anxiety", "panic", "worried", "fear", "nervous", "rank tension"],
  frustration: ["frustrated", "angry", "stuck", "irritated", "annoyed", "can't focus", "backlog"],
  motivation: ["motivated", "hope", "trying", "progress", "disciplined", "improve", "consistent"],
  hopelessness: ["hopeless", "worthless", "give up", "nothing works", "can't do this", "no selection"],
  confidence: ["confident", "ready", "clear", "calm", "strong", "prepared", "pyq"],
};

const clamp = (value: number, min = 0, max = 100) => Math.min(max, Math.max(min, value));

const toBoundedNumber = (value: unknown, fallback: number, min: number, max: number) => {
  const parsed = Number(value);
  return clamp(Number.isFinite(parsed) ? parsed : fallback, min, max);
};

const sanitizeText = (value: string) =>
  value
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 800);

export function analyzeJournal(rawEntry: string): SentimentSignal[] {
  const entry = sanitizeText(rawEntry).toLowerCase();
  const signals = Object.entries(KEYWORDS)
    .filter(([, words]) => words.some((word) => entry.includes(word)))
    .map(([signal]) => signal as SentimentSignal);

  return signals.length ? signals : ["motivation"];
}

export function normalizeWellnessInput(input: Partial<WellnessInput>): WellnessInput {
  return {
    targetExam: sanitizeText(String(input.targetExam ?? "JEE Main / Advanced")).slice(0, 80) || "JEE Main / Advanced",
    sleepHours: toBoundedNumber(input.sleepHours, 6.5, 0, 12),
    studyHours: toBoundedNumber(input.studyHours, 8, 0, 16),
    moodScore: toBoundedNumber(input.moodScore, 6, 1, 10),
    screenTime: toBoundedNumber(input.screenTime, 6, 0, 18),
    mockTestScore: toBoundedNumber(input.mockTestScore, 68, 0, 100),
    daysUntilExam: toBoundedNumber(input.daysUntilExam, 45, 0, 365),
    journalEntry: sanitizeText(String(input.journalEntry ?? "")),
  };
}

export function analyzeWellness(rawInput: Partial<WellnessInput>): WellnessAnalysis {
  const input = normalizeWellnessInput(rawInput);
  const journalSignals = analyzeJournal(input.journalEntry);
  const factors: string[] = [];

  let risk = 20;

  if (/jee|neet|cuet|boards|upsc|nda|ca|indian/i.test(input.targetExam) && input.daysUntilExam <= 45 && input.studyHours >= 8) {
    risk += 4;
    factors.push(`${input.targetExam} preparation needs a recovery buffer`);
  }

  if (input.sleepHours < 6) {
    risk += (6 - input.sleepHours) * 8;
    factors.push("Sleep is below the recovery range");
  }

  if (input.studyHours > 9) {
    risk += (input.studyHours - 9) * 5;
    factors.push("Study load is crossing sustainable limits");
  }

  if (input.moodScore <= 5) {
    risk += (6 - input.moodScore) * 6;
    factors.push("Mood trend shows emotional fatigue");
  }

  if (input.screenTime > 7) {
    risk += (input.screenTime - 7) * 4;
    factors.push("Screen time is reducing recovery quality");
  }

  if (input.mockTestScore < 55) {
    risk += (55 - input.mockTestScore) * 0.3;
    factors.push("Mock score pressure may be affecting confidence");
  }

  if (input.daysUntilExam <= 14) {
    risk += (14 - input.daysUntilExam) * 1.4 + 8;
    factors.push("Exam proximity is increasing pressure");
  }

  if (journalSignals.includes("hopelessness")) risk += 18;
  if (journalSignals.includes("anxiety")) risk += 10;
  if (journalSignals.includes("stress")) risk += 8;
  if (journalSignals.includes("frustration")) risk += 6;
  if (journalSignals.includes("confidence")) risk -= 7;
  if (journalSignals.includes("motivation")) risk -= 4;

  const burnoutRisk = Math.round(clamp(risk));
  const category: RiskCategory =
    burnoutRisk >= 82 ? "Critical" : burnoutRisk >= 62 ? "High" : burnoutRisk >= 36 ? "Medium" : "Low";

  const focusScore = Math.round(
    clamp(100 - burnoutRisk * 0.45 - Math.max(0, input.screenTime - 6) * 4 + input.moodScore * 2)
  );
  const recoveryScore = Math.round(clamp(input.sleepHours * 9 + (10 - Math.min(input.studyHours, 10)) * 3 - burnoutRisk * 0.25));
  const examReadiness = Math.round(clamp(input.mockTestScore * 0.55 + focusScore * 0.25 + recoveryScore * 0.2));

  if (!factors.length) factors.push("Signals look stable; keep protecting sleep and breaks");

  const suggestedRecoveryAction =
    category === "Critical"
      ? "Stop intensive study for the next hour, do the reset plan, and message a trusted person."
      : category === "High"
        ? "Replace one long study block with two focused blocks and a real recovery break."
        : category === "Medium"
          ? "Keep the plan, but add a short walk and a fixed sleep cutoff tonight."
          : "Maintain the routine and review one weak topic with calm repetition.";

  return {
    burnoutRisk,
    category,
    focusScore,
    recoveryScore,
    examReadiness,
    factors: factors.slice(0, 4),
    journalSignals,
    suggestedRecoveryAction,
    recoveryPlan: {
      tomorrowStudyPlan:
        category === "Critical"
          ? `Two 45-minute ${input.targetExam} blocks only: one formula/NCERT or notes pass and one easy confidence set.`
          : `Three 75-minute ${input.targetExam} blocks: weak concept, timed PYQ/mock practice, and error-log revision.`,
      sleepTarget: input.sleepHours < 7 ? "Target 7.5 hours with screens off 45 minutes before bed." : "Protect your current sleep window and keep wake time consistent.",
      breakSchedule: "Use 50/10 cycles. After three cycles, take a 30-minute meal or movement break.",
      recoveryActivity: category === "Low" ? "Ten minutes of mobility or a walk after the final session." : "Twenty minutes away from screens: walk, shower, breathing, or music.",
      motivationNote: "You do not need a perfect day. You need one steady next block.",
      examPreparationCorrection:
        input.mockTestScore < 60
          ? `For ${input.targetExam}, do fewer new questions tomorrow and repair repeated errors with solved examples before timed practice.`
          : `For ${input.targetExam}, keep practice timed, but close the loop by rewriting mistakes in one-line rules.`,
    },
  };
}
