import React from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronLeft, ShoppingBag, Calendar, ArrowRight } from 'lucide-react-native';
import { Typography, useStore, database } from '../../../shared';
import { useTheme } from '../../../shared/hooks';

export function OrdersScreen() {
  const router = useRouter();
  const { orders, activeCurrency } = useStore();
  const { isDark, colors } = useTheme();

  const styles = getStyles(isDark, colors);

  const getPriceText = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || activeCurrency,
    }).format(price);
  };

  // Render individual order card
  const renderOrderCard = ({ item: order }: { item: typeof orders[0] }) => {
    const formattedDate = new Date(order.createdAt).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    // Flatten all items across sub-orders
    const allItems = order.vendorSubOrders.flatMap(sub => sub.items);
    const totalItemCount = allItems.reduce((sum, item) => sum + item.quantity, 0);

    // Get unique product images
    const images = Array.from(new Set(allItems.map(i => i.imageUrl))).filter(Boolean);

    return (
      <TouchableOpacity
        onPress={() => router.push(`/order/${order.masterOrderId}`)}
        style={styles.card}
        activeOpacity={0.9}
      >
        {/* Header Row */}
        <View style={styles.cardHeader}>
          <View>
            <Typography style={styles.orderId}>Order #{order.masterOrderId}</Typography>
            <View style={styles.dateRow}>
              <Calendar size={11} color={colors.textMuted} />
              <Typography style={styles.dateText}>{formattedDate}</Typography>
            </View>
          </View>
          <View style={styles.arrowIconWrap}>
            <ArrowRight size={14} color="#7d50a0" />
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Dynamic thumbnails of items */}
        {images.length > 0 && (
          <View style={styles.thumbnailRow}>
            {images.slice(0, 4).map((img, idx) => (
              <View key={idx} style={styles.thumbnailWrap}>
                <Image source={{ uri: img }} style={styles.thumbnail as any} resizeMode="cover" />
              </View>
            ))}
            {images.length > 4 && (
              <View style={styles.moreThumbnails}>
                <Typography style={styles.moreThumbnailsText}>+{images.length - 4}</Typography>
              </View>
            )}

            <View style={{ flex: 1 }} />

            <View style={styles.summaryInfo}>
              <Typography style={styles.itemCountText}>
                {totalItemCount} item{totalItemCount !== 1 ? 's' : ''}
              </Typography>
              <Typography style={styles.totalPriceText}>
                {getPriceText(order.grandTotal, order.currency)}
              </Typography>
            </View>
          </View>
        )}

        {/* Vendor Breakdown Sub-orders */}
        <View style={styles.vendorStatusList}>
          {order.vendorSubOrders.map((subOrder) => {
            const vendorName = subOrder.vendorName;

            return (
              <View key={subOrder.subOrderId} style={styles.vendorStatusRow}>
                <Typography style={styles.vendorStatusName} numberOfLines={1}>
                  {vendorName}
                </Typography>
                <View style={[styles.statusBadge, styles[`statusBadge_${subOrder.status}`]]}>
                  <Typography style={[styles.statusBadgeText, styles[`statusBadgeText_${subOrder.status}`]]}>
                    {subOrder.status}
                  </Typography>
                </View>
              </View>
            );
          })}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerBtn}>
          <ChevronLeft size={22} color={colors.text} />
        </TouchableOpacity>
        <Typography style={styles.headerTitle}>My Orders</Typography>
        <View style={{ width: 36 }} />
      </View>

      {/* Orders List / Empty State */}
      {orders.length === 0 ? (
        <View style={styles.emptyState}>
          <View style={styles.emptyIconWrap}>
            <ShoppingBag size={40} color="#7d50a0" />
          </View>
          <Typography style={styles.emptyTitle}>No orders placed yet</Typography>
          <Typography style={styles.emptySubtitle}>
            Your session orders will appear here after you place an order at checkout.
          </Typography>
          <TouchableOpacity
            onPress={() => router.replace('/')}
            style={styles.shopBtn}
            activeOpacity={0.85}
          >
            <Typography style={styles.shopBtnText}>Start Shopping</Typography>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.masterOrderId}
          renderItem={renderOrderCard}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
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

    // Empty State
    emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40 },
    emptyIconWrap: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: isDark ? '#2d1f3d' : '#f3edf9',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
    emptyTitle: { fontSize: 18, fontFamily: 'Geologica_700Bold', color: colors.text, marginBottom: 10 },
    emptySubtitle: {
      fontSize: 13,
      fontFamily: 'Geologica_400Regular',
      color: colors.textMuted,
      textAlign: 'center',
      lineHeight: 19,
      marginBottom: 24,
    },
    shopBtn: {
      backgroundColor: '#7d50a0',
      paddingHorizontal: 28,
      paddingVertical: 13,
      borderRadius: 16,
    },
    shopBtnText: { color: '#ffffff', fontSize: 13, fontFamily: 'Geologica_700Bold' },

    // List Content
    listContent: { padding: 16, paddingBottom: 32 },

    // Card Styling
    card: {
      backgroundColor: colors.background,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: colors.borderSubtle,
      padding: 16,
      marginBottom: 16,
      shadowColor: '#7d50a0',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.18 : 0.04,
      shadowRadius: 8,
      elevation: 2,
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    orderId: { fontSize: 13, fontFamily: 'Geologica_700Bold', color: colors.text },
    dateRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
    dateText: { fontSize: 11, fontFamily: 'Geologica_400Regular', color: colors.textMuted },
    arrowIconWrap: {
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: isDark ? '#1a0e26' : '#fdfbfe',
      borderWidth: 1,
      borderColor: isDark ? '#2d1f3d' : '#f3edf9',
      justifyContent: 'center',
      alignItems: 'center',
    },
    divider: { height: 1, backgroundColor: colors.borderSubtle, marginVertical: 12 },

    // Thumbnail list
    thumbnailRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 12 },
    thumbnailWrap: {
      width: 38,
      height: 38,
      borderRadius: 10,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: colors.borderSubtle,
      backgroundColor: colors.surface,
    },
    thumbnail: { width: '100%', height: '100%' },
    moreThumbnails: {
      width: 38,
      height: 38,
      borderRadius: 10,
      backgroundColor: colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
    },
    moreThumbnailsText: { color: colors.textSecondary, fontSize: 11, fontFamily: 'Geologica_700Bold' },

    summaryInfo: { alignItems: 'flex-end' },
    itemCountText: { fontSize: 10, fontFamily: 'Geologica_400Regular', color: colors.textMuted },
    totalPriceText: { fontSize: 14, fontFamily: 'Geologica_700Bold', color: '#7d50a0', marginTop: 2 },

    // Vendor Breakdown
    vendorStatusList: {
      marginTop: 6,
      borderTopWidth: 1,
      borderTopColor: colors.surface,
      paddingTop: 10,
      gap: 8,
    },
    vendorStatusRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    vendorStatusName: { fontSize: 11, fontFamily: 'Geologica_600SemiBold', color: colors.textSecondary, flex: 1 },

    // Badges (status colors are semantic/intentional — kept consistent across modes)
    statusBadge: {
      paddingHorizontal: 7,
      paddingVertical: 1.5,
      borderRadius: 5,
      borderWidth: 0.5,
    },
    statusBadgeText: {
      fontSize: 8,
      fontFamily: 'Geologica_700Bold',
      letterSpacing: 0.2,
    },

    statusBadge_Cancelled: { backgroundColor: isDark ? '#2d0c0c' : '#fef2f2', borderColor: isDark ? '#7f1d1d' : '#fee2e2' },
    statusBadgeText_Cancelled: { color: colors.error },

    statusBadge_Returned: { backgroundColor: isDark ? '#1c0d00' : '#fff7ed', borderColor: isDark ? '#7c2d12' : '#fed7aa' },
    statusBadgeText_Returned: { color: isDark ? '#fb923c' : '#ea580c' },

    statusBadge_Pending: { backgroundColor: isDark ? '#1c1600' : '#fffbeb', borderColor: isDark ? '#78350f' : '#fef3c7' },
    statusBadgeText_Pending: { color: colors.warning },

    statusBadge_Confirmed: { backgroundColor: isDark ? '#052e16' : '#ecfdf5', borderColor: isDark ? '#14532d' : '#d1fae5' },
    statusBadgeText_Confirmed: { color: colors.success },

    statusBadge_Shipped: { backgroundColor: isDark ? '#0c1f3d' : '#eff6ff', borderColor: isDark ? '#1e3a5f' : '#dbeafe' },
    statusBadgeText_Shipped: { color: colors.info },

    statusBadge_Delivered: { backgroundColor: isDark ? '#052e16' : '#f0fdf4', borderColor: isDark ? '#14532d' : '#dcfce7' },
    statusBadgeText_Delivered: { color: colors.success },
  });
}
