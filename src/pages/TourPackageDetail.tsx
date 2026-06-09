import { useState, type FormEvent } from "react";
import { Car, CheckCircle2, ChevronRight, HelpCircle, Hotel, Info, MessageCircle, Phone, UtensilsCrossed, XCircle, Sparkles } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import SEO from "../components/SEO";
import { tourPackageCategoryMap } from "../data/tourPackagesCatalog";
import { getPackageBySlug } from "../data/packages/index";

const TourPackageDetail = () => {
  const { categorySlug = "", packageSlug = "" } = useParams();
  const category = tourPackageCategoryMap[categorySlug];
  const pkg = getPackageBySlug(packageSlug);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [travelDate, setTravelDate] = useState("");

  if (!category || !pkg) {
    return <Navigate to="/tour-packages" replace />;
  }

  const detailPath = `/tour-packages/${categorySlug}/${packageSlug}`;
  // Related packages from the same category
  const relatedPackages = category.packages.filter((item) => item.slug !== pkg.slug).slice(0, 3);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://gurukripaholiday.com/" },
      { "@type": "ListItem", position: 2, name: "Tour Packages", item: "https://gurukripaholiday.com/tour-packages" },
      { "@type": "ListItem", position: 3, name: category.name, item: `https://gurukripaholiday.com/tour-packages/${categorySlug}` },
      { "@type": "ListItem", position: 4, name: pkg.name, item: `https://gurukripaholiday.com${detailPath}` },
    ],
  };

  const handleQuickInquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = `Hello Guru Kripa Travels! I want details for ${pkg.name}. Name: ${name || "N/A"}, Phone: ${phone || "N/A"}, Travel date: ${travelDate || "Flexible"}.`;
    window.open(`https://wa.me/917018972255?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <SEO
        title={pkg.seo?.title || `${pkg.name} | Guru Kripa Travels`}
        description={pkg.seo?.description || `${pkg.name} with duration, highlights, inclusions, exclusions, hotel/cab info, and quick inquiry support.`}
        path={detailPath}
        image={pkg.heroImage}
        schema={breadcrumbSchema}
      />

      <section className="relative min-h-[70svh] overflow-hidden bg-secondary-dark">
        <img src={pkg.heroImage} alt={pkg.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-r from-slate-950/72 via-slate-950/44 to-slate-950/14" />
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
            <Link to={`/tour-packages/${category.slug}`} className="hover:text-white">
              {category.name}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white">{pkg.name}</span>
          </nav>
          <h1 className="max-w-4xl text-4xl font-black leading-tight md:text-6xl">{pkg.name}</h1>
          <p className="mt-4 inline-flex rounded-full bg-primary-accent px-4 py-2 text-xs font-black uppercase tracking-widest text-white">{pkg.duration}</p>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="section-container grid gap-8 lg:grid-cols-[1fr_400px]">
          <div className="space-y-12">
            <article className="rounded-4xl border border-slate-100 bg-surface-bg p-8 shadow-xl shadow-slate-950/3">
              <h2 className="text-3xl font-black text-secondary-dark">Package Overview</h2>
              <p className="mt-5 text-base font-medium leading-relaxed text-muted-slate">{pkg.overview}</p>
              
              <h3 className="mt-8 text-xl font-black text-secondary-dark">Destinations Covered</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {pkg.destinations.map((item) => (
                  <span key={item} className="rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-widest text-secondary-dark shadow-sm">
                    {item}
                  </span>
                ))}
              </div>

              <h3 className="mt-8 text-xl font-black text-secondary-dark">Tour Highlights</h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {pkg.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm font-semibold text-secondary-dark">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-4xl border border-slate-100 bg-white p-8 shadow-xl shadow-slate-950/3">
              <h2 className="text-3xl font-black text-secondary-dark">Day Wise Itinerary</h2>
              <div className="mt-8 space-y-6">
                {pkg.itinerary.map((day) => (
                  <div key={day.day} className="relative pl-12">
                    <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary-accent text-xs font-black text-white shadow-lg shadow-primary-accent/30">
                      {day.day}
                    </div>
                    <h4 className="text-lg font-black text-secondary-dark">{day.title}</h4>
                    <p className="mt-2 text-sm font-medium leading-relaxed text-muted-slate">
                      {day.description || "Detailed day-wise description will be added soon. Contact our travel experts for the full plan."}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            <div className="grid gap-8 md:grid-cols-2">
              <article className="rounded-4xl border border-slate-100 bg-white p-8 shadow-xl shadow-slate-950/3">
                <h2 className="flex items-center gap-3 text-2xl font-black text-secondary-dark">
                  <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                  Inclusions
                </h2>
                <ul className="mt-6 space-y-3">
                  {pkg.inclusions.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm font-semibold text-secondary-dark">
                      <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>

              <article className="rounded-4xl border border-slate-100 bg-white p-8 shadow-xl shadow-slate-950/3">
                <h2 className="flex items-center gap-3 text-2xl font-black text-secondary-dark">
                  <XCircle className="h-6 w-6 text-rose-600" />
                  Exclusions
                </h2>
                <ul className="mt-6 space-y-3">
                  {pkg.exclusions.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm font-semibold text-slate-500">
                      <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </div>

              {pkg.faqs && pkg.faqs.length > 0 && (
                <article className="rounded-4xl border border-slate-100 bg-surface-bg p-8 shadow-xl shadow-slate-950/3">
                  <h2 className="flex items-center gap-3 text-3xl font-black text-secondary-dark">
                    <HelpCircle className="h-7 w-7 text-primary-accent" />
                    Common Questions
                  </h2>
                  <div className="mt-8 space-y-4">
                    {pkg.faqs.map((faq, index) => (
                      <div key={index} className="rounded-2xl bg-white p-6 shadow-sm">
                        <h4 className="text-lg font-black text-secondary-dark">{faq.question}</h4>
                        <p className="mt-3 text-sm font-medium leading-relaxed text-muted-slate">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </article>
              )}

              {pkg.travelTips && pkg.travelTips.length > 0 && (
                <article className="rounded-4xl border border-slate-100 bg-emerald-50/50 p-8 shadow-xl shadow-slate-950/3">
                  <h2 className="flex items-center gap-3 text-2xl font-black text-secondary-dark">
                    <Sparkles className="h-6 w-6 text-emerald-600" />
                    Travel Tips for {pkg.name}
                  </h2>
                  <ul className="mt-6 space-y-3">
                    {pkg.travelTips.map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm font-semibold text-secondary-dark">
                        <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              )}
            </div>

          <aside className="space-y-6">
            <div className="sticky top-28 space-y-6">
              <article className="rounded-4xl bg-secondary-dark p-8 text-white shadow-2xl shadow-slate-950/10">
                <h3 className="text-2xl font-black">Quick Inquiry</h3>
                <p className="mt-3 text-sm font-medium text-slate-400">Get a personalized seasonal quote for this package.</p>
                <form onSubmit={handleQuickInquiry} className="mt-6 space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-2xl bg-white/10 px-5 py-4 text-sm font-bold text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-accent"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-2xl bg-white/10 px-5 py-4 text-sm font-bold text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-accent"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Tentative Date (e.g. June 2026)"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full rounded-2xl bg-white/10 px-5 py-4 text-sm font-bold text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-accent"
                  />
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary-accent px-6 py-4 text-sm font-black uppercase tracking-wider text-white shadow-xl shadow-primary-accent/20 transition-all hover:scale-[1.02]"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp Details
                  </button>
                </form>
                <a
                  href="tel:+917018972255"
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-white/20 px-6 py-4 text-sm font-black uppercase tracking-wider text-white transition-all hover:bg-white/5"
                >
                  <Phone className="h-4 w-4" />
                  Call +91 70189 72255
                </a>
              </article>

              <article className="rounded-4xl border border-slate-100 bg-white p-8 shadow-xl shadow-slate-950/3">
                <div className="flex items-center gap-3">
                  <Info className="h-6 w-6 text-primary-accent" />
                  <h3 className="text-xl font-black text-secondary-dark">Trip Essentials</h3>
                </div>
                <div className="mt-6 space-y-4">
                  <div className="flex gap-4">
                    <Car className="h-5 w-5 shrink-0 text-primary-accent" />
                    <div>
                      <p className="text-sm font-black text-secondary-dark">Private Cab</p>
                      <p className="text-xs font-medium text-muted-slate">Sedan, SUV or Traveller options</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Hotel className="h-5 w-5 shrink-0 text-primary-accent" />
                    <div>
                      <p className="text-sm font-black text-secondary-dark">Hotel Planning</p>
                      <p className="text-xs font-medium text-muted-slate">3/4 Star premium verified stays</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <UtensilsCrossed className="h-5 w-5 shrink-0 text-primary-accent" />
                    <div>
                      <p className="text-sm font-black text-secondary-dark">MAP Meal Plan</p>
                      <p className="text-xs font-medium text-muted-slate">Breakfast and Dinner included</p>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </aside>
        </div>
      </section>

      {relatedPackages.length > 0 && (
        <section className="bg-surface-bg py-20">
          <div className="section-container">
            <h2 className="text-3xl font-black text-secondary-dark">Other {category.name}</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {relatedPackages.map((item) => (
                <Link
                  key={item.slug}
                  to={`/tour-packages/${categorySlug}/${item.slug}`}
                  className="group overflow-hidden rounded-3xl bg-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                    <span className="absolute bottom-4 left-4 text-xs font-black uppercase tracking-widest text-white">{item.duration}</span>
                  </div>
                  <div className="p-5">
                    <h4 className="font-black text-secondary-dark group-hover:text-primary-accent">{item.name}</h4>
                    <p className="mt-2 text-xs font-bold text-primary-accent">View Details &rarr;</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default TourPackageDetail;
