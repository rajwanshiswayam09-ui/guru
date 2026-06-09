import { Link } from "react-router-dom";
import { ArrowRight, Bus, Car, MapPinned, Phone } from "lucide-react";
import type { SyntheticEvent } from "react";
import heroImage from "../assets/hero.png";

const enquiryCards = [
  {
    title: "Tour Package Enquiry",
    text: "Complete Himachal packages with hotel, cab, itinerary, sightseeing and seasonal quote.",
    badge: "Hotels + cab + sightseeing",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&q=80&w=1200",
    imageAlt: "Himachal mountain road tour package",
    icon: MapPinned,
    href: "/booking?type=tour-package",
  },
  {
    title: "Cab / Taxi Enquiry",
    text: "Private taxi for Shimla, Manali, Chandigarh, Delhi, airport transfer, local sightseeing or one-way route.",
    badge: "Sedan, SUV, Innova and special cab",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1200",
    imageAlt: "Premium cab service vehicle",
    icon: Car,
    href: "/booking?type=cab",
  },
  {
    title: "Tempo Traveller Enquiry",
    text: "12, 17, 20 and 26 seater Tempo Traveller options for families, groups, school and corporate trips.",
    badge: "Group traveller fleet",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1200",
    imageAlt: "Tempo Traveller group travel vehicle",
    icon: Bus,
    href: "/booking?type=traveller",
  },
];

const directWhatsappUrl = `https://wa.me/917018972255?text=${encodeURIComponent(
  "Hello Guru Kripa Travels! I want a direct travel enquiry quote.",
)}`;

const handleImageFallback = (event: SyntheticEvent<HTMLImageElement>) => {
  event.currentTarget.onerror = null;
  event.currentTarget.src = heroImage;
};

const EnquiryHub = () => {
  return (
    <section id="enquiry" className="bg-white py-20">
      <div className="section-container">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary-accent/10 px-5 py-2 text-xs font-black uppercase tracking-widest text-primary-accent">
              <Phone className="h-4 w-4" />
              Direct travel enquiry
            </div>
            <h2 className="max-w-3xl text-3xl font-black leading-tight text-secondary-dark md:text-5xl">
              Choose the right enquiry for your trip.
            </h2>
            <p className="mt-5 max-w-2xl text-lg font-medium leading-relaxed text-muted-slate">
              Request a package, cab, or Tempo Traveller. Guru Kripa shares the current quote according to season,
              route, hotel category and vehicle availability.
            </p>
          </div>

          <a
            href={directWhatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-6 py-4 text-sm font-black uppercase tracking-wider text-white shadow-xl shadow-green-500/20"
          >
            WhatsApp Directly
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {enquiryCards.map((card) => (
            <Link
              key={card.title}
              to={card.href}
              className="group overflow-hidden rounded-[2rem] border border-slate-100 bg-surface-bg shadow-xl shadow-slate-950/[0.03] transition-all hover:-translate-y-1 hover:border-primary-accent/20 hover:shadow-2xl hover:shadow-slate-950/10"
            >
              <div className="relative h-56 overflow-hidden bg-slate-200">
                <img
                  src={card.image}
                  alt={card.imageAlt}
                  loading="lazy"
                  onError={handleImageFallback}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary-dark/80 via-secondary-dark/10 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
                  <span className="rounded-full bg-white/95 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-secondary-dark">
                    {card.badge}
                  </span>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary-accent text-white shadow-xl">
                    <card.icon className="h-6 w-6" />
                  </span>
                </div>
              </div>
              <div className="p-7">
                <h3 className="text-2xl font-black text-secondary-dark">{card.title}</h3>
                <p className="mt-4 text-sm font-medium leading-relaxed text-muted-slate">{card.text}</p>
                <div className="mt-8 inline-flex items-center gap-2 text-sm font-black uppercase tracking-wider text-primary-accent">
                  Open Enquiry
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EnquiryHub;
