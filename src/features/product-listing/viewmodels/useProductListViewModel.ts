import { useInfiniteQuery } from '@tanstack/react-query';
import type { Product } from '../../../shared';
import { mockApi, useStore } from '../../../shared';

const PAGE_LIMIT = 6;

export function useProductListViewModel() {
  const { activeCurrency, filter, setFilter, cartItems } = useStore();
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const {
    data,
    isLoading,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['products', filter, activeCurrency],
    queryFn: ({ pageParam = 1 }) =>
      mockApi.fetchProducts({
        search: filter.search || undefined,
        category: filter.category === 'All' ? undefined : filter.category,
        currency: activeCurrency,
        minPrice: filter.minPrice,
        maxPrice: filter.maxPrice,
        stockStatus: filter.stockStatus,
        page: pageParam as number,
        limit: PAGE_LIMIT,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasMore ? allPages.length + 1 : undefined;
    },
    staleTime: 0,
  });

  const products: Product[] = data?.pages.flatMap(page => page.products) ?? [];

  return {
    filter,
    setFilter,
    cartCount,
    products,
    isLoading,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error,
    refetch,
  };
}
