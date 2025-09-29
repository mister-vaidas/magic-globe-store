import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import { isLocale, locales } from '@/lib/i18n';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  return locales.map((l) => ({ locale: l }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params; // ✅ must await in Next 15
  if (!isLocale(locale)) notFound();

  // If you want messages for children later, load them here and pass via props/context.
  // For now, we keep it simple.

  return (
    <>
      <Header />
      <main className="min-h-[70dvh]">{children}</main>
      <Footer />
    </>
  );
}
