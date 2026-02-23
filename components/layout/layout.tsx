import React, { PropsWithChildren } from 'react';
import { LayoutProvider } from './layout-context';
import client from '../../tina/__generated__/client';
import { Header } from './nav/header';
import { Footer } from './nav/footer';
import { getLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

type LayoutProps = PropsWithChildren & {
  rawPageData?: object;
};

export default async function Layout({ children, rawPageData }: LayoutProps) {
  if (!rawPageData) {
    // Handle missing rawPageData case
    return notFound();
  }

  // Get the current locale
  const locale = await getLocale();

  let globalData;
  let contactData;

  try {
    // Fetch locale-specific global content (no fallback needed)
    globalData = await client.queries.global(
      {
        relativePath: `${locale}/index.json`,
      },
      {
        fetchOptions: {
          next: {
            revalidate: 60,
          },
        },
      },
    );

    // Fetch contact information (not locale-specific)
    contactData = await client.queries.contactInformation(
      {
        relativePath: 'index.json',
      },
      {
        fetchOptions: {
          next: {
            revalidate: 60,
          },
        },
      },
    );
  } catch (error) {
    // If either global or contact data fails to load, throw error
    throw error;
  }

  return (
    <LayoutProvider
      globalSettings={globalData.data.global}
      contactInformation={contactData.data.contactInformation}
      pageData={rawPageData}
    >
      <Header />
      <main className="overflow-x-hidden">{children}</main>
      <Footer />
    </LayoutProvider>
  );
}
