import { useState, useEffect } from 'react';
import { PRODUCTS } from './data/products';
import { Product, CartItem, PlacedOrder } from './types';
import { Header } from './components/Header';
import { SidebarMenu } from './components/SidebarMenu';
import { Hero } from './components/Hero';
import { FeaturedProducts } from './components/FeaturedProducts';
import { ProductDetailPage } from './components/ProductDetailPage';
import { StorySection } from './components/StorySection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { Toast } from './components/Toast';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('aura_cart');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    // Initial sample piece so user can test checkout immediately if desired
    return [
      {
        product: PRODUCTS[0],
        quantity: 1,
      },
    ];
  });

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderSuccessOpen, setIsOrderSuccessOpen] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<PlacedOrder | null>(null);
  const [toastProduct, setToastProduct] = useState<Product | null>(null);
  const [toastVisible, setToastVisible] = useState(false);

  // Sync cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem('aura_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Cart Handlers
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });

    // Show toast notification
    setToastProduct(product);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 3000);
  };

  const handleBuyNow = (product: Product, quantity = 1) => {
    handleAddToCart(product, quantity);
    setIsCheckoutOpen(true);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = (order: PlacedOrder) => {
    setPlacedOrder(order);
    setIsCheckoutOpen(false);
    setIsOrderSuccessOpen(true);
    setCart([]); // Clear cart upon successful order
  };

  const handleShopNowClick = () => {
    if (selectedProduct) {
      setSelectedProduct(null);
    }
    setTimeout(() => {
      const el = document.getElementById('featured-products');
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleNavigateHome = () => {
    setSelectedProduct(null);
    setSelectedCategory('all');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF5] text-[#23272F]">
      
      {/* 1. Header with 3-line hamburger menu on left & girl illustration on right */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenMenu={() => setIsSidebarOpen(true)}
      />

      {/* 2. Sliding rounded vertical sidebar menu from the left with vertical scrolling */}
      <SidebarMenu
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
        onNavigateHome={handleNavigateHome}
      />

      <main className="flex-1">
        {selectedProduct ? (
          /* Dedicated Product Detail View / Page */
          <ProductDetailPage
            product={selectedProduct}
            onBack={() => {
              setSelectedProduct(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
          />
        ) : (
          /* Main Homepage Flow */
          <>
            {/* 3. Hero Section with Tagline "Elegance in every detail" & Shop Now CTA */}
            <Hero onShopNowClick={handleShopNowClick} />

            {/* 4. Product Catalog: Rich 8-product collection, exactly 3 cards per row on desktop */}
            <FeaturedProducts
              products={PRODUCTS}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              onAddToCart={handleAddToCart}
              onSelectProduct={(product) => setSelectedProduct(product)}
            />

            {/* 5. Brand Trust & Craftsmanship Story Section */}
            <StorySection />
          </>
        )}
      </main>

      {/* 6. Footer Section (Exclusively here: WhatsApp number, Gmail, and Instagram @aurajewelrypk) */}
      <Footer />

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Advanced Checkout Modal with COD & JazzCash Screenshot Upload */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Order Success Popup */}
      <OrderSuccessModal
        isOpen={isOrderSuccessOpen}
        order={placedOrder}
        onClose={() => {
          setIsOrderSuccessOpen(false);
          setSelectedProduct(null);
        }}
      />

      {/* Notification Toast */}
      <Toast
        product={toastProduct}
        isVisible={toastVisible}
        onOpenCart={() => {
          setToastVisible(false);
          setIsCartOpen(true);
        }}
        onClose={() => setToastVisible(false)}
      />

    </div>
  );
}
