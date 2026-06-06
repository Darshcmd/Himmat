import Link from "next/link";
import { Mail, MessageSquare, ShieldAlert } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Contact Himmat</h1>
        <p className="mx-auto mt-4 max-w-2xl text-slate-300">
          For a hackathon demo, use the dashboard and README flow. For safety concerns, reach a trusted person or emergency support immediately.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-white/10 bg-white/[0.06] p-6">
            <Mail className="mx-auto h-6 w-6 text-cyan-200" aria-hidden="true" />
            <h2 className="mt-4 font-semibold">Creator</h2>
            <p className="mt-2 text-sm text-slate-400">Himmat: By Darsh</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.06] p-6">
            <MessageSquare className="mx-auto h-6 w-6 text-cyan-200" aria-hidden="true" />
            <h2 className="mt-4 font-semibold">Demo</h2>
            <Link href="/dashboard" className="mt-2 inline-block text-sm text-cyan-200 hover:text-cyan-100">
              Open live dashboard
            </Link>
          </div>
          <div className="rounded-lg border border-amber-200/20 bg-amber-300/10 p-6">
            <ShieldAlert className="mx-auto h-6 w-6 text-amber-100" aria-hidden="true" />
            <h2 className="mt-4 font-semibold">Important</h2>
            <p className="mt-2 text-sm text-amber-50">This app is not medical or crisis care.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
