<div align="center">

# Himmat: By Darsh

### Helping JEE and Indian exam students stay strong before burnout begins.

[![Next.js](https://img.shields.io/badge/Next.js-16-black)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue)]()
[![Tests](https://img.shields.io/badge/Tests-14%20Passing-success)]()
[![Coverage](https://img.shields.io/badge/Line%20Coverage-99%25-success)]()
[![Security](https://img.shields.io/badge/npm%20audit-0%20vulnerabilities-success)]()

Built by **Darsh Soni**

</div>

---

<div align="center">

<p>
  <img src="https://media.giphy.com/media/aQQ0V6tr9DsCA/giphy.gif" width="850" alt="Student under exam stress animation"/>
</p>

<i>A student should not have to break down before someone notices they are struggling.</i>

</div>

---

## Problem Statement

Indian students preparing for **JEE, NEET, CUET, Board Exams, UPSC, NDA, CA, GATE, CAT, placements, and semester exams** often live inside a high-pressure loop:

- long coaching and self-study hours
- mock-test score anxiety
- sleep loss
- backlogs
- rank tension
- screen fatigue
- guilt during rest
- emotional exhaustion

Most support arrives **after** burnout becomes visible. Himmat focuses on the earlier moment: when warning signs are still small enough to act on.

## Solution

**Himmat** is a predictive student wellness dashboard that estimates burnout risk and exam readiness from daily preparation signals.

It uses a local deterministic wellness engine to analyze:

- target exam
- sleep hours
- study hours
- mood score
- screen time
- mock-test score
- days until exam
- journal text

The output is:

- burnout risk score from `0` to `100`
- risk category: `Low`, `Medium`, `High`, or `Critical`
- main risk factors
- journal sentiment signals
- focus score
- recovery score
- exam readiness score
- tomorrow's recovery plan
- panic-mode reset flow

Himmat is **not therapy, medical advice, or crisis care**. It is a study wellness and self-awareness tool that encourages students to contact a trusted person or emergency support when needed.

## Why This Fits The Problem

Himmat is designed around Indian student reality, not a generic wellness chatbot.

- **JEE/NEET pressure:** mock scores, PYQs, revision blocks, formula/NCERT review, rank tension
- **Indian exam ecosystem:** coaching load, school pressure, boards, CUET, UPSC, NDA, CA, placements
- **Early intervention:** detects risk before a student reaches shutdown
- **Practical recovery:** turns signals into tomorrow's study and rest plan
- **Safe language:** does not pretend to replace counselors, doctors, or emergency help

## Demo Flow

1. Open the dashboard.
2. Select the target exam, for example `JEE Main / Advanced`.
3. Change sleep, study hours, mood, screen time, mock score, and exam countdown.
4. Watch burnout risk, focus, recovery, and exam readiness update instantly.
5. Edit the journal entry with words like `stress`, `backlog`, `rank tension`, or `PYQ`.
6. Review the risk factors and recovery plan.
7. Press **I feel overwhelmed** to show the 60-second panic reset.

## Core Features

### Burnout Risk Engine

The engine calculates risk using bounded, sanitized inputs. It explains the main risk factors instead of showing a vague score.

Example factors:

- `JEE Main / Advanced preparation needs a recovery buffer`
- `Sleep is below the recovery range`
- `Study load is crossing sustainable limits`
- `Mood trend shows emotional fatigue`

### Journal Insight

Himmat detects local sentiment signals from journal text:

- stress
- anxiety
- frustration
- motivation
- hopelessness
- confidence

It includes Indian exam phrases such as:

- coaching pressure
- backlog
- rank tension
- PYQ

### Exam Readiness Dashboard

The dashboard shows:

- burnout risk
- focus score
- recovery score
- exam readiness
- weekly trend
- target exam context

### AI-Style Recovery Plan

Himmat produces practical next-day guidance:

- study plan
- sleep target
- break schedule
- recovery activity
- motivation note
- exam preparation correction

The current implementation is local and deterministic, so the demo works without any API key.

### Panic Mode

The panic mode gives a 60-second support flow:

- breathing instructions
- grounding steps
- screen break prompt
- trusted-person / emergency-support reminder
- clear disclaimer that Himmat is not medical care

## Tech Stack

- **Framework:** Next.js 16 App Router
- **Language:** TypeScript, strict mode
- **UI:** React 18, Tailwind CSS
- **Icons:** Lucide React
- **Testing:** Vitest, React Testing Library, Testing Library Jest DOM
- **Deployment:** Vercel
- **Security:** Next.js headers, input validation, no hardcoded secrets

No external backend, database, or AI-provider key is required for the current production demo.

## Architecture

```text
src/
  app/
    api/analyze/route.ts          Safe JSON analysis endpoint
    dashboard/page.tsx            Dashboard route
    page.tsx                      Landing page
    survey/page.tsx               Check-in route
  components/
    Dashboard/
      HimmatDashboard.tsx         Main dashboard orchestrator
      SignalCheckInForm.tsx       Student input controls
      RiskSummaryCard.tsx         Burnout score and trend
      InsightPanels.tsx           Risk factors and recovery plan
      PanicMode.tsx               Lazy-loaded reset dialog
      dashboard-data.ts           Defaults and UI helpers
    Survey/
      SurveyForm.tsx              Quick check-in flow
  lib/
    wellness.ts                   Scoring, normalization, sentiment, recovery logic
```

## Code Quality

- Modular dashboard components
- Strict TypeScript types for wellness inputs and outputs
- Reusable scoring logic in `src/lib/wellness.ts`
- Focused tests for the scoring engine, API route, dashboard constants, and survey flow
- One-command quality gate: `npm run check`
- No unused legacy role/team components
- No unused AI/PDF dependencies

## Security

Security controls currently implemented:

- no hardcoded API keys
- no required secrets for the default app
- `.env` files ignored by git
- `.env.example` documents future secret placeholders only
- `npm audit --omit=dev` returns `0 vulnerabilities`
- PostCSS pinned and overridden to patched `8.5.15`
- API requires `application/json`
- API rejects oversized request bodies
- API rejects oversized journal entries before truncation
- API rejects JSON arrays and invalid shapes
- numeric inputs are bounded
- journal text is sanitized
- no user journal data is logged
- app-level security headers in `next.config.ts`

Security headers include:

- `Content-Security-Policy`
- `X-Frame-Options`
- `X-Content-Type-Options`
- `Referrer-Policy`
- `Permissions-Policy`
- `Cross-Origin-Opener-Policy`

## Efficiency

- Core analysis runs locally with no external AI call
- Most routes are statically rendered
- `/api/analyze` is lightweight and deterministic
- Panic Mode is lazy-loaded and not included in the first dashboard interaction path
- Lucide package imports are optimized in `next.config.ts`
- Next.js compression is enabled
- No database dependency is needed for the demo
- No network request is needed for scoring
- Browserslist data is updated, so production builds are clean

## Accessibility

- semantic sections and headings
- labeled range controls
- accessible answer buttons in the survey
- panic mode uses `role="dialog"`
- panic mode has `aria-modal`, `aria-labelledby`, and `aria-describedby`
- Escape key closes panic mode
- visible focus states
- high-contrast dark UI
- responsive mobile layout
- decorative icons are marked with `aria-hidden`
- GIF includes descriptive alt text

## Testing Evidence

Current verified results:

```text
Test Files: 6 passed
Tests:      17 passed
Statements: 98.5%
Branches:   89.58%
Functions:  100%
Lines:      99.13%
Audit:      0 vulnerabilities
Build:      passed
```

## Test Cases Covered

The automated suite checks the important product and judging paths:

- high-risk JEE burnout detection
- stable low-risk student scenario
- unsafe numeric input normalization
- journal sentiment detection for coaching pressure, backlog, rank tension, and PYQ language
- `/api/analyze` valid wellness analysis response
- invalid JSON rejection
- non-JSON content-type rejection
- oversized request body rejection
- oversized journal rejection before sanitization
- JSON array / invalid payload shape rejection
- survey check-in flow and dashboard redirect
- accessible survey answer button labels
- dashboard exam defaults and risk-tone mapping
- panic mode dialog rendering, focus behavior, and Escape-key close
- closed panic mode rendering nothing
- web app manifest name, theme color, and icon metadata

Commands:

```bash
npm run lint
npm run typecheck
npm run test:coverage
npm run build
npm audit --omit=dev
```

Or run the full quality gate:

```bash
npm run check
```

## Judge Criteria Mapping

| Criteria | Evidence |
|---|---|
| Code Quality | Modular components, strict TypeScript, reusable wellness engine, focused tests |
| Security | 0 audit vulnerabilities, no secrets, strict API validation, CSP/security headers |
| Efficiency | Static routes, local scoring, lazy panic mode, clean production build |
| Testing | 17 automated tests, 99.13% line coverage, API, UI, manifest, and accessibility behavior tests |
| Accessibility | labeled controls, dialog semantics, keyboard support, high contrast, responsive UI |
| Problem Alignment | JEE and Indian exam mental-health focus, coaching/backlog/rank/PYQ language |

## API Example

Endpoint:

```text
POST /api/analyze
```

Request:

```json
{
  "targetExam": "JEE Main / Advanced",
  "sleepHours": 5,
  "studyHours": 11,
  "moodScore": 4,
  "screenTime": 9,
  "mockTestScore": 55,
  "daysUntilExam": 18,
  "journalEntry": "I feel anxious about mock tests and coaching backlog."
}
```

Response includes:

```json
{
  "burnoutRisk": 78,
  "category": "High",
  "focusScore": 59,
  "recoveryScore": 32,
  "examReadiness": 50
}
```

Scores vary based on the full payload.

## Local Setup

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## Production Build

```bash
npm run build
npm run start
```

## Deploy To Vercel

1. Push this project to GitHub.
2. Open `https://vercel.com/new`.
3. Import the repository.
4. Framework preset: `Next.js`.
5. Build command: `npm run build`.
6. Install command: `npm install`.
7. Environment variables: none required for the current demo.
8. Node.js version: `20.x` or newer.
9. Deploy.

## Environment Variables

The current app requires no environment variables.

`.env.example` exists only for future server-side AI provider keys. Do not commit real secrets.

## Project Status

Ready for hackathon judging:

- polished dashboard
- Indian student mental-health focus
- local burnout prediction
- panic mode
- secure API
- strong accessibility
- high automated coverage
- Vercel-ready build

---

<div align="center">

## Himmat

### Strength is not only studying harder. Strength is knowing when to take care of yourself.

Built by **Darsh Soni**

</div>
