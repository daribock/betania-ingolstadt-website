import React from 'react';
import type { Metadata } from 'next';
import client from '@/tina/__generated__/client';
import Layout from '@/components/layout/layout';
import ClientPage from './[...urlSegments]/client-page';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

export const revalidate = 3600;
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://betania-ingolstadt.de';

  try {
    const data = await client.queries.page({
      relativePath: `${locale}/home.mdx`,
    });

    const page = data.data.page;
    const title = page.title || 'Betania Ingolstadt';
    const description = page.description || 'Betania Ingolstadt - Gemeinde';

    return {
      title,
      description,
      alternates: {
        canonical: `${siteUrl}/${locale}`,
        languages: {
          'de': `${siteUrl}/de`,
          'ro': `${siteUrl}/ro`,
        },
      },
      openGraph: {
        title,
        description,
        url: `${siteUrl}/${locale}`,
        siteName: 'Betania Ingolstadt',
        locale: locale,
        type: 'website',
      },
    };
  } catch {
    return {
      title: 'Betania Ingolstadt',
      description: 'Betania Ingolstadt - Gemeinde',
    };
  }
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  let data;

  try {
    data = await client.queries.page({
      relativePath: `${locale}/home.mdx`,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // Display not found
    notFound();
  }

  return (
    <Layout rawPageData={data}>
      <ClientPage {...data} />
    </Layout>
  );
}

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
