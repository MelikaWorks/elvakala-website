# ELVA KALA Website Engineering

This repository documents the custom engineering, frontend development, plugin extensions, performance work, experiments, and operational improvements developed for the ELVA KALA WooCommerce website.

The repository is organized by type of work so that production snippets, third-party plugin customizations, independently developed plugins, Elementor components, performance evidence, and discontinued experiments remain clearly separated.

## Repository Structure

| Directory | Purpose |
| --- | --- |
| `Plugin-Customizations/` | Custom behavior built around third-party WordPress plugins without publishing or modifying their original source code. |
| `docs/` | Cross-project documentation, technical notes, decisions, and future repository-level guides. |
| `elementor/` | Elementor page, header, footer, menu, layout, and responsive customizations. |
| `performance/` | Validated performance investigations, implementation references, test evidence, and Lighthouse results. |
| `performance-experiments/` | Rejected or rolled-back performance experiments retained to prevent repeating unsuccessful work. |
| `plugins/` | Plugins, plugin prototypes, and engineering projects developed specifically for ELVA KALA. |
| `screenshots/` | Shared repository-level visual evidence that does not belong to one specific component directory. |
| `seo/` | SEO audits, checks, evidence, and related documentation. |
| `snippets/` | Active or archived WordPress, WooCommerce, PHP, CSS, and frontend snippets organized by feature. |

## Organization Rules

- Third-party plugin source archives are not stored in this repository.
- Customizations around third-party plugins belong in `Plugin-Customizations/`.
- Plugins and plugin projects developed for ELVA KALA belong in `plugins/`.
- Production snippets and experimental code must remain separated.
- Rejected experiments should be documented with their results and rollback reason.
- Screenshots should normally be stored beside the implementation or document they support.
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
2. Check whether it is a production implementation, prototype, or rolled-back experiment.
3. Review dependencies on the active theme, Elementor structure, WooCommerce, and third-party plugins.
4. Test on a staging or controlled environment when possible.
5. Keep a rollback copy and avoid editing third-party plugin core files directly.

## Project Status

This repository is an evolving technical record of the ELVA KALA website. Individual directories may contain production code, documentation-only artifacts, prototypes, or historical experiments; their local README files are the authoritative status reference.
