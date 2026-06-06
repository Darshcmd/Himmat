import { describe, expect, it } from "vitest";
import { POST } from "./route";

describe("/api/analyze", () => {
  it("returns a validated wellness analysis", async () => {
    const request = new Request("http://localhost/api/analyze", {
      method: "POST",
      body: JSON.stringify({
        targetExam: "NEET UG",
        sleepHours: 5,
        studyHours: 11,
        moodScore: 4,
        screenTime: 9,
        mockTestScore: 55,
        daysUntilExam: 18,
        journalEntry: "I feel anxious about mock tests and coaching backlog.",
      }),
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.category).toMatch(/High|Critical/);
    expect(body.factors.join(" ")).toContain("NEET UG");
    expect(body.recoveryPlan.tomorrowStudyPlan).toContain("NEET UG");
  });

  it("rejects invalid JSON payloads", async () => {
    const request = new Request("http://localhost/api/analyze", {
      method: "POST",
      body: "{bad json",
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toBe("Invalid wellness check-in payload.");
  });
});
