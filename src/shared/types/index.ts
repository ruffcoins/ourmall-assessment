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
  imageUrl: string;
  basePrice: number;
  currency: Currency;
  category: string;
  stockCount: number;
  discount?: {
    type: 'percentage' | 'fixed';
    value: number;
    expiresAt: string;
  };
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

export type ItemStatus = 'Pending' | 'Confirmed' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface OrderLineItem {
  productId: string;
  name: string;
  quantity: number;
  pricePerItem: number;
  status: ItemStatus;
}

export interface VendorSubOrder {
  subOrderId: string;
  vendorId: string;
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
