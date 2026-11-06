import React from 'react';
import { X, Sparkles, ChevronRight, Home, ShoppingBag, Gift, ShieldCheck, Heart, Mail } from 'lucide-react';
import heroGirl from '../assets/images/hero_girl_jewelry_1790494486945.jpg';

interface SidebarMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (category: string) => void;
  onNavigateHome: () => void;
}

export const SidebarMenu: React.FC<SidebarMenuProps> = ({
  isOpen,
  onClose,
  onSelectCategory,
  onNavigateHome,
}) => {
  if (!isOpen) return null;

  const handleNavClick = (action: () => void) => {
    action();
    onClose();
  };

  const scrollToFooter = () => {
    onClose();
    setTimeout(() => {
      const footer = document.getElementById('store-footer');
      footer?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  const scrollToCollection = () => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById('featured-products');
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  const scrollToStory = () => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById('the-promise');
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dimmed backdrop */}
      <div
        className="fixed inset-0 bg-[#23272F]/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex">
        <aside
          aria-label="Navigation sidebar"
          className="w-80 sm:w-96 max-w-[88vw] bg-[#FFF9E6] border-r border-[#F3E7C4] rounded-r-3xl shadow-2xl flex flex-col justify-between overflow-y-auto scroll-smooth animate-in slide-in-from-left duration-300"
        >
          {/* Sidebar Top: Brand Lockup & Close Button */}
          <div className="p-6 border-b border-[#F3E7C4]/80 flex items-center justify-between bg-white/60">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-[#D4AF37]/50 shadow-xs">
                <img
                  src={heroGirl}
                  alt="Aura & Co. Muse"
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif-luxury text-2xl font-semibold tracking-wide text-[#23272F] leading-none">
                  Aura & Co.
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#736B59] mt-0.5 font-medium">
                  Elegance in every detail
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-[#7E8492] hover:text-[#23272F] hover:bg-white transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Sidebar Content (Scrollable) */}
          <div className="flex-1 p-6 space-y-6">
            
            {/* Primary Nav Links */}
            <div className="space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#A9853C] block px-3 mb-2">
                Navigation
              </span>

              <button
                onClick={() => handleNavClick(onNavigateHome)}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-white text-sm font-medium text-[#23272F] hover:text-[#A9853C] transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <Home className="w-4 h-4 text-[#C5A059]" />
                  <span>Home</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#A0A5B1] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={scrollToCollection}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-white text-sm font-medium text-[#23272F] hover:text-[#A9853C] transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-4 h-4 text-[#C5A059]" />
                  <span>Shop All Pieces</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#A0A5B1] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={scrollToStory}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-white text-sm font-medium text-[#23272F] hover:text-[#A9853C] transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                  <span>The Aura Promise</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#A0A5B1] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={scrollToFooter}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-white text-sm font-medium text-[#23272F] hover:text-[#A9853C] transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#C5A059]" />
                  <span>Contact Concierge & Socials</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#A0A5B1] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Curated Categories */}
            <div className="space-y-1 pt-4 border-t border-[#F3E7C4]">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#A9853C] block px-3 mb-2">
                Collections by Category
              </span>

              {[
                { id: 'all', label: 'All Curated Pieces' },
                { id: 'necklaces', label: 'Layered Necklaces & Chokers' },
                { id: 'earrings', label: 'Huggie Hoops & Solitaires' },
                { id: 'bracelets', label: 'Cuffs, Bangles & Chains' },
                { id: 'rings', label: 'Stackable Pavé & Baguettes' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    handleNavClick(onNavigateHome);
                    onSelectCategory(cat.id);
                    setTimeout(() => {
                      const el = document.getElementById('featured-products');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="w-full text-left px-3.5 py-2 rounded-xl hover:bg-white text-xs font-medium text-[#5F6572] hover:text-[#23272F] transition-all cursor-pointer flex items-center justify-between"
                >
                  <span>{cat.label}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]/40" />
                </button>
              ))}
            </div>

            {/* Special Highlight Box */}
            <div className="rounded-2xl bg-white p-4 border border-[#F3E7C4] shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#A9853C]">
                <Gift className="w-4 h-4" />
                <span>Complimentary Luxury Gifting</span>
              </div>
              <p className="text-[11px] text-[#5F6572] leading-relaxed">
                Every piece arrives in our signature blush presentation box with velvet traveling pouch and care instructions.
              </p>
            </div>

          </div>

          {/* Sidebar Footer Notice */}
          <div className="p-6 bg-white/70 border-t border-[#F3E7C4] text-center space-y-1">
            <p className="text-xs font-serif-luxury text-[#23272F]">
              Handcrafted in Pure 18k Vermeil
            </p>
            <p className="text-[10px] text-[#7E8492]">
              Find all direct contact details & Instagram in our footer below.
            </p>
          </div>

        </aside>
      </div>
    </div>
  );
};
