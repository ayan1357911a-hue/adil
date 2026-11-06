import React from 'react';
import { ArrowDown, Sparkles, ShieldCheck, Heart, Gift } from 'lucide-react';
import heroSeamlessGirl from '../assets/images/hero_seamless_girl_1790498003040.jpg';

interface HeroProps {
  onShopNowClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopNowClick }) => {
  return (
    <section className="relative overflow-hidden bg-[#FFF9E6] border-b border-[#F3E7C4]/70 min-h-[560px] sm:min-h-[620px] lg:min-h-[660px] flex items-center">
      
      {/* 
        Right Side Image with dark moody background that fades/blends 
        smoothly into light pastel yellow towards the left side 
      */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-3/5 xl:w-2/3 pointer-events-none overflow-hidden select-none">
        
        {/* Girl wearing jewelry with darker background on the right */}
        <img
          src={heroSeamlessGirl}
          alt="Aura & Co. Jewelry Muse"
          className="w-full h-full object-cover object-right lg:object-center transform scale-102 lg:scale-100"
          referrerPolicy="no-referrer"
        />

        {/* 
          Smooth Gradient Transition:
          Dark on the far right, smoothly fading into light pastel yellow (#FFF9E6) towards the left side
        */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFF9E6] via-[#FFF9E6]/90 via-30% sm:via-40% lg:via-45% to-transparent" />
        
        {/* Top and Bottom soft blended fades */}
        <div className="absolute inset-x-0 top-0 h-16 sm:h-24 bg-gradient-to-b from-[#FFF9E6] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-20 sm:h-28 bg-gradient-to-t from-[#FFF9E6] to-transparent" />
      </div>

      {/* Foreground Content: Tagline on the Left */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 relative z-10 w-full">
        <div className="max-w-xl lg:max-w-2xl space-y-6 text-left">
          
          {/* Subtle editorial kicker */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-[#F3E7C4] shadow-2xs text-xs font-semibold text-[#736B59] backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="tracking-wide">Handcrafted 2026 Collection</span>
            <span className="w-1 h-1 rounded-full bg-[#C5A059]" />
            <span className="text-[#A9853C]">18k Demi-Fine</span>
          </div>

          {/* Left Headline: Elegance in every detail */}
          <h1 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-[#23272F] leading-[1.06] text-balance">
            Elegance in <br />
            <span className="italic font-serif-luxury font-light text-[#A9853C]">
              every detail
            </span>
          </h1>

          {/* CTA Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={onShopNowClick}
              className="px-8 py-4 rounded-xl bg-[#23272F] hover:bg-[#A9853C] text-[#FFF9E6] font-medium text-sm tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-3 group"
            >
              <span>Shop Now</span>
              <ArrowDown className="w-4 h-4 text-[#D4AF37] group-hover:translate-y-1 transition-transform" />
            </button>

            <a
              href="#the-promise"
              className="px-6 py-4 rounded-xl bg-white/90 hover:bg-white text-[#23272F] hover:text-[#A9853C] border border-[#F3E7C4] text-sm font-medium transition-all text-center shadow-xs"
            >
              The Aura Promise
            </a>
          </div>

          {/* Trust highlights banner */}
          <div className="pt-8 border-t border-[#F3E7C4]/80 grid grid-cols-3 gap-3 sm:gap-4 max-w-lg">
            <div className="flex items-center gap-2 sm:gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white border border-[#F3E7C4] flex items-center justify-center shrink-0 shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
              </div>
              <div className="leading-tight">
                <span className="block text-xs font-semibold text-[#23272F]">18k Gold</span>
                <span className="block text-[10px] text-[#7E8492]">Anti-Tarnish</span>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white border border-[#F3E7C4] flex items-center justify-center shrink-0 shadow-2xs">
                <Gift className="w-4 h-4 text-[#C5A059]" />
              </div>
              <div className="leading-tight">
                <span className="block text-xs font-semibold text-[#23272F]">Gift Box</span>
                <span className="block text-[10px] text-[#7E8492]">Complimentary</span>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white border border-[#F3E7C4] flex items-center justify-center shrink-0 shadow-2xs">
                <Heart className="w-4 h-4 text-[#E68A9A]" />
              </div>
              <div className="leading-tight">
                <span className="block text-xs font-semibold text-[#23272F]">COD Available</span>
                <span className="block text-[10px] text-[#7E8492]">& JazzCash</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
