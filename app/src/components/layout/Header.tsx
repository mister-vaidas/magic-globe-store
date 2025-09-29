import Link from 'next/link';
import LanguageSwitcher from '@/components/common/LanguageSwitcher';

export default function Header() {
  const locale = 'lt'; // simple default; LanguageSwitcher swaps URLs anyway

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href={`/${locale}`} className="text-base font-bold">Smart Globe LT</Link>
        <nav className="hidden gap-6 text-sm sm:flex">
          <Link href={`/${locale}`} className="hover:text-gray-700">Pradžia</Link>
          <Link href={`/${locale}/product/magic-adventures-globe`} className="hover:text-gray-700">Prekė</Link>
        </nav>
        <LanguageSwitcher />
      </div>
    </header>
  );
}
