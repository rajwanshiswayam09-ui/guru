import type { SyntheticEvent } from "react";
import { ArrowRight, Image, MapPin, Search } from "lucide-react";
import { destinationGallery } from "../data/destinations";
import fallbackImage from "../assets/hero.png";

interface DestinationGalleryProps {
  onSelectDestination: (query: string) => void;
}

const DestinationGallery = ({ onSelectDestination }: DestinationGalleryProps) => {
  const marqueeDestinations = [...destinationGallery, ...destinationGallery];

  const handleImageError = (event: SyntheticEvent<HTMLImageElement>) => {
    if (event.currentTarget.dataset.fallbackApplied === "true") {
      return;
    }

    event.currentTarget.dataset.fallbackApplied = "true";
    event.currentTarget.src = fallbackImage;
  };

  return (
    <section id="destination-gallery" className="bg-white py-24">
      <div className="section-container">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary-accent/10 px-5 py-2 text-xs font-black uppercase tracking-widest text-primary-accent">
              <Image className="h-4 w-4" />
              Destination gallery
            </div>
            <h2 className="max-w-4xl text-3xl font-black leading-tight text-secondary-dark md:text-5xl">
              Real places your travellers want to see
            </h2>
            <p className="mt-5 max-w-2xl text-lg font-medium leading-relaxed text-muted-slate">
              Explore Himachal's most requested destinations with photos, highlights, and direct package search.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onSelectDestination("")}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-secondary-dark px-6 py-4 text-sm font-black uppercase tracking-wider text-white shadow-xl shadow-secondary-dark/10 transition-all hover:bg-slate-800"
          >
            View All Packages
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mb-10 overflow-hidden rounded-[2rem] border border-slate-100 bg-surface-bg p-3 shadow-xl shadow-slate-950/[0.03]">
          <div className="destination-marquee flex w-max gap-3" aria-hidden="true">
            {marqueeDestinations.map((destination, index) => (
              <div key={`${destination.id}-${index}`} className="flex w-64 items-center gap-3 rounded-2xl bg-white p-3 shadow-sm">
                <img
                  src={destination.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  onError={handleImageError}
                  className="h-16 w-20 shrink-0 rounded-xl object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-black text-secondary-dark">{destination.name}</p>
                  <p className="mt-1 truncate text-xs font-semibold text-muted-slate">{destination.state}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid auto-rows-[310px] gap-5 md:grid-cols-2 lg:grid-cols-4">
          {destinationGallery.map((destination, index) => {
            const featured = index === 0 || index === 1;

            return (
              <button
                key={destination.id}
                type="button"
                onClick={() => onSelectDestination(destination.query)}
                style={{ animationDelay: `${index * 90}ms` }}
                className={`destination-card-slide group relative overflow-hidden rounded-[2rem] bg-secondary-dark text-left shadow-xl shadow-secondary-dark/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-secondary-dark/15 ${
                  featured ? "lg:col-span-2 lg:row-span-2" : ""
                }`}
              >
                <img
                  src={destination.image}
                  alt={destination.alt}
                  loading="lazy"
                  decoding="async"
                  onError={handleImageError}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <div className="mb-4 flex flex-wrap gap-2">
                    {destination.highlights.slice(0, featured ? 3 : 2).map((highlight) => (
                      <span
                        key={highlight}
                        className="rounded-full border border-white/15 bg-white/15 px-3 py-1 text-[10px] font-black uppercase tracking-widest backdrop-blur"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <div className="mb-2 flex items-center gap-2 text-xs font-bold text-white/80">
                        <MapPin className="h-4 w-4 text-primary-accent" />
                        {destination.state}
                      </div>
                      <h3 className={featured ? "text-4xl font-black leading-tight" : "text-2xl font-black leading-tight"}>
                        {destination.name}
                      </h3>
                      <p className="mt-3 line-clamp-2 max-w-lg text-sm font-medium leading-relaxed text-white/78">
                        {destination.description}
                      </p>
                    </div>

                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-accent text-white shadow-xl shadow-primary-accent/25 transition-transform group-hover:translate-x-1">
                      <Search className="h-5 w-5" />
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DestinationGallery;
