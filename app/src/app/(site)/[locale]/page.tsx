import Link from 'next/link';
import { loadMessages } from '@/lib/messages';

export default async function Home({
  params,
}: {
  params: Promise<{ locale: 'en' | 'lt' }>;
}) {
  const { locale } = await params;
  const messages = await loadMessages(locale);

  return (
    <section className="px-4 py-10 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold sm:text-4xl">{messages['siteName']}</h1>
        <p className="mt-3 text-sm text-gray-600">{messages['banner.ship']}</p>

        <div className="mt-8 flex items-center gap-4">
          <Link
            href={`/${locale}/product/magic-adventures-globe`}
            className="inline-flex items-center rounded-lg border px-5 py-3 text-sm font-semibold hover:bg-gray-50"
          >
            {messages['cta.buy']}
          </Link>
        </div>
      </div>
    </section>
  );
}
