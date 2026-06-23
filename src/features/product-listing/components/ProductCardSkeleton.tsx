import React, { useEffect, useRef } from 'react';
import { Animated, View, ViewStyle } from 'react-native';
import { useTheme } from '../../../shared';

interface SkeletonProps {
  style?: ViewStyle | ViewStyle[];
  className?: string;
}

export function Skeleton({ style, className }: SkeletonProps) {
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const pulse = Animated.loop(
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
    );
    pulse.start();
    return () => pulse.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[{ opacity }, style]}
      className={`bg-slate-200 dark:bg-slate-700 ${className || ''}`}
    />
  );
}

export function ProductCardSkeleton() {
  const { isDark } = useTheme();

  return (
    <View 
      className="flex-1 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl overflow-hidden mb-3"
      style={{
        shadowColor: '#7d50a0',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: isDark ? 0.18 : 0.04,
        shadowRadius: 10,
        elevation: 2,
      }}
    >
      {/* Image container skeleton */}
      <View className="w-full aspect-square bg-slate-50 dark:bg-slate-900 relative">
        <Skeleton className="w-full h-full" />
      </View>

      {/* Info Container */}
      <View className="p-3 relative pb-12">
        {/* Category */}
        <Skeleton className="w-16 h-2.5 mb-2 rounded" />
        {/* Title */}
        <Skeleton className="w-full h-3.5 mb-1.5 rounded" />
        <Skeleton className="w-2/3 h-3.5 mb-2.5 rounded" />
        {/* Vendor */}
        <Skeleton className="w-24 h-2.5 mb-3 rounded" />
        
        {/* Price */}
        <View className="flex-row items-baseline gap-1.5 mb-2.5">
          <Skeleton className="w-16 h-5 rounded" />
        </View>

        {/* Stock Status */}
        <View className="flex-row items-center mt-1.5">
          <Skeleton className="w-1.5 h-1.5 rounded-full mr-1.5" />
          <Skeleton className="w-20 h-2.5 rounded" />
        </View>

        {/* Cart Button skeleton */}
        <Skeleton className="w-7 h-7 rounded-lg absolute bottom-2 right-2 z-20" />
      </View>
    </View>
  );
}
