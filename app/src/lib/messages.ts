// app/src/lib/messages.ts
export type SupportedLocale = 'en' | 'lt';

export async function loadMessages(locale: SupportedLocale) {
  // from app/src/lib -> ../../locales -> app/locales
  const mod = (await import(`../../locales/${locale}/common.json`)) as {
    default: Record<string, string>;
  };
  return mod.default;
}
