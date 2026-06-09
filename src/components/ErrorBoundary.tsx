import { Component, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="flex min-h-screen items-center bg-surface-bg px-6 py-20">
          <section className="mx-auto max-w-2xl rounded-[2rem] border border-slate-100 bg-white p-8 text-center shadow-2xl shadow-secondary-dark/10">
            <p className="text-xs font-black uppercase tracking-widest text-primary-accent">Guru Kripa Travels</p>
            <h1 className="mt-4 text-3xl font-black leading-tight text-secondary-dark md:text-5xl">
              We are refreshing this page.
            </h1>
            <p className="mt-5 text-base font-medium leading-relaxed text-muted-slate">
              Please reload once. For urgent tour, cab, or Tempo Traveller enquiries, contact Guru Kripa directly.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <a
                href="tel:+917018972255"
                className="rounded-2xl bg-secondary-dark px-6 py-4 text-sm font-black uppercase tracking-wider text-white"
              >
                Call Expert
              </a>
              <a
                href="https://wa.me/917018972255"
                className="rounded-2xl bg-[#25D366] px-6 py-4 text-sm font-black uppercase tracking-wider text-white"
              >
                WhatsApp
              </a>
            </div>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
