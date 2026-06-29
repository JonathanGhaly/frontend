/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, Category, Order, ApiConfig, ApiLog } from '../types';

// Curated top-tier premium products
export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod_01',
    name: 'Acoustic ANC Wireless Headphones',
    description: 'Immersive sound with high-fidelity active noise cancellation, custom acoustic tuning, and refined aluminum earcups padded with memory foam for long-duration studio listening.',
    price: 299,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600',
    rating: 4.8,
    reviewsCount: 142,
    stock: 12,
    featured: true
  },
  {
    id: 'prod_02',
    name: 'Anodized Aluminum Mechanical Keyboard',
    description: 'Sleek tenkeyless mechanical keyboard featuring hot-swappable tactile switches, double-shot PBT keycaps, fully customizable RGB backlighting, and a heavy solid aluminum housing.',
    price: 189,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=600',
    rating: 4.9,
    reviewsCount: 88,
    stock: 5,
    featured: true
  },
  {
    id: 'prod_03',
    name: 'Premium Wool Felt Desk Pad',
    description: 'Crafted from sustainable 100% natural merino wool felt, this desk mat protects your workspace, absorbs keyboard noise, and adds rich architectural texture to your setup.',
    price: 49,
    category: 'Home & Living',
    image: 'https://images.unsplash.com/photo-1632292224971-0d45778b3002?auto=format&fit=crop&q=80&w=600',
    rating: 4.6,
    reviewsCount: 204,
    stock: 25,
    featured: false
  },
  {
    id: 'prod_04',
    name: 'Cast Concrete Incense Vessel',
    description: 'Brutalist-inspired solid concrete vessel, hand-poured in small batches. Perfect for elevating minimalist home decor while cleanly managing incense ash.',
    price: 28,
    category: 'Home & Living',
    image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&q=80&w=600',
    rating: 4.4,
    reviewsCount: 52,
    stock: 18,
    featured: false
  },
  {
    id: 'prod_05',
    name: 'Double-Walled Steel Termos Flask',
    description: 'Vacuum-insulated food-grade stainless steel bottle keeping your beverages ice-cold for 24 hours or piping hot for 12 hours. Features a tactile powder-coat finish.',
    price: 39,
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=600',
    rating: 4.7,
    reviewsCount: 310,
    stock: 40,
    featured: true
  },
  {
    id: 'prod_06',
    name: 'Curved Ultra-Wide Workstation Panel',
    description: '34-inch panoramic display with 21:9 aspect ratio and immersive 1500R curvature. Optimized for multitasking professionals who require immaculate color rendering.',
    price: 649,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=600',
    rating: 4.9,
    reviewsCount: 64,
    stock: 3,
    featured: true
  },
  {
    id: 'prod_07',
    name: 'Modular Cordura Tech Pouch',
    description: 'Weatherproof outer shield featuring YKK zippers, mesh dividers, and elastic loops to keep your cables, chargers, memory cards, and tech accessories meticulously organized.',
    price: 59,
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&q=80&w=600',
    rating: 4.5,
    reviewsCount: 119,
    stock: 15,
    featured: false
  },
  {
    id: 'prod_08',
    name: 'Vegetable-Tanned Leather Slim Wallet',
    description: 'Handcrafted from full-grain vegetable-tanned leather. Features an ultra-slim footprint with space for 6 cards and folded cash, forming a beautiful patina over time.',
    price: 75,
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=600',
    rating: 4.8,
    reviewsCount: 95,
    stock: 8,
    featured: false
  }
];

export const MOCK_CATEGORIES: Category[] = [
  { id: 'cat_all', name: 'All Products', slug: 'all', count: 8 },
  { id: 'cat_elec', name: 'Electronics', slug: 'electronics', count: 3 },
  { id: 'cat_home', name: 'Home & Living', slug: 'home-living', count: 2 },
  { id: 'cat_life', name: 'Lifestyle', slug: 'lifestyle', count: 3 }
];

// In-Memory Storage for Simulated State
let ordersDb: Order[] = [];

// API log listeners
type LogListener = (log: ApiLog) => void;
const logListeners = new Set<LogListener>();

export const addLogListener = (listener: LogListener) => {
  logListeners.add(listener);
  return () => logListeners.delete(listener);
};

const notifyLog = (log: ApiLog) => {
  logListeners.forEach((listener) => listener(log));
};

function createLog(
  method: ApiLog['method'],
  endpoint: string,
  type: ApiLog['type'],
  status: number | string,
  payload?: any
): ApiLog {
  const log: ApiLog = {
    id: Math.random().toString(36).substr(2, 9),
    timestamp: new Date().toLocaleTimeString(),
    method,
    endpoint,
    status,
    type,
    payload: payload ? JSON.stringify(payload, null, 2) : undefined
  };
  notifyLog(log);
  return log;
}

export const logApiRequest = (
  method: ApiLog['method'],
  endpoint: string,
  type: ApiLog['type'],
  status: number | string,
  payload?: any
) => {
  createLog(method, endpoint, type, status, payload);
};


export const getApiConfig = (): ApiConfig => {
  const saved = localStorage.getItem('dotnet_api_config');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      // fallback
    }
  }
  return {
    baseUrl: '',
    token: '',
    useMockFallback: true
  };
};

export const saveApiConfig = (config: ApiConfig) => {
  localStorage.setItem('dotnet_api_config', JSON.stringify(config));
};

// Generic Fetch Wrapper supporting headers and logging
async function request<T>(
  method: ApiLog['method'],
  endpoint: string,
  body?: any
): Promise<T> {
  const config = getApiConfig();
  const url = `${config.baseUrl.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;

  createLog(method, url, 'request', 'PENDING', body);

  if (config.useMockFallback || !config.baseUrl) {
    // Return mock response after short latency
    await new Promise((resolve) => setTimeout(resolve, 400));
    
    // Simple mock router
    if (method === 'GET' && endpoint.includes('products')) {
      const match = endpoint.match(/products\/([^/]+)/);
      if (match) {
        const product = MOCK_PRODUCTS.find((p) => String(p.id) === match[1]);
        if (product) {
          createLog(method, url, 'success', 200, product);
          return product as unknown as T;
        }
        createLog(method, url, 'error', 404, { message: 'Product not found' });
        throw new Error('Product not found');
      }
      createLog(method, url, 'success', 200, MOCK_PRODUCTS);
      return MOCK_PRODUCTS as unknown as T;
    }

    if (method === 'GET' && endpoint.includes('categories')) {
      createLog(method, url, 'success', 200, MOCK_CATEGORIES);
      return MOCK_CATEGORIES as unknown as T;
    }

    if (method === 'POST' && endpoint.includes('orders')) {
      const newOrder: Order = {
        id: `ord_${Math.floor(1000 + Math.random() * 9000)}`,
        date: new Date().toISOString(),
        items: body.items,
        subtotal: body.subtotal,
        tax: body.tax,
        shipping: body.shipping,
        total: body.total,
        status: 'Pending',
        shippingAddress: body.shippingAddress
      };
      ordersDb.unshift(newOrder);
      createLog(method, url, 'success', 201, newOrder);
      return newOrder as unknown as T;
    }

    if (method === 'GET' && endpoint.includes('orders')) {
      createLog(method, url, 'success', 200, ordersDb);
      return ordersDb as unknown as T;
    }

    // Health or ping
    createLog(method, url, 'success', 200, { status: 'healthy', provider: 'Mock' });
    return { status: 'healthy' } as unknown as T;
  }

  // Real fetch to .NET API
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json'
    };
    if (config.token) {
      headers['Authorization'] = `Bearer ${config.token}`;
    }

    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { message: `HTTP error! Status: ${response.status}` };
      }
      createLog(method, url, 'error', response.status, errorData);
      throw new Error(errorData.message || `Error ${response.status}`);
    }

    const data = await response.json();
    createLog(method, url, 'success', response.status, data);
    return data as T;
  } catch (err: any) {
    createLog(method, url, 'error', 'FAILED', { error: err.message || 'Network request failed' });
    throw err;
  }
}

// Public API surface
export const ApiService = {
  getProducts: async (): Promise<Product[]> => {
    return request<Product[]>('GET', 'products');
  },

  getProductById: async (id: string | number): Promise<Product> => {
    return request<Product>('GET', `products/${id}`);
  },

  getCategories: async (): Promise<Category[]> => {
    return request<Category[]>('GET', 'categories');
  },

  createOrder: async (orderData: Omit<Order, 'id' | 'date' | 'status'>): Promise<Order> => {
    return request<Order>('POST', 'orders', orderData);
  },

  getOrders: async (): Promise<Order[]> => {
    return request<Order[]>('GET', 'orders');
  },

  testConnection: async (baseUrl: string, token: string): Promise<boolean> => {
    const originalConfig = getApiConfig();
    try {
      // Temporarily set configuration to test
      const tempConfig: ApiConfig = { baseUrl, token, useMockFallback: false };
      localStorage.setItem('dotnet_api_config', JSON.stringify(tempConfig));

      // Try calling "products" or standard health endpoint
      // We will try products because that is most universal for an e-commerce backend
      await request<any>('GET', 'products');
      return true;
    } catch {
      // Revert to original
      localStorage.setItem('dotnet_api_config', JSON.stringify(originalConfig));
      return false;
    }
  }
};
