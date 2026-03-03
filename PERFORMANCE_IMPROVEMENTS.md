# Performance Improvement Sub-Issues

This document outlines specific sub-issues for improving the performance of the Betania Ingolstadt website. Each section below represents a separate issue that should be created in GitHub.

## Parent Issue
**Issue #68**: Improve performance

---

## Sub-Issue 1: Optimize and Convert Large PNG Images to WebP/AVIF

### Priority: High 🔴
### Category: Image Optimization
### Estimated Impact: Reduce initial page load by 20-30MB

### Problem
Multiple PNG images in `/public/uploads/church/` are 3-4MB each:
- `gottesdienst_1.png` - 3.7MB
- `kinder.png` - 3.8MB
- `welcome-team.png` - 3.8MB
- `worship-1.png` - 3.8MB
- `worship-2.png` - 3.7MB
- `worship-3.png` - 3.3MB
- `publikum-3.png` - 3.2MB

Total: ~26MB in PNG images alone

### Solution
1. Convert all large PNG images to modern formats:
   - Generate WebP versions (70-80% smaller)
   - Generate AVIF versions (even smaller, 50-70% of WebP)
   - Keep PNG as fallback for older browsers
2. Use Next.js Image component's automatic format optimization
3. Set up proper image pipeline for future uploads

### Implementation Steps
```bash
# Install image conversion tools
npm install -D sharp

# Create conversion script
node scripts/convert-images.js
```

### Expected Results
- Reduce image payload from ~26MB to ~3-5MB
- Improve Largest Contentful Paint (LCP) by 2-3 seconds
- Better Core Web Vitals scores

### Related Files
- `/public/uploads/church/*.png`
- `/components/blocks/hero.tsx` (uses images with priority)
- `/components/blocks/page-header.tsx`

### Testing
- Test on slow 3G connection
- Verify images display correctly across browsers
- Check Lighthouse performance score improvement

---

## Sub-Issue 2: Implement Responsive Image Sizes and Lazy Loading

### Priority: High 🔴
### Category: Image Optimization
### Estimated Impact: Reduce bandwidth usage by 40-60%

### Problem
- Images are loaded at full resolution regardless of viewport size
- The `sizes` attribute is set to `100vw` for hero images, but many images don't need full viewport width
- No systematic lazy loading strategy for below-the-fold images

### Solution
1. Configure proper `sizes` attribute for different breakpoints:
```tsx
// Hero images
sizes="100vw"

// Content images (in sections)
sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"

// Thumbnail images
sizes="(max-width: 768px) 50vw, 25vw"
```

2. Set appropriate loading strategy:
   - `priority` for above-the-fold hero images only
   - `loading="lazy"` for all other images
   - Use `placeholder="blur"` with blurDataURL for better UX

### Implementation Steps
1. Audit all Image components
2. Update hero.tsx (already has priority - verify it's only on first hero)
3. Add lazy loading to:
   - `/components/blocks/content.tsx`
   - `/components/blocks/page-header.tsx`
   - `/components/blocks/events.tsx`
   - `/components/blocks/instagram-section-block.tsx`

### Expected Results
- Mobile users download 2-3MB instead of 10-15MB
- Faster initial page load
- Better Time to Interactive (TTI)

### Testing
- Use Chrome DevTools Network tab to verify image sizes
- Test on mobile device with throttled connection
- Verify no layout shift (CLS) issues

---

## Sub-Issue 3: Optimize Font Loading Strategy

### Priority: Medium 🟡
### Category: Font Optimization
### Estimated Impact: Reduce render-blocking time by 300-500ms

### Problem
Currently loading 3 Google Fonts in `/app/[locale]/layout.tsx`:
- Inter (FontSans)
- Nunito
- Lato

All fonts are loaded without optimization, potentially blocking render.

### Solution
1. Evaluate if all 3 fonts are necessary
   - Inter is used for general sans-serif
   - Nunito and Lato may be redundant
2. Implement font optimization:
   ```tsx
   const fontSans = Inter({
     subsets: ['latin'],
     variable: '--font-sans',
     display: 'swap', // Add this
     preload: true,
     adjustFontFallback: true,
   });
   ```
3. Consider using `next/font/local` for critical fonts
4. Add font fallbacks in CSS:
   ```css
   font-family: var(--font-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
   ```

### Implementation Steps
1. Audit font usage across components
2. Remove unused fonts if possible
3. Add `display: 'swap'` to all font configurations
4. Configure proper fallback fonts
5. Consider subsetting fonts to include only used characters

### Expected Results
- Eliminate font-related render blocking
- Improve First Contentful Paint (FCP) by 200-400ms
- Better font loading UX (no invisible text)

### Related Files
- `/app/[locale]/layout.tsx`
- `/styles.css` (Tailwind config)

---

## Sub-Issue 4: Code Splitting and Dynamic Import Optimization

### Priority: Medium 🟡
### Category: JavaScript Bundle Optimization
### Estimated Impact: Reduce initial bundle size by 30-40%

### Problem
Heavy dependencies loaded for all pages:
- `mermaid` (11.12.1) - ~500KB
- `motion` (12.23.24) - ~100KB
- `react-player` (dynamically imported, but could be improved)
- `shiki` (syntax highlighting) - ~200KB
- TinaCMS client loaded even for production users

### Solution
1. **Mermaid**: Only load on pages that use diagrams
   ```tsx
   const Mermaid = dynamic(() => import('./mermaid'), {
     ssr: false,
     loading: () => <div>Loading diagram...</div>
   });
   ```

2. **Motion animations**: Consider using CSS animations for simple cases

3. **Shiki**: Only load for blog/code pages

4. **React Player**: Already lazy loaded, but optimize further
   ```tsx
   const ReactPlayer = dynamic(() => import('react-player/lazy'), {
     ssr: false,
     loading: () => <div className="aspect-video bg-gray-200">Loading video...</div>
   });
   ```

5. **TinaCMS**: Ensure it's not bundled in production builds

### Implementation Steps
1. Install bundle analyzer:
   ```bash
   npm install -D @next/bundle-analyzer
   ```
2. Update `next.config.ts`:
   ```ts
   const withBundleAnalyzer = require('@next/bundle-analyzer')({
     enabled: process.env.ANALYZE === 'true',
   });
   ```
3. Analyze current bundle: `ANALYZE=true npm run build`
4. Implement dynamic imports for heavy components
5. Re-analyze and verify improvements

### Expected Results
- Reduce initial bundle from ~300KB to ~150-200KB
- Faster Time to Interactive (TTI)
- Lower Total Blocking Time (TBT)

### Related Files
- `/components/blocks/mermaid.tsx`
- `/components/blocks/video.tsx`
- `/components/blocks/content.tsx` (if using shiki)
- `/next.config.ts`

---

## Sub-Issue 5: Implement Proper Caching Strategy

### Priority: Medium 🟡
### Category: Caching & CDN
### Estimated Impact: Reduce repeat visitor load time by 70-80%

### Problem
Current configuration:
- `revalidate = 3600` (1 hour) for all pages
- No explicit cache headers for static assets
- Missing service worker/PWA capabilities

### Solution
1. **Optimize revalidation times** based on content update frequency:
   ```tsx
   // Rarely updated pages (about, contact)
   export const revalidate = 86400; // 24 hours

   // Home page (events might change)
   export const revalidate = 3600; // 1 hour

   // Blog posts
   export const revalidate = 43200; // 12 hours
   ```

2. **Add cache headers** in `next.config.ts`:
   ```ts
   async headers() {
     return [
       {
         source: '/uploads/:path*',
         headers: [
           {
             key: 'Cache-Control',
             value: 'public, max-age=31536000, immutable',
           },
         ],
       },
     ];
   }
   ```

3. **Consider adding PWA support** for offline capabilities:
   ```bash
   npm install next-pwa
   ```

### Implementation Steps
1. Analyze content update patterns with website owner
2. Set appropriate revalidate values per page type
3. Add cache headers for static assets
4. Configure CDN (Vercel automatically optimizes, but verify settings)
5. Consider implementing PWA if offline access is desired

### Expected Results
- Repeat visitors see near-instant loads
- Reduced server load
- Better caching efficiency
- Potential offline support

### Related Files
- `/app/[locale]/page.tsx`
- `/app/[locale]/[...urlSegments]/page.tsx`
- `/next.config.ts`

---

## Sub-Issue 6: Database Query and Data Fetching Optimization

### Priority: Low 🟢
### Category: Data Fetching
### Estimated Impact: Reduce server-side rendering time by 20-30%

### Problem
Current data fetching in `/app/[locale]/[...urlSegments]/page.tsx`:
- Sequential try-catch for locale fallback
- Potential for duplicate queries
- No apparent query optimization for large content collections

### Solution
1. **Optimize locale fallback logic**:
   ```tsx
   // Instead of try-catch, check if file exists first
   const locales = [locale, 'default'];
   for (const loc of locales) {
     const path = `${loc}/${filepath}.mdx`;
     // Check existence before querying
   }
   ```

2. **Implement query batching** for pages with multiple data dependencies

3. **Add request memoization** to prevent duplicate queries:
   ```tsx
   import { cache } from 'react';

   const getPageData = cache(async (relativePath: string) => {
     return client.queries.page({ relativePath });
   });
   ```

4. **Optimize generateStaticParams**:
   - Current implementation fetches all pages, could be paginated for very large sites
   - Consider caching the result

### Implementation Steps
1. Add React `cache` wrapper to data fetching functions
2. Optimize try-catch logic in page.tsx
3. Profile query performance in development
4. Consider adding GraphQL query optimization if needed

### Expected Results
- Faster server-side rendering
- Reduced API calls to TinaCMS
- Better build times
- Lower serverless function execution time

### Related Files
- `/app/[locale]/[...urlSegments]/page.tsx`
- `/app/[locale]/page.tsx`
- `/tina/__generated__/client.ts`

---

## Sub-Issue 7: Reduce Third-Party Script Impact

### Priority: Low 🟢
### Category: Third-Party Scripts
### Estimated Impact: Improve performance scores by 5-10 points

### Problem
Current third-party integrations:
- Vercel Analytics
- Vercel Speed Insights
- Potential ChurchTools integration (saw client in lib/)

All loaded synchronously in layout.

### Solution
1. **Use Next.js Script component** with appropriate loading strategy:
   ```tsx
   import Script from 'next/script';

   // In layout
   <Script
     src="analytics-url"
     strategy="afterInteractive" // or "lazyOnload"
   />
   ```

2. **Defer non-critical scripts**:
   - Analytics can use `lazyOnload` strategy
   - Speed Insights can be deferred

3. **Self-host analytics** if possible to reduce external dependencies

### Implementation Steps
1. Replace direct imports with Next.js Script components
2. Test analytics still work correctly
3. Verify performance improvement in Lighthouse

### Expected Results
- Reduce main thread blocking time
- Improve TTI
- Better performance scores

### Related Files
- `/app/[locale]/layout.tsx`
- `/lib/clients/` (if any external APIs)

---

## Sub-Issue 8: Enable Compression and Modern Build Optimizations

### Priority: Low 🟢
### Category: Build Configuration
### Estimated Impact: Reduce transfer size by 20-30%

### Problem
- No explicit compression configuration in next.config.ts
- Not using experimental features that could improve performance
- Missing modern build optimizations

### Solution
1. **Update next.config.ts** with optimizations:
   ```ts
   const nextConfig: NextConfig = {
     // Existing config...
     compress: true,

     experimental: {
       optimizePackageImports: ['lucide-react', 'date-fns'],
       serverActions: {
         bodySizeLimit: '2mb',
       },
     },

     compiler: {
       removeConsole: process.env.NODE_ENV === 'production',
     },
   };
   ```

2. **Enable SWC minification** (default in Next.js 15, but verify)

3. **Configure webpack optimizations** if needed:
   ```ts
   webpack: (config, { isServer }) => {
     if (!isServer) {
       config.optimization = {
         ...config.optimization,
         splitChunks: {
           chunks: 'all',
           cacheGroups: {
             default: false,
             vendors: false,
             commons: {
               name: 'commons',
               chunks: 'all',
               minChunks: 2,
             },
           },
         },
       };
     }
     return config;
   }
   ```

### Implementation Steps
1. Add compression and experimental optimizations
2. Test build output
3. Verify all features still work
4. Measure transfer size reduction

### Expected Results
- Smaller JavaScript bundles
- Faster downloads
- Better gzip/brotli compression

### Related Files
- `/next.config.ts`
- `package.json`

---

## Implementation Priority Order

Based on impact and effort:

1. **Week 1-2 (High Priority)** 🔴
   - Sub-Issue 1: Image Optimization (biggest impact)
   - Sub-Issue 2: Responsive Images & Lazy Loading

2. **Week 3-4 (Medium Priority)** 🟡
   - Sub-Issue 3: Font Optimization
   - Sub-Issue 4: Code Splitting
   - Sub-Issue 5: Caching Strategy

3. **Week 5+ (Low Priority)** 🟢
   - Sub-Issue 6: Data Fetching Optimization
   - Sub-Issue 7: Third-Party Scripts
   - Sub-Issue 8: Build Optimizations

## Testing Strategy

After implementing each sub-issue:
1. Run Lighthouse audit
2. Test on slow 3G connection
3. Verify Core Web Vitals:
   - LCP (Largest Contentful Paint) < 2.5s
   - FID (First Input Delay) < 100ms
   - CLS (Cumulative Layout Shift) < 0.1
4. Test across browsers (Chrome, Firefox, Safari)
5. Test on mobile devices

## Monitoring

Set up performance monitoring:
1. Vercel Analytics (already installed)
2. Google PageSpeed Insights - weekly checks
3. WebPageTest.org - monthly deep dives
4. Core Web Vitals tracking

## Notes

- All changes should maintain bilingual support (de/ro)
- Ensure TinaCMS editing experience isn't degraded
- Keep accessibility standards (WCAG 2.1 AA)
- Document all configuration changes
- Update README.md with performance best practices
