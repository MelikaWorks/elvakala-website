<?php

/**
 * ELVAKALA - DenaPay Category Plan Runtime Filter
 *
 * EXPERIMENTAL / DISABLED
 *
 * Phase 2 of the original category-based installment plan approach.
 *
 * This experiment attempted to apply the category scope introduced
 * in Phase 1 during runtime.
 *
 * It:
 * - Reads DenaPay's default installment plans
 * - Detects the WooCommerce categories of the current product
 * - Keeps global plans available
 * - Keeps category-specific plans only when categories match
 * - Preserves manually configured product-specific DenaPay plans
 *
 * The implementation intercepted _denapay_installment_plans through
 * WordPress metadata filtering and dynamically supplied matching plans.
 *
 * This approach was later abandoned because DenaPay reads and processes
 * installment plans through multiple internal paths. Filtering product
 * metadata alone could therefore produce inconsistent behavior between
 * product, cart and checkout flows.
 *
 * The final architecture synchronizes ELVA rules into DenaPay's native
 * product-specific installment-plan metadata instead.
 *
 * Preserved as part of the project's development history.
 */


/**
 * Return only global/category plans that are valid
 * for the requested product.
 */
function elva_denapay_get_plans_for_product( $product_id ) {

    $settings = get_option( 'dena_pay_settings', array() );

    if (
        empty( $settings['default_installment_plans'] ) ||
        ! is_array( $settings['default_installment_plans'] )
    ) {
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

    $matched_plans = array();

    foreach ( $settings['default_installment_plans'] as $plan ) {

        /*
         * Ignore disabled plans.
         */
        if (
            isset( $plan['is_active'] ) &&
            ! in_array(
                $plan['is_active'],
                array( 1, '1', true, 'true', 'on', 'yes' ),
                true
            )
        ) {
            continue;
        }

        /*
         * Backward compatibility:
         * old plans without scope remain global.
         */
        $scope = ! empty( $plan['elva_plan_scope'] )
            ? $plan['elva_plan_scope']
            : 'global';

        /*
         * Global plan.
         */
        if ( $scope === 'global' ) {
            $matched_plans[] = $plan;
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
                ! empty(
                    array_intersect(
                        $product_categories,
                        $plan_categories
                    )
                )
            ) {
                $matched_plans[] = $plan;
            }
        }
    }

    return $matched_plans;
}


/**
 * Feed DenaPay category-matched plans as product-specific plans.
 *
 * If the product already has manually configured DenaPay plans,
 * those plans remain untouched and keep priority.
 */
add_filter(
    'get_post_metadata',
    function (
        $value,
        $object_id,
        $meta_key,
        $single,
        $meta_type
    ) {

        if ( $meta_key !== '_denapay_installment_plans' ) {
            return $value;
        }

        /*
         * Prevent recursion while reading the real metadata.
         */
        static $running = false;

        if ( $running ) {
            return $value;
        }

        $running = true;

        $existing = get_metadata_raw(
            'post',
            $object_id,
            '_denapay_installment_plans',
            true
        );

        $running = false;

        /*
         * Product already has manually configured plans.
         * Preserve DenaPay's normal product-specific behavior.
         */
        if (
            ! empty( $existing ) &&
            is_array( $existing )
        ) {
            return $value;
        }

        /*
         * Only WooCommerce products should receive dynamic plans.
         */
        if ( get_post_type( $object_id ) !== 'product' ) {
            return $value;
        }

        $plans = elva_denapay_get_plans_for_product(
            $object_id
        );

        if ( empty( $plans ) ) {
            return $value;
        }

        /*
         * get_post_metadata expects an array wrapper
         * when $single is false.
         */
        return $single
            ? $plans
            : array( $plans );

    },
    20,
    5
);
