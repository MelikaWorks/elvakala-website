/**
 * ELVA KALA
 * DenaPay Product Meta Inspector
 *
 * Development tool only.
 * Not loaded in production.
 *
 * Purpose:
 * Inspect DenaPay product metadata structure
 * before implementing synchronization.
 *
 * Read-only diagnostic tool.
 */

add_action( 'admin_notices', function () {

    if ( ! is_admin() ) {
        return;
    }

    if ( empty( $_GET['post'] ) ) {
        return;
    }

    $product_id = absint( $_GET['post'] );

    if ( get_post_type( $product_id ) !== 'product' ) {
        return;
    }

    $enabled = get_post_meta(
        $product_id,
        '_denapay_installment_enabled',
        true
    );

    $plans = get_post_meta(
        $product_id,
        '_denapay_installment_plans',
        true
    );

    echo '<div class="notice notice-info">';
    echo '<p><strong>ELVA DenaPay Debug</strong></p>';

    echo '<p><strong>Product ID:</strong> '
        . esc_html( $product_id )
        . '</p>';

    echo '<p><strong>_denapay_installment_enabled:</strong></p>';
    echo '<pre style="direction:ltr;text-align:left;white-space:pre-wrap;">';
    print_r( $enabled );
    echo '</pre>';

    echo '<p><strong>_denapay_installment_plans:</strong></p>';
    echo '<pre style="direction:ltr;text-align:left;white-space:pre-wrap;">';
    print_r( $plans );
    echo '</pre>';

    echo '</div>';
});
