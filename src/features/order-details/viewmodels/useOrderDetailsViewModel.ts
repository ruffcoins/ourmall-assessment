import { useStore } from '../../../shared';
import { useRouter } from 'expo-router';

export function useOrderDetailsViewModel(orderId: string) {
  const { orders, activeCurrency } = useStore();
  const router = useRouter();

  const order = orders.find(o => o.masterOrderId === orderId);

  const getPriceText = (price: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: order?.currency ?? activeCurrency,
    }).format(price);

  const handleCancelItem = (vendorId: string, productId: string) => {
    router.push({
      pathname: `/order/${orderId}/cancel`,
      params: { vendorId, productId },
    });
  };

  return {
    order,
    getPriceText,
    handleCancelItem,
  };
}
