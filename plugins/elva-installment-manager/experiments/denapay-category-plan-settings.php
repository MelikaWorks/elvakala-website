<?php

/**
 * ELVAKALA - DenaPay Category Plan Settings
 *
 * EXPERIMENTAL / DISABLED
 *
 * Phase 1 of the original category-based installment plan approach.
 *
 * This experiment extended DenaPay's existing installment-plan
 * settings UI instead of creating a separate ELVA rule engine.
 *
 * It added:
 * - A scope selector to each DenaPay installment plan
 * - Category selection for category-specific plans
 * - Backward compatibility for existing global plans
 *
 * This phase modified the admin configuration only.
 * It did not yet change DenaPay's runtime plan-selection logic.
 *
 * The approach was later abandoned in favor of ELVA-managed rules
 * and product-specific DenaPay plan synchronization.
 *
 * Preserved as part of the project's development history.
 */

add_filter( 'csf_dena_pay_settings_sections', function ( $sections ) {

    foreach ( $sections as &$section ) {

        if ( empty( $section['fields'] ) || ! is_array( $section['fields'] ) ) {
            continue;
        }

        foreach ( $section['fields'] as &$field ) {

            /*
             * Find DenaPay default installment plans repeater.
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
             * Prevent duplicate insertion.
             */
            $has_scope_field      = false;
            $has_categories_field = false;

            foreach ( $field['fields'] as $plan_field ) {

                if ( empty( $plan_field['id'] ) ) {
                    continue;
                }

                if ( $plan_field['id'] === 'elva_plan_scope' ) {
                    $has_scope_field = true;
                }

                if ( $plan_field['id'] === 'elva_categories' ) {
                    $has_categories_field = true;
                }
            }

            /*
             * If our fields already exist, leave the repeater alone.
             */
            if ( $has_scope_field && $has_categories_field ) {
                continue;
            }

            $new_fields = array();

            foreach ( $field['fields'] as $plan_field ) {

                $new_fields[] = $plan_field;

                /*
                 * Insert ELVA fields immediately after plan title.
                 */
                if (
                    ! empty( $plan_field['id'] ) &&
                    $plan_field['id'] === 'title'
                ) {

                    if ( ! $has_scope_field ) {

                        $new_fields[] = array(
                            'id'       => 'elva_plan_scope',
                            'type'     => 'select',
                            'title'    => 'حوزه اجرای این طرح',
                            'subtitle' => 'مشخص کنید این طرح عمومی باشد یا فقط برای دسته‌های خاص اجرا شود.',
                            'options'  => array(
                                'global'              => 'عمومی — برای همه محصولات مشمول اقساط',
                                'specific_categories' => 'فقط برای دسته‌های خاص',
                            ),

                            /*
                             * Old plans without this value
                             * continue to behave as global plans.
                             */
                            'default' => 'global',
                        );
                    }

                    if ( ! $has_categories_field ) {

                        $new_fields[] = array(
                            'id'          => 'elva_categories',
                            'type'        => 'select',
                            'title'       => 'دسته‌های این طرح',
                            'subtitle'    => 'این طرح فقط برای محصولات دسته‌های انتخاب‌شده نمایش داده خواهد شد.',
                            'placeholder' => 'دسته‌ها را انتخاب کنید',
                            'chosen'      => true,
                            'multiple'    => true,

                            /*
                             * Reuse DenaPay's existing WooCommerce
                             * category provider.
                             */
                            'options' => 'denapay_get_woocommerce_categories',

                            /*
                             * Category selection is only visible
                             * for category-specific plans.
                             */
                            'dependency' => array(
                                'elva_plan_scope',
                                '==',
                                'specific_categories'
                            ),
                        );
                    }
                }
            }

            $field['fields'] = $new_fields;
        }

        unset( $field );
    }

    unset( $section );

    return $sections;

}, 20 );
