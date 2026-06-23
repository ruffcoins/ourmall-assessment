import { useRef, useState, useEffect } from 'react';
import { Animated } from 'react-native';
import { useStore } from '../../../shared';

export function useHomeViewModel() {
  const { cartItems, filter, setFilter, hasShownSplash, setHasShownSplash } = useStore();

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const [showSplash, setShowSplash] = useState(!hasShownSplash);
  const splashOpacity = useRef(new Animated.Value(hasShownSplash ? 0 : 1)).current;

  useEffect(() => {
    if (hasShownSplash) return;

    const timer = setTimeout(() => {
      Animated.timing(splashOpacity, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }).start(() => {
        setShowSplash(false);
        setHasShownSplash(true);
      });
    }, 1500);

    return () => clearTimeout(timer);
  }, [hasShownSplash]);

  return {
    cartCount,
    filter,
    setFilter,
    showSplash,
    splashOpacity,
  };
}
