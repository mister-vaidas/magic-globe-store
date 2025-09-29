import Link from 'next/link';
import { loadMessages } from '@/lib/messages';

export default async function SuccessPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: 'lt' | 'en' }>;
  searchParams: Promise<{ orderId?: string; total?: string }>;
}) {
  const { locale } = await params;
  const { orderId = '', total = '' } = await searchParams;
  const t = await loadMessages(locale);

  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-2xl rounded-xl border p-6">
        <h1 className="text-2xl font-bold">
          {locale === 'lt' ? 'Ačiū! Jūsų užsakymas gautas.' : 'Thank you! Your order has been received.'}
        </h1>

        <p className="mt-2 text-sm text-gray-600">
          {locale === 'lt'
            ? 'Užsakymo patvirtinimas išsiųstas el. paštu (jei pateikėte).'
            : 'An order confirmation has been sent to your email (if provided).'}
        </p>

        <div className="mt-6 space-y-1 text-sm">
          {orderId && (
            <div className="flex items-center justify-between">
              <span>{locale === 'lt' ? 'Užsakymo ID' : 'Order ID'}</span>
              <span className="font-mono">{orderId}</span>
            </div>
          )}
          {total && (
            <div className="flex items-center justify-between">
              <span>{locale === 'lt' ? 'Suma' : 'Total'}</span>
              <span className="font-semibold">€{total}</span>
            </div>
          )}
        </div>

        <p className="mt-6 text-sm text-gray-700">
          {locale === 'lt'
            ? 'Siunčiame iš JK į Lietuvą per 4–7 darbo dienas. Pristatymo informaciją atsiųsime el. paštu.'
            : 'We ship from the UK to Lithuania in 4–7 business days. Tracking info will be emailed.'}
        </p>

        <div className="mt-8 flex gap-3">
          <Link
            href={`/${locale}/product/magic-adventures-globe`}
            className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-50"
          >
            {locale === 'lt' ? 'Atgal į prekę' : 'Back to product'}
          </Link>
          <Link
            href={`/${locale}`}
            className="rounded-lg bg-black px-4 py-2 text-sm text-white hover:opacity-90"
          >
            {locale === 'lt' ? 'Į pradžią' : 'Go home'}
          </Link>
        </div>
      </div>
    </section>
  );
}
