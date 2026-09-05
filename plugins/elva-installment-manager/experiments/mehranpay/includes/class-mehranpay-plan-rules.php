<?php

defined( 'ABSPATH' ) || exit;


/**
 * =========================================================
 * MehranPay Plan Rules
 * =========================================================
 *
 * Handles installment plan scope rules.
 */
class MehranPay_Plan_Rules {

    /**
     * Initialize component.
     */
    public static function init() {
        // No hooks required yet.
        // This class currently provides reusable rule methods.
    }


    /**
     * Filter installment plans for a specific product.
     *
     * Rules:
     *
     * - Plans without MehranPay scope are treated as global.
     * - Global plans are available to all eligible products.
     * - Category-specific plans are available only when
     *   the product belongs to one of the selected categories.
     *
     * @param array $plans
     * @param int   $product_id
     *
     * @return array
     */
    public static function filter_plans_for_product(
        $plans,
        $product_id
    ) {

        if (
            empty( $plans ) ||
            ! is_array( $plans ) ||
            empty( $product_id )
        ) {
            return array();
        }


        /*
         * Get all WooCommerce product category IDs
         * assigned to this product.
         */
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


        $matched_plans = array();


        foreach ( $plans as $key => $plan ) {

            if ( ! is_array( $plan ) ) {
                continue;
            }


            /*
             * Backward compatibility.
             *
             * Any DenaPay plan created before MehranPay
             * has no MehranPay scope field.
             *
             * Such plans must continue behaving as
             * normal global DenaPay plans.
             */
            $scope = ! empty(
                $plan['mehranpay_plan_scope']
            )
                ? $plan['mehranpay_plan_scope']
                : 'global';


            /*
             * =================================================
             * Global Plan
             * =================================================
             */

            if ( $scope === 'global' ) {

                $matched_plans[ $key ] = $plan;

                continue;
            }


            /*
             * =================================================
             * Category-Specific Plan
             * =================================================
             */

            if ( $scope === 'specific_categories' ) {

                $plan_categories = ! empty(
                    $plan['mehranpay_categories']
                )
                    ? (array) $plan['mehranpay_categories']
                    : array();


                /*
                 * Normalize category IDs.
                 */
                $plan_categories = array_filter(
                    array_map(
                        'intval',
                        $plan_categories
                    )
                );


                /*
                 * A category-specific plan without
                 * selected categories should not run.
                 */
                if ( empty( $plan_categories ) ) {
                    continue;
                }


                /*
                 * Product belongs to at least one
                 * category assigned to the plan.
                 */
                $matches = array_intersect(
                    $product_categories,
                    $plan_categories
                );


                if ( ! empty( $matches ) ) {

                    $matched_plans[ $key ] = $plan;
                }
            }
        }


        return $matched_plans;
    }


    /**
     * Check whether one plan is valid for one product.
     *
     * Useful when DenaPay processes a single selected plan
     * instead of an array of plans.
     *
     * @param array $plan
     * @param int   $product_id
     *
     * @return bool
     */
    public static function plan_matches_product(
        $plan,
        $product_id
    ) {

        if (
            empty( $plan ) ||
            ! is_array( $plan ) ||
            empty( $product_id )
        ) {
            return false;
        }


        $result = self::filter_plans_for_product(
            array( $plan ),
            $product_id
        );


        return ! empty( $result );
    }


    /**
     * Get product category IDs.
     *
     * @param int $product_id
     *
     * @return array
     */
    public static function get_product_categories(
        $product_id
    ) {

        if ( empty( $product_id ) ) {
            return array();
        }


        $categories = wp_get_post_terms(
            $product_id,
            'product_cat',
            array(
                'fields' => 'ids',
            )
        );


        if ( is_wp_error( $categories ) ) {
            return array();
        }


        return array_map(
            'intval',
            $categories
        );
    }
}