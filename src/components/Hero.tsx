import { useEffect, useMemo, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Car, ChevronLeft, ChevronRight, Clock, MapPin, Phone, Search, ShieldCheck, Sparkles } from "lucide-react";
import { allModularPackages as packages } from "../data/packages/index";
import { placeImages } from "../data/placeImages";
import { generateCategorySlug } from "../utils/slugs";

interface HeroProps {
  onSearch: (query: string) => void;
}

type SearchResult =
  | {
      id: string;
      type: "package";
      title: string;
      subtitle: string;
      href: string;
      meta: string;
    }
  | {
      id: string;
      type: "destination";
      title: string;
      subtitle: string;
      query: string;
      meta: string;
    };

const normalize = (value: string) => value.trim().toLowerCase();

const destinationResults = Array.from(new Set(packages.flatMap((pkg) => pkg.destinations))).map((destination) => {
  const matchingPackages = packages.filter((pkg) => pkg.destinations.includes(destination));

  return {
    id: `destination-${destination}`,
    type: "destination" as const,
    title: destination,
    subtitle: `${matchingPackages.length} matching package${matchingPackages.length > 1 ? "s" : ""}`,
    query: destination,
    meta: "Destination",
  };
});

const packageResults = packages.map((pkg) => ({
  id: `package-${pkg.slug}`,
  type: "package" as const,
  title: pkg.name,
  subtitle: pkg.destinations.join(" -> "),
  href: `/tour-packages/${generateCategorySlug(pkg.category)}/${pkg.slug}`,
  meta: `${pkg.duration} / seasonal quote by call or WhatsApp`,
}));

const allResults: SearchResult[] = [...packageResults, ...destinationResults];

const heroSlides = [
  {
    title: "Shimla: The Timeless Queen of Hills",
    subtitle: "Heritage walks, Kufri snow points, pine views, and family-friendly Himachal planning.",
    image: placeImages.shimlaRidgeHero,
    searchQuery: "Shimla",
    cta: "Explore Shimla",
  },
  {
    title: "Manali: Snow Valleys and Adventure Routes",
    subtitle: "Solang Valley, Rohtang support, river drives, premium SUVs, and relaxed mountain stays.",
    image: placeImages.manaliSolangHero,
    searchQuery: "Manali",
    cta: "View Manali Trips",
  },
  {
    title: "Dalhousie: Forest Roads and Khajjiar Meadows",
    subtitle: "Colonial hill charm, cedar trails, meadow panoramas, and relaxed highland evenings.",
    image: placeImages.dalhousieKhajjiar,
    searchQuery: "Dalhousie",
    cta: "Explore Dalhousie",
  },
  {
    title: "Dharamshala: Mountain Calm and Culture",
    subtitle: "Monastery trails, Dhauladhar views, peaceful stays, and private family travel support.",
    image: placeImages.dharamshalaDhauladhar,
    searchQuery: "Dharamshala",
    cta: "Explore Dharamshala",
  },
  {
    title: "Kinnaur Valley: Epic Roads and Valley Villages",
    subtitle: "Kalpa ridges, Sangla valleys, orchard belts, and unforgettable Himalayan road views.",
    image: placeImages.kinnaurKalpa,
    searchQuery: "Kinnaur",
    cta: "View Kinnaur Routes",
  },
  {
    title: "Lahaul and Spiti: The Ultimate Mountain Odyssey",
    subtitle: "High-altitude deserts, monasteries, lakes, and cinematic roads through raw Himalaya.",
    image: placeImages.spitiKeyMonastery,
    searchQuery: "Spiti",
    cta: "Plan Spiti Journey",
  },
];

const Hero = ({ onSearch }: HeroProps) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<"next" | "previous">("next");
  const blurTimeout = useRef<number | null>(null);
  const activeHeroSlide = heroSlides[activeHeroIndex];

  useEffect(() => {
    if (isOpen) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setSlideDirection("next");
      setActiveHeroIndex((index) => (index + 1) % heroSlides.length);
    }, 7500);

    return () => window.clearInterval(timer);
  }, [isOpen]);

  const goToHeroSlide = (direction: "previous" | "next") => {
    setSlideDirection(direction);
    setActiveHeroIndex((index) => {
      if (direction === "previous") {
        return (index - 1 + heroSlides.length) % heroSlides.length;
      }

      return (index + 1) % heroSlides.length;
    });
  };

  const filteredResults = useMemo(() => {
    const searchValue = normalize(query);

    if (!searchValue) {
      return allResults.slice(0, 6);
    }

    return allResults
      .filter((result) => {
        const haystack = normalize(`${result.title} ${result.subtitle} ${result.meta}`);
        return haystack.includes(searchValue);
      })
      .sort((first, second) => {
        const firstTitle = normalize(first.title);
        const secondTitle = normalize(second.title);
        const firstExact = firstTitle === searchValue ? 1 : 0;
        const secondExact = secondTitle === searchValue ? 1 : 0;
        const firstStarts = firstTitle.startsWith(searchValue) ? 1 : 0;
        const secondStarts = secondTitle.startsWith(searchValue) ? 1 : 0;

        if (firstExact !== secondExact) {
          return secondExact - firstExact;
        }

        if (firstStarts !== secondStarts) {
          return secondStarts - firstStarts;
        }

        return first.title.localeCompare(second.title);
      })
      .slice(0, 8);
  }, [query]);

  const selectResult = (result: SearchResult) => {
    setQuery(result.title);
    setIsOpen(false);

    if (result.type === "package") {
      navigate(result.href);
      return;
    }

    onSearch(result.query);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const searchValue = normalize(query);

    if (!searchValue) {
      setIsOpen(true);
      return;
    }

    const exactMatch = allResults.find((result) => normalize(result.title) === searchValue);
    if (exactMatch) {
      selectResult(exactMatch);
      return;
    }

    if (filteredResults.length === 1) {
      selectResult(filteredResults[0]);
      return;
    }

    onSearch(query);
    setIsOpen(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen && (event.key === "ArrowDown" || event.key === "ArrowUp")) {
      setIsOpen(true);
      return;
    }

    if (!filteredResults.length) {
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % filteredResults.length);
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => (index - 1 + filteredResults.length) % filteredResults.length);
    }

    if (event.key === "Enter" && isOpen) {
      event.preventDefault();
      selectResult(filteredResults[activeIndex]);
    }

    if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  const handleFocus = () => {
    if (blurTimeout.current) {
      window.clearTimeout(blurTimeout.current);
    }
    setIsOpen(true);
    setIsFocused(true);
  };

  const handleBlur = () => {
    blurTimeout.current = window.setTimeout(() => {
      setIsOpen(false);
      setIsFocused(false);
    }, 160);
  };

  return (
    <section className="relative flex min-h-svh items-center overflow-hidden bg-secondary-dark">
      {heroSlides.map((slide, index) => (
        <img
          key={slide.title}
          src={slide.image}
          alt={slide.title}
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-1600 ease-out ${
            index === activeHeroIndex
              ? "hero-slide-image-active opacity-100"
              : slideDirection === "next"
                ? "translate-x-24 scale-110 opacity-0"
                : "-translate-x-24 scale-110 opacity-0"
          }`}
          fetchPriority={index === 0 ? "high" : undefined}
          loading={index === 0 ? "eager" : "lazy"}
          decoding="async"
        />
      ))}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,23,42,0.66),rgba(15,23,42,0.44),rgba(15,23,42,0.14))]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-secondary-dark/62 to-transparent" />

      <button
        type="button"
        aria-label="Previous featured destination"
        onClick={() => goToHeroSlide("previous")}
        className="absolute left-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-xl transition-all hover:bg-white/20 lg:flex"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        type="button"
        aria-label="Next featured destination"
        onClick={() => goToHeroSlide("next")}
        className="absolute right-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-xl transition-all hover:bg-white/20 lg:flex"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="section-container relative z-10 py-20">
        <div className="max-w-4xl">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-2 text-xs font-black uppercase tracking-widest text-white backdrop-blur-xl">
            <ShieldCheck className="h-4 w-4 text-emerald-300" />
            Government affiliated Himachal destination experts
          </div>

          <h1 className="max-w-4xl text-5xl font-black leading-[0.98] text-white md:text-7xl xl:text-8xl">
            Guru Kripa Travels
          </h1>

          <div key={activeHeroSlide.title} className="hero-copy-slide">
            <p className="mt-5 max-w-3xl text-2xl font-black leading-tight text-white md:text-4xl">
              {activeHeroSlide.title}
            </p>
            <p className="mt-7 max-w-2xl text-lg font-medium leading-relaxed text-white/82 md:text-xl">
              {activeHeroSlide.subtitle}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => onSearch(activeHeroSlide.searchQuery)}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary-accent px-7 py-4 text-sm font-black uppercase tracking-wider text-white shadow-xl shadow-primary-accent/30 transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                {activeHeroSlide.cta}
                <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href="tel:+917018972255"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-7 py-4 text-sm font-black uppercase tracking-wider text-white backdrop-blur-xl transition-all hover:bg-white/15"
              >
                <Phone className="h-4 w-4" />
                Call Expert
              </a>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className={`relative z-40 mt-10 max-w-3xl transition-all duration-300 ${
              isFocused ? "scale-[1.01]" : ""
            }`}
          >
            <div
              className={`flex flex-col gap-2 rounded-[1.5rem] bg-white/10 p-2 backdrop-blur-2xl transition-all duration-300 sm:flex-row sm:items-center sm:gap-3 ${
                isFocused
                  ? "bg-white/20 shadow-[0_0_0_4px_rgba(244,63,94,0.15),0_20px_50px_-12px_rgba(0,0,0,0.5)]"
                  : "border border-white/15 shadow-2xl shadow-slate-950/30"
              }`}
            >
              <div className="flex flex-1 items-center gap-3 rounded-[1.125rem] bg-white px-5 py-3.5 md:py-4">
                <Search className={`h-5 w-5 shrink-0 transition-colors duration-300 ${isFocused ? "text-primary-accent" : "text-slate-400"}`} />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setActiveIndex(0);
                    setIsOpen(true);
                  }}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onKeyDown={handleKeyDown}
                  placeholder="Where do you want to go?"
                  role="combobox"
                  aria-expanded={isOpen}
                  aria-controls="hero-search-results"
                  aria-activedescendant={isOpen && filteredResults[activeIndex] ? filteredResults[activeIndex].id : undefined}
                  className="w-full bg-transparent text-base font-bold text-secondary-dark placeholder:text-slate-400 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="group inline-flex h-14 items-center justify-center gap-3 rounded-[1.125rem] bg-primary-accent px-8 text-sm font-black uppercase tracking-widest text-white shadow-xl shadow-primary-accent/20 transition-all hover:bg-opacity-95 hover:shadow-primary-accent/40 active:scale-95 sm:h-auto sm:py-4.5"
              >
                Search
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>

            {isOpen && (
              <div
                id="hero-search-results"
                className="absolute top-[calc(100%+1rem)] right-0 left-0 z-90 origin-top overflow-hidden rounded-[2rem] border border-white/20 bg-white/95 p-3 shadow-2xl shadow-slate-950/40 backdrop-blur-2xl animate-in fade-in slide-in-from-top-4 duration-250"
              >
                {filteredResults.length > 0 ? (
                  <div className="max-h-[420px] overflow-y-auto space-y-1.5 pr-1">
                    {filteredResults.map((result, index) => (
                      <button
                        key={result.id}
                        id={result.id}
                        type="button"
                        role="option"
                        aria-selected={index === activeIndex}
                        onMouseEnter={() => setActiveIndex(index)}
                        onClick={() => selectResult(result)}
                        className={`flex w-full items-center gap-4 rounded-2xl p-4 text-left transition-all duration-300 ${
                          index === activeIndex 
                            ? "bg-primary-accent/10 scale-[1.01] shadow-lg shadow-primary-accent/5" 
                            : "hover:bg-surface-bg hover:scale-[1.01]"
                        }`}
                      >
                        <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-all duration-300 ${
                          index === activeIndex ? "bg-primary-accent text-white" : "bg-secondary-dark text-white"
                        }`}>
                          {result.type === "package" ? <Car className="h-5 w-5" /> : <MapPin className="h-5 w-5" />}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex flex-wrap items-center justify-between gap-2">
                            <span className="text-base font-black text-secondary-dark">{result.title}</span>
                            <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${
                              result.type === 'package' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                            }`}>
                              {result.type}
                            </span>
                          </span>
                          <span className="mt-1 line-clamp-1 block text-sm font-semibold text-muted-slate">{result.subtitle}</span>
                          <span className="mt-2 flex items-center gap-4">
                            <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                              <Clock className="h-3.5 w-3.5 text-primary-accent" />
                              {result.meta.split(' / ')[0]}
                            </span>
                            {result.meta.includes('/') && (
                              <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                                <Sparkles className="h-3.5 w-3.5 text-primary-accent" />
                                {result.meta.split(' / ')[1]}
                              </span>
                            )}
                          </span>
                        </span>
                        <ArrowRight className={`h-5 w-5 text-primary-accent transition-all duration-300 ${
                          index === activeIndex ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
                        }`} />
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-surface-bg">
                      <Search className="h-6 w-6 text-slate-300" />
                    </div>
                    <p className="text-lg font-black text-secondary-dark">No matches found</p>
                    <p className="mt-2 text-sm font-medium text-muted-slate">
                      Try searching for "Manali", "Shimla", or "Spiti" to see our best packages.
                    </p>
                  </div>
                )}
              </div>
            )}
          </form>

          {!isOpen && (
            <div className="mt-10 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { icon: Sparkles, label: "Since 2012", text: "Solan operating desk" },
                { icon: MapPin, label: "Live Routes", text: "GPS and road ETA" },
                { icon: ShieldCheck, label: "Private Fleet", text: "Verified drivers" },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/12 bg-white/10 p-4 text-white backdrop-blur-xl">
                  <item.icon className="mb-3 h-5 w-5 text-primary-accent" />
                  <p className="text-sm font-black">{item.label}</p>
                  <p className="mt-1 text-xs font-medium text-white/70">{item.text}</p>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 flex items-center gap-3">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                aria-label={`Show ${slide.searchQuery} hero`}
                onClick={() => setActiveHeroIndex(index)}
                className={`relative h-2.5 overflow-hidden rounded-full transition-all ${
                  index === activeHeroIndex ? "w-14 bg-white/25" : "w-2.5 bg-white/40 hover:bg-white/70"
                }`}
              >
                {index === activeHeroIndex && <span key={activeHeroIndex} className="hero-dot-progress absolute inset-y-0 left-0 rounded-full bg-primary-accent" />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
