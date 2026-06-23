import React from 'react';
import { View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { X, Grid, Laptop, Shirt, Home, Sparkles, Watch, Dumbbell } from 'lucide-react-native';
import { Typography, Button, StockFilter, useTheme } from '../../../shared';
import { useFilterViewModel } from '../viewmodels/useFilterViewModel';

const CATEGORY_ICONS: Record<string, any> = {
  All: Grid,
  Electronics: Laptop,
  Fashion: Shirt,
  Home: Home,
  Beauty: Sparkles,
  Accessories: Watch,
  Sports: Dumbbell,
};

export function FilterScreen() {
  const vm = useFilterViewModel();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { isDark, colors } = useTheme();

  const handleApply = () => {
    vm.applyFilters();
    router.back();
  };

  return (
    <SafeAreaView style={{ flex: 1 }} className="flex-1 bg-white dark:bg-slate-900" edges={['top']}>
      {/* Header */}
      <View className="px-4 py-3.5 flex-row justify-between items-center border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
        <TouchableOpacity onPress={() => router.back()} className="p-1">
          <X size={22} color={colors.text} />
        </TouchableOpacity>

        <Typography className="text-base font-geologica-bold text-slate-800 dark:text-slate-200">Filters</Typography>

        <TouchableOpacity onPress={vm.resetFilters} className="p-1">
          <Typography className="text-xs font-geologica-semibold text-brand-purple">Reset</Typography>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 py-5" showsVerticalScrollIndicator={false}>
        {/* Categories */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-3.5">
            <Typography className="text-slate-800 dark:text-slate-200 text-sm font-geologica-semibold">Categories</Typography>
            <TouchableOpacity>
              <Typography className="text-[10px] font-geologica-semibold text-brand-purple">See All</Typography>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row py-1">
            {vm.categories.map((cat) => {
              const isActive = vm.localCategory === cat;
              const IconComponent = CATEGORY_ICONS[cat] || Grid;
              return (
                <TouchableOpacity
                  key={cat}
                  onPress={() => vm.setLocalCategory(cat)}
                  className={`items-center justify-center w-20 h-20 rounded-2xl mr-3 border ${
                    isActive
                      ? 'bg-brand-purple/10 dark:bg-brand-purple/20 border-brand-purple'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700'
                  }`}
                  activeOpacity={0.7}
                >
                  <IconComponent size={20} color={isActive ? '#7d50a0' : (isDark ? '#cbd5e1' : '#64748b')} />
                  <Typography
                    className={`text-[10px] mt-1.5 text-center ${
                      isActive ? 'text-brand-purple font-geologica-semibold' : 'text-slate-500 dark:text-slate-400 font-geologica'
                    }`}
                  >
                    {cat}
                  </Typography>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Price Range */}
        <View className="mb-6">
          <Typography className="text-slate-800 dark:text-slate-200 text-sm font-geologica-semibold mb-3">Price Range</Typography>

          {/* Quick Price Pills */}
          <View className="flex-row flex-wrap gap-2 mb-4">
            {[
              { label: 'Any Price', min: '', max: '' },
              { label: `Under ${vm.currencySymbol}50`, min: '', max: '50' },
              { label: `${vm.currencySymbol}50 - ${vm.currencySymbol}150`, min: '50', max: '150' },
              { label: `${vm.currencySymbol}150 - ${vm.currencySymbol}300`, min: '150', max: '300' },
              { label: `${vm.currencySymbol}300+`, min: '300', max: '' },
            ].map((range) => {
              const isSelected = vm.localMinPrice === range.min && vm.localMaxPrice === range.max;
              return (
                <TouchableOpacity
                  key={range.label}
                  onPress={() => {
                    vm.setLocalMinPrice(range.min);
                    vm.setLocalMaxPrice(range.max);
                  }}
                  className={`px-3 py-1.5 rounded-full border ${
                    isSelected
                      ? 'bg-brand-purple/10 dark:bg-brand-purple/20 border-brand-purple'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700'
                  }`}
                  activeOpacity={0.7}
                >
                  <Typography
                    className={`text-[10px] font-geologica ${
                      isSelected ? 'text-brand-purple font-geologica-semibold' : 'text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {range.label}
                  </Typography>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Precise Min / Max Inputs */}
          <View className="flex-row items-center gap-3">
            <View className="flex-1 border border-slate-200 dark:border-slate-700 rounded-2xl px-3 py-2 bg-slate-50 dark:bg-slate-800 flex-row items-center">
              <Typography className="text-slate-400 dark:text-slate-500 mr-1.5 text-xs font-geologica">{vm.currencySymbol}</Typography>
              <TextInput
                className="flex-1 font-geologica text-slate-800 dark:text-slate-200 text-xs py-0"
                placeholder="Min"
                placeholderTextColor={colors.textMuted}
                keyboardType="numeric"
                value={vm.localMinPrice}
                onChangeText={vm.setLocalMinPrice}
              />
            </View>
            <Typography className="text-slate-400 dark:text-slate-600 font-geologica">-</Typography>
            <View className="flex-1 border border-slate-200 dark:border-slate-700 rounded-2xl px-3 py-2 bg-slate-50 dark:bg-slate-800 flex-row items-center">
              <Typography className="text-slate-400 dark:text-slate-500 mr-1.5 text-xs font-geologica">{vm.currencySymbol}</Typography>
              <TextInput
                className="flex-1 font-geologica text-slate-800 dark:text-slate-200 text-xs py-0"
                placeholder="Max"
                placeholderTextColor={colors.textMuted}
                keyboardType="numeric"
                value={vm.localMaxPrice}
                onChangeText={vm.setLocalMaxPrice}
              />
            </View>
          </View>
        </View>

        {/* Availability */}
        <View className="mb-8">
          <Typography className="text-slate-800 dark:text-slate-200 text-sm font-geologica-semibold mb-3">Availability</Typography>
          <View>
            {[
              { id: 'all', label: 'All Items' },
              { id: 'lowStock', label: 'Selling Fast (Low Stock)' },
            ].map((status) => {
              const isActive = vm.localStockStatus === status.id;
              return (
                <TouchableOpacity
                  key={status.id}
                  onPress={() => vm.setLocalStockStatus(status.id as StockFilter)}
                  className="flex-row items-center py-3 px-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl mb-2.5"
                  activeOpacity={0.8}
                >
                  <View className={`w-5 h-5 rounded-full border-2 mr-3 items-center justify-center ${isActive ? 'border-brand-purple' : 'border-slate-300 dark:border-slate-600'}`}>
                    {isActive && <View className="w-2.5 h-2.5 rounded-full bg-brand-purple" />}
                  </View>
                  <Typography className={`text-xs ${isActive ? 'text-slate-800 dark:text-slate-200 font-geologica-semibold' : 'text-slate-600 dark:text-slate-400 font-geologica'}`}>
                    {status.label}
                  </Typography>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View
        style={{ paddingBottom: Math.max(insets.bottom, 16) }}
        className="p-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900"
      >
        <Button
          title="Apply Filters"
          onPress={handleApply}
          className="w-full bg-brand-purple rounded-2xl py-3.5"
        />
      </View>
    </SafeAreaView>
  );
}
