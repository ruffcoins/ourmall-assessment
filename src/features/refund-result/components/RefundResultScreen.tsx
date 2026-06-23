import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CheckCircle2, Info } from 'lucide-react-native';
import { Typography } from '../../../shared';
import { useRefundResultViewModel } from '../viewmodels/useRefundResultViewModel';
import { useTheme } from '../../../shared/hooks';

interface RefundResultScreenProps {
  orderId: string;
  refundedAmount: string;
  isReturn?: boolean;
}

export function RefundResultScreen({ orderId, refundedAmount, isReturn }: RefundResultScreenProps) {
  const vm = useRefundResultViewModel(orderId, refundedAmount);
  const { isDark, colors } = useTheme();

  const accentColor = isReturn ? (isDark ? '#fb923c' : '#ea580c') : colors.success;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top', 'bottom']}>
      <View className="flex-1 items-center justify-center px-6">
        {/* Checkmark circle */}
        <View
          style={{
            backgroundColor: isReturn ? (isDark ? '#1c0e00' : '#fff7ed') : (isDark ? '#052e16' : '#f0fdf4'),
            borderColor: isReturn ? (isDark ? '#7c2d12' : '#fed7aa') : (isDark ? '#14532d' : '#d1fae5'),
            borderWidth: 1,
          }}
          className="w-24 h-24 rounded-full items-center justify-center mb-6"
        >
          <CheckCircle2 size={44} color={isReturn ? (isDark ? '#fb923c' : '#ea580c') : '#10b981'} />
        </View>

        <Typography style={{ color: colors.text }} className="text-2xl font-geologica-bold text-center mb-2">
          {isReturn ? 'Return Successful' : 'Cancellation Successful'}
        </Typography>

        <Typography style={{ color: colors.textMuted }} className="text-xs font-geologica text-center mb-8 leading-5">
          {isReturn
            ? 'The selected items have been returned successfully.'
            : 'The selected items have been cancelled from your order.'}
        </Typography>

        {/* Cancellation Summary Table */}
        <View
          style={{ backgroundColor: colors.surface, borderColor: colors.borderSubtle, borderWidth: 1 }}
          className="rounded-3xl p-5 w-full mb-6"
        >
          <Typography style={{ color: colors.text }} className="font-geologica-bold text-xs mb-3.5">
            {isReturn ? 'Return Details' : 'Cancellation Details'}
          </Typography>

          <View className="flex-row justify-between items-center mb-3">
            <Typography style={{ color: colors.textSecondary }} className="text-xs font-geologica">Refunded Amount</Typography>
            <Typography style={{ color: accentColor }} className="font-geologica-bold text-sm">
              {vm.getRefundText()}
            </Typography>
          </View>

          <View style={{ backgroundColor: colors.border, height: 1 }} className="my-1" />

          <View className="flex-row justify-between items-center mt-2.5">
            <Typography style={{ color: colors.textSecondary }} className="text-xs font-geologica">Updated Order Total</Typography>
            <Typography style={{ color: colors.text }} className="font-geologica-bold text-sm">
              {vm.getUpdatedTotalText()}
            </Typography>
          </View>
        </View>

        {/* Blue Info Box */}
        <View
          style={{
            backgroundColor: isDark ? '#0c1f3d' : '#eff6ff',
            borderColor: isDark ? '#1e3a5f' : '#bfdbfe',
            borderWidth: 1,
          }}
          className="flex-row items-center rounded-2xl px-4 py-3.5 w-full mb-8"
        >
          <Info size={18} color={isDark ? '#60a5fa' : '#3b82f6'} />
          <Typography
            style={{ color: isDark ? '#93c5fd' : '#1d4ed8' }}
            className="font-geologica-semibold text-[10px] flex-1 leading-4 ml-2"
          >
            Refund will be processed to your original payment method within 3-5 business days.
          </Typography>
        </View>

        {/* Actions */}
        <View className="w-full" style={{ gap: 12 }}>
          <TouchableOpacity
            onPress={vm.handleBackToOrder}
            className="w-full bg-brand-purple py-3.5 rounded-2xl items-center justify-center"
            activeOpacity={0.8}
          >
            <Typography className="text-white font-geologica-bold text-sm">
              View Order
            </Typography>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={vm.handleContinueShopping}
            style={{ borderColor: colors.border, borderWidth: 1, backgroundColor: colors.surface }}
            className="w-full py-3.5 rounded-2xl items-center justify-center"
            activeOpacity={0.8}
          >
            <Typography style={{ color: colors.textSecondary }} className="font-geologica-bold text-sm">
              Continue Shopping
            </Typography>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
