# ELVA Installment Manager --- Architecture Decisions

This document records important architectural decisions made during the
development of the ELVA Installment Manager plugin.

The purpose of this document is to preserve the reasoning behind
technical decisions and explain why the final architecture was selected.

------------------------------------------------------------------------

# Decision 001 --- Product-Level Installment Rules

## Background

During the investigation of DenaPay installment functionality, we
identified that installment plans can be configured at product level.

DenaPay allows creating custom installment settings directly for
individual WooCommerce products.

Example:

Product A:

-   30% initial payment
-   5 checks

Product B:

-   20% initial payment
-   4 checks

This capability provides the flexibility required by ELVAKALA business
rules.

------------------------------------------------------------------------

# Initial Business Requirement

Installment conditions depend on product groups, categories, and
business rules.

Example:

``` text
Brand: Parnian
Category: Gas Cookers

Rule:
30% prepayment
5 checks
```

``` text
Brand: Bimax
Category: Gas Cookers

Rule:
20% prepayment
4 checks
```

Manually applying these rules to hundreds of products is not practical.

------------------------------------------------------------------------

# Manual Product Configuration Investigation

A WooCommerce product was manually configured with DenaPay installment
settings.

The purpose of this test was to verify:

-   Whether DenaPay supports product-level installment configuration
-   How installment settings are represented on an individual product
-   What information would need to be generated automatically

The result confirmed that DenaPay supports custom installment
configuration directly on products.

However, manually configuring every product is not scalable.

------------------------------------------------------------------------

# Network Investigation

Browser developer tools were used to inspect DenaPay frontend behavior.

The investigation focused on:

-   Loaded DenaPay resources
-   Fetch/XHR requests
-   Frontend activity on WooCommerce product pages

Screenshot:

![DenaPay Product Installment Network
Inspection](../screenshots/denapay-product-installment-network-inspection.png)

Additional Fetch/XHR analysis:

![DenaPay Network Request
Analysis](../screenshots/denapay-network-inspection-fetch-analysis.png)

The investigation showed that frontend network inspection alone was not
sufficient to identify the complete product installment data structure.

------------------------------------------------------------------------

# Product Meta Structure Investigation

A read-only diagnostic tool was created to inspect the actual metadata
stored by DenaPay.

Tool:

``` text
tools/denapay-product-meta-inspector.php
```

The tool reads:

``` text
_denaPay_installment_enabled
```

and:

``` text
_denaPay_installment_plans
```

## Result 01

![DenaPay Product Meta Inspector Result
01](../screenshots/denapay-product-meta-inspector-result-01.png)

## Result 02

![DenaPay Product Meta Inspector Result
02](../screenshots/denapay-product-meta-inspector-result-02.png)

Example structure:

``` php
Array
(
    [0] => Array
        (
            [months] => 5
            [checks] => 5
            [prepayment] => calculated amount
            [check_amount] => calculated amount
            [type] => monthly
        )
)
```

This confirmed that ELVA can generate DenaPay-compatible product
metadata without modifying DenaPay frontend logic.

------------------------------------------------------------------------

# Installment Rule Calculation Test

After identifying the DenaPay data structure, a calculation test was
performed.

The purpose was to verify that ELVA can:

-   Read product pricing data
-   Apply installment rules
-   Calculate prepayment amounts
-   Calculate check amounts
-   Generate the required installment structure

Example:

``` text
Rule:
20% prepayment
5 checks
5 months
```

The test confirmed that ELVA can calculate installment values based on
business rules.

------------------------------------------------------------------------

# Single Product Metadata Write Test

After generating the installment structure, a single product metadata
write test was performed.

The purpose was to verify that:

-   Generated metadata can be stored in WooCommerce product meta
-   The format is accepted by DenaPay
-   Product-level installment handling remains compatible

The metadata written:

``` text
_denaPay_installment_enabled
```

and:

``` text
_denaPay_installment_plans
```

Example:

``` php
Array
(
    [0] => Array
        (
            [months] => 5
            [checks] => 5
            [prepayment] => 7675400
            [check_amount] => 6140320
            [type] => monthly
        )
)
```

The test validated that ELVA can generate DenaPay-compatible metadata.

------------------------------------------------------------------------

# Single Product Update Verification

The generated product metadata was verified on the frontend.

The purpose was to confirm:

-   DenaPay recognizes generated product data
-   Installment options are displayed correctly
-   Behavior matches manually configured installment plans

Screenshot:

![DenaPay Product Installment Frontend
Result](../screenshots/denapay-product-installment-frontend-result.png)

The result confirmed that the generated installment metadata is
compatible with DenaPay product-level installment handling.

At this stage, only a single product update process was verified.

------------------------------------------------------------------------

# Initial Approach --- Automation Bot

Based on the investigation results, the next goal was designing an
automation layer that could:

1.  Find products based on business rules.
2.  Match products with installment rules.
3.  Calculate installment values.
4.  Apply generated installment data automatically.

Expected flow:

``` text
Business Rule
        |
        v
Find Matching Products
        |
        v
Calculate Installment Values
        |
        v
Update Product Installment Data
```

------------------------------------------------------------------------

# Category Rule Dry Run Test

After validating single product processing, a category-based dry run
test was performed.

The purpose was to verify that ELVA can:

-   Find multiple products based on WooCommerce categories
-   Apply rules to product groups
-   Calculate product-specific installment values

Test rule:

``` text
Category:
stove-parnian

Rule:
20% prepayment
5 checks
5 months
```

Dry run flow:

``` text
WooCommerce Category
        |
        v
Find Matching Products
        |
        v
Read Product Prices
        |
        v
Calculate Installment Values
```

Screenshot:

![ELVA DenaPay Category Dry Run
Result](../screenshots/elva-denapay-category-dry-run-result.png)

The result confirmed that ELVA can identify multiple products and
calculate installment values.

At this stage, the system only performs calculation and reporting.

No DenaPay product metadata was modified during this test.
