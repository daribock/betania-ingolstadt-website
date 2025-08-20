import { useLocale, useTranslations } from 'next-intl';
import { routing } from '@/i18n/routing';
import LocaleSwitcherSelect from './locale-switcher-select';

interface LocaleSwitcherProps {
  className?: string;
}

export default function LocaleSwitcher({ className }: LocaleSwitcherProps) {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect
      className={className}
      defaultValue={locale}
      label={t('label')}
      options={routing.locales.map((locale) => ({
        key: locale,
        value: locale,
        label: t('locale', { locale: locale }),
      }))}
    ></LocaleSwitcherSelect>
  );
}
