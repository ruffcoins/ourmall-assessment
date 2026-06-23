import React from 'react';
import { View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { ProductCard } from './ProductCard';
import { ProductCardSkeleton } from './ProductCardSkeleton';
import { Search } from 'lucide-react-native';
import { Typography, Button, useTheme } from '../../../shared';
import { useProductListViewModel } from '../viewmodels/useProductListViewModel';

interface ProductListProps {
  onScroll?: any;
  contentContainerStyle?: any;
}

export function ProductList({ onScroll, contentContainerStyle }: ProductListProps = {}) {
  const vm = useProductListViewModel();
  const router = useRouter();
  const { colors } = useTheme();

  if (vm.error && !vm.isLoading) {
    return (
      <View className="flex-1 justify-center items-center py-10 px-8">
        <Typography variant="body" className="text-red-500 text-center mb-4 font-geologica">
          Failed to load products.
        </Typography>
        <Button title="Try Again" variant="outline" onPress={() => vm.refetch()} />
      </View>
    );
  }

  const renderFooter = () => {
    if (vm.isFetchingNextPage) {
      return (
        <View className="py-4 justify-center items-center">
          <ActivityIndicator size="small" color="#7d50a0" />
        </View>
      );
    }
    return <View className="h-10" />;
  };

  return (
    <View style={{ flex: 1 }} className="flex-1 bg-white dark:bg-slate-900">
      <View style={{ flex: 1 }}>
        <FlashList
          data={
            vm.isLoading && vm.products.length === 0
              ? Array.from({ length: 6 }).map((_, i) => ({ id: `skeleton-${i}`, isSkeleton: true }))
              : vm.products
          }
          keyExtractor={(item: any) => item.id.toString()}
          numColumns={2}
          {...({ estimatedItemSize: 280 } as any)}
          onScroll={onScroll}
          scrollEventThrottle={16}
          contentContainerStyle={[
            { paddingHorizontal: 8, paddingTop: 16, paddingBottom: 20 },
            contentContainerStyle
          ]}
          renderItem={({ item }: { item: any }) => (
            <View style={{ flex: 1, paddingHorizontal: 6 }}>
              {item.isSkeleton ? (
                <ProductCardSkeleton />
              ) : (
                <ProductCard
                  product={item}
                  onPress={() => router.push(`/product/${item.id}`)}
                />
              )}
            </View>
          )}
          ListEmptyComponent={
            !vm.isLoading ? (
              <View className="py-16 px-6 items-center">
                <View className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full items-center justify-center mb-4">
                  <Search size={32} color={colors.textMuted} />
                </View>
                <Typography className="text-slate-800 dark:text-slate-200 font-geologica-bold text-lg mb-2 text-center">
                  No results found
                </Typography>
                <Typography className="text-slate-500 dark:text-slate-400 font-geologica text-sm text-center mb-8 leading-5">
                  We couldn't find any products {vm.filter.search ? `matching "${vm.filter.search}"` : 'for this filter'}. Try checking your spelling or use more general terms.
                </Typography>
                
                <View className="w-full">
                  <Typography className="text-slate-800 dark:text-slate-200 font-geologica-bold text-sm mb-3">
                    Suggested Searches
                  </Typography>
                  <View className="flex-row flex-wrap gap-2">
                    {['Wireless', 'Shoes', 'Watch', 'Backpack'].map(term => (
                      <TouchableOpacity
                        key={term}
                        onPress={() => vm.setFilter({ search: term })}
                        className="bg-brand-purple/10 dark:bg-brand-purple/20 px-4 py-2 rounded-xl"
                        activeOpacity={0.7}
                      >
                        <Typography className="text-brand-purple font-geologica-semibold text-xs">
                          {term}
                        </Typography>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View className="w-full mt-6">
                  <Typography className="text-slate-800 dark:text-slate-200 font-geologica-bold text-sm mb-3">
                    Popular Categories
                  </Typography>
                  <View className="flex-row flex-wrap gap-2">
                    {['Electronics', 'Fashion', 'Accessories'].map(cat => (
                      <TouchableOpacity
                        key={cat}
                        onPress={() => vm.setFilter({ search: '', category: cat })}
                        className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-xl"
                        activeOpacity={0.7}
                      >
                        <Typography className="text-slate-600 dark:text-slate-300 font-geologica-medium text-xs">
                          {cat}
                        </Typography>
                      </TouchableOpacity>
                    ))}
                    <TouchableOpacity
                      onPress={() => vm.setFilter({ search: '', category: 'All' })}
                      className="bg-brand-orange/10 dark:bg-brand-orange/20 px-4 py-2 rounded-xl"
                      activeOpacity={0.7}
                    >
                      <Typography className="text-brand-orange font-geologica-semibold text-xs">
                        Clear Filters
                      </Typography>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ) : null
          }
          onEndReached={() => {
            if (vm.hasNextPage && !vm.isFetchingNextPage && !vm.isLoading) {
              vm.fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
        />
      </View>
    </View>
  );
}
