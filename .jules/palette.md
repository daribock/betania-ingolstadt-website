## 2024-05-03 - [Mobile Menu Accessibility]
**Learning:** Found the mobile menu toggle button in `components/layout/nav/header.tsx` was missing critical accessibility attributes like `aria-expanded` and `aria-controls`. This pattern of interactive toggles without explicit screen reader communication was present.
**Action:** Applied standard `aria-expanded` dynamically tied to state and paired it with `aria-controls` referencing an added ID on the target container. Future interactive toggles in this app should explicitly establish relationship and state through ARIA attributes.
