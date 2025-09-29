'use client';

import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import { locales, Locale } from '@/lib/i18n';

function replaceLocaleInPath(path: string, current: string, next: string) {
  // paths look like /{locale}/...  -> swap first segment
  const parts = path.split('/');
  parts[1] = next;
  return parts.join('/') || `/${next}`;
}

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const params = useParams<{ locale: string }>();
  const current = (params?.locale as Locale) || 'lt';

  return (
    <div className="flex items-center gap-2">
      {locales.map((l) => {
        const href = replaceLocaleInPath(pathname, current, l);
        const isActive = l === current;
        return (
          <Link
            key={l}
            href={href}
            className={`text-xs uppercase tracking-wide ${isActive ? 'font-semibold' : 'text-gray-500 hover:text-gray-800'}`}
            aria-current={isActive ? 'page' : undefined}
          >
            {l}
          </Link>
        );
      })}
    </div>
  );
}
