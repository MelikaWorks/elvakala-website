# ELVA KALA — Stability and Debugging

Production debugging notes, defensive patches, and validation evidence for the ELVA KALA WordPress/WooCommerce store.

This directory documents issues that were reproduced, isolated, fixed, and retested during September 2026. It intentionally excludes commercial plugin/theme source code, raw server logs, credentials, license data, payment information, and private synchronization components.

## Directory Structure

```text
stability-and-debugging/
├── README.md
├── mweb-rest-add-to-cart-guard.php
├── bazara-warning-fixes.md
├── error-log-analysis-2026-09.md
└── screenshots/
    └── store-api-add-to-cart-after.png
```

## Resolved Issues

### 1. MWEB Store API fatal error

The encoded MWEB theme callback `custom_woocommerce_product_add_to_cart_text()` expected a valid global WooCommerce product. During WooCommerce Store API requests, that object could be `null`, causing:

```text
Call to a member function get_type() on null
```

Because the affected theme file was ionCube-encoded, it was not modified directly. A defensive WPCode snippet removes only the incompatible callback during REST requests while preserving normal storefront behavior.

Validation:

- WooCommerce Store API returned valid product JSON.
- Product pages loaded normally.
- Add to Cart completed successfully.
- The cart displayed the product, quantity, price, and subtotal.
- The fatal error did not return in the fresh error log.

Implementation: [`mweb-rest-add-to-cart-guard.php`](mweb-rest-add-to-cart-guard.php)

### 2. Bazara missing `active_auto_sync` request key

A direct read of `$_REQUEST['active_auto_sync']` generated an undefined-array-key warning when the field was absent. The input is now existence-checked, unslashed, sanitized, converted to boolean, and given a safe `false` default.

### 3. Bazara empty product attribute key

The synchronization code used `array_key_first()` and immediately accessed the returned key. Products without attributes could therefore generate an undefined-array-key warning. The code now validates the key and value before checking its object type.

### 4. Bazara price and discount conditions

Two price/discount collection conditions contained trailing semicolons, making the conditions ineffective. The loops were replaced with guarded `isset()` and non-empty checks before values were added.

Validation:

- A real price change was made in the accounting system.
- The update reached Bazara and WooCommerce.
- Regular price changed from `13,650,000` to `13,649,000` toman.
- The 40% discounted price changed from `8,190,000` to `8,189,400` toman.
- Installment calculations continued to work.
- No new error log was created after synchronization.

Details: [`bazara-warning-fixes.md`](bazara-warning-fixes.md)

## Error Log Review

The historical server log had grown to approximately 189 MB. A fresh-log workflow was used to separate current failures from historical noise. The raw log is not included in this repository.

The review identified:

- Repeated MWEB Store API fatal errors — resolved.
- Bazara warnings at the former lines 253 and 1366 — resolved.
- Historical SMS and survey-table errors — not reproduced after reset.
- A one-time WordPress Cron write collision during bulk product deletion — not reproduced.
- An isolated `ABSPATH` error — monitor only if it returns.

Details: [`error-log-analysis-2026-09.md`](error-log-analysis-2026-09.md)

## Deployment Notes

- The REST guard is installed as a PHP WPCode snippet.
- Insertion mode: Auto Insert.
- Location: Run Everywhere.
- The guard only changes REST request behavior.
- Commercial plugin and theme files are not distributed here.
- Re-test after major WooCommerce or theme updates.

## Status

`STABLE / VALIDATED — 2026-09-26`

