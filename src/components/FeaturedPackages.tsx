import { Link } from "react-router-dom";
import { ArrowRight, Car, Clock, MapPin, MessageCircle, Route, UtensilsCrossed, Hotel } from "lucide-react";
import { allModularPackages } from "../data/packages/index";
import { generateCategorySlug } from "../utils/slugs";

const featuredPackageSlugs = [
  "famous-shimla-kullu-manali",
  "cherish-shimla-manali",
  "complete-himachal-amritsar",
  "flora-kinnaur",
  "eminent-manali",
  "dharamshala-dalhousie",
];

const FeaturedPackages = () => {
  const featuredPackages = allModularPackages.filter((pkg) => featuredPackageSlugs.includes(pkg.slug));

  return (
    <section className="bg-white py-24">
      <div className="section-container">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary-accent/10 px-5 py-2 text-xs font-black uppercase tracking-widest text-primary-accent">
            <Route className="h-4 w-4" />
            Top rated experiences
          </div>
          <h2 className="text-3xl font-black text-secondary-dark md:text-5xl">
            Discover the Magic of Himachal with Our Best Tour Deals
          </h2>
          <p className="mt-5 text-lg font-medium leading-relaxed text-muted-slate">
            Handpicked premium packages with transparent cab choices, hotel coordination, and 24/7 mountain support.
          </p>
        </div>

        <div className="grid gap-8 xl:grid-cols-2">
          {featuredPackages.map((pkg) => {
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
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/tour-packages"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-secondary-dark px-8 py-5 text-sm font-black uppercase tracking-wider text-white shadow-xl shadow-secondary-dark/10 transition-all hover:bg-slate-800"
          >
            View All Packages
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPackages;
