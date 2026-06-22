import { Product, MasterOrder, VendorSubOrder, OrderLineItem, ItemStatus, Currency } from '../types';
import { database } from '../data/db';
import { convertPrice } from './currency';

let simulateApiFailure = false;

export const apiConfig = {
  setSimulateApiFailure: (value: boolean) => {
    simulateApiFailure = value;
  },
  getSimulateApiFailure: () => simulateApiFailure,
};

const delay = (ms: number = 800) => new Promise(resolve => setTimeout(resolve, ms));

export function getProductCurrentPrice(product: Product, targetCurrency: Currency = 'EUR'): { 
  price: number; 
  isDiscounted: boolean; 
  discountExpiryRemainingMs: number;
} {
  let finalPrice = product.basePrice;
  let isDiscounted = false;
  let expiryRemaining = 0;

  if (product.discount) {
    const expiry = new Date(product.discount.expiresAt).getTime();
    const now = Date.now();
    if (expiry > now) {
      if (product.discount.type === 'percentage') {
        finalPrice = product.basePrice * (1 - product.discount.value / 100);
      } else if (product.discount.type === 'fixed') {
        finalPrice = Math.max(0, product.basePrice - product.discount.value);
      }
      isDiscounted = true;
      expiryRemaining = expiry - now;
    }
  }

  // Convert from product's native currency to the target currency
  const convertedPrice = convertPrice(finalPrice, targetCurrency, product.currency);
  
  return { 
    price: convertedPrice, 
    isDiscounted, 
    discountExpiryRemainingMs: expiryRemaining 
  };
}

export function deriveSubOrderStatus(items: OrderLineItem[]): ItemStatus {
  if (items.length === 0) return 'Pending';
  
  const statuses = items.map(i => i.status);
  
  if (statuses.every(s => s === 'Cancelled')) return 'Cancelled';
  if (statuses.every(s => s === 'Delivered')) return 'Delivered';
  
  const activeItems = items.filter(i => i.status !== 'Cancelled');
  if (activeItems.length === 0) return 'Cancelled';
  
  const activeStatuses = activeItems.map(i => i.status);
  if (activeStatuses.every(s => s === 'Delivered')) return 'Delivered';
  if (activeStatuses.some(s => s === 'Shipped')) return 'Shipped';
  if (activeStatuses.some(s => s === 'Confirmed')) return 'Confirmed';
  
  return 'Pending';
}

export const mockApi = {
  fetchProducts: async (filters: {
    search?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    inStockOnly?: boolean;
    currency?: Currency;
    page: number;
    limit: number;
  }): Promise<{ products: Product[]; totalCount: number; hasMore: boolean }> => {
    await delay();
    if (simulateApiFailure) {
      throw new Error('Network Error: Failed to fetch products.');
    }

    const targetCurrency = filters.currency || 'EUR';
    let products = [...database.getProducts()];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      products = products.filter(
        p => p.name.toLowerCase().includes(searchLower) || p.vendor.name.toLowerCase().includes(searchLower)
      );
    }

    if (filters.category) {
      products = products.filter(p => p.category.toLowerCase() === filters.category!.toLowerCase());
    }

    if (filters.minPrice !== undefined) {
      products = products.filter(p => {
        const { price } = getProductCurrentPrice(p, targetCurrency);
        return price >= filters.minPrice!;
      });
    }

    if (filters.maxPrice !== undefined) {
      products = products.filter(p => {
        const { price } = getProductCurrentPrice(p, targetCurrency);
        return price <= filters.maxPrice!;
      });
    }

    if (filters.inStockOnly) {
      products = products.filter(p => p.stockCount > 0);
    }

    const totalCount = products.length;
    const startIndex = (filters.page - 1) * filters.limit;
    const paginatedProducts = products.slice(startIndex, startIndex + filters.limit);
    const hasMore = startIndex + filters.limit < totalCount;

    return {
      products: paginatedProducts,
      totalCount,
      hasMore,
    };
  },

  validateCart: async (
    items: Array<{ productId: string; quantity: number; addedAtPrice: number }>,
    currency: Currency = 'EUR'
  ): Promise<{
    isValid: boolean;
    validatedItems: Array<{
      productId: string;
      requestedQuantity: number;
      allowedQuantity: number;
      addedAtPrice: number;
      currentPrice: number;
      priceChanged: boolean;
      stockStatus: 'InStock' | 'LowStock' | 'OutOfStock';
      warning?: string;
      error?: string;
    }>;
  }> => {
    await delay();
    if (simulateApiFailure) {
      throw new Error('Network Error: Failed to validate cart.');
    }

    let isValid = true;
    const validatedItems = items.map(item => {
      const product = database.getProductById(item.productId);
      if (!product) {
        isValid = false;
        return {
          productId: item.productId,
          requestedQuantity: item.quantity,
          allowedQuantity: 0,
          addedAtPrice: item.addedAtPrice,
          currentPrice: 0,
          priceChanged: false,
          stockStatus: 'OutOfStock' as const,
          error: 'Product no longer exists.',
        };
      }

      const { price: currentPrice } = getProductCurrentPrice(product, currency);
      const priceChanged = Math.abs(currentPrice - item.addedAtPrice) > 0.01;
      
      let allowedQuantity = item.quantity;
      let stockStatus: 'InStock' | 'LowStock' | 'OutOfStock' = 'InStock';
      let error: string | undefined;
      let warning: string | undefined;

      if (product.stockCount === 0) {
        allowedQuantity = 0;
        stockStatus = 'OutOfStock';
        error = 'This item is now out of stock.';
        isValid = false;
      } else if (product.stockCount < item.quantity) {
        allowedQuantity = product.stockCount;
        stockStatus = 'LowStock';
        error = `Only ${product.stockCount} items left in stock. Quantity adjusted.`;
        isValid = false;
      } else if (product.stockCount <= 3) {
        stockStatus = 'LowStock';
        warning = `Hurry! Only ${product.stockCount} items left in stock.`;
      }

      if (priceChanged) {
        warning = warning 
          ? `${warning} Note: Price updated to ${currentPrice}.`
          : `Note: Price updated to ${currentPrice}.`;
        isValid = false;
      }

      return {
        productId: item.productId,
        requestedQuantity: item.quantity,
        allowedQuantity,
        addedAtPrice: item.addedAtPrice,
        currentPrice,
        priceChanged,
        stockStatus,
        warning,
        error,
      };
    });

    return {
      isValid,
      validatedItems,
    };
  },

  checkout: async (
    userId: string,
    items: Array<{ productId: string; quantity: number }>,
    currency: Currency = 'EUR'
  ): Promise<MasterOrder> => {
    await delay();
    if (simulateApiFailure) {
      throw new Error('Network Error: Checkout failed.');
    }

    const validationItems = items.map(item => {
      const prod = database.getProductById(item.productId);
      const { price } = prod ? getProductCurrentPrice(prod, currency) : { price: 0 };
      return { productId: item.productId, quantity: item.quantity, addedAtPrice: price };
    });

    const validationResult = await mockApi.validateCart(validationItems, currency);
    
    const hasBlockingError = validationResult.validatedItems.some(item => item.error !== undefined);
    if (hasBlockingError) {
      throw new Error('Checkout validation failed: Some items are unavailable.');
    }

    const itemsByVendor: Record<string, Array<{ product: Product; quantity: number; price: number }>> = {};

    for (const item of items) {
      const product = database.getProductById(item.productId)!;
      const { price } = getProductCurrentPrice(product, currency);
      
      database.updateProductStock(product.id, product.stockCount - item.quantity);

      if (!itemsByVendor[product.vendorId]) {
        itemsByVendor[product.vendorId] = [];
      }
      itemsByVendor[product.vendorId].push({
        product,
        quantity: item.quantity,
        price,
      });
    }

    const masterOrderId = `ORDER-${Math.floor(100000 + Math.random() * 900000)}`;
    const vendorSubOrders: VendorSubOrder[] = [];
    let grandTotal = 0;

    for (const vendorId of Object.keys(itemsByVendor)) {
      const vendorItems = itemsByVendor[vendorId];
      const subOrderId = `${masterOrderId}-VND-${vendorId.substring(7).toUpperCase()}`;

      const lineItems: OrderLineItem[] = vendorItems.map(vi => ({
        productId: vi.product.id,
        name: vi.product.name,
        quantity: vi.quantity,
        pricePerItem: vi.price,
        status: 'Pending',
      }));

      const subTotal = lineItems.reduce((acc, curr) => acc + curr.pricePerItem * curr.quantity, 0);
      grandTotal += subTotal;

      vendorSubOrders.push({
        subOrderId,
        vendorId,
        items: lineItems,
        subTotal: Math.round(subTotal * 100) / 100,
        status: 'Pending',
      });
    }

    const order: MasterOrder = {
      masterOrderId,
      userId,
      currency,
      vendorSubOrders,
      grandTotal: Math.round(grandTotal * 100) / 100,
      createdAt: new Date().toISOString(),
    };

    database.saveOrder(order);

    return order;
  },

  cancelOrderItem: async (
    orderId: string,
    vendorId: string,
    productId: string
  ): Promise<{ order: MasterOrder; refundedAmount: number }> => {
    await delay();
    if (simulateApiFailure) {
      throw new Error('Network Error: Failed to cancel item.');
    }

    const order = database.getOrderById(orderId);
    if (!order) {
      throw new Error('Order not found.');
    }

    const subOrder = order.vendorSubOrders.find(so => so.vendorId === vendorId);
    if (!subOrder) {
      throw new Error('Vendor sub-order not found.');
    }

    const lineItem = subOrder.items.find(i => i.productId === productId);
    if (!lineItem) {
      throw new Error('Item not found in sub-order.');
    }

    if (lineItem.status === 'Cancelled') {
      return { order, refundedAmount: 0 };
    }

    lineItem.status = 'Cancelled';
    const refundedAmount = Math.round((lineItem.pricePerItem * lineItem.quantity) * 100) / 100;

    const product = database.getProductById(productId);
    if (product) {
      database.updateProductStock(productId, product.stockCount + lineItem.quantity);
    }

    const activeItems = subOrder.items.filter(i => i.status !== 'Cancelled');
    const newSubTotal = activeItems.reduce((acc, curr) => acc + curr.pricePerItem * curr.quantity, 0);
    subOrder.subTotal = Math.round(newSubTotal * 100) / 100;
    
    subOrder.status = deriveSubOrderStatus(subOrder.items);

    const newGrandTotal = order.vendorSubOrders.reduce((acc, curr) => acc + curr.subTotal, 0);
    order.grandTotal = Math.round(newGrandTotal * 100) / 100;

    database.saveOrder(order);

    return {
      order,
      refundedAmount,
    };
  },

  cancelVendorSubOrder: async (
    orderId: string,
    vendorId: string
  ): Promise<{ order: MasterOrder; refundedAmount: number }> => {
    await delay();
    if (simulateApiFailure) {
      throw new Error('Network Error: Failed to cancel vendor order.');
    }

    const order = database.getOrderById(orderId);
    if (!order) {
      throw new Error('Order not found.');
    }

    const subOrder = order.vendorSubOrders.find(so => so.vendorId === vendorId);
    if (!subOrder) {
      throw new Error('Vendor sub-order not found.');
    }

    let refundedAmount = 0;

    for (const item of subOrder.items) {
      if (item.status !== 'Cancelled') {
        item.status = 'Cancelled';
        refundedAmount += item.pricePerItem * item.quantity;
        
        const product = database.getProductById(item.productId);
        if (product) {
          database.updateProductStock(item.productId, product.stockCount + item.quantity);
        }
      }
    }

    refundedAmount = Math.round(refundedAmount * 100) / 100;
    subOrder.subTotal = 0;
    subOrder.status = 'Cancelled';

    const newGrandTotal = order.vendorSubOrders.reduce((acc, curr) => acc + curr.subTotal, 0);
    order.grandTotal = Math.round(newGrandTotal * 100) / 100;

    database.saveOrder(order);

    return {
      order,
      refundedAmount,
    };
  },

  cancelMasterOrder: async (orderId: string): Promise<{ order: MasterOrder; refundedAmount: number }> => {
    await delay();
    if (simulateApiFailure) {
      throw new Error('Network Error: Failed to cancel full order.');
    }

    const order = database.getOrderById(orderId);
    if (!order) {
      throw new Error('Order not found.');
    }

    let refundedAmount = 0;

    for (const subOrder of order.vendorSubOrders) {
      for (const item of subOrder.items) {
        if (item.status !== 'Cancelled') {
          item.status = 'Cancelled';
          refundedAmount += item.pricePerItem * item.quantity;

          const product = database.getProductById(item.productId);
          if (product) {
            database.updateProductStock(item.productId, product.stockCount + item.quantity);
          }
        }
      }
      subOrder.subTotal = 0;
      subOrder.status = 'Cancelled';
    }

    refundedAmount = Math.round(refundedAmount * 100) / 100;
    order.grandTotal = 0;

    database.saveOrder(order);

    return {
      order,
      refundedAmount,
    };
  }
};
