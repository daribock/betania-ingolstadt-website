## 2025-02-28 - Focus States for Next.js Links
**Learning:** Next.js `<Link>` components, especially those wrapping images (like logos) or text with utility classes for font colors, often lack default focus rings for keyboard navigation.
**Action:** Explicitly add `focus-visible` Tailwind classes (e.g., `focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-hidden rounded-sm`) to custom Next.js `<Link>` components. For links wrapping images, ensure they have `inline-block` so the focus ring correctly wraps the image.

## 2025-03-02 - Radix UI Select Accessibility
**Learning:** For Radix UI `Select` components, placing an accessible label in an adjacent `<span className="sr-only">` does not correctly associate the label with the interactive `<SelectTrigger>` button.
**Action:** When a visual `<label>` is not present, add `aria-label` directly to the `<SelectTrigger>` component to ensure screen readers correctly announce the button's purpose.
