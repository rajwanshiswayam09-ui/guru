import { Link } from "react-router-dom";
import { ArrowRight, Image } from "lucide-react";
import { destinationGallery } from "../data/destinations";

const topDestinationIds = ["shimla", "manali", "dharamshala", "dalhousie", "kinnaur", "spiti"];

const TopDestinations = () => {
  const topDestinations = destinationGallery.filter((dest) => topDestinationIds.includes(dest.id));

  return (
    <section className="bg-surface-bg py-24">
      <div className="section-container">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary-accent/10 px-5 py-2 text-xs font-black uppercase tracking-widest text-primary-accent">
            <Image className="h-4 w-4" />
            Signature Destinations
          </div>
          <h2 className="text-3xl font-black text-secondary-dark md:text-5xl">Explore Top Destinations</h2>
          <p className="mt-5 text-lg font-medium leading-relaxed text-muted-slate">
            From colonial ridgelines to high-altitude monasteries, discover the most iconic corners of Himachal Pradesh.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {topDestinations.map((dest) => (
            <Link
              key={dest.id}
              to={`/destinations/${dest.id}`}
              className="group relative h-[420px] overflow-hidden rounded-[2.5rem] bg-secondary-dark shadow-xl shadow-slate-950/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-950/20"
            >
              <img
                src={dest.image}
                alt={dest.name}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent transition-opacity duration-500 group-hover:opacity-80" />
              
              <div className="absolute inset-x-0 bottom-0 p-8 text-white">
                <div className="mb-4 flex flex-wrap gap-2 opacity-0 transition-all duration-500 group-hover:opacity-100">
                  {dest.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest backdrop-blur-md"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
                
                <h3 className="text-3xl font-black tracking-tight text-white transition-transform duration-500 group-hover:-translate-y-1">
                  {dest.name}
                </h3>
                <p className="mt-2 text-sm font-medium text-white/70 line-clamp-2 opacity-0 transition-all duration-500 group-hover:opacity-100">
                  {dest.description}
                </p>
                
                <div className="mt-6 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-primary-accent opacity-0 transition-all duration-500 group-hover:opacity-100">
                  Explore Now
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

export default TopDestinations;
