import React from 'react';
import { Star, Quote, CheckCircle2, MessageSquareHeart } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      author: 'Jonathan & Rachel Miller',
      service: 'Air Duct & HVAC Deep Cleaning',
      rating: 5,
      previewLabel: 'Sample Client Review (Development Preview)',
      quote:
        'The Rosewood crew showed tremendous respect for our newly finished home. They sealed each vent register with plastic sheeting and set up negative air vacuums that kept all dust contained. Our air smells remarkably fresh and our allergy symptoms have plummeted.',
    },
    {
      author: 'Marcus Holloway',
      service: 'Dryer Vent & Exhaust Line Cleaning',
      rating: 5,
      previewLabel: 'Sample Client Review (Development Preview)',
      quote:
        'Our dryer was taking nearly 80 minutes to dry a single load of towels. The Rosewood technician cleared a massive lint blockage and inspected the roof exhaust cap. Dryer cycles are down to 35 minutes and our peace of mind is restored.',
    },
    {
      author: 'Elena Rostova',
      service: 'Fireplace Flue & Chimney Sweep',
      rating: 5,
      previewLabel: 'Sample Client Review (Development Preview)',
      quote:
        'Thorough, courteous, and impeccably clean. Having a wood-burning fireplace cleaned can be a messy ordeal, but Rosewood left our hearth spotless with zero soot smell. True high-end home service professionals.',
    },
  ];

  return (
    <section className="py-14 sm:py-20 lg:py-28 bg-[#F6F0E7]/50 border-t border-[#75401F]/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#FFFDF9] border border-[#75401F]/20 text-[#542B16] text-[11px] sm:text-xs font-black uppercase tracking-widest mb-2.5">
            <MessageSquareHeart className="w-3.5 h-3.5 text-[#D94D78] shrink-0" />
            <span>Sample Testimonials (Preview)</span>
          </div>

          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-black text-[#542B16] tracking-tight mb-3">
            Client Experiences & Trust
          </h2>

          <p className="text-xs sm:text-base text-[#352319]/80 leading-relaxed font-normal">
            Discover the tangible comfort and peace of mind homeowners experience when their ventilation systems are sanitized the Rosewood way.
          </p>

          <p className="text-[10px] sm:text-[11px] text-[#352319]/55 mt-2 italic">
            *Sample testimonial formats displayed strictly for layout and interface preview during development.
          </p>
        </div>

        {/* 3 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map((rev, index) => (
            <div
              key={index}
              className="bg-[#FFFDF9] rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-[#75401F]/15 hover:border-[#75401F]/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* 5 Stars and Quote Marker */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-[#75401F]/15 group-hover:text-[#D94D78]/25 transition-colors" />
                </div>

                <p className="text-sm text-[#352319]/85 leading-relaxed mb-6 font-normal italic">
                  "{rev.quote}"
                </p>
              </div>

              {/* Author & Service Meta */}
              <div className="pt-5 border-t border-[#75401F]/10">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-display font-bold text-sm text-[#542B16] flex items-center gap-1.5">
                    <span>{rev.author}</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </h4>
                  <span className="text-[10px] text-[#75401F] font-bold uppercase tracking-wider">
                    Verified
                  </span>
                </div>
                <p className="text-xs text-[#75401F] font-medium">{rev.service}</p>
                <p className="text-[10px] text-[#352319]/50 mt-1">{rev.previewLabel}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
