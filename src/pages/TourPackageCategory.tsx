import { ArrowRight, Car, ChevronRight, Hotel, MessageCircle, Sparkles, UtensilsCrossed } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import SEO from "../components/SEO";
import { tourPackageCategoryMap } from "../data/tourPackagesCatalog";

const TourPackageCategory = () => {
  const { slug = "" } = useParams();
  const category = tourPackageCategoryMap[slug];

  if (!category) {
    return <Navigate to="/tour-packages" replace />;
  }

  const categoryPath = `/tour-packages/${category.slug}`;
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://gurukripaholiday.com/" },
      { "@type": "ListItem", position: 2, name: "Tour Packages", item: "https://gurukripaholiday.com/tour-packages" },
      { "@type": "ListItem", position: 3, name: category.name, item: `https://gurukripaholiday.com${categoryPath}` },
    ],
  };

  return (
    <>
      <SEO
        title={`${category.name} | Guru Kripa Travels`}
        description={category.seoDescription}
        path={categoryPath}
        image={category.heroImage}
        schema={breadcrumbSchema}
      />

      <section className="relative min-h-[70svh] overflow-hidden bg-secondary-dark">
        <img src={category.heroImage} alt={`${category.name} visual`} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-r from-slate-950/72 via-slate-950/40 to-slate-950/12" />
        <div className="section-container relative z-10 py-24 text-white md:py-32">
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/85">
            <Link to="/" className="hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to="/tour-packages" className="hover:text-white">
              Tour Packages
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white">{category.name}</span>
          </nav>
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-widest">
              <MessageCircle className="h-4 w-4 text-primary-accent" />
              Tour package listing
            </p>
            <h1 className="text-4xl font-black leading-tight md:text-6xl">{category.name}</h1>
            <p className="mt-5 text-lg font-medium leading-relaxed text-white/85 md:text-xl">{category.heroSubtitle}</p>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="section-container">
          <h2 className="text-3xl font-black text-secondary-dark md:text-5xl">Available Packages in {category.name}</h2>
          <p className="mt-4 max-w-3xl text-base font-medium leading-relaxed text-muted-slate">
            Compare package options, check inclusions, and open detailed pages for itinerary placeholders and inquiry actions.
          </p>

          <div className="mt-10 grid gap-8 xl:grid-cols-2">
            {category.packages.map((pkg) => (
              <article
                key={pkg.slug}
                className="group overflow-hidden rounded-4xl border border-slate-100 bg-white shadow-xl shadow-slate-950/3 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-950/10"
              >
                <div className="grid h-full md:grid-cols-[0.92fr_1.08fr]">
                  <div className="relative min-h-72 overflow-hidden bg-slate-200">
                    <img src={pkg.image} alt={pkg.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-linear-to-t from-slate-950/74 via-transparent to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full bg-primary-accent px-4 py-2 text-[11px] font-black uppercase tracking-widest text-white">
                      {pkg.duration}
                    </span>
                  </div>
                  <div className="flex flex-col p-6">
                    <h3 className="text-2xl font-black leading-tight text-secondary-dark">{pkg.name}</h3>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {pkg.quickHighlights.slice(0, 3).map((highlight) => (
                        <span key={highlight} className="rounded-full bg-surface-bg px-3 py-1 text-[10px] font-black uppercase tracking-widest text-muted-slate">
                          {highlight}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-2 text-xs font-black uppercase tracking-wider text-secondary-dark">
                      <span className="inline-flex items-center gap-2 rounded-xl bg-surface-bg px-3 py-2">
                        <UtensilsCrossed className="h-3.5 w-3.5 text-primary-accent" />
                        Food Included
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-xl bg-surface-bg px-3 py-2">
                        <Car className="h-3.5 w-3.5 text-primary-accent" />
                        Cab Included
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-xl bg-surface-bg px-3 py-2">
                        <Hotel className="h-3.5 w-3.5 text-primary-accent" />
                        Hotel Included
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-xl bg-surface-bg px-3 py-2">
                        <Sparkles className="h-3.5 w-3.5 text-primary-accent" />
                        More Features
                      </span>
                    </div>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      <Link
                        to={`/booking?type=tour-package&destination=${encodeURIComponent(pkg.name)}`}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary-accent px-4 py-3 text-sm font-black uppercase tracking-wider text-white shadow-lg shadow-primary-accent/20"
                      >
                        Enquire Now
                      </Link>
                      <Link
                        to={`/tour-packages/${category.slug}/${pkg.slug}`}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-secondary-dark px-4 py-3 text-sm font-black uppercase tracking-wider text-white"
                      >
                        View Details
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default TourPackageCategory;
