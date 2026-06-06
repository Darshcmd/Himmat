import { NextResponse } from "next/server";
import { analyzeWellness, normalizeWellnessInput } from "@/lib/wellness";

const MAX_BODY_CHARS = 3_000;
const MAX_JOURNAL_CHARS = 800;

function isJsonRequest(request: Request) {
  return request.headers.get("content-type")?.toLowerCase().includes("application/json") ?? false;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export async function POST(request: Request) {
  if (!isJsonRequest(request)) {
    return NextResponse.json({ error: "Content-Type must be application/json." }, { status: 415 });
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_CHARS) {
    return NextResponse.json({ error: "Wellness check-in payload is too large." }, { status: 413 });
  }

  try {
    const rawBody = await request.text();
    if (rawBody.length > MAX_BODY_CHARS) {
      return NextResponse.json({ error: "Wellness check-in payload is too large." }, { status: 413 });
    }

    const body: unknown = JSON.parse(rawBody);
    if (!isRecord(body)) {
      return NextResponse.json({ error: "Wellness check-in payload must be an object." }, { status: 400 });
    }

    const rawJournal = String(body.journalEntry ?? "");
    if (rawJournal.length > MAX_JOURNAL_CHARS) {
      return NextResponse.json({ error: "Journal entry is too long." }, { status: 400 });
    }

    const input = normalizeWellnessInput(body);
    return NextResponse.json(analyzeWellness(input));
  } catch {
    return NextResponse.json({ error: "Invalid wellness check-in payload." }, { status: 400 });
  }
}
