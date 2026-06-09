import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, MessageCircle, ShieldCheck } from "lucide-react";
import SEO from "../components/SEO";

const createBookingId = () => `GKH-2026-${Math.floor(1000 + Math.random() * 9000)}`;

const ThankYou = () => {
  const [bookingId] = useState(createBookingId);

  return (
    <div className="flex min-h-[80vh] items-center bg-surface-bg py-24">
      <SEO
        title="Thank You | Guru Kripa Travels"
        description="Your Guru Kripa Travels enquiry has been initiated. Our Himachal travel desk will respond with a route and cab quote."
        path="/thank-you"
      />

      <div className="section-container">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-10 flex justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle2 className="h-12 w-12 text-emerald-600" />
            </div>
          </div>

          <h1 className="text-4xl font-black leading-tight text-secondary-dark md:text-6xl">
            Your Mountain Journey Has Been Initiated
          </h1>

          <div className="mt-8 mb-14 inline-flex flex-col items-center gap-4 rounded-[2rem] border border-slate-100 bg-white p-6 shadow-xl shadow-secondary-dark/5 md:flex-row">
            <span className="text-sm font-black uppercase tracking-[0.2em] text-muted-slate">Booking Tracking Number</span>
            <span className="rounded-2xl border border-slate-200 bg-surface-bg px-6 py-3 font-mono text-2xl font-black text-primary-accent">
              {bookingId}
            </span>
          </div>

          <div className="grid gap-8 text-left md:grid-cols-2">
            <div className="relative overflow-hidden rounded-[2rem] border border-slate-100 bg-white p-8 shadow-2xl shadow-secondary-dark/5">
              <div className="absolute top-0 right-0 h-40 w-40 translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-accent/5" />
              <div className="relative">
                <div className="mb-8 flex items-center gap-5">
                  <div className="h-20 w-20 rounded-full border-2 border-primary-accent bg-white p-1">
                    <img
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=expert"
                      alt="Travel Specialist"
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full rounded-full bg-surface-bg"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-secondary-dark">Vikram Sharma</h3>
                    <p className="text-xs font-black uppercase tracking-widest text-primary-accent">Holiday Desk Lead</p>
                  </div>
                </div>

                <p className="mb-8 text-base font-medium leading-relaxed text-muted-slate">
                  Your enquiry has been received. Our local team will check the route, vehicle, hotel category, and dates
                  before sharing the final quote.
                </p>

                <a
                  href="https://wa.me/917018972255"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-3 rounded-2xl bg-[#25D366] py-5 font-black text-white shadow-xl shadow-green-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <MessageCircle className="h-6 w-6 fill-current" />
                  Chat Directly
                </a>
              </div>
            </div>

            <div className="flex flex-col justify-center rounded-[2rem] bg-secondary-dark p-8 text-white">
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-accent">
                <ShieldCheck className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-6 text-2xl font-black">What Happens Next?</h3>
              <ul className="space-y-6">
                {[
                  "Our Solan desk checks your route and fleet preference.",
                  "A local mountain expert calls you with availability and pricing.",
                  "Your finalized itinerary can be shared via WhatsApp.",
                ].map((step, index) => (
                  <li key={step} className="flex items-start gap-4">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-accent text-xs font-black text-white">
                      {index + 1}
                    </span>
                    <p className="font-medium text-slate-300">{step}</p>
                  </li>
                ))}
              </ul>

              <div className="mt-12 border-t border-white/10 pt-8">
                <Link
                  to="/"
                  className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-primary-accent transition-transform hover:translate-x-1"
                >
                  Return to Exploration <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;

