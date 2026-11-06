export interface Product {
  id: string;
  name: string;
  category: 'necklaces' | 'earrings' | 'bracelets' | 'rings';
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  image: string;
  tag?: string;
  description: string;
  details: string[];
  material: string;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type PaymentMethod = 'cod' | 'jazzcash';

export interface ScreenshotFile {
  name: string;
  url: string;
  size: string;
}

export interface OrderForm {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode?: string;
  orderNotes?: string;
  paymentMethod: PaymentMethod;
  jazzCashTid?: string;
  jazzCashScreenshot?: ScreenshotFile | null;
}

export interface PlacedOrder {
  orderId: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  customer: OrderForm;
}
