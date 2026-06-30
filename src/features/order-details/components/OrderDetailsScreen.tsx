import React from 'react';
import { View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronLeft, Store } from 'lucide-react-native';
import { Typography, StepperProgress, database, ItemStatus } from '../../../shared';
import { useOrderDetailsViewModel } from '../viewmodels/useOrderDetailsViewModel';
import { useTheme } from '../../../shared/hooks';

interface OrderDetailsScreenProps {
  orderId: string;
}

/** Maps an ItemStatus to its badge and text class names. */
function getStatusStyle(status: ItemStatus) {
  switch (status) {
    case 'Returned':  return {
      badge: 'bg-orange-50 border border-orange-100 dark:bg-orange-950 dark:border-orange-900',
      text: 'text-orange-600 dark:text-orange-400',
    };
    case 'Cancelled': return {
      badge: 'bg-red-50 border border-red-100 dark:bg-red-950 dark:border-red-900',
      text: 'text-red-500 dark:text-red-400',
    };
    case 'Pending': return {
      badge: 'bg-amber-50 border border-amber-100 dark:bg-amber-950 dark:border-amber-900',
      text: 'text-amber-600 dark:text-amber-400',
    };
    case 'Shipped': return {
      badge: 'bg-blue-50 border border-blue-100 dark:bg-blue-950 dark:border-blue-900',
      text: 'text-blue-600 dark:text-blue-400',
    };
    case 'Delivered': return {
      badge: 'bg-emerald-50 border border-emerald-100 dark:bg-emerald-950 dark:border-emerald-900',
      text: 'text-emerald-700 dark:text-emerald-400',
    };
    default: return {
      badge: 'bg-emerald-50 border border-emerald-100 dark:bg-emerald-950 dark:border-emerald-900',
      text: 'text-emerald-700 dark:text-emerald-400',
    };
  }
}

export function OrderDetailsScreen({ orderId }: OrderDetailsScreenProps) {
  const router = useRouter();
  const vm = useOrderDetailsViewModel(orderId);
  const insets = useSafeAreaInsets();
  const { isDark, colors } = useTheme();

  if (!vm.order) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} className="flex-1 items-center justify-center px-6">
        <Typography style={{ color: colors.error }} className="mb-4 font-geologica">Order not found.</Typography>
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-brand-purple px-6 py-3 rounded-2xl"
        >
          <Typography className="text-white font-geologica-bold text-sm">Go Back</Typography>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const isOrderFullyCancelledOrReturned = vm.order.vendorSubOrders.every(
    v => v.status === 'Cancelled' || v.status === 'Returned'
  );
  const isOrderFullyReturned =
    isOrderFullyCancelledOrReturned &&
    vm.order.vendorSubOrders.some(v => v.status === 'Returned');

  const formattedDate = new Date(vm.order.createdAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  // Derive a synthetic status for the top-level order badge
  const orderBadgeStatus: ItemStatus = isOrderFullyCancelledOrReturned
    ? isOrderFullyReturned ? 'Returned' : 'Cancelled'
    : 'Delivered'; // treat "active / paid" orders as delivered-level green

  const orderStyle = getStatusStyle(orderBadgeStatus);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.surface }} edges={['top']}>
      {/* Header */}
      <View
        style={{ backgroundColor: colors.background, borderBottomColor: colors.borderSubtle, borderBottomWidth: 1 }}
        className="px-4 py-3.5 flex-row items-center z-10"
      >
        <TouchableOpacity onPress={() => router.back()} className="p-1 mr-3">
          <ChevronLeft size={22} color={colors.text} />
        </TouchableOpacity>
        <Typography style={{ color: colors.text }} className="text-base font-geologica-bold">Order Details</Typography>
      </View>

      <ScrollView
        style={{ flex: 1, backgroundColor: colors.surface }}
        className="px-4"
        showsVerticalScrollIndicator={false}
      >
        {/* Top Info Box */}
        <View
          style={{ backgroundColor: colors.background, borderColor: colors.borderSubtle, borderWidth: 1 }}
          className="rounded-3xl p-5 mt-4 mb-5"
        >
          <View className="flex-row justify-between items-center mb-2.5">
            <Typography style={{ color: colors.text }} className="font-geologica-bold text-sm">
              Order #{vm.order.masterOrderId}
            </Typography>
            <Typography style={{ color: colors.textMuted }} className="text-[10px] font-geologica-light">
              {formattedDate}
            </Typography>
          </View>
          <View className="flex-row justify-between items-center">
            <View className={`px-3 py-1 rounded-full border ${orderStyle.badge}`}>
              <Typography className={`font-geologica-semibold text-[10px] uppercase tracking-wider ${orderStyle.text}`}>
                {isOrderFullyCancelledOrReturned
                  ? isOrderFullyReturned ? 'Returned' : 'Cancelled'
                  : 'Paid'}
              </Typography>
            </View>
            <Typography className="font-geologica-black text-brand-purple text-[20px]">
              {vm.getPriceText(vm.order.grandTotal)}
            </Typography>
          </View>
          {vm.order.promoDiscount > 0 && (
            <View className="flex-row justify-between items-center mt-2 pt-2" style={{ borderTopColor: colors.borderSubtle, borderTopWidth: 1 }}>
              <Typography style={{ color: colors.textMuted }} className="text-[10px] font-geologica">
                Promo discount (WELCOME10)
              </Typography>
              <Typography style={{ color: colors.success }} className="text-[10px] font-geologica-semibold">
                -{vm.getPriceText(vm.order.promoDiscount)}
              </Typography>
            </View>
          )}
        </View>

        {/* Vendor Sub Orders */}
        {vm.order.vendorSubOrders.map((subOrder) => {
          const isSubOrderCancelled = subOrder.status === 'Cancelled' || subOrder.status === 'Returned';
          const vendorName = subOrder.vendorName;
          const subStyle = getStatusStyle(subOrder.status);

          return (
            <View
              key={subOrder.subOrderId}
              style={{ backgroundColor: colors.background, borderColor: colors.borderSubtle, borderWidth: 1 }}
              className="rounded-3xl p-5 mb-5 shadow-sm"
            >
              {/* Vendor Header Row */}
              <View
                style={{ borderBottomColor: colors.borderSubtle, borderBottomWidth: 1 }}
                className="flex-row justify-between items-center mb-4 pb-3"
              >
                <View className="flex-row items-center flex-1 mr-2">
                  <View
                    style={{ backgroundColor: isDark ? '#2d1f3d' : '#f5f0fa', borderColor: isDark ? '#3d2952' : '#ede0f7' }}
                    className="w-7 h-7 rounded-full items-center justify-center mr-2 border"
                  >
                    <Store size={14} color="#7d50a0" />
                  </View>
                  <View className="flex-1">
                    <Typography style={{ color: colors.text }} className="font-geologica-bold text-sm leading-tight">
                      {vendorName}
                    </Typography>
                    <Typography style={{ color: colors.textMuted }} className="text-[9px] font-geologica-light tracking-wide mt-0.5">
                      ID: {subOrder.subOrderId}
                    </Typography>
                  </View>
                </View>
                <View className={`px-3 py-1 rounded-full border ${subStyle.badge}`}>
                  <Typography className={`text-[9px] font-geologica-bold uppercase tracking-wider ${subStyle.text}`}>
                    {subOrder.status}
                  </Typography>
                </View>
              </View>

              {/* Progress Stepper */}
              <StepperProgress status={subOrder.status} />

              {/* Items List */}
              <View className="mt-4">
                <Typography style={{ color: colors.textMuted }} className="font-geologica-bold text-[10px] uppercase tracking-wider mb-3">
                  Items
                </Typography>
                {subOrder.items.map((lineItem, index) => {
                  const isItemCancelled = lineItem.status === 'Cancelled' || lineItem.status === 'Returned';
                  const isReturned = lineItem.status === 'Returned';

                  return (
                    <View
                      key={`${lineItem.productId}-${index}`}
                      style={{ borderBottomColor: colors.surface, borderBottomWidth: 1 }}
                      className="flex-row items-center py-2.5"
                    >
                      {/* Product Thumbnail */}
                      <View
                        style={{ backgroundColor: colors.surface, borderColor: colors.borderSubtle, borderWidth: 1 }}
                        className="w-12 h-12 rounded-xl overflow-hidden mr-3"
                      >
                        {lineItem.imageUrl ? (
                          <Image source={{ uri: lineItem.imageUrl }} className="w-full h-full" resizeMode="cover" />
                        ) : null}
                      </View>

                      {/* Line Item details */}
                      <View className="flex-1 pr-2">
                        <Typography
                          style={{ color: colors.text }}
                          className={`text-xs font-geologica-semibold ${isItemCancelled ? 'line-through opacity-40' : ''}`}
                          numberOfLines={1}
                        >
                          {lineItem.name}
                        </Typography>
                        <Typography style={{ color: colors.textMuted }} className="text-[10px] font-geologica-light mt-0.5">
                          Qty: {lineItem.quantity} • {vm.getPriceText(lineItem.pricePerItem)} each
                        </Typography>
                        {lineItem.promoCode && (
                          <View className="flex-row items-center mt-0.5">
                            <Typography className="text-brand-orange font-geologica-semibold text-[9px] mr-1.5">
                              Promo: {lineItem.promoCode}
                            </Typography>
                            <Typography style={{ color: colors.textMuted }} className="text-[9px] font-geologica-light line-through">
                              Org: {vm.getPriceText(lineItem.originalPrice)}
                            </Typography>
                          </View>
                        )}
                        {isItemCancelled && (
                          <Typography className={`${isReturned ? 'text-orange-500' : 'text-red-500'} text-[9px] font-geologica-bold mt-1`}>
                            {isReturned ? 'Returned' : 'Cancelled'}
                          </Typography>
                        )}
                      </View>

                      {/* Price & Action */}
                      <View className="items-end pl-2">
                        <Typography
                          style={{ color: isItemCancelled ? colors.textMuted : colors.text }}
                          className={`text-[13px] font-geologica-bold ${isItemCancelled ? 'opacity-40 line-through' : ''}`}
                        >
                          {vm.getPriceText(lineItem.pricePerItem * lineItem.quantity)}
                        </Typography>
                        {!isItemCancelled && !isSubOrderCancelled && (
                          <TouchableOpacity
                            onPress={() => vm.handleCancelItem(subOrder.vendorId, lineItem.productId)}
                            disabled={lineItem.status === 'Shipped'}
                            style={{
                              backgroundColor: lineItem.status === 'Delivered'
                                ? isDark ? '#1c0e00' : '#fff7ed'
                                : lineItem.status === 'Shipped'
                                ? colors.surface
                                : isDark ? '#2d0c0c' : '#fef2f2',
                              borderColor: lineItem.status === 'Delivered'
                                ? isDark ? '#7c2d12' : '#fed7aa'
                                : lineItem.status === 'Shipped'
                                ? colors.border
                                : isDark ? '#7f1d1d' : '#fecaca',
                              borderWidth: 1,
                              marginTop: 6,
                              paddingHorizontal: 10,
                              paddingVertical: 4,
                              borderRadius: 8,
                              opacity: lineItem.status === 'Shipped' ? 0.5 : 1,
                            }}
                            activeOpacity={0.7}
                          >
                            <Typography
                              style={{
                                color: lineItem.status === 'Delivered'
                                  ? isDark ? '#fb923c' : '#ea580c'
                                  : lineItem.status === 'Shipped'
                                  ? colors.textMuted
                                  : colors.error,
                                fontSize: 10,
                                fontFamily: 'Geologica_700Bold',
                              }}
                            >
                              {lineItem.status === 'Delivered' ? 'Return' : 'Cancel'}
                            </Typography>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  );
                })}
              </View>

              {/* Vendor Subtotal */}
              <View
                style={{ borderTopColor: colors.borderSubtle, borderTopWidth: 1 }}
                className="mt-4 pt-3.5 flex-row justify-between items-center"
              >
                <Typography style={{ color: colors.textMuted }} className="font-geologica-bold text-[10px] uppercase tracking-wider">
                  Subtotal
                </Typography>
                <Typography style={{ color: colors.text }} className="font-geologica-bold text-[14px]">
                  {vm.getPriceText(subOrder.subTotal)}
                </Typography>
              </View>
            </View>
          );
        })}

        {/* Bottom padding */}
        <View style={{ height: 16 }} />
      </ScrollView>

      {/* Footer Primary CTA */}
      <View
        style={{ backgroundColor: colors.background, borderTopColor: colors.borderSubtle, borderTopWidth: 1, paddingBottom: Math.max(insets.bottom, 16) }}
        className="p-4"
      >
        <TouchableOpacity
          onPress={() => router.replace('/')}
          className="w-full bg-brand-purple rounded-2xl py-3.5 items-center justify-center"
          activeOpacity={0.8}
        >
          <Typography className="text-white font-geologica-bold text-xs">
            Continue Shopping
          </Typography>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
