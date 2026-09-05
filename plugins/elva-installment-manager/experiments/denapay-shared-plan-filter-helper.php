<?php

/**
 * ELVAKALA - DenaPay Shared Plan Filter Helper
 *
 * EXPERIMENTAL / DISABLED
 *
 * This experiment was introduced after discovering that DenaPay
 * reads default installment plans through multiple internal paths.
 *
 * Instead of filtering only one runtime path, this approach created
 * a shared helper intended to be reused everywhere DenaPay reads
 * default_installment_plans.
 *
 * It:
 * - Keeps legacy plans global by default
 * - Preserves globally-scoped plans
 * - Applies category-specific plans only when product categories match
 *
 * The idea was to patch DenaPay's internal plan-loading paths so they
 * would all use the same filtering logic.
 *
 * This approach was later abandoned because modifying DenaPay's
 * internal files directly created a fragile dependency on the
 * commercial plugin's implementation.
 *
 * The final architecture avoids modifying DenaPay core files and
 * synchronizes ELVA rules into DenaPay's native product-specific
 * installment metadata instead.
 *
 * Preserved as part of the project's development history.
 */


/**
 * Filter DenaPay installment plans for a specific product.
 *
 * @param array $plans
 * @param int   $product_id
 *
 * @return array
 */
function elva_denapay_filter_plans_for_product( $plans, $product_id ) {

    if ( empty( $plans ) || ! is_array( $plans ) ) {
        return array();
    }

    $product_categories = wp_get_post_terms(
        $product_id,
        'product_cat',
        array(
            'fields' => 'ids',
        )
    );

    if ( is_wp_error( $product_categories ) ) {
        $product_categories = array();
    }

    $product_categories = array_map(
        'intval',
        $product_categories
    );

    $filtered = array();

    foreach ( $plans as $index => $plan ) {

        /*
         * Backward compatibility:
         * plans created before ELVA customization
         * remain global.
         */
        $scope = ! empty( $plan['elva_plan_scope'] )
            ? $plan['elva_plan_scope']
            : 'global';

        /*
         * Global plan.
         */
        if ( $scope === 'global' ) {
            $filtered[ $index ] = $plan;
            continue;
        }

        /*
         * Category-specific plan.
         */
        if ( $scope === 'specific_categories' ) {

            $plan_categories = ! empty( $plan['elva_categories'] )
                ? (array) $plan['elva_categories']
                : array();

            $plan_categories = array_map(
                'intval',
                $plan_categories
            );

            if (
                ! empty( $plan_categories ) &&
                ! empty(
                    array_intersect(
                        $product_categories,
                        $plan_categories
                    )
                )
            ) {
                $filtered[ $index ] = $plan;
            }
        }
    }

    return $filtered;
}
