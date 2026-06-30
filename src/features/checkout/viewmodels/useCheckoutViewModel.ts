import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useStore, mockApi, convertPrice, PROMO_CODES } from '../../../shared';

export function useCheckoutViewModel() {
  const { 
    cartItems, 
    activeCurrency, 
    clearCart, 
    addOrder,
    appliedPromo,
    setAppliedPromo
  } = useStore();
  
  const router = useRouter();

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [shippingDetails, setShippingDetails] = useState({
    fullName: 'John Doe',
    address: '123 Main St, Apt 4B',
    city: 'Berlin',
    postalCode: '10115',
    country: 'Germany'
  });

  // Group cart items by vendor and calculate vendor totals
  const vendorGroups = cartItems.reduce<Record<string, { 
    vendorId: string;
    vendorName: string; 
    items: typeof cartItems; 
    subtotal: number; 
    discount: number; 
    total: number; 
  }>>((groups, item) => {
    const vendorId = item.product.vendor.id;
    const vendorName = item.product.vendor.name;
    
    if (!groups[vendorId]) {
      groups[vendorId] = {
        vendorId,
        vendorName,
        items: [],
        subtotal: 0,
        discount: 0,
        total: 0,
      };
    }
    
    const itemBasePrice = convertPrice(item.product.basePrice, activeCurrency, item.product.currency);
    const itemCurrentPrice = item.addedAtPrice;
    
    const itemSubtotal = itemBasePrice * item.quantity;
    const itemDiscount = (itemBasePrice - itemCurrentPrice) * item.quantity;
    const itemTotal = itemCurrentPrice * item.quantity;
    
    groups[vendorId].items.push(item);
    groups[vendorId].subtotal += itemSubtotal;
    groups[vendorId].discount += itemDiscount;
    groups[vendorId].total += itemTotal;
    
    return groups;
  }, {});

  const vendorGroupsList = Object.values(vendorGroups);

  // Dynamic pricing breakdown
  const cartSubtotal = vendorGroupsList.reduce((sum, g) => sum + g.subtotal, 0);
  const productDiscounts = vendorGroupsList.reduce((sum, g) => sum + g.discount, 0);
  
  const prePromoTotal = cartSubtotal - productDiscounts;
  const promoDiscountValue = appliedPromo === PROMO_CODES.WELCOME10.code
    ? Math.round(prePromoTotal * (PROMO_CODES.WELCOME10.discountPercent / 100) * 100) / 100
    : 0;

  const cartTotal = Math.max(0, cartSubtotal - productDiscounts - promoDiscountValue);

  const getPriceText = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: activeCurrency,
    }).format(price);
  };

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) return;
    
    setIsProcessing(true);
    setError(null);
    
    try {
      const itemsToCheckout = cartItems.map(item => ({
        productId: item.product.id,
        quantity: item.quantity
      }));

      const userId = 'USER-123';
      const order = await mockApi.checkout(
        userId,
        itemsToCheckout,
        activeCurrency,
        appliedPromo ?? undefined
      );

      // Store the master order globally
      addOrder(order);
      
      // Clear cart and reset promo code
      clearCart();
      setAppliedPromo(null);

      // Navigate to order success with order ID
      router.replace({
        pathname: '/order-success',
        params: { orderId: order.masterOrderId }
      });
    } catch (err: any) {
      setError(err.message || 'Failed to process order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    cartItems,
    vendorGroups: vendorGroupsList,
    cartSubtotal,
    productDiscounts,
    promoDiscount: promoDiscountValue,
    cartTotal,
    getPriceText,
    isProcessing,
    error,
    shippingDetails,
    setShippingDetails,
    handlePlaceOrder
  };
}
