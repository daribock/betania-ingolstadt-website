import React from 'react';
import client from '@/tina/__generated__/client';
import Layout from '@/components/layout/layout';
import ClientPage from './[...urlSegments]/client-page';
import { notFound } from 'next/navigation';
import { prefetchEventsAppointments } from '@/lib/prefetch-events';

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

  // Pre-fetch appointments for Events blocks
  const appointmentsMap = await prefetchEventsAppointments(data.data.page.blocks);

  return (
    <Layout rawPageData={data}>
      <ClientPage {...data} appointmentsMap={appointmentsMap} />
    </Layout>
  );
}
