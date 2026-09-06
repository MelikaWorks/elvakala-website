# DenaPay Behavior Analysis

## Baseline behavior

DenaPay provided:

- default/global installment plans;
- product-level installment plans;
- a priority mode in which product-specific configuration can override broader
  settings;
- storefront, cart, checkout, and payment behavior built around its own plan
  representation.

## Why Network inspection was insufficient

Browser Developer Tools showed DenaPay assets and Fetch/XHR activity, but did
not expose the complete stored product-plan structure.

The investigation therefore moved from request inspection to a read-only
WordPress metadata inspector.

## Confirmed product metadata

```text
_denapay_installment_enabled
_denapay_installment_plans
```

Example observed structure:

```php
[
    [
        'months'       => 5,
        'checks'       => 5,
        'prepayment'   => 7675400,
        'check_amount' => 6140320,
        'type'         => 'monthly',
    ],
]
```

Meta-key spelling and case must match the executed integration exactly.

## Important architectural finding

DenaPay consumed global plans through more than one internal path. A change that
affected only a product-page path could leave cart or checkout behavior
unchanged. This finding was the main reason to abandon broad runtime filtering
in favor of generating the native product-level representation.

