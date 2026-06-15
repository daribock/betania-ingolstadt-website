## 2024-05-01 - [Iframe Lazy Loading]
**Learning:** Missing comments for performance optimization was flagged during Code Review.
**Action:** Always ensure to explicitly add a comment like `// ⚡ Bolt: ...` around the optimization logic to fulfill the rule requirement.

## 2024-05-15 - [TinaCMS Batch Fetching]
**Learning:** Default TinaCMS `pageConnection` requests can cause severe N+1 sequential fetching delays (N+1 query problem).
**Action:** When querying connection nodes sequentially via `hasNextPage` and `endCursor`, always use `first: 100` to significantly increase the batch size and reduce roundtrips.
