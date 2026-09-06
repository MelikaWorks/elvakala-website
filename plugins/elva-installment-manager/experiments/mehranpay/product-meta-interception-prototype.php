<?php
/**
 * Archived failed-path prototype.
 *
 * It attempted to expose category-matched global plans through the product
 * metadata read path. DenaPay had additional independent plan readers, so this
 * could not guarantee product/cart/checkout consistency.
 *
 * Do not deploy this file.
 */

defined( 'ABSPATH' ) || exit;

add_filter(
    'get_post_metadata',
    function ( $value, $object_id, $meta_key, $single, $meta_type ) {
        if ( '_denapay_installment_plans' !== $meta_key ) {
            return $value;
        }

        static $running = false;

        if ( $running || 'product' !== get_post_type( $object_id ) ) {
            return $value;
        }

        $running  = true;
        $existing = get_metadata_raw(
            'post',
            $object_id,
            '_denapay_installment_plans',
            true
        );
        $running = false;

        if ( ! empty( $existing ) && is_array( $existing ) ) {
            return $value;
        }

        $settings = get_option( 'dena_pay_settings', [] );
        $plans    = isset( $settings['default_installment_plans'] )
            ? $settings['default_installment_plans']
            : [];

        if ( ! function_exists( 'mehranpay_experiment_match_plans' ) ) {
            return $value;
        }

        $matched = mehranpay_experiment_match_plans( $plans, $object_id );

        if ( empty( $matched ) ) {
            return $value;
        }

        return $single ? $matched : [ $matched ];
    },
    20,
    5
);

