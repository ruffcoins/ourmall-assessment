import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  ChevronLeft,
  Trash2,
  Store,
  Tag,
  X,
  Minus,
  Plus,
  ShoppingCart,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react-native';
import { Typography, InfoBanner, useStore, convertPrice } from '../../../shared';
import { useCartViewModel } from '../viewmodels/useCartViewModel';
import { useTheme } from '../../../shared/hooks';

export function CartScreen() {
  const router = useRouter();
  const vm = useCartViewModel();
  const { clearCart } = useStore();
  const insets = useSafeAreaInsets();
  const { isDark, colors } = useTheme();
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState<string | null>(null);

  const styles = getStyles(isDark, colors);

  const handleApplyPromo = () => {
    setPromoError(null);
    if (!promoInput.trim()) return;
    const success = vm.applyPromo(promoInput);
    if (success) {
      setPromoInput('');
    } else {
      setPromoError('Invalid promo code. Try WELCOME10');
    }
  };

  const handleRemovePromo = () => {
    vm.removePromo();
    setPromoError(null);
  };

  const totalItems = vm.cartItems.reduce((s, i) => s + i.quantity, 0);

  // ── Empty cart ──────────────────────────────────────────────────────────────
  if (vm.cartItems.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.headerBtn}>
            <ChevronLeft size={22} color={colors.text} />
          </TouchableOpacity>
          <Typography style={styles.headerTitle}>My Cart</Typography>
          <View style={{ width: 36 }} />
        </View>

        <View style={styles.emptyState}>
          <View style={styles.emptyIconWrap}>
            <ShoppingCart size={44} color="#7d50a0" />
          </View>
          <Typography style={styles.emptyTitle}>Your cart is empty</Typography>
          <Typography style={styles.emptySubtitle}>
            Looks like you haven't added anything yet.{'\n'}Let's go find something great!
          </Typography>
          <TouchableOpacity
            onPress={() => router.replace('/')}
            style={styles.shopBtn}
            activeOpacity={0.85}
          >
            <Typography style={styles.shopBtnText}>Continue Shopping</Typography>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // ── Populated cart ──────────────────────────────────────────────────────────
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerBtn}>
          <ChevronLeft size={22} color={colors.text} />
        </TouchableOpacity>
        <View style={{ alignItems: 'center' }}>
          <Typography style={styles.headerTitle}>My Cart</Typography>
          <Typography style={styles.headerSubtitle}>{totalItems} item{totalItems !== 1 ? 's' : ''}</Typography>
        </View>
        <TouchableOpacity onPress={clearCart} style={styles.headerBtn}>
          <Trash2 size={20} color={colors.error} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >


        {/* Vendor Groups */}
        {vm.vendorGroups.map((group) => (
          <View key={group.vendorId} style={styles.vendorCard}>
            {/* Vendor header */}
            <View style={styles.vendorHeader}>
              <View style={styles.vendorIconWrap}>
                <Store size={14} color="#7d50a0" />
              </View>
              <Typography style={styles.vendorName}>{group.vendorName}</Typography>
              <View style={{ flex: 1 }} />
              <TouchableOpacity style={styles.vendorViewLink} activeOpacity={0.7}>
                <Typography style={styles.vendorViewText}>View Store</Typography>
                <ChevronRight size={10} color="#7d50a0" />
              </TouchableOpacity>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Items */}
            {group.items.map((item, idx) => {
              const basePriceConverted = convertPrice(
                item.product.basePrice,
                useStore.getState().activeCurrency,
                item.product.currency
              );
              const isItemDiscounted = item.addedAtPrice < basePriceConverted - 0.01;
              const discountPercent = item.product.discount
                ? item.product.discount.type === 'percentage'
                  ? item.product.discount.value
                  : Math.round((item.product.discount.value / item.product.basePrice) * 100)
                : 0;

              const isOutOfStock = item.product.stockCount === 0;

              return (
                <View
                  key={item.product.id}
                  style={[
                    styles.cartItem,
                    idx < group.items.length - 1 && styles.cartItemBorder,
                    isOutOfStock && styles.cartItemOOS,
                  ]}
                >
                  {/* Product Image */}
                  <TouchableOpacity
                    onPress={() => router.push(`/product/${item.product.id}`)}
                    activeOpacity={0.9}
                  >
                    <View style={styles.imageWrap}>
                      <Image
                        source={{ uri: item.product.imageUrl }}
                        style={styles.productImage}
                        resizeMode="cover"
                      />
                      {isItemDiscounted && discountPercent > 0 && !isOutOfStock && (
                        <View style={styles.discountBadge}>
                          <Typography style={styles.discountBadgeText}>-{discountPercent}%</Typography>
                        </View>
                      )}
                    </View>
                  </TouchableOpacity>

                  {/* Info */}
                  <View style={styles.itemInfo}>
                    {/* Category tag / OOS tag */}
                    {isOutOfStock ? (
                      <View style={styles.oosTag}>
                        <Typography style={styles.oosTagText}>OUT OF STOCK</Typography>
                      </View>
                    ) : (
                      <Typography style={styles.itemCategory}>{item.product.category}</Typography>
                    )}

                    {/* Name */}
                    <Typography style={styles.itemName} numberOfLines={2}>
                      {item.product.name}
                    </Typography>

                    {/* Vendor */}
                    <Typography style={styles.itemVendor}>{item.product.vendor.name}</Typography>

                    {/* Price row */}
                    <View style={styles.priceRow}>
                      <Typography style={styles.itemPrice}>
                        {vm.getPriceText(item.addedAtPrice)}
                      </Typography>
                      {isItemDiscounted && !isOutOfStock && (
                        <Typography style={styles.originalPrice}>
                          {vm.getPriceText(basePriceConverted)}
                        </Typography>
                      )}
                    </View>

                    {/* Quantity + Delete or OOS Purge Button */}
                    {isOutOfStock ? (
                      <TouchableOpacity
                        onPress={() => vm.removeFromCart(item.product.id)}
                        style={styles.oosRemoveBtn}
                        activeOpacity={0.7}
                      >
                        <Trash2 size={13} color={colors.error} />
                        <Typography style={styles.oosRemoveBtnText}>Remove Item</Typography>
                      </TouchableOpacity>
                    ) : (
                      <View style={styles.qtyRow}>
                        <View style={styles.qtyControl}>
                          <TouchableOpacity
                            onPress={() => vm.updateQuantity(item.product.id, item.quantity - 1)}
                            style={styles.qtyBtn}
                            activeOpacity={0.7}
                          >
                            <Minus size={12} color={colors.textSecondary} />
                          </TouchableOpacity>
                          <Typography style={styles.qtyText}>{item.quantity}</Typography>
                          <TouchableOpacity
                            onPress={() =>
                              vm.updateQuantity(
                                item.product.id,
                                Math.min(item.product.stockCount, item.quantity + 1)
                              )
                            }
                            style={styles.qtyBtn}
                            activeOpacity={0.7}
                          >
                            <Plus size={12} color={colors.textSecondary} />
                          </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                          onPress={() => vm.removeFromCart(item.product.id)}
                          style={styles.deleteBtn}
                          activeOpacity={0.7}
                        >
                          <Trash2 size={16} color={colors.error} />
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        ))}

        {/* Promo Code */}
        <View style={styles.sectionCard}>
          <View style={styles.promoLabelRow}>
            <Tag size={15} color="#7d50a0" />
            <Typography style={styles.sectionTitle}>Promo Code</Typography>
          </View>

          {vm.appliedPromo ? (
            <View style={styles.promoApplied}>
              <View style={styles.promoAppliedLeft}>
                <View style={styles.promoCheckDot} />
                <Typography style={styles.promoAppliedText}>
                  {vm.appliedPromo} — saving {vm.getPriceText(vm.promoDiscount)}
                </Typography>
              </View>
              <TouchableOpacity onPress={handleRemovePromo} style={styles.promoRemoveBtn}>
                <X size={14} color="#10b981" />
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <View style={styles.promoInputRow}>
                <TextInput
                  style={styles.promoInput}
                  placeholder="e.g. WELCOME10"
                  placeholderTextColor={colors.textMuted}
                  value={promoInput}
                  onChangeText={(t) => {
                    setPromoInput(t);
                    setPromoError(null);
                  }}
                  autoCapitalize="characters"
                  returnKeyType="done"
                  onSubmitEditing={handleApplyPromo}
                />
                <TouchableOpacity onPress={handleApplyPromo} style={styles.promoApplyBtn} activeOpacity={0.85}>
                  <Typography style={styles.promoApplyText}>Apply</Typography>
                </TouchableOpacity>
              </View>
              {promoError && (
                <Typography style={styles.promoError}>{promoError}</Typography>
              )}
            </>
          )}
        </View>

        {/* Order Summary */}
        <View style={styles.sectionCard}>
          <Typography style={styles.sectionTitle}>Order Summary</Typography>

          <View style={styles.summaryRow}>
            <Typography style={styles.summaryLabel}>Subtotal ({totalItems} items)</Typography>
            <Typography style={styles.summaryValue}>{vm.getPriceText(vm.cartSubtotal)}</Typography>
          </View>

          {vm.productDiscounts > 0 && (
            <View style={styles.summaryRow}>
              <Typography style={styles.summaryLabel}>Product Savings</Typography>
              <Typography style={styles.summaryDiscount}>−{vm.getPriceText(vm.productDiscounts)}</Typography>
            </View>
          )}

          {vm.promoDiscount > 0 && (
            <View style={styles.summaryRow}>
              <Typography style={styles.summaryLabel}>Promo ({vm.appliedPromo})</Typography>
              <Typography style={styles.summaryDiscount}>−{vm.getPriceText(vm.promoDiscount)}</Typography>
            </View>
          )}

          <View style={styles.summaryRow}>
            <Typography style={styles.summaryLabel}>Shipping</Typography>
            <View style={styles.freeShipBadge}>
              <Typography style={styles.freeShipText}>FREE</Typography>
            </View>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.totalRow}>
            <Typography style={styles.totalLabel}>Grand Total</Typography>
            <Typography
              style={styles.totalAmount}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              {vm.getPriceText(vm.cartTotal)}
            </Typography>
          </View>

          {(vm.productDiscounts + vm.promoDiscount) > 0 && (
            <View style={styles.savingsBanner}>
              <ShieldCheck size={13} color={colors.success} />
              <Typography style={styles.savingsText}>
                You're saving {vm.getPriceText(vm.productDiscounts + vm.promoDiscount)} on this order!
              </Typography>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Checkout CTA */}
      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 16) }]}>
        {vm.validationError && (
          <View style={{ marginBottom: 12 }}>
            <InfoBanner variant="red" message={vm.validationError} />
          </View>
        )}
        <TouchableOpacity
          onPress={vm.handleCheckout}
          disabled={vm.isValidating || vm.hasOutOfStockItems}
          style={[
            styles.checkoutBtn,
            (vm.isValidating || vm.hasOutOfStockItems) && { backgroundColor: isDark ? '#334155' : '#cbd5e1', opacity: 0.9 }
          ]}
          activeOpacity={0.88}
        >
          {vm.isValidating ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : vm.hasOutOfStockItems ? (
            <Typography style={styles.checkoutText}>Remove Out-of-Stock Items to Checkout</Typography>
          ) : (
            <>
              <Typography style={styles.checkoutText}>Proceed to Checkout</Typography>
              <View style={styles.checkoutAmount}>
                <Typography
                  style={styles.checkoutAmountText}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                >
                  {vm.getPriceText(vm.cartTotal)}
                </Typography>
              </View>
            </>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function getStyles(isDark: boolean, colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.surface },

    // Header
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 14,
      backgroundColor: colors.background,
      borderBottomWidth: 1,
      borderBottomColor: colors.borderSubtle,
    },
    headerBtn: { padding: 6, borderRadius: 12 },
    headerTitle: { fontSize: 16, fontFamily: 'Geologica_700Bold', color: colors.text },
    headerSubtitle: { fontSize: 11, fontFamily: 'Geologica_400Regular', color: colors.textMuted, marginTop: 1 },

    // Empty state
    emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40 },
    emptyIconWrap: {
      width: 96, height: 96, borderRadius: 48,
      backgroundColor: isDark ? '#2d1f3d' : '#f3edf9',
      justifyContent: 'center', alignItems: 'center',
      marginBottom: 20,
    },
    emptyTitle: { fontSize: 20, fontFamily: 'Geologica_700Bold', color: colors.text, marginBottom: 10 },
    emptySubtitle: {
      fontSize: 13, fontFamily: 'Geologica_400Regular',
      color: colors.textMuted, textAlign: 'center', lineHeight: 20, marginBottom: 28,
    },
    shopBtn: {
      backgroundColor: '#7d50a0', paddingHorizontal: 32, paddingVertical: 14,
      borderRadius: 18,
    },
    shopBtnText: { color: '#ffffff', fontSize: 14, fontFamily: 'Geologica_700Bold' },

    // Vendor card
    vendorCard: {
      marginHorizontal: 16,
      marginTop: 16,
      backgroundColor: colors.background,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.borderSubtle,
      overflow: 'hidden',
      shadowColor: '#7d50a0',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.18 : 0.05,
      shadowRadius: 12,
      elevation: 2,
    },
    vendorHeader: {
      flexDirection: 'row', alignItems: 'center',
      paddingHorizontal: 16, paddingVertical: 12,
      backgroundColor: isDark ? '#1a0e26' : '#faf7fd',
    },
    vendorIconWrap: {
      width: 28, height: 28, borderRadius: 8,
      backgroundColor: isDark ? '#2d1f3d' : '#efe8f5',
      justifyContent: 'center', alignItems: 'center', marginRight: 8,
    },
    vendorName: { fontSize: 13, fontFamily: 'Geologica_600SemiBold', color: '#7d50a0' },
    vendorViewLink: { flexDirection: 'row', alignItems: 'center', gap: 2 },
    vendorViewText: { fontSize: 10, fontFamily: 'Geologica_600SemiBold', color: '#7d50a0' },
    divider: { height: 1, backgroundColor: colors.borderSubtle },

    // Cart item
    cartItem: { flexDirection: 'row', padding: 16, gap: 12, backgroundColor: colors.background },
    cartItemBorder: { borderBottomWidth: 1, borderBottomColor: colors.surface },

    imageWrap: {
      width: 90, height: 90,
      borderRadius: 14, overflow: 'hidden',
      backgroundColor: colors.surface,
      position: 'relative',
    },
    productImage: { width: 90, height: 90 },
    discountBadge: {
      position: 'absolute', top: 4, left: 4,
      backgroundColor: '#ef4444',
      paddingHorizontal: 5, paddingVertical: 2,
      borderRadius: 6,
    },
    discountBadgeText: { color: '#ffffff', fontSize: 9, fontFamily: 'Geologica_700Bold' },

    itemInfo: { flex: 1 },
    itemCategory: {
      fontSize: 9, fontFamily: 'Geologica_500Medium',
      color: colors.textMuted, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 3,
    },
    itemName: { fontSize: 14, fontFamily: 'Geologica_700Bold', color: colors.text, lineHeight: 18, marginBottom: 2 },
    itemVendor: { fontSize: 11, fontFamily: 'Geologica_300Light', color: colors.textMuted, marginBottom: 6 },

    priceRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 10 },
    itemPrice: { fontSize: 15, fontFamily: 'Geologica_700Bold', color: '#7d50a0' },
    originalPrice: {
      fontSize: 11, fontFamily: 'Geologica_300Light',
      color: colors.textMuted, textDecorationLine: 'line-through',
    },

    qtyRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    qtyControl: {
      flexDirection: 'row', alignItems: 'center',
      backgroundColor: colors.surface, borderRadius: 10,
      borderWidth: 1, borderColor: colors.border,
      padding: 2,
    },
    qtyBtn: {
      width: 28, height: 28,
      backgroundColor: colors.background,
      borderRadius: 8,
      justifyContent: 'center', alignItems: 'center',
      borderWidth: 1, borderColor: colors.border,
    },
    qtyText: {
      fontSize: 13, fontFamily: 'Geologica_700Bold',
      color: colors.text, paddingHorizontal: 12,
      minWidth: 36, textAlign: 'center',
    },
    deleteBtn: { padding: 6 },

    // Section card (promo + summary)
    sectionCard: {
      marginHorizontal: 16, marginTop: 16,
      backgroundColor: colors.background,
      borderRadius: 20, borderWidth: 1, borderColor: colors.borderSubtle,
      padding: 18,
      shadowColor: '#7d50a0',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.15 : 0.04,
      shadowRadius: 10,
      elevation: 2,
    },
    sectionTitle: { fontSize: 14, fontFamily: 'Geologica_700Bold', color: colors.text, marginBottom: 14 },
    promoLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 7, marginBottom: 14 },

    promoInputRow: {
      flexDirection: 'row', alignItems: 'center',
      backgroundColor: colors.surface,
      borderRadius: 14, borderWidth: 1, borderColor: colors.border,
      paddingLeft: 14, overflow: 'hidden',
    },
    promoInput: {
      flex: 1, fontFamily: 'Geologica_400Regular',
      color: colors.text, fontSize: 13, paddingVertical: 12,
    },
    promoApplyBtn: {
      backgroundColor: '#7d50a0',
      paddingHorizontal: 18, paddingVertical: 13,
      borderRadius: 12, margin: 3,
    },
    promoApplyText: { color: '#ffffff', fontSize: 12, fontFamily: 'Geologica_700Bold' },
    promoError: { color: colors.error, fontSize: 11, fontFamily: 'Geologica_400Regular', marginTop: 6, marginLeft: 2 },

    promoApplied: {
      flexDirection: 'row', alignItems: 'center',
      backgroundColor: isDark ? '#052e16' : '#f0fdf4',
      borderWidth: 1, borderColor: isDark ? '#14532d' : '#bbf7d0',
      borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12,
    },
    promoAppliedLeft: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 },
    promoCheckDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#10b981' },
    promoAppliedText: { fontSize: 13, fontFamily: 'Geologica_600SemiBold', color: colors.success, flex: 1 },
    promoRemoveBtn: {
      width: 26, height: 26, borderRadius: 13,
      backgroundColor: isDark ? '#14532d' : '#dcfce7', justifyContent: 'center', alignItems: 'center',
    },

    // Summary
    summaryRow: {
      flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12,
    },
    summaryLabel: { fontSize: 13, fontFamily: 'Geologica_400Regular', color: colors.textSecondary },
    summaryValue: { fontSize: 13, fontFamily: 'Geologica_600SemiBold', color: colors.text },
    summaryDiscount: { fontSize: 13, fontFamily: 'Geologica_600SemiBold', color: colors.success },
    freeShipBadge: {
      backgroundColor: isDark ? '#052e16' : '#f0fdf4',
      borderWidth: 1, borderColor: isDark ? '#14532d' : '#bbf7d0',
      paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6,
    },
    freeShipText: { fontSize: 10, fontFamily: 'Geologica_700Bold', color: colors.success },
    summaryDivider: { height: 1, backgroundColor: colors.borderSubtle, marginVertical: 12 },
    totalRow: {
      flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12,
    },
    totalLabel: { fontSize: 15, fontFamily: 'Geologica_600SemiBold', color: colors.text },
    totalAmount: { fontSize: 22, lineHeight: 28, fontFamily: 'Geologica_700Bold', color: '#7d50a0' },
    savingsBanner: {
      flexDirection: 'row', alignItems: 'center', gap: 6,
      backgroundColor: isDark ? '#052e16' : '#f0fdf4', borderRadius: 10,
      paddingHorizontal: 12, paddingVertical: 8,
    },
    savingsText: { fontSize: 11, fontFamily: 'Geologica_600SemiBold', color: colors.success, flex: 1 },

    // Footer
    footer: {
      backgroundColor: colors.background,
      paddingHorizontal: 16, paddingTop: 12,
      borderTopWidth: 1, borderTopColor: colors.borderSubtle,
    },
    checkoutBtn: {
      backgroundColor: '#7d50a0',
      borderRadius: 18, paddingVertical: 16,
      flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    },
    checkoutText: {
      color: '#ffffff', fontSize: 15, fontFamily: 'Geologica_700Bold', flex: 1, textAlign: 'center',
    },
    checkoutAmount: {
      backgroundColor: 'rgba(255,255,255,0.2)',
      paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10, marginRight: 8,
    },
    checkoutAmountText: { color: '#ffffff', fontSize: 13, fontFamily: 'Geologica_700Bold' },
    cartItemOOS: { backgroundColor: isDark ? '#1a0e0e' : '#fcf8f8', opacity: 0.8 },
    oosTag: {
      backgroundColor: isDark ? '#2d0c0c' : '#fef2f2',
      borderColor: isDark ? '#7f1d1d' : '#fca5a5',
      borderWidth: 1,
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 6,
      alignSelf: 'flex-start',
      marginBottom: 4,
    },
    oosTagText: {
      color: colors.error,
      fontSize: 9,
      fontFamily: 'Geologica_700Bold',
      letterSpacing: 0.5,
    },
    oosRemoveBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      backgroundColor: isDark ? '#2d0c0c' : '#fef2f2',
      borderWidth: 1,
      borderColor: isDark ? '#7f1d1d' : '#fca5a5',
      borderRadius: 10,
      paddingHorizontal: 12,
      paddingVertical: 6,
      alignSelf: 'flex-start',
      marginTop: 4,
    },
    oosRemoveBtnText: {
      color: colors.error,
      fontSize: 11,
      fontFamily: 'Geologica_700Bold',
    },
  });
}
