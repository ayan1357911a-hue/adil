import React from 'react';
import { Sparkles, Shield, Gift, Truck } from 'lucide-react';

export const StorySection: React.FC = () => {
  const pillars = [
    {
      icon: Sparkles,
      title: 'Artisanal Craftsmanship',
      description:
        'Each piece is molded in pure 925 sterling silver and sealed in high-micron 18k gold vermeil to guarantee lasting luster and zero greening.',
    },
    {
      icon: Gift,
      title: 'Signature Gift Unboxing',
      description:
        'Every Aura & Co. order arrives in our soft blush textured box with a velvet travel pouch, care card, and personalized embossed stationery.',
    },
    {
      icon: Truck,
      title: 'Reliable Nationwide Delivery',
      description:
        'Dispatched from our studios within 24 hours. Tracked express shipping to Karachi, Lahore, Islamabad, and across Pakistan in 2–4 business days.',
    },
    {
      icon: Shield,
      title: 'Hypoallergenic & Safe',
      description:
        '100% nickel, lead, and cadmium free. Formulated specifically for sensitive skin so you can wear your favorite jewels effortlessly every day.',
    },
  ];

  return (
    <section id="the-promise" className="py-20 bg-[#FFF9E6]/70 border-t border-b border-[#F3E7C4]/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A059]">
            The Aura Standard
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-normal text-[#23272F]">
            Designed For Modern Heirlooms
          </h2>
          <p className="text-sm sm:text-base text-[#5F6572] leading-relaxed">
            We believe luxury jewelry should be accessible, durable, and thoughtfully designed. No astronomical retail markups—just honest craft and timeless silhouettes.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-7 border border-[#F3E7C4] shadow-xs hover:shadow-md hover:border-[#C5A059]/60 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#FFF9E6] border border-[#F3E7C4] flex items-center justify-center text-[#C5A059]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif-luxury text-xl font-normal text-[#23272F]">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5F6572] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#F3E7C4]/50 flex items-center gap-2 text-[11px] font-medium text-[#A9853C]">
                  <span>Aura Guarantee</span>
                  <span aria-hidden="true">·</span>
                  <span>100% Authentic</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
