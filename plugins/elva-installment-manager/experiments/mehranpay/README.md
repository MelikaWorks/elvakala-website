# MehranPay — Experimental DenaPay Extension

> **Status:** Experimental / Deprecated  
> **Production:** No

## Overview

MehranPay was an experimental WordPress plugin developed during the
ELVAKALA installment-payment project.

The goal was to extend DenaPay with a rule-based system that could assign
different installment plans to different WooCommerce product categories.

DenaPay originally provided global installment plans, but the project
required more flexible business rules, such as:

- Different installment plans for different product categories
- Different prepayment percentages
- Different numbers of checks
- Different installment durations
- Preservation of existing global DenaPay plans

## Architecture

MehranPay was designed as a separate compatibility layer rather than
placing all custom business logic directly inside DenaPay.

The prototype contained three main components:

### Admin

`class-mehranpay-admin.php`

Provided the administration interface for configuring installment rules.

### Plan Rules

`class-mehranpay-plan-rules.php`

Contained the rule engine responsible for determining which installment
plans should be available for a WooCommerce product based on its category.

### DenaPay Bridge

`class-mehranpay-denapay-bridge.php`

Connected MehranPay to DenaPay and attempted to filter DenaPay's global
installment plans before they were processed.

The intended flow was:

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

## DenaPay Integration Experiment

During development it was discovered that DenaPay reads and processes
global installment plans through multiple internal execution paths.

To support MehranPay, experimental extension points were added to some
of those paths using the following WordPress filter:

`denapay_global_plans_for_product`

This allowed MehranPay to receive DenaPay's global plans and filter them
according to the current product.

However, supporting this architecture reliably required modifications to
multiple internal DenaPay files.

This created several problems:

- Tight coupling with DenaPay internals
- Increased maintenance complexity
- Risk of changes being overwritten by DenaPay updates
- Potential differences between product, cart and checkout behavior
- Dependence on implementation details of a third-party plugin

## Why This Approach Was Abandoned

Although the prototype demonstrated that category-based installment rules
could be layered on top of DenaPay, modifying and intercepting DenaPay's
internal plan-selection process was not considered a robust long-term
architecture.

Further investigation showed that DenaPay already supports
product-specific installment plans.

The project therefore moved to a different architecture:

ELVA Rules  
↓  
Product Matching  
↓  
Installment Calculation  
↓  
Synchronization  
↓  
DenaPay Product-Specific Plans

Instead of changing how DenaPay selects plans at runtime, the final
approach generates the appropriate plan and synchronizes it into DenaPay's
native product-level configuration.

This allows DenaPay to continue handling its normal payment and checkout
workflow while ELVA manages the business rules externally.

## Historical Purpose

MehranPay is preserved in the `experiments` directory as part of the
project's engineering history.

It represents an intermediate architectural prototype that helped reveal
the limitations of runtime filtering and direct modifications to DenaPay.

It is **not intended for production use** and is not part of the final
ELVA Installment Manager implementation.
