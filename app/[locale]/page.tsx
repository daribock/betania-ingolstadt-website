import React from 'react';
import type { Metadata } from 'next';
import client from '@/tina/__generated__/client';
import Layout from '@/components/layout/layout';
import ClientPage from './[...urlSegments]/client-page';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { SeoField } from '@/lib/types/seo';

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
    const [data, globalSharedData] = await Promise.all([
      client.queries.page({
        relativePath: `${locale}/home.mdx`,
      }),
      client.queries.globalShared({
        relativePath: 'index.json',
      }),
    ]);

    const page = data.data.page;
    const globalSeo = globalSharedData.data.globalShared?.seo;
    const title = page.seo?.title || globalSeo?.title || 'Betania Ingolstadt';
    const description =
      page.seo?.description ||
      globalSeo?.description ||
      'Betania Ingolstadt - Gemeinde';
    const ogImage = (page.seo as SeoField)?.ogImage || globalSeo?.ogImage;

    return {
      title,
      description,
      alternates: {
        canonical: `${siteUrl}/${locale}`,
        languages: {
          'de': `${siteUrl}/de`,
          'ro': `${siteUrl}/ro`,
          'x-default': `${siteUrl}/de`,
        },
      },
      openGraph: {
        title,
        description,
        url: `${siteUrl}/${locale}`,
        siteName: 'Betania Ingolstadt',
        locale: locale,
        type: 'website',
        ...(ogImage && { images: [{ url: ogImage }] }),
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        ...(ogImage && { images: [ogImage] }),
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
