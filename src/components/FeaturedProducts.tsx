import React, { useState } from 'react';
import { Product } from '../types';
import { ShoppingBag, Eye, Check, Star, ArrowRight } from 'lucide-react';

interface FeaturedProductsProps {
  products: Product[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  onAddToCart,
  onSelectProduct,
}) => {
  const [addedId, setAddedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Curated Pieces' },
    { id: 'necklaces', label: 'Necklaces' },
    { id: 'earrings', label: 'Earrings' },
    { id: 'bracelets', label: 'Bracelets & Cuffs' },
    { id: 'rings', label: 'Rings' },
  ];

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedId(product.id);
    setTimeout(() => {
      setAddedId(null);
    }, 1500);
  };

  return (
    <section id="featured-products" className="py-16 sm:py-24 bg-[#FFFDF5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A059]">
            <span>Fine Jewelry Collection</span>
            <span aria-hidden="true">·</span>
            <span>{filteredProducts.length} Handcrafted Pieces</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-normal text-[#23272F] tracking-tight">
            Curated For Everyday Radiance
          </h2>
          <p className="text-sm sm:text-base text-[#5F6572] leading-relaxed">
            Every piece is molded in pure 925 sterling silver, plated in 18k gold vermeil, and sealed for lasting shine.
          </p>

          {/* Category Filter Tabs */}
          <div className="pt-4 flex items-center justify-center gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-full transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#23272F] text-[#FFF9E6] shadow-sm'
                    : 'bg-white text-[#5F6572] border border-[#F3E7C4] hover:border-[#C5A059] hover:text-[#23272F]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid: Strictly 3 product cards per row on desktop (responsive on tablet and mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => {
            const isJustAdded = addedId === product.id;

            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="group bg-white rounded-2xl border border-[#F3E7C4]/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)] hover:border-[#C5A059]/70 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
              >
                {/* Product Image Showcase */}
                <div className="relative aspect-[4/3] bg-[#FBF9F4] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    referrerPolicy="no-referrer"
                  />

                  {/* Badge */}
                  {product.tag && (
                    <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-xs text-[11px] font-semibold text-[#23272F] px-2.5 py-1 rounded-md border border-[#F3E7C4] shadow-xs">
                      {product.tag}
                    </div>
                  )}

                  {/* Top-Right Quick Glance */}
                  <div className="absolute top-3.5 right-3.5 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 text-[#23272F] p-1.5 rounded-full shadow-sm">
                    <Eye className="w-4 h-4 text-[#C5A059]" />
                  </div>
                </div>

                {/* Card Content with Soft White Surface */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Category & Star Rating */}
                    <div className="flex items-center justify-between text-xs text-[#7E8492] mb-1.5">
                      <span className="uppercase tracking-wider text-[11px] font-semibold text-[#C5A059]">
                        {product.categoryLabel}
                      </span>
                      <div className="flex items-center gap-1 text-[#C5A059]">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="text-xs font-semibold text-[#5F6572]">5.0</span>
                      </div>
                    </div>

                    {/* Product Title */}
                    <h3 className="font-brand font-medium text-lg text-[#23272F] group-hover:text-[#A9853C] transition-colors line-clamp-1">
                      {product.name}
                    </h3>

                    {/* Material note */}
                    <p className="text-xs text-[#7E8492] mt-1.5 line-clamp-2 leading-relaxed">
                      {product.material}
                    </p>
                  </div>

                  {/* Pricing and Action Buttons */}
                  <div className="pt-3 border-t border-[#F3E7C4]/70 space-y-3">
                    
                    {/* Price row */}
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-semibold text-[#23272F] tabular-nums">
                          Rs. {product.price.toLocaleString()}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-[#A0A5B1] line-through tabular-nums">
                            Rs. {product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-[#2E7D32] font-semibold bg-[#E8F5E9] px-2 py-0.5 rounded">
                        In Stock
                      </span>
                    </div>

                    {/* Dual Action Buttons: View Details & Add to Cart */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      
                      {/* View Details Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProduct(product);
                        }}
                        className="py-2.5 px-3 rounded-xl bg-white hover:bg-[#FFF9E6] text-[#23272F] hover:text-[#A9853C] border border-[#F3E7C4] text-xs font-semibold tracking-wide transition-all flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span>Details</span>
                      </button>

                      {/* Add to Cart Button */}
                      <button
                        type="button"
                        onClick={(e) => handleQuickAdd(e, product)}
                        disabled={isJustAdded}
                        className={`py-2.5 px-3 rounded-xl text-xs font-semibold tracking-wide transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs ${
                          isJustAdded
                            ? 'bg-[#2E7D32] text-white'
                            : 'bg-[#23272F] hover:bg-[#A9853C] text-[#FFF9E6]'
                        }`}
                      >
                        {isJustAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5 text-[#D4AF37]" />
                            <span>Add to Cart</span>
                          </>
                        )}
                      </button>

                    </div>

                  </div>

                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 rounded-2xl bg-[#FFF9E6] border border-[#F3E7C4] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-serif-luxury text-xl sm:text-2xl text-[#23272F]">
              Handcrafted in Pure 18k Gold Vermeil
            </h4>
            <p className="text-xs sm:text-sm text-[#5F6572]">
              Every creation is hypoallergenic, certified nickel-free, and sealed for anti-tarnish everyday wear.
            </p>
          </div>
          <button
            onClick={() => {
              const el = document.getElementById('the-promise');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-3 rounded-xl bg-white text-[#23272F] hover:text-[#A9853C] border border-[#F3E7C4] text-xs font-semibold tracking-wide uppercase transition-all shadow-xs shrink-0 cursor-pointer"
          >
            Learn About The Aura Promise
          </button>
        </div>

      </div>
    </section>
  );
};
