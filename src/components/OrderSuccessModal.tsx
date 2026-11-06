import React from 'react';
import { PlacedOrder } from '../types';
import { Check, Calendar, MapPin, ArrowRight, FileCheck, Package } from 'lucide-react';

interface OrderSuccessModalProps {
  order: PlacedOrder | null;
  isOpen: boolean;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#23272F]/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="min-h-screen px-4 py-8 flex items-center justify-center">
        <div className="relative bg-[#FFFDF5] w-full max-w-lg rounded-3xl border border-[#F3E7C4] shadow-2xl p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200">
          
          {/* Header & Success Icon */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-[#FFF9E6] border-2 border-[#C5A059] flex items-center justify-center mx-auto text-[#C5A059] shadow-sm animate-bounce">
              <Check className="w-8 h-8 text-[#A9853C]" />
            </div>

            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C5A059] block">
              Order Confirmed & Received
            </span>

            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#23272F]">
              Thank You, {order.customer.fullName}!
            </h2>

            <p className="text-xs sm:text-sm text-[#5F6572] leading-relaxed max-w-sm mx-auto">
              Your Aura & Co. jewelry order <strong className="text-[#23272F]">{order.orderId}</strong> has been received and scheduled for priority packaging.
            </p>
          </div>

          {/* Order Details Card */}
          <div className="bg-white rounded-2xl border border-[#F3E7C4] p-5 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#F3E7C4]/70">
              <span className="text-[#7E8492]">Order Reference:</span>
              <span className="font-mono font-bold text-sm text-[#A9853C]">{order.orderId}</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-[#7E8492] block mb-0.5">Estimated Delivery</span>
                <span className="font-semibold text-[#23272F] flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
                  2 – 4 Working Days
                </span>
              </div>
              <div>
                <span className="text-[#7E8492] block mb-0.5">Payment Method</span>
                <span className="font-semibold text-[#23272F] capitalize">
                  {order.customer.paymentMethod === 'cod' ? 'Cash on Delivery' : 'JazzCash Transfer'}
                </span>
              </div>
            </div>

            {/* JazzCash Screenshot verification badge */}
            {order.customer.paymentMethod === 'jazzcash' && (
              <div className="p-2.5 rounded-xl bg-[#FFF9E6] border border-[#F3E7C4] flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-[#2E7D32]" />
                  <span className="text-[#23272F] font-medium truncate max-w-[200px]">
                    {order.customer.jazzCashScreenshot
                      ? `Receipt: ${order.customer.jazzCashScreenshot.name}`
                      : 'Payment via JazzCash recorded'}
                  </span>
                </div>
                <span className="text-[10px] font-semibold text-[#2E7D32] bg-[#E8F5E9] px-2 py-0.5 rounded shrink-0">
                  Proof Attached
                </span>
              </div>
            )}

            {/* Address */}
            <div className="pt-2 border-t border-[#F3E7C4]/60 space-y-1">
              <span className="text-[#7E8492] flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                Shipping Destination:
              </span>
              <p className="font-medium text-[#23272F]">
                {order.customer.address}, {order.customer.city}
              </p>
              <p className="text-[#5F6572]">
                Contact: {order.customer.phone}
              </p>
              {order.customer.email && (
                <p className="text-[#A9853C] font-medium">
                  Confirmation sent to: {order.customer.email}
                </p>
              )}
            </div>

            {/* Items summary */}
            <div className="pt-2 border-t border-[#F3E7C4]/60 space-y-2">
              <span className="text-[#7E8492] block">Items in Parcel:</span>
              {order.items.map((item) => (
                <div key={item.product.id} className="flex justify-between items-center text-[#23272F]">
                  <span className="truncate pr-2">
                    {item.product.name} × {item.quantity}
                  </span>
                  <span className="font-medium tabular-nums shrink-0">
                    Rs. {(item.product.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
              <div className="pt-2 border-t border-[#F3E7C4]/60 flex justify-between font-semibold text-sm text-[#23272F]">
                <span>Total Amount Due:</span>
                <span className="text-[#A9853C] tabular-nums">
                  Rs. {order.total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#FFF9E6] border border-[#F3E7C4] text-center text-xs text-[#736B59] space-y-1">
            <span className="block font-medium text-[#23272F]">An order confirmation receipt has been sent to your email.</span>
            <span className="block text-[11px] text-[#7E8492]">Our dispatch team is preparing your package.</span>
          </div>

          {/* Action button */}
          <button
            onClick={onClose}
            className="w-full py-3.5 px-6 rounded-xl bg-[#23272F] hover:bg-[#A9853C] text-[#FFF9E6] font-medium text-xs sm:text-sm tracking-wider uppercase transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
          </button>

        </div>
      </div>
    </div>
  );
};
