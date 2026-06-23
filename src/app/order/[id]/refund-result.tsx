import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { RefundResultScreen } from '../../../features/refund-result';

export default function RefundResultRoute() {
  const { id, refundedAmount, isReturn } = useLocalSearchParams<{ id: string; refundedAmount: string; isReturn?: string }>();
  return <RefundResultScreen orderId={id} refundedAmount={refundedAmount} isReturn={isReturn === 'true'} />;
}
