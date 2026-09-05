# ELVA Installment Manager - Implementation

## Overview

This document describes the implementation of the ELVA Installment
Manager module.

The purpose of this module is to manage installment business rules based
on WooCommerce product categories.

At this stage, the module only manages installment rules. It does not
synchronize data with DenaPay yet.

------------------------------------------------------------------------

## Admin Menu

A new WordPress admin menu has been created:

    ELVA Installment

The page provides a management interface for installment rules.

------------------------------------------------------------------------

## Rule Management

The admin panel supports:

-   Creating installment rules
-   Selecting WooCommerce product categories
-   Setting down payment percentage
-   Setting number of checks
-   Setting installment duration
-   Editing existing rules
-   Deleting rules

------------------------------------------------------------------------

## Rule Data Structure

Each installment rule contains:

  Field                   Description
  ----------------------- --------------------------------
  Category                WooCommerce product category
  Prepayment Percentage   Initial payment percentage
  Checks                  Number of checks
  Duration                Installment duration in months

Example:

    Category:
    Stove Parnian Steel

    Prepayment:
    20%

    Checks:
    5

    Duration:
    5 months

------------------------------------------------------------------------

## Category Selection

The rule manager uses real WooCommerce product categories.

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

The stored rules are prepared for future synchronization with DenaPay.

------------------------------------------------------------------------

## Tested Features

### Create Rule

A new installment rule was successfully created.

Screenshot:

    rule-save-success.png

------------------------------------------------------------------------

### Saved Rule Verification

The created rule appears in the registered rules table.

Screenshot:

    rule-save-verification.png

Example output:

    Category: Parnian Steel Stove
    Prepayment: 20%
    Checks: 5
    Duration: 5

------------------------------------------------------------------------

### Edit Rule

Editing an existing rule was tested successfully.

Test scenario:

Before:

    Prepayment: 20%
    Checks: 5
    Duration: 5

After:

    Prepayment: 30%
    Checks: 4
    Duration: 4

Screenshots:

    rule-before-edit.png
    rule-after-edit.png

------------------------------------------------------------------------

### Delete Rule

Deleting an installment rule was tested successfully.

Flow:

1.  Click delete action
2.  Confirm deletion
3.  Rule removed from the list

Screenshots:

    rule-delete-confirmation.png
    rule-delete-success.png

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
-   Bulk sync execution

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
