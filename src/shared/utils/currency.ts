import { Currency } from '../types';

export const EXCHANGE_RATES: Record<Currency, number> = {
  EUR: 1.0,
  USD: 1.08,
  GBP: 0.85,
};

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  EUR: '€',
  USD: '$',
  GBP: '£',
};

export function convertPrice(amount: number, to: Currency, from: Currency = 'EUR'): number {
  const baseAmount = from === 'EUR' ? amount : amount / EXCHANGE_RATES[from];
  return Math.round(baseAmount * EXCHANGE_RATES[to] * 100) / 100;
}

export function formatCurrency(amount: number, currency: Currency): string {
  const symbol = CURRENCY_SYMBOLS[currency];
  return `${symbol}${amount.toFixed(2)}`;
}

export function getDefaultCurrency(): Currency {
  try {
    // 1. Check system locale
    const locale = (typeof Intl !== 'undefined' && Intl.NumberFormat) 
      ? new Intl.NumberFormat().resolvedOptions().locale 
      : '';
    
    if (locale) {
      const lowerLocale = locale.toLowerCase();
      if (lowerLocale.includes('us') || lowerLocale.includes('ca')) {
        return 'USD';
      }
      if (lowerLocale.includes('gb') || lowerLocale.includes('uk')) {
        return 'GBP';
      }
      if (lowerLocale.includes('eu') || lowerLocale.includes('de') || lowerLocale.includes('fr') || lowerLocale.includes('it') || lowerLocale.includes('es')) {
        return 'EUR';
      }
    }

    // 2. Check timezone as fallback
    const tz = (typeof Intl !== 'undefined' && Intl.DateTimeFormat)
      ? Intl.DateTimeFormat().resolvedOptions().timeZone
      : '';
      
    if (tz) {
      const lowerTz = tz.toLowerCase();
      if (lowerTz.includes('london') || lowerTz.includes('europe/london') || lowerTz.includes('gb') || lowerTz.includes('europe/belfast')) {
        return 'GBP';
      }
      if (lowerTz.includes('america/') || lowerTz.includes('us/') || lowerTz.includes('canada/')) {
        return 'USD';
      }
    }
  } catch (e) {
    console.error('Error detecting default currency:', e);
  }

  // Fallback default
  return 'EUR';
}
