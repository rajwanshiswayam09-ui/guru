import { Car, Fuel, Snowflake, Users } from "lucide-react";
import SEO from "../components/SEO";
import { cabs } from "../data/cabs";

const OurCabs = () => {
  return (
    <>
      <SEO
        title="Our Cabs | Guru Kripa Travels"
        description="Explore our cab fleet with seating, AC, fuel type, and daily pricing for Himachal travel routes."
      />
      <section id="our-cabs" className="bg-white py-24">
        <div className="section-container">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary-accent/10 px-5 py-2 text-xs font-black uppercase tracking-widest text-primary-accent">
              <Car className="h-4 w-4" />
              Our Cabs
            </div>
            <h1 className="text-4xl font-black text-secondary-dark md:text-6xl">Premium Travel Fleet for Every Group Size</h1>
            <p className="mt-5 text-lg font-medium leading-relaxed text-muted-slate">
              Choose the right vehicle for your route with transparent daily pricing and comfort-first travel options.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {cabs.map((cab) => (
              <article
                key={cab.name}
                className="overflow-hidden rounded-4xl border border-slate-100 bg-surface-bg shadow-xl shadow-slate-950/3 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-950/10"
              >
                <div className="relative h-56 overflow-hidden">
                  <img src={cab.image} alt={cab.name} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                  <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-slate-950/75 to-transparent p-5">
                    <h2 className="text-xl font-black text-white">{cab.name}</h2>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid gap-3 text-sm font-bold text-muted-slate">
                    <p className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary-accent" />
                      {cab.seating}
                    </p>
                    <p className="flex items-center gap-2">
                      <Snowflake className="h-4 w-4 text-primary-accent" />
                      {cab.ac}
                    </p>
                    <p className="flex items-center gap-2">
                      <Fuel className="h-4 w-4 text-primary-accent" />
                      {cab.fuelType}
                    </p>
                  </div>
                  <p className="mt-5 rounded-2xl bg-primary-accent/10 px-4 py-3 text-center text-sm font-black uppercase tracking-wider text-primary-accent">
                    {cab.dailyPrice}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default OurCabs;
