## 2024-05-01 - [Iframe Lazy Loading]
**Learning:** Missing comments for performance optimization was flagged during Code Review.
**Action:** Always ensure to explicitly add a comment like `// ⚡ Bolt: ...` around the optimization logic to fulfill the rule requirement.

## 2026-06-08 - [Bundle Bloat with React Icons]
**Learning:** Importing full namespaces like `import * as BoxIcons from 'react-icons/bi'` in client components forces the bundler to include the entire set (e.g. 1.5k+ icons) into the initial javascript bundle, creating massive bundle bloat.
**Action:** When working with dynamic icon resolution, move full namespace imports to CMS-only files. For frontend rendering, use `next/dynamic` wrappers resolving by icon prefix (e.g., Bi, Fa, Ai) to lazily load chunks only when rendered.
