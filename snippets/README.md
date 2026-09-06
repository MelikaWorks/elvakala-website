# ELVA KALA Code Snippets

This directory contains WordPress, WooCommerce, PHP, CSS, JavaScript, and frontend snippets developed for specific ELVA KALA website features.

Snippets are organized by functional area so that their purpose, deployment location, dependencies, and rollback path remain understandable.

## Directory Structure

| Directory | Purpose |
| --- | --- |
| `articles/` | Blog archive and single-post presentation customizations. |
| `brand/` | Brand descriptions and homepage brand-list behavior. |
| `custom-shortcodes/` | ELVA-specific contact, call-to-action, and location shortcodes. |
| `homepage/` | Homepage-specific snippets and future homepage modules. |
| `performance/` | Production snippets associated with validated work documented under `/performance/`. |
| `products/` | Product archives, product cards, filters, and single-product presentation changes. |
| `move-term-description.php` | Taxonomy-description placement adjustment. |

## Status and Deployment

Code in this directory may currently be deployed through WPCode, theme-level custom code, Elementor custom CSS, or another controlled WordPress integration point.

Before enabling a snippet:

1. Read the nearest feature README.
2. Confirm where the code is expected to run.
3. Check for dependencies on theme markup, Elementor classes, WooCommerce hooks, or third-party plugins.
4. Verify that another copy is not already active.
5. Keep a rollback copy and test the affected frontend and checkout paths.

## Production vs. Experiments

Rejected performance experiments do not belong here. They are stored under `/performance-experiments/` and must not be re-enabled without controlled retesting.

Stable snippets may later be migrated into an ELVA-owned modular plugin. Until that migration is complete, this directory serves as the version-controlled source of record for the corresponding WPCode and frontend customizations.

## Maintenance Rules

- Use descriptive English filenames.
- Keep one clear responsibility per snippet where practical.
- Add comments describing purpose, scope, and dependencies.
- Document whether the snippet is active, inactive, replaced, or archived.
- Do not modify third-party plugin core files from this directory.
- Never commit credentials, API secrets, customer data, or environment-specific private values.

