import { useRouter } from 'expo-router';
import { useStore, formatCurrency } from '../../../shared';

export function useOrderSuccessViewModel(orderId: string) {
  const router = useRouter();
  const { orders, activeCurrency } = useStore();
  
  const order = orders.find(o => o.masterOrderId === orderId);
  const totalPaidNum = order ? order.grandTotal : 0;
  const totalPaidText = formatCurrency(totalPaidNum, activeCurrency);
  const vendorsCount = order ? order.vendorSubOrders.length : 0;

  const handleViewOrder = () => {
    router.replace(`/order/${orderId}`);
  };

  const handleContinueShopping = () => {
    router.replace('/');
  };

  return {
    orderId,
    totalPaid: totalPaidText,
    vendorsCount,
    handleViewOrder,
    handleContinueShopping
  };
}
