import React, { useState } from 'react';
import { MapPin, Search, CheckCircle2, AlertCircle, ArrowRight, Sparkles, Navigation, Clock, ShieldCheck } from 'lucide-react';

interface ZipCheckerProps {
  onProceedToBookingWithZip: (zip: string) => void;
}

export const ZipChecker: React.FC<ZipCheckerProps> = ({ onProceedToBookingWithZip }) => {
  const [zipInput, setZipInput] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = zipInput.trim();

    if (!/^\d{5}$/.test(clean)) {
      setError('Please enter a valid 5-digit US ZIP code (e.g. 75001, 30301).');
      setHasSearched(false);
      return;
    }

    setError(null);
    setHasSearched(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 5);
    setZipInput(val);
    if (error) setError(null);
    if (hasSearched) setHasSearched(false);
  };

  const dispatchPerks = [
    {
      icon: <Clock className="w-4 h-4 text-[#D94D78] shrink-0" />,
      title: 'Same-Day & Next-Day Dispatch',
      desc: 'Live mobile routing across metropolitan neighborhoods.',
    },
    {
      icon: <ShieldCheck className="w-4 h-4 text-[#D94D78] shrink-0" />,
      title: 'Hospital-Grade HEPA Equipment',
      desc: 'Fully equipped vans with commercial negative-air units.',
    },
  ];

  return (
    <section
      id="availability"
      className="py-14 sm:py-20 lg:py-24 bg-[#F6F0E7] relative border-y border-[#75401F]/15 overflow-hidden"
    >
      {/* Background ambient lighting accents */}
      <div className="absolute top-0 right-10 w-96 h-96 rounded-full bg-[#D94D78]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 rounded-full bg-[#542B16]/10 blur-3xl pointer-events-none" />

      {/* Unified max-w-7xl Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Heading, Description & Dispatch Features */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFDF9] border border-[#75401F]/20 text-[#542B16] text-[11px] sm:text-xs font-black uppercase tracking-widest mb-3.5 shadow-sm">
              <Navigation className="w-3.5 h-3.5 text-[#D94D78] shrink-0" />
              <span>Regional Service Dispatch</span>
            </div>

            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-black text-[#542B16] tracking-tight mb-3 sm:mb-4">
              Check Service Availability in Your Area
            </h2>

            <p className="text-xs sm:text-base text-[#352319]/80 leading-relaxed font-normal mb-6 sm:mb-8">
              Enter your 5-digit ZIP code to confirm dispatch coverage for your home or property. Our fleet operates throughout the greater metro area and surrounding communities.
            </p>

            {/* Dispatch Perks List */}
            <div className="w-full space-y-3 pt-1">
              {dispatchPerks.map((perk, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-white/60 border border-[#75401F]/10">
                  <div className="w-8 h-8 rounded-lg bg-[#FFFDF9] border border-[#75401F]/15 flex items-center justify-center shrink-0 mt-0.5">
                    {perk.icon}
                  </div>
                  <div>
                    <span className="text-xs font-black text-[#542B16] block leading-tight">
                      {perk.title}
                    </span>
                    <span className="text-[11px] text-[#352319]/70 leading-normal block mt-0.5">
                      {perk.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Input Card & Real-Time Results */}
          <div className="lg:col-span-6 w-full">
            <div className="bg-[#FFFDF9] p-5 sm:p-8 rounded-3xl border-2 border-[#75401F]/20 shadow-xl">
              <div className="mb-4">
                <span className="text-xs font-black uppercase tracking-wider text-[#75401F] block mb-1">
                  Instant Coverage Lookup
                </span>
                <h3 className="font-display text-lg sm:text-xl font-black text-[#542B16]">
                  Verify Your Neighborhood Route
                </h3>
              </div>

              <form onSubmit={handleCheck} className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 items-stretch">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3.5 sm:pl-4 flex items-center pointer-events-none text-[#75401F]">
                    <MapPin className="w-5 h-5 text-[#D94D78]" />
                  </div>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={5}
                    value={zipInput}
                    onChange={handleInputChange}
                    placeholder="Enter 5-digit ZIP (e.g. 75201)"
                    className="w-full pl-11 sm:pl-12 pr-4 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-[#F6F0E7]/60 border border-[#75401F]/20 text-[#352319] placeholder-[#352319]/50 font-bold text-base focus:outline-none focus:ring-2 focus:ring-[#D94D78] focus:border-[#D94D78] transition-all min-h-[48px]"
                    aria-label="Enter 5-digit ZIP code"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-[#542B16] hover:bg-[#75401F] active:bg-[#3e1e0e] text-white font-black text-sm uppercase tracking-wider shadow-md transition-all active:scale-[0.98] cursor-pointer shrink-0 min-h-[48px]"
                >
                  <Search className="w-4 h-4 text-[#D94D78] shrink-0" />
                  <span>Check Availability</span>
                </button>
              </form>

              {/* Error notice */}
              {error && (
                <div className="mt-3 text-left flex items-center gap-2 text-xs font-semibold text-rose-700 bg-rose-50 px-3.5 py-2.5 rounded-xl border border-rose-200">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Success Result Container */}
              {hasSearched && (
                <div className="mt-6 bg-[#F6F0E7] p-5 sm:p-6 rounded-2xl border-2 border-emerald-500/40 shadow-inner animate-in fade-in zoom-in-95 duration-300">
                  <div className="flex flex-col items-start text-left">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-black uppercase tracking-widest text-emerald-800">
                          <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>Coverage Confirmed</span>
                        </div>
                        <h4 className="font-display text-base sm:text-lg font-black text-[#542B16] leading-tight">
                          Active Routes in ZIP {zipInput}
                        </h4>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-[#352319]/80 mb-4 leading-relaxed">
                      Technician crews are available for Air Duct, Dryer Vent, HVAC, and Chimney Cleaning in your area.
                    </p>

                    <button
                      onClick={() => onProceedToBookingWithZip(zipInput)}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#D94D78] hover:bg-[#C53B64] active:bg-[#b02f54] text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-md transition-all active:scale-[0.98] cursor-pointer min-h-[46px]"
                    >
                      <span>Book Online for ZIP {zipInput}</span>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </button>
                  </div>
                </div>
              )}

              <p className="text-[10px] text-[#352319]/70 mt-4 text-center sm:text-left">
                Need service outside our standard radius? <a href="https://ig.me/m/rosewoodductcleaning" target="_blank" rel="noopener noreferrer" className="font-bold text-[#D94D78] hover:underline inline-flex items-center gap-1">Message our team on Instagram →</a> to check custom scheduling.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
