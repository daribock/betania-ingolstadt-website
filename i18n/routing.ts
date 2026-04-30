import { defineRouting } from 'next-intl/routing';

const enabledLocales = process.env.NEXT_PUBLIC_ENABLED_LOCALES?.split(',') || ['de'];

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: enabledLocales,

  // Used when no locale matches
  defaultLocale: 'de',
});
