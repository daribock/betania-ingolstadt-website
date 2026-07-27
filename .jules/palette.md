## 2025-02-28 - Focus States for Next.js Links
**Learning:** Next.js `<Link>` components, especially those wrapping images (like logos) or text with utility classes for font colors, often lack default focus rings for keyboard navigation.
**Action:** Explicitly add `focus-visible` Tailwind classes (e.g., `focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-hidden rounded-sm`) to custom Next.js `<Link>` components. For links wrapping images, ensure they have `inline-block` so the focus ring correctly wraps the image.

## 2025-02-28 - Radix UI Select Accessibility
**Learning:** Radix UI `Select` components that do not have a visual label should use `aria-label` directly on the `<SelectTrigger>` rather than placing an adjacent visually hidden element (like `<span className="sr-only">`). Using a separate hidden element can lead to poor programmatic association for screen readers.
**Action:** Apply the `aria-label` attribute directly to the `<SelectTrigger>` when omitting a visual `<label>` for Radix UI `Select` components.
