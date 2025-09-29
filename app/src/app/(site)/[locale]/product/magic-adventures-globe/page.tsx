import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { PRODUCT } from '@/data/product';

type Props = { params: { locale: 'en' | 'lt' } };

export default async function ProductPage({ params: { locale } }: Props) {
  const t = await getTranslations('common');
  const title = PRODUCT.title[locale];
  const img = PRODUCT.images[0];

  const subtotal = PRODUCT.priceEUR;
  const shipping = PRODUCT.shipping.flatFeeEUR;
  const total = (subtotal + shipping).toFixed(2);

  return (
    <section className="px-4 py-10 sm:py-16">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
        <div className="rounded-lg border p-4">
          <Image
            src={img.src}
            alt={img.alt[locale]}
            width={600}
            height={600}
            className="h-auto w-full"
            priority
          />
        </div>

        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
          <p className="mt-2 text-sm text-gray-600">
            {locale === 'lt' ? PRODUCT.shipping.lt : PRODUCT.shipping.en}
          </p>

          <ul className="mt-6 space-y-2 text-sm text-gray-800">
            {(PRODUCT.bullets[locale] || []).map((b, i) => (
              <li key={i} className="flex gap-2">
                <span>•</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-lg border p-4">
            <div className="flex items-center justify-between text-sm">
              <span>Subtotal</span>
              <span>
                €{subtotal.toFixed(2)}
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm">
              <span>Shipping</span>
              <span>€{shipping.toFixed(2)}</span>
            </div>
            <div className="mt-3 border-t pt-3 flex items-center justify-between font-semibold">
              <span>Total</span>
              <span>€{total}</span>
            </div>

            {/* Placeholder Buy button — will wire PayPal next */}
            <a
              href="#checkout"
              className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-black px-5 py-3 text-white"
            >
              {t('cta.buy')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
