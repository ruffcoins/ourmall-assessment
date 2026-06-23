import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { CancellationScreen } from '../../../features/cancellation';

export default function CancellationRoute() {
  const { id, vendorId, productId } = useLocalSearchParams<{
    id: string;
    vendorId?: string;
    productId?: string;
  }>();

  return (
    <CancellationScreen
      orderId={id}
      vendorId={vendorId}
      productId={productId}
    />
  );
}
