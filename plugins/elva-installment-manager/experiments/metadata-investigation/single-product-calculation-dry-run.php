<?php
/**
 * Calculation-only DenaPay structure test for one WooCommerce product.
 * No metadata is written.
 */

defined( 'ABSPATH' ) || exit;

function elva_denapay_calculation_dry_run( $product_id, $rate, $checks, $months ) {
    $product = wc_get_product( absint( $product_id ) );
    $rate    = absint( $rate );
    $checks  = absint( $checks );
    $months  = absint( $months );

    if ( ! $product || $checks < 1 || $rate > 100 ) {
        return [];
    }

    $price        = (float) $product->get_price();
    $prepayment   = round( $price * ( $rate / 100 ) );
    $check_amount = round( ( $price - $prepayment ) / $checks );

    return [
        'product_id' => $product->get_id(),
        'price'      => $price,
        'plans'      => [
            [
                'months'       => $months,
                'checks'       => $checks,
                'prepayment'   => $prepayment,
                'check_amount' => $check_amount,
                'type'         => 'monthly',
            ],
        ],
    ];
}

