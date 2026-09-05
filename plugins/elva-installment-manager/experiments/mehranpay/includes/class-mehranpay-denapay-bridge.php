<?php

defined( 'ABSPATH' ) || exit;


/**
 * =========================================================
 * MehranPay — DenaPay Bridge
 * =========================================================
 *
 * Compatibility layer between MehranPay and DenaPay.
 *
 * MehranPay does not modify DenaPay plan data.
 * It filters DenaPay global installment plans according
 * to MehranPay rules before DenaPay processes them.
 */
class MehranPay_DenaPay_Bridge {


    /**
     * Initialize bridge hooks.
     */
    public static function init() {

        /*
         * This filter is provided by the small
         * MehranPay compatibility patch added to DenaPay.
         *
         * It runs before DenaPay normalizes
         * global installment plans.
         */
        add_filter(
            'denapay_global_plans_for_product',
            array(
                __CLASS__,
                'filter_global_plans_for_product'
            ),
            20,
            2
        );
    }


    /**
     * =====================================================
     * Filter Global Plans
     * =====================================================
     *
     * Receives DenaPay global plans before normalization
     * and removes plans that do not match the current
     * product according to MehranPay rules.
     *
     * @param array $plans
     * @param int   $product_id
     *
     * @return array
     */
    public static function filter_global_plans_for_product(
        $plans,
        $product_id
    ) {

        /*
         * Do not interfere if DenaPay did not provide
         * a usable plan list.
         */
        if (
            empty( $plans ) ||
            ! is_array( $plans )
        ) {
            return $plans;
        }


        /*
         * Product context is required for
         * category-based rules.
         */
        $product_id = absint( $product_id );

        if ( ! $product_id ) {
            return $plans;
        }


        /*
         * Safety check.
         */
        if ( ! class_exists( 'MehranPay_Plan_Rules' ) ) {
            return $plans;
        }


        /*
         * Let the MehranPay rule engine decide
         * which plans are valid for this product.
         */
        return MehranPay_Plan_Rules::filter_plans_for_product(
            $plans,
            $product_id
        );
    }


    /**
     * =====================================================
     * DenaPay Availability
     * =====================================================
     *
     * Check whether the DenaPay functions required
     * by MehranPay are available.
     *
     * @return bool
     */
    public static function is_denapay_available() {

        return
            function_exists( 'dp_settings' ) &&
            function_exists(
                'denapay_get_woocommerce_categories'
            );
    }


    /**
     * =====================================================
     * Raw Global Plans
     * =====================================================
     *
     * Return DenaPay default installment plans exactly
     * as stored by DenaPay.
     *
     * No MehranPay filtering is performed here.
     *
     * @return array
     */
    public static function get_raw_global_plans() {

        if ( ! self::is_denapay_available() ) {
            return array();
        }


        $plans = dp_settings(
            'default_installment_plans',
            array()
        );


        return is_array( $plans )
            ? $plans
            : array();
    }


    /**
     * =====================================================
     * Filtered Global Plans
     * =====================================================
     *
     * Return DenaPay global plans that are valid
     * for a specific WooCommerce product.
     *
     * @param int $product_id
     *
     * @return array
     */
    public static function get_global_plans_for_product(
        $product_id
    ) {

        $product_id = absint( $product_id );

        if ( ! $product_id ) {
            return array();
        }


        $plans = self::get_raw_global_plans();


        if ( empty( $plans ) ) {
            return array();
        }


        if ( ! class_exists( 'MehranPay_Plan_Rules' ) ) {
            return $plans;
        }


        return MehranPay_Plan_Rules::filter_plans_for_product(
            $plans,
            $product_id
        );
    }


    /**
     * =====================================================
     * Product-Specific Plans
     * =====================================================
     *
     * Return installment plans configured directly
     * on an individual WooCommerce product.
     *
     * MehranPay does not modify these plans.
     *
     * @param int $product_id
     *
     * @return array
     */
    public static function get_product_specific_plans(
        $product_id
    ) {

        $product_id = absint( $product_id );

        if ( ! $product_id ) {
            return array();
        }


        $plans = get_post_meta(
            $product_id,
            '_denapay_installment_plans',
            true
        );


        return is_array( $plans )
            ? $plans
            : array();
    }


    /**
     * Check whether a product already has
     * product-specific DenaPay plans.
     *
     * @param int $product_id
     *
     * @return bool
     */
    public static function has_product_specific_plans(
        $product_id
    ) {

        return ! empty(
            self::get_product_specific_plans(
                $product_id
            )
        );
    }


    /**
     * =====================================================
     * Effective Plans
     * =====================================================
     *
     * Return the plans MehranPay considers available
     * for a product.
     *
     * Priority:
     *
     * 1. Product-specific DenaPay plans
     * 2. MehranPay-filtered global DenaPay plans
     *
     * This preserves DenaPay's existing
     * product-specific priority behavior.
     *
     * @param int $product_id
     *
     * @return array
     */
    public static function get_plans_for_product(
        $product_id
    ) {

        $product_id = absint( $product_id );

        if ( ! $product_id ) {
            return array();
        }


        /*
         * Product-specific plans keep priority.
         */
        $product_plans =
            self::get_product_specific_plans(
                $product_id
            );


        if ( ! empty( $product_plans ) ) {
            return $product_plans;
        }


        /*
         * Otherwise use filtered global plans.
         */
        return self::get_global_plans_for_product(
            $product_id
        );
    }
}