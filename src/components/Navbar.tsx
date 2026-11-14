import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, Wind, Flame, Fan, Home, ArrowRight, Sparkles } from 'lucide-react';
import { ServiceType } from '../types';

interface NavbarProps {
  onOpenBooking: () => void;
  onNavigate: (sectionId: string) => void;
  onSelectService?: (service: ServiceType) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onNavigate, onSelectService }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [areasDropdownOpen, setAreasDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const servicesDropdownRef = useRef<HTMLDivElement>(null);
  const areasDropdownRef = useRef<HTMLDivElement>(null);

  // Track scroll for opacity and active section highlighting
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'services', 'about', 'availability', 'faq'];
      const scrollPos = window.scrollY + 140;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(e.target as Node)) {
        setServicesDropdownOpen(false);
      }
      if (areasDropdownRef.current && !areasDropdownRef.current.contains(e.target as Node)) {
        setAreasDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const serviceOptions: { name: ServiceType; desc: string; icon: React.ReactNode }[] = [
    { name: 'Air Duct Cleaning', desc: 'Whole-home ventilation sanitization', icon: <Wind className="w-4 h-4 text-[#D94D78]" /> },
    { name: 'Dryer Vent Cleaning', desc: 'Lint removal & fire prevention', icon: <Flame className="w-4 h-4 text-[#D94D78]" /> },
    { name: 'HVAC Cleaning', desc: 'Blower wheel, coils & unit care', icon: <Fan className="w-4 h-4 text-[#D94D78]" /> },
    { name: 'Chimney Cleaning', desc: 'Flue, soot & creosote sweep', icon: <Home className="w-4 h-4 text-[#D94D78]" /> },
  ];

  const serviceAreas = [
    'Downtown & Central Metro',
    'North Suburbs & Woodlands',
    'East County Communities',
    'South Hills & Metro Valley',
    'Westside Residential Districts',
    'All Areas Within 50-Mile Radius',
  ];

  const handleLinkClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    setAreasDropdownOpen(false);
    onNavigate(id);
  };

  const handleServiceSelect = (serviceName: ServiceType) => {
    setActiveSection('services');
    setServicesDropdownOpen(false);
    setMobileMenuOpen(false);
    if (onSelectService) {
      onSelectService(serviceName);
    } else {
      onNavigate('booking');
    }
  };

  return (
    <header className="sticky top-3 sm:top-5 z-50 w-full px-3 sm:px-6 pointer-events-none transition-all duration-300">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        
        {/* Floating Pill Navigation Container */}
        <div
          className={`pointer-events-auto w-full sm:w-auto flex items-center justify-between gap-3 sm:gap-6 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full border border-white/20 transition-all duration-300 ${
            isScrolled
              ? 'bg-[#542B16]/95 backdrop-blur-2xl shadow-2xl shadow-[#21130b]/50 ring-1 ring-white/15'
              : 'bg-[#542B16]/90 backdrop-blur-xl shadow-xl shadow-black/30'
          }`}
        >
          
          {/* ================= LEFT: ORIGINAL ROSEWOOD LOGO ================= */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('home');
            }}
            className="flex items-center gap-2.5 group focus:outline-none shrink-0"
            aria-label="Rosewood Duct Cleaning Home"
          >
            {/* Small Elegant Logo Sizing */}
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-white/25 shadow-sm shrink-0 bg-white p-0.5 group-hover:scale-105 transition-transform duration-200">
              <img
                src="/assets/aistudio/rosewood_duct_pic_4f781af9.jpeg"
                alt="Rosewood Duct Cleaning Logo"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-sm sm:text-base text-white tracking-tight uppercase leading-none group-hover:text-[#F6F0E7] transition-colors">
                Rosewood
              </span>
              <span className="text-[9px] uppercase tracking-wider text-[#F6F0E7]/80 font-bold hidden sm:block">
                Duct Cleaning
              </span>
            </div>
          </a>

          {/* ================= CENTER: DESKTOP NAVIGATION LINKS ================= */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            
            {/* Home */}
            <button
              onClick={() => handleLinkClick('home')}
              className={`text-xs lg:text-sm font-semibold transition-all px-3 py-1.5 rounded-full cursor-pointer ${
                activeSection === 'home'
                  ? 'bg-white/15 text-[#FFFDF9] font-bold shadow-inner'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              Home
            </button>

            {/* About Us */}
            <button
              onClick={() => handleLinkClick('about')}
              className={`text-xs lg:text-sm font-semibold transition-all px-3 py-1.5 rounded-full cursor-pointer ${
                activeSection === 'about'
                  ? 'bg-white/15 text-[#FFFDF9] font-bold shadow-inner'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              About Us
            </button>

            {/* Services (Dropdown) */}
            <div className="relative" ref={servicesDropdownRef}>
              <button
                onClick={() => {
                  setServicesDropdownOpen(!servicesDropdownOpen);
                  setAreasDropdownOpen(false);
                }}
                className={`inline-flex items-center gap-1 text-xs lg:text-sm font-semibold transition-all px-3 py-1.5 rounded-full cursor-pointer ${
                  activeSection === 'services' || servicesDropdownOpen
                    ? 'bg-white/15 text-[#FFFDF9] font-bold shadow-inner'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
                aria-expanded={servicesDropdownOpen}
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    servicesDropdownOpen ? 'rotate-180 text-[#D94D78]' : 'text-white/70'
                  }`}
                />
              </button>

              {/* Services Dropdown Panel */}
              {servicesDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 bg-[#542B16]/95 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl p-2.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1.5 border-b border-white/10 mb-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#F6F0E7]/70">
                      Certified Cleaning Care
                    </span>
                  </div>
                  {serviceOptions.map((opt) => (
                    <button
                      key={opt.name}
                      onClick={() => handleServiceSelect(opt.name)}
                      className="w-full px-3 py-2 flex items-start gap-2.5 rounded-xl hover:bg-white/10 text-left transition-colors group cursor-pointer"
                    >
                      <div className="p-1 rounded-lg bg-white/10 border border-white/15 group-hover:border-[#D94D78] shrink-0 mt-0.5">
                        {opt.icon}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white group-hover:text-[#D94D78] block transition-colors">
                          {opt.name}
                        </span>
                        <span className="text-[10px] text-white/60 block leading-tight">
                          {opt.desc}
                        </span>
                      </div>
                    </button>
                  ))}
                  <div className="mt-1 pt-1.5 border-t border-white/10 px-3">
                    <button
                      onClick={() => handleLinkClick('services')}
                      className="text-[11px] font-bold text-[#D94D78] hover:underline cursor-pointer flex items-center justify-between w-full"
                    >
                      <span>Explore all 4 services</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Service Areas (Dropdown) */}
            <div className="relative" ref={areasDropdownRef}>
              <button
                onClick={() => {
                  setAreasDropdownOpen(!areasDropdownOpen);
                  setServicesDropdownOpen(false);
                }}
                className={`inline-flex items-center gap-1 text-xs lg:text-sm font-semibold transition-all px-3 py-1.5 rounded-full cursor-pointer ${
                  activeSection === 'availability' || areasDropdownOpen
                    ? 'bg-white/15 text-[#FFFDF9] font-bold shadow-inner'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
                aria-expanded={areasDropdownOpen}
              >
                <span>Service Areas</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    areasDropdownOpen ? 'rotate-180 text-[#D94D78]' : 'text-white/70'
                  }`}
                />
              </button>

              {/* Areas Dropdown Panel */}
              {areasDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 bg-[#542B16]/95 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl p-2.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  {serviceAreas.map((area, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleLinkClick('availability')}
                      className="w-full px-3 py-1.5 text-xs font-medium text-white/90 hover:bg-white/10 hover:text-[#D94D78] rounded-lg text-left transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D94D78] shrink-0" />
                      <span className="truncate">{area}</span>
                    </button>
                  ))}
                  <div className="mt-1 pt-1.5 border-t border-white/10 px-3">
                    <button
                      onClick={() => handleLinkClick('availability')}
                      className="text-[11px] font-bold text-[#D94D78] hover:underline cursor-pointer"
                    >
                      Check Your ZIP Code →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* FAQ */}
            <button
              onClick={() => handleLinkClick('faq')}
              className={`text-xs lg:text-sm font-semibold transition-all px-3 py-1.5 rounded-full cursor-pointer ${
                activeSection === 'faq'
                  ? 'bg-white/15 text-[#FFFDF9] font-bold shadow-inner'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              FAQ
            </button>

          </nav>

          {/* ================= RIGHT: PROMINENT ROUNDED "BOOK NOW" BUTTON ================= */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2 rounded-full bg-[#D94D78] hover:bg-[#C53B64] active:bg-[#b02f54] text-white font-black text-xs sm:text-sm tracking-wide shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer group whitespace-nowrap"
            >
              <span>Book Now</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-8 h-8 flex items-center justify-center rounded-full text-white hover:bg-white/10 active:bg-white/20 transition-colors focus:outline-none"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#D94D78]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* ================= MOBILE FLOATING DROPDOWN PANEL ================= */}
        {mobileMenuOpen && (
          <div className="pointer-events-auto md:hidden w-full max-w-sm mt-2 bg-[#542B16]/98 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-4 animate-in fade-in slide-in-from-top-2 duration-200 text-white">
            <nav className="flex flex-col gap-1.5">
              
              <div className="flex items-center justify-between pb-2 mb-1 border-b border-white/10">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#F6F0E7]/70 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#D94D78]" />
                  <span>Navigation</span>
                </span>
                <span className="text-[10px] text-white/50">Rosewood Air Care</span>
              </div>

              {/* Main Links */}
              <button
                onClick={() => handleLinkClick('home')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-bold transition-colors flex items-center justify-between ${
                  activeSection === 'home' ? 'bg-white/15 text-white' : 'text-white/80 hover:bg-white/10'
                }`}
              >
                <span>Home</span>
                <span className="text-xs text-white/40">→</span>
              </button>

              <button
                onClick={() => handleLinkClick('about')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-bold transition-colors flex items-center justify-between ${
                  activeSection === 'about' ? 'bg-white/15 text-white' : 'text-white/80 hover:bg-white/10'
                }`}
              >
                <span>About Us</span>
                <span className="text-xs text-white/40">→</span>
              </button>

              {/* Mobile Services Accordion */}
              <div className="bg-white/5 p-3 rounded-2xl border border-white/10 my-1">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#F6F0E7] block mb-2 px-1">
                  Our 4 Certified Services
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  {serviceOptions.map((opt) => (
                    <button
                      key={opt.name}
                      onClick={() => handleServiceSelect(opt.name)}
                      className="p-2 rounded-xl bg-white/10 hover:bg-white/15 text-left font-bold text-white flex items-center gap-2 transition-colors"
                    >
                      <div className="p-1 rounded-md bg-[#542B16] shrink-0">
                        {opt.icon}
                      </div>
                      <span className="text-[11px] leading-tight truncate">{opt.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleLinkClick('availability')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-bold transition-colors flex items-center justify-between ${
                  activeSection === 'availability' ? 'bg-white/15 text-white' : 'text-white/80 hover:bg-white/10'
                }`}
              >
                <span>Service Areas (50-Mile Radius)</span>
                <span className="text-xs text-[#D94D78]">Check ZIP</span>
              </button>

              <button
                onClick={() => handleLinkClick('faq')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-bold transition-colors flex items-center justify-between ${
                  activeSection === 'faq' ? 'bg-white/15 text-white' : 'text-white/80 hover:bg-white/10'
                }`}
              >
                <span>FAQ (Frequently Asked Questions)</span>
                <span className="text-xs text-white/40">→</span>
              </button>

              {/* Full Width Booking CTA */}
              <div className="pt-2 mt-1 border-t border-white/10">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="w-full py-3 rounded-full bg-[#D94D78] hover:bg-[#C53B64] text-white font-black text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
                >
                  <span>Book Service Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </nav>
          </div>
        )}

      </div>
    </header>
  );
};
