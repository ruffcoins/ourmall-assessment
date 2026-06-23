import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CheckCircle2 } from 'lucide-react-native';
import { Typography } from '../../../shared';
import { useOrderSuccessViewModel } from '../viewmodels/useOrderSuccessViewModel';
import { useTheme } from '../../../shared/hooks';

interface OrderSuccessScreenProps {
  orderId: string;
}

export function OrderSuccessScreen({ orderId }: OrderSuccessScreenProps) {
  const vm = useOrderSuccessViewModel(orderId);
  const { isDark, colors } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top', 'bottom']}>
      {/* Background Confetti Shapes */}
      <View style={{ position: 'absolute', top: '15%', left: '10%', width: 8, height: 8, borderRadius: 4, backgroundColor: '#7d50a0', transform: [{ rotate: '45deg' }], opacity: 0.6 }} />
      <View style={{ position: 'absolute', top: '12%', right: '15%', width: 10, height: 6, backgroundColor: '#f56e41', transform: [{ rotate: '15deg' }], opacity: 0.6 }} />
      <View style={{ position: 'absolute', top: '25%', left: '20%', width: 6, height: 10, backgroundColor: '#10b981', transform: [{ rotate: '-30deg' }], opacity: 0.6 }} />
      <View style={{ position: 'absolute', top: '22%', right: '25%', width: 8, height: 8, borderRadius: 4, backgroundColor: '#eab308', opacity: 0.6 }} />
      <View style={{ position: 'absolute', top: '30%', right: '10%', width: 10, height: 10, backgroundColor: '#3b82f6', transform: [{ rotate: '60deg' }], opacity: 0.6 }} />
      <View style={{ position: 'absolute', top: '8%', left: '35%', width: 10, height: 5, backgroundColor: '#f56e41', transform: [{ rotate: '120deg' }], opacity: 0.6 }} />

      <View className="flex-1 items-center justify-center px-6">
        {/* Large Checkmark Circle */}
        <View
          style={{ backgroundColor: isDark ? '#052e16' : '#f0fdf4', borderColor: isDark ? '#14532d' : '#d1fae5', borderWidth: 1 }}
          className="w-24 h-24 rounded-full items-center justify-center mb-6"
        >
          <CheckCircle2 size={44} color="#10b981" />
        </View>

        <Typography style={{ color: colors.text }} className="text-2xl font-geologica-bold text-center mb-2">
          Order Confirmed!
        </Typography>

        <Typography style={{ color: colors.textMuted }} className="text-xs font-geologica text-center mb-8 leading-5">
          Your order has been successfully placed. We'll send you an email confirmation shortly.
        </Typography>

        {/* Order ID Box */}
        <View
          style={{ backgroundColor: colors.surface, borderColor: colors.borderSubtle, borderWidth: 1 }}
          className="px-6 py-4 rounded-2xl w-full mb-4 items-center"
        >
          <Typography style={{ color: colors.textMuted }} className="text-[10px] font-geologica mb-1">Order ID</Typography>
          <Typography style={{ color: colors.text }} className="font-geologica-bold text-base">{vm.orderId}</Typography>
        </View>

        {/* 2 Column Details Cards */}
        <View className="flex-row w-full gap-3 mb-10">
          <View
            style={{ backgroundColor: colors.surface, borderColor: colors.borderSubtle, borderWidth: 1 }}
            className="flex-1 p-4 rounded-2xl items-center"
          >
            <Typography style={{ color: colors.textMuted }} className="text-[10px] font-geologica mb-1">Total Paid</Typography>
            <Typography className="text-brand-purple font-geologica-bold text-base">{vm.totalPaid}</Typography>
          </View>
          <View
            style={{ backgroundColor: colors.surface, borderColor: colors.borderSubtle, borderWidth: 1 }}
            className="flex-1 p-4 rounded-2xl items-center"
          >
            <Typography style={{ color: colors.textMuted }} className="text-[10px] font-geologica mb-1">Vendors</Typography>
            <Typography style={{ color: colors.text }} className="font-geologica-bold text-base">{vm.vendorsCount}</Typography>
          </View>
        </View>

        {/* Actions */}
        <View className="w-full" style={{ gap: 12 }}>
          <TouchableOpacity
            onPress={vm.handleViewOrder}
            className="w-full bg-brand-purple py-3.5 rounded-2xl items-center justify-center"
            activeOpacity={0.8}
          >
            <Typography className="text-white font-geologica-bold text-sm">
              View Order Details
            </Typography>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={vm.handleContinueShopping}
            style={{ borderColor: '#7d50a0', borderWidth: 1, backgroundColor: isDark ? 'transparent' : 'transparent' }}
            className="w-full py-3.5 rounded-2xl items-center justify-center"
            activeOpacity={0.8}
          >
            <Typography className="text-brand-purple font-geologica-bold text-sm">
              Continue Shopping
            </Typography>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
