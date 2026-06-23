import type { Product } from '../../../shared';
import { 
  getProductCurrentPrice, 
  formatCurrency, 
  useCountdown, 
  useStore, 
  convertPrice 
} from '../../../shared';

export function useProductCardViewModel(product: Product) {
  const { activeCurrency } = useStore();
  const targetDate = product.discount?.expiresAt || '1970-01-01T00:00:00Z';
  
  const { isExpired, formattedTime } = useCountdown(targetDate);
  const { price, isDiscounted } = getProductCurrentPrice(product, activeCurrency);
  
  const isCurrentlyDiscounted = isDiscounted && !isExpired;
  
  const basePriceConverted = convertPrice(product.basePrice, activeCurrency, product.currency);
  
  const priceText = formatCurrency(price, activeCurrency);
  const originalPriceText = isCurrentlyDiscounted 
    ? formatCurrency(basePriceConverted, activeCurrency) 
    : null;

  const discountTimeRemaining = isCurrentlyDiscounted 
    ? `Ends in ${formattedTime}` 
    : '';

  let stockStatusText: string | null = null;
  if (product.stockCount > 0 && product.stockCount <= 3) {
    stockStatusText = `🔥 Selling fast! Only ${product.stockCount} left`;
  }

  return {
    name: product.name,
    imageUrl: product.imageUrl,
    category: product.category,
    vendorName: product.vendor.name,
    priceText,
    price,
    originalPriceText,
    isDiscounted: isCurrentlyDiscounted,
    discountTimeRemaining,
    formattedTime: isCurrentlyDiscounted ? formattedTime : '',
    stockStatusText,
    isOutOfStock: product.stockCount === 0,
    isLowStock: product.stockCount > 0 && product.stockCount <= 3,
  };
}
