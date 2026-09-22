import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { notFound } from 'next/navigation';
import client from '@/tina/__generated__/client';
import { routing } from '@/i18n/routing';
import Home, { generateMetadata, generateStaticParams } from '../page';
import {
  createPageQueryResult,
  createGlobalSharedQueryResult,
} from '../../../test/helpers/tina';

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

const mockedClient = client as unknown as {
  queries: {
    page: ReturnType<typeof vi.fn>;
    globalShared: ReturnType<typeof vi.fn>;
  };
};

describe('Home page ([locale]/page.tsx)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the mocked home content blocks', async () => {
    mockedClient.queries.page.mockResolvedValue(createPageQueryResult());
    mockedClient.queries.globalShared.mockResolvedValue(
      createGlobalSharedQueryResult(),
    );

    const element = await Home({ params: Promise.resolve({ locale: 'de' }) });
    render(element);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Welcome to Betania' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 1, name: 'About Us' }),
    ).toBeInTheDocument();
  });

  it('calls notFound when the page query fails', async () => {
    mockedClient.queries.page.mockRejectedValue(new Error('missing content'));

    await expect(
      Home({ params: Promise.resolve({ locale: 'de' }) }),
    ).rejects.toThrow('NEXT_NOT_FOUND');
    expect(notFound).toHaveBeenCalled();
  });

  describe('generateMetadata', () => {
    it('builds metadata from seo fields', async () => {
      mockedClient.queries.page.mockResolvedValue(
        createPageQueryResult({
          seo: {
            __typename: 'PageSeo',
            title: 'Home title',
            description: 'Home description',
            ogImage: null,
          },
        }),
      );
      mockedClient.queries.globalShared.mockResolvedValue(
        createGlobalSharedQueryResult(),
      );

      const metadata = await generateMetadata({
        params: Promise.resolve({ locale: 'de' }),
      });

      expect(metadata.title).toBe('Home title');
      expect(metadata.description).toBe('Home description');
      expect(metadata.alternates?.canonical).toBe(
        'https://www.betania.de/de',
      );
    });

    it('falls back to default metadata when queries fail', async () => {
      mockedClient.queries.page.mockRejectedValue(new Error('fail'));
      mockedClient.queries.globalShared.mockRejectedValue(new Error('fail'));

      const metadata = await generateMetadata({
        params: Promise.resolve({ locale: 'de' }),
      });

      expect(metadata.title).toBe('Betania Ingolstadt');
      expect(metadata.description).toBe('Betania Ingolstadt - Gemeinde');
    });
  });

  it('generateStaticParams returns every configured locale', async () => {
    const params = await generateStaticParams();
    expect(params).toEqual(routing.locales.map((locale) => ({ locale })));
  });
});
