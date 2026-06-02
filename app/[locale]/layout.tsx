import React from 'react';
import { Metadata } from 'next';
import { Inter as FontSans, Lato, Nunito } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';
import { OrganizationStructuredData } from '@/components/structured-data';

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

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.betania.de';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Betania Ingolstadt',
    template: '%s | Betania Ingolstadt',
  },
  description:
    'Wir sind eine junge und moderne Gemeinde. Eine Gemeinde die voller Feuer und Liebe für den Herrn ist. Unser Herz schlägt für Jesus!',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: '/uploads/logos/betania-logo-bg.png',
    apple: '/uploads/logos/betania-logo-bg.png',
  },
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
      <head>
        <OrganizationStructuredData locale={locale} />
        <meta
          name="google-site-verification"
          content="kCDyDaB5jR0oqTh7YPgbrcPKYGuybnOBRosZp1j0NIc"
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to main content
        </a>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
        <TailwindIndicator />
        <SpeedInsights />
        <Analytics />
        <Toaster />
      </body>
    </html>
  );
}
