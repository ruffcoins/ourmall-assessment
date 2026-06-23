import React, { useState } from 'react';
import { View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Typography, CURRENCY_SYMBOLS, useTheme } from '../../../shared';
import { ChevronDown, Check } from 'lucide-react-native';
import { useCurrencySelectorViewModel } from '../viewmodels/useCurrencySelectorViewModel';

export function CurrencySelector() {
  const { activeCurrency, currencies, selectCurrency } = useCurrencySelectorViewModel();
  const [isOpen, setIsOpen] = useState(false);
  const { colors } = useTheme();

  const handleSelect = (currency: any) => {
    selectCurrency(currency);
    setIsOpen(false);
  };

  return (
    <View className="relative z-50">
      {/* Dropdown Button */}
      <TouchableOpacity
        onPress={() => setIsOpen(!isOpen)}
        className="flex-row items-center bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700"
        activeOpacity={0.8}
      >
        <Typography variant="subtitle" className="text-xs font-geologica-medium mr-1 text-slate-700 dark:text-slate-200">
          {activeCurrency} ({CURRENCY_SYMBOLS[activeCurrency]})
        </Typography>
        <ChevronDown size={14} color={colors.textSecondary} />
      </TouchableOpacity>

      {/* Floating Menu */}
      {isOpen && (
        <>
          {/* Backdrop to close dropdown when tapping outside */}
          <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
            <View className="absolute -top-[1000px] -bottom-[1000px] -left-[1000px] -right-[1000px] bg-transparent" />
          </TouchableWithoutFeedback>

          <View className="absolute right-0 top-10 w-28 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-lg p-1 z-50">
            {currencies.map((currency) => {
              const isActive = activeCurrency === currency;
              return (
                <TouchableOpacity
                  key={currency}
                  onPress={() => handleSelect(currency)}
                  className={`flex-row items-center justify-between px-3 py-2 rounded-lg ${
                    isActive ? 'bg-slate-50 dark:bg-slate-700' : 'bg-transparent'
                  }`}
                  activeOpacity={0.7}
                >
                  <Typography
                    variant="body"
                    className={`text-xs ${isActive ? 'font-geologica-semibold text-brand-purple' : 'text-slate-600 dark:text-slate-300'}`}
                  >
                    {currency} ({CURRENCY_SYMBOLS[currency]})
                  </Typography>
                  {isActive && <Check size={12} color="#7d50a0" />}
                </TouchableOpacity>
              );
            })}
          </View>
        </>
      )}
    </View>
  );
}

