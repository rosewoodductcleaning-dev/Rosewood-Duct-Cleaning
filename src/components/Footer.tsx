import React from 'react';
import { Instagram, Mail, Calendar, ArrowUp } from 'lucide-react';
import { ServiceType } from '../types';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onSelectService: (service: ServiceType) => void;
  onOpenBooking?: () => void;
  onNavigateLegal?: (page: 'terms' | 'privacy') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onSelectService, onOpenBooking, onNavigateLegal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'About Us', id: 'about' },
    { label: 'Our Services', id: 'services' },
    { label: 'Check Availability', id: 'availability' },
    { label: 'FAQ', id: 'faq' },
  ];

  const serviceList: { name: ServiceType; desc: string }[] = [
    { name: 'Air Duct Cleaning', desc: 'Whole-house ventilation sanitization' },
    { name: 'Dryer Vent Cleaning', desc: 'Lint extraction & fire safety' },
    { name: 'HVAC Cleaning', desc: 'Blower wheel, coil & housing care' },
    { name: 'Chimney Cleaning', desc: 'Flue, soot & creosote sweep' },
  ];

  return (
    <footer className="bg-[#542B16] text-[#FFFDF9] pt-14 sm:pt-20 pb-24 lg:pb-12 border-t-4 border-[#75401F] relative overflow-hidden">
      {/* Background warm ambient aura */}
      <div className="absolute top-0 right-1/3 w-[500px] h-[500px] rounded-full bg-[#D94D78]/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main 4-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-white/10">
          
          {/* Brand & Identity Column (Col 1-5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#D94D78]/50 shadow-2xl bg-white flex-shrink-0 p-0.5">
                <img
                  src="/assets/aistudio/rosewood_duct_pic_4f781af9.jpeg"
                  alt="Rosewood Duct Cleaning Official Logo"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="font-display font-black text-2xl text-[#FFFDF9] tracking-tight block">
                  Rosewood
                </span>
                <span className="text-xs uppercase tracking-widest text-[#F6F0E7]/80 font-bold block mt-0.5">
                  Duct Cleaning
                </span>
              </div>
            </div>

            <p className="text-sm text-[#F6F0E7]/80 leading-relaxed max-w-sm font-normal">
              Elevating residential air purity with commercial-grade negative air vacuums, certified HEPA equipment, and customer-first care.
            </p>

            {/* Tagline Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 border border-white/15 text-xs font-bold text-[#FFFDF9]">
              <span className="w-2 h-2 rounded-full bg-[#D94D78]" />
              <span className="tracking-widest uppercase">Clean Air • Healthier Spaces</span>
            </div>
          </div>

          {/* Quick Navigation (Col 6-7) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-display text-xs font-bold uppercase tracking-widest text-[#D94D78]">
              Navigation
            </h4>
            <ul className="space-y-3 text-sm text-[#F6F0E7]/80">
              {navLinks.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className="hover:text-white transition-colors cursor-pointer text-left font-medium"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Four Services (Col 8-10) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display text-xs font-bold uppercase tracking-widest text-[#D94D78]">
              Our Four Services
            </h4>
            <ul className="space-y-3 text-sm text-[#F6F0E7]/80">
              {serviceList.map((srv) => (
                <li key={srv.name}>
                  <button
                    onClick={() => onSelectService(srv.name)}
                    className="hover:text-[#D94D78] transition-colors cursor-pointer text-left group flex flex-col"
                  >
                    <span className="font-semibold text-[#FFFDF9] group-hover:text-[#D94D78] transition-colors">
                      {srv.name}
                    </span>
                    <span className="text-[11px] text-[#F6F0E7]/60">{srv.desc}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Booking Quick Action (Col 11-12) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-display text-xs font-bold uppercase tracking-widest text-[#D94D78]">
              Contact Desk
            </h4>
            <div className="space-y-3 text-xs text-[#F6F0E7]/85">
              <a
                href="https://ig.me/m/rosewoodductcleaning"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#D94D78] transition-colors font-bold text-white text-sm group"
              >
                <Instagram className="w-4 h-4 text-[#D94D78] shrink-0 group-hover:scale-110 transition-transform" />
                <span>@rosewoodductcleaning</span>
              </a>
              <a
                href="mailto:rosewoodductcleaning@gmail.com"
                className="flex items-start gap-2 hover:text-white transition-colors break-all"
              >
                <Mail className="w-4 h-4 text-[#D94D78] shrink-0 mt-0.5" />
                <span>rosewoodductcleaning@gmail.com</span>
              </a>
            </div>

            <button
              onClick={() => onOpenBooking ? onOpenBooking() : onNavigate('booking')}
              className="mt-2 w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-[#D94D78] hover:bg-[#C53B64] text-white font-bold text-xs transition-all cursor-pointer shadow-md"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Online Now</span>
            </button>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F6F0E7]/60">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <p>© {new Date().getFullYear()} Rosewood Duct Cleaning. All Rights Reserved. Clean Air • Healthier Spaces.</p>
            <div className="flex items-center gap-3 text-[#F6F0E7]/80">
              <a
                href="/terms-and-conditions"
                onClick={(e) => {
                  if (onNavigateLegal) {
                    e.preventDefault();
                    onNavigateLegal('terms');
                  }
                }}
                className="hover:text-[#D94D78] underline underline-offset-4 transition-colors font-semibold"
              >
                Terms &amp; Conditions
              </a>
              <span aria-hidden="true" className="text-[#F6F0E7]/35">•</span>
              <a
                href="/privacy-policy"
                onClick={(e) => {
                  if (onNavigateLegal) {
                    e.preventDefault();
                    onNavigateLegal('privacy');
                  }
                }}
                className="hover:text-[#D94D78] underline underline-offset-4 transition-colors font-semibold"
              >
                Privacy Policy
              </a>
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-[#F6F0E7] text-xs font-semibold transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#D94D78]" />
          </button>
        </div>

      </div>
    </footer>
  );
};
