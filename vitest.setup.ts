import '@testing-library/jest-dom/vitest';
import React from 'react';
import { vi } from 'vitest';

// Tina's live-editing hook/field marker are irrelevant outside the CMS editor.
vi.mock('tinacms/dist/react', () => ({
  useTina: ({ data }: { data: unknown }) => ({ data }),
  tinaField: () => undefined,
}));

vi.mock('next/image', () => ({
  default: ({ alt, src }: { alt?: string; src: string }) =>
    React.createElement('img', { alt, src }),
}));

vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
  }) => React.createElement('a', { href, ...props }, children),
}));

// Only the CMS editor schema lives here; pulls in 'tinacms' (CJS interop breaks under Vitest).
vi.mock('@/tina/fields/icon', () => ({ iconSchema: {} }));
