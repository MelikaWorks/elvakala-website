/**
 * ELVAKALA - Homepage Digits Login Assets Optimization
 *
 * Removes Digits login-specific scripts and styles ONLY from the homepage.
 * Login, My Account, Checkout and other pages remain untouched.
 */

add_action('wp_enqueue_scripts', function () {

    if (!is_front_page()) {
        return;
    }

    // Digits login JS
    wp_dequeue_script('digits-login-script');
    wp_deregister_script('digits-login-script');

    // ScrollTo used by Digits login
    wp_dequeue_script('scrollTo');
    wp_deregister_script('scrollTo');

    // Phone number library used by Digits login
    wp_dequeue_script('libphonenumber-mobile');
    wp_deregister_script('libphonenumber-mobile');

    // Digits login CSS
    wp_dequeue_style('digits-login-style');
    wp_deregister_style('digits-login-style');

}, 99999);
