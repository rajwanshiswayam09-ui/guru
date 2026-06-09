import React from 'react';
import { Car, Users, ShieldCheck } from 'lucide-react';

const fleetOptions = [
  {
    title: "Executive Sedan",
    specs: "Swift Dzire / Toyota Etios",
    description: "Perfect for couples, 2-4 bags, smooth mountain handling.",
    icon: Car,
  },
  {
    title: "Premium SUV",
    specs: "Toyota Innova Crysta / Maruti Ertiga",
    description: "Perfect for families, high ground clearance, maximum legroom.",
    icon: Users,
  },
  {
    title: "Group Cruisers",
    specs: "Luxury 12 to 26-Seater Tempo Travellers",
    description: "Modified pushback seats, custom audio setups for group tracks.",
    icon: ShieldCheck,
  }
];

const FleetRibbon: React.FC = () => {
  return (
    <section id="fleet" className="py-24 bg-secondary-dark text-white overflow-hidden relative">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-heading mb-6">Our Dedicated Mountain Fleet</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Eliminating booking anxiety with transparent vehicle specs and certified professional drivers.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {fleetOptions.map((fleet, index) => (
            <div key={index} className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] hover:bg-white/10 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-primary-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <fleet.icon className="w-6 h-6 text-primary-accent" />
              </div>
              <h3 className="text-xl font-bold mb-2">{fleet.title}</h3>
              <p className="text-primary-accent font-bold text-sm mb-4 uppercase tracking-wider">{fleet.specs}</p>
              <p className="text-slate-400 text-sm leading-relaxed">{fleet.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 flex items-center justify-center gap-3">
          <div className="px-4 py-2 bg-white/10 rounded-full border border-white/20 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400" />
            <span className="text-sm font-semibold">All our mountain drivers hold active commercial hilly-terrain certifications.</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FleetRibbon;
