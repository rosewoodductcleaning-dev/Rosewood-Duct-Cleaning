import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, MapPin, Phone, MessageSquare, CheckCircle, Send, RefreshCw, Layers, ChevronDown, ShieldCheck, Award, Instagram, Mail, AlertCircle } from 'lucide-react';
import { ServiceType, BookingFormData } from '../types';
import { TimePicker } from './TimePicker';
import { ensureEmailJSInitialized, submitBookingViaEmailJS } from '../services/emailBookingService';

interface BookingFormProps {
  selectedService: ServiceType;
  prefilledZip?: string;
  onServiceChange: (service: ServiceType) => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  selectedService,
  prefilledZip,
  onServiceChange,
}) => {
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    address: prefilledZip ? `ZIP ${prefilledZip}` : '',
    phone: '',
    email: '',
    service: selectedService,
    preferredDate: '',
    preferredTime: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedBooking, setSubmittedBooking] = useState<{
    id: string;
    data: BookingFormData;
    time: string;
  } | null>(null);

  useEffect(() => {
    ensureEmailJSInitialized();
  }, []);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, service: selectedService }));
  }, [selectedService]);

  useEffect(() => {
    if (prefilledZip) {
      setFormData((prev) => ({
        ...prev,
        address: prev.address ? `${prev.address} (ZIP ${prefilledZip})` : `ZIP: ${prefilledZip}`,
      }));
    }
  }, [prefilledZip]);

  const serviceOptions: ServiceType[] = [
    'Air Duct Cleaning',
    'Dryer Vent Cleaning',
    'HVAC Cleaning',
    'Chimney Cleaning',
  ];

  const validate = () => {
    const err: Partial<Record<keyof BookingFormData, string>> = {};

    if (!formData.fullName.trim()) {
      err.fullName = 'Full name is required.';
    } else if (formData.fullName.trim().length < 2) {
      err.fullName = 'Name must be at least 2 characters.';
    }

    if (!formData.address.trim()) {
      err.address = 'Service address is required.';
    }

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!formData.phone.trim()) {
      err.phone = 'Phone number is required.';
    } else if (cleanPhone.length < 10) {
      err.phone = 'Please provide a valid 10-digit phone number.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email?.trim()) {
      err.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      err.email = 'Please provide a valid email address (e.g. customer@example.com).';
    }

    if (!formData.service) {
      err.service = 'Please select a service.';
    }

    if (!formData.preferredDate) {
      err.preferredDate = 'Please select your preferred date.';
    }

    if (!formData.preferredTime?.trim()) {
      err.preferredTime = 'Please select your preferred arrival time.';
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const { bookingId, formattedDate } = await submitBookingViaEmailJS(formData);
      setSubmittedBooking({
        id: bookingId,
        data: { ...formData, preferredDate: formattedDate },
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
    } catch {
      setSubmitError('Sorry, your booking request could not be sent. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedBooking(null);
    setSubmitError(null);
    setFormData({
      fullName: '',
      address: '',
      phone: '',
      email: '',
      service: 'Air Duct Cleaning',
      preferredDate: '',
      preferredTime: '',
      message: '',
    });
    setErrors({});
  };

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <section id="booking" className="py-14 sm:py-20 lg:py-28 bg-[#FFFDF9] relative border-t border-[#75401F]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Success Confirmation Modal State */}
        {submittedBooking ? (
          <div className="max-w-3xl mx-auto rounded-3xl bg-[#F6F0E7] border-2 border-[#75401F]/30 p-6 sm:p-12 shadow-2xl animate-in fade-in zoom-in-95 duration-300">
            <div className="text-center max-w-xl mx-auto">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-300 shadow-sm shrink-0">
                <CheckCircle className="w-10 h-10" />
              </div>

              <span className="inline-block px-3.5 py-1 rounded-full bg-[#FFFDF9] text-[#542B16] text-xs font-bold uppercase tracking-wider border border-[#75401F]/20 mb-3">
                Booking ID: {submittedBooking.id}
              </span>

              <h3 className="font-display text-2xl sm:text-3xl font-black text-[#542B16] mb-2 leading-tight">
                Thank You for Choosing Rosewood Duct Cleaning!
              </h3>

              <p className="text-xs sm:text-sm font-semibold text-[#D94D78] mb-6">
                Your booking request has been successfully submitted. Our team will contact you soon.
              </p>

              {/* Summary Card */}
              <div className="bg-[#FFFDF9] rounded-2xl p-5 sm:p-6 border border-[#75401F]/20 text-left mb-6 shadow-sm space-y-3">
                <div className="flex justify-between items-center pb-2.5 border-b border-[#75401F]/10">
                  <span className="text-xs font-black uppercase tracking-wider text-[#75401F]">
                    Confirmed Request Summary
                  </span>
                  <span className="text-xs text-[#352319]/60">{submittedBooking.time}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div>
                    <span className="text-[#352319]/60 block text-[10px] uppercase font-bold">Customer</span>
                    <span className="font-bold text-[#542B16]">{submittedBooking.data.fullName}</span>
                  </div>
                  <div>
                    <span className="text-[#352319]/60 block text-[10px] uppercase font-bold">Phone</span>
                    <span className="font-bold text-[#542B16]">{submittedBooking.data.phone}</span>
                  </div>
                  <div>
                    <span className="text-[#352319]/60 block text-[10px] uppercase font-bold">Email</span>
                    <span className="font-bold text-[#542B16] truncate block">{submittedBooking.data.email}</span>
                  </div>
                  <div>
                    <span className="text-[#352319]/60 block text-[10px] uppercase font-bold">Service</span>
                    <span className="font-bold text-[#D94D78]">{submittedBooking.data.service}</span>
                  </div>
                  <div>
                    <span className="text-[#352319]/60 block text-[10px] uppercase font-bold">Preferred Arrival</span>
                    <span className="font-bold text-[#542B16]">
                      {submittedBooking.data.preferredDate} &bull; {submittedBooking.data.preferredTime}
                    </span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-[#352319]/60 block text-[10px] uppercase font-bold">Service Address</span>
                    <span className="font-medium text-[#352319]">{submittedBooking.data.address}</span>
                  </div>
                  {submittedBooking.data.message && (
                    <div className="sm:col-span-2 pt-2 border-t border-[#75401F]/10">
                      <span className="text-[#352319]/60 block text-[10px] uppercase font-bold">Problem Notes</span>
                      <p className="italic text-xs text-[#352319]/80 mt-0.5">"{submittedBooking.data.message}"</p>
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={handleReset}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#542B16] hover:bg-[#75401F] text-white font-bold text-sm shadow-md transition-all active:scale-[0.98] cursor-pointer min-h-[48px]"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Submit Another Request</span>
              </button>
            </div>
          </div>
        ) : (
          /* Full-Width 12-Column Balanced Architecture */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Heading, Value Props & Dispatch Hotline */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-[#F6F0E7] text-[#75401F] text-[11px] sm:text-xs font-black uppercase tracking-widest mb-3.5">
                  <span className="w-2 h-2 rounded-full bg-[#D94D78]" />
                  <span>Priority Scheduling Desk</span>
                </div>

                <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-black text-[#542B16] tracking-tight mb-3 sm:mb-4 leading-tight">
                  Schedule Your Cleaning Service
                </h2>

                <p className="text-xs sm:text-base text-[#352319]/80 leading-relaxed font-normal mb-6">
                  Tell us a little about your cleaning needs, and our dispatch team will reserve your arrival window with zero hassle.
                </p>
              </div>

              {/* Three Dispatch Trust Pillars */}
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-[#F6F0E7] border border-[#75401F]/15 flex items-start gap-3.5">
                  <Clock className="w-5 h-5 text-[#D94D78] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-black text-[#542B16] uppercase tracking-wide">Punctual Arrival Windows</h4>
                    <p className="text-xs text-[#352319]/75 mt-0.5">30-minute advance heads-up call before technician arrival.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#F6F0E7] border border-[#75401F]/15 flex items-start gap-3.5">
                  <ShieldCheck className="w-5 h-5 text-[#D94D78] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-black text-[#542B16] uppercase tracking-wide">Transparent Flat-Rate Pricing</h4>
                    <p className="text-xs text-[#352319]/75 mt-0.5">Clear upfront estimates with zero hidden fees or surprise add-ons.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#F6F0E7] border border-[#75401F]/15 flex items-start gap-3.5">
                  <Award className="w-5 h-5 text-[#D94D78] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-black text-[#542B16] uppercase tracking-wide">100% Satisfaction Guarantee</h4>
                    <p className="text-xs text-[#352319]/75 mt-0.5">Dedicated air care professionals committed to pristine results.</p>
                  </div>
                </div>
              </div>

              {/* Instagram Direct Message Dispatch Card */}
              <div className="p-5 rounded-2xl bg-[#542B16] text-white flex items-center justify-between gap-4 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#D94D78]">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#F6F0E7]/80 block">Prefer to message?</span>
                    <span className="text-sm sm:text-base font-black text-white">@rosewoodductcleaning</span>
                  </div>
                </div>
                <a
                  href="https://ig.me/m/rosewoodductcleaning"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-[#D94D78] hover:bg-[#C53B64] text-white font-black text-xs uppercase tracking-wider shrink-0 transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Message Us</span>
                </a>
              </div>
            </div>

            {/* Right Column: 7-Field Booking Form */}
            <div className="lg:col-span-7 w-full">
              <div className="rounded-3xl bg-[#F6F0E7] border-2 border-[#75401F]/20 p-5 sm:p-8 lg:p-9 shadow-xl">
                <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* 1. Customer Name */}
                    <div>
                      <label htmlFor="fullName" className="block text-[11px] sm:text-xs font-black uppercase tracking-wider text-[#542B16] mb-1.5 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-[#D94D78] shrink-0" />
                        <span>Customer Name *</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        autoComplete="name"
                        value={formData.fullName}
                        onChange={(e) => {
                          setFormData({ ...formData, fullName: e.target.value });
                          if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                        }}
                        placeholder="e.g. Catherine Morgan"
                        className={`w-full px-4 py-3.5 rounded-xl sm:rounded-2xl bg-[#FFFDF9] border ${
                          errors.fullName ? 'border-rose-500 ring-1 ring-rose-500' : 'border-[#75401F]/25'
                        } text-base sm:text-sm font-semibold text-[#352319] placeholder-[#352319]/40 focus:outline-none focus:ring-2 focus:ring-[#D94D78] transition-all min-h-[48px]`}
                      />
                      {errors.fullName && <p className="text-xs text-rose-600 font-bold mt-1.5">{errors.fullName}</p>}
                    </div>

                    {/* 2. Phone Number */}
                    <div>
                      <label htmlFor="phone" className="block text-[11px] sm:text-xs font-black uppercase tracking-wider text-[#542B16] mb-1.5 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-[#D94D78] shrink-0" />
                        <span>Phone Number *</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        autoComplete="tel"
                        inputMode="tel"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          if (errors.phone) setErrors({ ...errors, phone: undefined });
                        }}
                        placeholder="(555) 234-5678"
                        className={`w-full px-4 py-3.5 rounded-xl sm:rounded-2xl bg-[#FFFDF9] border ${
                          errors.phone ? 'border-rose-500 ring-1 ring-rose-500' : 'border-[#75401F]/25'
                        } text-base sm:text-sm font-semibold text-[#352319] placeholder-[#352319]/40 focus:outline-none focus:ring-2 focus:ring-[#D94D78] transition-all min-h-[48px]`}
                      />
                      {errors.phone && <p className="text-xs text-rose-600 font-bold mt-1.5">{errors.phone}</p>}
                    </div>
                  </div>

                  {/* Email Address (Directly below Customer Name and Phone Number) */}
                  <div>
                    <label htmlFor="email" className="block text-[11px] sm:text-xs font-black uppercase tracking-wider text-[#542B16] mb-1.5 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#D94D78] shrink-0" />
                      <span>EMAIL ADDRESS *</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      autoComplete="email"
                      inputMode="email"
                      value={formData.email || ''}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      placeholder="e.g. customer@example.com"
                      className={`w-full px-4 py-3.5 rounded-xl sm:rounded-2xl bg-[#FFFDF9] border ${
                        errors.email ? 'border-rose-500 ring-1 ring-rose-500' : 'border-[#75401F]/25'
                      } text-base sm:text-sm font-semibold text-[#352319] placeholder-[#352319]/40 focus:outline-none focus:ring-2 focus:ring-[#D94D78] transition-all min-h-[48px]`}
                    />
                    {errors.email && <p className="text-xs text-rose-600 font-bold mt-1.5">{errors.email}</p>}
                  </div>

                  {/* 3. Full Address */}
                  <div>
                    <label htmlFor="address" className="block text-[11px] sm:text-xs font-black uppercase tracking-wider text-[#542B16] mb-1.5 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#D94D78] shrink-0" />
                      <span>Full Service Address *</span>
                    </label>
                    <input
                      type="text"
                      id="address"
                      autoComplete="street-address"
                      value={formData.address}
                      onChange={(e) => {
                        setFormData({ ...formData, address: e.target.value });
                        if (errors.address) setErrors({ ...errors, address: undefined });
                      }}
                      placeholder="Street Address, City, State, ZIP Code"
                      className={`w-full px-4 py-3.5 rounded-xl sm:rounded-2xl bg-[#FFFDF9] border ${
                        errors.address ? 'border-rose-500 ring-1 ring-rose-500' : 'border-[#75401F]/25'
                      } text-base sm:text-sm font-semibold text-[#352319] placeholder-[#352319]/40 focus:outline-none focus:ring-2 focus:ring-[#D94D78] transition-all min-h-[48px]`}
                    />
                    {errors.address && <p className="text-xs text-rose-600 font-bold mt-1.5">{errors.address}</p>}
                  </div>

                  {/* 4. Service Selection Dropdown */}
                  <div>
                    <label htmlFor="service" className="block text-[11px] sm:text-xs font-black uppercase tracking-wider text-[#542B16] mb-1.5 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#D94D78] shrink-0" />
                      <span>Service Selection *</span>
                    </label>
                    <div className="relative">
                      <select
                        id="service"
                        value={formData.service}
                        onChange={(e) => {
                          const serv = e.target.value as ServiceType;
                          setFormData({ ...formData, service: serv });
                          onServiceChange(serv);
                          if (errors.service) setErrors({ ...errors, service: undefined });
                        }}
                        className={`w-full px-4 py-3.5 pr-10 rounded-xl sm:rounded-2xl bg-[#FFFDF9] border ${
                          errors.service ? 'border-rose-500 ring-1 ring-rose-500' : 'border-[#75401F]/25'
                        } text-base sm:text-sm font-bold text-[#542B16] focus:outline-none focus:ring-2 focus:ring-[#D94D78] transition-all appearance-none min-h-[48px] cursor-pointer`}
                      >
                        {serviceOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-[#75401F]">
                        <ChevronDown className="w-5 h-5" />
                      </div>
                    </div>
                    {errors.service && <p className="text-xs text-rose-600 font-bold mt-1.5">{errors.service}</p>}
                  </div>

                  {/* 5 & 6. Preferred Date & Preferred Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="preferredDate" className="block text-[11px] sm:text-xs font-black uppercase tracking-wider text-[#542B16] mb-1.5 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#D94D78] shrink-0" />
                        <span>Preferred Date *</span>
                      </label>
                      <input
                        type="date"
                        id="preferredDate"
                        min={todayStr}
                        value={formData.preferredDate}
                        onChange={(e) => {
                          setFormData({ ...formData, preferredDate: e.target.value });
                          if (errors.preferredDate) setErrors({ ...errors, preferredDate: undefined });
                        }}
                        className={`w-full px-4 py-3.5 rounded-xl sm:rounded-2xl bg-[#FFFDF9] border ${
                          errors.preferredDate ? 'border-rose-500 ring-1 ring-rose-500' : 'border-[#75401F]/25'
                        } text-base sm:text-sm font-semibold text-[#352319] focus:outline-none focus:ring-2 focus:ring-[#D94D78] transition-all min-h-[48px]`}
                      />
                      {errors.preferredDate && <p className="text-xs text-rose-600 font-bold mt-1.5">{errors.preferredDate}</p>}
                    </div>

                    <div>
                      <label htmlFor="preferredTime" className="block text-[11px] sm:text-xs font-black uppercase tracking-wider text-[#542B16] mb-1.5 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#D94D78] shrink-0" />
                        <span>PREFERRED ARRIVAL TIME *</span>
                      </label>
                      <TimePicker
                        id="preferredTime"
                        value={formData.preferredTime}
                        onChange={(val) => {
                          setFormData({ ...formData, preferredTime: val });
                          if (errors.preferredTime) setErrors({ ...errors, preferredTime: undefined });
                        }}
                        error={errors.preferredTime}
                        placeholder="Select arrival time (e.g. 09:30 AM)"
                      />
                      {errors.preferredTime && <p className="text-xs text-rose-600 font-bold mt-1.5">{errors.preferredTime}</p>}
                    </div>
                  </div>

                  {/* 7. Additional Message / Describe Your Problem */}
                  <div>
                    <label htmlFor="message" className="block text-[11px] sm:text-xs font-black uppercase tracking-wider text-[#542B16] mb-1.5 flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-[#D94D78] shrink-0" />
                      <span>Problem Description / Notes (Optional)</span>
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please describe your cleaning needs or any problems you are experiencing..."
                      className="w-full px-4 py-3.5 rounded-xl sm:rounded-2xl bg-[#FFFDF9] border border-[#75401F]/25 text-base sm:text-sm font-medium text-[#352319] placeholder-[#352319]/45 focus:outline-none focus:ring-2 focus:ring-[#D94D78] transition-all resize-y"
                    />
                  </div>

                  {/* Error Message Banner */}
                  {submitError && (
                    <div
                      role="alert"
                      className="p-3.5 sm:p-4 rounded-xl bg-rose-50 border border-rose-300 text-rose-800 text-xs sm:text-sm font-semibold flex items-start gap-2.5"
                    >
                      <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-rose-600 shrink-0 mt-0.5" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl sm:rounded-full bg-[#D94D78] hover:bg-[#C53B64] active:bg-[#b02f54] text-white font-black text-sm sm:text-base uppercase tracking-wider shadow-lg transition-all active:scale-[0.99] cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed min-h-[52px]"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin shrink-0" />
                          <span>Submitting Request...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                          <span>SUBMIT BOOKING REQUEST</span>
                        </>
                      )}
                    </button>
                    <p className="text-center text-[11px] sm:text-xs text-[#352319]/60 mt-2.5 font-medium">
                      A Rosewood dispatch coordinator will confirm your window prior to departure.
                    </p>
                  </div>

                </form>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
