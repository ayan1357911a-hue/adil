import React from 'react';
import { ShoppingBag, Sparkles, Menu } from 'lucide-react';
import heroGirl from '../assets/images/hero_girl_jewelry_1790494486945.jpg';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({ cartCount, onOpenCart, onOpenMenu }) => {
  return (
    <header className="sticky top-0 z-30 bg-[#FFF9E6]/95 backdrop-blur-md border-b border-[#F3E7C4]/80 transition-all duration-200">
      {/* Top Announcement Bar (No contact links here) */}
      <div className="bg-[#23272F] text-[#FFF9E6] text-[11px] sm:text-xs py-1.5 px-4 text-center tracking-wider uppercase font-medium flex items-center justify-center gap-2">
        <Sparkles className="w-3 h-3 text-[#D4AF37] animate-pulse" />
        <span>Complimentary Signature Gift Box & Free Nationwide Shipping Above Rs. 3,000</span>
        <Sparkles className="w-3 h-3 text-[#D4AF37] animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Top-Left: 3-line hamburger menu icon alongside Website Name ("Aura & Co.") */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* 3-line Hamburger Menu Icon Button */}
            <button
              onClick={onOpenMenu}
              aria-label="Open navigation menu"
              className="p-2 sm:p-2.5 rounded-xl bg-white/80 hover:bg-white border border-[#F3E7C4] hover:border-[#C5A059] text-[#23272F] hover:text-[#A9853C] shadow-2xs hover:shadow-xs transition-all cursor-pointer group"
              title="Open Menu"
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-[#23272F] group-hover:text-[#A9853C] transition-colors" />
            </button>

            {/* Website Name */}
            <a href="#" className="group flex flex-col">
              <span className="font-serif-luxury text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-wide text-[#23272F] group-hover:text-[#A9853C] transition-colors leading-none">
                Aura & Co.
              </span>
              <span className="text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-[#736B59] mt-0.5 font-medium">
                Ladies Fine Jewelry
              </span>
            </a>
          </div>

          {/* Top-Right: Elegant image of girl wearing jewelry seamlessly blending with pastel yellow theme + Cart */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Top-Right: Illustration/Photo of Girl Wearing Jewelry seamlessly blending with theme */}
            <button
              onClick={() => {
                const el = document.getElementById('featured-products');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              title="Aura Summer Muse"
              className="flex items-center gap-2 sm:gap-2.5 p-1 pr-2.5 sm:pr-3 rounded-full bg-white/85 border border-[#F3E7C4] hover:border-[#C5A059] shadow-2xs hover:shadow-xs transition-all group cursor-pointer"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-[#D4AF37]/50 ring-2 ring-[#FFF9E6] shrink-0">
                <img 
                  src={heroGirl} 
                  alt="Aura & Co. Girl Wearing Jewelry" 
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="text-left text-xs leading-tight hidden xs:block">
                <span className="block text-[11px] font-semibold text-[#23272F] group-hover:text-[#A9853C] transition-colors">
                  Aura Muse
                </span>
                <span className="block text-[9px] text-[#7E8492] font-medium">
                  2026 Collection
                </span>
              </div>
            </button>

            {/* Shopping Bag Button */}
            <button
              onClick={onOpenCart}
              aria-label="View shopping cart"
              className="relative flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-xl bg-white border border-[#F3E7C4] hover:border-[#C5A059] text-[#23272F] hover:text-[#C5A059] shadow-2xs hover:shadow-xs transition-all group cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-[#23272F] group-hover:text-[#C5A059] transition-colors" />
              <span className="text-xs font-semibold tracking-wider uppercase hidden sm:inline">
                Cart
              </span>
              {cartCount > 0 ? (
                <span className="w-5 h-5 rounded-full bg-[#C5A059] text-white text-[11px] font-bold flex items-center justify-center tabular-nums animate-bounce">
                  {cartCount}
                </span>
              ) : (
                <span className="w-5 h-5 rounded-full bg-[#FFF9E6] text-[#736B59] text-[11px] font-medium flex items-center justify-center">
                  0
                </span>
              )}
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
