import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronLeft, Store, CheckCircle } from 'lucide-react-native';
import { Typography, Button, InfoBanner } from '../../../shared';
import { useCheckoutViewModel } from '../viewmodels/useCheckoutViewModel';
import { useTheme } from '../../../shared/hooks';

export function CheckoutScreen() {
  const router = useRouter();
  const vm = useCheckoutViewModel();
  const insets = useSafeAreaInsets();
  const { isDark, colors } = useTheme();
  interface ValidationErrors {
    address?: string;
    city?: string;
    postal?: string;
    cardNumber?: string;
    expiry?: string;
    cvv?: string;
  }

  const [address, setAddress] = useState(vm.shippingDetails.address);
  const [city, setCity] = useState(vm.shippingDetails.city);
  const [postal, setPostal] = useState(vm.shippingDetails.postalCode);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [errors, setErrors] = useState<ValidationErrors>({});

  const formatCardNumber = (text: string) => {
    const digits = text.replace(/\D/g, '');
    const groups = digits.match(/.{1,4}/g);
    return groups ? groups.join(' ') : digits;
  };

  const formatExpiry = (text: string) => {
    const digits = text.replace(/\D/g, '');
    if (digits.length <= 2) {
      return digits;
    }
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
  };

  const formatCvv = (text: string) => {
    return text.replace(/\D/g, '').slice(0, 4);
  };

  const handlePlaceOrderPress = () => {
    const newErrors: ValidationErrors = {};

    // Validate Shipping Details
    if (!address.trim()) {
      newErrors.address = 'Address is required';
    }
    if (!city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!postal.trim()) {
      newErrors.postal = 'Postal Code is required';
    }

    // Validate Card Number
    const rawCard = cardNumber.replace(/\s/g, '');
    if (!rawCard) {
      newErrors.cardNumber = 'Card Number is required';
    } else if (rawCard.length < 16) {
      newErrors.cardNumber = 'Must be 16 digits';
    }

    // Validate Expiry Date
    if (!expiry) {
      newErrors.expiry = 'Expiry is required';
    } else {
      const expiryRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
      if (!expiryRegex.test(expiry)) {
        newErrors.expiry = 'Must be MM/YY';
      }
    }

    // Validate CVV
    const rawCvv = cvv.trim();
    if (!rawCvv) {
      newErrors.cvv = 'CVV is required';
    } else if (rawCvv.length < 3 || rawCvv.length > 4) {
      newErrors.cvv = 'Must be 3 or 4 digits';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    vm.handlePlaceOrder();
  };

  const sectionCard = "border rounded-3xl p-5 mb-4 bg-slate-50 border-slate-100 dark:bg-slate-800 dark:border-slate-700";
  const innerCard = "p-4 rounded-2xl border bg-white border-slate-100 dark:bg-slate-900 dark:border-slate-700";

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.surface }}
      edges={['top']}
    >
      {/* Header */}
      <View
        style={{ backgroundColor: colors.background, borderBottomColor: colors.borderSubtle, borderBottomWidth: 1 }}
        className="px-4 py-3.5 flex-row items-center z-10"
      >
        <TouchableOpacity onPress={() => router.back()} className="p-1 mr-3">
          <ChevronLeft size={22} color={colors.text} />
        </TouchableOpacity>
        <Typography style={{ color: colors.text }} className="text-base font-geologica-bold">Checkout</Typography>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Inline field errors and footer banners take care of form validation and API failures */}

        {/* Vendor Groups */}
        <Typography style={{ color: colors.text }} className="font-geologica-bold text-sm mb-3 mt-1">Review Items</Typography>
        {vm.vendorGroups.map((group) => (
          <View key={group.vendorId} className={`mb-4 ${sectionCard}`}>
            {/* Vendor Header */}
            <View className="flex-row items-center bg-brand-purple/5 border border-brand-purple/10 px-2 py-1 rounded-xl mb-3 align-self-start self-start gap-2">
              <Store size={12} color="#7d50a0" className="mr-1.5" />
              <Typography className="text-brand-purple font-geologica-light text-[6px]">
                Vendor: {group.vendorName}
              </Typography>
            </View>

            {/* Vendor Items (Read Only) */}
            {group.items.map((item) => (
              <View key={item.product.id} style={{ borderBottomColor: colors.borderSubtle, borderBottomWidth: 1 }} className="flex-row items-center py-2.5">
                {/* Product Thumbnail */}
                <View
                  style={{ backgroundColor: colors.surface, borderColor: colors.borderSubtle, borderWidth: 1 }}
                  className="w-12 h-12 rounded-xl overflow-hidden mr-3"
                >
                  {item.product.imageUrl ? (
                    <Image source={{ uri: item.product.imageUrl }} className="w-full h-full" resizeMode="cover" />
                  ) : null}
                </View>

                {/* Item Details */}
                <View className="flex-1 pr-4">
                  <Typography style={{ color: colors.text }} className="text-xs font-geologica-medium" numberOfLines={1}>
                    {item.product.name}
                  </Typography>
                  <Typography style={{ color: colors.textMuted }} className="text-[10px] font-geologica-light mt-0.5">
                    Qty: {item.quantity} • {vm.getPriceText(item.addedAtPrice)} each
                  </Typography>
                </View>
                <Typography style={{ color: colors.textSecondary }} className="font-geologica-medium text-xs">
                  {vm.getPriceText(item.addedAtPrice * item.quantity)}
                </Typography>
              </View>
            ))}
          </View>
        ))}

        {/* Shipping Details */}
        <View className={sectionCard}>
          <Typography style={{ color: colors.text }} className="font-geologica-bold text-sm mb-3.5">Shipping Details</Typography>
          <View className={innerCard}>
            <Typography style={{ color: colors.text }} className="font-geologica-semibold text-xs mb-2">
              {vm.shippingDetails.fullName}
            </Typography>
            <View style={{ backgroundColor: isDark ? '#0f172a' : '#f8fafc', borderColor: errors.address ? colors.error : colors.border, borderWidth: 1 }} className="rounded-lg px-3 py-2 mb-1">
              <TextInput
                value={address}
                onChangeText={(val) => {
                  setAddress(val);
                  setErrors(prev => ({ ...prev, address: undefined }));
                }}
                placeholder="Street Address"
                style={{ color: colors.text, fontFamily: 'Geologica_400Regular', fontSize: 12, padding: 0 }}
                placeholderTextColor={colors.textMuted}
              />
            </View>
            {errors.address && (
              <Typography style={{ color: colors.error }} className="text-[10px] font-geologica-semibold mb-2 ml-1">
                {errors.address}
              </Typography>
            )}

            <View className="flex-row gap-2">
              <View style={{ flex: 1 }}>
                <View style={{ backgroundColor: isDark ? '#0f172a' : '#f8fafc', borderColor: errors.city ? colors.error : colors.border, borderWidth: 1 }} className="rounded-lg px-3 py-2">
                  <TextInput
                    value={city}
                    onChangeText={(val) => {
                      setCity(val);
                      setErrors(prev => ({ ...prev, city: undefined }));
                    }}
                    placeholder="City"
                    style={{ color: colors.text, fontFamily: 'Geologica_400Regular', fontSize: 12, padding: 0 }}
                    placeholderTextColor={colors.textMuted}
                  />
                </View>
                {errors.city && (
                  <Typography style={{ color: colors.error }} className="text-[10px] font-geologica-semibold mt-1 ml-1">
                    {errors.city}
                  </Typography>
                )}
              </View>
              <View style={{ flex: 1 }}>
                <View style={{ backgroundColor: isDark ? '#0f172a' : '#f8fafc', borderColor: errors.postal ? colors.error : colors.border, borderWidth: 1 }} className="rounded-lg px-3 py-2">
                  <TextInput
                    value={postal}
                    onChangeText={(val) => {
                      setPostal(val);
                      setErrors(prev => ({ ...prev, postal: undefined }));
                    }}
                    placeholder="Postal Code"
                    style={{ color: colors.text, fontFamily: 'Geologica_400Regular', fontSize: 12, padding: 0 }}
                    placeholderTextColor={colors.textMuted}
                  />
                </View>
                {errors.postal && (
                  <Typography style={{ color: colors.error }} className="text-[10px] font-geologica-semibold mt-1 ml-1">
                    {errors.postal}
                  </Typography>
                )}
              </View>
            </View>
          </View>
        </View>

        {/* Payment Method */}
        <View className={sectionCard}>
          <Typography style={{ color: colors.text }} className="font-geologica-bold text-sm mb-3.5">Payment Method</Typography>
          <View className={innerCard}>
            <View style={{ backgroundColor: isDark ? '#0f172a' : '#f8fafc', borderColor: errors.cardNumber ? colors.error : colors.border, borderWidth: 1 }} className="rounded-lg px-3 py-2 mb-1">
              <TextInput
                value={cardNumber}
                onChangeText={(val) => {
                  setCardNumber(formatCardNumber(val));
                  setErrors(prev => ({ ...prev, cardNumber: undefined }));
                }}
                placeholder="Card Number"
                keyboardType="numeric"
                maxLength={19}
                style={{ color: colors.text, fontFamily: 'Geologica_400Regular', fontSize: 12, padding: 0 }}
                placeholderTextColor={colors.textMuted}
              />
            </View>
            {errors.cardNumber && (
              <Typography style={{ color: colors.error }} className="text-[10px] font-geologica-semibold mb-2 ml-1">
                {errors.cardNumber}
              </Typography>
            )}

            <View className="flex-row gap-2">
              <View style={{ flex: 1 }}>
                <View style={{ backgroundColor: isDark ? '#0f172a' : '#f8fafc', borderColor: errors.expiry ? colors.error : colors.border, borderWidth: 1 }} className="rounded-lg px-3 py-2">
                  <TextInput
                    value={expiry}
                    onChangeText={(val) => {
                      setExpiry(formatExpiry(val));
                      setErrors(prev => ({ ...prev, expiry: undefined }));
                    }}
                    placeholder="MM/YY"
                    keyboardType="numeric"
                    maxLength={5}
                    style={{ color: colors.text, fontFamily: 'Geologica_400Regular', fontSize: 12, padding: 0 }}
                    placeholderTextColor={colors.textMuted}
                  />
                </View>
                {errors.expiry && (
                  <Typography style={{ color: colors.error }} className="text-[10px] font-geologica-semibold mt-1 ml-1">
                    {errors.expiry}
                  </Typography>
                )}
              </View>
              <View style={{ flex: 1 }}>
                <View style={{ backgroundColor: isDark ? '#0f172a' : '#f8fafc', borderColor: errors.cvv ? colors.error : colors.border, borderWidth: 1 }} className="rounded-lg px-3 py-2">
                  <TextInput
                    value={cvv}
                    onChangeText={(val) => {
                      setCvv(formatCvv(val));
                      setErrors(prev => ({ ...prev, cvv: undefined }));
                    }}
                    placeholder="CVV"
                    keyboardType="numeric"
                    maxLength={4}
                    secureTextEntry
                    style={{ color: colors.text, fontFamily: 'Geologica_400Regular', fontSize: 12, padding: 0 }}
                    placeholderTextColor={colors.textMuted}
                  />
                </View>
                {errors.cvv && (
                  <Typography style={{ color: colors.error }} className="text-[10px] font-geologica-semibold mt-1 ml-1">
                    {errors.cvv}
                  </Typography>
                )}
              </View>
            </View>
          </View>
        </View>

        {/* Payment Summary */}
        <View className={`${sectionCard} mb-10`}>
          <Typography style={{ color: colors.text }} className="font-geologica-bold text-sm mb-4">Payment Summary</Typography>

          <View className="flex-row justify-between items-center mb-3">
            <Typography style={{ color: colors.textSecondary }} className="text-xs font-geologica">Subtotal</Typography>
            <Typography style={{ color: colors.text }} className="text-xs font-geologica-semibold">
              {vm.getPriceText(vm.cartSubtotal)}
            </Typography>
          </View>

          {vm.productDiscounts > 0 && (
            <View className="flex-row justify-between items-center mb-3">
              <Typography style={{ color: colors.textSecondary }} className="text-xs font-geologica">Product Discounts</Typography>
              <Typography style={{ color: colors.success }} className="text-xs font-geologica-semibold">
                -{vm.getPriceText(vm.productDiscounts)}
              </Typography>
            </View>
          )}

          {vm.promoDiscount > 0 && (
            <View className="flex-row justify-between items-center mb-3">
              <Typography style={{ color: colors.textSecondary }} className="text-xs font-geologica">Promo WELCOME10</Typography>
              <Typography style={{ color: colors.success }} className="text-xs font-geologica-semibold">
                -{vm.getPriceText(vm.promoDiscount)}
              </Typography>
            </View>
          )}

          <View className="flex-row justify-between items-center mb-3">
            <Typography style={{ color: colors.textSecondary }} className="text-xs font-geologica">Shipping</Typography>
            <Typography style={{ color: colors.success }} className="text-xs font-geologica-semibold">Free</Typography>
          </View>

          <View style={{ backgroundColor: colors.border, height: 1 }} className="my-2" />

          <View className="flex-row justify-between items-center mt-2">
            <Typography style={{ color: colors.text }} className="font-geologica-semibold text-sm">Total Payment</Typography>
            <Typography
              className="text-brand-purple font-geologica-bold text-lg flex-1 text-right ml-2"
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              {vm.getPriceText(vm.cartTotal)}
            </Typography>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View
        style={{ backgroundColor: colors.background, borderTopColor: colors.borderSubtle, borderTopWidth: 1, paddingBottom: Math.max(insets.bottom, 16) }}
        className="p-4"
      >
        {vm.error && (
          <View className="mb-3">
            <InfoBanner variant="red" message={vm.error} />
          </View>
        )}
        <TouchableOpacity
          onPress={handlePlaceOrderPress}
          disabled={vm.isProcessing}
          className="w-full bg-brand-purple py-3.5 rounded-2xl items-center justify-center flex-row"
          activeOpacity={0.8}
        >
          <Typography className="text-white font-geologica-bold text-sm">
            Place Order
          </Typography>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
