import { defineRouting } from 'next-intl/routing';

const enabledLocales = process.env.ENABLED_LOCALES?.split(',') || ['de'];

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: enabledLocales,

  // Used when no locale matches
  defaultLocale: 'de',
});
