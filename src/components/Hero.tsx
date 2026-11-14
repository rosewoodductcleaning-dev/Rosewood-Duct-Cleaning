import React from 'react';
import { Instagram, Calendar, Wind, Gauge, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import heroHvacBackdropImg from '../assets/images/hero_hvac_backdrop_1794348656347.jpg';
import airDuctCleanerImg from '../assets/images/air_duct_cleaner_unbranded_1794498022677.jpg';
import dryerVentCleanerImg from '../assets/images/dryer_vent_cleaner_unbranded_1794498023203.jpg';
import hvacCleanerImg from '../assets/images/hvac_cleaner_unbranded_1794498024504.jpg';

interface HeroProps {
  onBookClick: () => void;
  onExploreServicesClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookClick }) => {
  const benefits = [
    { label: 'Dust Removal', icon: <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#D94D78]" /> },
    { label: 'Improved Airflow', icon: <Gauge className="w-4 h-4 sm:w-5 sm:h-5 text-[#D94D78]" /> },
    { label: 'Cleaner Ventilation', icon: <Wind className="w-4 h-4 sm:w-5 sm:h-5 text-[#D94D78]" /> },
    { label: 'Professional Cleaning', icon: <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#D94D78]" /> },
  ];

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#21130b] text-white border-b-4 border-[#D94D78]"
    >
      {/* 1. Full-Width Darkened HVAC Ductwork Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={heroHvacBackdropImg}
          alt="HVAC Ventilation Duct System"
          className="w-full h-full object-cover object-center scale-105"
          loading="eager"
        />
        {/* Dark Walnut / Deep Espresso Gradient Overlays for High Legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1c0f08]/96 via-[#2b180e]/92 to-[#180d07]/88" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 sm:py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
          
          {/* ================= LEFT SIDE: MAIN CONTENT ================= */}
          <div className="lg:col-span-7 flex flex-col items-start text-left w-full">
            
            {/* Small Brand Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#FFFDF9]/10 border border-white/20 backdrop-blur-md mb-3.5 sm:mb-5">
              <span className="w-2 h-2 rounded-full bg-[#D94D78] animate-pulse shrink-0" />
              <span className="text-[11px] sm:text-xs font-black tracking-widest text-[#FFFDF9] uppercase">
                ROSEWOOD DUCT CLEANING
              </span>
            </div>

            {/* Bold Two-Line Traditional Main Heading */}
            <h1 className="font-display font-black tracking-tight leading-[1.06] text-3xl sm:text-5xl lg:text-6xl xl:text-7xl uppercase mb-3.5 sm:mb-5 w-full">
              <span className="block text-white drop-shadow-md">
                PROFESSIONAL
              </span>
              <span className="block text-[#D94D78] drop-shadow-lg tracking-tight">
                DUCT CLEANING
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-xl lg:text-2xl font-bold text-[#F6F0E7] mb-3 sm:mb-4 leading-snug drop-shadow-sm">
              Cleaner Air. Healthier Spaces.
            </p>

            {/* Value Proposition Description */}
            <p className="text-xs sm:text-sm lg:text-base text-white/85 max-w-2xl leading-relaxed mb-6 sm:mb-8 font-normal">
              Commercial-grade rotary power brushes and high-powered HEPA negative-air extraction for residential HVAC ducts, dryer vents, and chimneys.
            </p>

            {/* 4 Service Benefits Grid with Icons (2x2 on mobile, 4 in row on sm+) */}
            <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5 mb-6 sm:mb-8 p-3 sm:p-4 rounded-2xl bg-black/45 border border-white/10 backdrop-blur-md">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex flex-col items-center sm:items-start text-center sm:text-left gap-1.5 p-1">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/10 flex items-center justify-center border border-white/15 shrink-0">
                    {benefit.icon}
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold text-white tracking-wide leading-tight">
                    {benefit.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Two Prominent Action Buttons: MESSAGE US ON INSTAGRAM & BOOK ONLINE NOW */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
              {/* Left Button: Message Us on Instagram */}
              <a
                href="https://ig.me/m/rosewoodductcleaning"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-[#542B16] hover:bg-[#75401F] active:bg-[#3e1e0e] border border-white/20 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-xl transition-all active:scale-[0.98] group min-h-[48px]"
              >
                <div className="w-6 h-6 rounded-full bg-[#D94D78] text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Instagram className="w-3.5 h-3.5" />
                </div>
                <span>MESSAGE US ON INSTAGRAM</span>
              </a>

              {/* Right Button: Book Online Now (Opens Booking Popup) */}
              <button
                onClick={onBookClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-[#D94D78] hover:bg-[#C53B64] active:bg-[#b02f54] text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-xl transition-all active:scale-[0.98] cursor-pointer min-h-[48px]"
              >
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>BOOK ONLINE NOW</span>
              </button>
            </div>

            {/* Trust Indicator Footnote */}
            <div className="mt-4 sm:mt-5 flex items-center gap-2 text-[11px] sm:text-xs text-white/75">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#D94D78] shrink-0" />
              <span>Licensed, Insured & NADCA-Aligned &bull; Same-Day Dispatch Available</span>
            </div>

          </div>

          {/* ================= RIGHT SIDE: PROPORTIONAL 3-IMAGE COLLAGE ================= */}
          <div className="lg:col-span-5 relative mt-6 sm:mt-8 lg:mt-0 w-full flex justify-center lg:justify-end">
            <div className="w-full max-w-[480px] lg:max-w-[520px] flex flex-col gap-3 sm:gap-4">
              
              {/* Image 1: Main Feature (Air Duct Cleaning with Unbranded Dark Uniform) */}
              <div className="relative w-full h-[210px] xs:h-[240px] sm:h-[270px] lg:h-[280px] rounded-2xl overflow-hidden border-3 sm:border-4 border-white shadow-2xl group bg-[#542B16]">
                <img
                  src={airDuctCleanerImg}
                  alt="Professional Air Duct Cleaning with Rotary Brush"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                
                {/* Brand Seal on Main Image */}
                <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 bg-white/95 rounded-full p-0.5 sm:p-1 shadow-md border border-[#75401F]/20 flex items-center gap-1.5 px-2.5 sm:px-3">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#D94D78]" />
                  <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-[#542B16]">
                    Air Duct Specialist
                  </span>
                </div>

                <div className="absolute bottom-2.5 left-3 right-3 sm:bottom-3 sm:left-4 sm:right-4 flex items-center justify-between">
                  <span className="text-white text-xs sm:text-sm font-black uppercase tracking-wide block drop-shadow-md">
                    Rotary Brush Dust Extraction
                  </span>
                  <span className="text-[10px] font-bold text-white/90 bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-md hidden xs:inline-block">
                    HEPA 99.97%
                  </span>
                </div>
              </div>

              {/* Bottom Row: 2 Balanced Side-by-Side Images (Dryer Vent & HVAC Cleaning) */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full">
                
                {/* Image 2: Dryer Vent Cleaning (Unbranded Uniform) */}
                <div className="relative w-full h-[140px] xs:h-[165px] sm:h-[185px] lg:h-[195px] rounded-2xl overflow-hidden border-3 sm:border-4 border-white shadow-2xl group bg-[#542B16]">
                  <img
                    src={dryerVentCleanerImg}
                    alt="Dryer Vent Cleaning and Lint Clearing"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="eager"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#542B16]/85 via-transparent to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-2 left-2.5 right-2.5 sm:bottom-2.5 sm:left-3 sm:right-3">
                    <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#F6F0E7] block">
                      Fire Defense
                    </span>
                    <span className="text-white text-[11px] sm:text-xs font-black uppercase tracking-wide block drop-shadow-sm">
                      Dryer Vent Care
                    </span>
                  </div>
                </div>

                {/* Image 3: HVAC System Cleaning (Unbranded Uniform) */}
                <div className="relative w-full h-[140px] xs:h-[165px] sm:h-[185px] lg:h-[195px] rounded-2xl overflow-hidden border-3 sm:border-4 border-white shadow-2xl group bg-[#542B16]">
                  <img
                    src={hvacCleanerImg}
                    alt="HVAC Coil and Blower Deep Cleaning"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="eager"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute bottom-2 left-2.5 right-2.5 sm:bottom-2.5 sm:left-3 sm:right-3">
                    <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#F6F0E7] block">
                      Unit Efficiency
                    </span>
                    <span className="text-white text-[11px] sm:text-xs font-black uppercase tracking-wide block drop-shadow-sm">
                      HVAC Deep Clean
                    </span>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
