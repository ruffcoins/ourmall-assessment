import React, { useEffect, useRef } from 'react';
import { Animated, View, TouchableOpacity } from 'react-native';
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-react-native';
import { Typography } from './Typography';
import { useTheme } from '../hooks';
import { Toast as ToastType, useToastStore } from '../store/useToastStore';

export function Toast({ id, message, type }: ToastType) {
  const { isDark, colors } = useTheme();
  const { hideToast } = useToastStore();
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleDismiss = () => {
    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: -15,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      hideToast(id);
    });
  };

  let Icon = Info;
  let iconColor = '#3b82f6';
  let borderClasses = 'border border-blue-200 dark:border-blue-900/30';
  let bgClasses = 'bg-blue-50/95 dark:bg-blue-950/90';
  let textClasses = 'text-blue-800 dark:text-blue-300';

  switch (type) {
    case 'success':
      Icon = CheckCircle;
      iconColor = isDark ? '#34d399' : '#16a34a';
      borderClasses = 'border border-green-200 dark:border-emerald-900/30';
      bgClasses = 'bg-green-50/95 dark:bg-emerald-950/90';
      textClasses = 'text-green-800 dark:text-emerald-300';
      break;
    case 'error':
      Icon = AlertCircle;
      iconColor = isDark ? '#f87171' : '#dc2626';
      borderClasses = 'border border-red-200 dark:border-red-900/30';
      bgClasses = 'bg-red-50/95 dark:bg-red-950/90';
      textClasses = 'text-red-800 dark:text-red-300';
      break;
    case 'warning':
      Icon = AlertTriangle;
      iconColor = isDark ? '#facc15' : '#ca8a04';
      borderClasses = 'border border-yellow-200 dark:border-amber-900/30';
      bgClasses = 'bg-yellow-50/95 dark:bg-amber-950/90';
      textClasses = 'text-yellow-800 dark:text-amber-300';
      break;
  }

  return (
    <Animated.View
      style={{
        opacity: opacityAnim,
        transform: [{ translateY: slideAnim }],
      }}
      className={`w-full p-4 rounded-2xl flex-row items-center justify-between shadow-lg mb-3 ${borderClasses} ${bgClasses}`}
    >
      <View className="flex-row items-center flex-1 pr-4">
        <Icon size={18} color={iconColor} className="mr-3" />
        <Typography className={`text-xs font-geologica-medium flex-1 ${textClasses}`}>
          {message}
        </Typography>
      </View>
      <TouchableOpacity onPress={handleDismiss} className="p-1">
        <X size={14} color={isDark ? colors.textSecondary : colors.textMuted} />
      </TouchableOpacity>
    </Animated.View>
  );
}
