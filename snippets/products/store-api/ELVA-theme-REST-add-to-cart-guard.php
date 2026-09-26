<?php
/**
 * ELVA defensive guard for mweb-digiland-pro 17.0.2.
 *
 * The encoded theme callback custom_woocommerce_product_add_to_cart_text()
 * relies on a global product object. WooCommerce Store API can call it when
 * that global is null, causing a fatal error. Keep the theme behavior on the
 * storefront, but let WooCommerce use its safe default text in REST requests.
 *
 * Install later as a PHP WPCode snippet set to Run Everywhere.
 */
add_action( 'rest_api_init', static function () {
	$priority = has_filter(
		'woocommerce_product_add_to_cart_text',
		'custom_woocommerce_product_add_to_cart_text'
	);

	if ( false !== $priority ) {
		remove_filter(
			'woocommerce_product_add_to_cart_text',
			'custom_woocommerce_product_add_to_cart_text',
			$priority
		);
	}
}, 1 );
