/**
 * ELVAKALA - Disable DenaPay Assets on Homepage
 *
 * EXPERIMENTAL / DISABLED
 *
 * Removes DenaPay CSS/JS only from the homepage.
 * DenaPay form pages remain untouched.
 *
 * This approach was tested during development but was not included
 * in the final implementation.
 * It is preserved here as part of the development history.
 */
/**
 * ELVAKALA - Disable DenaPay Assets on Homepage
 *
 * Removes DenaPay CSS/JS only from the homepage.
 * DenaPay form pages remain untouched.
 */

function elva_remove_denapay_home_assets() {

    if (!is_front_page()) {
        return;
    }

    // CSS
    wp_dequeue_style('dena-payseew');
    wp_deregister_style('dena-payseew');

    wp_dequeue_style('dena-pay-public-css');
    wp_deregister_style('dena-pay-public-css');

    // JS
    wp_dequeue_script('dena-pay-public-sweetalert');
    wp_deregister_script('dena-pay-public-sweetalert');

    wp_dequeue_script('dena-pay-public-app');
    wp_deregister_script('dena-pay-public-app');
}

add_action('wp_enqueue_scripts', 'elva_remove_denapay_home_assets', PHP_INT_MAX);
add_action('wp_print_styles', 'elva_remove_denapay_home_assets', PHP_INT_MAX);
add_action('wp_print_footer_scripts', 'elva_remove_denapay_home_assets', PHP_INT_MAX);
