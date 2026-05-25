## 2024-05-01 - [Iframe Lazy Loading]
**Learning:** Missing comments for performance optimization was flagged during Code Review.
**Action:** Always ensure to explicitly add a comment like `// ⚡ Bolt: ...` around the optimization logic to fulfill the rule requirement.

## 2024-06-25 - [Client Bundle Bottleneck from react-icons/bi]
**Learning:** Importing full namespace like `import * as BoxIcons from 'react-icons/bi'` in a client component causes significant bundle bloat.
**Action:** Always shift full namespace imports to a CMS-only context (`tina/fields/icon.tsx`) and use `next/dynamic` to dynamically load required icons at runtime in frontend components (`components/icon.tsx`).
