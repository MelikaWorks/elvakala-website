# ELVA KALA — WPCode Snippet Inventory

This document records WPCode snippets reviewed during the September 2026 ELVA KALA maintenance and stabilization work.

It is intended as an operational inventory only. The actual source code for repository-managed snippets is stored in the relevant feature directories under `/snippets/`.

## Status Definitions

| Status        | Meaning                                                     |
| ------------- | ----------------------------------------------------------- |
| `Active`      | Enabled and currently used in production.                   |
| `Inactive`    | Disabled but temporarily retained for review or reference.  |
| `Removed`     | Deleted after confirming that it was obsolete or redundant. |
| `Rolled Back` | Tested but reverted because it caused an unwanted behavior. |

---

## Active Snippets

| Snippet | Type | Status | Purpose | Repository Location |
| ------- | ---- | ------ | ------- | ------------------- |
| `ELVA - Prevent MWEB REST Add-to-Cart` | PHP | Active | Prevents the MWEB theme callback from causing errors during WooCommerce Store API requests. | `/stability-and-debugging/mweb-rest-add-to-cart-guard.php` |
| `ELVA - Hide Digits Search on Mobile Homepage` | CSS | Active | Hides the extra Digits search box and fixes the second sales phone icon on the mobile homepage. | `/snippets/homepage/` |

### MWEB REST Guard

- WPCode ID: `29420`
- Execution: Site-wide initialization with REST-specific behavior
- Validation:
  - WooCommerce Store API returned valid JSON.
  - Product pages loaded successfully.
  - Products could be added to the cart.
  - The WooCommerce cart page remained functional.

### Mobile Homepage Footer Fix

- Execution: Frontend CSS
- Scope: Homepage screens up to `767px`
- Dependencies:
  - Elementor page ID `5332`
  - Elementor element ID `3a4570f`
  - Digits element ID `digits_country_list_wrapper`
- Validation:
  - The extra Digits search box is no longer displayed.
  - The second sales phone icon is correctly aligned.
  - Desktop layout remains unchanged.

---

## Inactive Snippets Retained for Review

The following snippets were observed as inactive during the WPCode audit.

They must not be activated without reviewing their purpose, dependencies, and possible overlap with current production code.

| WPCode ID | Snippet | Status | Notes |
| --------- | ------- | ------ | ----- |
| `29332` | `ELVA - Lazy Load External Trust Badges` | Inactive | Retained for review; may overlap with current performance implementation. |
| `29016` | `ELVA - DenaPay Product Meta Inspector` | Inactive | Diagnostic tool; not required during normal production operation. |
| `28791` | `ELVA - DenaPay Category Based Plans` | Inactive | Legacy installment implementation; replaced by the current installment system. |
| `28782` | `disable-denapay-assets-on-homepage.php` | Inactive | Previous performance experiment affecting DenaPay homepage assets. |
| `28716` | `Homepage WooCommerce CSS Optimization` | Inactive | Previous homepage optimization experiment. |
| `28715` | `JQMIGRATE: Migrate is installed, version 3.4.1` | Inactive | Diagnostic or compatibility-related snippet; not required as an active production customization. |

The current state of these snippets should be verified before the final repository release because the WPCode list may change during cleanup.

---

## Removed Snippets

Unused and obsolete inactive snippets were moved to the WPCode trash after review.

The cleanup was performed to:

- Reduce confusion between current and legacy implementations
- Prevent accidental activation of outdated code
- Remove duplicate or sample snippets
- Keep the production snippet list easier to maintain

The WPCode trash should only be permanently emptied after confirming:

- A stable site backup exists
- The current production site remains healthy
- No removed snippet is required for rollback

---

## Rolled-Back SMS Experiment

An experimental modification related to the SMS plugin was tested during troubleshooting.

The change caused an issue with SMS delivery and was therefore reverted.

**Final status:** `Rolled Back`

- The experimental code is not active.
- The experimental code is not included in this repository.
- The previous working SMS behavior was restored.
- No unsuccessful SMS customization should be re-enabled without controlled testing.

---

## Maintenance Rules

- Do not activate inactive snippets without reviewing their code.
- Avoid maintaining duplicate versions of the same customization.
- Store production source code in the relevant repository directory.
- Keep experimental performance code under `/performance-experiments/`.
- Record WPCode IDs for important production snippets.
- Retest product, cart, checkout, payment, and mobile flows after changing shared snippets.
- Never commit credentials, API keys, tokens, customer data, or private integration values.

---

## Audit Status

**Audit period:** September 2026  
**Production status:** Stable after cleanup and regression testing  
**Final verification required:** Recheck the WPCode list before the public repository release
