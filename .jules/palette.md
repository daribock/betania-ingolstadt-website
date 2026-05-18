## 2024-05-19 - Accessible Dynamic CMS Icons
**Learning:** Dynamic CMS icons (like those from TinaCMS) rendered as interactive elements (e.g., social links in the footer) often lack text content, making them inaccessible to screen readers.
**Action:** Always programmatically map the `icon.name` property (or provide a sensible fallback) to an `aria-label` attribute on the wrapping interactive element (e.g., `<Link aria-label={icon.name}>`). Additionally, ensure proper keyboard accessibility by adding focus styles like `focus-visible:ring-2`.
