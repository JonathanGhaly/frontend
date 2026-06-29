/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string | number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  reviewsCount: number;
  stock: number;
  featured?: boolean;
  sku?: string;
  currency?: string;
  isActive?: boolean;
  metadata?: Record<string, any> | null;
}

export interface Category {
  id: string;
  name: string;
  count: number;
  slug: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  shippingAddress: {
    fullName: string;
    email: string;
    address: string;
    city: string;
    zipCode: string;
    country: string;
  };
}

export interface ApiConfig {
  baseUrl: string;
  token: string;
  useMockFallback: boolean;
}

export interface ApiLog {
  id: string;
  timestamp: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  endpoint: string;
  status: number | string;
  type: 'request' | 'success' | 'error';
  payload?: string;
}
