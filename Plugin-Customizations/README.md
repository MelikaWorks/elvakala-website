# ELVA KALA Plugin Customizations

This directory contains ELVA KALA-specific extensions, fixes, and integration layers built around third-party WordPress and WooCommerce plugins.

These projects do not represent copies of the original third-party plugins. Their purpose is to add required behavior while keeping vendor core files unchanged whenever possible.

## Included Customizations

### `DenaPay/`

Checkout validation and customer-facing installment-sale rules built around DenaPay, including the Qazvin eligibility restriction, installment notices, discount behavior, shipping information, and original-check delivery guidance.

### `elva-digits-customizations/`

Fixes and extensions for the Digits authentication plugin, including local loading of the `libphonenumber` dependency and validation of the WooCommerce installment checkout flow.

### `Smart-Menu-Hierarchy/`

A limited prototype for managing large hierarchical WooCommerce category and brand structures inside the native WordPress menu editor. The complete implementation is maintained separately.

## Directory Rules

- Store only ELVA-specific extension code and documentation here.
- Do not commit complete third-party plugin packages or vendor source archives.
- Avoid direct edits to third-party plugin core files.
- Keep each customization in its own directory with a dedicated README.
- Document compatibility assumptions and required plugin hooks.
- Mark prototypes, samples, and production code clearly.
- Keep commercial or security-sensitive implementation details private.

## Compatibility

Customizations in this directory may depend on specific behavior from WordPress, WooCommerce, the active theme, Elementor, or the related third-party plugin. They should be reviewed after major dependency updates.

## Deployment

Files in this directory are not automatically interchangeable with installable WordPress plugins. Read the relevant project README before deployment to determine whether the code is a plugin, a snippet, a prototype, or documentation-only material.
