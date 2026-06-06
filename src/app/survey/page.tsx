import SurveyForm from "@/components/Survey/SurveyForm";

export default function SurveyLandingPage() {
  return (
    <main className="min-h-screen bg-[#07111f] px-4 py-12 text-white sm:px-6 lg:px-8">
      <section className="mx-auto max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200">Daily check-in</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">How is your exam prep system holding up today?</h1>
        <p className="mt-4 text-lg leading-8 text-slate-300">
          Answer six quick student wellness prompts. Himmat uses the signals to open a personalized dashboard view.
        </p>
        <div className="mt-8">
          <SurveyForm />
        </div>
      </section>
    </main>
  );
}
