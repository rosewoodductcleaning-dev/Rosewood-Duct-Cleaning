import React from 'react';
import { Award, Leaf, ShieldCheck, ArrowRight } from 'lucide-react';
import aboutTeamImg from '../assets/images/about_team_unbranded_1794498025584.jpg';

interface AboutUsProps {
  onBookClick: () => void;
}

export const AboutUs: React.FC<AboutUsProps> = ({ onBookClick }) => {
  return (
    <section id="about" className="py-14 sm:py-20 lg:py-28 bg-[#FFFDF9] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Responsive Asymmetric Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Column: Mobile-Optimized Photo Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl sm:rounded-[32px] overflow-hidden border-2 border-[#75401F]/20 shadow-xl bg-[#F6F0E7] group">
              <img
                src={aboutTeamImg}
                alt="Rosewood Duct Cleaning professional technicians and HEPA equipment"
                className="w-full h-[280px] xs:h-[360px] sm:h-[480px] object-cover object-center group-hover:scale-102 transition-transform duration-700 ease-out"
                loading="lazy"
                referrerPolicy="no-referrer"
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#542B16]/80 via-transparent to-transparent pointer-events-none" />

              {/* Floating Rosewood Seal Badge */}
              <div className="absolute top-3 left-3 sm:top-5 sm:left-5 bg-[#FFFDF9]/95 backdrop-blur-md px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-2xl border border-[#75401F]/20 shadow-xl flex items-center gap-2.5">
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-[#75401F]/30 bg-white p-0.5 shrink-0">
                  <img
                    src="/assets/aistudio/rosewood_duct_pic_4f781af9.jpeg"
                    alt="Rosewood Seal"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <span className="font-display font-black text-xs sm:text-sm text-[#542B16] block leading-none">
                    Rosewood
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-[#75401F] font-black mt-0.5 block tracking-wider uppercase">
                    Clean Air • Healthier Spaces
                  </span>
                </div>
              </div>

              {/* Bottom Guarantee Banner */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-5 sm:right-5 bg-[#FFFDF9]/95 backdrop-blur-md p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-[#75401F]/20 shadow-xl flex items-center justify-between gap-2">
                <div>
                  <p className="text-[11px] sm:text-xs font-black text-[#542B16]">Licensed, Bonded & Insured</p>
                  <p className="text-[10px] sm:text-[11px] text-[#352319]/75">National NADCA Technical Standards</p>
                </div>
                <span className="text-[10px] sm:text-xs font-black text-[#D94D78] bg-[#D94D78]/10 px-2.5 py-1 rounded-full whitespace-nowrap">
                  Guaranteed Clean
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Narrative */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#F6F0E7] text-[#75401F] text-[11px] sm:text-xs font-black uppercase tracking-widest mb-3 w-fit">
              <Award className="w-3.5 h-3.5 text-[#D94D78] shrink-0" />
              <span>About Rosewood</span>
            </div>

            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-black text-[#542B16] tracking-tight mb-4 leading-tight">
              Your Comfort. <span className="text-[#D94D78]">Our Priority.</span>
            </h2>

            <p className="text-sm sm:text-base lg:text-lg text-[#352319]/90 leading-relaxed mb-4 sm:mb-6 font-normal">
              At Rosewood Duct Cleaning, we are committed to helping homeowners enjoy cleaner air and healthier indoor spaces. We provide professional air duct, dryer vent, HVAC, and chimney cleaning services with a focus on quality, care, and customer satisfaction.
            </p>

            <p className="text-xs sm:text-sm text-[#352319]/75 leading-relaxed mb-6 font-normal">
              Over months of routine living, dust, pet dander, lint, and soot deposit invisibly within ductwork and flues. We utilize medical-grade negative pressure HEPA containment and high-velocity whips that capture dust at the source without redistributing allergens into your living rooms.
            </p>

            {/* Quality Commitments */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 sm:mb-8">
              <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#F6F0E7] border border-[#75401F]/15 flex items-start gap-3">
                <Leaf className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-black text-[#542B16]">Eco-Friendly Botanical Solutions</h4>
                  <p className="text-[11px] text-[#352319]/75 mt-0.5">Non-toxic, residue-free sanitizers safe for children and pets.</p>
                </div>
              </div>

              <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#F6F0E7] border border-[#75401F]/15 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#D94D78] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-black text-[#542B16]">Zero-Mess Containment Protocol</h4>
                  <p className="text-[11px] text-[#352319]/75 mt-0.5">Protected floors, sealed registers, and spotless cleanup.</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div>
              <button
                onClick={onBookClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:py-4 rounded-xl sm:rounded-full bg-[#542B16] hover:bg-[#75401F] active:bg-[#3e1e0e] text-white font-black text-sm uppercase tracking-wider shadow-md transition-all active:scale-[0.98] cursor-pointer min-h-[48px]"
              >
                <span>Schedule With Our Team</span>
                <ArrowRight className="w-4 h-4 text-[#D94D78] shrink-0" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
