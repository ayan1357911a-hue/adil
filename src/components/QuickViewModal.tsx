import React, { useState } from 'react';
import { Product } from '../types';
import { X, ShoppingBag, Check, ShieldCheck, Sparkles, Heart } from 'lucide-react';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!isOpen || !product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-[#23272F]/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="min-h-screen px-4 py-8 flex items-center justify-center">
        <div className="relative bg-[#FFFDF5] w-full max-w-3xl rounded-3xl border border-[#F3E7C4] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 text-[#7E8492] hover:text-[#23272F] bg-white/80 rounded-full hover:bg-white shadow-xs transition-all cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Product Image */}
            <div className="relative aspect-[4/3] md:aspect-auto bg-[#FBF9F4] flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-[#F3E7C4]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full max-h-96 object-cover rounded-2xl shadow-sm"
                referrerPolicy="no-referrer"
              />
              {product.tag && (
                <span className="absolute top-8 left-8 bg-white/95 text-[11px] font-semibold text-[#23272F] px-3 py-1 rounded-md border border-[#F3E7C4] shadow-xs">
                  {product.tag}
                </span>
              )}
            </div>

            {/* Details */}
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-widest text-[#C5A059] font-medium block">
                  {product.categoryLabel}
                </span>

                <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#23272F]">
                  {product.name}
                </h3>

                <div className="flex items-baseline gap-3">
                  <span className="text-xl sm:text-2xl font-semibold text-[#23272F] tabular-nums">
                    Rs. {product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-[#A0A5B1] line-through tabular-nums">
                      Rs. {product.originalPrice.toLocaleString()}
                    </span>
                  )}
                  <span className="text-xs font-medium text-[#2E7D32] bg-[#E8F5E9] px-2 py-0.5 rounded">
                    In Stock
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#5F6572] leading-relaxed pt-1">
                  {product.description}
                </p>

                {/* Details list */}
                <div className="pt-3 border-t border-[#F3E7C4]/70 space-y-2">
                  <h4 className="text-xs font-semibold text-[#23272F] uppercase tracking-wider">
                    Specifications & Craft
                  </h4>
                  <ul className="text-xs text-[#5F6572] space-y-1.5 list-disc list-inside">
                    {product.details.map((detail, idx) => (
                      <li key={idx} className="leading-snug">{detail}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Quantity & Add button */}
              <div className="space-y-4 pt-4 border-t border-[#F3E7C4]">
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-[#F3E7C4] rounded-xl bg-white px-3 py-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="text-sm font-semibold px-2 hover:text-[#C5A059] cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-3 text-sm font-medium tabular-nums">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="text-sm font-semibold px-2 hover:text-[#C5A059] cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAdd}
                    disabled={isAdded}
                    className={`flex-1 py-3 px-6 rounded-xl font-medium text-xs sm:text-sm tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                      isAdded
                        ? 'bg-[#2E7D32] text-white'
                        : 'bg-[#23272F] hover:bg-[#A9853C] text-[#FFF9E6]'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Cart</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                        <span>Add to Cart • Rs. {(product.price * quantity).toLocaleString()}</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 text-[11px] text-[#7E8492]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Complimentary signature packaging with personalized note</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
