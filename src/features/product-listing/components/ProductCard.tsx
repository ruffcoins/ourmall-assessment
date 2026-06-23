import React from 'react';
import { View, Image, TouchableOpacity, Animated } from 'react-native';
import type { Product } from '../../../shared';
import { Typography, useStore, useTheme } from '../../../shared';
import { useProductCardViewModel } from '../viewmodels/useProductCardViewModel';
import { ShoppingCart } from 'lucide-react-native';

interface ProductCardProps {
  product: Product;
  onPress?: () => void;
}

const PulseDot = () => {
  const opacity = React.useRef(new Animated.Value(0.4)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.4,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return <Animated.View style={{ opacity }} className="w-2 h-2 rounded-full bg-brand-orange" />;
};

export function ProductCard({ product, onPress }: ProductCardProps) {
  const vm = useProductCardViewModel(product);
  const { addToCart } = useStore();
  const { isDark } = useTheme();

  const discountPercent = product.discount
    ? (product.discount.type === 'percentage'
      ? product.discount.value
      : Math.round((product.discount.value / product.basePrice) * 100))
    : 0;

  const handleAddToCart = () => {
    addToCart({
      product,
      quantity: 1,
      addedAtPrice: vm.price,
    });
  };

  return (
    <TouchableOpacity
      className="flex-1 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl overflow-hidden mb-3"
      onPress={onPress}
      activeOpacity={0.85}
      style={{
        shadowColor: '#7d50a0',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: isDark ? 0.18 : 0.04,
        shadowRadius: 10,
        elevation: 2,
      }}
    >
      {/* Image Container */}
      <View className="w-full aspect-square bg-slate-50 dark:bg-slate-900 relative">
        <Image
          source={{ uri: vm.imageUrl }}
          className="w-full h-full"
          style={vm.isOutOfStock ? { opacity: 0.6 } : undefined}
          resizeMode="cover"
        />

        {/* Left Side: Discount Percentage Badge */}
        {vm.isDiscounted && discountPercent > 0 && !vm.isOutOfStock && (
          <View className="bg-red-500 px-1.5 py-0.5 rounded-lg absolute top-2 left-2 z-10">
            <Typography className="text-white text-[9px] font-geologica-bold">
              -{discountPercent}%
            </Typography>
          </View>
        )}

        {/* Right Side: Countdown Timer Badge */}
        {vm.isDiscounted && vm.formattedTime && !vm.isOutOfStock ? (
          <View className="bg-white/95 dark:bg-slate-900/95 px-1.5 py-0.5 rounded-lg absolute top-2 right-2 z-10 border border-slate-100 dark:border-slate-800">
            <Typography className="text-red-500 text-[9px] font-geologica-bold">
              {vm.formattedTime}
            </Typography>
          </View>
        ) : null}

        {/* Bottom Overlay Badges (Scarcity / Out of Stock indicators) */}
        {vm.isOutOfStock && (
          <View className="bg-slate-900/80 dark:bg-slate-950/80 px-2 py-1 rounded-lg absolute bottom-2 left-2 z-10">
            <Typography className="text-white text-[8px] font-geologica-bold uppercase tracking-wider">
              SOLD OUT
            </Typography>
          </View>
        )}
        {!vm.isOutOfStock && vm.isLowStock && (
          <View className="bg-brand-orange px-2 py-1 rounded-lg absolute bottom-2 left-2 z-10">
            <Typography className="text-white text-[8px] font-geologica-bold uppercase tracking-wider">
              ONLY {product.stockCount} LEFT
            </Typography>
          </View>
        )}
      </View>

      {/* Info Container */}
      <View className="p-3 flex-1">
        {/* Category & Stock Status */}
        <View className="flex-row items-center justify-between mb-1.5">
          <Typography
            className="text-slate-400 dark:text-slate-500 text-[9px] font-geologica-semibold uppercase tracking-wider"
            numberOfLines={1}
          >
            {vm.category}
          </Typography>
          
          {vm.isOutOfStock ? (
            <Typography className="text-slate-400 dark:text-slate-500 text-[9px] font-geologica-bold">
              Sold Out
            </Typography>
          ) : vm.isLowStock ? (
            <View className="flex-row items-center gap-1">
              <Typography className="text-brand-orange text-[9px] font-geologica-bold">
                Selling Fast
              </Typography>
              <PulseDot />
            </View>
          ) : (
            <View className="w-2 h-2 rounded-full bg-emerald-500" />
          )}
        </View>

        <Typography
          className="text-slate-900 dark:text-slate-100 text-[15px] font-geologica-semibold leading-tight mb-0.5"
          numberOfLines={2}
        >
          {vm.name}
        </Typography>

        <Typography
          className="text-slate-400 dark:text-slate-500 text-[9px] font-geologica-light mb-3"
          numberOfLines={1}
        >
          by {vm.vendorName}
        </Typography>

        {/* Price & Cart Row (pushes to bottom) */}
        <View className="flex-row items-end justify-between mt-auto pt-1">
          <View className="flex-1 mr-2">
            {vm.isDiscounted && vm.originalPriceText && (
              <Typography className="text-slate-400 dark:text-slate-500 font-geologica-black text-[9px] line-through mb-0.5">
                {vm.originalPriceText}
              </Typography>
            )}
            <Typography
              className="text-brand-purple font-geologica-semibold text-[17px] leading-5"
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              {vm.priceText}
            </Typography>
          </View>

          <TouchableOpacity
            onPress={vm.isOutOfStock ? undefined : handleAddToCart}
            disabled={vm.isOutOfStock}
            className={`w-8 h-8 rounded-xl items-center justify-center shadow-sm ${
              vm.isOutOfStock ? 'bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800' : 'bg-brand-purple'
            }`}
            activeOpacity={0.7}
          >
            <ShoppingCart size={14} color={vm.isOutOfStock ? (isDark ? '#475569' : '#94a3b8') : '#ffffff'} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

