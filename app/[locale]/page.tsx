import React from 'react';
import client from '@/tina/__generated__/databaseClient';
import Layout from '@/components/layout/layout';
import ClientPage, {
  PageClientPageProps,
} from './[...urlSegments]/client-page';

export const revalidate = 300;

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Try locale-specific home first, fallback to generic home
  let res;
  try {
    res = await client.queries.page({
      relativePath: `${locale}/home.mdx`,
    });
  } catch (error) {
    throw error; // Re-throw original error
  }

  const PageClientPageProps: PageClientPageProps = {
    data: JSON.parse(JSON.stringify(res.data)),
    query: res.query,
    variables: res.variables,
  };

  return (
    <Layout rawPageData={PageClientPageProps}>
      <ClientPage // https://github.com/vercel/next.js/issues/47447
        {...PageClientPageProps}
      />
    </Layout>
  );
}
