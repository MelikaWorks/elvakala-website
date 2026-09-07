/**
 * ELVAKALA - Disable Extendify CSS on Homepage
 *
 * Removes Redux Extendify utilities CSS only from the homepage.
 */
function elva_disable_extendify_css_on_homepage() {
    if ( is_admin() || ! is_front_page() ) {
        return;
    }

    wp_dequeue_style( 'redux-extendify-styles' );
}

add_action(
    'wp_enqueue_scripts',
    'elva_disable_extendify_css_on_homepage',
    PHP_INT_MAX
);

add_action(
    'wp_print_styles',
    'elva_disable_extendify_css_on_homepage',
    PHP_INT_MAX
);