import React, { useState, useRef } from 'react';
import { CartItem, OrderForm, PlacedOrder, ScreenshotFile } from '../types';
import { X, ShieldCheck, CheckCircle2, Sparkles, Building, MapPin, User, Upload, Image as ImageIcon, Trash2, Check } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: (order: PlacedOrder) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shippingFee = subtotal >= 3000 || subtotal === 0 ? 0 : 200;
  const total = subtotal + shippingFee;

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<OrderForm>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: 'Lahore',
    postalCode: '',
    orderNotes: '',
    paymentMethod: 'cod',
    jazzCashTid: '',
    jazzCashScreenshot: null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(false);

  const pakistaniCities = [
    'Lahore',
    'Karachi',
    'Islamabad',
    'Rawalpindi',
    'Faisalabad',
    'Multan',
    'Peshawar',
    'Quetta',
    'Sialkot',
    'Gujranwala',
    'Hyderabad',
    'Abbottabad',
    'Bahawalpur',
    'Other City',
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrors((prev) => ({ ...prev, screenshot: 'Please upload an image file (PNG, JPG, JPEG)' }));
      return;
    }

    setUploadProgress(true);

    const reader = new FileReader();
    reader.onload = () => {
      const sizeFormatted = file.size > 1024 * 1024
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        : `${Math.round(file.size / 1024)} KB`;

      const screenshotData: ScreenshotFile = {
        name: file.name,
        url: reader.result as string,
        size: sizeFormatted,
      };

      setForm((prev) => ({
        ...prev,
        jazzCashScreenshot: screenshotData,
      }));

      setErrors((prev) => {
        const next = { ...prev };
        delete next.screenshot;
        return next;
      });

      setUploadProgress(false);
    };

    reader.readAsDataURL(file);
  };

  const handleRemoveScreenshot = () => {
    setForm((prev) => ({
      ...prev,
      jazzCashScreenshot: null,
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.fullName.trim()) {
      newErrors.fullName = 'Please enter your full recipient name';
    }
    if (!form.email.trim()) {
      newErrors.email = 'Please enter your email address for order confirmation';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email = 'Please enter a valid email address (e.g. name@gmail.com)';
    }
    if (!form.phone.trim()) {
      newErrors.phone = 'Please enter your contact or WhatsApp number';
    } else if (form.phone.replace(/[^0-9]/g, '').length < 10) {
      newErrors.phone = 'Please enter a valid 11-digit phone number (e.g. 0300-1234567)';
    }
    if (!form.address.trim()) {
      newErrors.address = 'Please provide your detailed street/house address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const orderNumber = `AC-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: PlacedOrder = {
      orderId: orderNumber,
      createdAt: new Date().toLocaleDateString('en-PK', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      items: [...items],
      subtotal,
      shippingFee,
      total,
      customer: { ...form },
    };

    // Dispatch email notifications via backend API
    try {
      await fetch('/api/send-order-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ order: newOrder }),
      });
    } catch (err) {
      console.warn('Email dispatch warning:', err);
    }

    setIsSubmitting(false);
    onOrderSuccess(newOrder);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Dark overlay */}
      <div
        className="fixed inset-0 bg-[#23272F]/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="min-h-screen px-4 py-8 flex items-center justify-center">
        <div className="relative bg-[#FFFDF5] w-full max-w-2xl rounded-3xl border border-[#F3E7C4] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="p-6 bg-[#FFF9E6] border-b border-[#F3E7C4] flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[11px] font-semibold tracking-widest text-[#C5A059] uppercase block">
                Express Checkout
              </span>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#23272F]">
                Complete Your Aura & Co. Order
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#7E8492] hover:text-[#23272F] rounded-full hover:bg-white transition-colors cursor-pointer"
              aria-label="Close checkout"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            
            {/* Section 1: Customer Details */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#736B59] flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>1. Customer & Recipient Information</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#23272F] mb-1">
                    Customer Name <span className="text-[#D32F2F]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ayesha Khan"
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-white border text-sm focus:outline-none transition-colors ${
                      errors.fullName
                        ? 'border-[#D32F2F] ring-1 ring-[#D32F2F]'
                        : 'border-[#F3E7C4] focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-[11px] text-[#D32F2F] mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#23272F] mb-1">
                    Email Address (For Confirmation) <span className="text-[#D32F2F]">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. ayesha@gmail.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-white border text-sm focus:outline-none transition-colors ${
                      errors.email
                        ? 'border-[#D32F2F] ring-1 ring-[#D32F2F]'
                        : 'border-[#F3E7C4] focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-[#D32F2F] mt-1">{errors.email}</p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-[#23272F] mb-1">
                    Phone / WhatsApp Number <span className="text-[#D32F2F]">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="0300 1234567"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-white border text-sm focus:outline-none transition-colors ${
                      errors.phone
                        ? 'border-[#D32F2F] ring-1 ring-[#D32F2F]'
                        : 'border-[#F3E7C4] focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-[11px] text-[#D32F2F] mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Section 2: Shipping Address */}
            <div className="space-y-4 pt-2 border-t border-[#F3E7C4]/70">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#736B59] flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>2. Shipping Address</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-[#23272F] mb-1">
                    Complete Shipping Address & Landmark <span className="text-[#D32F2F]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="House #, Street name, Sector / Area"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-white border text-sm focus:outline-none transition-colors ${
                      errors.address
                        ? 'border-[#D32F2F] ring-1 ring-[#D32F2F]'
                        : 'border-[#F3E7C4] focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]'
                    }`}
                  />
                  {errors.address && (
                    <p className="text-[11px] text-[#D32F2F] mt-1">{errors.address}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#23272F] mb-1">
                    City <span className="text-[#D32F2F]">*</span>
                  </label>
                  <select
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-[#F3E7C4] text-sm focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] focus:outline-none"
                  >
                    {pakistaniCities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#7E8492] mb-1">
                  Delivery Notes / Gift Ribbon Request (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ring bell or include gift note: 'Happy Birthday!'"
                  value={form.orderNotes}
                  onChange={(e) => setForm({ ...form, orderNotes: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#F3E7C4] text-xs focus:border-[#C5A059] focus:outline-none"
                />
              </div>
            </div>

            {/* Section 3: Payment Method Selection */}
            <div className="space-y-4 pt-2 border-t border-[#F3E7C4]/70">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#736B59] flex items-center gap-2">
                <Building className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>3. Payment Method Selection</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Cash on Delivery option */}
                <label
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                    form.paymentMethod === 'cod'
                      ? 'bg-white border-[#C5A059] ring-2 ring-[#C5A059]/30 shadow-xs'
                      : 'bg-white/70 border-[#F3E7C4] hover:border-[#C5A059]/60'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={form.paymentMethod === 'cod'}
                    onChange={() => setForm({ ...form, paymentMethod: 'cod' })}
                    className="mt-1 text-[#C5A059] focus:ring-[#C5A059]"
                  />
                  <div className="space-y-1">
                    <span className="block text-sm font-semibold text-[#23272F]">
                      Cash on Delivery (COD)
                    </span>
                    <span className="block text-xs text-[#5F6572] leading-snug">
                      Pay in cash at your doorstep when the courier delivers your parcel.
                    </span>
                  </div>
                </label>

                {/* JazzCash option */}
                <label
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                    form.paymentMethod === 'jazzcash'
                      ? 'bg-white border-[#C5A059] ring-2 ring-[#C5A059]/30 shadow-xs'
                      : 'bg-white/70 border-[#F3E7C4] hover:border-[#C5A059]/60'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="jazzcash"
                    checked={form.paymentMethod === 'jazzcash'}
                    onChange={() => setForm({ ...form, paymentMethod: 'jazzcash' })}
                    className="mt-1 text-[#C5A059] focus:ring-[#C5A059]"
                  />
                  <div className="space-y-1">
                    <span className="block text-sm font-semibold text-[#23272F]">
                      JazzCash Mobile Transfer
                    </span>
                    <span className="block text-xs text-[#5F6572] leading-snug">
                      Transfer total via JazzCash & attach receipt screenshot for VIP express dispatch.
                    </span>
                  </div>
                </label>
              </div>

              {/* JAZZCASH UPLOAD FEATURE: Dynamically revealed when JazzCash is selected */}
              {form.paymentMethod === 'jazzcash' && (
                <div className="bg-[#FFF9E6] border border-[#F3E7C4] rounded-2xl p-5 space-y-4 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#A9853C] uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Official JazzCash Account</span>
                    </div>
                    <span className="text-[11px] font-medium text-[#2E7D32] bg-[#E8F5E9] px-2 py-0.5 rounded">
                      Verified Merchant
                    </span>
                  </div>

                  {/* Account Numbers Card */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-white p-4 rounded-xl border border-[#F3E7C4]">
                    <div>
                      <span className="text-[#7E8492] block text-[10px] uppercase tracking-wider">Account Title</span>
                      <strong className="text-sm font-semibold text-[#23272F]">Aura & Co. Official</strong>
                    </div>
                    <div>
                      <span className="text-[#7E8492] block text-[10px] uppercase tracking-wider">JazzCash Mobile No.</span>
                      <strong className="text-sm font-semibold text-[#A9853C] tracking-wide">0302-8491023</strong>
                    </div>
                  </div>

                  <p className="text-xs text-[#5F6572] leading-relaxed">
                    <strong>Step 1:</strong> Transfer <strong>Rs. {total.toLocaleString()}</strong> to the JazzCash account above via JazzCash App or retailer.<br />
                    <strong>Step 2:</strong> Upload your transaction screenshot proof below to confirm your payment instantly.
                  </p>

                  {/* Dynamic Screenshot Upload Section */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-[#23272F]">
                      Attach Payment Transaction Screenshot Proof:
                    </label>

                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="jazzcash-file-input"
                    />

                    {!form.jazzCashScreenshot ? (
                      <label
                        htmlFor="jazzcash-file-input"
                        className="w-full py-6 px-4 rounded-2xl border-2 border-dashed border-[#C5A059]/60 hover:border-[#C5A059] bg-white hover:bg-[#FFFDF5] transition-all cursor-pointer flex flex-col items-center justify-center gap-2 text-center group"
                      >
                        <div className="w-11 h-11 rounded-full bg-[#FFF9E6] border border-[#F3E7C4] flex items-center justify-center text-[#C5A059] group-hover:scale-110 transition-transform">
                          <Upload className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-[#23272F]">
                            Click to browse or drop your payment screenshot
                          </p>
                          <p className="text-[11px] text-[#7E8492]">
                            Supports PNG, JPG, JPEG (Max 10MB)
                          </p>
                        </div>
                      </label>
                    ) : (
                      /* Uploaded Screenshot Preview Card */
                      <div className="bg-white p-3.5 rounded-2xl border border-[#C5A059] ring-2 ring-[#C5A059]/20 flex items-center justify-between gap-3 animate-in fade-in duration-200">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-14 h-14 rounded-xl overflow-hidden border border-[#F3E7C4] bg-slate-50 shrink-0">
                            <img
                              src={form.jazzCashScreenshot.url}
                              alt="Transaction Screenshot"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#2E7D32]">
                              <Check className="w-3.5 h-3.5" />
                              <span>Screenshot Proof Attached</span>
                            </div>
                            <p className="text-xs font-medium text-[#23272F] truncate">
                              {form.jazzCashScreenshot.name}
                            </p>
                            <span className="text-[10px] text-[#7E8492]">
                              {form.jazzCashScreenshot.size}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <label
                            htmlFor="jazzcash-file-input"
                            className="px-2.5 py-1.5 rounded-lg bg-[#FFF9E6] hover:bg-[#F3E7C4] text-[11px] font-medium text-[#736B59] transition-colors cursor-pointer"
                          >
                            Replace
                          </label>
                          <button
                            type="button"
                            onClick={handleRemoveScreenshot}
                            className="p-1.5 text-[#A0A5B1] hover:text-[#D32F2F] rounded-lg transition-colors cursor-pointer"
                            title="Remove screenshot"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    {errors.screenshot && (
                      <p className="text-[11px] text-[#D32F2F] mt-1">{errors.screenshot}</p>
                    )}
                  </div>

                  {/* TID / WhatsApp fallback */}
                  <div className="pt-2">
                    <label className="block text-xs font-medium text-[#7E8492] mb-1">
                      JazzCash TID (Optional if screenshot is attached):
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 192837465012"
                      value={form.jazzCashTid}
                      onChange={(e) => setForm({ ...form, jazzCashTid: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#F3E7C4] text-xs font-mono tracking-wider focus:border-[#C5A059] focus:outline-none"
                    />
                  </div>
                </div>
              )}

            </div>

            {/* Section 4: Order Breakdown Summary */}
            <div className="p-4 rounded-2xl bg-white border border-[#F3E7C4] space-y-2 text-xs">
              <div className="flex justify-between text-[#5F6572]">
                <span>Items Subtotal ({items.reduce((sum, i) => sum + i.quantity, 0)})</span>
                <span className="tabular-nums font-medium text-[#23272F]">Rs. {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#5F6572]">
                <span>Express Courier Shipping</span>
                <span className="tabular-nums font-medium text-[#23272F]">
                  {shippingFee === 0 ? <span className="text-[#2E7D32]">FREE</span> : `Rs. ${shippingFee}`}
                </span>
              </div>
              <div className="pt-2 border-t border-[#F3E7C4] flex justify-between text-base font-medium text-[#23272F]">
                <span className="font-serif-luxury text-lg">Total Amount Payable</span>
                <span className="font-semibold text-[#A9853C] tabular-nums">
                  Rs. {total.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="submit"
                disabled={isSubmitting || uploadProgress}
                className="w-full py-4 px-6 rounded-xl bg-[#23272F] hover:bg-[#A9853C] text-[#FFF9E6] font-medium text-xs sm:text-sm tracking-wider uppercase transition-all shadow-md hover:shadow-lg cursor-pointer disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[#FFF9E6] border-t-transparent rounded-full animate-spin" />
                    <span>Confirming Order...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                    <span>Place Order (Rs. {total.toLocaleString()})</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white text-[#5F6572] hover:text-[#23272F] border border-[#F3E7C4] text-xs font-medium transition-all cursor-pointer"
              >
                Cancel
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] text-[#7E8492]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Direct WhatsApp confirmation sent upon order submission</span>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
};
