import React from 'react';
import { Settings2, ShieldCheck, Headphones, CircleDollarSign } from 'lucide-react';

const ValueMatrixRibbon: React.FC = () => {
  const values = [
    { icon: Settings2, text: "100% Customized Trips" },
    { icon: ShieldCheck, text: "Verified Local Drivers" },
    { icon: Headphones, text: "24/7 On-Trip Support" },
    { icon: CircleDollarSign, text: "Seasonal Quotes" },
  ];

  return (
    <div className="bg-white border-y border-slate-100 py-6">
      <div className="section-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {values.map((item, index) => (
            <div key={index} className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-accent/10 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-primary-accent" />
              </div>
              <span className="text-sm font-bold text-secondary-dark uppercase tracking-tight">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ValueMatrixRibbon;
