<?php

/**
 * ELVAKALA - DenaPay InstallmentPlanManager Global Plan Filter Patch
 *
 * EXPERIMENTAL / DISABLED
 *
 * This patch was applied to another internal DenaPay plan-loading path
 * after discovering that DenaPay reads global installment plans through
 * more than one internal manager.
 *
 * Target file:
 * denapay/inc/cart/dp-InstallmentPlanManager.php
 *
 * Purpose:
 * Apply the same product-aware plan filter used in the SmartData path
 * before DenaPay calculates installment amounts.
 *
 * This ensured that category-specific plan filtering could affect
 * this second DenaPay execution path as well.
 *
 * The direct-core-patching approach was later abandoned because it
 * depended on DenaPay internals and could easily break after plugin updates.
 *
 * Preserved here only as documentation of the experimental patch.
 */


/*
 * ORIGINAL METHOD:
 *
 * private function get_global_plans( $product_id )
 *
 * The original implementation loaded:
 *
 * $global_plans = dp_settings(
 *     'default_installment_plans',
 *     []
 * );
 *
 * Before calculating plan amounts, the following extension point
 * was inserted:
 */

$global_plans = apply_filters(
    'denapay_global_plans_for_product',
    $global_plans,
    $product_id
);


/*
 * The patched flow then continued with:
 *
 * if ( empty( $global_plans ) ) {
 *     return [];
 * }
 *
 * return $this->calculate_plan_amounts(
 *     $global_plans,
 *     $product_id
 * );
 */
