import Image from "next/image";
import Link from "next/link";
import { PRODUCT, LocaleKey } from "@/data/product";
import { loadMessages } from "@/lib/messages";
import CheckoutButtons from "@/components/checkout/CheckoutButtons";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: LocaleKey }>;
}) {
  const { locale } = await params;
  const messages = await loadMessages(locale);

  const title = PRODUCT.title[locale];
  const img = PRODUCT.images[0];
  const bullets = PRODUCT.bullets[locale];
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
            width={800}
            height={800}
            className="h-auto w-full"
            priority
          />
        </div>

        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
          <p className="mt-2 text-sm text-gray-600">
            {locale === "lt" ? PRODUCT.shipping.lt : PRODUCT.shipping.en}
          </p>

          <ul className="mt-6 space-y-2 text-sm text-gray-800">
            {bullets.map((b, i) => (
              <li key={i} className="flex gap-2">
                <span>•</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-lg border p-4">
            <div className="flex items-center justify-between text-sm">
              <span>Subtotal</span>
              <span>€{subtotal.toFixed(2)}</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm">
              <span>Shipping</span>
              <span>€{shipping.toFixed(2)}</span>
            </div>
            <div className="mt-3 border-t pt-3 flex items-center justify-between font-semibold">
              <span>Total</span>
              <span>€{total}</span>
            </div>

            <CheckoutButtons
              amount={subtotal + shipping}
              currency="EUR"
              description={title}
              locale={locale}
            />

            <div className="mt-3 text-center">
              <Link
                href={`/${locale}`}
                className="text-sm text-gray-600 underline"
              >
                ← {locale === "lt" ? "Grįžti" : "Back"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
