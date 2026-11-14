import React, { useState, useEffect } from 'react';
import { Wind, Flame, Fan, Home, ArrowUpRight, CheckCircle2, Info, X, Shield, Clock, Wrench } from 'lucide-react';
import { ServiceType } from '../types';

interface ServicesProps {
  onSelectService: (service: ServiceType) => void;
}

interface ServiceCardData {
  id: string;
  number: string;
  title: ServiceType;
  category: string;
  image: string;
  description: string;
  keyBenefits: string[];
  detailedModal: {
    overview: string;
    steps: string[];
    equipment: string[];
    duration: string;
    recommendedFrequency: string;
    pricingNote: string;
  };
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const [activeModal, setActiveModal] = useState<ServiceCardData | null>(null);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeModal]);

  const serviceCards: ServiceCardData[] = [
    {
      id: 'air-duct',
      number: '01',
      title: 'Air Duct Cleaning',
      category: 'Whole-Home Air Sanitation',
      image: '/src/assets/images/air_duct_cleaner_unbranded_1794498022677.jpg',
      description:
        'Improve your indoor air quality with professional air duct cleaning. Remove accumulated dust, pet dander, debris, and airborne allergens from your supply and return vents.',
      keyBenefits: [
        'Rotary high-speed brush extraction in all branch lines',
        'Continuous HEPA negative-air draw (2,500+ CFM)',
        'Helps reduce seasonal indoor allergens and musty odors',
        'Sanitizing botanical misting option available',
      ],
      detailedModal: {
        overview:
          'Our residential air duct cleaning protocol uses negative-air HEPA collection paired with high-velocity agitation brushes. We seal your registers, create vacuum depressurization throughout your duct network, and mechanically dislodge deep-seated debris from every vent run back to the main trunk line.',
        steps: [
          'Pre-inspection of vents, registers, and return plenum chambers',
          'Connecting industrial HEPA negative-air extraction hose to main trunk line',
          'Mechanical rotary brushing through every supply and return register',
          'Compressed air whips to dislodge stubborn stuck-on particulates',
          'Negative vacuum pull of all loosened contaminants directly into containment',
          'Optional EPA-registered botanical antimicrobial fogging deodorization',
        ],
        equipment: [
          'High-torque flexible rotary brush system with nylon safe-bristle heads',
          'Industrial HEPA negative-air vacuum system (99.97% filtration down to 0.3 microns)',
          'High-velocity pneumatic air sweep whips',
        ],
        duration: '2.5 - 4 hours (based on home square footage and number of vents)',
        recommendedFrequency: 'Every 3 to 5 years, or immediately following home renovations',
        pricingNote: 'Transparent flat-rate pricing based on your system size with zero hidden add-ons.',
      },
    },
    {
      id: 'dryer-vent',
      number: '02',
      title: 'Dryer Vent Cleaning',
      category: 'Fire Hazard & Efficiency Care',
      image: '/src/assets/images/dryer_vent_cleaner_unbranded_1794498023203.jpg',
      description:
        'Help improve dryer efficiency, cut utility costs, and eliminate hazardous flammable lint buildup with our comprehensive professional dryer vent cleaning service.',
      keyBenefits: [
        'Complete line lint clearing from dryer back to exterior wall or roof hood',
        'Helps protect against household lint fires and thermal overheating',
        'Restores rapid single-cycle drying speeds',
        'Inspection of exterior vent damper flap and transition duct',
      ],
      detailedModal: {
        overview:
          'Over 15,000 household fires occur annually from clogged dryer vents. Our technicians clean the entire vent run—from the transition hose behind your dryer through exterior wall and roof exits—clearing compact lint blockages and verifying unrestricted exhaust airflow.',
        steps: [
          'Disconnecting dryer transition duct and measuring baseline backpressure airflow',
          'Inserting rotary nylon sweep brush through the full length of the vent pipe',
          'Simultaneous vacuum extraction capturing loosened lint clusters',
          'Exterior vent damper cleaning and pest guard inspection',
          'Reconnecting rigid metal transition hose and executing post-cleaning velocity test',
        ],
        equipment: [
          'Professional flexible rotary rod cleaning system up to 40 feet',
          'High-CFM lint vacuum collection trap',
          'Digital anemometer for certified airflow velocity verification',
        ],
        duration: '45 - 75 minutes',
        recommendedFrequency: 'Annually for active families (or sooner if clothes take multiple cycles to dry)',
        pricingNote: 'Fixed standard rate for single-story runs; minor roof surcharge applies for roof caps.',
      },
    },
    {
      id: 'hvac-system',
      number: '03',
      title: 'HVAC Cleaning',
      category: 'Unit Integrity & Airflow',
      image: '/src/assets/images/hvac_cleaner_unbranded_1794498024504.jpg',
      description:
        'Keep your heating and cooling equipment running at peak performance. Deep cleaning for evaporator coils, blower fan wheels, condensation pans, and internal cabinet housing.',
      keyBenefits: [
        'Evaporator coil and fins deep cleanse to restore heat transfer',
        'Blower fan assembly and wheel blade decontamination',
        'Clears drain pan and condensate line to prevent water leaks',
        'Supports energy efficiency and extends equipment operational life',
      ],
      detailedModal: {
        overview:
          'A dirty blower wheel or choked evaporator coil can reduce HVAC efficiency by up to 30% and place heavy strain on the compressor. Our certified technicians meticulously clean the internal heart of your HVAC air handler unit.',
        steps: [
          'Power disconnection and safe access to furnace and evaporator coil cabinet',
          'Self-rinsing, non-acidic foaming coil cleaner application to aluminum fins',
          'Precision brushing and vacuuming of blower wheel vanes and motor housing',
          'Flushing condensate drain trap and pan with algae/microbial inhibitor',
          'Cabinet interior vacuum wipe-down and filter rack inspection',
        ],
        equipment: [
          'Specialized fin comb straighteners and gentle coil wash sprayers',
          'Industrial HEPA wet/dry extraction unit for drain line and cabinet care',
          'Non-acidic biodegradable coil detergent',
        ],
        duration: '1.5 - 2.5 hours',
        recommendedFrequency: 'Every 1 to 2 years alongside seasonal HVAC tune-ups',
        pricingNote: 'Can be conveniently bundled with Air Duct Cleaning for maximum savings.',
      },
    },
    {
      id: 'chimney-sweep',
      number: '04',
      title: 'Chimney Cleaning',
      category: 'Flue Safety & Soot Removal',
      image: '/src/assets/images/chimney_sweep_unbranded_1794498024784.jpg',
      description:
        'Keep your fireplace and chimney safer and clean. Thorough soot, creosote, and obstruction removal with a complete zero-mess hearth containment guarantee.',
      keyBenefits: [
        'Soot, flammable creosote, and flue obstruction sweeping',
        'Full hearth dust-containment drop cloths and HEPA capture protocol',
        'Thorough inspection of damper, smoke shelf, firebox, and flue liner',
        'Ensures safe drafting of smoke and carbon monoxide fumes',
      ],
      detailedModal: {
        overview:
          'Burning wood produces creosote—a highly flammable byproduct that accumulates on chimney flue walls. Our certified chimney sweep removes hazardous deposits from the hearth to the chimney cap while ensuring your home remains immaculate.',
        steps: [
          'Setting up poly sheeting, floor drop cloths, and HEPA exhaust containment at hearth',
          'Multi-stage rotary sweeping of flue walls to dislodge Stage 1 & 2 creosote deposits',
          'Cleaning the smoke shelf, smoke chamber, and damper mechanism',
          'Vacuuming soot and ash debris directly into high-efficiency dust collectors',
          'Visual inspection of crown, mortar joints, flashing, and spark arrestor cap',
        ],
        equipment: [
          'Wire and poly chimney sweeping brushes sized specifically to your flue dimensions',
          'Triple-filter HEPA chimney vacuum preventing dust blowback into your living room',
          'High-intensity inspection lighting',
        ],
        duration: '1.5 - 2 hours',
        recommendedFrequency: 'Annually before the winter burning season or every 36 fires',
        pricingNote: 'Competitive flat pricing covering standard single-flue masonry or prefab fireplaces.',
      },
    },
  ];

  return (
    <section id="services" className="py-14 sm:py-20 lg:py-28 bg-[#FFFDF9] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-10 sm:mb-16 pb-5 sm:pb-6 border-b border-[#75401F]/20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#F6F0E7] text-[#75401F] text-[11px] sm:text-xs font-black uppercase tracking-widest mb-2.5">
              <span className="w-2 h-2 rounded-full bg-[#D94D78] shrink-0" />
              <span>Certified Technical Solutions</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-black text-[#542B16] tracking-tight">
              Our Professional Cleaning Services
            </h2>
          </div>
          <p className="text-xs sm:text-sm lg:text-base text-[#352319]/80 max-w-md leading-relaxed font-medium">
            Commercial-grade equipment and NADCA-aligned standards engineered for optimal indoor air quality, fire prevention, and HVAC efficiency.
          </p>
        </div>

        {/* 4 Separate Service Cards Grid (Single-column on mobile, 2-col on md+) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-8 xl:gap-10">
          {serviceCards.map((service) => (
            <div
              key={service.id}
              className="group rounded-3xl bg-white border-2 border-[#75401F]/15 hover:border-[#D94D78]/60 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              {/* Card Image Area with Number & Emblem */}
              <div className="relative h-56 sm:h-72 w-full overflow-hidden bg-[#542B16]/10">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />

                {/* Dark Gradient Overlay for Badges */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />

                {/* Top Badge: Category + Seal */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 text-[#542B16] text-[11px] sm:text-xs font-black shadow-md border border-[#75401F]/15">
                    {service.id === 'air-duct' && <Wind className="w-3.5 h-3.5 text-[#D94D78] shrink-0" />}
                    {service.id === 'dryer-vent' && <Flame className="w-3.5 h-3.5 text-[#D94D78] shrink-0" />}
                    {service.id === 'hvac-system' && <Fan className="w-3.5 h-3.5 text-[#D94D78] shrink-0" />}
                    {service.id === 'chimney-sweep' && <Home className="w-3.5 h-3.5 text-[#D94D78] shrink-0" />}
                    <span className="truncate max-w-[170px] sm:max-w-none">{service.category}</span>
                  </span>

                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white p-0.5 shadow-lg border border-[#75401F]/30 overflow-hidden shrink-0">
                    <img
                      src="/assets/aistudio/rosewood_duct_pic_4f781af9.jpeg"
                      alt="Rosewood Emblem"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* Bottom Index & Title Overlay */}
                <div className="absolute bottom-3 left-4 right-4 sm:bottom-4 sm:left-5 sm:right-5">
                  <span className="text-[10px] sm:text-[11px] font-bold text-white/80 uppercase tracking-widest block">
                    Service Line {service.number}
                  </span>
                  <span className="text-lg sm:text-2xl font-black text-white uppercase tracking-wide drop-shadow-md block">
                    {service.title}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-7 flex-1 flex flex-col justify-between bg-white">
                <div>
                  <p className="text-xs sm:text-sm text-[#352319]/85 leading-relaxed mb-4 sm:mb-5 font-normal">
                    {service.description}
                  </p>

                  {/* Bullet Benefits */}
                  <ul className="space-y-2 mb-6 sm:mb-7">
                    {service.keyBenefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#352319] font-medium leading-snug">
                        <CheckCircle2 className="w-4 h-4 text-[#D94D78] shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Two Action Buttons: Learn More & Book Service (Responsive column/row) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-4 border-t border-[#75401F]/10">
                  {/* Learn More Button */}
                  <button
                    onClick={() => setActiveModal(service)}
                    className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-[#F6F0E7] hover:bg-[#ebdccb] active:bg-[#dfc8b4] text-[#542B16] font-bold text-xs sm:text-sm transition-colors border border-[#75401F]/20 cursor-pointer min-h-[46px]"
                  >
                    <Info className="w-4 h-4 text-[#75401F] shrink-0" />
                    <span>Learn More</span>
                  </button>

                  {/* Book Service Button */}
                  <button
                    onClick={() => onSelectService(service.title)}
                    className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-[#D94D78] hover:bg-[#C53B64] active:bg-[#b02f54] text-white font-black text-xs sm:text-sm shadow-md transition-all active:scale-[0.98] cursor-pointer min-h-[46px]"
                  >
                    <span>Book Service</span>
                    <ArrowUpRight className="w-4 h-4 shrink-0" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ================= DETAILED SERVICE MODAL (Mobile-Optimized) ================= */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl max-w-2xl w-full max-h-[88vh] sm:max-h-[90vh] overflow-y-auto no-scrollbar shadow-2xl border-t-2 sm:border-2 border-[#75401F]/20 p-5 sm:p-8 relative animate-in slide-in-from-bottom-4 sm:zoom-in-95 duration-200">
            
            {/* Close Button (Touch Friendly) */}
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 w-10 h-10 rounded-full bg-[#F6F0E7] hover:bg-[#ebdccb] active:bg-[#dfc8b4] text-[#542B16] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-4 pr-10">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#F6F0E7] border border-[#75401F]/20 flex items-center justify-center text-[#D94D78] shrink-0">
                {activeModal.id === 'air-duct' && <Wind className="w-5 h-5 sm:w-6 sm:h-6" />}
                {activeModal.id === 'dryer-vent' && <Flame className="w-5 h-5 sm:w-6 sm:h-6" />}
                {activeModal.id === 'hvac-system' && <Fan className="w-5 h-5 sm:w-6 sm:h-6" />}
                {activeModal.id === 'chimney-sweep' && <Home className="w-5 h-5 sm:w-6 sm:h-6" />}
              </div>
              <div>
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-[#75401F] block">
                  Service Specifications
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-black text-[#542B16] leading-tight">
                  {activeModal.title}
                </h3>
              </div>
            </div>

            {/* Overview */}
            <p className="text-xs sm:text-sm text-[#352319]/85 leading-relaxed mb-5 bg-[#F6F0E7]/70 p-3.5 sm:p-4 rounded-xl border border-[#75401F]/10">
              {activeModal.detailedModal.overview}
            </p>

            {/* Step-by-Step Procedure */}
            <div className="mb-5">
              <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#542B16] mb-2.5 flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#D94D78] shrink-0" />
                <span>Our Standard 6-Point Process</span>
              </h4>
              <div className="space-y-2">
                {activeModal.detailedModal.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#352319]">
                    <span className="w-5 h-5 rounded-full bg-[#542B16] text-white flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-snug">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Equipment Used */}
            <div className="mb-5">
              <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#542B16] mb-2.5 flex items-center gap-2">
                <Wrench className="w-4 h-4 text-[#D94D78] shrink-0" />
                <span>Commercial Equipment</span>
              </h4>
              <ul className="space-y-1.5">
                {activeModal.detailedModal.equipment.map((eq, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-[#352319]">
                    <CheckCircle2 className="w-4 h-4 text-[#D94D78] shrink-0" />
                    <span>{eq}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Specs (Duration & Frequency) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-5 p-3.5 sm:p-4 rounded-xl bg-[#F6F0E7] border border-[#75401F]/15">
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#D94D78] shrink-0" />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#75401F] block">
                    Estimated Duration
                  </span>
                  <span className="text-xs font-black text-[#542B16]">
                    {activeModal.detailedModal.duration}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-[#D94D78] shrink-0" />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#75401F] block">
                    Recommended Cadence
                  </span>
                  <span className="text-xs font-black text-[#542B16]">
                    {activeModal.detailedModal.recommendedFrequency}
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Bottom Action (Full-width on mobile) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-[#75401F]/15">
              <p className="text-[11px] sm:text-xs text-[#352319]/70 text-center sm:text-left">
                {activeModal.detailedModal.pricingNote}
              </p>
              <button
                onClick={() => {
                  const title = activeModal.title;
                  setActiveModal(null);
                  onSelectService(title);
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#D94D78] hover:bg-[#C53B64] active:bg-[#b02f54] text-white font-black text-sm shadow-md transition-all cursor-pointer min-h-[48px]"
              >
                <span>Book This Service Now</span>
                <ArrowUpRight className="w-4 h-4 shrink-0" />
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
