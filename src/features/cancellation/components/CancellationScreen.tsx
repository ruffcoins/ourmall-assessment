import React from 'react';
import { View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronLeft, AlertTriangle } from 'lucide-react-native';
import { Typography, Button, InfoBanner, formatCurrency } from '../../../shared';
import { useCancellationViewModel } from '../viewmodels/useCancellationViewModel';
import { useTheme } from '../../../shared/hooks';

interface CancellationScreenProps {
  orderId: string;
  vendorId?: string;
  productId?: string;
}

export function CancellationScreen({ orderId, vendorId, productId }: CancellationScreenProps) {
  const router = useRouter();
  const vm = useCancellationViewModel(orderId, vendorId, productId);
  const { isDark, colors } = useTheme();

  if (!vm.order) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} className="flex-1 items-center justify-center px-6">
        <Typography style={{ color: colors.error }} className="mb-4 font-geologica">Order not found.</Typography>
        <Button title="Go Back" onPress={vm.goBack} />
      </SafeAreaView>
    );
  }

  const cancelTitle = vm.isReturn ? 'Return Item' : 'Cancel Item';
  const warningMessage = vm.isReturn
    ? 'Only this item will be returned. Other items in your order will not be affected.'
    : 'Only this item will be cancelled. Other items in your order will not be affected.';
  const confirmBtnText = vm.isReturn ? 'Confirm Return' : 'Confirm Cancellation';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.surface }} edges={['top']}>
      {/* Header */}
      <View
        style={{ backgroundColor: colors.background, borderBottomColor: colors.borderSubtle, borderBottomWidth: 1 }}
        className="px-4 py-3.5 flex-row items-center z-10"
      >
        <TouchableOpacity onPress={vm.goBack} className="p-1 mr-3">
          <ChevronLeft size={22} color={colors.text} />
        </TouchableOpacity>
        <Typography style={{ color: colors.text }} className="text-base font-geologica-bold">{cancelTitle}</Typography>
      </View>

      <ScrollView className="flex-1 px-4 py-5" showsVerticalScrollIndicator={false}>
        {/* Item Details Card */}
        {vm.lineItem && (
          <View
            style={{ backgroundColor: colors.background, borderColor: colors.borderSubtle, borderWidth: 1 }}
            className="flex-row rounded-3xl p-4 w-full mb-6 items-center"
          >
            <View
              style={{ backgroundColor: colors.surface, borderColor: colors.borderSubtle, borderWidth: 1 }}
              className="w-16 h-16 rounded-2xl overflow-hidden mr-4"
            >
              {vm.lineItem.imageUrl ? (
                <Image source={{ uri: vm.lineItem.imageUrl }} className="w-full h-full" resizeMode="cover" />
              ) : null}
            </View>
            <View className="flex-1">
              <Typography style={{ color: colors.text }} className="font-geologica-semibold text-xs mb-1" numberOfLines={2}>
                {vm.lineItem.name}
              </Typography>
              <Typography style={{ color: colors.textMuted }} className="text-[9px] font-geologica mb-1">
                Sub-Order: {vm.subOrder?.subOrderId}
              </Typography>
              <Typography className="text-brand-purple font-geologica-bold text-xs">
                {vm.lineItem.quantity}x {formatCurrency(vm.lineItem.pricePerItem, vm.order?.currency || 'EUR')}
              </Typography>
            </View>
          </View>
        )}

        {/* Refund / Return Summary Card */}
        <View
          style={{ backgroundColor: colors.background, borderColor: colors.borderSubtle, borderWidth: 1 }}
          className="rounded-3xl p-5 w-full mb-6"
        >
          <Typography style={{ color: colors.text }} className="font-geologica-bold text-xs mb-3.5">
            {vm.isReturn ? 'Return Summary' : 'Cancellation Summary'}
          </Typography>

          <View className="flex-row justify-between items-center mb-3">
            <Typography style={{ color: colors.textSecondary }} className="text-xs font-geologica">Item Price</Typography>
            <Typography style={{ color: colors.text }} className="text-xs font-geologica-semibold">
              {vm.refundDetails.priceText}
            </Typography>
          </View>

          {vm.refundDetails.hasDiscount && (
            <View className="flex-row justify-between items-center mb-3">
              <Typography style={{ color: colors.textSecondary }} className="text-xs font-geologica">Discount</Typography>
              <Typography style={{ color: colors.error }} className="text-xs font-geologica-semibold">
                -{vm.refundDetails.discountText}
              </Typography>
            </View>
          )}

          {vm.refundDetails.hasPromoDeduction && (
            <View className="flex-row justify-between items-center mb-3">
              <Typography style={{ color: colors.textSecondary }} className="text-xs font-geologica">Promo deduction (WELCOME10)</Typography>
              <Typography style={{ color: colors.error }} className="text-xs font-geologica-semibold">
                -{vm.refundDetails.promoDeductionText}
              </Typography>
            </View>
          )}

          <View style={{ backgroundColor: colors.border, height: 1 }} className="my-2" />

          <View className="flex-row justify-between items-center mt-2">
            <Typography style={{ color: colors.text }} className="font-geologica-bold text-xs">Refund Amount</Typography>
            <Typography
              style={{ color: vm.isReturn ? (isDark ? '#fb923c' : '#ea580c') : colors.success }}
              className="font-geologica-bold text-sm"
            >
              {vm.refundDetails.refundText}
            </Typography>
          </View>
        </View>

        {/* Warning Banner */}
        <View
          style={{
            backgroundColor: isDark ? '#1c1600' : '#fffbeb',
            borderColor: isDark ? '#78350f' : '#fde68a',
            borderWidth: 1,
          }}
          className="flex-row items-center rounded-2xl px-4 py-3 w-full mb-8 gap-2"
        >
          <AlertTriangle size={18} color={isDark ? '#facc15' : '#eab308'} />
          <Typography
            style={{ color: isDark ? '#fef08a' : '#92400e' }}
            className="font-geologica-light text-[10px] flex-1 leading-4"
          >
            {warningMessage}
          </Typography>
        </View>

        {vm.error && (
          <View className="w-full mb-6">
            <InfoBanner variant="red" message={vm.error} />
          </View>
        )}

        {/* Actions */}
        <View className="w-full" style={{ gap: 12 }}>
          <TouchableOpacity
            onPress={vm.handleConfirm}
            disabled={vm.isProcessing}
            style={{ backgroundColor: vm.isReturn ? '#f97316' : '#ef4444' }}
            className="w-full py-3.5 rounded-2xl items-center justify-center"
            activeOpacity={0.8}
          >
            <Typography className="text-white font-geologica-bold text-sm">
              {confirmBtnText}
            </Typography>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={vm.goBack}
            disabled={vm.isProcessing}
            style={{ borderColor: colors.border, borderWidth: 1, backgroundColor: colors.background }}
            className="w-full py-3.5 rounded-2xl items-center justify-center"
            activeOpacity={0.8}
          >
            <Typography style={{ color: colors.textSecondary }} className="font-geologica-bold text-sm">
              Go Back
            </Typography>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
