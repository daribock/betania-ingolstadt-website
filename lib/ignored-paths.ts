import { routing } from '@/i18n/routing';

const DEFAULT_IGNORED_PATHS = ['/posts'];

const normalizePath = (value: string) => {
  if (!value) return '/';

  let path = value.trim();
  if (!path) return '/';
  if (!path.startsWith('/')) path = `/${path}`;
  if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);

  return path;
};

export const getIgnoredPaths = () => {
  const envPaths = process.env.IGNORED_PATHS?.split(',')
    .map((path) => normalizePath(path))
    .filter(Boolean);

  if (!envPaths?.length) {
    return DEFAULT_IGNORED_PATHS;
  }

  return [...new Set(envPaths)];
};

const matchesSegmentPrefix = (pathname: string, candidate: string) =>
  pathname === candidate || pathname.startsWith(`${candidate}/`);

export const isPathIgnored = (pathname: string, ignoredPaths: string[]) => {
  const normalizedPathname = normalizePath(pathname);

  return ignoredPaths.some((ignoredPath) => {
    if (ignoredPath === '/') {
      return true;
    }

    if (matchesSegmentPrefix(normalizedPathname, ignoredPath)) {
      return true;
    }

    return routing.locales.some((locale) => {
      const localizedPath = `/${locale}${ignoredPath}`;
      return matchesSegmentPrefix(normalizedPathname, localizedPath);
    });
  });
};
