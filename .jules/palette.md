## 2025-02-28 - Focus States for Next.js Links
**Learning:** Next.js `<Link>` components, especially those wrapping images (like logos) or text with utility classes for font colors, often lack default focus rings for keyboard navigation.
**Action:** Explicitly add `focus-visible` Tailwind classes (e.g., `focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-hidden rounded-sm`) to custom Next.js `<Link>` components. For links wrapping images, ensure they have `inline-block` so the focus ring correctly wraps the image.
