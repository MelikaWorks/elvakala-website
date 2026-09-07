# ELVA Installment Sales Enhancements

> Addressing Limitations in DenaPay-Based Installment Sales for ELVA

Engineering case study, investigation record, and safe diagnostic experiments
for improving and extending DenaPay-based installment sales in WooCommerce.

> This repository is not the commercial plugin. The production Rules Manager,
> bulk synchronization engine, Bazara/Mahak listener, and automatic price-sync
> implementation are intentionally private.

[Persian README](README.fa.md)

## The problem

DenaPay supported global installment plans and manually configured
product-level plans. ELVA KALA needed different percentage-based rules for
different product groups without editing hundreds of products one by one.

Example:

```text
Product group A → 30% prepayment, 5 checks
Product group B → 20% prepayment, 4 checks
```

Two architectures were investigated.

## Approach A — MehranPay plan filtering

The first approach extended DenaPay's default plan editor with:

- Global or category-specific scope
- WooCommerce category selection
- Backward-compatible global behavior for existing plans
- Product-specific plan priority

The settings UI worked, but DenaPay consumed global plans through several
independent internal paths. Filtering only one path could make the product
page, cart, and checkout disagree. A test product still displayed all three
plans despite category scopes.

This approach was rolled back and is preserved as an archived experiment.

[Read the MehranPay experiment](docs/03-approach-a-mehranpay-filtering.md)

## Approach B — Product metadata automation

The successful direction used DenaPay's native product-level metadata format:

```text
Business rule
  → match WooCommerce products
  → read current price
  → calculate fixed amounts
  → write DenaPay-compatible product metadata
  → let DenaPay render and process the plan
```

Validated milestones:

- Inspected manually saved product metadata
- Reproduced the percentage calculation
- Wrote a generated plan to one controlled product
- Verified native DenaPay storefront rendering
- Calculated a category dry run for 13 products
- Built and tested private rule-management CRUD
- Ran a controlled 13-product synchronization
- Added an explicit rule-application action for matching products
- Verified automatic recalculation after a WooCommerce product-price save

The production follow-up confirmed that all 13 matched Bimax products could be
synchronized without skips. A controlled Parnian product-price save also
triggered the automatic listener, matched the stored category rule, recalculated
the installment amounts from Regular Price, and rendered the corrected values
on the storefront.

[Read the metadata approach](docs/04-approach-b-product-metadata.md)

## Post-release fixes

Two integration issues were identified and resolved after the initial
production rollout:

- Saved category rules were persisted but were not written to matching products.
- Fixed installment amounts were not recalculated after product-price updates.

The Rules Manager now separates rule persistence from an explicit
**Apply to products** operation. Automatic recalculation now listens to the
WooCommerce product-save path used by the installed Bazara version, while the
Bazara importer-specific event remains available as a fallback.

[Read the complete post-release fix report and test evidence](post-release-fixes/README.md)

## Repository structure

```text
docs/
  01-problem-and-requirements.md
  02-denapay-behavior-analysis.md
  03-approach-a-mehranpay-filtering.md
  04-approach-b-product-metadata.md
  05-rule-management-and-controlled-sync.md
  06-price-change-and-bazara-integration.md
  07-checkout-validation.md
  08-test-results.md
  09-architecture-decisions.md
  10-publication-boundary.md
experiments/
  mehranpay/
  metadata-investigation/
post-release-fixes/
  README.md
  01-before-bimax-old-2-installment-plan.jpg
  02-before-rules-saved-but-not-applied.jpg
  03-after-apply-action-13-products-synced.jpg
  04-after-bimax-rule-applied.jpg
  05-before-bazara-hook-waiting.jpeg
  06-before-installment-price-not-synced.jpeg
  07-after-price-and-installments-synced.png
  08-after-auto-sync-success.jpg
screenshots/
  approach-a-mehranpay/
  approach-b-metadata/
  rule-management/
  controlled-sync/
  price-sync/
  checkout-validation/
```

## Public experimental code

Only bounded research artifacts are included:

- Archived MehranPay admin-field and filtering prototypes
- Read-only DenaPay product-meta inspector
- Calculation-only single-product test
- Category calculation dry run

None of the included scripts is a supported production endpoint or installable
commercial plugin.

## Status

The product-metadata architecture, explicit category-rule application,
controlled batch synchronization, and automatic installment recalculation after
product-price saves have been validated successfully.

Post-release verification included a 13-product category sync with no skipped
products, storefront calculation checks using Regular Price rather than Sale
Price, and a successful product-save event with a matched Parnian category rule.

[View the post-release verification report](post-release-fixes/README.md)

## Disclaimer

DenaPay, WooCommerce, WordPress, Bazara, and Mahak are third-party products or
platforms. This independent case study includes no third-party plugin archive,
credentials, customer records, or complete third-party source files.
