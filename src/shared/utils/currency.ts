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
