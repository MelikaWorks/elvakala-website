# ELVA KALA Website Engineering

This repository documents the custom engineering, frontend development, plugin extensions, stability fixes, performance work, experiments, and operational improvements developed for the ELVA KALA WooCommerce website.

The repository is organized by type of work so that production snippets, third-party plugin customizations, independently developed plugins, stability investigations, Elementor components, performance evidence, and discontinued experiments remain clearly separated.

## Repository Structure

Every current top-level directory is listed below. Follow its README for implementation details and historical validation evidence.

| Directory | Current contents |
| --- | --- |
| [Plugin-Customizations/](Plugin-Customizations/README.md) | DenaPay checkout rules, Digits dependency fixes, Smart Menu Hierarchy prototype, and NikSMS configuration. |
| [analytics-search-console/](analytics-search-console/README.md) | Google Search Console ownership, sitemap and indexing checks; GA4 installation and realtime verification. |
| [elementor/](elementor/README.md) | About and contact pages, homepage sections, footer columns, responsive header, main menu, and special-offer timer fix. |
| [performance/](performance/README.md) | Asset and image optimization, LCP, CSS/JS minification, render-blocking investigations, cache configuration, and final Lighthouse evidence. |
| [performance-experiments/](performance-experiments/README.md) | Rejected jQuery Migrate and homepage WooCommerce CSS experiments, with rollback reasons. |
| [plugins/](plugins/README.md) | Installment-management engineering case study, research artifacts, architecture decisions, and post-release validation; production engine remains private. |
| [screenshots/](screenshots/README.md) | Shared visual evidence and screenshot organization guidance. |
| [seo/](seo/README.md) | Broken-link investigation and evidence; other SEO audit categories are future scope. |
| [snippets/](snippets/README.md) | Article and brand presentation, cart sidebar, shortcodes, homepage fixes, order notifications and tests, performance snippets, and product interfaces. |
| [stability-and-debugging/](stability-and-debugging/README.md) | Bazara warning fixes, MWEB REST compatibility guard, error-log investigation, and regression evidence. |

This is a curated engineering record, not a complete WordPress installation or a restorable site backup. Status labels describe the documented checks at their recorded dates; this README is not a new live-site audit.

## Project Guide

| Area | Implementation and evidence |
| --- | --- |
| Installment sales enhancements | [Case study](plugins/elva-installment-manager/README.md), [post-release fixes](plugins/elva-installment-manager/post-release-fixes/README.md), and [DenaPay customization](Plugin-Customizations/DenaPay/README.md). Covers category rules, controlled product synchronization, price-change recalculation, and checkout restrictions. |
| Authentication and checkout dependency | [Digits customizations](Plugin-Customizations/elva-digits-customizations/README.md): local libphonenumber loading and checkout verification. |
| Menu management prototype | [Smart Menu Hierarchy](Plugin-Customizations/Smart-Menu-Hierarchy/README.md): limited sample for hierarchical category and brand menus; full implementation is maintained separately. |
| Page and navigation design | [Elementor components](elementor/README.md): pages, header, footer, homepage, mega menu, and [special-offer timer fix](elementor/special-offer-slider-timer-fix/README.md). |
| Storefront snippets | [Articles](snippets/articles/README.md), [brands](snippets/brand/README.md), [cart sidebar](snippets/cart-sidebar/README.md), [shortcodes](snippets/custom-shortcodes/README.md), [homepage](snippets/homepage/README.md), and [products](snippets/products/README.md). |
| Performance | [Optimization report](performance/README.md), [executable snippets](snippets/performance/), and [rolled-back experiments](performance-experiments/README.md). |
| Analytics and search visibility | [Search Console and GA4](analytics-search-console/README.md), plus [broken-link checks](seo/broken-links/README.md). |
| Reliability and operations | [Stability investigations](stability-and-debugging/README.md) and [WPCode inventory](snippets/WPCODE-INVENTORY.md). |
| Order notifications | [Rubika code and guides](snippets/order-notifications/README.md), [diagnostic tests](snippets/order-notifications/tests/README.md), and [NikSMS configuration](Plugin-Customizations/NikSMS/README.md). |

## Validated Production Work

### DenaPay Installment Flow

The ELVA KALA-specific DenaPay integration includes customer-facing installment notices, Qazvin province eligibility rules, server-side validation, Checkout feedback, shipping information, and check-delivery guidance.

The final production validation also confirmed:

- Removal of the unintended additional 10% installment discount
- Correct separation of cash promotional pricing and installment base pricing
- Successful end-to-end price synchronization through `Mahak → Bazara → WooCommerce → DenaPay`
- Correct installment recalculation after a real product price update
- Successful mobile and desktop regression tests

**Status:** `Stable / Operational Pass`

Private Listener and synchronization components are intentionally excluded from the public repository.

### Bazara Synchronization Stability

The Bazara integration was reviewed after repeated PHP warnings appeared in the production error log.

The documented fixes include:

- Correcting two malformed Price and Discount loops
- Guarding access to the `active_auto_sync` option
- Preventing access to an empty product-attribute key
- Verifying a real Mahak/Bazara price synchronization
- Confirming that no new related `error_log` file was generated after the final test

Only the ELVA KALA-specific fixes and technical documentation are stored in this repository. The original Bazara plugin is not redistributed.

**Status:** `Fixed / Production Verified`

### MWEB WooCommerce REST Compatibility

A REST-specific compatibility guard prevents the active MWEB theme callback from causing a fatal error during WooCommerce Store API requests.

Validation covered:

- WooCommerce Store API responses
- Product-page loading
- Add-to-cart behavior
- Cart-page loading

**Status:** `Fixed / Production Verified`

### Mobile Homepage Footer

The mobile homepage footer includes a scoped CSS correction that:

- Hides an extra search box generated by Digits
- Corrects the position of the second sales phone number icon
- Preserves the existing desktop layout

Before-and-after screenshots and implementation notes are stored under `snippets/homepage/`.

**Status:** `Stable`

## Order Notifications — November 2026

Order notifications cover the existing NikSMS plugin configuration and a custom Rubika WPCode integration.

| Component | Contents | Documentation |
| --- | --- | --- |
| Rubika order notifications | Sanitized payment-complete snippet, recipient setup, installation steps, and limitations. | [English](snippets/order-notifications/README.md) · [فارسی (FA)](snippets/order-notifications/README_FA.md) |
| Rubika diagnostic tests | Initial connectivity test and manual button test using `TEST-123`, with execution steps and recorded results. | [English](snippets/order-notifications/tests/README.md) · [فارسی (FA)](snippets/order-notifications/tests/README_FA.md) |
| NikSMS order notifications | Existing Persian WooCommerce SMS plugin configuration for customer and administrator notifications. | [English](Plugin-Customizations/NikSMS/README.md) · [فارسی (FA)](Plugin-Customizations/NikSMS/README_FA.md) |
| Verification record | Completed checks, pending real-payment validation, and deduplication limitations. | [Test record](snippets/order-notifications/verification.md) |

**Status:** Manual Rubika delivery succeeded for both configured accounts. Automatic delivery after a real payment remains pending verification. SMS delivery was reported working during setup.

Production and diagnostic snippets are stored separately. Diagnostic snippets should be disabled after use. Tokens, phone numbers, production chat IDs, and third-party plugin source code are excluded.

## WPCode Management

Production and legacy WPCode snippets are documented in the [WPCode inventory](snippets/WPCODE-INVENTORY.md).

The inventory records active, inactive, removed, and rolled-back snippets reviewed during maintenance.

Experimental or unsuccessful snippets must not be re-enabled without reviewing their documented result and performing controlled regression tests.

## Stability and Error-Log Documentation

The `stability-and-debugging/` directory contains:

- Bazara warning-fix documentation
- MWEB REST add-to-cart compatibility code
- Production error-log analysis
- Validation and regression evidence

Observed errors are distinguished from confirmed fixes. One-time or non-reproduced warnings are not described as resolved unless a verified corrective change was applied.

## Organization Rules

- Third-party plugin source archives are not stored in this repository.
- Customizations around third-party plugins belong in `Plugin-Customizations/`.
- Plugins and plugin projects developed for ELVA KALA belong in `plugins/`.
- Production snippets and experimental code must remain separated.
- Rejected experiments should be documented with their results and rollback reason.
- Cross-component runtime errors and verified compatibility fixes belong in `stability-and-debugging/`.
- Screenshots should normally be stored beside the implementation or document they support.
- A dedicated `screenshots/` subdirectory is optional for small feature directories.
- Sensitive credentials, customer data, API secrets, private keys, and production backups must never be committed.

## Commercial and Private Components

Some ELVA KALA solutions include commercial or operationally sensitive components. Public documentation may describe the problem, investigation, architecture, validation, and safe experiments without publishing the complete production implementation.

Private components may include:

- Production rule-management interfaces
- Bulk synchronization engines
- Automated product-metadata writers
- External-system listeners and recovery logic
- Credentials and environment-specific configuration
- Installable commercial plugin packages

Each project README defines its own publication boundary.

## Maintenance

Before enabling code on production:

1. Confirm its status in the nearest README.
2. Check whether it is a production implementation, prototype, inactive snippet, or rolled-back experiment.
3. Review dependencies on the active theme, Elementor structure, WooCommerce, and third-party plugins.
4. Verify that another copy of the same code is not already active in WPCode, Elementor, the theme, or a plugin.
5. Test on a staging or controlled environment when possible.
6. Keep a rollback copy and avoid editing third-party plugin core files directly whenever possible.
7. Retest affected product, cart, Checkout, payment, REST API, responsive, and synchronization flows.
8. Review the production error log after changes that affect shared WordPress or WooCommerce behavior.

## Performance Status

Validated performance work includes responsive image delivery, selected WebP conversion, homepage asset cleanup, browser caching, page caching, cart-sidebar repair, and LCP improvements.

Performance test scores may vary between runs and environments. Final conclusions should be based on multiple tests under consistent conditions rather than a single Lighthouse or GTmetrix result.

The [final homepage Lighthouse baseline](performance/README.md#final-lighthouse-baseline), recorded on **2026-09-26**, reports Performance **72**, Accessibility **86**, Best Practices **100**, SEO **100**, LCP **3.2 s**, and CLS **0.001**. The documented optimization phase is marked **Stable / Final QA Passed**. Remaining opportunities are recorded limitations, not a claim that all performance issues have been eliminated.

Rejected approaches remain in [performance-experiments/](performance-experiments/README.md). These are historical measurements, not current live-site scores.

## Repository Review

The [2026-11-15 repository review](stability-and-debugging/REPOSITORY_REVIEW.md) ([فارسی FA](stability-and-debugging/REPOSITORY_REVIEW_FA.md)) records documentation fixes, syntax checks, and remaining deployment and code-review findings. It does not replace live WordPress testing.

## Project Status

This repository is an evolving technical record of the ELVA KALA website. Individual directories may contain production code, documentation-only artifacts, prototypes, inactive snippets, or historical experiments; their local README files are the authoritative status reference.

The repository records September 2026 stability and checkout validation, installment-system post-release fixes, the final performance baseline, Search Console and GA4 verification, and November 2026 notification setup. Verification scope differs by component: Rubika manual delivery passed, while automatic delivery after a real payment remains unverified.

## Author

👩‍💻 **Melika Mehranpour**

Senior Software Engineer | Full Stack .NET Developer | Enterprise Applications

### Technologies

**Professional technology stack:** C# • .NET • ASP.NET Core • SQL Server • PostgreSQL • Power BI • Python • .NET MAUI

**Technologies used in this repository:** WordPress • WooCommerce • PHP • JavaScript • CSS • HTML • Elementor

### Connect with Me

- [LinkedIn](https://www.linkedin.com/in/melika-mehranpour-41b627161/)
- [GitHub](https://github.com/MelikaWorks)

---

## License

No repository-wide license has been added at this time. The repository includes custom ELVA KALA work and documentation referencing third-party commercial components. Individual files and third-party components may have separate licensing or publication restrictions.
