import { Camera, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.webp";

const Footer = () => {
  return (
    <footer className="bg-secondary-dark pt-24 pb-12 text-white">
      <div className="section-container">
        <div className="mb-20 grid gap-12 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link to="/" className="mb-8 block">
              <img src={logo} alt="Gurukripa Holidays" className="h-14 w-auto object-contain brightness-0 invert" />
            </Link>
            <p className="mb-8 max-w-md text-lg font-medium leading-relaxed text-slate-400">
              Government affiliated Himachal destination experts based in Solan, planning private mountain journeys since
              2012.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com/gurukripaholiday79"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 transition-all hover:bg-primary-accent"
              >
                <Camera className="h-5 w-5" />
              </a>
              <a
                href="https://wa.me/917018972255"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 transition-all hover:bg-primary-accent"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-8 text-xl font-black">Quick Links</h4>
            <ul className="space-y-4 font-medium text-slate-400">
              <li>
                <Link to="/#enquiry" className="transition-colors hover:text-primary-accent">
                  Enquiry Options
                </Link>
              </li>
              <li>
                <Link to="/#packages" className="transition-colors hover:text-primary-accent">
                  Himachal Packages
                </Link>
              </li>
              <li>
                <Link to="/#fleet" className="transition-colors hover:text-primary-accent">
                  Our Fleet
                </Link>
              </li>
              <li>
                <Link to="/#distance-map" className="transition-colors hover:text-primary-accent">
                  Live Distance Map
                </Link>
              </li>
              <li>
                <Link to="/#feedback" className="transition-colors hover:text-primary-accent">
                  Traveller Feedback
                </Link>
              </li>
              <li>
                <Link to="/booking" className="transition-colors hover:text-primary-accent">
                  Get a Quote
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-8 text-xl font-black">Registered Office</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 text-slate-400">
                <MapPin className="h-5 w-5 shrink-0 text-primary-accent" />
                <span className="text-sm font-medium leading-relaxed">
                  Village Kawgari, Post Office Shamti,
                  <br />
                  Tehsil and District Solan,
                  <br />
                  Himachal Pradesh - Pin 173212
                </span>
              </li>
              <li className="flex items-start gap-4 text-slate-400">
                <Phone className="h-5 w-5 shrink-0 text-primary-accent" />
                <div className="text-sm font-bold">
                  <a href="tel:+917018972255" className="block transition-colors hover:text-white">
                    +91 70189 72255
                  </a>
                  <a href="tel:+918278705847" className="block transition-colors hover:text-white">
                    +91 82787 05847
                  </a>
                  <a href="tel:+919418887156" className="block transition-colors hover:text-white">
                    +91 94188 87156
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4 text-slate-400">
                <Mail className="h-5 w-5 shrink-0 text-primary-accent" />
                <div className="text-sm font-bold">
                  <a href="mailto:gurukripaholiday79@gmail.com" className="block transition-colors hover:text-white">
                    gurukripaholiday79@gmail.com
                  </a>
                  <a href="mailto:info@gurukripaholiday.com" className="block transition-colors hover:text-white">
                    info@gurukripaholiday.com
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-8 border-t border-white/5 pt-12 md:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2">
              <div className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">Govt Affiliated</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2">
              <div className="h-2 w-2 rounded-full bg-primary-accent" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">HP Tourism Experts</span>
            </div>
          </div>

          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
            (c) 2026 Gurukripa Holidays. Solan, Himachal Pradesh.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
