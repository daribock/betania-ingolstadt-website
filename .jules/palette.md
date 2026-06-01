## 2024-05-24 - Accessibility for Icon-Only TinaCMS Links
**Learning:** When rendering TinaCMS dynamic icons as interactive elements (e.g., social links in the footer), it's critical for screen reader accessibility to map the `icon.name` property to an `aria-label` on the wrapping interactive element (like `<Link>` or `<button>`). Otherwise, the elements appear empty to assistive technologies.
**Action:** Always add `aria-label={link?.icon?.name || 'Fallback Text'}` or a visually hidden span containing descriptive text when rendering icon-only buttons or links.
