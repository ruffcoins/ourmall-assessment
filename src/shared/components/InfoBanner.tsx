import React from 'react';
import { View } from 'react-native';
import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react-native';
import { Typography } from './Typography';

import { useTheme } from '../hooks';

interface InfoBannerProps {
  variant: 'green' | 'yellow' | 'red' | 'blue';
  title?: string;
  message: string;
}

export function InfoBanner({ variant, title, message }: InfoBannerProps) {
  const { isDark } = useTheme();
  let containerClasses = 'p-3 rounded-xl mb-4 border flex-row items-start gap-2.5';
  let titleClasses = 'font-geologica-semibold text-sm mb-1';
  let messageClasses = 'font-geologica text-xs leading-4';
  let Icon = Info;
  let iconColor = '#3b82f6';

  switch (variant) {
    case 'green':
      containerClasses += ' bg-green-50 border-green-200 dark:bg-emerald-950/20 dark:border-emerald-900/30';
      titleClasses += ' text-green-800 dark:text-emerald-400';
      messageClasses += ' text-green-700 dark:text-emerald-300/90';
      Icon = CheckCircle;
      iconColor = isDark ? '#34d399' : '#16a34a';
      break;
    case 'yellow':
      containerClasses += ' bg-yellow-50 border-yellow-200 dark:bg-amber-950/20 dark:border-amber-900/30';
      titleClasses += ' text-yellow-800 dark:text-amber-400';
      messageClasses += ' text-yellow-700 dark:text-amber-300/90';
      Icon = AlertTriangle;
      iconColor = isDark ? '#facc15' : '#ca8a04';
      break;
    case 'red':
      containerClasses += ' bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-900/30';
      titleClasses += ' text-red-800 dark:text-red-400';
      messageClasses += ' text-red-700 dark:text-red-300/90';
      Icon = AlertCircle;
      iconColor = isDark ? '#f87171' : '#dc2626';
      break;
    case 'blue':
      containerClasses += ' bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-900/30';
      titleClasses += ' text-blue-800 dark:text-blue-400';
      messageClasses += ' text-blue-700 dark:text-blue-300/90';
      Icon = Info;
      iconColor = isDark ? '#60a5fa' : '#2563eb';
      break;
  }

  return (
    <View className={containerClasses}>
      <View className="mt-0.5">
        <Icon size={16} color={iconColor} />
      </View>
      <View className="flex-1">
        {title && <Typography className={titleClasses}>{title}</Typography>}
        <Typography className={messageClasses}>{message}</Typography>
      </View>
    </View>
  );
}
