# ELVA KALA Code Snippets

This directory contains WordPress, WooCommerce, PHP, CSS, JavaScript, and frontend snippets developed for specific ELVA KALA website features.

Snippets are organized by functional area so that their purpose, deployment location, dependencies, validation evidence, and rollback path remain understandable.

## Directory Structure

| Directory                   | Purpose                                                                                                     |
| --------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `articles/`                 | Blog archive and single-post presentation customizations.                                                   |
| `brand/`                    | Brand descriptions and homepage brand-list behavior.                                                        |
| `cart-sidebar/`             | WooCommerce cart-sidebar behavior, responsive presentation, AJAX compatibility, and validation screenshots. |
| `custom-shortcodes/`        | ELVA-specific contact, call-to-action, and location shortcodes.                                             |
| `homepage/`                 | Homepage-specific modules, mobile footer fixes, Digits UI fixes, and responsive presentation adjustments.   |
| `performance/`              | Production snippets associated with validated optimization work documented under `/performance/`.           |
| `products/`                 | Product archives, product cards, filters, and single-product presentation changes.                          |
| `move-term-description.php` | Taxonomy-description placement adjustment.                                                                  |

## Homepage Snippets

The `homepage/` directory includes customizations limited to the ELVA KALA homepage.

Current documented fixes include:

- Hiding the extra Digits search box displayed below the mobile homepage footer
- Correcting the position of the second sales phone number icon
- Preserving the existing desktop layout
- Restricting responsive fixes to screens up to `767px`

Some homepage fixes depend on Elementor-generated page and element IDs. These dependencies must be reviewed if the affected Elementor template or widget is rebuilt.

## Status and Deployment

Code in this directory may currently be deployed through WPCode, theme-level custom code, Elementor Custom CSS, or another controlled WordPress integration point.

Before enabling a snippet:

1. Read the nearest feature README.
2. Confirm where and how the code is expected to run.
3. Check for dependencies on theme markup, Elementor element IDs, CSS classes, WooCommerce hooks, or third-party plugins.
4. Verify that another copy of the same code is not already active.
5. Confirm the required WPCode execution scope.
6. Keep a rollback path and test all affected frontend, cart, and checkout flows.
7. Clear WordPress, server, CDN, and browser caches when applicable.

## Production vs. Experiments

Rejected or unsuccessful performance experiments do not belong in this directory. They are stored under `/performance-experiments/` and must not be re-enabled without controlled retesting.

A snippet should only be marked as production-ready after its relevant desktop, responsive, functional, and regression tests have passed.

Stable snippets may later be migrated into an ELVA-owned modular plugin. Until that migration is complete, this directory serves as the version-controlled source of record for the corresponding WPCode and frontend customizations.

## Validation Evidence

Feature directories may store before-and-after screenshots either:

- Directly beside the related snippet and README
- Inside a dedicated `screenshots/` subdirectory when several images exist

Screenshots should:

- Use descriptive English filenames.
- Clearly distinguish before-fix and after-fix states.
- Identify special test conditions such as mobile, responsive, or Desktop Site mode.
- Avoid exposing credentials, private customer information, authentication tokens, or administrative data.
- Use controlled HTML width in README files when full-size images are too large.

Example:

```html
<img src="mobile-homepage-footer-before.png"
     alt="Mobile homepage footer before"
     width="350">
```

## Maintenance Rules

- Use descriptive English directory and filenames.
- Keep one clear responsibility per snippet where practical.
- Add comments describing the purpose, scope, dependencies, and rollback method.
- Document whether each snippet is active, inactive, replaced, experimental, or archived.
- Keep Elementor element IDs and other markup dependencies documented.
- Use delegated event handling when WooCommerce AJAX may replace interactive elements.
- Do not modify WordPress, theme, or third-party plugin core files from this directory.
- Do not commit generated cache files or unnecessary build artifacts.
- Never commit credentials, API secrets, customer data, authentication tokens, or environment-specific private values.
