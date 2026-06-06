import { NextResponse } from "next/server";
import { analyzeWellness, normalizeWellnessInput } from "@/lib/wellness";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = normalizeWellnessInput(body);

    if (input.journalEntry.length > 800) {
      return NextResponse.json({ error: "Journal entry is too long." }, { status: 400 });
    }

    return NextResponse.json(analyzeWellness(input));
  } catch {
    return NextResponse.json({ error: "Invalid wellness check-in payload." }, { status: 400 });
  }
}
