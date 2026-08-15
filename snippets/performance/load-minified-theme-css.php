add_filter('style_loader_src', function ($src, $handle) {

    // Main theme CSS
    if (strpos($src, '/wp-content/themes/mweb-digiland-pro/style.css') !== false) {
        $src = str_replace(
            '/wp-content/themes/mweb-digiland-pro/style.css',
            '/wp-content/themes/mweb-digiland-pro/style.min (1).css',
            $src
        );
    }

    // WooCommerce theme CSS
    if (strpos($src, '/wp-content/themes/mweb-digiland-pro/assets/css/woocommerce.css') !== false) {
        $src = str_replace(
            '/wp-content/themes/mweb-digiland-pro/assets/css/woocommerce.css',
            '/wp-content/themes/mweb-digiland-pro/assets/css/woocommerce.min (1).css',
            $src
        );
    }

    return $src;

}, 10, 2);
