## 2024-05-01 - [Iframe Lazy Loading]
**Learning:** Missing comments for performance optimization was flagged during Code Review.
**Action:** Always ensure to explicitly add a comment like `// ⚡ Bolt: ...` around the optimization logic to fulfill the rule requirement.

## 2024-05-03 - [TinaCMS N+1 Query Optimization]
**Learning:** Sequential network requests in `pageConnection` can be drastically reduced by explicitly defining a large batch size parameter.
**Action:** Ensure that paginated endpoints explicitly define a `first` parameter (e.g., `first: 100`) to pull data in fewer fetches.
