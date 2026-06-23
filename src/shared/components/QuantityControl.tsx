import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Typography } from './Typography';
import { Minus, Plus } from 'lucide-react-native';

import { useTheme } from '../hooks';

interface QuantityControlProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  maxQuantity?: number;
  minQuantity?: number;
}

export function QuantityControl({ 
  quantity, 
  onIncrease, 
  onDecrease, 
  maxQuantity, 
  minQuantity = 1 
}: QuantityControlProps) {
  const { isDark } = useTheme();
  const isAtMin = quantity <= minQuantity;
  const isAtMax = maxQuantity !== undefined && quantity >= maxQuantity;

  const activeColor = isDark ? '#cbd5e1' : '#1f2937';
  const disabledColor = isDark ? '#475569' : '#9ca3af';

  return (
    <View className="flex-row items-center bg-gray-100 dark:bg-slate-800 rounded-lg p-1">
      <TouchableOpacity 
        onPress={onDecrease}
        disabled={isAtMin}
        className={`p-2 rounded-md ${isAtMin ? 'opacity-50' : 'bg-white dark:bg-slate-700 shadow-sm'}`}
      >
        <Minus size={16} color={isAtMin ? disabledColor : activeColor} />
      </TouchableOpacity>
      
      <Typography className="px-4 font-geologica-semibold text-base text-slate-800 dark:text-slate-200">
        {quantity}
      </Typography>

      <TouchableOpacity 
        onPress={onIncrease}
        disabled={isAtMax}
        className={`p-2 rounded-md ${isAtMax ? 'opacity-50' : 'bg-white dark:bg-slate-700 shadow-sm'}`}
      >
        <Plus size={16} color={isAtMax ? disabledColor : activeColor} />
      </TouchableOpacity>
    </View>
  );
}
