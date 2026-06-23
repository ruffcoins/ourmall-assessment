import { useState } from 'react';
import { useStore, StockFilter, CURRENCY_SYMBOLS } from '../../../shared';

const CATEGORIES = ['All', 'Electronics', 'Fashion', 'Home', 'Beauty', 'Accessories', 'Sports'];

export function useFilterViewModel() {
  const { filter, setFilter, activeCurrency } = useStore();

  const [localCategory, setLocalCategory] = useState<string>(filter.category || 'All');
  const [localMinPrice, setLocalMinPrice] = useState<string>(filter.minPrice?.toString() || '');
  const [localMaxPrice, setLocalMaxPrice] = useState<string>(filter.maxPrice?.toString() || '');
  const [localStockStatus, setLocalStockStatus] = useState<StockFilter>(filter.stockStatus);

  const applyFilters = () => {
    setFilter({
      category: localCategory === 'All' ? undefined : localCategory,
      minPrice: localMinPrice ? parseFloat(localMinPrice) : undefined,
      maxPrice: localMaxPrice ? parseFloat(localMaxPrice) : undefined,
      stockStatus: localStockStatus,
    });
  };

  const resetFilters = () => {
    setLocalCategory('All');
    setLocalMinPrice('');
    setLocalMaxPrice('');
    setLocalStockStatus('all');

    setFilter({
      category: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      stockStatus: 'all',
    });
  };

  return {
    categories: CATEGORIES,
    localCategory,
    setLocalCategory,
    localMinPrice,
    setLocalMinPrice,
    localMaxPrice,
    setLocalMaxPrice,
    localStockStatus,
    setLocalStockStatus,
    currencySymbol: CURRENCY_SYMBOLS[activeCurrency],
    applyFilters,
    resetFilters,
  };
}
