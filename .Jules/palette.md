## 2024-05-01 - Missing ARIA Labels on Dynamically Generated Social Links
**Learning:** In dynamically generated icon-only link lists (like social links in a footer), the `aria-label` is often overlooked because the visible component is an abstract `<Icon />` that doesn't inherently contain text. Screen readers encounter an empty link.
**Action:** When mapping over dynamic data to create icon-only links, always ensure the data source includes a name/label field and explicitly apply it as an `aria-label` to the wrapping anchor tag.
