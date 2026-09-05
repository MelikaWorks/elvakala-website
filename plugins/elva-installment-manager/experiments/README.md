# ELVA Installment System — Experiments & Development Journey

This directory contains experimental code, prototypes, patches, and screenshots created during the early development of the ELVA installment management system.

The purpose of preserving these files is to document the technical evolution of the project and the engineering decisions that eventually led to the final architecture.

The code in this directory is **not part of the production implementation** and should not be used as production code.

---

## Initial Project Goal

The ELVAKALA WooCommerce store uses DenaPay to manage installment purchases and check-based payments.

In the original DenaPay structure, installment plans were primarily defined as global plans. The project required more flexible business rules so that different groups of products could have different installment conditions.

For example:

- One category could require a 30% prepayment with 4 checks.
- Another category could require a 30% prepayment with 5 checks.
- Different product groups could have different repayment periods.
- Some installment plans should remain global and continue to apply to all eligible products.

The initial goal was therefore to extend DenaPay with **rule-based installment plans** without replacing its existing payment system.

---

# Phase 1 — Extending DenaPay Plan Settings

The first approach was to extend DenaPay's existing installment-plan configuration instead of building a separate rule-management system.

Two new concepts were added to each installment plan:

- Plan execution scope
- Product categories associated with the plan

Each plan could operate in one of two modes.

### Global

The plan would remain available to all products already eligible for installment purchases.

### Specific Categories

The plan would only apply to selected WooCommerce product categories.

This functionality was added directly to DenaPay's default installment-plan settings.

Files related to this phase:

- `denapay-category-based-plans.php`
- `denapay-category-plan-settings.php`

The first file represents the initial implementation of the idea, while the second is a more complete and documented version of the same phase.

At this stage, only the administration interface and the Scope/Category configuration data had been introduced.

The runtime plan-selection logic had not yet been modified.

### Category-Specific Plan Example

The following screenshot shows an experimental 5-month installment plan restricted to a specific WooCommerce product category.

![Category-specific 5-month installment plan](screenshots/mehranpay-01-category-specific-plan-hooks-5-months.png)

### Global Plan Example

Existing global installment plans were preserved alongside category-specific plans.

![Global installment plan settings](screenshots/mehranpay-02-global-installment-plan-settings.png)

Another category could independently receive different installment terms, such as a 4-month plan with 4 checks.

![Category-specific 4-month installment plan](screenshots/mehranpay-03-category-specific-plan-green-4-months.png)

---

# Phase 2 — Runtime Category-Based Plan Filtering

After the configuration interface was created, the next step was to make the selected categories affect the plans actually available to each product.

A runtime filtering function was introduced that:

1. Read DenaPay's default installment plans.
2. Retrieved the WooCommerce categories assigned to the current product.
3. Preserved global plans.
4. Preserved category-specific plans only when their configured categories matched the product.

The first implementation attempted to accomplish this by intercepting the following product metadata:

`_denapay_installment_plans`

The goal was to dynamically provide filtered plans to DenaPay without permanently modifying the product's stored installment configuration.

File related to this phase:

- `denapay-category-plan-runtime-filter.php`

---

# Problem 1 — DenaPay Does Not Read Plans Through a Single Path

Further testing revealed that runtime metadata filtering alone was not sufficient.

DenaPay reads and processes installment plans through multiple internal execution paths.

As a result, it was possible for:

- The product page to display one set of plans.
- The cart to calculate another set.
- The checkout process to obtain plan information through a different path.

Filtering only `_denapay_installment_plans`, or modifying only one execution path, could therefore result in inconsistent behavior across the purchase flow.

This was the first major architectural limitation discovered during the experiment.

---

# Phase 3 — Shared Plan Filtering Helper

The next approach was to create a shared filtering helper.

Instead of implementing separate filtering logic in different parts of DenaPay, the goal was to pass every global plan list through one common rule before further processing.

The helper:

- Treated legacy plans as global by default.
- Preserved explicitly global plans.
- Filtered category-specific plans according to the current product's WooCommerce categories.

File related to this phase:

- `denapay-shared-plan-filter-helper.php`

The intention was to establish one consistent filtering mechanism that could be reused by all DenaPay execution paths.

---

# Phase 4 — Patching DenaPay Internal Plan Loaders

Source inspection showed that DenaPay directly reads `default_installment_plans` from several internal locations.

To make category filtering affect these paths consistently, an experimental extension point was introduced inside DenaPay.

The custom WordPress filter used during this experiment was:

`denapay_global_plans_for_product`

The filter ran after global plans were retrieved but before DenaPay processed or normalized them.

This allowed an external rule engine to filter the available plans for the current WooCommerce product.

Two important DenaPay execution paths were patched during this experiment.

### SmartData

Internal DenaPay file:

`denapay/inc/cart/dp-smartdata.php`

Documented ELVA patch:

- `denapay-patch-smartdata-global-plan-filter.php`

### InstallmentPlanManager

Internal DenaPay file:

`denapay/inc/cart/dp-InstallmentPlanManager.php`

Documented ELVA patch:

- `denapay-patch-installment-plan-manager-filter.php`

The original third-party DenaPay source files are **not included in this repository**.

Only the custom extension points and changes created during the ELVA experiment are documented here. This preserves the engineering history without publishing the complete source code of the commercial third-party plugin.

---

# Problem 2 — Tight Coupling With DenaPay Internals

As development continued, an important architectural problem became increasingly clear.

For category-based plans to work reliably using this approach, multiple internal DenaPay execution paths had to be modified.

This introduced several problems:

- Tight coupling with DenaPay's internal implementation
- Risk of custom modifications being overwritten by plugin updates
- Multiple internal files requiring patches
- Increased maintenance complexity
- Potential differences between Product, Cart, and Checkout behavior
- Dependency on implementation details of a third-party plugin

At this point, continuing with direct DenaPay modifications was no longer considered a suitable production architecture.

---

# MehranPay — Separating Rule Logic From DenaPay

To reduce the amount of business logic placed directly inside DenaPay, a separate experimental WordPress plugin named **MehranPay** was created.

The purpose of MehranPay was to move rule-based installment management outside DenaPay and communicate with it through a compatibility bridge.

The prototype contained three primary components:

- Administration and rule configuration
- A plan rule engine
- A DenaPay bridge

The prototype is preserved in:

`mehranpay/`

Its structure includes:

```text
mehranpay/
├── mehranpay.php
├── includes/
│   ├── class-mehranpay-admin.php
│   ├── class-mehranpay-plan-rules.php
│   └── class-mehranpay-denapay-bridge.php
└── README.md
```

MehranPay could manage category rules and attempted to filter DenaPay's global installment plans before DenaPay processed them.

Conceptually, the flow was:

```text
WooCommerce Product
        ↓
Product Categories
        ↓
MehranPay Rule Engine
        ↓
DenaPay Bridge
        ↓
Filtered DenaPay Plans
        ↓
Product / Cart / Checkout
```

---

# MehranPay Experiment Result

From an architectural perspective, MehranPay demonstrated that installment-rule management could be separated from DenaPay.

The rule engine could determine which plans belonged to a product, and the bridge could attempt to provide only those plans to DenaPay.

The prototype reached the point where multiple installment configurations could be displayed on the WooCommerce product page.

![Multiple installment plans displayed on product page](screenshots/mehranpay-04-product-page-multiple-installment-plans.png)

However, applying those rules reliably still required DenaPay to expose hooks or receive patches at multiple internal execution points.

The core architectural problem therefore remained:

> MehranPay could own the rule logic, but the actual execution of those rules was still dependent on DenaPay's internal plan-selection behavior.

For this reason, MehranPay was eventually deprecated as an architectural prototype.

Its source code is preserved in this directory to document the development process and the reasoning that led to the next architecture.

---

# Experiment Screenshots

The `screenshots/` directory contains visual evidence from the experimental implementations.

These screenshots demonstrate that the prototype successfully reached several functional milestones:

- Defining global installment plans
- Defining category-specific installment plans
- Selecting WooCommerce categories for individual plans
- Configuring different installment durations
- Configuring different numbers of checks
- Configuring prepayment percentages
- Displaying multiple installment plans on the product page

Screenshots associated with the MehranPay prototype use the `mehranpay-` prefix.

Current examples:

```text
mehranpay-01-category-specific-plan-hooks-5-months.png
mehranpay-02-global-installment-plan-settings.png
mehranpay-03-category-specific-plan-green-4-months.png
mehranpay-04-product-page-multiple-installment-plans.png
```

These experiments demonstrated that the category-based plan concept was technically achievable at the configuration and presentation levels.

The remaining problem was not the rule concept itself, but the reliability and maintainability of integrating those rules into DenaPay's runtime processing.

---

# DenaPay Asset Optimization Experiment

Alongside the installment-rule experiments, a separate performance-related experiment was conducted.

File:

`disable-denapay-assets-on-homepage.php`

The purpose of this experiment was to remove unnecessary DenaPay CSS and JavaScript assets from the website homepage while leaving DenaPay-related payment and form pages untouched.

The experiment dequeued selected DenaPay frontend assets only when WordPress was rendering the front page.

This approach was ultimately not included in the main implementation and is preserved here as a separate optimization experiment.

---

# Final Architectural Decision

Further inspection of DenaPay revealed an important capability:

**DenaPay already supports product-specific installment plans natively.**

This changed the direction of the project.

Instead of intercepting and rewriting DenaPay's global plan-selection logic at runtime, ELVA could generate the appropriate installment configuration itself and synchronize the result into DenaPay's existing product-specific plan structure.

The new architecture became:

```text
ELVA Rule Manager
        ↓
Product Category Matching
        ↓
Installment Rule Calculation
        ↓
Related Product Selection
        ↓
Product-Specific Plan Generation
        ↓
DenaPay Product Metadata
        ↓
DenaPay Payment Flow
```

Under this architecture, ELVA owns the business rules and synchronization logic.

DenaPay continues to perform the task it was originally designed to perform:

- Store product installment configuration
- Present installment options
- Handle the installment purchase flow
- Handle checkout and payment processing

This avoids replacing DenaPay's payment engine while also avoiding unnecessary modification of its internal plan-selection logic.

---

# Advantages of the New Architecture

The revised architecture provides several important advantages:

- DenaPay core files do not need to be modified.
- DenaPay updates are less likely to break ELVA's rule-management system.
- Business rules remain fully controlled by ELVA.
- DenaPay remains responsible for Checkout and Payment.
- Products can be synchronized in batches.
- Product-specific plans use DenaPay's native data structure.
- Synchronization can be connected to external systems such as Bazara.
- Individual products can be updated without recalculating the entire catalog.

This produces a much cleaner separation of responsibilities:

```text
ELVA
Rules + Calculation + Synchronization

            ↓

DenaPay
Installment Data + Checkout + Payment
```

---

# Development Journey

The experimental development path can be summarized as:

```text
DenaPay Global Plans
        ↓
Add Scope + Category to DenaPay Settings
        ↓
Runtime Category Filtering
        ↓
Discover Multiple Independent DenaPay Plan Paths
        ↓
Shared Filtering Helper
        ↓
Patch DenaPay Internal Plan Loaders
        ↓
Build Independent MehranPay Prototype
        ↓
Discover Continued Dependency on DenaPay Internals
        ↓
Investigate DenaPay Product-Specific Plans
        ↓
Architectural Change
        ↓
ELVA Rule Manager + Product Synchronization
        ↓
Bazara-Triggered Synchronization
```

The experiments in this directory therefore represent more than discarded code.

They document the process of identifying the limitations of one architecture, validating alternative approaches, and using those findings to design a more maintainable solution.

---

# Directory Structure

The experimental directory currently follows this structure:

```text
experiments/
├── mehranpay/
│   ├── mehranpay.php
│   ├── includes/
│   │   ├── class-mehranpay-admin.php
│   │   ├── class-mehranpay-denapay-bridge.php
│   │   └── class-mehranpay-plan-rules.php
│   └── README.md
│
├── screenshots/
│   ├── mehranpay-01-category-specific-plan-hooks-5-months.png
│   ├── mehranpay-02-global-installment-plan-settings.png
│   ├── mehranpay-03-category-specific-plan-green-4-months.png
│   └── mehranpay-04-product-page-multiple-installment-plans.png
│
├── denapay-category-based-plans.php
├── denapay-category-plan-runtime-filter.php
├── denapay-category-plan-settings.php
├── denapay-patch-installment-plan-manager-filter.php
├── denapay-patch-smartdata-global-plan-filter.php
├── denapay-shared-plan-filter-helper.php
├── disable-denapay-assets-on-homepage.php
├── README-FA.md
└── README.md
```

---

# Status of This Directory

All files in this directory are preserved for:

- Documenting the development journey
- Recording architectural decisions
- Demonstrating approaches that were tested
- Preserving debugging and proof-of-concept work
- Explaining why the final architecture was selected

These files are **not part of the production implementation**.

The production implementation is developed in the main `elva-installment-manager` structure.

---

## Important Notice

The experiments in this directory integrate with third-party WordPress plugins.

Complete source code from commercial third-party plugins is intentionally **not included** in this repository.

Where internal modifications were tested, only the ELVA-specific patch or extension point is documented.

This repository preserves the project's own implementation and engineering history without redistributing third-party commercial source code.
