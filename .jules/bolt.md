## 2024-05-01 - [Iframe Lazy Loading]
**Learning:** Missing comments for performance optimization was flagged during Code Review.
**Action:** Always ensure to explicitly add a comment like `// ⚡ Bolt: ...` around the optimization logic to fulfill the rule requirement.

## 2024-05-18 - [TinaCMS N+1 Query Optimization]
**Learning:** By default, TinaCMS `pageConnection` fetches a small batch of pages. When iterating over all pages (like in `sitemap.ts` and static param generation), this leads to sequential N+1 network queries.
**Action:** Always provide a `first` parameter with a larger reasonable batch size (e.g., `100`) to `pageConnection` to minimize round trips during build and runtime operations involving all items in a collection.
