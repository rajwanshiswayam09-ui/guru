import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import logo from "../assets/logo.webp";

const navItems = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about-us" },
  {
    label: "Destinations",
    to: "/destinations",
    children: [
      { label: "Shimla", to: "/destinations/shimla" },
      { label: "Manali", to: "/destinations/manali" },
      { label: "Dharamshala", to: "/destinations/dharamshala" },
      { label: "Dalhousie", to: "/destinations/dalhousie" },
      { label: "Kinnaur Valley", to: "/destinations/kinnaur-valley" },
      { label: "Lahaul And Spiti Valley", to: "/destinations/lahaul-and-spiti-valley" },
    ],
  },
  {
    label: "Tour Packages",
    to: "/tour-packages",
    children: [
      { label: "Shimla Manali Tour Packages", to: "/tour-packages/shimla-manali-tour-packages" },
      { label: "Complete Himachal Tour Packages", to: "/tour-packages/complete-himachal-tour-packages" },
      { label: "Kinnaur Valley Tour Packages", to: "/tour-packages/kinnaur-valley-tour-packages" },
      { label: "Manali Tour Packages", to: "/tour-packages/manali-tour-packages" },
      { label: "Dharamshala Dalhousie Tour Packages", to: "/tour-packages/dharamshala-dalhousie-tour-packages" },
      { label: "Kinnaur And Spiti Tour Packages", to: "/tour-packages/kinnaur-and-spiti-tour-packages" },
    ],
  },
  { label: "Our Cabs", to: "/our-cabs" },
  { label: "Blog", to: "/blog" },
  { label: "Contact Us", to: "/contact-us" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/85 backdrop-blur-xl">
      <div className="section-container flex h-20 items-center justify-between">
        <Link to="/" onClick={closeMenu} className="flex items-center gap-2">
          <img src={logo} alt="Gurukripa Holidays Logo" className="h-11 w-auto object-contain md:h-14" />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <div key={item.label} className="group relative">
              <Link
                to={item.to}
                className="inline-flex items-center gap-1 text-sm font-semibold text-muted-slate transition-colors hover:text-primary-accent"
              >
                {item.label}
                {item.children && <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />}
              </Link>

              {item.children && (
                <div className="pointer-events-none absolute left-0 top-full z-40 min-w-56 translate-y-2 opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="rounded-2xl border border-slate-100 bg-white p-2 shadow-xl shadow-slate-950/10">
                    {item.children.map((subItem) => (
                      <Link
                        key={subItem.to}
                        to={subItem.to}
                        className="block rounded-xl px-4 py-2 text-sm font-semibold text-muted-slate transition-colors hover:bg-surface-bg hover:text-primary-accent"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="tel:+917018972255" className="btn-primary hidden items-center gap-2 sm:flex">
            <Phone className="h-4 w-4" />
            Call Local Expert
          </a>
          <button
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-secondary-dark shadow-sm md:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-slate-100 bg-white md:hidden">
          <div className="section-container py-4">
            <nav className="grid gap-2">
              {navItems.map((item) => {
                const isCurrent = location.pathname === item.to || (location.hash && item.to.endsWith(location.hash));

                return (
                  <div key={item.label} className="space-y-2">
                    <Link
                      to={item.to}
                      onClick={closeMenu}
                      className={`block rounded-2xl px-4 py-3 text-sm font-black ${
                        isCurrent ? "bg-primary-accent text-white" : "bg-surface-bg text-secondary-dark"
                      }`}
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <div className="grid gap-2 pl-4">
                        {item.children.map((subItem) => (
                          <Link
                            key={subItem.to}
                            to={subItem.to}
                            onClick={closeMenu}
                            className="rounded-xl bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-muted-slate"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              <Link
                to="/booking"
                onClick={closeMenu}
                className="rounded-2xl bg-secondary-dark px-4 py-3 text-sm font-black text-white"
              >
                Get a Quote
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
