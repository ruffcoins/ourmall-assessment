import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { ProductDetailsScreen } from '../../features/product-details';

export default function ProductDetailsRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <ProductDetailsScreen productId={id} />;
}
