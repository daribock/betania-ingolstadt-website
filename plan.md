1. **Move `IconOptions` from `components/icon.tsx` to `tina/fields/icon.tsx`**:
   - `components/icon.tsx` currently imports all `react-icons/bi` icons, bloating the main client bundle.
   - We will shift the full namespace import and `IconOptions` definition to `tina/fields/icon.tsx`, which is a CMS-only file.

2. **Refactor `components/icon.tsx` to use `next/dynamic` for lazily loading icons**:
   - Use `next/dynamic` to dynamically load `react-icons/bi`, `react-icons/fa6`, and `react-icons/ai` based on the `iconName` prefix.
   - Cache the dynamically loaded components in an `iconCache` object to prevent the `react-hooks/static-components` ESLint error.
   - Disable the `react-hooks/static-components` ESLint rule for the `components/icon.tsx` file, as the components are safely cached.
   - Use `React.ElementType` for typing the resolved module member to avoid TypeScript errors.

3. **Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done**:
   - Run `pnpm lint` and `pnpm lint:tsc` to verify code format, lint rules, and types.
   - Run tests using `bun test` if applicable.

4. **Submit PR**:
   - Create a Pull Request with the title "⚡ Bolt: [performance improvement]" and details about the optimization.
