import React, { useState } from 'react';
import { View, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronLeft, ShoppingCart, Star, Heart, Share2, Clock, Minus, Plus } from 'lucide-react-native';
import { Typography, Button, useStore, useTheme } from '../../../shared';
import { useProductDetailsViewModel } from '../viewmodels/useProductDetailsViewModel';

interface ProductDetailsScreenProps {
  productId: string;
}

export function ProductDetailsScreen({ productId }: ProductDetailsScreenProps) {
  const router = useRouter();
  const vm = useProductDetailsViewModel(productId);
  const { cartItems } = useStore();
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const insets = useSafeAreaInsets();
  const [selectedQty, setSelectedQty] = useState(1);
  const { isDark, colors } = useTheme();

  if (vm.isLoading) {
    return (
      <SafeAreaView style={{ flex: 1 }} className="flex-1 bg-white dark:bg-slate-900 items-center justify-center">
        <ActivityIndicator size="large" color="#7d50a0" />
      </SafeAreaView>
    );
  }

  if (vm.error) {
    return (
      <SafeAreaView style={{ flex: 1 }} className="flex-1 bg-white dark:bg-slate-900 items-center justify-center px-6" edges={['top']}>
        <Typography className="text-red-500 font-geologica-bold text-center mb-2">
          Failed to load product details
        </Typography>
        <Typography className="text-slate-400 dark:text-slate-500 font-geologica-light text-center mb-6 text-xs">
          Please check your connection and try again.
        </Typography>
        <View className="flex-row gap-3">
          <Button title="Go Back" variant="outline" onPress={() => router.back()} />
          <Button title="Try Again" onPress={() => vm.refetch()} />
        </View>
      </SafeAreaView>
    );
  }

  if (!vm.product) {
    return (
      <SafeAreaView style={{ flex: 1 }} className="flex-1 bg-white dark:bg-slate-900 items-center justify-center px-6" edges={['top']}>
        <Typography variant="body" className="text-slate-500 dark:text-slate-400 text-center mb-4 font-geologica">
          Product not found.
        </Typography>
        <Button title="Go Back" onPress={() => router.back()} />
      </SafeAreaView>
    );
  }

  const incrementQty = () => {
    if (selectedQty < (vm.product?.stockCount || 0)) {
      setSelectedQty(selectedQty + 1);
    }
  };

  const decrementQty = () => {
    if (selectedQty > 1) {
      setSelectedQty(selectedQty - 1);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }} className="flex-1 bg-white dark:bg-slate-900" edges={['top']}>
      {/* Header */}
      <View
        className="px-4 py-3 flex-row justify-between items-center z-10 absolute w-full"
        style={{ top: insets.top }}
      >
        <TouchableOpacity
          className="bg-white/90 dark:bg-slate-800/90 w-10 h-10 rounded-full shadow-sm items-center justify-center border border-slate-100 dark:border-slate-700"
          onPress={() => router.back()}
          activeOpacity={0.8}
        >
          <ChevronLeft size={22} color={colors.text} />
        </TouchableOpacity>

        <View className="flex-row items-center gap-2">
          <TouchableOpacity
            className="bg-white/90 dark:bg-slate-800/90 w-10 h-10 rounded-full shadow-sm items-center justify-center border border-slate-100 dark:border-slate-700"
            activeOpacity={0.8}
          >
            <Heart size={20} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-white/90 dark:bg-slate-800/90 w-10 h-10 rounded-full shadow-sm items-center justify-center border border-slate-100 dark:border-slate-700"
            activeOpacity={0.8}
          >
            <Share2 size={18} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-white/90 dark:bg-slate-800/90 w-10 h-10 rounded-full shadow-sm items-center justify-center border border-slate-100 dark:border-slate-700 relative"
            onPress={() => router.push('/cart')}
            activeOpacity={0.8}
          >
            <ShoppingCart size={20} color={colors.text} />
            {cartCount > 0 && (
              <View className="absolute -top-1 -right-1 bg-red-500 rounded-full min-w-[16px] h-[16px] items-center justify-center px-1">
                <Typography className="text-white text-[8px] font-geologica-bold">
                  {cartCount > 99 ? '99+' : cartCount}
                </Typography>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <View className="w-full aspect-square bg-slate-50 dark:bg-slate-900 relative">
          <Image
            source={{ uri: vm.product.imageUrl }}
            className="w-full h-full"
            resizeMode="cover"
          />

          {/* Mock Carousel Dots */}
          <View className="absolute bottom-4 left-0 right-0 flex-row justify-center items-center gap-1.5">
            <View className="w-2.5 h-2.5 rounded-full bg-brand-purple" />
            <View className="w-2 h-2 rounded-full bg-slate-300/80 dark:bg-slate-700/80" />
            <View className="w-2 h-2 rounded-full bg-slate-300/80 dark:bg-slate-700/80" />
          </View>
        </View>

        {/* Product Info */}
        <View className="px-5 py-5">
          {/* Stars Rating (Left aligned) */}
          <View className="flex-row items-center mb-4">
            <View className="flex-row items-center bg-amber-50 dark:bg-amber-950/20 px-2.5 py-1 rounded-xl border border-amber-100 dark:border-amber-900/30">
              <Star size={12} color="#eab308" fill="#eab308" />
              <Typography className="text-amber-700 dark:text-amber-400 font-geologica-bold ml-1 text-xs">
                {vm.product.rating}
              </Typography>
            </View>
            <Typography className="text-slate-400 dark:text-slate-500 text-xs font-geologica-light ml-2">
              ({vm.product.reviewCount} reviews)
            </Typography>
          </View>

          {/* Title */}
          <Typography className="text-slate-900 dark:text-slate-100 font-geologica-semibold text-[24px] mb-1.5 leading-8">
            {vm.product.name}
          </Typography>

          {/* Category & Vendor Metadata Subline */}
          <View className="flex-row items-center gap-2 mb-5">
            <Typography className="text-slate-400 dark:text-slate-500 text-[10px] font-geologica-semibold uppercase tracking-wider">
              {vm.product.category}
            </Typography>
            <Typography className="text-slate-300 dark:text-slate-700 text-[10px]">•</Typography>
            <Typography className="text-slate-400 dark:text-slate-500 text-[10px] font-geologica-light">
              by {vm.product.vendor.name}
            </Typography>
          </View>

          {/* Price Alignment & Discount Percentage */}
          <View className="flex-row items-center gap-2.5 mb-5">
            <Typography className="text-[28px] font-geologica-black text-brand-purple leading-8">
              {vm.getPriceText()}
            </Typography>
            {vm.isDiscounted && (
              <>
                <Typography className="text-slate-300 dark:text-slate-600 text-base line-through font-geologica-light">
                  {vm.getOriginalPriceText()}
                </Typography>
                <View className="bg-red-500 px-2 py-0.5 rounded-lg">
                  <Typography className="text-white text-[10px] font-geologica-bold">
                    -{vm.product.discount?.type === 'percentage'
                      ? vm.product.discount.value
                      : Math.round(((vm.product.discount?.value || 0) / vm.product.basePrice) * 100)}%
                  </Typography>
                </View>
              </>
            )}
          </View>

          {/* Red Countdown Box */}
          {vm.isDiscounted && vm.discountTimeRemaining && (
            <View className="flex-row items-center bg-red-50/70 dark:bg-red-950/20 border border-red-100/80 dark:border-red-900/30 rounded-2xl px-4 py-3 mb-6 gap-2">
              <Clock size={16} color="#ef4444" />
              <Typography className="text-red-500 dark:text-red-400 font-geologica-bold text-xs">
                Offer ends in {vm.discountTimeRemaining.replace('Ends in ', '')}
              </Typography>
            </View>
          )}

          {/* Description */}
          <Typography className="text-slate-800 dark:text-slate-200 text-xs font-geologica-bold uppercase tracking-wider mb-2">
            Description
          </Typography>
          <Typography className="text-slate-600 dark:text-slate-300 text-[13px] font-geologica-light leading-6 mb-6">
            {vm.product.description}
          </Typography>

          {/* Details Box */}
          <View className="bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl p-4 mb-8">
            <View className="flex-row justify-between items-center mb-3">
              <Typography className="text-slate-400 dark:text-slate-500 text-[10px] font-geologica-medium uppercase tracking-wider">Stock Status</Typography>
              <Typography className={`text-xs font-geologica-bold ${vm.isOutOfStock
                ? 'text-red-500'
                : vm.product.stockCount <= 3
                  ? 'text-brand-orange'
                  : 'text-emerald-500'
                }`}>
                {vm.isOutOfStock
                  ? 'Out of Stock'
                  : vm.product.stockCount <= 3
                    ? `🔥 Selling fast! Only ${vm.product.stockCount} left`
                    : `In Stock (${vm.product.stockCount} left)`}
              </Typography>
            </View>
            <View className="flex-row justify-between items-center">
              <Typography className="text-slate-400 dark:text-slate-500 text-[10px] font-geologica-medium uppercase tracking-wider">Item ID</Typography>
              <Typography className="text-slate-700 dark:text-slate-300 text-xs font-geologica-bold">{vm.product.id}</Typography>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Footer / Quantity Selector & CTA */}
      <View
        className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex-row items-center justify-between shadow-lg"
        style={{ paddingBottom: Math.max(insets.bottom, 16) }}
      >
        {vm.isOutOfStock ? (
          <Button
            title="Out of Stock"
            variant="outline"
            className="w-full opacity-50"
            disabled
          />
        ) : (
          <View className="flex-row w-full items-center gap-3">
            {/* Quantity Selector Selector Row */}
            <View className="flex-row items-center border border-slate-200 dark:border-slate-700 rounded-2xl px-2 py-1.5 bg-slate-50 dark:bg-slate-800">
              <TouchableOpacity
                onPress={decrementQty}
                className="w-8 h-8 items-center justify-center rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 shadow-sm"
                activeOpacity={0.7}
              >
                <Minus size={14} color={isDark ? '#cbd5e1' : '#475569'} />
              </TouchableOpacity>

              <Typography className="text-slate-800 dark:text-slate-200 font-geologica-bold text-sm px-4">
                {selectedQty}
              </Typography>

              <TouchableOpacity
                onPress={incrementQty}
                className="w-8 h-8 items-center justify-center rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 shadow-sm"
                activeOpacity={0.7}
              >
                <Plus size={14} color={isDark ? '#cbd5e1' : '#475569'} />
              </TouchableOpacity>
            </View>

            {/* Add to Cart button */}
            <TouchableOpacity
              onPress={() => {
                vm.handleAddToCart(selectedQty);
                setSelectedQty(1); // Reset back to 1
              }}
              className="flex-1 bg-brand-purple rounded-2xl py-3.5 items-center justify-center"
              activeOpacity={0.8}
            >
              <Typography className="text-white font-geologica-bold text-sm">
                Add to Cart {vm.cartQuantity > 0 ? `(${vm.cartQuantity})` : ''}
              </Typography>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
