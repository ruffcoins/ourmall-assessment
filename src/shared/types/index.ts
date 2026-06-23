export type Currency = 'EUR' | 'USD' | 'GBP';

export interface Vendor {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  vendorId: string;
  vendor: Vendor;
  name: string;
  description: string;
  imageUrl: string;
  basePrice: number;
  currency: Currency;
  category: string;
  stockCount: number;
  rating: number;
  reviewCount: number;
  discount?: {
    type: 'percentage' | 'fixed';
    value: number;
    expiresAt: string;
  } | null;
}

export interface CartItem {
  product: Product;
  quantity: number;
  addedAtPrice: number;
}

export interface VendorCartGroup {
  vendorId: string;
  vendorName: string;
  items: CartItem[];
  vendorSubtotal: number;
  vendorDiscounts: number;
  vendorTotal: number;
}

export interface GlobalCartState {
  activeCurrency: Currency;
  vendorGroups: Record<string, VendorCartGroup>;
  cartSubtotal: number;
  cartDiscounts: number;
  cartTotal: number;
}

export type ItemStatus = 'Pending' | 'Confirmed' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Returned';


export interface OrderLineItem {
  productId: string;
  name: string;
  quantity: number;
  pricePerItem: number;
  originalPrice: number;
  promoCode?: string;
  imageUrl: string;
  status: ItemStatus;
}

export interface VendorSubOrder {
  subOrderId: string;
  vendorId: string;
  vendorName: string;
  items: OrderLineItem[];
  subTotal: number;
  status: ItemStatus;
}

export interface MasterOrder {
  masterOrderId: string;
  userId: string;
  currency: Currency;
  vendorSubOrders: VendorSubOrder[];
  grandTotal: number;
  createdAt: string;
}

export type StockFilter = 'all' | 'inStock' | 'lowStock' | 'outOfStock';

export interface FilterState {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  stockStatus: StockFilter;
  search?: string;
}

export interface CancellationResult {
  itemName: string;
  vendorName: string;
  quantity: number;
  itemPrice: number;
  refundAmount: number;
}
