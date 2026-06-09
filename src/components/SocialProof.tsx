import { useEffect } from "react";
import { Camera, ExternalLink, MessageCircle, ShieldCheck } from "lucide-react";
import { instagramEmbeds, instagramProfile } from "../data/instagram";
import { placeImages } from "../data/placeImages";

declare global {
  interface Window {
    instgrm?: {
      Embeds?: {
        process?: () => void;
      };
    };
  }
}

const instagramEmbedStyle = {
  background: "#fff",
  border: 0,
  borderRadius: "24px",
  boxShadow: "none",
  margin: 0,
  maxWidth: "540px",
  minWidth: "300px",
  padding: 0,
  width: "100%",
} as const;

const officialLinks = [
  {
    label: "Profile",
    href: instagramProfile.url,
    text: "Open official profile",
  },
  {
    label: "Reels",
    href: instagramProfile.reelsUrl,
    text: "Watch latest reels",
  },
];

const highlightTiles = ["Route reels", "Snow updates", "Fleet moments", "Traveller stories"];

const SocialProof = () => {
  const hasInstagramEmbeds = instagramEmbeds.length > 0;

  useEffect(() => {
    if (!hasInstagramEmbeds) {
      return undefined;
    }

    const processEmbeds = () => window.instgrm?.Embeds?.process?.();
    const existingScript = document.querySelector<HTMLScriptElement>('script[src="https://www.instagram.com/embed.js"]');

    if (existingScript) {
      processEmbeds();
      return undefined;
    }

    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    script.defer = true;
    script.onload = processEmbeds;
    document.body.appendChild(script);

    return () => {
      script.onload = null;
    };
  }, [hasInstagramEmbeds]);

  return (
    <section id="reviews" className="overflow-hidden bg-surface-bg py-24">
      <div className="section-container">
        <div className="relative mb-10 overflow-hidden rounded-[2rem] bg-secondary-dark shadow-2xl shadow-secondary-dark/20">
          <img
            src={placeImages.manaliSolangHero}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary-dark via-secondary-dark/90 to-secondary-dark/45" />
          <div className="relative grid gap-8 p-6 md:p-10 lg:grid-cols-[1.05fr_0.95fr] lg:p-12">
            <div className="flex flex-col justify-between">
              <div>
                <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-white backdrop-blur">
                  <span className="rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 p-[2px]">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white">
                      <Camera className="h-5 w-5 text-primary-accent" />
                    </span>
                  </span>
                  @{instagramProfile.username}
                </div>
                <h3 className="max-w-3xl text-4xl font-black leading-tight text-white md:text-6xl">
                  Follow Guru Kripa journeys live
                </h3>
                <p className="mt-5 max-w-2xl text-base font-semibold leading-relaxed text-slate-200 md:text-lg">
                  Fresh mountain moments, route reels, fleet updates, and traveller stories from the official Instagram
                  account.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {highlightTiles.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-white backdrop-blur"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={instagramProfile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary-accent px-6 py-4 text-sm font-black uppercase tracking-wider text-white shadow-xl shadow-primary-accent/25 transition-all hover:scale-[1.01] active:scale-[0.99]"
                >
                  View Official Feed
                  <ExternalLink className="h-4 w-4" />
                </a>
                <a
                  href={instagramProfile.reelsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-6 py-4 text-sm font-black uppercase tracking-wider text-white backdrop-blur transition-all hover:bg-white/15"
                >
                  Watch Reels
                  <Camera className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="mx-auto w-full max-w-sm rounded-[2rem] border border-white/15 bg-white/12 p-3 backdrop-blur-xl">
              <div className="rounded-[1.7rem] bg-white p-4 shadow-2xl">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 p-[2px]">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white">
                        <Camera className="h-7 w-7 text-primary-accent" />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-muted-slate">Official account</p>
                      <p className="text-lg font-black text-secondary-dark">@{instagramProfile.username}</p>
                    </div>
                  </div>
                  <ShieldCheck className="h-5 w-5 text-emerald-500" />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {highlightTiles.slice(0, 3).map((item, index) => (
                    <a
                      key={item}
                      href={index === 0 ? instagramProfile.reelsUrl : instagramProfile.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative aspect-square overflow-hidden rounded-2xl bg-secondary-dark"
                    >
                      <div
                        className={`absolute inset-0 ${
                          index === 0
                            ? "bg-gradient-to-br from-rose-500 via-orange-400 to-yellow-300"
                            : index === 1
                              ? "bg-gradient-to-br from-sky-400 via-cyan-300 to-emerald-300"
                              : "bg-gradient-to-br from-secondary-dark via-slate-700 to-primary-accent"
                        }`}
                      />
                      <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/0" />
                      <span className="absolute inset-x-2 bottom-2 text-[10px] font-black uppercase leading-tight tracking-wider text-white">
                        {item}
                      </span>
                    </a>
                  ))}
                </div>

                <div className="mt-4 rounded-2xl bg-surface-bg p-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-slate">Live updates</p>
                  <p className="mt-1 text-sm font-black text-secondary-dark">{instagramProfile.subtitle}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(300px,540px)_1fr]">
          {hasInstagramEmbeds ? (
            <div className="rounded-[2rem] border border-slate-100 bg-white p-3 shadow-xl shadow-secondary-dark/5">
              {instagramEmbeds.map((embed) => (
                <blockquote
                  key={embed.id}
                  className="instagram-media"
                  data-instgrm-captioned
                  data-instgrm-permalink={embed.url}
                  data-instgrm-version="14"
                  style={instagramEmbedStyle}
                >
                  <a href={embed.url} target="_blank" rel="noopener noreferrer">
                    View {embed.label} on Instagram
                  </a>
                </blockquote>
              ))}
            </div>
          ) : (
            <div className="overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-xl shadow-secondary-dark/5">
              <div className="bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 p-1.5">
                <div className="rounded-[1.65rem] bg-white p-8">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 p-[2px]">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white">
                        <Camera className="h-8 w-8 text-primary-accent" />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-muted-slate">Official Instagram</p>
                      <h4 className="text-2xl font-black text-secondary-dark">@{instagramProfile.username}</h4>
                    </div>
                  </div>
                  <p className="mt-6 text-base font-medium leading-relaxed text-muted-slate">
                    Latest public trip posts, reels, and traveller updates are available on the official Guru Kripa
                    Instagram profile.
                  </p>
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    {highlightTiles.map((item) => (
                      <div key={item} className="rounded-2xl border border-slate-100 bg-surface-bg p-4">
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-slate">Live</p>
                        <p className="mt-1 text-sm font-black text-secondary-dark">{item}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {officialLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-secondary-dark px-5 py-4 text-sm font-black text-white transition-all hover:bg-primary-accent"
                      >
                        {link.text}
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-[2rem] bg-secondary-dark p-8 text-white shadow-xl shadow-secondary-dark/10">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                  <ShieldCheck className="h-7 w-7 text-green-400" />
                </div>
                <span className="rounded-full bg-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-300">
                  Official source
                </span>
              </div>
              <h4 className="text-2xl font-black">Direct from the official account</h4>
              <p className="mt-4 text-sm font-medium leading-relaxed text-slate-300">
                Visitors can open the latest public posts and reels straight from @gurukripaholiday79.
              </p>
            </div>

            <div className="rounded-[2rem] border border-slate-100 bg-white p-8 shadow-xl shadow-secondary-dark/5">
              <h4 className="text-2xl font-black text-secondary-dark">Open live updates</h4>
              <div className="mt-6 grid gap-3">
                {officialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-surface-bg px-5 py-4 text-sm font-black text-secondary-dark transition-all hover:border-primary-accent/30 hover:bg-white"
                  >
                    <span>
                      <span className="block text-[10px] uppercase tracking-widest text-muted-slate">{link.label}</span>
                      {link.text}
                    </span>
                    <ExternalLink className="h-4 w-4 text-primary-accent" />
                  </a>
                ))}
                <a
                  href="https://wa.me/917018972255"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-4 rounded-2xl bg-[#25D366] px-5 py-4 text-sm font-black text-white shadow-xl shadow-green-500/20"
                >
                  <span>
                    <span className="block text-[10px] uppercase tracking-widest text-white/75">Booking</span>
                    Ask about this trip on WhatsApp
                  </span>
                  <MessageCircle className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
