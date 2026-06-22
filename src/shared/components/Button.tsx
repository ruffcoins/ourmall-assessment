import React from 'react';
import { TouchableOpacity, ActivityIndicator, TouchableOpacityProps } from 'react-native';
import { Typography } from './Typography';

interface ButtonProps extends TouchableOpacityProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  textClassName?: string;
  title: string;
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  title,
  className = '',
  textClassName = '',
  ...props
}: ButtonProps) {
  let buttonClasses = 'rounded-xl items-center justify-center flex-row';
  let textClasses = 'font-geologica-medium';

  switch (variant) {
    case 'secondary':
      buttonClasses += ' bg-brand-purple';
      textClasses += ' text-white';
      break;
    case 'outline':
      buttonClasses += ' border border-brand-purple bg-transparent';
      textClasses += ' text-brand-purple';
      break;
    case 'danger':
      buttonClasses += ' bg-red-500';
      textClasses += ' text-white';
      break;
    case 'primary':
    default:
      buttonClasses += ' bg-brand-orange';
      textClasses += ' text-white';
      break;
  }

  switch (size) {
    case 'sm':
      buttonClasses += ' px-3 py-2';
      textClasses += ' text-xs';
      break;
    case 'lg':
      buttonClasses += ' px-6 py-4';
      textClasses += ' text-base';
      break;
    case 'md':
    default:
      buttonClasses += ' px-4 py-3';
      textClasses += ' text-sm';
      break;
  }

  const isButtonDisabled = disabled || isLoading;
  if (isButtonDisabled) {
    buttonClasses += ' opacity-50';
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={isButtonDisabled}
      className={`${buttonClasses} ${className}`}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'outline' ? '#7d50a0' : '#ffffff'} 
        />
      ) : (
        <Typography className={`${textClasses} ${textClassName}`}>
          {title}
        </Typography>
      )}
    </TouchableOpacity>
  );
}
