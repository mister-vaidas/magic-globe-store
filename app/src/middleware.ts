import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { defaultLocale, locales } from '../src/lib/i18n';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip files and paths that already include a locale
  if (
    pathname.startsWith('/_next') ||
    pathname.includes('.') ||
    locales.some((l) => pathname.startsWith(`/${l}/`) || pathname === `/${l}`)
  ) {
    return;
  }

  // Redirect root or non-localized path to default locale
  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
