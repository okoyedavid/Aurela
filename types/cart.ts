import { ProductSpecifications, ProductVariantProps } from "./products";

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  variant?: {
    size?: string;
    color?: string;
    material?: string;
  };
  maxQuantity: number;
}

export interface PromoCode {
  code: string;
  type: "percentage" | "fixed";
  value: number;
  minOrder?: number;
}

export interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface PaymentInfo {
  method: "card" | "paypal" | "apple_pay";
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  cardName?: string;
}

export interface OrderSummary {
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  total: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  shipping: ShippingInfo;
  payment: PaymentInfo;
  summary: OrderSummary;
  promoCode?: string;
  createdAt: Date;
  status: "pending" | "processing" | "shipped" | "delivered";
}

export type ProductProps = {
  id: string;
  images: string[];
  name: string;
  price: number;
  description: string;
  originalPrice?: number;
  category: string;
  image: string;
  subcategory: string;
  brand: string;
  variants: ProductVariantProps[];
  specifications: ProductSpecifications;
  tags: string[];
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewCount: number;
  badge?: string;
  featured: boolean;
};
