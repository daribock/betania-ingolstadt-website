export const i18n = {
  defaultLocale: 'de',
  locales: ['de', 'ro'],
};

export type Locale = (typeof i18n)['locales'][number];
