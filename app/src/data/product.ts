// app/src/data/product.ts
export const PRODUCT = {
  slug: 'magic-adventures-globe',
  title: {
    en: 'LeapFrog Magic Adventures Globe',
    lt: 'LeapFrog Magiškas Nuotykių Gaublys',
  },
  priceEUR: 139.0,        // set your retail price
  currency: 'EUR',
  shipping: {
    en: 'Ships from UK to Lithuania in 4–7 business days.',
    lt: 'Siunčiame iš JK į Lietuvą per 4–7 darbo dienas.',
    flatFeeEUR: 7,
  },
  bullets: {
    en: [
      'Interactive AR adventures',
      'Hundreds of facts about countries & cultures',
      'Built-in learning games',
    ],
    lt: [
      'Interaktyvūs AR nuotykiai',
      'Šimtai faktų apie šalis ir kultūras',
      'Integruoti mokomieji žaidimai',
    ],
  },
  images: [
    { src: '/globe.svg', alt: { en: 'Magic Adventures Globe', lt: 'Magiškas nuotykių gaublys' } },
  ],
} as const;

export type LocaleKey = keyof typeof PRODUCT.title; // 'en' | 'lt'
