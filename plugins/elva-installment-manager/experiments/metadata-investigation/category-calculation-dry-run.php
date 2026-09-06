<?php
/**
 * Category calculation dry run. Reports values without writing metadata.
 */

defined( 'ABSPATH' ) || exit;

function elva_denapay_category_calculation_dry_run( $category_slug, $rate, $checks, $months ) {
    $rate   = absint( $rate );
    $checks = absint( $checks );
    $months = absint( $months );

    if ( ! $category_slug || $checks < 1 || $rate > 100 ) {
        return [];
    }

    $posts = get_posts( [
        'post_type'      => 'product',
        'posts_per_page' => -1,
        'post_status'    => 'publish',
        'tax_query'      => [ // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_tax_query
            [
                'taxonomy' => 'product_cat',
                'field'    => 'slug',
                'terms'    => sanitize_title( $category_slug ),
            ],
        ],
    ] );

    $report = [];

    foreach ( $posts as $post ) {
        $product = wc_get_product( $post->ID );

        if ( ! $product ) {
            continue;
        }

        $price        = (float) $product->get_price();
        $prepayment   = round( $price * ( $rate / 100 ) );
        $check_amount = round( ( $price - $prepayment ) / $checks );

        $report[] = [
            'product_id'   => $product->get_id(),
            'product_name' => $product->get_name(),
            'price'        => $price,
            'prepayment'   => $prepayment,
            'checks'       => $checks,
            'check_amount' => $check_amount,
            'months'       => $months,
        ];
    }

    return $report;
}

