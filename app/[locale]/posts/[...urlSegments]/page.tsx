import React from 'react';
import type { Metadata } from 'next';
import client from '@/tina/__generated__/client';
import Layout from '@/components/layout/layout';
import PostClientPage from './client-page';
import { hasLocale } from 'next-intl';
import { routing } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const revalidate = 3600;
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; urlSegments: string[] }>;
}): Promise<Metadata> {
  const { locale, urlSegments } = await params;
  const filepath = `${locale}/${urlSegments.join('/')}`;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://betania-ingolstadt.de';

  try {
    const data = await client.queries.post({
      relativePath: `${filepath}.mdx`,
    });

    const post = data.data.post;
    const title = post.seo?.title || post.title || 'Betania Ingolstadt';
    const description = post.seo?.description || 'Betania Ingolstadt - Gemeinde';

    return {
      title,
      description,
      alternates: {
        canonical: `${siteUrl}/${locale}/posts/${urlSegments.join('/')}`,
      },
      openGraph: {
        title,
        description,
        url: `${siteUrl}/${locale}/posts/${urlSegments.join('/')}`,
        siteName: 'Betania Ingolstadt',
        locale: locale,
        type: 'article',
        publishedTime: post.date ?? undefined,
      },
    };
  } catch {
    return {
      title: 'Betania Ingolstadt',
      description: 'Betania Ingolstadt - Gemeinde',
    };
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ locale: string; urlSegments: string[] }>;
}) {
  const resolvedParams = await params;
  const { locale, urlSegments } = resolvedParams;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const filepath = `${locale}/${urlSegments.join('/')}`;

  let data;
  try {
    data = await client.queries.post({
      relativePath: `${filepath}.mdx`,
    });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    notFound();
  }

  return (
    <Layout rawPageData={data}>
      <PostClientPage {...data} />
    </Layout>
  );
}

export async function generateStaticParams() {
  let posts = await client.queries.postConnection();
  const allPosts = posts;

  if (!allPosts.data.postConnection.edges) {
    return [];
  }

  while (posts.data?.postConnection.pageInfo.hasNextPage) {
    posts = await client.queries.postConnection({
      after: posts.data.postConnection.pageInfo.endCursor,
    });

    if (!posts.data.postConnection.edges) {
      break;
    }

    allPosts.data.postConnection.edges.push(...posts.data.postConnection.edges);
  }

  const params = allPosts.data?.postConnection.edges
    .flatMap((edge) => {
      const breadcrumbs = edge?.node?._sys.breadcrumbs || [];
      if (breadcrumbs.length < 2) return []; // Need at least [locale, ...path]
      const locale = breadcrumbs[0];
      const urlSegments = breadcrumbs.slice(1);
      // Filter by enabled locales
      if (!routing.locales.includes(locale)) return [];
      return [{ locale, urlSegments }];
    }) || [];

  return params;
}
