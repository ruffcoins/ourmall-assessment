import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { OrderSuccessScreen } from '../features/order-success';

export default function OrderSuccessRoute() {
  const { orderId } = useLocalSearchParams<{ orderId: string }>();
  return <OrderSuccessScreen orderId={orderId} />;
}
