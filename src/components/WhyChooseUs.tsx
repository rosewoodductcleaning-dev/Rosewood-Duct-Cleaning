import React from 'react';
import { ShieldCheck, HeartHandshake, Wind, Clock, Sparkles } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      num: '01',
      title: 'Professional Cleaning Services',
      subtitle: 'Hospital-grade HEPA suction & negative air pressure systems',
      desc: 'Our technicians utilize specialized rotary power brushes and certified containment protocols that extract deep contaminants without cross-contaminating your living areas.',
      icon: <ShieldCheck className="w-6 h-6 text-[#D94D78]" />,
    },
    {
      num: '02',
      title: 'Customer-Focused Service',
      subtitle: 'Honest care, transparent quotes & protective shoe covers',
      desc: 'From our upfront pricing guarantee to our meticulous cleanup of work zones, every detail is engineered around protecting your home and respecting your space.',
      icon: <HeartHandshake className="w-6 h-6 text-[#D94D78]" />,
    },
    {
      num: '03',
      title: 'Cleaner Indoor Air',
      subtitle: 'Targeting allergens, dust mites, pet dander & microbial spores',
      desc: 'Dramatically reduce circulating household irritants so family members with respiratory sensitivities experience cleaner, fresher breaths immediately.',
      icon: <Wind className="w-6 h-6 text-[#D94D78]" />,
    },
    {
      num: '04',
      title: 'Reliable Scheduling',
      subtitle: 'Punctual arrival windows & real-time dispatch alerts',
      desc: 'We value your schedule. Our dispatch desk sends live status notifications and provides flexible scheduling windows to fit your week effortlessly.',
      icon: <Clock className="w-6 h-6 text-[#D94D78]" />,
    },
  ];

  return (
    <section className="py-14 sm:py-20 lg:py-28 bg-[#F6F0E7]/60 border-t border-[#75401F]/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#FFFDF9] border border-[#75401F]/20 text-[#542B16] text-[11px] sm:text-xs font-black uppercase tracking-widest mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-[#D94D78] shrink-0" />
            <span>The Rosewood Standard</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-black text-[#542B16] tracking-tight mb-3">
            Why Choose Rosewood Duct Cleaning?
          </h2>
          <p className="text-xs sm:text-base text-[#352319]/80 leading-relaxed font-normal">
            We hold residential air sanitization to an elevated standard of craftsmanship, precision equipment, and unwavering customer respect.
          </p>
        </div>

        {/* 4 Architectural Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {pillars.map((item) => (
            <div
              key={item.num}
              className="bg-[#FFFDF9] rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-[#75401F]/20 hover:border-[#75401F]/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-0.5"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-display font-black text-3xl text-[#542B16]/25 group-hover:text-[#D94D78] transition-colors">
                    {item.num}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-[#F6F0E7] flex items-center justify-center border border-[#75401F]/10 group-hover:bg-[#D94D78]/10 transition-colors">
                    {item.icon}
                  </div>
                </div>

                <h3 className="font-display text-xl font-bold text-[#542B16] mb-2 group-hover:text-[#75401F] transition-colors leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs font-semibold text-[#D94D78] mb-4">
                  {item.subtitle}
                </p>

                <p className="text-xs sm:text-sm text-[#352319]/80 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#75401F]/10 text-[11px] font-bold uppercase tracking-wider text-[#75401F]">
                Rosewood Verified Care
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
