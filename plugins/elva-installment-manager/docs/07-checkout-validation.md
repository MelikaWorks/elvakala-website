# Related Checkout Validation

These checks supported the installment project but are not part of the private
rule engine.

## Discount behavior

Installment purchases were expected to use the non-discounted product price.
Cart and checkout states were inspected to verify the warning and resulting
price presentation.

![Cart warning](../screenshots/checkout-validation/03-cart-installment-warning.png)

![Discount rule](../screenshots/checkout-validation/04-checkout-discount-rule.png)

![Price calculation](../screenshots/checkout-validation/06-checkout-price-calculation.png)

## Checkout dependency

The checkout flow was blocked when the Digits phone-number dependency was not
loaded. The before/after Console checks recorded `undefined` and then `object`.

![Dependency error](../screenshots/checkout-validation/01-libphonenumber-error.png)

![Dependency loaded](../screenshots/checkout-validation/02-libphonenumber-loaded.png)

The successful state allowed the flow to proceed to the payment stage.

![Payment flow](../screenshots/checkout-validation/05-payment-flow-success.png)

## Store policy presentation

The product page, installment details, and cart were also checked for the
installment notice and check-delivery policy.

![Product notice](../screenshots/checkout-validation/07-product-installment-notice.png)

![Plan details](../screenshots/checkout-validation/08-installment-plan-details.png)

![Cart summary](../screenshots/checkout-validation/09-installment-cart-summary.png)

Third-party library bundles and checkout customer data are not included.

