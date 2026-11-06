import React, { useState } from 'react';
import { Instagram, MessageCircle, Mail, MapPin, Check, Copy, ArrowUpRight, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const [copiedIg, setCopiedIg] = useState(false);
  const [copiedWa, setCopiedWa] = useState(false);
  const [copiedMail, setCopiedMail] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleCopyIg = () => {
    navigator.clipboard.writeText('@aurajewelrypk');
    setCopiedIg(true);
    setTimeout(() => setCopiedIg(false), 2000);
  };

  const handleCopyWa = () => {
    navigator.clipboard.writeText('+92 300 1234567');
    setCopiedWa(true);
    setTimeout(() => setCopiedWa(false), 2000);
  };

  const handleCopyMail = () => {
    navigator.clipboard.writeText('aurajewelrypk@gmail.com');
    setCopiedMail(true);
    setTimeout(() => setCopiedMail(false), 2000);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSubscribed(true);
  };

  return (
    <footer id="store-footer" className="bg-[#FFF9E6] border-t border-[#F3E7C4] text-[#23272F]">
      
      {/* Exclusive Contact & Social Spotlight Card (Footer Only) */}
      <div className="border-b border-[#F3E7C4] py-14 sm:py-16 bg-gradient-to-b from-[#FFFDF5] to-[#FFF9E6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#F3E7C4] shadow-xs text-xs font-semibold text-[#A9853C] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Official Client Concierge & Socials</span>
          </div>

          <h3 className="font-serif-luxury text-3xl sm:text-4xl text-[#23272F] tracking-tight">
            Connect With Aura & Co.
          </h3>

          <p className="text-sm sm:text-base text-[#5F6572] max-w-xl mx-auto leading-relaxed">
            Have questions about custom pieces, urgent deliveries, or sizing? Reach our client care concierges directly or join our community on Instagram.
          </p>

          {/* Tri-Card Contact & Social Row: WhatsApp, Gmail, Instagram */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto pt-2 text-left">
            
            {/* 1. WhatsApp Contact Number */}
            <div className="bg-white p-4 rounded-2xl border border-[#F3E7C4] shadow-xs hover:border-[#25D366] transition-all flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#25D366]/15 border border-[#25D366]/30 flex items-center justify-center text-[#25D366]">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <button
                  onClick={handleCopyWa}
                  className="px-2.5 py-1 rounded-lg bg-[#FFF9E6] hover:bg-[#F3E7C4] text-[11px] font-medium text-[#736B59] transition-colors flex items-center gap-1 cursor-pointer"
                  title="Copy WhatsApp number"
                >
                  {copiedWa ? (
                    <>
                      <Check className="w-3 h-3 text-[#2E7D32]" />
                      <span className="text-[#2E7D32]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-[#736B59]" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div>
                <span className="text-[11px] text-[#7E8492] block font-medium">WhatsApp Contact</span>
                <a
                  href="https://wa.me/923001234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-sm sm:text-base text-[#23272F] hover:text-[#128C7E] transition-colors inline-flex items-center gap-1 mt-0.5"
                >
                  <span>+92 300 1234567</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#25D366]" />
                </a>
              </div>
            </div>

            {/* 2. Gmail Address */}
            <div className="bg-white p-4 rounded-2xl border border-[#F3E7C4] shadow-xs hover:border-[#EA4335] transition-all flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#EA4335]/10 border border-[#EA4335]/25 flex items-center justify-center text-[#EA4335]">
                  <Mail className="w-5 h-5" />
                </div>
                <button
                  onClick={handleCopyMail}
                  className="px-2.5 py-1 rounded-lg bg-[#FFF9E6] hover:bg-[#F3E7C4] text-[11px] font-medium text-[#736B59] transition-colors flex items-center gap-1 cursor-pointer"
                  title="Copy Gmail address"
                >
                  {copiedMail ? (
                    <>
                      <Check className="w-3 h-3 text-[#2E7D32]" />
                      <span className="text-[#2E7D32]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-[#736B59]" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div>
                <span className="text-[11px] text-[#7E8492] block font-medium">Gmail Address</span>
                <a
                  href="mailto:aurajewelrypk@gmail.com"
                  className="font-semibold text-xs sm:text-sm text-[#23272F] hover:text-[#EA4335] transition-colors inline-flex items-center gap-1 mt-0.5 break-all"
                >
                  <span>aurajewelrypk@gmail.com</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#EA4335] shrink-0" />
                </a>
              </div>
            </div>

            {/* 3. Instagram Icon with Handle @aurajewelrypk */}
            <div className="bg-white p-4 rounded-2xl border border-[#F3E7C4] shadow-xs hover:border-[#C5A059] transition-all flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FCE7EA] to-[#FFF9E6] border border-[#F3E7C4] flex items-center justify-center text-[#23272F]">
                  <Instagram className="w-5 h-5 text-[#C5A059]" />
                </div>
                <button
                  onClick={handleCopyIg}
                  className="px-2.5 py-1 rounded-lg bg-[#FFF9E6] hover:bg-[#F3E7C4] text-[11px] font-medium text-[#736B59] transition-colors flex items-center gap-1 cursor-pointer"
                  title="Copy Instagram handle"
                >
                  {copiedIg ? (
                    <>
                      <Check className="w-3 h-3 text-[#2E7D32]" />
                      <span className="text-[#2E7D32]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-[#736B59]" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div>
                <span className="text-[11px] text-[#7E8492] block font-medium">Instagram Handle</span>
                <a
                  href="https://instagram.com/aurajewelrypk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-sm sm:text-base text-[#23272F] hover:text-[#A9853C] transition-colors inline-flex items-center gap-1 mt-0.5"
                >
                  <span>@aurajewelrypk</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A059]" />
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-col">
              <span className="font-serif-luxury text-3xl font-semibold tracking-wide text-[#23272F]">
                Aura & Co.
              </span>
              <span className="text-xs tracking-[0.2em] uppercase text-[#736B59] font-medium mt-1">
                Elegance in every detail
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-[#5F6572] leading-relaxed max-w-sm">
              Boutique ladies fashion & fine jewelry celebrating timeless elegance. Handcrafted with high-micron 18k gold vermeil and natural gemstones.
            </p>

            <div className="pt-1 text-xs text-[#5F6572] space-y-1.5">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Lahore, Karachi & Islamabad Studios, Pakistan</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#23272F]">
              Curated Pieces
            </h4>
            <ul className="text-xs text-[#5F6572] space-y-2">
              <li>
                <a href="#featured-products" className="hover:text-[#A9853C] transition-colors">
                  Layered Chokers & Necklaces
                </a>
              </li>
              <li>
                <a href="#featured-products" className="hover:text-[#A9853C] transition-colors">
                  Huggie Hoops & Solitaires
                </a>
              </li>
              <li>
                <a href="#featured-products" className="hover:text-[#A9853C] transition-colors">
                  Baroque Pearl Cuffs & Bangles
                </a>
              </li>
              <li>
                <a href="#featured-products" className="hover:text-[#A9853C] transition-colors">
                  Stackable Pavé Bands
                </a>
              </li>
            </ul>
          </div>

          {/* Client Care */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#23272F]">
              Ordering & Care
            </h4>
            <ul className="text-xs text-[#5F6572] space-y-2">
              <li>
                <a href="#the-promise" className="hover:text-[#A9853C] transition-colors">
                  Cash on Delivery (COD)
                </a>
              </li>
              <li>
                <a href="#the-promise" className="hover:text-[#A9853C] transition-colors">
                  JazzCash Proof Upload
                </a>
              </li>
              <li>
                <a href="#the-promise" className="hover:text-[#A9853C] transition-colors">
                  Anti-Tarnish Care Instructions
                </a>
              </li>
              <li>
                <a href="#the-promise" className="hover:text-[#A9853C] transition-colors">
                  Ring Sizing Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Privé Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#23272F]">
              Privé Member Access
            </h4>
            <p className="text-xs text-[#5F6572] leading-relaxed">
              Receive private preview access to our seasonal handcrafted drops.
            </p>

            {newsletterSubscribed ? (
              <div className="p-3 rounded-xl bg-white border border-[#2E7D32]/40 text-xs text-[#2E7D32] flex items-center gap-2">
                <Check className="w-4 h-4 shrink-0" />
                <span>Thank you! You're on the Aura Privé list.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#F3E7C4] text-xs focus:border-[#C5A059] focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full py-2 px-3 rounded-xl bg-[#23272F] text-[#FFF9E6] text-xs font-medium uppercase tracking-wider hover:bg-[#A9853C] transition-all cursor-pointer"
                >
                  Join The Privé List
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="mt-12 pt-8 border-t border-[#F3E7C4] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7E8492]">
          <p>© 2026 Aura & Co. All rights reserved. "Elegance in every detail".</p>
          
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-medium text-[#736B59]">Accepted:</span>
            <span className="px-2 py-0.5 rounded bg-white border border-[#F3E7C4] text-[10px] font-semibold text-[#23272F]">
              Cash on Delivery (COD)
            </span>
            <span className="px-2 py-0.5 rounded bg-[#FFF2B2] border border-[#F3E7C4] text-[10px] font-semibold text-[#A9853C]">
              JazzCash
            </span>
          </div>
        </div>

      </div>

    </footer>
  );
};
