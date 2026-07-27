## 2024-05-01 - [Iframe Lazy Loading]
**Learning:** Missing comments for performance optimization was flagged during Code Review.
**Action:** Always ensure to explicitly add a comment like `// ⚡ Bolt: ...` around the optimization logic to fulfill the rule requirement.
## 2024-05-18 - Optimize TinaCMS Sequential Fetching
**Learning:** Found a performance pattern with TinaCMS queries where sequential fetching (N+1 queries) occurs because the `first` batch size argument defaults to 10.
**Action:** Always set the `first` parameter (e.g. `first: 100`) in `pageConnection` query calls (like in `app/sitemap.ts` and `app/[locale]/[...urlSegments]/page.tsx`) to increase the batch size and significantly reduce sequential network requests.
