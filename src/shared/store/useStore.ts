import { create } from 'zustand';
import { Currency, CartItem, MasterOrder, FilterState, Product } from '../types';
import { getDefaultCurrency } from '../utils';

interface GlobalState {
  // Currency slice
  activeCurrency: Currency;
  setCurrency: (currency: Currency) => void;

  // Cart slice
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  updateCartItemPrice: (productId: string, price: number) => void;
  updateCartItemProduct: (productId: string, updatedFields: Partial<Product>) => void;
  clearCart: () => void;

  // Filter slice
  filter: FilterState;
  setFilter: (filter: Partial<FilterState>) => void;
  resetFilter: () => void;

  // Orders slice
  orders: MasterOrder[];
  addOrder: (order: MasterOrder) => void;
  updateOrder: (order: MasterOrder) => void;

  // Promo slice
  appliedPromo: string | null;
  setAppliedPromo: (promo: string | null) => void;

  // Splash slice
  hasShownSplash: boolean;
  setHasShownSplash: (value: boolean) => void;

  // Theme slice
  isDark: boolean;
  setIsDark: (value: boolean) => void;
  toggleTheme: () => void;
}

const defaultFilter: FilterState = {
  stockStatus: 'all',
};

export const useStore = create<GlobalState>((set, get) => ({
  // Theme slice
  isDark: false,
  setIsDark: (value) => set({ isDark: value }),
  toggleTheme: () => set((state) => ({ isDark: !state.isDark })),

  // Promo slice
  appliedPromo: null,
  setAppliedPromo: (promo) => set({ appliedPromo: promo }),

  // Splash slice
  hasShownSplash: false,
  setHasShownSplash: (value) => set({ hasShownSplash: value }),

  // Currency slice
  activeCurrency: getDefaultCurrency(),
  setCurrency: (currency) => set({ activeCurrency: currency }),

  // Cart slice
  cartItems: [],
  addToCart: (item) => set((state) => {
    const existing = state.cartItems.find(i => i.product.id === item.product.id);
    const maxStock = item.product.stockCount;
    if (existing) {
      const newQty = Math.min(existing.quantity + item.quantity, maxStock);
      return {
        cartItems: state.cartItems.map(i =>
          i.product.id === item.product.id
            ? { ...i, quantity: newQty }
            : i
        )
      };
    }
    return { cartItems: [...state.cartItems, { ...item, quantity: Math.min(item.quantity, maxStock) }] };
  }),
  removeFromCart: (productId) => set((state) => ({
    cartItems: state.cartItems.filter(i => i.product.id !== productId)
  })),
  updateQuantity: (productId, quantity) => set((state) => {
    if (quantity <= 0) {
      return { cartItems: state.cartItems.filter(i => i.product.id !== productId) };
    }
    return {
      cartItems: state.cartItems.map(i =>
        i.product.id === productId ? { ...i, quantity } : i
      )
    };
  }),
  updateCartItemPrice: (productId, price) => set((state) => ({
    cartItems: state.cartItems.map(i => 
      i.product.id === productId ? { ...i, addedAtPrice: price } : i
    )
  })),
  updateCartItemProduct: (productId, updatedFields) => set((state) => ({
    cartItems: state.cartItems.map(i =>
      i.product.id === productId
        ? { ...i, product: { ...i.product, ...updatedFields } }
        : i
    )
  })),
  clearCart: () => set({ cartItems: [] }),

  // Filter slice
  filter: defaultFilter,
  setFilter: (newFilter) => set((state) => ({
    filter: { ...state.filter, ...newFilter }
  })),
  resetFilter: () => set({ filter: defaultFilter }),

  // Orders slice
  orders: [],
  addOrder: (order) => set((state) => ({
    orders: [order, ...state.orders]
  })),
  updateOrder: (order) => set((state) => ({
    orders: state.orders.map(o => o.masterOrderId === order.masterOrderId ? order : o)
  })),
}));
