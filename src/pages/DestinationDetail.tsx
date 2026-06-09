import { ArrowRight, Car, CheckCircle2, ChevronRight, Clock, HelpCircle, Hotel, MapPin, MessageCircle, Sparkles, UtensilsCrossed } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import SEO from "../components/SEO";
import { destinationDetailsMap } from "../data/destinationDetails";
import { allModularPackages } from "../data/packages/index";
import { generateCategorySlug } from "../utils/slugs";

const DestinationDetail = () => {
  const { slug = "" } = useParams();
  const destination = destinationDetailsMap[slug];

  if (!destination) {
    return <Navigate to="/destinations" replace />;
  }

  // Automatic package mapping: Find all packages that include this destination in their destinations list
  // We use a flexible match (case-insensitive and partial) to ensure coverage
  const relatedPackages = allModularPackages.filter((pkg) =>
    pkg.destinations.some((d) => d.toLowerCase().includes(destination.name.toLowerCase()))
  );

  const destinationPath = `/destinations/${destination.slug}`;
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://gurukripaholiday.com/" },
      { "@type": "ListItem", position: 2, name: "Destinations", item: "https://gurukripaholiday.com/destinations" },
      { "@type": "ListItem", position: 3, name: destination.name, item: `https://gurukripaholiday.com${destinationPath}` },
    ],
  };

  return (
    <>
      <SEO
        title={`${destination.name} | Guru Kripa Travels`}
        description={destination.overview.slice(0, 160)}
        path={destinationPath}
        image={destination.heroImage}
        schema={breadcrumbSchema}
      />

      {/* Hero Section */}
      <section className="relative min-h-[70svh] overflow-hidden bg-secondary-dark">
        <img src={destination.heroImage} alt={`${destination.name} landscape`} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-r from-slate-950/72 via-slate-950/40 to-slate-950/12" />
        <div className="section-container relative z-10 py-24 text-white md:py-32">
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/85">
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to="/destinations" className="hover:text-white">Destinations</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white">{destination.name}</span>
          </nav>
          <div className="max-w-4xl">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-widest">
              <MapPin className="h-4 w-4 text-primary-accent" />
              Himachal destination
            </p>
            <h1 className="text-4xl font-black leading-tight md:text-6xl">{destination.name}</h1>
            <p className="mt-5 text-lg font-medium leading-relaxed text-white/85 md:text-xl">{destination.heroTagline}</p>
          </div>
        </div>
      </section>

      {/* Destination Information Section */}
      <section className="bg-white py-20">
        <div className="section-container">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-12">
              <article>
                <h2 className="text-3xl font-black text-secondary-dark">About {destination.name}</h2>
                <div className="mt-6 space-y-4 text-base font-medium leading-relaxed text-muted-slate">
                  <p>{destination.overview}</p>
                  <div className="grid gap-8 pt-6 md:grid-cols-2">
                    <div>
                      <h3 className="text-lg font-black text-secondary-dark">History & Heritage</h3>
                      <p className="mt-2 text-sm leading-relaxed">{destination.history}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-secondary-dark">Local Culture</h3>
                      <p className="mt-2 text-sm leading-relaxed">{destination.culture}</p>
                    </div>
                  </div>
                </div>
              </article>

              <div className="grid gap-6 md:grid-cols-2">
                <article className="rounded-3xl border border-slate-100 bg-surface-bg p-8 shadow-sm">
                  <h3 className="flex items-center gap-3 text-xl font-black text-secondary-dark">
                    <Sparkles className="h-5 w-5 text-primary-accent" />
                    Climate
                  </h3>
                  <p className="mt-3 text-sm font-medium leading-relaxed text-muted-slate">{destination.climate}</p>
                </article>
                <article className="rounded-3xl border border-slate-100 bg-surface-bg p-8 shadow-sm">
                  <h3 className="flex items-center gap-3 text-xl font-black text-secondary-dark">
                    <Clock className="h-5 w-5 text-primary-accent" />
                    Best Time To Visit
                  </h3>
                  <p className="mt-3 text-sm font-medium leading-relaxed text-muted-slate">{destination.bestTimeToVisit}</p>
                </article>
              </div>
            </div>

            <aside className="space-y-8">
              <div className="rounded-4xl border border-slate-100 bg-surface-bg p-8 shadow-xl shadow-slate-950/3">
                <h2 className="text-2xl font-black text-secondary-dark">Popular Attractions</h2>
                <ul className="mt-6 space-y-4">
                  {destination.attractions.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm font-semibold text-secondary-dark">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-4xl border border-slate-100 bg-white p-8 shadow-xl shadow-slate-950/3">
                <h2 className="text-2xl font-black text-secondary-dark">Travel Information</h2>
                <ul className="mt-6 space-y-4">
                  {destination.travelInfo.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm font-semibold text-secondary-dark">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Why Visit Section */}
      <section className="bg-surface-bg py-24">
        <div className="section-container">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="text-3xl font-black text-secondary-dark md:text-5xl">Why Visit {destination.name}?</h2>
            <p className="mt-5 text-lg font-medium text-muted-slate">Discover what makes this destination a must-visit in Himachal.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {destination.whyVisitItems.map((item, index) => (
              <div key={index} className="rounded-3xl bg-white p-8 shadow-sm transition-all hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-accent/10 text-primary-accent">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-black text-secondary-dark">{item.title}</h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-muted-slate">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Tour Packages Section */}
      <section className="bg-white py-24">
        <div className="section-container">
          <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <h2 className="text-3xl font-black text-secondary-dark md:text-5xl">Popular {destination.name} Packages</h2>
              <p className="mt-5 max-w-2xl text-lg font-medium text-muted-slate">
                Handpicked itineraries covering {destination.name} with premium cab and hotel support.
              </p>
            </div>
            <Link to="/tour-packages" className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-wider text-primary-accent">
              View All Packages
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-8 xl:grid-cols-2">
            {relatedPackages.length > 0 ? (
              relatedPackages.map((pkg) => {
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
              })
            ) : (
              <p className="col-span-full py-12 text-center font-medium text-muted-slate">
                New packages for {destination.name} are being added. Contact us for custom quotes.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Destination Gallery */}
      <section className="bg-surface-bg py-24">
        <div className="section-container">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="text-3xl font-black text-secondary-dark md:text-5xl">{destination.name} Gallery</h2>
            <p className="mt-5 text-lg font-medium text-muted-slate">Experience the beauty of {destination.name} through photos.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {destination.gallery.map((item, index) => (
              <div key={index} className="group relative overflow-hidden rounded-4xl bg-secondary-dark shadow-xl">
                <img src={item.url} alt={item.alt} className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-sm font-bold text-white">{item.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-24">
        <div className="section-container max-w-4xl">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-black text-secondary-dark md:text-5xl">Frequently Asked Questions</h2>
            <p className="mt-5 text-lg font-medium text-muted-slate">Common questions about traveling to {destination.name}.</p>
          </div>
          <div className="space-y-4">
            {destination.faqs.map((faq, index) => (
              <div key={index} className="rounded-3xl border border-slate-100 bg-surface-bg p-8">
                <h3 className="flex items-start gap-4 text-xl font-black text-secondary-dark">
                  <HelpCircle className="mt-1 h-6 w-6 shrink-0 text-primary-accent" />
                  {faq.question}
                </h3>
                <p className="mt-4 pl-10 text-base font-medium leading-relaxed text-muted-slate">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry CTA Section */}
      <section className="bg-secondary-dark py-24 text-white">
        <div className="section-container">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-black md:text-6xl">Plan Your {destination.name} Trip Today</h2>
            <p className="mt-6 text-xl font-medium text-slate-400">
              Get a personalized Himachal travel plan with season-aware routes and premium vehicle support.
            </p>
            <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row">
              <Link
                to={`/booking?destination=${encodeURIComponent(destination.name)}`}
                className="inline-flex h-16 items-center justify-center gap-3 rounded-2xl bg-primary-accent px-10 text-sm font-black uppercase tracking-widest text-white shadow-2xl shadow-primary-accent/30 transition-all hover:scale-105 active:scale-95"
              >
                Send Inquiry
                <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href={`https://wa.me/917018972255?text=${encodeURIComponent(`Hello Guru Kripa Travels! I want a ${destination.name} travel plan.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-16 items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-10 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-white/20"
              >
                WhatsApp Now
              </a>
              <a
                href="tel:+917018972255"
                className="inline-flex h-16 items-center justify-center gap-3 rounded-2xl bg-white px-10 text-sm font-black uppercase tracking-widest text-secondary-dark transition-all hover:scale-105 active:scale-95"
              >
                Call Local Expert
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DestinationDetail;
