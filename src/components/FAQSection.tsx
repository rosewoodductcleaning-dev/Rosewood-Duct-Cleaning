import React, { useState } from 'react';
import { Plus, Minus, HelpCircle, Instagram, Calendar, ArrowRight, Sparkles } from 'lucide-react';

interface FAQSectionProps {
  onOpenBooking?: () => void;
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  actionType?: 'book' | 'instagram';
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenBooking }) => {
  // Allow multiple items to be toggled open or closed. First item open by default for immediate engagement.
  const [openIds, setOpenIds] = useState<Set<string>>(new Set(['faq-1']));

  const toggleItem = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const faqs: FAQItem[] = [
    {
      id: 'faq-1',
      question: 'How often should air ducts be cleaned?',
      answer:
        'Air ducts should generally be inspected every 6 months to 1 year. Cleaning frequency depends on dust buildup, pets, indoor air quality, and household conditions.',
    },
    {
      id: 'faq-2',
      question: 'How long does air duct cleaning take?',
      answer:
        'Most residential air duct cleaning appointments take approximately 1 hour, depending on the size of the property and the ventilation system.',
    },
    {
      id: 'faq-3',
      question: 'Why is dryer vent cleaning important?',
      answer:
        'Dryer vent cleaning removes accumulated lint and debris, helps maintain proper airflow, improves dryer efficiency, and reduces potential fire hazards.',
    },
    {
      id: 'faq-4',
      question: 'What is included in HVAC cleaning?',
      answer:
        'HVAC cleaning may include cleaning accessible components of the heating and cooling ventilation system, removing accumulated dust and debris according to the selected service.',
    },
    {
      id: 'faq-5',
      question: 'Do you provide chimney cleaning services?',
      answer:
        'Yes. Rosewood offers chimney cleaning services to help remove accumulated soot and debris and maintain proper chimney airflow.',
    },
    {
      id: 'faq-6',
      question: 'How do I know if my air ducts need cleaning?',
      answer:
        'Signs may include visible dust buildup around vents, reduced airflow, unusual odors, and excessive dust accumulation inside your home.',
    },
    {
      id: 'faq-7',
      question: 'Do I need to prepare my home before the appointment?',
      answer:
        'We recommend keeping the areas around air vents, HVAC equipment, dryer connections, and chimney access points clear for our technicians.',
    },
    {
      id: 'faq-8',
      question: 'How can I book a cleaning appointment?',
      answer:
        'Simply click the "Book Now" button on our website, complete the booking form, and submit your preferred service, date, and time.',
      actionType: 'book',
    },
    {
      id: 'faq-9',
      question: 'Do you offer multiple cleaning services?',
      answer:
        'Yes. Our services include Air Duct Cleaning, Dryer Vent Cleaning, HVAC Cleaning, and Chimney Cleaning.',
    },
    {
      id: 'faq-10',
      question: 'How can I contact Rosewood Duct Cleaning?',
      answer:
        'You can contact our team through Instagram Direct Message using the Instagram button on our website.',
      actionType: 'instagram',
    },
  ];

  return (
    <section id="faq" className="py-14 sm:py-20 lg:py-28 bg-[#F6F0E7] border-t border-[#75401F]/15 relative">
      {/* Anchor for any residual contact links */}
      <div id="contact" className="absolute -top-20" aria-hidden="true" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFDF9] border border-[#75401F]/20 text-[#542B16] text-[11px] sm:text-xs font-black uppercase tracking-widest mb-3 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#D94D78] shrink-0" />
            <span>HAVE QUESTIONS?</span>
          </div>

          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-black text-[#542B16] tracking-tight mb-3 sm:mb-4">
            Frequently Asked Questions
          </h2>

          <p className="text-xs sm:text-base text-[#352319]/80 leading-relaxed font-medium">
            Everything you need to know about our air duct, dryer vent, HVAC, and chimney cleaning services.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIds.has(faq.id);

            return (
              <div
                key={faq.id}
                className={`rounded-2xl sm:rounded-3xl bg-[#FFFDF9] border transition-all duration-300 overflow-hidden shadow-xs ${
                  isOpen
                    ? 'border-[#D94D78]/60 shadow-md ring-1 ring-[#D94D78]/20'
                    : 'border-[#75401F]/15 hover:border-[#75401F]/30 hover:shadow-sm'
                }`}
              >
                {/* Accordion Question Button */}
                <button
                  type="button"
                  onClick={() => toggleItem(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 p-4 sm:p-6 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D94D78] min-h-[56px]"
                >
                  <div className="flex items-center gap-3 sm:gap-4 flex-1">
                    <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#F6F0E7] text-[#542B16] font-display font-black text-xs sm:text-sm flex items-center justify-center shrink-0 border border-[#75401F]/15">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="font-display text-sm sm:text-base lg:text-lg font-bold text-[#542B16] leading-snug">
                      {faq.question}
                    </span>
                  </div>

                  {/* Plus / Minus Animated Toggle */}
                  <div
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0 transition-colors duration-200 ${
                      isOpen
                        ? 'bg-[#D94D78] text-white shadow-xs'
                        : 'bg-[#F6F0E7] text-[#542B16] hover:bg-[#ebdccb]'
                    }`}
                  >
                    {isOpen ? (
                      <Minus className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                    ) : (
                      <Plus className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                    )}
                  </div>
                </button>

                {/* Accordion Answer Content */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-4 pb-4 sm:px-6 sm:pb-6 pt-0 border-t border-[#75401F]/10 mt-1">
                      <p className="text-xs sm:text-sm lg:text-[15px] text-[#352319]/85 leading-relaxed pt-3 font-normal">
                        {faq.answer}
                      </p>

                      {/* Helpful Action Shortcut for Q8 */}
                      {faq.actionType === 'book' && onOpenBooking && (
                        <div className="pt-3">
                          <button
                            type="button"
                            onClick={onOpenBooking}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#D94D78] hover:bg-[#C53B64] text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                          >
                            <Calendar className="w-3.5 h-3.5" />
                            <span>Open Booking Popup Now</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      )}

                      {/* Helpful Action Shortcut for Q10 */}
                      {faq.actionType === 'instagram' && (
                        <div className="pt-3">
                          <a
                            href="https://ig.me/m/rosewoodductcleaning"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#542B16] hover:bg-[#75401F] text-white font-bold text-xs shadow-xs transition-colors"
                          >
                            <Instagram className="w-3.5 h-3.5 text-[#D94D78]" />
                            <span>Message Us on Instagram</span>
                            <ArrowRight className="w-3 h-3 text-[#D94D78]" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Contact Help Card */}
        <div className="mt-10 sm:mt-14 rounded-3xl bg-[#542B16] text-[#FFFDF9] p-6 sm:p-8 border border-white/15 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D94D78]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Still Have Questions?</span>
            </div>
            <h3 className="font-display text-lg sm:text-xl font-black text-white">
              We’re Here to Help Your Home Breathe Easy
            </h3>
            <p className="text-xs sm:text-sm text-[#F6F0E7]/80 font-normal max-w-lg">
              Send our team a direct message on Instagram anytime for quick answers and advice about your home's air systems.
            </p>
          </div>

          <a
            href="https://ig.me/m/rosewoodductcleaning"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#D94D78] hover:bg-[#C53B64] active:bg-[#b02f54] text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-all active:scale-95 shrink-0 whitespace-nowrap min-h-[46px]"
          >
            <Instagram className="w-4 h-4" />
            <span>MESSAGE US ON INSTAGRAM</span>
          </a>
        </div>

      </div>
    </section>
  );
};
