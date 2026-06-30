import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'expo-router';
import { useStore, mockApi, convertPrice, database, PROMO_CODES } from '../../../shared';

export function useCartViewModel() {
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    updateCartItemPrice, 
    updateCartItemProduct,
    activeCurrency,
    appliedPromo,
    setAppliedPromo
  } = useStore();
  
  const router = useRouter();
  const [isValidating, setIsValidating] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Sync cart items with the latest database state (for stock and price/offer expiry changes)
  const syncCartWithLatestDB = useCallback(async () => {
    if (cartItems.length === 0) return;
    try {
      const itemsToValidate = cartItems.map(item => ({
        productId: item.product.id,
        quantity: item.quantity,
        addedAtPrice: item.addedAtPrice,
      }));

      const result = await mockApi.validateCart(itemsToValidate, activeCurrency);
      
      // Sync items in store
      result.validatedItems.forEach(validItem => {
        const currentItem = cartItems.find(c => c.product.id === validItem.productId);
        if (currentItem) {
          if (validItem.allowedQuantity === 0) {
            updateCartItemProduct(validItem.productId, { stockCount: 0 });
          } else {
            const dbProduct = database.getProductById(validItem.productId);
            if (dbProduct) {
              updateCartItemProduct(validItem.productId, { stockCount: dbProduct.stockCount });
            }
            if (currentItem.quantity > validItem.allowedQuantity) {
              updateQuantity(validItem.productId, validItem.allowedQuantity);
            }
          }
          if (validItem.priceChanged) {
            updateCartItemPrice(validItem.productId, validItem.currentPrice);
          }
        }
      });

      const hasOOS = result.validatedItems.some(i => i.allowedQuantity === 0);
      if (hasOOS) {
        setValidationError('One or more items in your cart are out of stock. Please remove them to proceed.');
      } else if (!result.isValid) {
        const firstError = result.validatedItems.find(item => item.error)?.error;
        const firstWarning = result.validatedItems.find(item => item.warning)?.warning;
        
        if (firstError) {
          setValidationError(firstError);
        } else if (firstWarning) {
          setValidationError(firstWarning);
        }
      } else {
        setValidationError(null);
      }
    } catch (err) {
      console.error('Silent cart synchronization failed:', err);
    }
  }, [cartItems, activeCurrency, updateQuantity, updateCartItemPrice, updateCartItemProduct]);

  // Create a serialized string of items to prevent infinite useEffect loops while maintaining accurate tracking
  const cartItemsHash = cartItems.map(item => `${item.product.id}-${item.quantity}-${item.product.stockCount}-${item.addedAtPrice}`).join(',');

  useEffect(() => {
    // 1. Run sync immediately on mount or change
    syncCartWithLatestDB();

    // 2. Set up regular 10-second poll for external database/stock changes
    const pollInterval = setInterval(() => {
      syncCartWithLatestDB();
    }, 10000);

    // 3. Set up precise timer to trigger as soon as the next active discount expires
    let timer: any = null;
    const now = Date.now();
    let closestExpiryMs = Infinity;

    cartItems.forEach(item => {
      if (item.product.discount) {
        const expiresAt = new Date(item.product.discount.expiresAt).getTime();
        const diff = expiresAt - now;
        if (diff > 0 && diff < closestExpiryMs) {
          closestExpiryMs = diff;
        }
      }
    });

    if (closestExpiryMs !== Infinity) {
      // Trigger exactly at expiry + 500ms (buffer for database update)
      timer = setTimeout(() => {
        syncCartWithLatestDB();
      }, closestExpiryMs + 500);
    }

    return () => {
      clearInterval(pollInterval);
      if (timer) clearTimeout(timer);
    };
  }, [cartItemsHash, activeCurrency, syncCartWithLatestDB]);

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
    
    // Converted base price of the item
    const itemBasePrice = convertPrice(item.product.basePrice, activeCurrency, item.product.currency);
    // Current discounted price of the item
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

  const applyPromo = (code: string): boolean => {
    if (code.trim().toUpperCase() === PROMO_CODES.WELCOME10.code) {
      setAppliedPromo(PROMO_CODES.WELCOME10.code);
      return true;
    }
    return false;
  };

  const removePromo = () => {
    setAppliedPromo(null);
  };

  const hasOutOfStockItems = cartItems.some(item => item.product.stockCount === 0);

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    
    if (hasOutOfStockItems) {
      setValidationError('Please remove all out-of-stock items before proceeding to checkout.');
      return;
    }

    setIsValidating(true);
    setValidationError(null);
    
    try {
      const itemsToValidate = cartItems.map(item => ({
        productId: item.product.id,
        quantity: item.quantity,
        addedAtPrice: item.addedAtPrice,
      }));

      const result = await mockApi.validateCart(itemsToValidate, activeCurrency);
      
      const hasOOSAfterValidation = result.validatedItems.some(i => i.allowedQuantity === 0);
      
      // Update items in store
      result.validatedItems.forEach(validItem => {
        const currentItem = cartItems.find(c => c.product.id === validItem.productId);
        if (currentItem) {
          if (validItem.allowedQuantity === 0) {
            updateCartItemProduct(validItem.productId, { stockCount: 0 });
          } else {
            const dbProduct = database.getProductById(validItem.productId);
            if (dbProduct) {
              updateCartItemProduct(validItem.productId, { stockCount: dbProduct.stockCount });
            }
            if (currentItem.quantity > validItem.allowedQuantity) {
              updateQuantity(validItem.productId, validItem.allowedQuantity);
            }
          }
          if (validItem.priceChanged) {
            updateCartItemPrice(validItem.productId, validItem.currentPrice);
          }
        }
      });

      if (hasOOSAfterValidation) {
        setValidationError('One or more items in your cart are out of stock. Please remove them to proceed.');
        setIsValidating(false);
        return;
      }
      
      if (!result.isValid) {
        const firstError = result.validatedItems.find(item => item.error)?.error;
        const firstWarning = result.validatedItems.find(item => item.warning)?.warning;
        
        if (firstError) {
          setValidationError(firstError);
        } else if (firstWarning) {
          setValidationError(firstWarning);
        } else {
          setValidationError('Some items in your cart are no longer available or changed price.');
        }
        return;
      }

      router.push('/checkout');
    } catch (err) {
      setValidationError('Failed to validate cart. Please try again.');
    } finally {
      setIsValidating(false);
    }
  };

  return {
    cartItems,
    vendorGroups: vendorGroupsList,
    cartSubtotal,
    productDiscounts,
    promoDiscount: promoDiscountValue,
    cartTotal,
    appliedPromo,
    applyPromo,
    removePromo,
    getPriceText,
    updateQuantity,
    removeFromCart,
    handleCheckout,
    isValidating,
    validationError,
    hasOutOfStockItems,
  };
}
