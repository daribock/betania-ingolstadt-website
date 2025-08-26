import React, { PropsWithChildren } from 'react';
import { LayoutProvider } from './layout-context';
import client from '../../tina/__generated__/databaseClient';
import { Header } from './nav/header';
import { Footer } from './nav/footer';
import { getLocale } from 'next-intl/server';
import { PageClientPageProps } from '@/app/[locale]/[...urlSegments]/client-page';
import { GlobalQuery, PostConnectionQuery } from '@/tina/__generated__/types';
import { PostClientPageProps } from '@/app/[locale]/posts/[...urlSegments]/client-page';

type LayoutProps = PropsWithChildren & {
  rawPageData?: PageClientPageProps | PostClientPageProps | PostConnectionQuery;
};

export default async function Layout({ children, rawPageData }: LayoutProps) {
  if (!rawPageData) {
    // Handle missing rawPageData case
    return null;
  }

  // Get the current locale
  const locale = await getLocale();

  const res = await client.queries.global(
    {
      relativePath: `${locale}/index.json`,
    },
    {
      fetchOptions: {
        next: {
          revalidate: 60,
        },
      },
    }
  );

  const globalData = JSON.parse(JSON.stringify(res.data)) as GlobalQuery;

  return (
    <LayoutProvider globalSettings={globalData.global} pageData={rawPageData}>
      <Header />
      <main className="overflow-x-hidden">{children}</main>
      <Footer />
    </LayoutProvider>
  );
}
