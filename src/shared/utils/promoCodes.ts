export const PROMO_CODES = {
  WELCOME10: {
    code: 'WELCOME10',
    discountPercent: 10,
  },
} as const;

export type PromoCode = keyof typeof PROMO_CODES;
