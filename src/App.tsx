/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { ZipChecker } from './components/ZipChecker';
import { BookingForm } from './components/BookingForm';
import { AboutUs } from './components/AboutUs';
import { Testimonials } from './components/Testimonials';
import { WhyChooseRosewood } from './components/WhyChooseRosewood';
import { ServiceCoverageMap } from './components/ServiceCoverageMap';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { FloatingQuickActions } from './components/FloatingQuickActions';
import { ServiceType } from './types';
import { Instagram, Calendar } from 'lucide-react';

export default function App() {
  const [selectedService, setSelectedService] = useState<ServiceType>('Air Duct Cleaning');
  const [prefilledZip, setPrefilledZip] = useState<string | undefined>(undefined);
  
  // Popup Booking Modal State
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [modalService, setModalService] = useState<ServiceType>('Air Duct Cleaning');
  const [modalAddress, setModalAddress] = useState<string>('');

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Open the dedicated Booking Popup Modal from any trigger
  const openBookingModal = (service?: ServiceType, addressOrZip?: string) => {
    if (service) {
      setSelectedService(service);
      setModalService(service);
    }
    if (addressOrZip) {
      setPrefilledZip(addressOrZip);
      setModalAddress(addressOrZip);
    }
    setIsBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF9] text-[#352319] selection:bg-[#D94D78]/20 selection:text-[#542B16]">
      {/* 1. Floating Pill Navigation Bar */}
      <Navbar
        onOpenBooking={() => openBookingModal()}
        onNavigate={scrollToSection}
        onSelectService={(serv) => openBookingModal(serv)}
      />

      {/* Main Content Sections */}
      <main className="flex-1 pb-24 lg:pb-0">
        {/* 2. Hero Section */}
        <Hero
          onBookClick={() => openBookingModal()}
          onExploreServicesClick={() => scrollToSection('services')}
        />

        {/* 3. Our Services – All Four Service Cards */}
        <Services onSelectService={(serv) => openBookingModal(serv)} />

        {/* 4. Check Availability / ZIP Code Section */}
        <ZipChecker onProceedToBookingWithZip={(zip) => openBookingModal(undefined, zip)} />

        {/* 5. About Us Section */}
        <AboutUs onBookClick={() => openBookingModal()} />

        {/* 6. Why Choose Rosewood Section */}
        <WhyChooseRosewood />

        {/* 7. Customer Testimonials */}
        <Testimonials />

        {/* 8. Online Booking Section (Direct On-Page Interface) */}
        <BookingForm
          selectedService={selectedService}
          prefilledZip={prefilledZip}
          onServiceChange={(serv) => setSelectedService(serv)}
        />

        {/* 9. Interactive USA Service Coverage Map */}
        <ServiceCoverageMap
          onBookNow={(serv, locationText) => openBookingModal(serv, locationText)}
        />

        {/* 10. Premium FAQ Section */}
        <FAQSection onOpenBooking={() => openBookingModal()} />
      </main>

      {/* 10. Dark Walnut Brown Footer */}
      <Footer
        onNavigate={scrollToSection}
        onSelectService={(serv) => openBookingModal(serv)}
        onOpenBooking={() => openBookingModal()}
      />

      {/* Mobile Sticky Quick Action Bar (Instagram DM & Book Service) */}
      <div className="lg:hidden fixed bottom-3 inset-x-3 max-w-md mx-auto z-40 bg-[#542B16]/98 backdrop-blur-md p-2 rounded-2xl border border-white/20 shadow-2xl flex items-center justify-between gap-2.5">
        {/* Button 1: Instagram DM */}
        <a
          href="https://ig.me/m/rosewoodductcleaning"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-white/10 active:bg-white/20 text-white text-xs font-black transition-colors min-h-[46px] group"
          aria-label="Direct message Rosewood Duct Cleaning on Instagram"
        >
          <Instagram className="w-4 h-4 text-[#D94D78] shrink-0 group-hover:scale-110 transition-transform" />
          <span className="truncate">Instagram DM</span>
        </a>

        {/* Button 2: Book Service (Opens Booking Popup) */}
        <button
          onClick={() => openBookingModal()}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-[#D94D78] hover:bg-[#C53B64] active:bg-[#b02f54] text-white text-xs font-black uppercase tracking-wider transition-colors shadow-sm min-h-[46px] cursor-pointer"
        >
          <Calendar className="w-3.5 h-3.5 shrink-0" />
          <span>Book Service</span>
        </button>
      </div>

      {/* Floating Right-Side Instagram DM + Quick Navigation Menu */}
      <FloatingQuickActions
        onNavigate={scrollToSection}
        onOpenBooking={() => openBookingModal()}
      />

      {/* Dedicated Booking Popup Modal (Center screen, cream background, rose buttons, 7 fields) */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        initialService={modalService}
        initialAddress={modalAddress}
      />
    </div>
  );
}
