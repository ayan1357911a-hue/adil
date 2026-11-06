import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { ArrowLeft, ShoppingBag, Zap, ShieldCheck, Gift, Truck, Star, Sparkles, Check } from 'lucide-react';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onBuyNow: (product: Product, quantity: number) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onBack,
  onAddToCart,
  onBuyNow,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product]);

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  const handleDirectBuy = () => {
    onBuyNow(product, quantity);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF5] py-8 sm:py-12 animate-in fade-in duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb / Back button */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#F3E7C4] text-xs sm:text-sm font-medium text-[#23272F] hover:text-[#A9853C] hover:border-[#C5A059] transition-all shadow-xs cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 text-[#C5A059] group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Jewelry Pieces</span>
          </button>
        </div>

        {/* Dedicated Product Container */}
        <div className="bg-white rounded-3xl border border-[#F3E7C4] shadow-sm overflow-hidden p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* Left: Large Showcase Image */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative aspect-[4/3] sm:aspect-square bg-[#FBF9F4] rounded-2xl overflow-hidden border border-[#F3E7C4] group">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  referrerPolicy="no-referrer"
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.tag && (
                    <span className="bg-white/95 backdrop-blur-xs text-xs font-semibold text-[#23272F] px-3.5 py-1.5 rounded-lg border border-[#F3E7C4] shadow-xs">
                      {product.tag}
                    </span>
                  )}
                  <span className="bg-[#FFF9E6]/95 backdrop-blur-xs text-[11px] font-medium text-[#A9853C] px-3 py-1 rounded-lg border border-[#F3E7C4] shadow-xs">
                    18k Gold Vermeil
                  </span>
                </div>

                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-xs text-[11px] text-[#736B59] px-3 py-1 rounded-full border border-[#F3E7C4]">
                  High Resolution Studio Photo
                </div>
              </div>

              {/* Micro Perks under photo */}
              <div className="grid grid-cols-3 gap-3 text-center text-xs text-[#5F6572]">
                <div className="p-3 rounded-xl bg-[#FFFDF5] border border-[#F3E7C4]/70">
                  <ShieldCheck className="w-4 h-4 text-[#C5A059] mx-auto mb-1" />
                  <span className="text-[11px] font-semibold text-[#23272F] block">Zero Greening</span>
                  <span className="text-[10px] text-[#7E8492]">Hypoallergenic</span>
                </div>
                <div className="p-3 rounded-xl bg-[#FFFDF5] border border-[#F3E7C4]/70">
                  <Gift className="w-4 h-4 text-[#C5A059] mx-auto mb-1" />
                  <span className="text-[11px] font-semibold text-[#23272F] block">Gift Packaging</span>
                  <span className="text-[10px] text-[#7E8492]">Signature Box</span>
                </div>
                <div className="p-3 rounded-xl bg-[#FFFDF5] border border-[#F3E7C4]/70">
                  <Truck className="w-4 h-4 text-[#C5A059] mx-auto mb-1" />
                  <span className="text-[11px] font-semibold text-[#23272F] block">COD & JazzCash</span>
                  <span className="text-[10px] text-[#7E8492]">2-4 Days Shipping</span>
                </div>
              </div>
            </div>

            {/* Right: Full Description, Price, and Purchase Actions */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Category, Rating & Title */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="uppercase tracking-[0.2em] font-semibold text-[#C5A059]">
                    {product.categoryLabel} Collection
                  </span>
                  <div className="flex items-center gap-1.5 text-[#C5A059]">
                    <div className="flex text-[#D4AF37]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-xs font-semibold text-[#23272F]">5.0 (48 Reviews)</span>
                  </div>
                </div>

                <h1 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-normal text-[#23272F] leading-tight">
                  {product.name}
                </h1>

                {/* Price Display */}
                <div className="pt-2 flex items-baseline gap-4">
                  <span className="text-2xl sm:text-3xl font-semibold text-[#23272F] tabular-nums">
                    Rs. {product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-base text-[#A0A5B1] line-through tabular-nums">
                      Rs. {product.originalPrice.toLocaleString()}
                    </span>
                  )}
                  <span className="text-xs font-semibold text-[#2E7D32] bg-[#E8F5E9] px-2.5 py-1 rounded-md">
                    In Stock • Ready to Dispatch
                  </span>
                </div>
              </div>

              {/* Full Description */}
              <div className="space-y-3 pt-3 border-t border-[#F3E7C4]/70">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#736B59]">
                  About The Piece
                </h3>
                <p className="text-sm sm:text-base text-[#5F6572] leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Material & Craft Specifications */}
              <div className="space-y-3 pt-3 border-t border-[#F3E7C4]/70 bg-[#FFFDF5] p-5 rounded-2xl border border-[#F3E7C4]">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#23272F] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Material & Dimensions</span>
                </h3>
                
                <p className="text-xs sm:text-sm font-medium text-[#23272F]">
                  {product.material}
                </p>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#5F6572]">
                  {product.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] mt-1.5 shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Purchase Module: Quantity + Add to Cart + Buy Now */}
              <div className="space-y-4 pt-4 border-t border-[#F3E7C4]">
                
                {/* Quantity Controller */}
                <div className="flex items-center gap-4">
                  <span className="text-xs font-semibold text-[#23272F] uppercase tracking-wider">
                    Quantity:
                  </span>
                  <div className="flex items-center border border-[#F3E7C4] rounded-xl bg-white px-3 py-1.5 shadow-2xs">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-2 text-sm font-bold text-[#5F6572] hover:text-[#C5A059] transition-colors cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="px-4 text-sm font-semibold tabular-nums text-[#23272F]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-2 text-sm font-bold text-[#5F6572] hover:text-[#C5A059] transition-colors cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-xs text-[#7E8492]">
                    Total: <strong className="text-[#23272F]">Rs. {(product.price * quantity).toLocaleString()}</strong>
                  </span>
                </div>

                {/* Primary Action Buttons: Add to Cart & Buy Now */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  
                  {/* Add to Cart button */}
                  <button
                    onClick={handleAdd}
                    disabled={isAdded}
                    className={`w-full py-4 px-6 rounded-xl font-medium text-xs sm:text-sm tracking-wider uppercase transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer ${
                      isAdded
                        ? 'bg-[#2E7D32] text-white'
                        : 'bg-[#FFF9E6] hover:bg-[#23272F] text-[#23272F] hover:text-[#FFF9E6] border border-[#F3E7C4] hover:border-[#23272F]'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Cart</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4 text-[#C5A059]" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>

                  {/* Buy Now button (Direct Checkout) */}
                  <button
                    onClick={handleDirectBuy}
                    className="w-full py-4 px-6 rounded-xl bg-[#23272F] hover:bg-[#A9853C] text-[#FFF9E6] font-medium text-xs sm:text-sm tracking-wider uppercase transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer group"
                  >
                    <Zap className="w-4 h-4 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                    <span>Buy Now</span>
                  </button>

                </div>

                <div className="p-3.5 rounded-xl bg-[#FFF9E6] border border-[#F3E7C4] text-center text-xs text-[#736B59]">
                  <span>Fast express dispatch across Pakistan • Free gift packaging with every order</span>
                </div>

              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
