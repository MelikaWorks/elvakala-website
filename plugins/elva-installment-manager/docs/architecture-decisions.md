# ELVA Installment Manager — Architecture Decisions

This document records important architectural decisions made during the development of the ELVA Installment Manager plugin.

The purpose of this document is to preserve the reasoning behind technical decisions and explain why the final architecture was selected.

---

# Decision 001 — Product-Level Installment Rules

## Background

During the investigation of DenaPay installment functionality, we identified that installment plans can be configured in two different ways:

1. Global installment configuration
2. Product-level custom installment configuration

The product-level configuration allows defining specific installment rules directly for individual WooCommerce products.

Example:

Product A:

- 30% initial payment
- 5 checks

Product B:

- 20% initial payment
- 4 checks

This capability provides the flexibility required by ELVAKALA business rules.

---

## Initial Business Requirement

The business requirement was not only based on individual products.

Installment conditions depend on product groups, categories, and business rules.

Examples:

```
Brand: Parnian
Category: Built-in Gas Cookers

Rule:
30% initial payment
5 checks
```

```
Brand: Bimax
Category: Built-in Gas Cookers

Rule:
20% initial payment
4 checks
```

Different product groups may require different installment conditions.

---

## Problem

Although DenaPay supports product-level installment configuration, manually configuring products is not scalable.

For example:

- A brand may contain 200 products.
- Each product would need manual installment configuration.
- Any price change could require recalculating installment values.

Manual configuration would be:

- Time consuming
- Error prone
- Difficult to maintain

---

# Manual Product Configuration Investigation

As the first step of the investigation, a WooCommerce product was manually configured with DenaPay installment settings.

The purpose of this test was to confirm:

- Whether DenaPay supports product-level installment configuration
- How installment plans are defined for an individual product
- What data would need to be generated automatically in the future

The test confirmed that DenaPay supports custom installment plans at product level.

However, this approach requires manual configuration for each product, which is not scalable for a large catalog.

---

# Network Investigation

After confirming that product-level configuration exists, the next step was investigating DenaPay frontend behavior.

Browser developer tools were used to inspect:

- Loaded DenaPay resources
- Frontend requests
- Fetch/XHR activity on WooCommerce product pages

The goal was to understand whether the frontend communication layer could be used for automation.

Screenshot:

![DenaPay Product Installment Network Inspection](../screenshots/denapay-product-installment-network-inspection.png)

Additional Fetch/XHR analysis:

![DenaPay Network Request Analysis](../screenshots/denapay-network-inspection-fetch-analysis.png)

The investigation showed that frontend network inspection alone was not enough to identify the complete product installment data structure.

Because of this limitation, the investigation moved to WordPress product metadata.

---

# Product Meta Structure Investigation

After Network analysis, a read-only diagnostic tool was created to inspect the actual data stored by DenaPay.

Tool:

```
tools/denapay-product-meta-inspector.php
```

The tool reads:

```
_denaPay_installment_enabled
```

and:

```
_denaPay_installment_plans
```

The purpose was to discover the exact structure required for future synchronization.

## Result 01

The first result showed that DenaPay stores installment information directly on the WooCommerce product.

![DenaPay Product Meta Inspector Result 01](../screenshots/denapay-product-meta-inspector-result-01.png)

## Result 02

The second result showed the stored array structure:

![DenaPay Product Meta Inspector Result 02](../screenshots/denapay-product-meta-inspector-result-02.png)

Example:

```php
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

The actual values of `prepayment` and `check_amount` depend on:

- Product price
- Installment rules
- Business conditions

This confirmed that ELVA does not need to modify DenaPay frontend calculation logic.

Instead, ELVA can calculate business rules independently and synchronize generated installment plan data into the native DenaPay product metadata structure.

---

# Initial Approach — Automation Bot

Based on the investigation results, the first solution idea was creating an automation layer that could:

1. Find products based on business rules.
2. Match products with installment rules.
3. Calculate installment values.
4. Update DenaPay product-level configuration automatically.

Expected flow:

```
Business Rule
        |
        v
Find Matching Products
        |
        v
Calculate Installment Values
        |
        v
Update DenaPay Product Data
```

Example:

```
Rule:
Parnian Gas Cookers

Action:
Find all matching products

Apply:
30% prepayment
5 checks
```

and:

```
Rule:
Bimax Gas Cookers

Action:
Find all matching products

Apply:
20% prepayment
4 checks
```

---

# Why This Approach Was Important

This approach had several advantages:

- It used DenaPay's native product-level structure.
- It avoided modifying DenaPay frontend logic.
- It allowed DenaPay to continue handling checkout and payment processing.
- It created a clear separation between business rules and payment execution.

---

# Synchronization Challenge

The main challenge was synchronization.

Installment values depend on product prices.

If a product price changes:

```
New Product Price
        |
        v
Recalculate Installment Values
        |
        v
Update DenaPay Product Configuration
```

Therefore, the system could not be a one-time migration script.

A permanent synchronization mechanism was required.

---

# Architectural Evolution

During further investigation, it became clear that directly filtering DenaPay global plans at runtime introduced complexity.

DenaPay processes installment plans through multiple execution paths, meaning a single runtime filter was not enough to guarantee consistent behavior across:

- Product pages
- Cart calculations
- Checkout flow

Because of this, the architecture moved away from modifying DenaPay runtime behavior.

---

# Final Direction

The final architecture became a rule-based synchronization system:

```
ELVA Rule Manager
        |
        v
Business Rule Evaluation
        |
        v
Product Matching
        |
        v
Installment Calculation
        |
        v
DenaPay Synchronization Layer
        |
        v
Native DenaPay Product Installment Data
```

In this architecture:

ELVA is responsible for:

- Managing business rules
- Selecting products
- Calculating installment conditions
- Synchronizing product-level installment settings

DenaPay remains responsible for:

- Displaying installment options
- Checkout process
- Payment handling

---

# Decision Summary

The project moved from:

```
Runtime DenaPay Plan Filtering
```

to:

```
ELVA Rule Engine
+
DenaPay Product-Level Synchronization
```

because this approach provides:

- Better compatibility with DenaPay updates
- Less dependency on internal DenaPay implementation
- Easier maintenance
- Clear separation of responsibilities

This decision became the foundation of the final ELVA Installment Manager architecture.
