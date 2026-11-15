import React, { useState, useEffect, useRef } from 'react';
import {
  Instagram,
  Menu,
  X,
  Home,
  Info,
  Wrench,
  MapPin,
  Award,
  HelpCircle,
  Calendar,
  ArrowUp,
} from 'lucide-react';
import { useScrollLock } from '../utils/scrollLock';

interface FloatingQuickActionsProps {
  onNavigate: (sectionId: string) => void;
  onOpenBooking: () => void;
}

export const FloatingQuickActions: React.FC<FloatingQuickActionsProps> = ({
  onNavigate,
  onOpenBooking,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useScrollLock(menuOpen);

  // Close menu when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  const handleSelectSection = (sectionId: string) => {
    setMenuOpen(false);
    requestAnimationFrame(() => {
      onNavigate(sectionId);
    });
  };

  const handleBookNow = () => {
    setMenuOpen(false);
    onOpenBooking();
  };

  const handleBackToTop = () => {
    setMenuOpen(false);
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  const navItems = [
    { label: 'Home', id: 'home', icon: <Home className="w-4 h-4 text-[#D94D78]" /> },
    { label: 'About Us', id: 'about', icon: <Info className="w-4 h-4 text-[#D94D78]" /> },
    { label: 'Services', id: 'services', icon: <Wrench className="w-4 h-4 text-[#D94D78]" /> },
    { label: 'Service Areas', id: 'availability', icon: <MapPin className="w-4 h-4 text-[#D94D78]" /> },
    { label: 'Why Choose Us', id: 'why-choose-rosewood', icon: <Award className="w-4 h-4 text-[#D94D78]" /> },
    { label: 'FAQ', id: 'faq', icon: <HelpCircle className="w-4 h-4 text-[#D94D78]" /> },
  ];

  return (
    <div
      ref={containerRef}
      className="fixed right-2.5 sm:right-5 top-[54%] -translate-y-1/2 z-40 flex items-center pointer-events-none"
      aria-label="Quick Contact and Navigation Widget"
    >
      {/* Expanded Compact Quick Navigation Menu */}
      {menuOpen && (
        <div
          role="menu"
          aria-label="Quick Navigation Menu"
          className="pointer-events-auto absolute right-full mr-2.5 sm:mr-3 w-56 sm:w-60 max-w-[calc(100vw-5rem)] max-h-[68vh] overflow-y-auto overscroll-contain no-scrollbar bg-[#FFFDF9]/98 backdrop-blur-xl rounded-2xl border border-[#75401F]/20 shadow-2xl p-2.5 animate-in fade-in zoom-in-95 slide-in-from-right-2 duration-150"
        >
          {/* Header with Small Close Icon */}
          <div className="flex items-center justify-between px-2.5 pb-2 mb-1.5 border-b border-[#75401F]/12">
            <span className="font-display text-xs font-black uppercase tracking-wider text-[#542B16]">
              Quick Menu
            </span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close quick menu"
              className="w-7 h-7 rounded-full bg-[#F6F0E7] hover:bg-[#ebdccb] text-[#542B16] flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Section Links */}
          <div className="space-y-0.5">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                role="menuitem"
                onClick={() => handleSelectSection(item.id)}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-[#542B16] hover:bg-[#F6F0E7] hover:text-[#D94D78] active:bg-[#ebdccb] transition-colors text-left cursor-pointer min-h-[40px]"
              >
                <span className="shrink-0">{item.icon}</span>
                <span className="truncate">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Action Buttons: Book Now & Back to Top */}
          <div className="mt-2 pt-2 border-t border-[#75401F]/12 space-y-1.5">
            <button
              type="button"
              role="menuitem"
              onClick={handleBookNow}
              className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-[#D94D78] hover:bg-[#C53B64] active:bg-[#b02f54] text-white font-black text-xs uppercase tracking-wider shadow-sm transition-colors cursor-pointer min-h-[42px]"
            >
              <Calendar className="w-3.5 h-3.5 shrink-0" />
              <span>Book Now</span>
            </button>

            <button
              type="button"
              role="menuitem"
              onClick={handleBackToTop}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-[#F6F0E7] hover:bg-[#ebdccb] text-[#542B16] font-bold text-xs transition-colors cursor-pointer min-h-[38px]"
            >
              <ArrowUp className="w-3.5 h-3.5 text-[#D94D78] shrink-0" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>
      )}

      {/* Right-Side Vertical Floating Pill Buttons */}
      <div className="pointer-events-auto flex flex-col items-end gap-2.5">
        
        {/* 1. Floating Instagram DM Button */}
        <a
          href="https://ig.me/m/rosewoodductcleaning"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram DM — Message Rosewood Duct Cleaning"
          className="group inline-flex items-center justify-center gap-2 w-11 h-11 sm:w-auto sm:h-auto sm:px-4 sm:py-2.5 rounded-full bg-[#542B16]/95 hover:bg-[#75401F] text-white border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-200 hover:-translate-x-0.5 active:scale-95 backdrop-blur-md"
        >
          <span className="w-7 h-7 sm:w-6 sm:h-6 rounded-full bg-[#D94D78] text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-200">
            <Instagram className="w-3.5 h-3.5" />
          </span>
          <span className="hidden sm:inline text-xs font-bold tracking-wide whitespace-nowrap">
            Instagram DM
          </span>
        </a>

        {/* 2. Floating Quick Menu Toggle Button */}
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? 'Close quick navigation menu' : 'Open quick navigation menu'}
          aria-expanded={menuOpen}
          aria-haspopup="menu"
          className={`group inline-flex items-center justify-center gap-2 w-11 h-11 sm:w-auto sm:h-auto sm:px-4 sm:py-2.5 rounded-full border shadow-xl hover:shadow-2xl transition-all duration-200 hover:-translate-x-0.5 active:scale-95 cursor-pointer backdrop-blur-md ${
            menuOpen
              ? 'bg-[#D94D78] border-white/30 text-white'
              : 'bg-[#542B16]/95 hover:bg-[#75401F] border-white/20 text-white'
          }`}
        >
          <span
            className={`w-7 h-7 sm:w-6 sm:h-6 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
              menuOpen
                ? 'bg-white text-[#D94D78]'
                : 'bg-white/15 text-[#D94D78] group-hover:bg-[#D94D78] group-hover:text-white'
            }`}
          >
            {menuOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
          </span>
          <span className="hidden sm:inline text-xs font-bold tracking-wide whitespace-nowrap">
            Quick Menu
          </span>
        </button>

      </div>
    </div>
  );
};
