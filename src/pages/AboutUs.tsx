import { ShieldCheck, Sparkles } from "lucide-react";
import SEO from "../components/SEO";
import ValueMatrixRibbon from "../components/ValueMatrixRibbon";

const AboutUs = () => {
  return (
    <>
      <SEO
        title="About Us | Guru Kripa Travels"
        description="Learn about Guru Kripa Travels, a government affiliated Himachal travel planning team based in Solan."
      />
      <section className="bg-white py-24">
        <div className="section-container">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary-accent/10 px-5 py-2 text-xs font-black uppercase tracking-widest text-primary-accent">
              <ShieldCheck className="h-4 w-4" />
              About Guru Kripa Travels
            </div>
            <h1 className="text-4xl font-black text-secondary-dark md:text-6xl">Trusted Himachal Travel Partners</h1>
            <p className="mt-6 text-lg font-medium leading-relaxed text-muted-slate">
              Guru Kripa Travels is a Solan-based travel planning team helping families, couples, and groups explore
              Himachal with private cabs, curated routes, and local support.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
            <article className="rounded-4xl border border-slate-100 bg-surface-bg p-8 shadow-xl shadow-slate-950/3">
              <Sparkles className="h-6 w-6 text-primary-accent" />
              <h2 className="mt-4 text-2xl font-black text-secondary-dark">What We Deliver</h2>
              <p className="mt-3 text-base font-medium leading-relaxed text-muted-slate">
                End-to-end holiday planning with tour packages, destination coverage, and clear trip coordination for
                smooth mountain travel.
              </p>
            </article>
            <article className="rounded-4xl border border-slate-100 bg-surface-bg p-8 shadow-xl shadow-slate-950/3">
              <ShieldCheck className="h-6 w-6 text-primary-accent" />
              <h2 className="mt-4 text-2xl font-black text-secondary-dark">Why Travelers Choose Us</h2>
              <p className="mt-3 text-base font-medium leading-relaxed text-muted-slate">
                Government affiliated operations, reliable driver network, and practical route expertise for safe,
                comfortable, and memorable journeys in Himachal Pradesh.
              </p>
            </article>
          </div>
        </div>
      </section>
      <ValueMatrixRibbon />
    </>
  );
};

export default AboutUs;
