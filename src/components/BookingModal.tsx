import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, MapPin, Phone, User, Wrench, MessageSquare, CheckCircle2, Instagram, ArrowRight, ShieldCheck, Mail, AlertCircle } from 'lucide-react';
import { ServiceType } from '../types';
import { TimePicker } from './TimePicker';
import { ensureEmailJSInitialized, submitBookingViaEmailJS } from '../services/emailBookingService';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: ServiceType;
  initialAddress?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialService = 'Air Duct Cleaning',
  initialAddress = '',
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    address: initialAddress,
    phone: '',
    email: '',
    service: initialService,
    preferredDate: '',
    preferredTime: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedSummary, setSubmittedSummary] = useState<{ id: string; formattedDate: string } | null>(null);

  useEffect(() => {
    ensureEmailJSInitialized();
  }, []);

  // Sync initial props when opened
  useEffect(() => {
    if (isOpen) {
      setSubmitError(null);
      if (initialService) {
        setFormData((prev) => ({ ...prev, service: initialService }));
      }
      if (initialAddress) {
        setFormData((prev) => ({ ...prev, address: initialAddress }));
      }
    }
  }, [isOpen, initialService, initialAddress]);

  // Lock background scrolling while modal is open
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validatePhone = (value: string): boolean => {
    const cleanDigits = value.replace(/\D/g, '');
    return cleanDigits.length >= 10;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value;
    const cleanDigits = input.replace(/\D/g, '').slice(0, 10);
    
    // Auto format: (XXX) XXX-XXXX
    let formatted = cleanDigits;
    if (cleanDigits.length > 6) {
      formatted = `(${cleanDigits.slice(0, 3)}) ${cleanDigits.slice(3, 6)}-${cleanDigits.slice(6)}`;
    } else if (cleanDigits.length > 3) {
      formatted = `(${cleanDigits.slice(0, 3)}) ${cleanDigits.slice(3)}`;
    } else if (cleanDigits.length > 0) {
      formatted = `(${cleanDigits}`;
    }

    setFormData((prev) => ({ ...prev, phone: formatted }));
    if (errors.phone) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.phone;
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your customer name.';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Please provide your full service address.';
    }

    const cleanDigits = formData.phone.replace(/\D/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (cleanDigits.length < 10) {
      newErrors.phone = 'Please enter a valid 10-digit phone number.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address (e.g. customer@example.com).';
    }

    if (!formData.preferredDate) {
      newErrors.preferredDate = 'Please select a preferred date.';
    }

    if (!formData.preferredTime.trim()) {
      newErrors.preferredTime = 'Please select your preferred arrival time.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const { bookingId, formattedDate } = await submitBookingViaEmailJS({
        fullName: formData.fullName,
        address: formData.address,
        phone: formData.phone,
        email: formData.email,
        service: formData.service,
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,
        message: formData.message,
      });

      // Save request to localStorage so customer booking is recorded
      try {
        const stored = localStorage.getItem('rosewood_booking_requests');
        const requests = stored ? JSON.parse(stored) : [];
        const newEntry = {
          id: bookingId,
          timestamp: new Date().toISOString(),
          ...formData,
        };
        requests.unshift(newEntry);
        localStorage.setItem('rosewood_booking_requests', JSON.stringify(requests));
      } catch {
        // Ignore localStorage errors
      }

      setSubmittedSummary({ id: bookingId, formattedDate });
      setIsSubmitted(true);
    } catch {
      setSubmitError('Sorry, your booking request could not be sent. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setSubmittedSummary(null);
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
    onClose();
  };

  // Get tomorrow's date string as minimum date for booking
  const today = new Date();
  const minDate = today.toISOString().split('T')[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      <div className="relative w-full max-w-xl max-h-[92vh] flex flex-col bg-[#FAF6F0] rounded-3xl border-2 border-[#75401F]/20 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Top Header Bar */}
        <div className="relative px-6 pt-6 pb-4 sm:px-8 sm:pt-7 sm:pb-5 border-b border-[#75401F]/15 bg-[#F6F0E7]">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#542B16] flex items-center justify-center border border-[#75401F]/20 shadow-sm transition-transform active:scale-95 cursor-pointer"
            aria-label="Close booking popup"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Eyebrow Seal */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#542B16] text-[#F6F0E7] text-[10px] sm:text-xs font-black uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-[#D94D78] shrink-0" />
            <span>Rosewood Direct Scheduling</span>
          </div>

          <h3
            id="booking-modal-title"
            className="font-display text-xl sm:text-2xl lg:text-3xl font-black text-[#542B16] tracking-tight leading-tight"
          >
            Schedule Your Cleaning Service
          </h3>
          <p className="text-xs sm:text-sm text-[#352319]/80 mt-1 font-medium leading-relaxed">
            Tell us about your cleaning needs. Our team will help you schedule your appointment.
          </p>
        </div>

        {/* Modal Body / Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-6 sm:p-8 bg-[#FAF6F0]">
          {isSubmitted ? (
            /* ================= SUCCESS STATE ================= */
            <div className="text-center py-4 sm:py-6 space-y-5 animate-in fade-in duration-300">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-100 border-2 border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-9 h-9 sm:w-11 sm:h-11" />
              </div>

              <div>
                <h4 className="font-display text-xl sm:text-2xl font-black text-[#542B16] leading-snug">
                  Thank You for Choosing Rosewood Duct Cleaning!
                </h4>
                <p className="text-xs sm:text-sm text-[#352319]/85 mt-2 max-w-md mx-auto leading-relaxed">
                  Your booking request has been successfully submitted. Our team will contact you soon.
                </p>
              </div>

              {/* Booking Request Summary Card */}
              <div className="bg-[#FFFDF9] rounded-2xl p-4 sm:p-5 border border-[#75401F]/15 text-left space-y-2.5 text-xs text-[#352319] shadow-sm max-w-md mx-auto">
                <div className="flex justify-between border-b border-[#75401F]/10 pb-2">
                  <span className="text-[#75401F] font-bold uppercase tracking-wider text-[10px]">Customer</span>
                  <span className="font-bold text-[#542B16]">{formData.fullName}</span>
                </div>
                <div className="flex justify-between border-b border-[#75401F]/10 pb-2">
                  <span className="text-[#75401F] font-bold uppercase tracking-wider text-[10px]">Email</span>
                  <span className="font-semibold text-[#542B16] truncate max-w-[200px]">{formData.email}</span>
                </div>
                <div className="flex justify-between border-b border-[#75401F]/10 pb-2">
                  <span className="text-[#75401F] font-bold uppercase tracking-wider text-[10px]">Service</span>
                  <span className="font-bold text-[#D94D78]">{formData.service}</span>
                </div>
                <div className="flex justify-between border-b border-[#75401F]/10 pb-2">
                  <span className="text-[#75401F] font-bold uppercase tracking-wider text-[10px]">Phone</span>
                  <span className="font-semibold text-[#542B16]">{formData.phone}</span>
                </div>
                <div className="flex justify-between border-b border-[#75401F]/10 pb-2">
                  <span className="text-[#75401F] font-bold uppercase tracking-wider text-[10px]">Service Address</span>
                  <span className="font-medium text-[#542B16] text-right max-w-[220px] truncate">{formData.address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#75401F] font-bold uppercase tracking-wider text-[10px]">Preferred Arrival</span>
                  <span className="font-semibold text-[#542B16]">
                    {submittedSummary?.formattedDate || formData.preferredDate} &bull; {formData.preferredTime}
                  </span>
                </div>
              </div>

              {/* Instagram Direct Message Option */}
              <div className="pt-2 max-w-md mx-auto">
                <p className="text-[11px] text-[#352319]/70 mb-2 font-medium">
                  Want an immediate reply or have photos to share?
                </p>
                <a
                  href="https://ig.me/m/rosewoodductcleaning"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-[#542B16] hover:bg-[#75401F] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md group"
                >
                  <Instagram className="w-4 h-4 text-[#D94D78] group-hover:scale-110 transition-transform" />
                  <span>MESSAGE US ON INSTAGRAM</span>
                </a>
              </div>

              {/* Done Button */}
              <div className="pt-2">
                <button
                  onClick={handleResetAndClose}
                  className="px-8 py-3 rounded-full bg-[#F6F0E7] hover:bg-[#ebdccb] text-[#542B16] font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer border border-[#75401F]/20"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            /* ================= BOOKING FORM ================= */
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              
              {/* Row on sm+: Customer Name & Phone Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Customer Name */}
                <div>
                  <label className="block text-[11px] sm:text-xs font-black uppercase tracking-wider text-[#542B16] mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#D94D78]" />
                    <span>Customer Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => {
                      setFormData({ ...formData, fullName: e.target.value });
                      if (errors.fullName) setErrors({ ...errors, fullName: '' });
                    }}
                    placeholder="e.g. Michael Henderson"
                    className={`w-full px-4 py-3 rounded-xl bg-[#FFFDF9] border text-xs sm:text-sm font-semibold text-[#352319] focus:outline-none focus:ring-2 focus:ring-[#D94D78] transition-all min-h-[46px] ${
                      errors.fullName ? 'border-red-500 ring-1 ring-red-500' : 'border-[#75401F]/25'
                    }`}
                  />
                  {errors.fullName && <p className="text-[11px] text-red-600 font-bold mt-1">{errors.fullName}</p>}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-[11px] sm:text-xs font-black uppercase tracking-wider text-[#542B16] mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#D94D78]" />
                    <span>Phone Number *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    inputMode="tel"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    placeholder="(555) 000-0000"
                    className={`w-full px-4 py-3 rounded-xl bg-[#FFFDF9] border text-xs sm:text-sm font-semibold text-[#352319] focus:outline-none focus:ring-2 focus:ring-[#D94D78] transition-all min-h-[46px] ${
                      errors.phone ? 'border-red-500 ring-1 ring-red-500' : 'border-[#75401F]/25'
                    }`}
                  />
                  {errors.phone && <p className="text-[11px] text-red-600 font-bold mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Email Address (Directly below Customer Name and Phone Number) */}
              <div>
                <label className="block text-[11px] sm:text-xs font-black uppercase tracking-wider text-[#542B16] mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#D94D78]" />
                  <span>EMAIL ADDRESS *</span>
                </label>
                <input
                  type="email"
                  required
                  inputMode="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                  placeholder="e.g. customer@example.com"
                  className={`w-full px-4 py-3 rounded-xl bg-[#FFFDF9] border text-xs sm:text-sm font-semibold text-[#352319] focus:outline-none focus:ring-2 focus:ring-[#D94D78] transition-all min-h-[46px] ${
                    errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-[#75401F]/25'
                  }`}
                />
                {errors.email && <p className="text-[11px] text-red-600 font-bold mt-1">{errors.email}</p>}
              </div>

              {/* Full Service Address */}
              <div>
                <label className="block text-[11px] sm:text-xs font-black uppercase tracking-wider text-[#542B16] mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#D94D78]" />
                  <span>Full Service Address *</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => {
                    setFormData({ ...formData, address: e.target.value });
                    if (errors.address) setErrors({ ...errors, address: '' });
                  }}
                  placeholder="1234 Maple Creek Drive, City, State, ZIP"
                  className={`w-full px-4 py-3 rounded-xl bg-[#FFFDF9] border text-xs sm:text-sm font-semibold text-[#352319] focus:outline-none focus:ring-2 focus:ring-[#D94D78] transition-all min-h-[46px] ${
                    errors.address ? 'border-red-500 ring-1 ring-red-500' : 'border-[#75401F]/25'
                  }`}
                />
                {errors.address && <p className="text-[11px] text-red-600 font-bold mt-1">{errors.address}</p>}
              </div>

              {/* Field 4: Select Service (Dropdown) */}
              <div>
                <label className="block text-[11px] sm:text-xs font-black uppercase tracking-wider text-[#542B16] mb-1.5 flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5 text-[#D94D78]" />
                  <span>4. Select Service *</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value as ServiceType })}
                    className="w-full px-4 py-3 rounded-xl bg-[#FFFDF9] border border-[#75401F]/25 text-xs sm:text-sm font-bold text-[#542B16] focus:outline-none focus:ring-2 focus:ring-[#D94D78] transition-all appearance-none cursor-pointer min-h-[46px]"
                  >
                    <option value="Air Duct Cleaning">Air Duct Cleaning (Rotary Brush & HEPA Extraction)</option>
                    <option value="Dryer Vent Cleaning">Dryer Vent Cleaning (Lint Clearing & Fire Safety)</option>
                    <option value="HVAC Cleaning">HVAC Cleaning (Blower, Evaporator Coil & Pan Care)</option>
                    <option value="Chimney Cleaning">Chimney Cleaning (Flue Sweep & Creosote Removal)</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-[#75401F]">
                    <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Row: Field 5 (Preferred Date) & Field 6 (Preferred Time) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Field 5: Preferred Date */}
                <div>
                  <label className="block text-[11px] sm:text-xs font-black uppercase tracking-wider text-[#542B16] mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#D94D78]" />
                    <span>5. Preferred Date *</span>
                  </label>
                  <input
                    type="date"
                    min={minDate}
                    required
                    value={formData.preferredDate}
                    onChange={(e) => {
                      setFormData({ ...formData, preferredDate: e.target.value });
                      if (errors.preferredDate) setErrors({ ...errors, preferredDate: '' });
                    }}
                    className={`w-full px-4 py-3 rounded-xl bg-[#FFFDF9] border text-xs sm:text-sm font-semibold text-[#352319] focus:outline-none focus:ring-2 focus:ring-[#D94D78] transition-all min-h-[46px] ${
                      errors.preferredDate ? 'border-red-500 ring-1 ring-red-500' : 'border-[#75401F]/25'
                    }`}
                  />
                  {errors.preferredDate && <p className="text-[11px] text-red-600 font-bold mt-1">{errors.preferredDate}</p>}
                </div>

                {/* Field 6: Preferred Arrival Time */}
                <div>
                  <label htmlFor="modal-preferredTime" className="block text-[11px] sm:text-xs font-black uppercase tracking-wider text-[#542B16] mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#D94D78]" />
                    <span>PREFERRED ARRIVAL TIME *</span>
                  </label>
                  <TimePicker
                    id="modal-preferredTime"
                    value={formData.preferredTime}
                    onChange={(val) => {
                      setFormData({ ...formData, preferredTime: val });
                      if (errors.preferredTime) setErrors({ ...errors, preferredTime: '' });
                    }}
                    error={errors.preferredTime}
                    placeholder="Select arrival time (e.g. 09:30 AM)"
                  />
                  {errors.preferredTime && <p className="text-[11px] text-red-600 font-bold mt-1">{errors.preferredTime}</p>}
                </div>
              </div>

              {/* Field 7: Additional Message / Describe Your Problem */}
              <div>
                <label className="block text-[11px] sm:text-xs font-black uppercase tracking-wider text-[#542B16] mb-1.5 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-[#D94D78]" />
                  <span>7. Additional Message / Describe Your Problem</span>
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Please describe your cleaning needs or any problems you are experiencing..."
                  className="w-full px-4 py-3 rounded-xl bg-[#FFFDF9] border border-[#75401F]/25 text-xs sm:text-sm font-normal text-[#352319] focus:outline-none focus:ring-2 focus:ring-[#D94D78] transition-all resize-y"
                />
              </div>

              {/* Error Message Banner */}
              {submitError && (
                <div
                  role="alert"
                  className="p-3.5 rounded-xl bg-red-50 border border-red-300 text-red-800 text-xs font-semibold flex items-start gap-2.5"
                >
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>{submitError}</span>
                </div>
              )}

              {/* Prominent Pink Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-[#D94D78] hover:bg-[#C53B64] active:bg-[#b02f54] text-white font-black text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all active:scale-[0.99] cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed min-h-[50px]"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin shrink-0" />
                      <span>Submitting Booking Request...</span>
                    </>
                  ) : (
                    <>
                      <span>SUBMIT BOOKING REQUEST</span>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </>
                  )}
                </button>
              </div>

              {/* Trust Footer */}
              <div className="flex items-center justify-center gap-2 pt-1 text-[11px] text-[#352319]/70">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D94D78] shrink-0" />
                <span>Zero obligation &bull; Flat-rate pricing &bull; Friendly confirmation call</span>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
