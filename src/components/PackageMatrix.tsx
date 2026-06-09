import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Car, Clock, MessageCircle, MapPin, Phone, Route, Search, X, UtensilsCrossed, Hotel } from "lucide-react";
import { allModularPackages } from "../data/packages/index";
import { generateCategorySlug } from "../utils/slugs";

interface PackageMatrixProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onClearSearch?: () => void;
}

const quickSearches = ["Shimla", "Manali", "Kasol", "Dharamshala", "Kinnaur", "Spiti"];

const PackageMatrix = forwardRef<HTMLElement, PackageMatrixProps>(({ searchQuery = "", onSearchChange, onClearSearch }, ref) => {
  const filteredPackages = allModularPackages.filter((pkg) => {
    if (!searchQuery) {
      return true;
    }

    const query = searchQuery.toLowerCase();
    return (
      pkg.name.toLowerCase().includes(query) ||
      pkg.destinations.some((destination) => destination.toLowerCase().includes(query))
    );
  });

  return (
    <section id="packages" ref={ref} className="scroll-mt-24 bg-white py-24">
      <div className="section-container">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary-accent/10 px-5 py-2 text-xs font-black uppercase tracking-widest text-primary-accent">
            <Route className="h-4 w-4" />
            Curated Himachal routes
          </div>
          <h2 className="text-3xl font-black text-secondary-dark md:text-5xl">Premium Himachal Tour Packages</h2>
          <p className="mt-5 text-lg font-medium leading-relaxed text-muted-slate">
            Private routes, transparent cab choices, and curated day-wise travel plans for each circuit.
          </p>
          <div className="mt-8 rounded-[2rem] border border-slate-100 bg-surface-bg p-3 shadow-xl shadow-slate-950/[0.03]">
            <div className="flex flex-col gap-3 md:flex-row">
              <label className="group flex flex-1 items-center rounded-2xl bg-white px-5 py-4 transition-all duration-300 focus-within:shadow-[0_0_0_4px_rgba(244,63,94,0.15)] focus-within:ring-1 focus-within:ring-primary-accent/20">
                <Search className="mr-3 h-5 w-5 shrink-0 text-slate-400 transition-colors group-focus-within:text-primary-accent" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => onSearchChange?.(event.target.value)}
                  placeholder="Search tours by Shimla, Manali, Kasol, Kinnaur, Spiti..."
                  className="w-full bg-transparent text-base font-bold text-secondary-dark placeholder:text-slate-400 focus:outline-none"
                />
              </label>
              {searchQuery && onClearSearch && (
                <button
                  type="button"
                  onClick={onClearSearch}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-secondary-dark px-6 py-4 text-sm font-black uppercase tracking-wider text-white transition-all hover:bg-slate-800"
                >
                  <X className="h-4 w-4" />
                  Clear
                </button>
              )}
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {quickSearches.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => onSearchChange?.(item)}
                  className={`rounded-full px-4 py-2 text-xs font-black uppercase tracking-widest transition-all ${
                    searchQuery.toLowerCase() === item.toLowerCase()
                      ? "bg-primary-accent text-white"
                      : "bg-white text-muted-slate hover:text-primary-accent"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {searchQuery && (
            <div className="mt-5 inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-primary-accent/10 bg-primary-accent/5 px-4 py-2">
              <span className="text-sm font-medium text-muted-slate">Showing</span>
              <span className="text-sm font-black text-primary-accent">
                {filteredPackages.length} package{filteredPackages.length === 1 ? "" : "s"}
              </span>
              <span className="text-sm font-medium text-muted-slate">for</span>
              <span className="text-sm font-black text-secondary-dark">{searchQuery}</span>
            </div>
          )}
        </div>

        <div className="grid gap-8 xl:grid-cols-2">
          {filteredPackages.map((pkg) => {
            const detailLink = `/tour-packages/${generateCategorySlug(pkg.category)}/${pkg.slug}`;

            return (
              <article
                key={pkg.slug}
                className="group overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-xl shadow-slate-950/[0.03] transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-950/10"
              >
                <div className="grid h-full md:grid-cols-[0.88fr_1.12fr]">
                  <Link to={detailLink} className="relative block min-h-72 overflow-hidden">
                    <img
                      src={pkg.heroImage}
                      alt={pkg.name}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[11px] font-black uppercase tracking-widest text-secondary-dark">
                        <Clock className="h-3.5 w-3.5 text-primary-accent" />
                        {pkg.duration}
                      </span>
                    </div>
                  </Link>

                  <div className="flex flex-col p-7">
                    <div className="mb-5 flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-1 rounded-full bg-surface-bg px-3 py-1.5 text-[11px] font-black uppercase tracking-widest text-muted-slate">
                        <MessageCircle className="h-3.5 w-3.5 text-primary-accent" />
                        Seasonal quote
                      </span>
                    </div>

                    <h3 className="text-2xl font-black leading-tight text-secondary-dark transition-colors group-hover:text-primary-accent">
                      {pkg.name}
                    </h3>
                    <p className="mt-3 text-sm font-medium leading-relaxed text-muted-slate line-clamp-2">{pkg.overview}</p>

                    <div className="mt-5 flex items-start gap-2">
                      <MapPin className="mt-1 h-4 w-4 shrink-0 text-primary-accent" />
                      <p className="text-sm font-semibold leading-relaxed text-slate-500 line-clamp-1">{pkg.destinations.join(" -> ")}</p>
                    </div>

                    <div className="mt-6 grid gap-3">
                      <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-secondary-dark">
                        <UtensilsCrossed className="h-4 w-4 text-primary-accent" />
                        Food Included
                      </div>
                      <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-secondary-dark">
                        <Car className="h-4 w-4 text-primary-accent" />
                        Cab Included
                      </div>
                      <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-secondary-dark">
                        <Hotel className="h-4 w-4 text-primary-accent" />
                        Hotel Included
                      </div>
                    </div>

                    <div className="mt-7 grid gap-3 sm:grid-cols-2">
                      <Link
                        to={detailLink}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-secondary-dark px-5 py-4 text-sm font-black uppercase tracking-wider text-white transition-all hover:bg-slate-800"
                      >
                        View Details
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      <Link
                        to={`/booking?destination=${encodeURIComponent(pkg.name)}`}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary-accent px-5 py-4 text-sm font-black uppercase tracking-wider text-white shadow-lg shadow-primary-accent/20 transition-all hover:opacity-95"
                      >
                        Enquire Now
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                    <a
                      href="tel:+917018972255"
                      className="mt-3 inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-5 py-4 text-sm font-black uppercase tracking-wider text-secondary-dark transition-all hover:border-primary-accent hover:text-primary-accent"
                    >
                      <Phone className="h-4 w-4" />
                      Call for Quote
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {filteredPackages.length === 0 && (
          <div className="rounded-[2rem] border-2 border-dashed border-slate-200 bg-surface-bg px-6 py-20 text-center">
            <p className="text-xl font-black text-secondary-dark">No package found for {searchQuery}</p>
            <p className="mt-2 text-muted-slate">Try Shimla, Manali, Kasol, Dharamshala, Kinnaur, or Spiti.</p>
            {onClearSearch && (
              <button type="button" onClick={onClearSearch} className="mt-6 font-black text-primary-accent underline">
                Reset Search
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
});

PackageMatrix.displayName = "PackageMatrix";

export default PackageMatrix;
