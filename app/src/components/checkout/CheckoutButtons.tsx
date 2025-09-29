'use client';

import { useEffect, useRef, useState } from 'react';
// Official loader for the JS SDK
import { loadScript, type LoadScriptOptions } from '@paypal/paypal-js';

export default function CheckoutButtons({
  amount,
  currency = 'EUR',
  description,
  locale = 'lt',
}: {
  amount: number;
  currency?: 'EUR' | 'GBP' | 'USD';
  description: string;
  locale: 'lt' | 'en';
}) {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!clientId) {
      setError('Missing NEXT_PUBLIC_PAYPAL_CLIENT_ID');
      setLoading(false);
      return;
    }

    const opts: LoadScriptOptions = {
      'client-id': clientId,             // ← hyphenated key required by SDK
      currency,
      intent: 'capture',
      components: 'buttons',             // ← ensure Buttons are available
      // 'enable-funding': 'paylater',   // optional
    };

    let isMounted = true;

    loadScript(opts)
      .then((paypal) => {
        if (!isMounted) return;
        if (!paypal.Buttons) {
          setError('PayPal Buttons not available (script blocked?)');
          return;
        }

        // Render Buttons into our container
        const buttons = paypal.Buttons({
          style: { layout: 'vertical' },
          createOrder: (_data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: { value: amount.toFixed(2), currency_code: currency },
                  description,
                },
              ],
              application_context: {
                return_url: `${window.location.origin}/${locale}/success`,
                cancel_url: `${window.location.origin}/${locale}/product/magic-adventures-globe`,
                shipping_preference: 'NO_SHIPPING',
              },
            });
          },
          onApprove: async (_data, actions) => {
            const details = await actions.order?.capture();
            const orderId = details?.id ?? '';
            const total =
              details?.purchase_units?.[0]?.payments?.captures?.[0]?.amount?.value ??
              amount.toFixed(2);
            window.location.href = `/${locale}/success?orderId=${encodeURIComponent(
              orderId
            )}&total=${encodeURIComponent(total)}`;
          },
          onError: (err) => {
            console.error('PayPal error:', err);
            setError(
              locale === 'lt'
                ? 'Mokėjimo klaida. Pabandykite dar kartą.'
                : 'Payment error. Please try again.'
            );
          },
        });

        if (containerRef.current) {
          buttons.render(containerRef.current);
        }
      })
      .catch((e) => {
        console.error('PayPal SDK load failed:', e);
        setError('Failed to load PayPal. Check ad blockers and client ID.');
      })
      .finally(() => setLoading(false));

    return () => {
      isMounted = false;
    };
  }, [clientId, currency, amount, description, locale]);

  if (error) {
    return (
      <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
        {error}
      </div>
    );
  }

  return (
    <div>
      {loading && (
        <div className="mb-2 text-sm text-gray-500">
          {locale === 'lt' ? 'Įkeliama mokėjimo sistema…' : 'Loading payment…'}
        </div>
      )}
      <div ref={containerRef} id="paypal-buttons-container" />
    </div>
  );
}
