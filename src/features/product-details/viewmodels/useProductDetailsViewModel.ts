import { useQuery } from '@tanstack/react-query';
import { mockApi, useStore, Product, getProductCurrentPrice, convertPrice, useCountdown } from '../../../shared';

export function useProductDetailsViewModel(productId: string) {
  const { activeCurrency, addToCart, cartItems } = useStore();

  const { data: product, isLoading, error, refetch } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => mockApi.getProduct(productId),
  });

  const cartItem = cartItems.find((item) => item.product.id === productId);
  const cartQuantity = cartItem?.quantity || 0;

  const currentPriceInfo = product ? getProductCurrentPrice(product, activeCurrency) : null;
  
  const targetDate = product?.discount?.expiresAt || '1970-01-01T00:00:00Z';
  const { isExpired, formattedTime } = useCountdown(targetDate);
  
  const isCurrentlyDiscounted = !!(currentPriceInfo?.isDiscounted) && !isExpired;

  const getPriceText = () => {
    if (!product || !currentPriceInfo) return '';
    const priceToFormat = isCurrentlyDiscounted ? currentPriceInfo.price : convertPrice(product.basePrice, activeCurrency, product.currency);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: activeCurrency,
    }).format(priceToFormat);
  };

  const getOriginalPriceText = () => {
    if (!product || !isCurrentlyDiscounted) return '';
    const convertedOriginal = convertPrice(product.basePrice, activeCurrency, product.currency);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: activeCurrency,
    }).format(convertedOriginal);
  };

  const isOutOfStock = product?.stockCount === 0;

  const handleAddToCart = (quantity: number = 1) => {
    if (product && !isOutOfStock && currentPriceInfo) {
      const addedPrice = isCurrentlyDiscounted ? currentPriceInfo.price : convertPrice(product.basePrice, activeCurrency, product.currency);
      addToCart({
        product,
        quantity,
        addedAtPrice: addedPrice
      });
    }
  };

  return {
    product,
    isLoading,
    error,
    refetch,
    getPriceText,
    getOriginalPriceText,
    isDiscounted: isCurrentlyDiscounted,
    discountTimeRemaining: isCurrentlyDiscounted ? `Ends in ${formattedTime}` : '',
    isOutOfStock,
    cartQuantity,
    handleAddToCart,
  };
}
