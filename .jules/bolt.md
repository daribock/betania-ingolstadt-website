## 2024-05-01 - [Iframe Lazy Loading]
**Learning:** Missing comments for performance optimization was flagged during Code Review.
**Action:** Always ensure to explicitly add a comment like `// ⚡ Bolt: ...` around the optimization logic to fulfill the rule requirement.

## 2024-05-08 - [GraphQL Pagination Optimization]
**Learning:** `client.queries.pageConnection` in TinaCMS defaults to fetching a small number of items per request. During static site generation or sitemap building where all items are needed, this leads to inefficient N+1 sequential requests.
**Action:** Always pass `{ first: 100 }` (or a larger reasonable batch size) when iterating through a full `pageConnection` loop to significantly reduce network roundtrips.
