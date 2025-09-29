// app/src/app/layout.tsx
import '@/app/globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Smart Globe LT',
  description: 'LeapFrog Magic Adventures Globe — UK → LT shipping',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="lt">
      <body className="min-h-dvh bg-white text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
