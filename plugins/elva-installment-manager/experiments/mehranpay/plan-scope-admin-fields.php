<?php
/**
 * Archived MehranPay experiment: extend DenaPay plan settings with scope and
 * WooCommerce categories. Admin UI and saving only; no execution filtering.
 */

defined( 'ABSPATH' ) || exit;

add_filter( 'csf_dena_pay_settings_sections', function ( $sections ) {
    foreach ( $sections as &$section ) {
        if ( empty( $section['fields'] ) || ! is_array( $section['fields'] ) ) {
            continue;
        }

        foreach ( $section['fields'] as &$field ) {
            if (
                empty( $field['id'] ) ||
                'default_installment_plans' !== $field['id'] ||
                empty( $field['fields'] ) ||
                ! is_array( $field['fields'] )
            ) {
                continue;
            }

            $has_scope      = false;
            $has_categories = false;

            foreach ( $field['fields'] as $plan_field ) {
                $id = isset( $plan_field['id'] ) ? $plan_field['id'] : '';
                $has_scope      = $has_scope || 'elva_plan_scope' === $id;
                $has_categories = $has_categories || 'elva_categories' === $id;
            }

            if ( $has_scope && $has_categories ) {
                continue;
            }

            $new_fields = [];

            foreach ( $field['fields'] as $plan_field ) {
                $new_fields[] = $plan_field;

                if ( empty( $plan_field['id'] ) || 'title' !== $plan_field['id'] ) {
                    continue;
                }

                if ( ! $has_scope ) {
                    $new_fields[] = [
                        'id'      => 'elva_plan_scope',
                        'type'    => 'select',
                        'title'   => 'Plan scope',
                        'options' => [
                            'global'              => 'Global',
                            'specific_categories' => 'Specific categories',
                        ],
                        'default' => 'global',
                    ];
                }

                if ( ! $has_categories ) {
                    $new_fields[] = [
                        'id'          => 'elva_categories',
                        'type'        => 'select',
                        'title'       => 'Plan categories',
                        'placeholder' => 'Select categories',
                        'chosen'      => true,
                        'multiple'    => true,
                        'options'     => 'denapay_get_woocommerce_categories',
                        'dependency'  => [
                            'elva_plan_scope',
                            '==',
                            'specific_categories',
                        ],
                    ];
                }
            }

            $field['fields'] = $new_fields;
        }

        unset( $field );
    }

    unset( $section );
    return $sections;
}, 20 );

