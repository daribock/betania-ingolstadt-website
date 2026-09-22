import type {
  GlobalQuery,
  GlobalSharedQuery,
  PageQuery,
} from '@/tina/__generated__/types';

type QueryResult<T> = { data: T; query: string; variables: Record<string, unknown> };

const baseSys = {
  filename: 'home',
  basename: 'home.mdx',
  hasReferences: false,
  breadcrumbs: ['de', 'home'],
  path: 'content/pages/de/home.mdx',
  relativePath: 'de/home.mdx',
  extension: '.mdx',
};

export function createPageQueryResult(
  overrides: Partial<PageQuery['page']> = {},
): QueryResult<PageQuery> {
  return {
    data: {
      page: {
        __typename: 'Page',
        id: 'page-id',
        _sys: baseSys,
        seo: { __typename: 'PageSeo', title: null, description: null, ogImage: null },
        blocks: [
          {
            __typename: 'PageBlocksHero',
            background: 'bg-default',
            headline: 'Welcome to Betania',
            tagline: 'A place to belong',
            actions: [],
            image: null,
          },
          {
            __typename: 'PageBlocksPageHeader',
            background: 'bg-default',
            title: 'About Us',
            subtitle: 'Our story',
            backgroundImage: null,
            backgroundImageAlt: null,
          },
        ],
        ...overrides,
      } as PageQuery['page'],
    },
    query: 'query',
    variables: {},
  };
}

export function createGlobalSharedQueryResult(
  overrides: Partial<GlobalSharedQuery['globalShared']> = {},
): QueryResult<GlobalSharedQuery> {
  return {
    data: {
      globalShared: {
        __typename: 'GlobalShared',
        id: 'global-shared-id',
        logo: null,
        _sys: baseSys,
        social: [],
        theme: null,
        contact: null,
        seo: { __typename: 'GlobalSharedSeo', title: null, description: null, ogImage: null },
        ...overrides,
      } as GlobalSharedQuery['globalShared'],
    },
    query: 'query',
    variables: {},
  };
}

export function createGlobalQueryResult(
  overrides: Partial<GlobalQuery['global']> = {},
): QueryResult<GlobalQuery> {
  return {
    data: {
      global: {
        __typename: 'Global',
        id: 'global-id',
        footer: null,
        _sys: baseSys,
        header: { __typename: 'GlobalHeader', name: 'Betania', tagline: null, nav: [] },
        services: [],
        legal: [],
        ...overrides,
      } as GlobalQuery['global'],
    },
    query: 'query',
    variables: {},
  };
}
