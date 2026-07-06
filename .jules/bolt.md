## 2024-05-01 - [Iframe Lazy Loading]
**Learning:** Missing comments for performance optimization was flagged during Code Review.
**Action:** Always ensure to explicitly add a comment like `// ⚡ Bolt: ...` around the optimization logic to fulfill the rule requirement.

## 2024-05-01 - [TinaCMS N+1 Query Fix]
**Learning:** Sequential fetching using default small batch sizes for GraphQL connections in static generation (e.g. `client.queries.pageConnection()`) creates significant overhead in Next.js builds. Also, executing Tina commands or using PNPM may generate an untracked, large `pnpm-lock.yaml` which needs to be removed before PR creation.
**Action:** Always specify a larger batch size (e.g., `first: 100`) when looping through `pageInfo.hasNextPage` in static generation scripts to batch operations. And always check `git status` to avoid committing unintended auto-generated package manager lockfiles.
