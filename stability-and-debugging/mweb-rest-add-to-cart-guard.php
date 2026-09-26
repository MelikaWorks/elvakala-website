<?php
/**
 * Prevent an encoded MWEB theme callback from crashing WooCommerce Store API
 * requests when no global product object is available.
 *
 * WPCode configuration:
 * - Code type: PHP Snippet
 * - Insertion: Auto Insert
 * - Location: Run Everywhere
 */
add_action('rest_api_init', function () {
    global $wp_filter;

    $hook_name = 'woocommerce_product_add_to_cart_text';

    if (
        empty($wp_filter[$hook_name]) ||
        !($wp_filter[$hook_name] instanceof WP_Hook)
    ) {
        return;
    }

    foreach ($wp_filter[$hook_name]->callbacks as $priority => $callbacks) {
        foreach ($callbacks as $callback) {
            if (
                isset($callback['function']) &&
                $callback['function'] === 'custom_woocommerce_product_add_to_cart_text'
            ) {
                remove_filter(
                    $hook_name,
                    'custom_woocommerce_product_add_to_cart_text',
                    $priority
                );
            }
        }
    }
}, 1);

