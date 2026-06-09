import { ArrowRight, Compass } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { tourPackageCategoriesCatalog } from "../data/tourPackagesCatalog";

const TourPackages = () => {
  return (
    <>
      <SEO
        title="Tour Packages | Guru Kripa Travels"
        description="Browse Himachal tour packages with destination-wise route planning and private travel options."
        path="/tour-packages"
      />

      <section className="relative min-h-[62svh] overflow-hidden bg-secondary-dark">
        <img src={tourPackageCategoriesCatalog[0].heroImage} alt="Himachal tour package routes" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-r from-slate-950/74 via-slate-950/44 to-slate-950/14" />
        <div className="section-container relative z-10 py-20 text-white md:py-28">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-widest">
            <Compass className="h-4 w-4 text-primary-accent" />
            Tour package categories
          </p>
          <h1 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">Find your ideal Himachal route package</h1>
          <p className="mt-5 max-w-2xl text-lg font-medium leading-relaxed text-white/84">
            Browse destination-wise categories and open dedicated package listing pages.
          </p>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="section-container grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {tourPackageCategoriesCatalog.map((category) => (
            <article
              key={category.slug}
              className="group overflow-hidden rounded-4xl border border-slate-100 bg-white shadow-xl shadow-slate-950/3 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-950/10"
            >
              <div className="relative h-52 overflow-hidden">
                <img src={category.heroImage} alt={category.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/72 via-transparent to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-primary-accent px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white">
                  {category.packages.length} packages
                </span>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-black leading-tight text-secondary-dark">{category.name}</h2>
                <p className="mt-3 text-sm font-medium leading-relaxed text-muted-slate">{category.heroSubtitle}</p>
                <Link
                  to={`/tour-packages/${category.slug}`}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-black uppercase tracking-wider text-primary-accent"
                >
                  View category packages
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
};

export default TourPackages;
