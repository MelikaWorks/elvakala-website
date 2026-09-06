<?php
/**
 * Read-only DenaPay product metadata inspector for WooCommerce administrators.
 */

defined( 'ABSPATH' ) || exit;

add_action( 'admin_notices', function () {
    if ( ! is_admin() || ! current_user_can( 'manage_woocommerce' ) ) {
        return;
    }

    $product_id = isset( $_GET['post'] )
        ? absint( wp_unslash( $_GET['post'] ) )
        : 0;

    if ( ! $product_id || 'product' !== get_post_type( $product_id ) ) {
        return;
    }

    $enabled = get_post_meta( $product_id, '_denapay_installment_enabled', true );
    $plans   = get_post_meta( $product_id, '_denapay_installment_plans', true );

    echo '<div class="notice notice-info">';
    echo '<p><strong>DenaPay Product Meta Inspector</strong></p>';
    echo '<p><strong>Product ID:</strong> ' . esc_html( $product_id ) . '</p>';
    echo '<p><strong>_denapay_installment_enabled:</strong></p>';
    echo '<pre style="direction:ltr;text-align:left;white-space:pre-wrap;">';
    echo esc_html( print_r( $enabled, true ) ); // phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_print_r
    echo '</pre>';
    echo '<p><strong>_denapay_installment_plans:</strong></p>';
    echo '<pre style="direction:ltr;text-align:left;white-space:pre-wrap;">';
    echo esc_html( print_r( $plans, true ) ); // phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_print_r
    echo '</pre>';
    echo '</div>';
} );

