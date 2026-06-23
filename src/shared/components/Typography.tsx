import React from 'react';
import { Text, TextProps } from 'react-native';

interface TypographyProps extends TextProps {
  variant?: 'h1' | 'h2' | 'subtitle' | 'body' | 'caption';
  className?: string;
}

export function Typography({ 
  variant = 'body', 
  className = '', 
  children, 
  ...props 
}: TypographyProps) {
  let styleClasses = '';
  
  switch (variant) {
    case 'h1':
      styleClasses = 'font-geologica-bold text-2xl text-slate-900 dark:text-slate-100';
      break;
    case 'h2':
      styleClasses = 'font-geologica-bold text-lg text-slate-800 dark:text-slate-200';
      break;
    case 'subtitle':
      styleClasses = 'font-geologica-medium text-sm text-slate-700 dark:text-slate-300';
      break;
    case 'caption':
      styleClasses = 'font-geologica-light text-xs text-brand-grey dark:text-slate-400';
      break;
    case 'body':
    default:
      styleClasses = 'font-geologica-light text-sm text-slate-600 dark:text-slate-300';
      break;
  }

  return (
    <Text className={`${styleClasses} ${className}`} {...props}>
      {children}
    </Text>
  );
}
