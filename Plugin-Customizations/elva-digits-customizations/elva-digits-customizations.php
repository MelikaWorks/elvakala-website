/**
 * ELVAKALA - Digits Local LibPhoneNumber
 *
 * Replaces Digits external unpkg.com libphonenumber dependency
 * with a locally hosted copy.
 */

add_action('wp_enqueue_scripts', function () {

    // Only replace it if Digits has registered/enqueued the library.
    if (
        !wp_script_is('libphonenumber-mobile', 'registered') &&
        !wp_script_is('libphonenumber-mobile', 'enqueued')
    ) {
        return;
    }

    // Remove Digits external CDN version.
    wp_dequeue_script('libphonenumber-mobile');
    wp_deregister_script('libphonenumber-mobile');

    // Register local version with the SAME handle.
    wp_register_script(
        'libphonenumber-mobile',
        content_url('/uploads/elva-assets/libphonenumber-max.js'),
        array('jquery'),
        null,
        true
    );

    // Load local version.
    wp_enqueue_script('libphonenumber-mobile');

}, 9999);
