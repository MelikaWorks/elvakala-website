# Problem and Requirements

## Business requirement

ELVA KALA needed installment conditions that could differ by product group,
category, or brand-oriented category. Manual product-by-product configuration
was not practical for groups containing tens or hundreds of products.

Required rule fields:

| Field | Purpose |
| --- | --- |
| Product category | Select the affected product group |
| Prepayment percentage | Calculate the initial amount from current price |
| Check count | Divide the remaining balance |
| Duration | Describe the installment period |

## Functional requirements

- Preserve DenaPay's normal product-specific plan priority.
- Support more than one business rule.
- Avoid applying category plans to unrelated products.
- Keep product page, cart, checkout, and payment calculations consistent.
- Recalculate fixed amounts after a price update.
- Validate safely before bulk writes.

## Operational constraints

- The work was performed against a live WooCommerce environment.
- DenaPay was not originally designed for ELVA's category-rule model.
- Product prices were supplied through the Mahak/Bazara integration path.
- Changes had to be introduced progressively and reversibly.

