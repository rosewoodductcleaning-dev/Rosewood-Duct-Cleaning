import React from 'react';
import { UserCheck, Wind, Award, CheckCircle2, ShieldCheck } from 'lucide-react';
import technicianUniformImg from '../assets/images/technician_rosewood_uniform_1794350315081.jpg';

export const WhyChooseRosewood: React.FC = () => {
  const benefitCards = [
    {
      id: 'professional-service',
      icon: <UserCheck className="w-6 h-6 text-[#D94D78]" />,
      title: 'Professional Service',
      description: 'Dedicated cleaning professionals focused on quality and customer satisfaction.',
    },
    {
      id: 'cleaner-air',
      icon: <Wind className="w-6 h-6 text-[#D94D78]" />,
      title: 'Cleaner Indoor Air',
      description: 'Help remove accumulated dust, debris, and unwanted buildup from your ventilation system.',
    },
    {
      id: 'reliable-cleaning',
      icon: <Award className="w-6 h-6 text-[#D94D78]" />,
      title: 'Reliable Cleaning',
      description: 'Careful cleaning solutions for air ducts, dryer vents, and HVAC systems.',
    },
  ];

  return (
    <section
      id="why-choose-rosewood"
      className="py-14 sm:py-20 lg:py-28 bg-[#F6F0E7] relative border-t border-[#75401F]/15 overflow-hidden"
    >
      {/* Background ambient warmth */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#D94D78]/8 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 rounded-full bg-[#542B16]/8 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main 2-Column Responsive Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* ================= LEFT SIDE: HEADINGS & 3 BENEFIT CARDS ================= */}
          <div className="lg:col-span-7 flex flex-col order-1">
            
            {/* Small Label */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-[#FFFDF9] border border-[#75401F]/20 text-[#542B16] text-[11px] sm:text-xs font-black uppercase tracking-widest mb-3.5 w-fit shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#D94D78]" />
              <span>WHY CHOOSE ROSEWOOD?</span>
            </div>

            {/* Large Heading */}
            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-black text-[#542B16] tracking-tight mb-4 leading-tight">
              Why Choose Rosewood Duct Cleaning?
            </h2>

            {/* Short Professional Description */}
            <p className="text-xs sm:text-base text-[#352319]/85 max-w-2xl leading-relaxed mb-8 sm:mb-10 font-normal">
              We are committed to providing professional air duct, dryer vent, and HVAC cleaning services. Our focus is on cleaner ventilation, better airflow, and healthier indoor spaces for your home.
            </p>

            {/* Mobile-Only Technician Image Display (Directly beneath description on mobile) */}
            <div className="block lg:hidden mb-8 w-full max-w-md mx-auto">
              <div className="relative rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-white">
                <img
                  src={technicianUniformImg}
                  alt="Professional Rosewood Duct Cleaning Technician in Dark Walnut Uniform"
                  className="w-full h-[360px] sm:h-[420px] object-cover object-top"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md p-3 rounded-xl border border-[#75401F]/20 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-5 h-5 text-[#D94D78] shrink-0" />
                    <div>
                      <span className="text-xs font-black text-[#542B16] block leading-none">
                        Certified Technicians
                      </span>
                      <span className="text-[10px] text-[#75401F] font-bold mt-0.5 block">
                        Licensed, Bonded & Insured
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-white bg-[#542B16] px-2.5 py-1 rounded-full">
                    NADCA
                  </span>
                </div>
              </div>
            </div>

            {/* Three Attractive Benefit Cards (Horizontal on Desktop, Vertical on Mobile) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-4 lg:gap-5">
              {benefitCards.map((card) => (
                <div
                  key={card.id}
                  className="bg-[#FFFDF9] rounded-2xl p-5 sm:p-6 border border-[#75401F]/15 hover:border-[#D94D78]/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
                >
                  <div>
                    {/* Icon container */}
                    <div className="w-12 h-12 rounded-xl bg-[#F6F0E7] border border-[#75401F]/15 flex items-center justify-center mb-4 group-hover:bg-[#D94D78]/10 transition-colors shrink-0">
                      {card.icon}
                    </div>

                    {/* Card Title */}
                    <h3 className="font-display text-base sm:text-lg font-black text-[#542B16] mb-2 group-hover:text-[#D94D78] transition-colors leading-snug">
                      {card.title}
                    </h3>

                    {/* Card Description */}
                    <p className="text-xs sm:text-xs text-[#352319]/80 leading-relaxed font-normal">
                      {card.description}
                    </p>
                  </div>

                  {/* Card Subtle Bottom Indicator */}
                  <div className="mt-4 pt-3 border-t border-[#75401F]/10 flex items-center gap-1.5 text-[11px] font-bold text-[#75401F]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D94D78] shrink-0" />
                    <span>Rosewood Standard</span>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* ================= RIGHT SIDE: DESKTOP PHOTOREALISTIC TECHNICIAN ================= */}
          <div className="hidden lg:block lg:col-span-5 order-2">
            <div className="relative max-w-[460px] ml-auto">
              
              {/* Outer Decorative Glow & Frame */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#75401F]/20 via-[#D94D78]/20 to-transparent rounded-[32px] blur-lg pointer-events-none" />

              {/* Main Technician Image Container */}
              <div className="relative rounded-[28px] overflow-hidden border-4 border-white shadow-2xl bg-white group">
                <img
                  src={technicianUniformImg}
                  alt="Professional Rosewood Duct Cleaning Technician in Dark Walnut Uniform with Brand Logo"
                  className="w-full h-[520px] object-cover object-top group-hover:scale-102 transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle Lighting Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#542B16]/80 via-transparent to-transparent pointer-events-none" />

                {/* Top Corner Official Brand Tag */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-md border border-[#75401F]/20 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D94D78] animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#542B16]">
                    Dedicated Air Care Specialist
                  </span>
                </div>

                {/* Bottom Floating Guarantee Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-[#75401F]/20 shadow-xl flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#F6F0E7] flex items-center justify-center text-[#D94D78] border border-[#75401F]/15 shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-black text-[#542B16] block leading-none">
                        Certified & Uniformed Technicians
                      </span>
                      <span className="text-[11px] text-[#75401F] font-semibold mt-1 block">
                        Clean uniforms &bull; Background checked
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-black text-white bg-[#D94D78] px-3 py-1.5 rounded-xl shadow-sm whitespace-nowrap">
                    100% Guaranteed
                  </span>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
