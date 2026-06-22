import { Product, Vendor, MasterOrder } from '../types';

export const mockVendors: Vendor[] = [
  { id: 'vendor-a', name: 'Global Gadgets' },
  { id: 'vendor-b', name: 'Fashion Hub' },
  { id: 'vendor-c', name: 'Daily Goods' },
];

const createMockProducts = (): Product[] => {
  const now = new Date();
  
  return [
    {
      id: 'prod-1',
      vendorId: 'vendor-a',
      vendor: mockVendors[0],
      name: 'Super Bass Wireless Headphones',
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60',
      basePrice: 100,
      currency: 'EUR',
      category: 'Electronics',
      stockCount: 10,
      discount: {
        type: 'percentage',
        value: 20,
        expiresAt: new Date(now.getTime() + 60 * 1000).toISOString(),
      },
    },
    {
      id: 'prod-2',
      vendorId: 'vendor-a',
      vendor: mockVendors[0],
      name: 'Ergonomic Office Chair',
      imageUrl: 'https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=500&auto=format&fit=crop&q=60',
      basePrice: 250,
      currency: 'EUR',
      category: 'Furniture',
      stockCount: 2,
      discount: {
        type: 'fixed',
        value: 50,
        expiresAt: new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString(),
      },
    },
    {
      id: 'prod-3',
      vendorId: 'vendor-a',
      vendor: mockVendors[0],
      name: 'Smart Watch Series 5',
      imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60',
      basePrice: 300,
      currency: 'EUR',
      category: 'Electronics',
      stockCount: 0,
    },
    {
      id: 'prod-4',
      vendorId: 'vendor-b',
      vendor: mockVendors[1],
      name: 'Premium Leather Jacket',
      imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&auto=format&fit=crop&q=60',
      basePrice: 180,
      currency: 'EUR',
      category: 'Clothing',
      stockCount: 15,
      discount: {
        type: 'percentage',
        value: 15,
        expiresAt: new Date(now.getTime() + 5 * 60 * 1000).toISOString(),
      },
    },
    {
      id: 'prod-5',
      vendorId: 'vendor-b',
      vendor: mockVendors[1],
      name: 'Runners Light Sports Shoes',
      imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60',
      basePrice: 80,
      currency: 'EUR',
      category: 'Clothing',
      stockCount: 20,
    },
    {
      id: 'prod-6',
      vendorId: 'vendor-c',
      vendor: mockVendors[2],
      name: 'Stainless Steel Water Bottle',
      imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&auto=format&fit=crop&q=60',
      basePrice: 25,
      currency: 'EUR',
      category: 'Accessories',
      stockCount: 50,
      discount: {
        type: 'percentage',
        value: 10,
        expiresAt: new Date(now.getTime() + 30 * 1000).toISOString(),
      },
    },
  ];
};

let dbProducts: Product[] = createMockProducts();
let dbOrders: MasterOrder[] = [];

export const database = {
  getProducts: (): Product[] => dbProducts,
  
  getProductById: (id: string): Product | undefined => {
    return dbProducts.find(p => p.id === id);
  },
  
  updateProductStock: (id: string, newStock: number): boolean => {
    const product = dbProducts.find(p => p.id === id);
    if (product) {
      product.stockCount = Math.max(0, newStock);
      return true;
    }
    return false;
  },
  
  getOrders: (): MasterOrder[] => dbOrders,
  
  getOrderById: (orderId: string): MasterOrder | undefined => {
    return dbOrders.find(o => o.masterOrderId === orderId);
  },
  
  saveOrder: (order: MasterOrder): void => {
    const index = dbOrders.findIndex(o => o.masterOrderId === order.masterOrderId);
    if (index !== -1) {
      dbOrders[index] = order;
    } else {
      dbOrders.push(order);
    }
  },
  
  resetDatabase: (): void => {
    dbProducts = createMockProducts();
    dbOrders = [];
  }
};

