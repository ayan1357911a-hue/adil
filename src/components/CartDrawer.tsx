import React from 'react';
import { CartItem } from '../types';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const freeShippingThreshold = 3000;
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 200;
  const total = subtotal + shippingFee;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#23272F]/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFDF5] shadow-2xl flex flex-col border-l border-[#F3E7C4] animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 sm:p-6 bg-[#FFF9E6] border-b border-[#F3E7C4] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#C5A059]" />
              <h2 className="font-serif-luxury text-2xl font-normal text-[#23272F]">
                Your Shopping Bag
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-white text-[#736B59] font-medium border border-[#F3E7C4]">
                {items.reduce((acc, i) => acc + i.quantity, 0)}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#5F6572] hover:text-[#23272F] rounded-full hover:bg-white/80 transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          {items.length > 0 && (
            <div className="bg-white px-5 py-3 border-b border-[#F3E7C4]/80 text-xs">
              <div className="flex items-center justify-between text-[#5F6572] mb-1.5 font-medium">
                {amountToFreeShipping > 0 ? (
                  <span>
                    Add <strong className="text-[#A9853C]">Rs. {amountToFreeShipping.toLocaleString()}</strong> more for <strong>FREE Nationwide Delivery</strong>!
                  </span>
                ) : (
                  <span className="text-[#2E7D32] font-semibold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    You unlocked FREE Nationwide Delivery!
                  </span>
                )}
              </div>
              <div className="w-full bg-[#FFF9E6] rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-[#C5A059] h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16">
                <div className="w-16 h-16 rounded-full bg-[#FFF9E6] border border-[#F3E7C4] flex items-center justify-center text-[#C5A059]">
                  <ShoppingBag className="w-8 h-8 opacity-60" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif-luxury text-xl text-[#23272F]">
                    Your bag is empty
                  </h3>
                  <p className="text-xs sm:text-sm text-[#7E8492] max-w-xs">
                    Discover our handcrafted 18k gold necklaces, earrings, and rings to begin your collection.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-[#23272F] text-[#FFF9E6] text-xs uppercase tracking-wider font-medium hover:bg-[#A9853C] transition-all cursor-pointer"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-white p-3.5 rounded-xl border border-[#F3E7C4]/80 shadow-xs flex gap-3.5 items-center group"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-18 h-18 sm:w-20 sm:h-20 rounded-lg object-cover bg-[#FBF9F4] shrink-0 border border-[#F3E7C4]/60"
                    referrerPolicy="no-referrer"
                  />

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-xs sm:text-sm font-medium text-[#23272F] truncate">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-[#A0A5B1] hover:text-[#D32F2F] p-1 transition-colors cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-[11px] text-[#7E8492] mt-0.5">
                      {item.product.categoryLabel}
                    </p>

                    <div className="mt-2.5 flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-semibold text-[#23272F] tabular-nums">
                        Rs. {(item.product.price * item.quantity).toLocaleString()}
                      </span>

                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#F3E7C4] rounded-lg bg-[#FFF9E6]/60">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          className="p-1 sm:p-1.5 hover:text-[#C5A059] transition-colors cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold text-[#23272F] tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          className="p-1 sm:p-1.5 hover:text-[#C5A059] transition-colors cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-5 sm:p-6 bg-[#FFF9E6] border-t border-[#F3E7C4] space-y-4">
              <div className="space-y-2 text-xs text-[#5F6572]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#23272F] tabular-nums">
                    Rs. {subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Shipping (Pakistan)</span>
                  <span className="font-semibold text-[#23272F] tabular-nums">
                    {shippingFee === 0 ? (
                      <span className="text-[#2E7D32]">FREE</span>
                    ) : (
                      `Rs. ${shippingFee}`
                    )}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#F3E7C4] flex justify-between text-sm sm:text-base font-medium text-[#23272F]">
                  <span className="font-serif-luxury text-lg">Total</span>
                  <span className="font-semibold tabular-nums text-[#A9853C]">
                    Rs. {total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={onProceedToCheckout}
                className="w-full py-3.5 px-4 rounded-xl bg-[#23272F] hover:bg-[#A9853C] text-[#FFF9E6] font-medium text-xs sm:text-sm tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#7E8492]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Cash on Delivery (COD) & JazzCash Supported</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
