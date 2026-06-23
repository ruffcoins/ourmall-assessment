import React from 'react';
import { View, TouchableOpacity, TextInput, Animated, ActivityIndicator, ScrollView, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { ShoppingCart, SlidersHorizontal, Search, Menu, ChevronDown, X, Sun, Moon } from 'lucide-react-native';
import { ProductList, CurrencySelector, useHomeViewModel } from '../features/product-listing';
import { Typography, useTheme } from '../shared';
import { useState, useEffect } from 'react';

export default function ProductListingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const vm = useHomeViewModel();
  const { isDark, setColorScheme, colors } = useTheme();

  const [headerHeight, setHeaderHeight] = useState(56);
  const [searchBarHeight, setSearchBarHeight] = useState(90);

  const [searchVal, setSearchVal] = useState(vm.filter.search || '');

  useEffect(() => {
    setSearchVal(vm.filter.search || '');
  }, [vm.filter.search]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchVal !== (vm.filter.search || '')) {
        vm.setFilter({ search: searchVal });
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [searchVal]);

  return (
    <View style={{ flex: 1 }} className="flex-1 bg-white dark:bg-slate-900">
      <StatusBar style={isDark ? 'light' : 'dark'} />

      {/* Splash Screen Overlay */}
      {vm.showSplash && (
        <Animated.View
          style={{
            position: 'absolute',
            top: 0, bottom: 0, left: 0, right: 0,
            backgroundColor: colors.background,
            zIndex: 100,
            opacity: vm.splashOpacity,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* Decorative blobs */}
          <View style={{ position: 'absolute', top: -100, right: -100, width: 300, height: 300, borderRadius: 150, backgroundColor: '#7d50a0', opacity: isDark ? 0.15 : 0.08 }} />
          <View style={{ position: 'absolute', bottom: -80, left: -80, width: 250, height: 250, borderRadius: 125, backgroundColor: '#f56e41', opacity: isDark ? 0.15 : 0.08 }} />

          <View className="items-center justify-center">
            <Image
              source={require('../../assets/splash-icon.png')}
              style={{ width: 180, height: 180, resizeMode: 'contain' }}
            />
            <ActivityIndicator size="large" color="#7d50a0" className="mt-12" />
          </View>
        </Animated.View>
      )}

      {/* Cover to prevent content bleeding under the status bar */}
      <View
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: insets.top, backgroundColor: colors.background, zIndex: 20 }}
      />

      {/* Product Grid */}
      <ProductList contentContainerStyle={{ paddingTop: insets.top + headerHeight + searchBarHeight + 8 }} />

      {/* Fixed Header + Search Bar */}
      <View
        style={{ position: 'absolute', top: 0, paddingTop: insets.top, left: 0, right: 0 }}
        className="bg-white dark:bg-slate-900 z-10"
      >
        {/* Header */}
        <View
          onLayout={(e) => setHeaderHeight(e.nativeEvent.layout.height)}
          className="px-4 py-3 flex-row justify-between items-center bg-white dark:bg-slate-900 border-b border-slate-50 dark:border-slate-800"
        >
          <View className="flex-row items-center">
            <TouchableOpacity className="p-1 mr-3" activeOpacity={0.7} onPress={() => router.push('/orders')}>
              <Menu size={24} color={colors.text} />
            </TouchableOpacity>
            <Image
              source={require('../../assets/icon.png')}
              style={{ width: 40, height: 40, resizeMode: 'contain' }}
            />
          </View>

          <View className="flex-row items-center gap-2">
            <CurrencySelector />
            <TouchableOpacity
              className="p-2"
              onPress={() => {
                const next = isDark ? 'light' : 'dark';
                setColorScheme(next);
                console.log("[ThemeToggle] set color scheme to:", next);
              }}
              activeOpacity={0.8}
            >
              {isDark ? (
                <Sun size={20} color={colors.text} />
              ) : (
                <Moon size={20} color={colors.text} />
              )}
            </TouchableOpacity>
            <TouchableOpacity className="relative p-2" onPress={() => router.push('/cart')} activeOpacity={0.8}>
              <ShoppingCart size={22} color={colors.text} />
              {vm.cartCount > 0 && (
                <View className="absolute top-1 right-1 bg-red-500 rounded-full min-w-[16px] h-[16px] items-center justify-center px-1">
                  <Typography className="text-white text-[8px] font-geologica-bold">
                    {vm.cartCount > 99 ? '99+' : vm.cartCount}
                  </Typography>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Search & Filter Bar */}
        <View
          onLayout={(e) => setSearchBarHeight(e.nativeEvent.layout.height)}
          className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900"
        >
          <View className="flex-row items-center bg-slate-50 dark:bg-slate-800 px-3 py-2.5 rounded-2xl border border-slate-100 dark:border-slate-700">
            <Search size={18} color={colors.textSecondary} />
            <TextInput
              className="flex-1 ml-2 font-geologica text-slate-800 dark:text-slate-200 text-xs py-0"
              placeholder="Search products, brands, categories..."
              placeholderTextColor={colors.textMuted}
              value={searchVal}
              onChangeText={setSearchVal}
              returnKeyType="search"
            />
            {!!searchVal && (
              <TouchableOpacity
                onPress={() => {
                  setSearchVal('');
                  vm.setFilter({ search: '' });
                }}
                className="p-1 mr-0.5"
                activeOpacity={0.7}
              >
                <X size={16} color={colors.textSecondary} />
              </TouchableOpacity>
            )}
          </View>

          {/* Quick Filter Pills */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row mt-2 py-1">
            <TouchableOpacity
              onPress={() => router.push('/filter')}
              className="flex-row items-center px-3 py-1.5 rounded-full border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 mr-2"
              activeOpacity={0.7}
            >
              <SlidersHorizontal size={11} color={colors.textSecondary} className="mr-1" />
              <Typography className="text-[10px] font-geologica text-slate-600 dark:text-slate-300">
                Category: {vm.filter.category || 'All'}
              </Typography>
              <ChevronDown size={10} color={colors.textSecondary} className="ml-1" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push('/filter')}
              className="flex-row items-center px-3 py-1.5 rounded-full border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 mr-2"
              activeOpacity={0.7}
            >
              <Typography className="text-[10px] font-geologica text-slate-600 dark:text-slate-300">
                Price: {vm.filter.minPrice !== undefined || vm.filter.maxPrice !== undefined
                  ? `${vm.filter.minPrice || 0}-${vm.filter.maxPrice || '500+'}`
                  : 'All'}
              </Typography>
              <ChevronDown size={10} color={colors.textSecondary} className="ml-1" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push('/filter')}
              className="flex-row items-center px-3 py-1.5 rounded-full border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 mr-2"
              activeOpacity={0.7}
            >
              <Typography className="text-[10px] font-geologica text-slate-600 dark:text-slate-300">
                Stock: {vm.filter.stockStatus === 'lowStock' ? 'Low Stock' : 'All'}
              </Typography>
              <ChevronDown size={10} color={colors.textSecondary} className="ml-1" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push('/filter')}
              className="flex-row items-center px-3 py-1.5 rounded-full border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              activeOpacity={0.7}
            >
              <Typography className="text-[10px] font-geologica text-slate-600 dark:text-slate-300">Sort</Typography>
              <ChevronDown size={10} color={colors.textSecondary} className="ml-1" />
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
