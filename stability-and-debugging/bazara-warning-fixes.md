# Bazara Defensive Fixes

This document records targeted defensive changes made to a commercial Bazara integration. The complete plugin source is intentionally not distributed.

## Price and Discount Loops

### Problem

Trailing semicolons after `if` conditions made the guards ineffective. Missing price or discount fields could still be accessed.

### Safe pattern

```php
$pricesList = $Discounts = [];

for ($i = 1; $i <= 10; $i++) {
    if (
        isset($productdetail["Price{$i}"]) &&
        $productdetail["Price{$i}"] !== ''
    ) {
        $pricesList[$i]["Price{$i}"] = $productdetail["Price{$i}"];
    }

    if (
        isset($productdetail["Discount{$i}"]) &&
        $productdetail["Discount{$i}"] !== ''
    ) {
        $Discounts[$i]["Discount{$i}"] = $productdetail["Discount{$i}"];
    }
}
```

## Missing `active_auto_sync` Request Field

### Problem

Direct access to an optional request field generated an undefined-array-key warning.

### Fix

```php
$active_sync = isset($_REQUEST['active_auto_sync'])
    ? toggle_to_boolean(
        sanitize_text_field(
            wp_unslash($_REQUEST['active_auto_sync'])
        )
    )
    : false;
```

## Empty Product Attribute Key

### Problem

`array_key_first()` returns `null` for an empty array. Accessing the array with that result generated an undefined-array-key warning.

### Fix

```php
$attr = $product->get_attributes();
$first_attr_key = array_key_first($attr);

if (
    null !== $first_attr_key &&
    isset($attr[$first_attr_key]) &&
    is_object($attr[$first_attr_key]) &&
    get_class($attr[$first_attr_key]) === 'stdClass'
) {
    return array(
        'success' => false,
        'message' => 'Nested variable products cannot be synchronized.'
    );
}
```

## Production Validation

- A real product price was changed in the accounting system.
- The change propagated through Bazara to WooCommerce.
- Regular price: `13,650,000` → `13,649,000` toman.
- Discounted price: `8,190,000` → `8,189,400` toman.
- The discounted result matches the configured 40% rule.
- Installment calculations remained correct.
- No fresh PHP error log was created after synchronization.

Status: `PASS — 2026-09-26`

