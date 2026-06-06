import { describe, expect, it } from "vitest";
import { POST } from "./route";

describe("/api/analyze", () => {
  it("returns a validated wellness analysis", async () => {
    const request = new Request("http://localhost/api/analyze", {
      method: "POST",
      headers: { "content-type": "application/json" },
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
      headers: { "content-type": "application/json" },
      body: "{bad json",
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toBe("Invalid wellness check-in payload.");
  });

  it("rejects non-JSON requests", async () => {
    const request = new Request("http://localhost/api/analyze", {
      method: "POST",
      headers: { "content-type": "text/plain" },
      body: "sleep=5",
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(415);
    expect(body.error).toBe("Content-Type must be application/json.");
  });

  it("rejects oversized journal entries before sanitization", async () => {
    const request = new Request("http://localhost/api/analyze", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        targetExam: "JEE Main / Advanced",
        journalEntry: "stress ".repeat(200),
      }),
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toBe("Journal entry is too long.");
  });

  it("rejects oversized request bodies", async () => {
    const request = new Request("http://localhost/api/analyze", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        targetExam: "JEE Main / Advanced",
        filler: "x".repeat(3_200),
      }),
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(413);
    expect(body.error).toBe("Wellness check-in payload is too large.");
  });

  it("rejects JSON arrays", async () => {
    const request = new Request("http://localhost/api/analyze", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify([{ sleepHours: 8 }]),
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toBe("Wellness check-in payload must be an object.");
  });
});
