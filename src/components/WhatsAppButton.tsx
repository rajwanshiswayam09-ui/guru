import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/917018972255"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Guru Kripa Travels on WhatsApp"
      className="group fixed right-5 bottom-5 z-[100] md:right-8 md:bottom-8"
    >
      <div className="absolute right-0 -top-12 whitespace-nowrap rounded-xl border border-slate-100 bg-white px-4 py-2 text-sm font-bold text-secondary-dark opacity-0 shadow-xl transition-opacity group-hover:opacity-100">
        Chat with Solan Experts
      </div>
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-green-500/30 transition-all hover:scale-110 active:scale-95">
        <MessageCircle className="h-8 w-8 fill-current" />
      </div>
    </a>
  );
};

export default WhatsAppButton;

