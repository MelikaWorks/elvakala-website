<?php

defined( 'ABSPATH' ) || exit;


/**
 * =========================================================
 * MehranPay Admin
 * =========================================================
 *
 * Extends DenaPay admin settings.
 */
class MehranPay_Admin {

    /**
     * Register admin hooks.
     */
    public static function init() {

        add_filter(
            'csf_dena_pay_settings_sections',
            array( __CLASS__, 'extend_denapay_plan_settings' ),
            20
        );
    }


    /**
     * Add MehranPay fields to DenaPay installment plans.
     *
     * Adds:
     *
     * - Plan scope
     * - Product categories
     *
     * Existing DenaPay plans remain global by default.
     */
    public static function extend_denapay_plan_settings( $sections ) {

        if ( empty( $sections ) || ! is_array( $sections ) ) {
            return $sections;
        }

        foreach ( $sections as &$section ) {

            if (
                empty( $section['fields'] ) ||
                ! is_array( $section['fields'] )
            ) {
                continue;
            }

            foreach ( $section['fields'] as &$field ) {

                /*
                 * Find DenaPay default installment
                 * plans repeater.
                 */
                if (
                    empty( $field['id'] ) ||
                    $field['id'] !== 'default_installment_plans' ||
                    empty( $field['fields'] ) ||
                    ! is_array( $field['fields'] )
                ) {
                    continue;
                }


                /*
                 * Prevent duplicate field insertion.
                 */
                $has_scope_field      = false;
                $has_categories_field = false;

                foreach ( $field['fields'] as $plan_field ) {

                    if ( empty( $plan_field['id'] ) ) {
                        continue;
                    }

                    if (
                        $plan_field['id'] ===
                        'mehranpay_plan_scope'
                    ) {
                        $has_scope_field = true;
                    }

                    if (
                        $plan_field['id'] ===
                        'mehranpay_categories'
                    ) {
                        $has_categories_field = true;
                    }
                }


                /*
                 * Nothing else to add.
                 */
                if (
                    $has_scope_field &&
                    $has_categories_field
                ) {
                    continue;
                }


                $new_fields = array();


                foreach ( $field['fields'] as $plan_field ) {

                    $new_fields[] = $plan_field;


                    /*
                     * Insert MehranPay fields
                     * immediately after plan title.
                     */
                    if (
                        empty( $plan_field['id'] ) ||
                        $plan_field['id'] !== 'title'
                    ) {
                        continue;
                    }


                    /*
                     * Plan Scope
                     */
                    if ( ! $has_scope_field ) {

                        $new_fields[] = array(

                            'id' =>
                                'mehranpay_plan_scope',

                            'type' =>
                                'select',

                            'title' =>
                                'حوزه اجرای این طرح',

                            'subtitle' =>
                                'مشخص کنید این طرح عمومی باشد یا فقط برای دسته‌های خاص اجرا شود.',

                            'options' => array(

                                'global' =>
                                    'عمومی — برای همه محصولات مشمول اقساط',

                                'specific_categories' =>
                                    'فقط برای دسته‌های خاص',
                            ),

                            /*
                             * Backward compatibility:
                             *
                             * Existing plans created before
                             * MehranPay remain global.
                             */
                            'default' =>
                                'global',
                        );
                    }


                    /*
                     * Category Selector
                     */
                    if ( ! $has_categories_field ) {

                        $new_fields[] = array(

                            'id' =>
                                'mehranpay_categories',

                            'type' =>
                                'select',

                            'title' =>
                                'دسته‌های این طرح',

                            'subtitle' =>
                                'این طرح فقط برای محصولات دسته‌های انتخاب‌شده استفاده خواهد شد.',

                            'placeholder' =>
                                'دسته‌ها را انتخاب کنید',

                            'chosen' =>
                                true,

                            'multiple' =>
                                true,

                            /*
                             * Use DenaPay's own WooCommerce
                             * category provider.
                             */
                            'options' =>
                                'denapay_get_woocommerce_categories',

                            /*
                             * Only display categories when
                             * category-specific scope is selected.
                             */
                            'dependency' => array(

                                'mehranpay_plan_scope',

                                '==',

                                'specific_categories',
                            ),
                        );
                    }
                }


                /*
                 * Replace repeater fields
                 * with extended version.
                 */
                $field['fields'] = $new_fields;
            }

            unset( $field );
        }

        unset( $section );


        return $sections;
    }
}