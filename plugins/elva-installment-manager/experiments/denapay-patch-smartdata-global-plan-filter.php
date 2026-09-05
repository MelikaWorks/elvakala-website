<?php

/**
 * ELVAKALA - DenaPay SmartData Global Plan Filter Patch
 *
 * EXPERIMENTAL / DISABLED
 *
 * This patch was applied to DenaPay's internal SmartData plan-loading path.
 *
 * Target file:
 * denapay/inc/cart/dp-smartdata.php
 *
 * Purpose:
 * Add an extension point before DenaPay normalizes global installment plans,
 * allowing external logic to filter plans for the current WooCommerce product.
 *
 * This was part of the original category-based plan experiment.
 *
 * The direct-core-patching approach was later abandoned because modifying
 * DenaPay internal files creates a fragile dependency on the commercial
 * plugin's implementation and future updates.
 *
 * Preserved here only as a record of the custom patch.
 */


/*
 * ORIGINAL LOCATION:
 *
 * private function get_global_plans( $product_id )
 *
 * After retrieving:
 *
 * $global_plans = $options['default_installment_plans'] ?? [];
 *
 * the following extension point was added:
 */

$global_plans = apply_filters(
    'denapay_global_plans_for_product',
    $global_plans,
    $product_id
);


/*
 * The patched method then continued with DenaPay's original
 * normalization flow.
 *
 * Conceptually:
 *
 * if ( empty( $global_plans ) ) {
 *     return [];
 * }
 *
 * $normalized = $this->normalize_global_plans(
 *     $global_plans,
 *     $product_id
 * );
 *
 * return $normalized;
 */
