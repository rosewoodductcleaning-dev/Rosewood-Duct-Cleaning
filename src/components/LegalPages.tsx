import React from 'react';
import {
  ArrowLeft,
  FileText,
  ShieldCheck,
  Mail,
  Instagram,
  AlertCircle,
  Calendar,
  Lock,
  CheckCircle2,
} from 'lucide-react';

interface LegalPageProps {
  onBackHome: () => void;
  onNavigateLegal: (page: 'terms' | 'privacy') => void;
  onOpenBooking?: () => void;
}

export const TermsConditionsPage: React.FC<LegalPageProps> = ({
  onBackHome,
  onNavigateLegal,
  onOpenBooking,
}) => {
  return (
    <section className="py-10 sm:py-16 lg:py-20 bg-[#FFFDF9] min-h-[75vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Back Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 sm:mb-8">
          <button
            type="button"
            onClick={onBackHome}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#F6F0E7] hover:bg-[#ebdccb] text-[#542B16] font-bold text-xs sm:text-sm border border-[#75401F]/20 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#D94D78]" />
            <span>Back to Main Website</span>
          </button>

          <a
            href="/privacy-policy"
            onClick={(e) => {
              e.preventDefault();
              onNavigateLegal('privacy');
            }}
            className="text-xs sm:text-sm font-bold text-[#75401F] hover:text-[#D94D78] underline underline-offset-4 transition-colors"
          >
            View Privacy Policy →
          </a>
        </div>

        {/* Page Header Card */}
        <div className="rounded-3xl bg-[#F6F0E7] border-2 border-[#75401F]/20 p-6 sm:p-10 shadow-md mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#FFFDF9] border border-[#75401F]/20 text-[#542B16] text-[11px] sm:text-xs font-black uppercase tracking-widest mb-3">
            <FileText className="w-3.5 h-3.5 text-[#D94D78] shrink-0" />
            <span>Legal Information</span>
          </div>

          <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl font-black text-[#542B16] tracking-tight mb-3 leading-tight">
            Terms &amp; Conditions
          </h1>

          <p className="text-xs sm:text-base text-[#352319]/85 leading-relaxed max-w-2xl">
            Please review these Terms &amp; Conditions carefully before using the Rosewood Duct Cleaning website or submitting a cleaning service request.
          </p>

          <div className="mt-5 p-3.5 sm:p-4 rounded-2xl bg-[#FFFDF9] border border-[#75401F]/20 flex items-start gap-2.5 text-xs text-[#542B16]">
            <AlertCircle className="w-4 h-4 text-[#D94D78] shrink-0 mt-0.5" />
            <span>
              <strong>Business Confirmation Notice:</strong> Legal clauses marked as{' '}
              <em>[To be confirmed by Rosewood Duct Cleaning]</em> reflect standard placeholders where specific business terms (such as cancellation windows, payment methods, and governing jurisdiction) have not yet been published on the website.
            </span>
          </div>
        </div>

        {/* Structured Terms Content */}
        <div className="space-y-5 sm:space-y-6">
          <article className="rounded-2xl sm:rounded-3xl bg-white border border-[#75401F]/15 p-5 sm:p-8 shadow-xs">
            <h2 className="font-display text-lg sm:text-xl font-black text-[#542B16] mb-2.5">
              1. Website Usage
            </h2>
            <p className="text-xs sm:text-sm text-[#352319]/85 leading-relaxed">
              This website is operated for Rosewood Duct Cleaning to provide information about our residential Air Duct Cleaning, Dryer Vent Cleaning, HVAC Cleaning, and Chimney Cleaning services, allow visitors to explore service coverage, and submit online appointment requests. By accessing or using this website, you agree to use it solely for lawful personal or household inquiry purposes and not to submit false, misleading, or unauthorized booking requests.
            </p>
          </article>

          <article className="rounded-2xl sm:rounded-3xl bg-white border border-[#75401F]/15 p-5 sm:p-8 shadow-xs">
            <h2 className="font-display text-lg sm:text-xl font-black text-[#542B16] mb-2.5">
              2. Service Bookings &amp; Appointment Requests
            </h2>
            <div className="space-y-2.5 text-xs sm:text-sm text-[#352319]/85 leading-relaxed">
              <p>
                Submitting the online booking form or booking popup on this website creates a <strong>service booking request</strong>—it does not automatically guarantee or finalize an appointment slot.
              </p>
              <p>
                Once your request is submitted, a Rosewood Duct Cleaning coordinator will review your requested service, preferred date, preferred arrival time, and service address, and contact you directly (by phone, email, or Instagram Direct Message) to confirm availability and finalize your appointment window.
              </p>
              <p>
                Service availability indicators (including ZIP code checks and the USA coverage map) are informational tools; final dispatch eligibility is confirmed directly by our team based on your exact service address.
              </p>
            </div>
          </article>

          <article className="rounded-2xl sm:rounded-3xl bg-white border border-[#75401F]/15 p-5 sm:p-8 shadow-xs">
            <h2 className="font-display text-lg sm:text-xl font-black text-[#542B16] mb-2.5">
              3. Cancellations &amp; Rescheduling
            </h2>
            <div className="space-y-2.5 text-xs sm:text-sm text-[#352319]/85 leading-relaxed">
              <p>
                If you need to reschedule or cancel a requested or confirmed appointment, please notify our team as early as possible via email at{' '}
                <a
                  href="mailto:rosewoodductcleaning@gmail.com"
                  className="font-bold text-[#D94D78] hover:underline"
                >
                  rosewoodductcleaning@gmail.com
                </a>{' '}
                or through Instagram Direct Message at{' '}
                <a
                  href="https://ig.me/m/rosewoodductcleaning"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#D94D78] hover:underline"
                >
                  @rosewoodductcleaning
                </a>
                .
              </p>
              <p className="text-[#542B16] bg-[#FAF6F0] p-3 rounded-xl border border-[#75401F]/15">
                <strong>Specific Notice Window &amp; Cancellation Fee Policy:</strong>{' '}
                <em>[To be confirmed by Rosewood Duct Cleaning prior to or at appointment confirmation.]</em>
              </p>
            </div>
          </article>

          <article className="rounded-2xl sm:rounded-3xl bg-white border border-[#75401F]/15 p-5 sm:p-8 shadow-xs">
            <h2 className="font-display text-lg sm:text-xl font-black text-[#542B16] mb-2.5">
              4. Pricing Estimates &amp; Payments
            </h2>
            <div className="space-y-2.5 text-xs sm:text-sm text-[#352319]/85 leading-relaxed">
              <p>
                This website does not process online credit card payments or collect financial account numbers during booking request submission.
              </p>
              <p>
                Final service pricing and estimates depend on your property size, system layout, and selected services and are communicated directly with you by our team.
              </p>
              <p className="text-[#542B16] bg-[#FAF6F0] p-3 rounded-xl border border-[#75401F]/15">
                <strong>Accepted Payment Methods &amp; Payment Timing:</strong>{' '}
                <em>[To be confirmed by Rosewood Duct Cleaning — e.g., payment due upon service completion and accepted payment methods.]</em>
              </p>
            </div>
          </article>

          <article className="rounded-2xl sm:rounded-3xl bg-white border border-[#75401F]/15 p-5 sm:p-8 shadow-xs">
            <h2 className="font-display text-lg sm:text-xl font-black text-[#542B16] mb-2.5">
              5. Customer Responsibilities
            </h2>
            <ul className="space-y-2 text-xs sm:text-sm text-[#352319]/85 leading-relaxed">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D94D78] shrink-0 mt-0.5" />
                <span>
                  Provide accurate, truthful contact details (name, phone number, email address) and a complete service address when submitting a booking request.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D94D78] shrink-0 mt-0.5" />
                <span>
                  Keep areas around air vents, HVAC equipment, dryer connections, and chimney access points clear and accessible prior to technician arrival, as outlined in our FAQ preparation guidance.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D94D78] shrink-0 mt-0.5" />
                <span>
                  Ensure an authorized adult or property representative is available at the property during the scheduled arrival window or as otherwise arranged with our dispatch team.
                </span>
              </li>
            </ul>
          </article>

          <article className="rounded-2xl sm:rounded-3xl bg-white border border-[#75401F]/15 p-5 sm:p-8 shadow-xs">
            <h2 className="font-display text-lg sm:text-xl font-black text-[#542B16] mb-2.5">
              6. Contact &amp; Business Details
            </h2>
            <div className="space-y-2.5 text-xs sm:text-sm text-[#352319]/85 leading-relaxed">
              <p>
                If you have questions about these Terms &amp; Conditions or your service request, please contact Rosewood Duct Cleaning directly:
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <a
                  href="mailto:rosewoodductcleaning@gmail.com"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F6F0E7] hover:bg-[#ebdccb] text-[#542B16] font-bold text-xs border border-[#75401F]/20 transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#D94D78]" />
                  <span>rosewoodductcleaning@gmail.com</span>
                </a>
                <a
                  href="https://ig.me/m/rosewoodductcleaning"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#542B16] hover:bg-[#75401F] text-white font-bold text-xs transition-colors"
                >
                  <Instagram className="w-4 h-4 text-[#D94D78]" />
                  <span>@rosewoodductcleaning</span>
                </a>
              </div>
              <p className="text-[#542B16] bg-[#FAF6F0] p-3 rounded-xl border border-[#75401F]/15 mt-2">
                <strong>Registered Business Entity Address &amp; Governing Law State:</strong>{' '}
                <em>[To be confirmed by Rosewood Duct Cleaning.]</em>
              </p>
            </div>
          </article>
        </div>

        {/* Bottom Navigation Actions */}
        <div className="mt-8 pt-6 border-t border-[#75401F]/15 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBackHome}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#542B16] hover:bg-[#75401F] text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer min-h-[46px]"
          >
            <ArrowLeft className="w-4 h-4 text-[#D94D78]" />
            <span>Return to Main Website</span>
          </button>

          {onOpenBooking && (
            <button
              type="button"
              onClick={onOpenBooking}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#D94D78] hover:bg-[#C53B64] text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer min-h-[46px]"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Online Now</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export const PrivacyPolicyPage: React.FC<LegalPageProps> = ({
  onBackHome,
  onNavigateLegal,
  onOpenBooking,
}) => {
  return (
    <section className="py-10 sm:py-16 lg:py-20 bg-[#FFFDF9] min-h-[75vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Back Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 sm:mb-8">
          <button
            type="button"
            onClick={onBackHome}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#F6F0E7] hover:bg-[#ebdccb] text-[#542B16] font-bold text-xs sm:text-sm border border-[#75401F]/20 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#D94D78]" />
            <span>Back to Main Website</span>
          </button>

          <a
            href="/terms-and-conditions"
            onClick={(e) => {
              e.preventDefault();
              onNavigateLegal('terms');
            }}
            className="text-xs sm:text-sm font-bold text-[#75401F] hover:text-[#D94D78] underline underline-offset-4 transition-colors"
          >
            View Terms &amp; Conditions →
          </a>
        </div>

        {/* Page Header Card */}
        <div className="rounded-3xl bg-[#F6F0E7] border-2 border-[#75401F]/20 p-6 sm:p-10 shadow-md mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#FFFDF9] border border-[#75401F]/20 text-[#542B16] text-[11px] sm:text-xs font-black uppercase tracking-widest mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D94D78] shrink-0" />
            <span>Customer Privacy</span>
          </div>

          <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl font-black text-[#542B16] tracking-tight mb-3 leading-tight">
            Privacy Policy
          </h1>

          <p className="text-xs sm:text-base text-[#352319]/85 leading-relaxed max-w-2xl">
            This Privacy Policy explains what information Rosewood Duct Cleaning collects through this website&apos;s booking and availability forms, how it is used, how it is stored, and when third-party tools are involved.
          </p>

          <div className="mt-5 p-3.5 sm:p-4 rounded-2xl bg-[#FFFDF9] border border-[#75401F]/20 flex items-start gap-2.5 text-xs text-[#542B16]">
            <AlertCircle className="w-4 h-4 text-[#D94D78] shrink-0 mt-0.5" />
            <span>
              <strong>Business Confirmation Notice:</strong> Items marked as{' '}
              <em>[To be confirmed by Rosewood Duct Cleaning]</em> identify internal business retention or offline handling details that are not published on the website and should be confirmed directly by the business owner.
            </span>
          </div>
        </div>

        {/* Structured Privacy Content */}
        <div className="space-y-5 sm:space-y-6">
          <article className="rounded-2xl sm:rounded-3xl bg-white border border-[#75401F]/15 p-5 sm:p-8 shadow-xs">
            <h2 className="font-display text-lg sm:text-xl font-black text-[#542B16] mb-2.5">
              1. Information We Collect
            </h2>
            <p className="text-xs sm:text-sm text-[#352319]/85 leading-relaxed mb-3">
              When you voluntarily submit a service request through our on-page booking form or booking popup modal, we collect only the details you enter:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-[#352319]/85">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D94D78] shrink-0" />
                <span>Customer Name</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D94D78] shrink-0" />
                <span>Email Address</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D94D78] shrink-0" />
                <span>Phone Number</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D94D78] shrink-0" />
                <span>Full Service Address</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D94D78] shrink-0" />
                <span>Selected Service Type</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D94D78] shrink-0" />
                <span>Preferred Date &amp; Arrival Time</span>
              </li>
              <li className="flex items-center gap-2 sm:col-span-2">
                <CheckCircle2 className="w-4 h-4 text-[#D94D78] shrink-0" />
                <span>Additional Problem Notes / Message (optional)</span>
              </li>
            </ul>
            <p className="text-xs sm:text-sm text-[#352319]/85 leading-relaxed mt-3">
              If you use the ZIP Code availability lookup, the 5-digit ZIP code is checked directly in your browser and is only included in a booking request if you proceed to submit the booking form. This website does not require user accounts, passwords, or payment card entry.
            </p>
          </article>

          <article className="rounded-2xl sm:rounded-3xl bg-white border border-[#75401F]/15 p-5 sm:p-8 shadow-xs">
            <h2 className="font-display text-lg sm:text-xl font-black text-[#542B16] mb-2.5">
              2. How Your Information Is Used
            </h2>
            <p className="text-xs sm:text-sm text-[#352319]/85 leading-relaxed">
              Information submitted through our booking forms or sent to us via email or Instagram Direct Message is used solely to review your service request, verify service availability at your address, contact you to confirm scheduling details, and coordinate your requested cleaning service.
            </p>
          </article>

          <article className="rounded-2xl sm:rounded-3xl bg-white border border-[#75401F]/15 p-5 sm:p-8 shadow-xs">
            <h2 className="font-display text-lg sm:text-xl font-black text-[#542B16] mb-2.5">
              3. How Information Is Stored &amp; Protected
            </h2>
            <div className="space-y-2.5 text-xs sm:text-sm text-[#352319]/85 leading-relaxed">
              <p className="flex items-start gap-2">
                <Lock className="w-4 h-4 text-[#D94D78] shrink-0 mt-0.5" />
                <span>
                  <strong>Form Transmission:</strong> Booking request fields are transmitted securely over HTTPS using the <strong>EmailJS</strong> email delivery service so our team receives your booking notification.
                </span>
              </p>
              <p>
                <strong>Browser Storage:</strong> When submitting through the booking popup modal, a copy of your request summary may also be stored locally in your own web browser&apos;s <code className="px-1.5 py-0.5 rounded bg-[#F6F0E7] text-[#542B16] text-xs">localStorage</code> on your device. You can clear this anytime through your browser settings.
              </p>
              <p className="text-[#542B16] bg-[#FAF6F0] p-3 rounded-xl border border-[#75401F]/15">
                <strong>Business Retention Duration &amp; Internal Storage Practices:</strong>{' '}
                <em>[To be confirmed by Rosewood Duct Cleaning — how long booking emails/customer records are retained internally.]</em>
              </p>
            </div>
          </article>

          <article className="rounded-2xl sm:rounded-3xl bg-white border border-[#75401F]/15 p-5 sm:p-8 shadow-xs">
            <h2 className="font-display text-lg sm:text-xl font-black text-[#542B16] mb-2.5">
              4. Third-Party Services &amp; Data Sharing
            </h2>
            <div className="space-y-2.5 text-xs sm:text-sm text-[#352319]/85 leading-relaxed">
              <p>
                We do not sell your personal information. Based on the technical functionality of this website, the following third-party services are involved only as described below:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  <strong>EmailJS:</strong> Used solely to deliver booking form submissions via email.
                </li>
                <li>
                  <strong>Website Hosting (Netlify) &amp; Fonts (Google Fonts):</strong> Standard web hosting and font delivery providers may process routine technical request data (such as IP address or browser headers) when loading pages.
                </li>
                <li>
                  <strong>Instagram (Meta):</strong> If you choose to click an Instagram Direct Message link (<code className="px-1.5 py-0.5 rounded bg-[#F6F0E7] text-[#542B16] text-xs">ig.me/m/rosewoodductcleaning</code>), you leave this website and any messages sent there are governed by Instagram&apos;s privacy policy.
                </li>
              </ul>
              <p className="text-[#542B16] bg-[#FAF6F0] p-3 rounded-xl border border-[#75401F]/15">
                <strong>Additional Offline or Dispatch Sharing Practices (if any):</strong>{' '}
                <em>[To be confirmed by Rosewood Duct Cleaning — whether customer details are shared only with assigned technicians/dispatch staff.]</em>
              </p>
            </div>
          </article>

          <article className="rounded-2xl sm:rounded-3xl bg-white border border-[#75401F]/15 p-5 sm:p-8 shadow-xs">
            <h2 className="font-display text-lg sm:text-xl font-black text-[#542B16] mb-2.5">
              5. Your Choices &amp; Privacy Contact
            </h2>
            <p className="text-xs sm:text-sm text-[#352319]/85 leading-relaxed mb-3">
              You may contact us at any time to ask about, update, or request deletion of information you previously submitted through a booking request:
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="mailto:rosewoodductcleaning@gmail.com"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F6F0E7] hover:bg-[#ebdccb] text-[#542B16] font-bold text-xs border border-[#75401F]/20 transition-colors"
              >
                <Mail className="w-4 h-4 text-[#D94D78]" />
                <span>rosewoodductcleaning@gmail.com</span>
              </a>
              <a
                href="https://ig.me/m/rosewoodductcleaning"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#542B16] hover:bg-[#75401F] text-white font-bold text-xs transition-colors"
              >
                <Instagram className="w-4 h-4 text-[#D94D78]" />
                <span>@rosewoodductcleaning</span>
              </a>
            </div>
          </article>
        </div>

        {/* Bottom Navigation Actions */}
        <div className="mt-8 pt-6 border-t border-[#75401F]/15 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBackHome}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#542B16] hover:bg-[#75401F] text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer min-h-[46px]"
          >
            <ArrowLeft className="w-4 h-4 text-[#D94D78]" />
            <span>Return to Main Website</span>
          </button>

          {onOpenBooking && (
            <button
              type="button"
              onClick={onOpenBooking}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#D94D78] hover:bg-[#C53B64] text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer min-h-[46px]"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Online Now</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
