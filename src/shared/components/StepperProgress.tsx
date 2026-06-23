import React from 'react';
import { View } from 'react-native';
import { Typography } from './Typography';
import { ItemStatus } from '../types';

interface StepperProgressProps {
  status: ItemStatus;
}

export function StepperProgress({ status }: StepperProgressProps) {
  const steps: ItemStatus[] = ['Pending', 'Confirmed', 'Shipped', 'Delivered'];

  if (status === 'Cancelled' || status === 'Returned') {
    const isReturn = status === 'Returned';
    return (
      <View className="flex-row items-center py-4">
        <View className={`${isReturn ? 'bg-orange-50 border border-orange-100 dark:bg-orange-950/20 dark:border-orange-900/30' : 'bg-red-100 dark:bg-red-950/20'} px-3 py-1 rounded-full`}>
          <Typography className={`${isReturn ? 'text-orange-600 dark:text-orange-400' : 'text-red-600 dark:text-red-400'} text-xs font-geologica-medium`}>
            {isReturn ? 'Returned' : 'Cancelled'}
          </Typography>
        </View>
      </View>
    );
  }

  const currentIndex = steps.indexOf(status);

  return (
    <View className="flex-row items-center justify-between py-4 w-full">
      {steps.map((step, index) => {
        const isCompleted = index <= currentIndex;
        const isLast = index === steps.length - 1;

        return (
          <React.Fragment key={step}>
            <View className="items-center flex-1">
              <View
                className={`w-6 h-6 rounded-full items-center justify-center border-2 ${isCompleted ? 'border-brand-purple bg-brand-purple' : 'border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800'
                  }`}
              >
                {isCompleted && (
                  <View className="w-2 h-2 rounded-full bg-white" />
                )}
              </View>
              <Typography
                className={`text-[6px] mt-1 text-center font-geologica-light ${isCompleted ? 'text-brand-purple' : 'text-gray-400 dark:text-slate-500'
                  }`}
              >
                {step}
              </Typography>
            </View>
            {!isLast && (
              <View
                className={`flex-1 h-[2px] -mt-4 mx-1 ${index < currentIndex ? 'bg-brand-purple' : 'bg-gray-200 dark:bg-slate-700'
                  }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </View>
  );
}
