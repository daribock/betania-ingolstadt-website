import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import client from '@/tina/__generated__/client';
import Page, { generateMetadata } from '../page';
import {
  createPageQueryResult,
  createGlobalSharedQueryResult,
} from '../../../../test/helpers/tina';

vi.mock('@/tina/__generated__/client', () => ({
  default: {
    queries: {
      page: vi.fn(),
      globalShared: vi.fn(),
    },
  },
}));

vi.mock('@/components/layout/layout', () => ({
  default: ({ children }: { children: React.ReactNode }) => children,
}));

vi.mock('next/navigation', () => ({
  notFound: vi.fn(() => {
    throw new Error('NEXT_NOT_FOUND');
  }),
}));

vi.mock('next-intl/server', () => ({
  setRequestLocale: vi.fn(),
}));

const mockedClient = client as unknown as {
  queries: {
    page: ReturnType<typeof vi.fn>;
    globalShared: ReturnType<typeof vi.fn>;
  };
};

describe('Catch-all page ([locale]/[...urlSegments]/page.tsx)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the mocked content blocks for a valid locale and slug', async () => {
    mockedClient.queries.page.mockResolvedValue(createPageQueryResult());

    const element = await Page({
      params: Promise.resolve({ locale: 'de', urlSegments: ['about'] }),
    });
    render(element);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Welcome to Betania' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 1, name: 'About Us' }),
    ).toBeInTheDocument();
    expect(setRequestLocale).toHaveBeenCalledWith('de');
  });

  it('calls notFound for an unsupported locale', async () => {
    await expect(
      Page({ params: Promise.resolve({ locale: 'xx', urlSegments: ['about'] }) }),
    ).rejects.toThrow('NEXT_NOT_FOUND');
    expect(notFound).toHaveBeenCalled();
    expect(mockedClient.queries.page).not.toHaveBeenCalled();
  });

  it('falls back to non-localized content when the localized query fails', async () => {
    mockedClient.queries.page
      .mockRejectedValueOnce(new Error('locale specific missing'))
      .mockResolvedValueOnce(createPageQueryResult());

    const element = await Page({
      params: Promise.resolve({ locale: 'de', urlSegments: ['about'] }),
    });
    render(element);

    expect(mockedClient.queries.page).toHaveBeenNthCalledWith(1, {
      relativePath: 'de/about.mdx',
    });
    expect(mockedClient.queries.page).toHaveBeenNthCalledWith(2, {
      relativePath: 'about.mdx',
    });
    expect(
      screen.getByRole('heading', { level: 1, name: 'Welcome to Betania' }),
    ).toBeInTheDocument();
  });

  it('calls notFound when both the localized and fallback query fail', async () => {
    mockedClient.queries.page.mockRejectedValue(new Error('missing'));

    await expect(
      Page({ params: Promise.resolve({ locale: 'de', urlSegments: ['unknown'] }) }),
    ).rejects.toThrow('NEXT_NOT_FOUND');
    expect(notFound).toHaveBeenCalled();
  });

  describe('generateMetadata', () => {
    it('builds metadata for the requested slug', async () => {
      mockedClient.queries.page.mockResolvedValue(
        createPageQueryResult({
          seo: {
            __typename: 'PageSeo',
            title: 'About title',
            description: 'About description',
            ogImage: null,
          },
        }),
      );
      mockedClient.queries.globalShared.mockResolvedValue(
        createGlobalSharedQueryResult(),
      );

      const metadata = await generateMetadata({
        params: Promise.resolve({ locale: 'de', urlSegments: ['about'] }),
      });

      expect(metadata.title).toBe('About title');
      expect(metadata.alternates?.canonical).toBe(
        'https://www.betania.de/de/about',
      );
    });

    it('falls back to default metadata when queries fail', async () => {
      mockedClient.queries.page.mockRejectedValue(new Error('fail'));
      mockedClient.queries.globalShared.mockRejectedValue(new Error('fail'));

      const metadata = await generateMetadata({
        params: Promise.resolve({ locale: 'de', urlSegments: ['about'] }),
      });

      expect(metadata.title).toBe('Betania Ingolstadt');
    });
  });
});
