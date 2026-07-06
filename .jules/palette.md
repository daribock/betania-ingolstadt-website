## 2025-02-28 - Focus States for Next.js Links
**Learning:** Next.js `<Link>` components, especially those wrapping images (like logos) or text with utility classes for font colors, often lack default focus rings for keyboard navigation.
**Action:** Explicitly add `focus-visible` Tailwind classes (e.g., `focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-hidden rounded-sm`) to custom Next.js `<Link>` components. For links wrapping images, ensure they have `inline-block` so the focus ring correctly wraps the image.

## 2026-07-06 - Focus States for Interactive Elements
**Learning:** Custom interactive elements, like custom buttons used for mobile menus, can lack default focus rings for keyboard navigation. While ARIA labels are essential, visual feedback for focus state is just as crucial for keyboard users to understand where they are.
**Action:** Always ensure custom interactive elements like custom buttons have explicit `focus-visible` Tailwind classes (e.g., `focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-hidden rounded-sm`) applied.
