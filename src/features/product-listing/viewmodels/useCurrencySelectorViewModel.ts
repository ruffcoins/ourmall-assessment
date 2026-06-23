import { Currency, useStore } from '../../../shared';

const SUPPORTED_CURRENCIES: Currency[] = ['EUR', 'USD', 'GBP'];

export function useCurrencySelectorViewModel() {
  const { activeCurrency, setCurrency } = useStore();

  return {
    activeCurrency,
    currencies: SUPPORTED_CURRENCIES,
    selectCurrency: setCurrency,
  };
}
