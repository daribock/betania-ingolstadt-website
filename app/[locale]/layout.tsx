import React from 'react';
import { Metadata } from 'next';
import { Inter as FontSans, Lato, Nunito } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';

import '@/styles.css';
import { TailwindIndicator } from '@/components/ui/breakpoint-indicator';

import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
});

const lato = Lato({
  subsets: ['latin'],
  variable: '--font-lato',
  weight: '400',
});

export const metadata: Metadata = {
  title: 'Betania Ingolstadt',
  description:
    'Wir sind eine junge und moderne Gemeinde. Eine Gemeinde die voller Feuer und Liebe für den Herrn ist. Unser Herz schlägt für Jesus!',
  icons: [{ url: '/uploads/logos/betania-logo-bg.png' }],
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html
      lang={locale}
      className={cn(fontSans.variable, nunito.variable, lato.variable)}
    >
      <body className="min-h-screen bg-background font-sans antialiased">
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
        <TailwindIndicator />
        <SpeedInsights />
        <Analytics />
        <Toaster />
      </body>
    </html>
  );
}
