<?php
/**
 * Archived MehranPay experiment: return global/category plans matching one
 * WooCommerce product. Pure research helper; not wired to production.
 */

defined( 'ABSPATH' ) || exit;

function mehranpay_experiment_match_plans( $plans, $product_id ) {
    if ( empty( $plans ) || ! is_array( $plans ) ) {
        return [];
    }

    $product_categories = wp_get_post_terms(
        absint( $product_id ),
        'product_cat',
        [ 'fields' => 'ids' ]
    );

    if ( is_wp_error( $product_categories ) ) {
        $product_categories = [];
    }

    $product_categories = array_map( 'intval', $product_categories );
    $matched            = [];

    foreach ( $plans as $index => $plan ) {
        if (
            isset( $plan['is_active'] ) &&
            ! in_array( $plan['is_active'], [ 1, '1', true, 'true', 'on', 'yes' ], true )
        ) {
            continue;
        }

        $scope = ! empty( $plan['elva_plan_scope'] )
            ? $plan['elva_plan_scope']
            : 'global';

        if ( 'global' === $scope ) {
            $matched[ $index ] = $plan;
            continue;
        }

        if ( 'specific_categories' !== $scope ) {
            continue;
        }

        $plan_categories = ! empty( $plan['elva_categories'] )
            ? array_map( 'intval', (array) $plan['elva_categories'] )
            : [];

        if ( array_intersect( $product_categories, $plan_categories ) ) {
            $matched[ $index ] = $plan;
        }
    }

    return $matched;
}

