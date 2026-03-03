# GitHub Issues to Create

Use this file to create sub-issues for issue #68. Copy and paste each section below into a new GitHub issue.

---

## Issue 1: Optimize and Convert Large PNG Images to WebP/AVIF

**Title:** [PERF] Optimize and Convert Large PNG Images to WebP/AVIF

**Labels:** performance, enhancement, high-priority

**Assignees:** (assign as needed)

**Body:**
```markdown
## Parent Issue
Part of #68

## Priority
High 🔴

## Category
Image Optimization

## Estimated Impact
Reduce initial page load by 20-30MB

## Problem
Multiple PNG images in `/public/uploads/church/` are 3-4MB each:
- `gottesdienst_1.png` - 3.7MB
- `kinder.png` - 3.8MB
- `welcome-team.png` - 3.8MB
- `worship-1.png` - 3.8MB
- `worship-2.png` - 3.7MB
- `worship-3.png` - 3.3MB
- `publikum-3.png` - 3.2MB

Total: ~26MB in PNG images alone

## Solution
1. Convert all large PNG images to modern formats (WebP and AVIF)
2. Use Next.js Image component's automatic format optimization
3. Set up proper image pipeline for future uploads

## Implementation Steps
- [ ] Install sharp: `npm install -D sharp`
- [ ] Run conversion script: `node scripts/convert-images.js`
- [ ] Verify all images display correctly
- [ ] Update `.gitignore` if needed
- [ ] Document image upload guidelines

## Expected Results
- Reduce image payload from ~26MB to ~3-5MB
- Improve Largest Contentful Paint (LCP) by 2-3 seconds
- Better Core Web Vitals scores

## Related Files
- `/public/uploads/church/*.png`
- `/components/blocks/hero.tsx`
- `/components/blocks/page-header.tsx`
- `scripts/convert-images.js` (already created)

## Testing Checklist
- [ ] Run Lighthouse audit before changes
- [ ] Convert images
- [ ] Run Lighthouse audit after changes
- [ ] Test on slow 3G connection
- [ ] Verify images display correctly across browsers
- [ ] Check bilingual support (de/ro)
- [ ] Ensure TinaCMS editing works

## Resources
- See `PERFORMANCE_IMPROVEMENTS.md` for detailed instructions
- See `scripts/README.md` for script usage
```

---

## Issue 2: Implement Responsive Image Sizes and Lazy Loading

**Title:** [PERF] Implement Responsive Image Sizes and Lazy Loading

**Labels:** performance, enhancement, high-priority

**Assignees:** (assign as needed)

**Body:**
```markdown
## Parent Issue
Part of #68

## Priority
High 🔴

## Category
Image Optimization

## Estimated Impact
Reduce bandwidth usage by 40-60%

## Problem
- Images are loaded at full resolution regardless of viewport size
- The `sizes` attribute is set to `100vw` for hero images, but many images don't need full viewport width
- No systematic lazy loading strategy for below-the-fold images

## Solution
Configure proper `sizes` attribute for different breakpoints and implement lazy loading for below-the-fold images.

## Implementation Steps
- [ ] Audit all Image components in the codebase
- [ ] Update hero.tsx (verify priority is only on first hero)
- [ ] Add lazy loading to content.tsx
- [ ] Add lazy loading to page-header.tsx
- [ ] Add lazy loading to events.tsx
- [ ] Add lazy loading to instagram-section-block.tsx
- [ ] Configure appropriate `sizes` attributes
- [ ] Add blur placeholders where appropriate

## Expected Results
- Mobile users download 2-3MB instead of 10-15MB
- Faster initial page load
- Better Time to Interactive (TTI)
- No layout shift issues

## Related Files
- `/components/blocks/content.tsx`
- `/components/blocks/page-header.tsx`
- `/components/blocks/events.tsx`
- `/components/blocks/instagram-section-block.tsx`
- `/components/blocks/hero.tsx`

## Testing Checklist
- [ ] Use Chrome DevTools Network tab to verify image sizes
- [ ] Test on mobile device with throttled connection
- [ ] Verify no layout shift (CLS) issues
- [ ] Check that hero images still load with priority
- [ ] Test bilingual support

## Resources
- See `PERFORMANCE_IMPROVEMENTS.md` - Sub-Issue 2
- See `PERFORMANCE_QUICK_REFERENCE.md` for code examples
```

---

## Issue 3: Optimize Font Loading Strategy

**Title:** [PERF] Optimize Font Loading Strategy

**Labels:** performance, enhancement, medium-priority

**Assignees:** (assign as needed)

**Body:**
```markdown
## Parent Issue
Part of #68

## Priority
Medium 🟡

## Category
Font Optimization

## Estimated Impact
Reduce render-blocking time by 300-500ms

## Problem
Currently loading 3 Google Fonts in `/app/[locale]/layout.tsx`:
- Inter (FontSans)
- Nunito
- Lato

All fonts are loaded without optimization, potentially blocking render.

## Solution
1. Evaluate if all 3 fonts are necessary
2. Add `display: 'swap'` to all font configurations
3. Configure proper fallback fonts
4. Consider subsetting fonts to include only used characters

## Implementation Steps
- [ ] Audit font usage across components
- [ ] Determine if all 3 fonts are needed
- [ ] Add `display: 'swap'` to font configurations
- [ ] Add `preload: true` and `adjustFontFallback: true`
- [ ] Configure proper fallback fonts in CSS
- [ ] Test font loading behavior

## Expected Results
- Eliminate font-related render blocking
- Improve First Contentful Paint (FCP) by 200-400ms
- Better font loading UX (no invisible text)

## Related Files
- `/app/[locale]/layout.tsx`
- `/styles.css`

## Testing Checklist
- [ ] Run Lighthouse audit
- [ ] Verify no FOIT (Flash of Invisible Text)
- [ ] Check fonts load correctly
- [ ] Test on slow connection
- [ ] Verify bilingual text renders correctly

## Resources
- See `PERFORMANCE_IMPROVEMENTS.md` - Sub-Issue 3
- See `PERFORMANCE_QUICK_REFERENCE.md` for font optimization example
```

---

## Issue 4: Code Splitting and Dynamic Import Optimization

**Title:** [PERF] Code Splitting and Dynamic Import Optimization

**Labels:** performance, enhancement, medium-priority

**Assignees:** (assign as needed)

**Body:**
```markdown
## Parent Issue
Part of #68

## Priority
Medium 🟡

## Category
JavaScript Bundle Optimization

## Estimated Impact
Reduce initial bundle size by 30-40%

## Problem
Heavy dependencies loaded for all pages:
- `mermaid` (11.12.1) - ~500KB
- `motion` (12.23.24) - ~100KB
- `react-player` (already lazy, but could be improved)
- `shiki` (syntax highlighting) - ~200KB

## Solution
1. Dynamic import for Mermaid (only load on pages with diagrams)
2. Optimize ReactPlayer import to use `/lazy` version
3. Ensure Shiki only loads for blog/code pages
4. Consider CSS animations for simple motion cases

## Implementation Steps
- [ ] Install bundle analyzer: `npm install -D @next/bundle-analyzer`
- [ ] Configure in next.config.ts
- [ ] Run current analysis: `ANALYZE=true npm run build`
- [ ] Implement dynamic imports for heavy components
- [ ] Re-run analysis and verify improvements
- [ ] Update documentation

## Expected Results
- Reduce initial bundle from ~300KB to ~150-200KB
- Faster Time to Interactive (TTI)
- Lower Total Blocking Time (TBT)

## Related Files
- `/components/blocks/mermaid.tsx`
- `/components/blocks/video.tsx`
- `/components/blocks/content.tsx`
- `/next.config.ts`

## Testing Checklist
- [ ] Bundle analyzer shows reduction
- [ ] All features still work correctly
- [ ] Diagrams load correctly
- [ ] Videos load correctly
- [ ] No regression in functionality

## Resources
- See `PERFORMANCE_IMPROVEMENTS.md` - Sub-Issue 4
```

---

## Issue 5: Implement Proper Caching Strategy

**Title:** [PERF] Implement Proper Caching Strategy

**Labels:** performance, enhancement, medium-priority

**Assignees:** (assign as needed)

**Body:**
```markdown
## Parent Issue
Part of #68

## Priority
Medium 🟡

## Category
Caching & CDN

## Estimated Impact
Reduce repeat visitor load time by 70-80%

## Problem
Current configuration:
- `revalidate = 3600` (1 hour) for all pages
- No explicit cache headers for static assets
- Missing service worker/PWA capabilities

## Solution
1. Optimize revalidation times based on content update frequency
2. Add cache headers for static assets
3. Configure CDN settings
4. Consider PWA support for offline capabilities

## Implementation Steps
- [ ] Analyze content update patterns
- [ ] Set appropriate revalidate values per page type
- [ ] Add cache headers for static assets in next.config.ts
- [ ] Verify CDN configuration (Vercel)
- [ ] Document caching strategy
- [ ] Consider PWA implementation (optional)

## Expected Results
- Repeat visitors see near-instant loads
- Reduced server load
- Better caching efficiency

## Related Files
- `/app/[locale]/page.tsx`
- `/app/[locale]/[...urlSegments]/page.tsx`
- `/next.config.ts`

## Testing Checklist
- [ ] Verify cache headers in Network tab
- [ ] Test repeat visits
- [ ] Check cache behavior
- [ ] Verify content updates still work

## Resources
- See `PERFORMANCE_IMPROVEMENTS.md` - Sub-Issue 5
- See `PERFORMANCE_QUICK_REFERENCE.md` for cache headers example
```

---

## Issue 6: Database Query and Data Fetching Optimization

**Title:** [PERF] Database Query and Data Fetching Optimization

**Labels:** performance, enhancement, low-priority

**Assignees:** (assign as needed)

**Body:**
```markdown
## Parent Issue
Part of #68

## Priority
Low 🟢

## Category
Data Fetching

## Estimated Impact
Reduce server-side rendering time by 20-30%

## Problem
Current data fetching in `/app/[locale]/[...urlSegments]/page.tsx`:
- Sequential try-catch for locale fallback
- Potential for duplicate queries
- No apparent query optimization for large content collections

## Solution
1. Optimize locale fallback logic
2. Add React `cache()` wrapper to prevent duplicate queries
3. Optimize generateStaticParams for large sites
4. Profile query performance

## Implementation Steps
- [ ] Add React `cache` wrapper to data fetching functions
- [ ] Optimize try-catch logic in page.tsx
- [ ] Profile query performance
- [ ] Test with large content collections
- [ ] Document optimization approach

## Expected Results
- Faster server-side rendering
- Reduced API calls to TinaCMS
- Better build times

## Related Files
- `/app/[locale]/[...urlSegments]/page.tsx`
- `/app/[locale]/page.tsx`
- `/tina/__generated__/client.ts`

## Testing Checklist
- [ ] Build time comparison
- [ ] Verify no duplicate queries
- [ ] Test locale fallback still works
- [ ] Check error handling

## Resources
- See `PERFORMANCE_IMPROVEMENTS.md` - Sub-Issue 6
```

---

## Issue 7: Reduce Third-Party Script Impact

**Title:** [PERF] Reduce Third-Party Script Impact

**Labels:** performance, enhancement, low-priority

**Assignees:** (assign as needed)

**Body:**
```markdown
## Parent Issue
Part of #68

## Priority
Low 🟢

## Category
Third-Party Scripts

## Estimated Impact
Improve performance scores by 5-10 points

## Problem
Current third-party integrations:
- Vercel Analytics
- Vercel Speed Insights

All loaded synchronously in layout, potentially blocking main thread.

## Solution
1. Use Next.js Script component with appropriate loading strategy
2. Defer non-critical scripts
3. Consider self-hosting if possible

## Implementation Steps
- [ ] Review current third-party scripts
- [ ] Update to use Next.js Script component
- [ ] Configure appropriate loading strategies
- [ ] Test analytics still work correctly
- [ ] Verify performance improvement

## Expected Results
- Reduce main thread blocking time
- Improve TTI
- Better performance scores

## Related Files
- `/app/[locale]/layout.tsx`
- `/lib/clients/` (if any external APIs)

## Testing Checklist
- [ ] Analytics still track correctly
- [ ] Performance score improvement
- [ ] No console errors
- [ ] Verify on production

## Resources
- See `PERFORMANCE_IMPROVEMENTS.md` - Sub-Issue 7
```

---

## Issue 8: Enable Compression and Modern Build Optimizations

**Title:** [PERF] Enable Compression and Modern Build Optimizations

**Labels:** performance, enhancement, low-priority

**Assignees:** (assign as needed)

**Body:**
```markdown
## Parent Issue
Part of #68

## Priority
Low 🟢

## Category
Build Configuration

## Estimated Impact
Reduce transfer size by 20-30%

## Problem
- No explicit compression configuration in next.config.ts
- Not using experimental features that could improve performance
- Missing modern build optimizations

## Solution
1. Enable compression in next.config.ts
2. Configure experimental optimizations
3. Remove console logs in production
4. Optimize package imports

## Implementation Steps
- [ ] Update next.config.ts with optimizations
- [ ] Enable SWC minification (verify)
- [ ] Configure webpack optimizations if needed
- [ ] Test build output
- [ ] Measure transfer size reduction

## Expected Results
- Smaller JavaScript bundles
- Faster downloads
- Better gzip/brotli compression

## Related Files
- `/next.config.ts`
- `package.json`

## Testing Checklist
- [ ] Build succeeds
- [ ] All features work
- [ ] Transfer sizes reduced
- [ ] No console logs in production

## Resources
- See `PERFORMANCE_IMPROVEMENTS.md` - Sub-Issue 8
```

---

## Notes

After creating all issues:
1. Link them to parent issue #68
2. Assign priorities and labels
3. Consider creating a GitHub Project board for tracking
4. Follow implementation order in PERFORMANCE_IMPROVEMENTS.md
5. Use the issue template in `.github/ISSUE_TEMPLATE/performance-sub-issue.md` for future issues

## Quick Commands

To create issues via GitHub CLI (if available):
```bash
gh issue create --title "[PERF] Issue Title" --body-file issue_body.md --label performance,enhancement
```
