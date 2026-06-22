## 2024-05-18 - Client Component Icon Bundle Size
**Learning:** Avoid importing full icon namespaces (e.g., `import * as BoxIcons from 'react-icons/bi'`) in client components because it drastically increases bundle size. In `components/icon.tsx`, `BoxIcons` is imported fully, which causes the entire `react-icons/bi` bundle to be included in the client build, even if only a few icons are used.
**Action:** Use `next/dynamic` to lazily load required icons or shift full namespace imports to CMS-only files.
