import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface ToastProps {
  product: Product | null;
  isVisible: boolean;
  onOpenCart: () => void;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ product, isVisible, onOpenCart }) => {
  if (!isVisible || !product) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className="bg-[#23272F] text-[#FFF9E6] px-4 py-3.5 rounded-2xl shadow-xl border border-[#C5A059]/40 flex items-center gap-3.5 max-w-sm">
        <img
          src={product.image}
          alt={product.name}
          className="w-10 h-10 rounded-lg object-cover bg-white shrink-0 border border-[#F3E7C4]"
          referrerPolicy="no-referrer"
        />
        <div className="flex-1 min-w-0 text-left">
          <p className="text-xs font-semibold text-white truncate">
            Added to your bag!
          </p>
          <p className="text-[11px] text-[#D4AF37] truncate font-medium">
            {product.name} • Rs. {product.price.toLocaleString()}
          </p>
        </div>
        <button
          onClick={onOpenCart}
          className="px-3 py-1.5 rounded-lg bg-[#C5A059] hover:bg-[#DFBF7A] text-[#23272F] text-[11px] font-semibold uppercase tracking-wider transition-all flex items-center gap-1 cursor-pointer shrink-0"
        >
          <span>View</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
