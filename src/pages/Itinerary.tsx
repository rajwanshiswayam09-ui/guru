import { useMemo, useState, type SyntheticEvent } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  Camera,
  Car,
  CheckCircle2,
  ChevronDown,
  Clock,
  Coffee,
  HelpCircle,
  Hotel,
  MapPin,
  MessageCircle,
  Phone,
  Route,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import SEO from "../components/SEO";
import TravelMap, { type TravelMapPoint } from "../components/TravelMap";
import fallbackImage from "../assets/hero.png";
import { packages } from "../data/legacyPackages";

const Itinerary = () => {
  const { id } = useParams();
  const pkg = packages.find((item) => item.id === id);
  const [openDay, setOpenDay] = useState(0);

  const mapPoints = useMemo<TravelMapPoint[]>(
    () =>
      pkg
        ? pkg.routeStops.map((stop, index) => ({
            id: `${pkg.id}-${stop.name}`,
            label: stop.name,
            state: stop.state,
            coords: stop.coords,
            description: stop.description,
            type: index === 0 ? "origin" : index === pkg.routeStops.length - 1 ? "destination" : "stop",
          }))
        : [],
    [pkg],
  );

  if (!pkg) {
    return (
      <div className="min-h-[60vh] bg-surface-bg py-24 text-center">
        <SEO
          title="Package Not Found | Guru Kripa Travels"
          description="The requested Guru Kripa Travels package could not be found."
          path="/itinerary"
        />
        <h1 className="text-3xl font-black text-secondary-dark">Package not found</h1>
        <Link to="/#packages" className="mt-6 inline-flex font-black text-primary-accent">
          View packages
        </Link>
      </div>
    );
  }

  const packageSchema = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: pkg.title,
    description: pkg.subtitle,
    image: [pkg.image, ...pkg.gallery],
    itinerary: pkg.itinerary.map((day) => ({
      "@type": "ItemList",
      name: `Day ${day.day}: ${day.title}`,
      description: day.description,
    })),
    provider: {
      "@type": "TravelAgency",
      name: "Guru Kripa Travels",
      telephone: "+917018972255",
    },
  };
  const handleImageError = (event: SyntheticEvent<HTMLImageElement>) => {
    if (event.currentTarget.dataset.fallbackApplied === "true") {
      return;
    }

    event.currentTarget.dataset.fallbackApplied = "true";
    event.currentTarget.src = fallbackImage;
  };

  return (
    <div className="min-h-screen bg-surface-bg">
      <SEO
        title={pkg.seo.title}
        description={pkg.seo.description}
        keywords={pkg.seo.keywords}
        path={`/itinerary/${pkg.id}`}
        image={pkg.image}
        schema={packageSchema}
      />

      <section className="relative min-h-[78vh] overflow-hidden bg-secondary-dark">
        <img
          src={pkg.image}
          alt={pkg.title}
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
          onError={handleImageError}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,23,42,0.94),rgba(15,23,42,0.64),rgba(15,23,42,0.2))]" />
        <div className="section-container relative z-10 flex min-h-[78vh] items-end py-16">
          <div className="grid w-full gap-10 lg:grid-cols-[1fr_360px] lg:items-end">
            <div>
              <div className="mb-6 flex flex-wrap gap-3">
                <span className="rounded-full bg-primary-accent px-5 py-2 text-xs font-black uppercase tracking-widest text-white">
                  {pkg.duration}
                </span>
                <span className="rounded-full border border-white/20 bg-white/15 px-5 py-2 text-xs font-black uppercase tracking-widest text-white backdrop-blur-xl">
                  Private cab route
                </span>
              </div>
              <h1 className="max-w-5xl text-4xl font-black leading-tight text-white md:text-7xl">{pkg.title}</h1>
              <p className="mt-6 max-w-3xl text-lg font-medium leading-relaxed text-white/82">{pkg.subtitle}</p>
              <div className="mt-8 flex items-start gap-3 text-white/90">
                <MapPin className="mt-1 h-6 w-6 shrink-0 text-primary-accent" />
                <p className="text-lg font-semibold italic">{pkg.route.join(" -> ")}</p>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/15 bg-white/12 p-6 text-white shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
              <p className="text-xs font-black uppercase tracking-widest text-white/65">Seasonal cost</p>
              <div className="mt-2 text-3xl font-black leading-tight">Call or WhatsApp Guru Kripa</div>
              <p className="mt-3 text-sm font-medium leading-relaxed text-white/75">
                Package cost changes by season, hotel category, vehicle, group size, and live availability.
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white/10 p-4">
                  <Car className="mb-2 h-5 w-5 text-primary-accent" />
                  <p className="text-xs font-bold text-white/70">Distance</p>
                  <p className="font-black">{pkg.totalDistanceKm.toLocaleString("en-IN")} km</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-4">
                  <Clock className="mb-2 h-5 w-5 text-primary-accent" />
                  <p className="text-xs font-bold text-white/70">Drive Time</p>
                  <p className="font-black">{pkg.estimatedDriveTime}</p>
                </div>
              </div>
              <Link
                to={`/booking?destination=${encodeURIComponent(pkg.title)}`}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary-accent px-6 py-4 text-sm font-black uppercase tracking-wider text-white shadow-xl shadow-primary-accent/30"
              >
                WhatsApp Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="tel:+917018972255"
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-white/25 px-6 py-4 text-sm font-black uppercase tracking-wider text-white"
              >
                <Phone className="h-4 w-4" />
                Call for Cost
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="section-container grid gap-4 md:grid-cols-4">
          {[
            { icon: CalendarDays, label: "Duration", value: pkg.duration },
            { icon: Route, label: "Route", value: `${pkg.routeStops.length} major stops` },
            { icon: Car, label: "Cab", value: pkg.cabAllocation[0]?.label || "Private cab" },
            { icon: ShieldCheck, label: "Support", value: "Solan trip desk" },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl border border-slate-100 bg-surface-bg p-5">
              <item.icon className="mb-4 h-6 w-6 text-primary-accent" />
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-slate">{item.label}</p>
              <p className="mt-1 text-base font-black text-secondary-dark">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20">
        <div className="section-container">
          <TravelMap
            title={`${pkg.route[0]} to ${pkg.route[pkg.route.length - 1]}`}
            subtitle={`${pkg.title} with road route drawing, destination markers, stop timeline, and animated cab progress.`}
            points={mapPoints}
          />
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="section-container">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-accent/10 px-5 py-2 text-xs font-black uppercase tracking-widest text-primary-accent">
                <Camera className="h-4 w-4" />
                Destination gallery
              </div>
              <h2 className="text-3xl font-black text-secondary-dark md:text-5xl">Route Highlights</h2>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {pkg.gallery.map((image, index) => (
              <div key={image} className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
                <img
                  src={image}
                  alt={`${pkg.title} highlight ${index + 1}`}
                  loading="lazy"
                  decoding="async"
                  onError={handleImageError}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 to-transparent" />
                <p className="absolute bottom-5 left-5 right-5 text-lg font-black text-white">
                  {pkg.routeStops[index + 1]?.name || pkg.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="section-container grid gap-12 lg:grid-cols-[1fr_360px]">
          <div>
            <div className="mb-12">
              <div className="mb-4 h-1.5 w-14 rounded-full bg-primary-accent" />
              <h2 className="text-3xl font-black text-secondary-dark md:text-5xl">Day-wise Itinerary</h2>
            </div>

            <div className="space-y-5">
              {pkg.itinerary.map((day, index) => (
                <article key={day.day} className="relative pl-12">
                  {index !== pkg.itinerary.length - 1 && <div className="absolute top-10 bottom-0 left-[19px] w-px bg-slate-200" />}
                  <div
                    className={`absolute top-0 left-0 z-10 flex h-10 w-10 items-center justify-center rounded-full text-sm font-black transition-all ${
                      openDay === index
                        ? "bg-primary-accent text-white shadow-lg shadow-primary-accent/30"
                        : "border border-slate-200 bg-white text-muted-slate"
                    }`}
                  >
                    {day.day}
                  </div>

                  <div className="overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-xl shadow-slate-950/[0.03]">
                    <button
                      type="button"
                      onClick={() => setOpenDay(openDay === index ? -1 : index)}
                      className="flex w-full items-center justify-between gap-6 p-6 text-left"
                    >
                      <div>
                        <p className="mb-2 text-xs font-black uppercase tracking-widest text-primary-accent">Day {day.day}</p>
                        <h3 className="text-xl font-black text-secondary-dark">{day.title}</h3>
                        {(day.from || day.to) && (
                          <p className="mt-2 text-sm font-semibold text-muted-slate">
                            {[day.from, day.to].filter(Boolean).join(" -> ")}
                          </p>
                        )}
                      </div>
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-bg transition-transform ${
                          openDay === index ? "rotate-180 text-primary-accent" : "text-muted-slate"
                        }`}
                      >
                        <ChevronDown className="h-5 w-5" />
                      </span>
                    </button>

                    {openDay === index && (
                      <div className="border-t border-slate-100 p-6 pt-0">
                        <p className="pt-6 text-base font-medium leading-relaxed text-muted-slate">{day.description}</p>

                        <div className="mt-6 grid gap-4 md:grid-cols-2">
                          <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-surface-bg p-4">
                            <Hotel className="h-6 w-6 text-primary-accent" />
                            <div>
                              <p className="text-[10px] font-black uppercase tracking-widest text-muted-slate">Stay</p>
                              <p className="text-sm font-black text-secondary-dark">{day.stay}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-surface-bg p-4">
                            <Coffee className="h-6 w-6 text-primary-accent" />
                            <div>
                              <p className="text-[10px] font-black uppercase tracking-widest text-muted-slate">Meals</p>
                              <p className="text-sm font-black text-secondary-dark">{day.meals}</p>
                            </div>
                          </div>
                        </div>

                        {(day.distanceKm || day.driveTime) && (
                          <div className="mt-6 grid gap-4 sm:grid-cols-2">
                            {day.distanceKm && (
                              <div className="rounded-2xl bg-secondary-dark p-4 text-white">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Distance</p>
                                <p className="mt-1 text-xl font-black">{day.distanceKm} km</p>
                              </div>
                            )}
                            {day.driveTime && (
                              <div className="rounded-2xl bg-secondary-dark p-4 text-white">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Travel Time</p>
                                <p className="mt-1 text-xl font-black">{day.driveTime}</p>
                              </div>
                            )}
                          </div>
                        )}

                        <div className="mt-6">
                          <p className="mb-3 text-xs font-black uppercase tracking-widest text-muted-slate">Attractions</p>
                          <div className="grid gap-2 sm:grid-cols-2">
                            {day.attractions.map((attraction) => (
                              <div key={attraction} className="flex items-center gap-2 text-sm font-bold text-secondary-dark">
                                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                                {attraction}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[2rem] bg-secondary-dark p-7 text-white shadow-2xl shadow-slate-950/10">
              <div className="mb-6 flex items-center gap-3">
                <Car className="h-6 w-6 text-primary-accent" />
                <div>
                  <h4 className="font-black">Fleet Allocation</h4>
                  <p className="text-xs font-semibold text-slate-400">Vehicle options for this route</p>
                </div>
              </div>
              <div className="space-y-4">
                {pkg.cabAllocation.map((cab) => (
                  <div key={cab.label} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary-accent" />
                    <div>
                      <p className="text-sm font-black">{cab.label}</p>
                      <p className="text-xs font-medium leading-relaxed text-slate-400">{cab.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-100 bg-white p-7 shadow-xl shadow-slate-950/[0.03]">
              <h4 className="mb-5 text-xl font-black text-secondary-dark">What's Included</h4>
              <div className="space-y-3">
                {pkg.inclusions.map((inclusion) => (
                  <div key={inclusion} className="flex items-center gap-3 text-sm font-bold text-secondary-dark">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    {inclusion}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-100 bg-white p-7 shadow-xl shadow-slate-950/[0.03]">
              <h4 className="mb-5 text-xl font-black text-secondary-dark">What's Excluded</h4>
              <div className="space-y-3">
                {(pkg.exclusions || [
                  "Airfare / Train fare",
                  "Lunch and extra meals",
                  "Entry tickets to monuments",
                  "Personal expenses",
                  "Anything not mentioned in inclusions",
                ]).map((exclusion) => (
                  <div key={exclusion} className="flex items-center gap-3 text-sm font-bold text-slate-500">
                    <XCircle className="h-4 w-4 text-rose-500" />
                    {exclusion}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] bg-primary-accent p-7 text-white shadow-2xl shadow-primary-accent/25">
              <h4 className="text-2xl font-black">Need Current Cost?</h4>
              <p className="mt-3 text-sm font-medium leading-relaxed text-white/82">
                Talk to our Solan desk for today's seasonal quote, hotel upgrades, pickup changes, route extensions, or
                private group pricing.
              </p>
              <div className="mt-6 grid gap-3">
                <Link
                  to={`/booking?destination=${encodeURIComponent(pkg.title)}`}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-4 text-sm font-black uppercase tracking-wider text-primary-accent"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp Quote
                </Link>
                <a
                  href="tel:+917018972255"
                  className="flex items-center justify-center gap-2 rounded-2xl border border-white/25 px-5 py-4 text-sm font-black uppercase tracking-wider text-white"
                >
                  <Phone className="h-4 w-4" />
                  Call Expert
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-surface-bg py-24">
        <div className="section-container">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <div className="mb-8">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-accent/10 px-5 py-2 text-xs font-black uppercase tracking-widest text-primary-accent">
                  <Hotel className="h-4 w-4" />
                  Stay & Vehicle
                </div>
                <h2 className="text-3xl font-black text-secondary-dark md:text-5xl">Hotel & Vehicle Details</h2>
              </div>
              <div className="rounded-[2rem] border border-slate-100 bg-white p-8 shadow-xl shadow-slate-950/[0.03]">
                <p className="text-lg font-medium leading-relaxed text-muted-slate">
                  {pkg.hotelInfo ||
                    "We provide handpicked 3-star and 4-star premium hotels based on your preference. Each stay is verified for comfort, hygiene, and mountain views. For vehicles, we allocate dedicated private cabs (Sedan/SUV) with experienced mountain drivers."}
                </p>
                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  <div className="rounded-2xl bg-surface-bg p-6">
                    <Hotel className="mb-4 h-8 w-8 text-primary-accent" />
                    <h4 className="font-black text-secondary-dark">Premium Stays</h4>
                    <p className="mt-2 text-sm font-medium text-muted-slate">Verified luxury & deluxe options</p>
                  </div>
                  <div className="rounded-2xl bg-surface-bg p-6">
                    <Car className="mb-4 h-8 w-8 text-primary-accent" />
                    <h4 className="font-black text-secondary-dark">Private Fleet</h4>
                    <p className="mt-2 text-sm font-medium text-muted-slate">Dedicated cab for your entire trip</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="mb-8">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-accent/10 px-5 py-2 text-xs font-black uppercase tracking-widest text-primary-accent">
                  <HelpCircle className="h-4 w-4" />
                  Common Questions
                </div>
                <h2 className="text-3xl font-black text-secondary-dark md:text-5xl">Package FAQs</h2>
              </div>
              <div className="space-y-4">
                {(pkg.faqs || [
                  {
                    question: "Is this package customizable?",
                    answer: "Yes, all our packages are 100% customizable. You can add nights, change hotel categories, or adjust the route.",
                  },
                  {
                    question: "What is the best time to book?",
                    answer: "For Himachal, it's best to book at least 15-30 days in advance, especially during peak summer and snow seasons.",
                  },
                  {
                    question: "Are there any hidden costs?",
                    answer: "No, we maintain complete transparency. All inclusions like toll, parking, and driver allowance are covered in our quote.",
                  },
                ]).map((faq, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:shadow-md"
                  >
                    <h4 className="text-lg font-black text-secondary-dark">{faq.question}</h4>
                    <p className="mt-3 text-sm font-medium leading-relaxed text-muted-slate">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="section-container">
          <div className="rounded-[3rem] bg-secondary-dark p-12 text-center text-white shadow-2xl shadow-slate-950/20">
            <h2 className="text-3xl font-black md:text-5xl">Ready to start your journey?</h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg font-medium text-slate-400">
              Get a personalized seasonal quote for the {pkg.title} today. Our experts in Solan are ready to help.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                to={`/booking?destination=${encodeURIComponent(pkg.title)}`}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary-accent px-8 py-5 text-sm font-black uppercase tracking-wider text-white shadow-xl shadow-primary-accent/20 transition-all hover:scale-105"
              >
                Plan My Trip Now
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="tel:+917018972255"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-8 py-5 text-sm font-black uppercase tracking-wider text-white backdrop-blur-sm transition-all hover:bg-white/20"
              >
                <Phone className="h-4 w-4" />
                Call +91 70189 72255
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Itinerary;
