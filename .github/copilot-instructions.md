# Copilot Instructions - Betania Ingolstadt Website

## Architecture Overview

This is a **Next.js 15** + **TinaCMS** multilingual church website with German
(de), Romanian (ro), and English (en) locales. Content is stored as MDX/JSON in
Git and rendered via a block-based system.

### Data Flow

1. **Content**: `content/pages/{locale}/*.mdx` → TinaCMS generates types in
   `tina/__generated__/`
2. **Pages**: `app/[locale]/[...urlSegments]/page.tsx` fetches via
   `client.queries.page()` → passes to `ClientPage`
3. **Blocks**: `ClientPage` uses `useTina()` hook for live editing → renders
   `<Blocks />` component

### Key Directories

- `components/blocks/` - Content blocks with collocated TinaCMS schemas
- `components/ui/` - shadcn/ui components (Button, Card, etc.)
- `tina/collection/` - Content type definitions
- `lib/clients/` - External API clients (ChurchTools)

## Block Component Pattern

Each block is a React component with an exported TinaCMS schema template:

```tsx
// components/blocks/example.tsx
import { PageBlocksExample } from '../../tina/__generated__/types';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { Section, sectionBlockSchemaField } from '../layout/section';

export const Example = ({ data }: { data: PageBlocksExample }) => (
  <Section background={data.background!}>
    <h2 data-tina-field={tinaField(data, 'title')}>{data.title}</h2>
  </Section>
);

export const exampleBlockSchema: Template = {
  name: 'example',
  label: 'Example',
  fields: [
    sectionBlockSchemaField as any, // Background color picker
    { type: 'string', label: 'Title', name: 'title' },
  ],
};
```

**Required steps for new blocks:**

1. Create component in `components/blocks/`
2. Export and add to switch in `components/blocks/index.tsx`
3. Register schema in `tina/collection/page.ts`

## i18n / Localization

- **Routing**: `next-intl` with `[locale]` dynamic segment
- **Locales**: Controlled via `NEXT_PUBLIC_ENABLED_LOCALES` env var (comma-separated)
- **Content**: Separate files per locale in `content/pages/{de,ro,en}/`
- **UI translations**: `i18n/locales/{de,ro,en}.json`

## Commands

| Command            | Purpose                                   |
| ------------------ | ----------------------------------------- |
| `npm run dev`      | Start dev server with TinaCMS (port 3001) |
| `npm run build`    | Production build (Tina + Next)           |
| `npm run lint:tsc` | TypeScript type checking                  |

## Conventions

- **Background colors**: Use `sectionBlockSchemaField` for consistent bg options
- **Tina field binding**: Always add
  `data-tina-field={tinaField(data, 'fieldName')}` for live editing
- **Page revalidation**: Set `export const revalidate = 300` on page components
- **Client components**: Blocks inside `ClientPage` can use `'use client'`
  directive when needed
- **Client env vars**: In client components, only use `NEXT_PUBLIC_*` env vars
  (for example `NEXT_PUBLIC_ENABLE_LOCALE_SWITCHER`)
- **Type assertions**: New TinaCMS fields may need `as { fieldName?: Type }`
  until types regenerate
