import React from 'react';
import client from '@/tina/__generated__/databaseClient';
import Layout from '@/components/layout/layout';
import PostClientPage, { PostClientPageProps } from './client-page';
import { hasLocale } from 'next-intl';
import { routing } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const revalidate = 300;

export default async function PostPage({
  params,
}: {
  params: Promise<{ locale: string; urlSegments: string[] }>;
}) {
  // Redirect to not-found page for now
  return notFound();

  const resolvedParams = await params;
  const { locale, urlSegments } = resolvedParams;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const filepath = `${locale}/${urlSegments.join('/')}`;

  let res;
  try {
    res = await client.queries.post({
      relativePath: `${filepath}.mdx`,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    notFound();
  }

  const PostClientPageProps: PostClientPageProps = {
    data: JSON.parse(JSON.stringify(res.data)),
    query: res.query,
    variables: res.variables,
  };

  return (
    <Layout rawPageData={PostClientPageProps}>
      <PostClientPage {...PostClientPageProps} />
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

  const params =
    allPosts.data?.postConnection.edges.map((edge) => ({
      urlSegments: edge?.node?._sys.breadcrumbs.slice(1),
    })) || [];

  return params;
}
