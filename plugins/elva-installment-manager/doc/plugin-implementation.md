# ELVA Installment Manager — Plugin Implementation

This document describes the implementation details of the ELVA Installment Manager plugin.

The plugin was created to manage installment business rules independently from DenaPay and provide an automation layer for applying those rules to WooCommerce products.

---

# Admin Panel Implementation

## ELVA Installment Rules Menu

After validating the DenaPay integration approach, an initial admin interface was created inside WordPress.

The purpose of this interface is to provide a dedicated place for managing installment business rules.

Screenshot:

![ELVA Installment Rules Admin Panel](../screenshots/elva-installment-rules-admin-panel.png)

At this stage, the panel contains the initial rule structure:

- Product category
- Prepayment percentage
- Number of checks
- Installment duration

Example:
``` text
Category:
Built-in Gas Cookers

Prepayment:
20%

Checks:
5

Duration:
5 months
```

The current implementation represents the first step toward replacing hard-coded installment rules with configurable business rules.

Future versions will allow:

- Creating multiple rules
- Assigning rules to WooCommerce categories
- Defining priority between rules
- Synchronizing matched products with DenaPay metadata
