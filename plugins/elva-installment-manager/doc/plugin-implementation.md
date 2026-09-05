# ELVA Installment Manager - Rule Management Implementation

## Overview

This document describes the implementation of the **ELVA Installment
Manager** module.

The purpose of this module is to manage installment business rules based
on WooCommerce product categories.

At this stage, the module only manages installment rules. It does not
synchronize data with DenaPay or update products yet.

------------------------------------------------------------------------

## Admin Panel

A dedicated WordPress admin menu was added:

    ELVA Installment

The admin panel provides a management interface for installment rules.

![ELVA Installment Rules Admin
Panel](elva-installment-rules-admin-panel.png)

------------------------------------------------------------------------

## Rule Management

The admin panel supports:

-   Creating installment rules
-   Selecting WooCommerce product categories
-   Setting down payment percentage
-   Setting number of checks
-   Setting installment duration
-   Editing existing rules
-   Deleting existing rules

![Rule Management
Interface](elva-installment-rule-management-interface.png)

------------------------------------------------------------------------

## Rule Data Structure

Each installment rule contains:

  Field                   Description
  ----------------------- --------------------------------
  Category                WooCommerce product category
  Prepayment Percentage   Initial payment percentage
  Checks                  Number of installment checks
  Duration                Installment duration in months

Example:

    Category:
    Parnian Steel Stove

    Prepayment:
    20%

    Checks:
    5

    Duration:
    5 months

------------------------------------------------------------------------

## Category Selection

The module uses real WooCommerce product categories.

Category hierarchy is supported.

Example:

    Kitchen Appliances
     └── Stove
          └── Parnian Steel Stove

------------------------------------------------------------------------

## Storage

Installment rules are stored in WordPress options.

Storage key:

    elva_denapay_rules

The stored rules are prepared for the next synchronization phase.

------------------------------------------------------------------------

# Testing

## Create Rule

A new installment rule was created successfully.

Test data:

    Category:
    Parnian Steel Stove

    Prepayment:
    20%

    Checks:
    5

    Duration:
    5 months

Screenshot:

![Rule Save Success](rule-save-success.png)

------------------------------------------------------------------------

## Saved Rule Verification

The created rule appears in the registered rules table.

Screenshot:

![Rule Save Verification](rule-save-verification.png)

Expected result:

    Category: Parnian Steel Stove
    Prepayment: 20%
    Checks: 5
    Duration: 5

------------------------------------------------------------------------

## Edit Rule

Editing an existing rule was tested successfully.

Before:

    Prepayment: 20%
    Checks: 5
    Duration: 5

Screenshot:

![Before Edit](rule-before-edit.png)

After:

    Prepayment: 30%
    Checks: 4
    Duration: 4

Screenshot:

![After Edit](rule-after-edit.png)

------------------------------------------------------------------------

## Delete Rule

Deleting an installment rule was tested successfully.

Flow:

1.  Click delete action
2.  Confirm deletion
3.  Rule removed from the list

Confirmation:

![Delete Confirmation](rule-delete-confirmation.png)

Result:

![Delete Success](rule-delete-success.png)

------------------------------------------------------------------------

## Current Capabilities

The module currently supports:

-   Installment rule management
-   WooCommerce category-based rules
-   Rule creation
-   Rule editing
-   Rule deletion
-   Rule listing

------------------------------------------------------------------------

## Not Implemented Yet

The following features are intentionally not included in this stage:

-   DenaPay metadata update
-   Product synchronization
-   Automatic installment calculation on products
-   Bulk synchronization

------------------------------------------------------------------------

## Next Step

The next implementation phase is:

# DenaPay Sync Runner

Responsibilities:

1.  Read saved installment rules
2.  Find products matching each category
3.  Calculate installment values based on current product prices
4.  Prepare DenaPay metadata
5.  Execute synchronization

The first implementation will use Dry Run mode to validate calculations
before applying changes.
