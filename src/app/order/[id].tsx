import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { OrderDetailsScreen } from '../../features/order-details';

export default function OrderDetailsRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <OrderDetailsScreen orderId={id} />;
}
