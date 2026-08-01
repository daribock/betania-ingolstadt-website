import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import client from '@/tina/__generated__/client';
import Layout from '@/components/layout/layout';
import ClientPage from './client-page';
import { hasLocale } from 'next-intl';
import { routing } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';
import type { SeoField } from '@/lib/types/seo';

export const revalidate = 3600;
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; urlSegments: string[] }>;
}): Promise<Metadata> {
  const { locale, urlSegments } = await params;
  const filepath = urlSegments.join('/');
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.betania.de';

  try {
    const [data, globalSharedData] = await Promise.all([
      client.queries.page({
        relativePath: `${locale}/${filepath}.mdx`,
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
        canonical: `${siteUrl}/${locale}/${filepath}`,
        languages: {
          'de': `${siteUrl}/de/${filepath}`,
          'ro': `${siteUrl}/ro/${filepath}`,
          'x-default': `${siteUrl}/de/${filepath}`,
        },
      },
      openGraph: {
        title,
        description,
        url: `${siteUrl}/${locale}/${filepath}`,
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

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; urlSegments: string[] }>;
}) {
  const { locale, urlSegments } = await params;

  // Validate locale
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const filepath = urlSegments.join('/');

  let data;
  try {
    // Try locale-specific content first
    data = await client.queries.page({
      relativePath: `${locale}/${filepath}.mdx`,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // Fallback to non-locale specific content
    try {
      data = await client.queries.page({
        relativePath: `${filepath}.mdx`,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (fallbackError) {
      notFound();
    }
  }

  return (
    <Layout rawPageData={data}>
      <ClientPage {...data} />
    </Layout>
  );
}

export async function generateStaticParams() {
  // ⚡ Bolt: Increase batch size to 100 to reduce N+1 queries during static param generation
  let pages = await client.queries.pageConnection({ first: 100 });
  const allPages = pages;

  if (!allPages.data.pageConnection.edges) {
    return [];
  }

  while (pages.data.pageConnection.pageInfo.hasNextPage) {
    pages = await client.queries.pageConnection({
      first: 100,
      after: pages.data.pageConnection.pageInfo.endCursor,
    });

    if (!pages.data.pageConnection.edges) {
      break;
    }

    allPages.data.pageConnection.edges.push(...pages.data.pageConnection.edges);
  }

  const params = allPages.data?.pageConnection.edges
    .flatMap((edge) => {
      const breadcrumbs = edge?.node?._sys.breadcrumbs || [];
      if (breadcrumbs.length < 2) return []; // Need at least [locale, ...path]
      const locale = breadcrumbs[0];
      const urlSegments = breadcrumbs.slice(1);
      // Filter by enabled locales and exclude home pages
      if (!routing.locales.includes(locale)) return [];
      if (urlSegments.every((s) => s === 'home')) return [];
      return [{ locale, urlSegments }];
    });

  return params || [];
}
