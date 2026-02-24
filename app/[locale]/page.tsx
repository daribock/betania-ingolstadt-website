import React from 'react';
import client from '@/tina/__generated__/client';
import Layout from '@/components/layout/layout';
import ClientPage from './[...urlSegments]/client-page';
import { notFound } from 'next/navigation';

export const revalidate = 300;

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
