import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as SplashScreen from 'expo-splash-screen';
import { View, Platform, Appearance } from 'react-native';
import { useAppFonts } from '../shared';
// @ts-ignore
import '../../global.css';

if (Platform.OS !== 'web') {
  try {
    const { systemColorScheme } = require('react-native-css-interop/dist/runtime/native/appearance-observables');
    Appearance.setColorScheme = (scheme) => {
      systemColorScheme.set(scheme ?? 'light');
    };
  } catch (e) {
    console.warn('Failed to redirect Appearance.setColorScheme:', e);
  }
}

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  const { fontsLoaded, fontError } = useAppFonts();

  useEffect(() => {
    if (fontError) {
      console.error('Error loading fonts', fontError);
    }
  }, [fontError]);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View className="flex-1 bg-white dark:bg-slate-900">
      <QueryClientProvider client={queryClient}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="product/[id]" options={{ headerShown: false }} />
          <Stack.Screen name="filter" options={{ presentation: 'modal', headerShown: false }} />
          <Stack.Screen name="cart" options={{ headerShown: false }} />
          <Stack.Screen name="checkout" options={{ headerShown: false }} />
          <Stack.Screen name="order-success" options={{ headerShown: false, gestureEnabled: false }} />
          <Stack.Screen name="orders" options={{ headerShown: false }} />
          <Stack.Screen name="order/[id]" options={{ headerShown: false }} />
          <Stack.Screen name="order/[id]/cancel" options={{ headerShown: false }} />
          <Stack.Screen name="order/[id]/refund-result" options={{ headerShown: false, gestureEnabled: false }} />
        </Stack>
      </QueryClientProvider>
    </View>
  );
}
