import { useRouter } from 'expo-router';
import { useStore } from '../../../shared';

export function useRefundResultViewModel(orderId: string, refundedAmountStr: string) {
  const router = useRouter();
  const { activeCurrency, orders } = useStore();

  const refundedAmount = parseFloat(refundedAmountStr) || 0;
  const order = orders.find(o => o.masterOrderId === orderId);
  const updatedTotalVal = order ? order.grandTotal : 0;

  const getPriceText = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: order?.currency || activeCurrency,
    }).format(num);
  };

  const getRefundText = () => getPriceText(refundedAmount);
  const getUpdatedTotalText = () => getPriceText(updatedTotalVal);

  const handleBackToOrder = () => {
    router.replace(`/order/${orderId}`);
  };

  const handleContinueShopping = () => {
    router.replace('/');
  };

  return {
    orderId,
    refundedAmount,
    getRefundText,
    getUpdatedTotalText,
    handleBackToOrder,
    handleContinueShopping
  };
}
