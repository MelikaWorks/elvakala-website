# Repository Review — 2026-11-15

[فارسی (FA)](REPOSITORY_REVIEW_FA.md)

## Scope and checks

Reviewed the recursive repository inventory and fetched all 110 PHP, Markdown, HTML, CSS, JavaScript, and htaccess text files. Checked local Markdown links and HTML image references against the tree, compared key indexes and filename references, and performed targeted static review of custom PHP and embedded JavaScript. This is not a line-by-line security certification or a new live-site audit.

- Three standalone JavaScript files passed `node --check`.
- Five static inline JavaScript blocks passed `node --check`; two PHP-generated blocks were excluded.
- Two broken image paths were found in the Extendify README and corrected.
- Incorrect filename references were corrected for the minified-theme loader, homepage footer stylesheet, Extendify snippet, and two installment screenshots.
- NikSMS and Extendify entries were added to their parent indexes.
- A targeted text scan of PHP and HTML found only placeholder bot tokens in the notification snippets; this is not a complete secret audit.
- Binary screenshots were inventoried but not visually inspected. External URLs and Git history were not audited.
- PHP CLI and a WordPress/WooCommerce runtime were unavailable, so PHP lint, integration tests, and live checkout tests were not run.

## Follow-up findings

| Priority | Finding | Recommended verification |
| --- | --- | --- |
| Before redeployment | [Minified asset loader](../snippets/performance/load-minified-theme.php) references CSS filenames containing ` (1)`, unlike the repository assets. | Check actual server files and Network responses, then align filenames and loader together. No current live 404 is claimed. |
| Before relying on automation | [Rubika](../snippets/order-notifications/README.md) has no concurrent-send lock or scheduled retry, and automatic payment-triggered delivery remains unverified. | Observe the first real paid order; test failure and duplicate-event handling before extending delivery guarantees. |
| Accessibility | [Cart sidebar](../snippets/cart-sidebar/cart-sidebar-repair.php) supports Escape but does not implement focus trapping/restoration or hide closed content from keyboard navigation. | Test keyboard navigation and focus across open/close and cart-fragment updates, then implement a tested accessibility fix. |
| Larger catalogs | [Product filter drawer](../snippets/products/product-filters/product-filter-drawer.php) fetches every matching product ID on taxonomy archives and renders filters for registered attributes. | Measure query count and response time with realistic catalog sizes before adding caching or bounded queries. |
| Historical experiments | The archived MehranPay bootstrap requires absent private `includes/` classes; calculation dry runs use `get_price()` and rounded equal installments. | Do not deploy archived experiments as production. They do not reproduce the later documented Regular Price production engine or guarantee exact rounded totals. |
| Packaging | Historical PHP snippet bodies use mixed opening-tag conventions and depend on site IDs, selectors, hooks, and local assets. | Use the documented WPCode context; do not install the repository as a complete plugin or website. |
| Publication review | Theme CSS/JS source and minified copies exist under `performance/minify-*/`, and a third-party phone library is bundled. | Confirm redistribution permissions and attribution before treating the repository as a reusable public distribution. No license determination was made in this review. |

The live website and executable logic were not changed. This commit corrects documentation and records remaining checks.
