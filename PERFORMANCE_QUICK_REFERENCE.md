# Performance Improvement Quick Reference

This guide provides quick commands and checks for implementing the performance improvements outlined in PERFORMANCE_IMPROVEMENTS.md.

## Quick Start

1. **Analyze Current Performance**
   ```bash
   # Run Lighthouse audit
   npm run build
   npm run start
   # Open Chrome DevTools > Lighthouse > Run audit

   # Analyze bundle size
   npm install -D @next/bundle-analyzer
   ANALYZE=true npm run build
   ```

2. **Convert Images to Modern Formats**
   ```bash
   npm install -D sharp
   node scripts/convert-images.js
   ```

3. **Check Image Sizes**
   ```bash
   du -sh public/uploads/
   ls -lh public/uploads/church/*.{png,jpg}
   ```

## Performance Checklist

### Image Optimization
- [ ] Convert large PNGs to WebP/AVIF
- [ ] Configure responsive image sizes
- [ ] Add lazy loading to below-fold images
- [ ] Use `priority` only for hero images
- [ ] Add blur placeholders

### Font Optimization
- [ ] Add `display: 'swap'` to font configs
- [ ] Remove unused fonts
- [ ] Configure fallback fonts
- [ ] Consider font subsetting

### Code Optimization
- [ ] Dynamic import for Mermaid
- [ ] Optimize ReactPlayer import
- [ ] Lazy load Shiki
- [ ] Remove TinaCMS from production bundle

### Caching
- [ ] Set appropriate revalidate times
- [ ] Add cache headers for static assets
- [ ] Configure CDN settings

### Build Configuration
- [ ] Enable compression
- [ ] Configure bundle splitting
- [ ] Remove console logs in production
- [ ] Optimize package imports

## Core Web Vitals Targets

| Metric | Good | Needs Improvement | Poor |
|--------|------|-------------------|------|
| LCP    | ≤ 2.5s | ≤ 4.0s | > 4.0s |
| FID    | ≤ 100ms | ≤ 300ms | > 300ms |
| CLS    | ≤ 0.1 | ≤ 0.25 | > 0.25 |

## Testing Commands

```bash
# Type check
npm run lint:tsc

# Lint
npm run lint

# Build
npm run build

# Start production server
npm run start

# Development with Turbopack
npm run dev
```

## Useful Tools

- **Lighthouse**: Chrome DevTools > Lighthouse
- **PageSpeed Insights**: https://pagespeed.web.dev/
- **WebPageTest**: https://www.webpagetest.org/
- **Bundle Analyzer**: `ANALYZE=true npm run build`
- **Chrome DevTools**:
  - Network tab (throttle to Slow 3G)
  - Performance tab (record page load)
  - Coverage tab (check unused code)

## Common Image Optimization

```tsx
// Hero image (above fold)
<Image
  src="/uploads/hero.webp"
  alt="Hero"
  fill
  priority
  quality={80}
  sizes="100vw"
/>

// Content image (below fold)
<Image
  src="/uploads/content.webp"
  alt="Content"
  width={800}
  height={600}
  loading="lazy"
  quality={75}
  sizes="(max-width: 768px) 100vw, 50vw"
/>

// Thumbnail
<Image
  src="/uploads/thumb.webp"
  alt="Thumbnail"
  width={300}
  height={200}
  loading="lazy"
  quality={70}
  sizes="(max-width: 768px) 50vw, 25vw"
/>
```

## Font Optimization Example

```tsx
const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',           // Add this
  preload: true,             // Add this
  adjustFontFallback: true,  // Add this
});
```

## Dynamic Import Examples

```tsx
// Heavy component (Mermaid)
const Mermaid = dynamic(() => import('./mermaid'), {
  ssr: false,
  loading: () => <div>Loading diagram...</div>
});

// Video player
const ReactPlayer = dynamic(() => import('react-player/lazy'), {
  ssr: false,
  loading: () => <div className="aspect-video bg-gray-200">Loading...</div>
});
```

## Cache Headers Example

```ts
// next.config.ts
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

## Performance Budget

Set these as targets:

- **Initial JS bundle**: < 200KB (gzipped)
- **Total page weight**: < 1MB
- **Image weight**: < 500KB per page
- **Lighthouse score**: > 90
- **LCP**: < 2.5s
- **TBT**: < 300ms

## Monitoring

After each change:
1. Run Lighthouse audit
2. Check Network tab (throttled to Slow 3G)
3. Verify Core Web Vitals
4. Test on real mobile device
5. Document improvements

## Resources

- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Next.js Font Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
- [Web.dev Performance](https://web.dev/performance/)
- [Core Web Vitals](https://web.dev/vitals/)
