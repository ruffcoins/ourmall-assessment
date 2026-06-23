import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useStore, mockApi, MasterOrder, database, convertPrice } from '../../../shared';

export function useCancellationViewModel(
  orderId: string,
  vendorId?: string,
  productId?: string
) {
  const router = useRouter();
  const { orders, updateOrder, activeCurrency } = useStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const order = orders.find(o => o.masterOrderId === orderId);
  const subOrder = order?.vendorSubOrders.find(v => v.vendorId === vendorId);
  const lineItem = subOrder?.items.find(i => i.productId === productId);

  // Derived: is this a return (item was already delivered) or a cancellation?
  const isReturn = lineItem?.status === 'Delivered';

  let refundNum = 0;
  let priceNum = 0;
  let discountNum = 0;

  if (order && lineItem) {
    refundNum = lineItem.pricePerItem * lineItem.quantity;
    const basePriceConverted = lineItem.originalPrice;
    priceNum = basePriceConverted * lineItem.quantity;
    discountNum = Math.max(0, priceNum - refundNum);
  }

  const formatVal = (num: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: order?.currency || activeCurrency,
    }).format(num);

  const refundDetails = {
    priceText: formatVal(priceNum),
    hasDiscount: discountNum > 0,
    discountText: formatVal(discountNum),
    refundText: formatVal(refundNum),
  };

  const handleConfirm = async () => {
    if (!vendorId || !productId) {
      setError('Invalid cancellation parameters');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const result: { order: MasterOrder; refundedAmount: number } =
        await mockApi.cancelOrderItem(orderId, vendorId, productId);

      updateOrder(result.order);

      router.replace({
        pathname: `/order/${orderId}/refund-result`,
        params: {
          refundedAmount: result.refundedAmount.toString(),
          isReturn: isReturn.toString(),
        },
      });
    } catch (err: any) {
      setError(err.message || 'Failed to process. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    order,
    subOrder,
    lineItem,
    isReturn,
    refundDetails,
    isProcessing,
    error,
    handleConfirm,
    goBack: () => router.back(),
  };
}
