import { useState, type ChangeEvent, type FormEvent, type SyntheticEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Bus,
  Calendar,
  Car,
  Flag,
  Mail,
  MapPin,
  MapPinned,
  MessageSquareText,
  Phone,
  Send,
  ShieldCheck,
  User,
  Users,
} from "lucide-react";
import SEO from "../components/SEO";
import heroImage from "../assets/hero.png";
import { allModularPackages as packages } from "../data/packages/index";

type EnquiryType = "tour-package" | "cab-taxi" | "tempo-traveller";

const packageNames = packages.map((pkg) => pkg.name);
const destinationNames = Array.from(new Set(packages.flatMap((pkg) => pkg.destinations)));

const enquiryTypes: {
  id: EnquiryType;
  title: string;
  subtitle: string;
  icon: typeof Car;
}[] = [
  {
    id: "tour-package",
    title: "Tour Package",
    subtitle: "Hotel, cab, itinerary and complete Himachal plan",
    icon: MapPinned,
  },
  {
    id: "cab-taxi",
    title: "Cab / Taxi",
    subtitle: "Point-to-point, one-way, round trip or local sightseeing",
    icon: Car,
  },
  {
    id: "tempo-traveller",
    title: "Tempo Traveller",
    subtitle: "Group vehicle enquiry for families, schools and corporate trips",
    icon: Bus,
  },
];

const vehicleOptions = {
  "tour-package": ["Suggest best vehicle", "Sedan", "SUV / Ertiga", "Innova Crysta", "Tempo Traveller"],
  "cab-taxi": ["Sedan", "SUV / Ertiga", "Innova Crysta", "Luxury cab", "Need suggestion"],
  "tempo-traveller": ["12 Seater Tempo Traveller", "17 Seater Tempo Traveller", "20 Seater Tempo Traveller", "26 Seater Tempo Traveller"],
};

const vehicleMedia: Record<EnquiryType, { image: string; title: string; text: string; alt: string }> = {
  "tour-package": {
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&q=80&w=1400",
    title: "Complete Himachal travel planning",
    text: "Package enquiries include hotel preference, route planning, sightseeing, cab and seasonal availability.",
    alt: "Himachal tour route through mountain road",
  },
  "cab-taxi": {
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1400",
    title: "Private cab, SUV and special car enquiry",
    text: "Customers can request sedan, Ertiga, Innova Crysta, luxury cab, one-way taxi, round trip or local sightseeing.",
    alt: "Premium car for cab taxi enquiry",
  },
  "tempo-traveller": {
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1400",
    title: "Tempo Traveller group booking",
    text: "Real enquiry flow for 12, 17, 20 and 26 seater group travel with pickup, route, luggage and date details.",
    alt: "Tempo Traveller style group vehicle",
  },
};

const fleetHighlights = [
  {
    title: "Sedan Taxi",
    text: "Delhi, Chandigarh, Shimla, Manali and local routes.",
    image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&w=700",
    alt: "Sedan taxi vehicle",
  },
  {
    title: "Special SUV / Innova",
    text: "Comfort option for families, hills and longer luggage routes.",
    image: "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&q=80&w=700",
    alt: "Special SUV car vehicle",
  },
  {
    title: "Tempo Traveller",
    text: "Group-friendly vehicle option for family and corporate tours.",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=700",
    alt: "Tempo Traveller group vehicle",
  },
];

const handleImageFallback = (event: SyntheticEvent<HTMLImageElement>) => {
  event.currentTarget.onerror = null;
  event.currentTarget.src = heroImage;
};

const normaliseEnquiryType = (value: string | null): EnquiryType => {
  if (value === "cab" || value === "cab-taxi") {
    return "cab-taxi";
  }

  if (value === "traveller" || value === "tempo" || value === "tempo-traveller") {
    return "tempo-traveller";
  }

  return "tour-package";
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9+\-\s()]{7,16}$/;
const cleanText = (value: string, limit = 160) => value.replace(/\s+/g, " ").trim().slice(0, limit);

const Booking = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const destinationParam = searchParams.get("destination") || "";
  const selectedPackage = packages.find((pkg) => pkg.slug === destinationParam || pkg.name === destinationParam);
  const selectedDestination = selectedPackage?.name || destinationParam;
  const initialEnquiryType = normaliseEnquiryType(searchParams.get("type"));

  const [formData, setFormData] = useState({
    enquiryType: initialEnquiryType,
    name: "",
    email: "",
    phone: "",
    countryCode: "+91",
    travellers: "2",
    children: "0",
    pickup: "",
    destination: selectedDestination,
    startDate: "",
    endDate: "",
    tripType: "Round Trip",
    vehicleType: vehicleOptions[initialEnquiryType][0],
    notes: "",
  });

  const activeEnquiry = enquiryTypes.find((item) => item.id === formData.enquiryType) || enquiryTypes[0];
  const activeMedia = vehicleMedia[formData.enquiryType];
  const today = new Date().toISOString().slice(0, 10);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const setEnquiryType = (enquiryType: EnquiryType) => {
    setFormData((prev) => ({
      ...prev,
      enquiryType,
      vehicleType: vehicleOptions[enquiryType][0],
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const cleaned = {
      ...formData,
      name: cleanText(formData.name, 80),
      email: cleanText(formData.email, 120),
      phone: cleanText(formData.phone, 20),
      pickup: cleanText(formData.pickup, 120),
      destination: cleanText(formData.destination, 160),
      notes: cleanText(formData.notes, 300),
    };

    if (!cleaned.name || !emailPattern.test(cleaned.email) || !phonePattern.test(cleaned.phone) || !cleaned.pickup || !cleaned.destination) {
      form.reportValidity();
      return;
    }

    const message = [
      "Hello Guru Kripa Travels! I want a travel enquiry quote.",
      "",
      "Enquiry Details:",
      `Type: ${activeEnquiry.title}`,
      `Name: ${cleaned.name}`,
      `Email: ${cleaned.email}`,
      `Phone: ${cleaned.countryCode} ${cleaned.phone}`,
      `Travellers: ${cleaned.travellers}`,
      `Children: ${cleaned.children}`,
      `Pickup: ${cleaned.pickup}`,
      `Destination / Route: ${cleaned.destination}`,
      `Dates: ${cleaned.startDate} to ${cleaned.endDate}`,
      `Trip Type: ${cleaned.tripType}`,
      `Vehicle Required: ${cleaned.vehicleType}`,
      `Notes: ${cleaned.notes || "No extra notes"}`,
      "",
      "Please share current seasonal cost and availability.",
    ].join("\n");

    const whatsappUrl = `https://wa.me/917018972255?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    navigate("/thank-you");
  };

  return (
    <div className="min-h-screen bg-surface-bg py-20">
      <SEO
        title="Travel, Cab and Tempo Traveller Enquiry | Guru Kripa Travels"
        description="Send a real enquiry to Guru Kripa Travels for Himachal tour packages, cab taxi service, and Tempo Traveller group bookings."
        keywords={["Himachal Tour Packages", "Shimla Manali Taxi Service", "Tempo Traveller Himachal", "Guru Kripa Travels"]}
        path="/booking"
      />

      <div className="section-container">
        <div className="grid items-start gap-12 lg:grid-cols-[0.88fr_1.12fr]">
          <div className="space-y-8">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-xs font-black uppercase tracking-widest text-primary-accent shadow-sm">
                <ShieldCheck className="h-4 w-4" />
                Real enquiry desk
              </div>
              <h1 className="text-4xl font-black leading-tight text-secondary-dark md:text-6xl">
                Tour, Cab and Traveller Enquiry
              </h1>
              <p className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-muted-slate">
                Request a complete package, private cab, taxi, or Tempo Traveller. Guru Kripa will share the current
                seasonal quote directly by call or WhatsApp.
              </p>
            </div>

            <div className="grid gap-5">
              {[
                {
                  icon: MapPin,
                  title: "Registered Office",
                  text: "Village Kawgari, Post Office Shamti, Tehsil and District Solan, Himachal Pradesh - 173212",
                },
                {
                  icon: Phone,
                  title: "Direct Call",
                  text: "+91 70189 72255 / +91 82787 05847 / +91 94188 87156",
                },
                {
                  icon: Mail,
                  title: "Email",
                  text: "gurukripaholiday79@gmail.com / info@gurukripaholiday.com",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-5 rounded-[2rem] border border-slate-100 bg-white p-6 shadow-xl shadow-slate-950/[0.03]">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-accent/10 text-primary-accent">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-secondary-dark">{item.title}</h3>
                    <p className="mt-2 text-sm font-semibold leading-relaxed text-muted-slate">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-2xl shadow-slate-950/5 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <p className="mb-3 text-[10px] font-black uppercase tracking-widest text-muted-slate">Select enquiry type</p>
                <div className="grid gap-3 md:grid-cols-3">
                  {enquiryTypes.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setEnquiryType(item.id)}
                      className={`rounded-2xl border p-4 text-left transition-all ${
                        formData.enquiryType === item.id
                          ? "border-primary-accent bg-primary-accent text-white shadow-xl shadow-primary-accent/20"
                          : "border-slate-200 bg-surface-bg text-secondary-dark hover:border-primary-accent/40"
                      }`}
                    >
                      <item.icon className="mb-3 h-6 w-6" />
                      <span className="block text-sm font-black">{item.title}</span>
                      <span className={`mt-1 block text-xs font-semibold ${formData.enquiryType === item.id ? "text-white/75" : "text-muted-slate"}`}>
                        {item.subtitle}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="overflow-hidden rounded-[2rem] bg-secondary-dark text-white">
                <div className="grid md:grid-cols-[0.95fr_1.05fr]">
                  <div className="relative min-h-60 overflow-hidden bg-slate-200">
                    <img
                      src={activeMedia.image}
                      alt={activeMedia.alt}
                      onError={handleImageFallback}
                      className="h-full min-h-60 w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary-dark/70 via-transparent to-transparent" />
                  </div>
                  <div className="flex flex-col justify-center p-6">
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary-accent">Selected lead category</p>
                    <h2 className="mt-3 text-2xl font-black leading-tight">{activeMedia.title}</h2>
                    <p className="mt-3 text-sm font-medium leading-relaxed text-slate-300">{activeMedia.text}</p>
                    <div className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-white">
                      <Phone className="h-4 w-4 text-green-400" />
                      Fast WhatsApp follow-up
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                {fleetHighlights.map((vehicle) => (
                  <div key={vehicle.title} className="overflow-hidden rounded-2xl border border-slate-100 bg-surface-bg">
                    <img
                      src={vehicle.image}
                      alt={vehicle.alt}
                      loading="lazy"
                      onError={handleImageFallback}
                      className="h-28 w-full object-cover"
                    />
                    <div className="p-4">
                      <p className="text-sm font-black text-secondary-dark">{vehicle.title}</p>
                      <p className="mt-1 text-xs font-semibold leading-relaxed text-muted-slate">{vehicle.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="relative">
                  <User className="absolute top-1/2 left-5 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Customer Name"
                    autoComplete="name"
                    maxLength={80}
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-surface-bg py-4 pr-5 pl-14 font-bold text-secondary-dark placeholder:text-slate-400"
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute top-1/2 left-5 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    autoComplete="email"
                    inputMode="email"
                    maxLength={120}
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-surface-bg py-4 pr-5 pl-14 font-bold text-secondary-dark placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <div className="relative w-32 shrink-0">
                  <Flag className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleInputChange}
                    className="w-full appearance-none rounded-2xl border border-slate-200 bg-surface-bg py-4 pr-4 pl-10 font-bold text-secondary-dark"
                  >
                    <option value="+91">+91 IN</option>
                    <option value="+1">+1 US</option>
                    <option value="+44">+44 UK</option>
                  </select>
                </div>
                <div className="relative flex-1">
                  <Phone className="absolute top-1/2 left-5 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone / WhatsApp Number"
                    autoComplete="tel"
                    inputMode="tel"
                    maxLength={16}
                    pattern="[0-9+\-\s()]{7,16}"
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-surface-bg py-4 pr-5 pl-14 font-bold text-secondary-dark placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <Users className="absolute top-1/2 left-5 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    type="number"
                    name="travellers"
                    min="1"
                    max="80"
                    inputMode="numeric"
                    value={formData.travellers}
                    onChange={handleInputChange}
                    placeholder="Travellers"
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-surface-bg py-4 pr-5 pl-14 font-bold text-secondary-dark placeholder:text-slate-400"
                  />
                </div>
                <div className="relative">
                  <Users className="absolute top-1/2 left-5 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    type="number"
                    name="children"
                    min="0"
                    max="40"
                    inputMode="numeric"
                    value={formData.children}
                    onChange={handleInputChange}
                    placeholder="Children"
                    className="w-full rounded-2xl border border-slate-200 bg-surface-bg py-4 pr-5 pl-14 font-bold text-secondary-dark placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="relative">
                  <MapPin className="absolute top-1/2 left-5 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    name="pickup"
                    value={formData.pickup}
                    onChange={handleInputChange}
                    placeholder="Pickup point"
                    maxLength={120}
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-surface-bg py-4 pr-5 pl-14 font-bold text-secondary-dark placeholder:text-slate-400"
                    list="pickup-points"
                  />
                  <datalist id="pickup-points">
                    {["Delhi", "Chandigarh", "Kalka", "Ludhiana", "Amritsar", "Jalandhar", "Solan", "Shimla"].map((pickup) => (
                      <option key={pickup} value={pickup} />
                    ))}
                  </datalist>
                </div>

                <div className="relative">
                  <MapPinned className="absolute top-1/2 left-5 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    name="destination"
                    value={formData.destination}
                    onChange={handleInputChange}
                    placeholder="Destination / route"
                    maxLength={160}
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-surface-bg py-4 pr-5 pl-14 font-bold text-secondary-dark placeholder:text-slate-400"
                    list="destinations"
                  />
                  <datalist id="destinations">
                    {[...packageNames, ...destinationNames].map((destination) => (
                      <option key={destination} value={destination} />
                    ))}
                  </datalist>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="relative">
                  <Calendar className="absolute top-1/2 left-5 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    min={today}
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-surface-bg py-4 pr-5 pl-14 font-bold text-secondary-dark"
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute top-1/2 left-5 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    min={formData.startDate || today}
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-surface-bg py-4 pr-5 pl-14 font-bold text-secondary-dark"
                  />
                </div>
                <select
                  name="tripType"
                  value={formData.tripType}
                  onChange={handleInputChange}
                  className="w-full rounded-2xl border border-slate-200 bg-surface-bg px-4 py-4 font-bold text-secondary-dark"
                >
                  {["Round Trip", "One Way", "Local Sightseeing", "Airport / Railway Transfer", "Multi City Tour"].map((tripType) => (
                    <option key={tripType} value={tripType}>
                      {tripType}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid gap-4 md:grid-cols-[0.85fr_1.15fr]">
                <select
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleInputChange}
                  className="w-full rounded-2xl border border-slate-200 bg-surface-bg px-4 py-4 font-bold text-secondary-dark"
                >
                  {vehicleOptions[formData.enquiryType].map((vehicle) => (
                    <option key={vehicle} value={vehicle}>
                      {vehicle}
                    </option>
                  ))}
                </select>

                <div className="relative">
                  <MessageSquareText className="absolute top-5 left-5 h-5 w-5 text-slate-400" />
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Extra notes: hotel category, luggage, pickup time, special route..."
                    maxLength={300}
                    rows={3}
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-surface-bg py-4 pr-5 pl-14 font-bold text-secondary-dark placeholder:text-slate-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-3 rounded-2xl bg-primary-accent py-5 text-lg font-black uppercase tracking-wide text-white shadow-xl shadow-primary-accent/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                <Send className="h-5 w-5" />
                Send Directly to Guru Kripa
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
