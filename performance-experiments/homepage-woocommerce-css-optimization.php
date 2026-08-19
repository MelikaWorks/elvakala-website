/**
 * ELVAKALA - Homepage WooCommerce CSS Optimization
 *
 * Removes the large theme WooCommerce stylesheet ONLY on the homepage
 * and replaces the CSS rules actually used there.
 */

add_action('wp_enqueue_scripts', function () {

    if (!is_front_page()) {
        return;
    }

    // Remove the theme's large WooCommerce stylesheet on homepage only.
    wp_dequeue_style('woocommerce');
    wp_deregister_style('woocommerce');

}, 99999);


add_action('wp_head', function () {

    if (!is_front_page()) {
        return;
    }

    ?>
    <style id="elvakala-home-woocommerce-critical-css">

        .price {
            margin: 0;
            font-weight: 500;
            font-size: 13px;
            color: var(--maincolor);
            letter-spacing: -.01em;
            font-family: var(--mainfontnum);
        }


        .digits_ui * {
            font-family: var(--mainfontnum);
        }

        .woocommerce-mini-cart__empty-message svg {
            width: 40px;
            stroke: #999;
            display: block;
            margin: auto auto 10px;
            opacity: .3;
        }

        .amount,
        .mweb-body .woo-wallet-content {
            font-family: var(--mainfontnum);
        }

        .elementor-widget-general-slider-product .item,
        .elementor-widget-mweb-product-related .item,
        .special_wrap {
            margin: 5px 0;
            height: calc(100% - 10px);
        }

        .elementor-widget-general-slider-product .swiper,
        .elementor-widget-mweb-product-related .swiper {
            padding: 0 2px;
        }

        .elementor h1 {
            font-size: 20px;
        }

        .elementor h2 {
            font-size: 18px;
        }

        .elementor h3 {
            font-size: 16px;
        }

        .elementor h4 {
            font-size: 14px;
        }

    </style>
    <?php

}, 100);
