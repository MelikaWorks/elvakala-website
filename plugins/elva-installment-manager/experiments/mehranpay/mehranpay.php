<?php
/**
 * Plugin Name: MehranPay
 * Description: Custom installment plan rules and WooCommerce payment extensions.
 * Version: 1.0.0
 * Author: MehranPay
 * Text Domain: mehranpay
 */

defined( 'ABSPATH' ) || exit;


/**
 * =========================================================
 * MehranPay Constants
 * =========================================================
 */

define( 'MEHRANPAY_VERSION', '1.0.0' );

define(
    'MEHRANPAY_FILE',
    __FILE__
);

define(
    'MEHRANPAY_PATH',
    plugin_dir_path( __FILE__ )
);

define(
    'MEHRANPAY_URL',
    plugin_dir_url( __FILE__ )
);


/**
 * =========================================================
 * Dependency Check
 * =========================================================
 *
 * MehranPay currently extends DenaPay.
 * Do not initialize the plugin if DenaPay is unavailable.
 */

function mehranpay_dependencies_available() {

    /*
     * DenaPay exposes this function for retrieving
     * WooCommerce product categories.
     *
     * We use it as a lightweight way to confirm that
     * DenaPay has been loaded.
     */
    return function_exists(
        'denapay_get_woocommerce_categories'
    );
}


/**
 * =========================================================
 * Admin Dependency Notice
 * =========================================================
 */

function mehranpay_dependency_notice() {

    if ( ! current_user_can( 'manage_options' ) ) {
        return;
    }

    ?>
    <div class="notice notice-error">
        <p>
            <strong>MehranPay:</strong>
            افزونه DenaPay فعال یا در دسترس نیست.
            MehranPay در نسخه فعلی برای اجرا به DenaPay نیاز دارد.
        </p>
    </div>
    <?php
}


/**
 * =========================================================
 * Bootstrap
 * =========================================================
 */

function mehranpay_init() {

    /*
     * Stop initialization if DenaPay is unavailable.
     */
    if ( ! mehranpay_dependencies_available() ) {

        add_action(
            'admin_notices',
            'mehranpay_dependency_notice'
        );

        return;
    }


    /*
     * Load MehranPay components.
     */

    require_once MEHRANPAY_PATH .
        'includes/class-mehranpay-admin.php';

    require_once MEHRANPAY_PATH .
        'includes/class-mehranpay-plan-rules.php';

    require_once MEHRANPAY_PATH .
        'includes/class-mehranpay-denapay-bridge.php';


    /*
     * Initialize components.
     */

    MehranPay_Admin::init();

    MehranPay_Plan_Rules::init();

    MehranPay_DenaPay_Bridge::init();
}


/**
 * Start MehranPay after plugins are loaded.
 */
add_action(
    'plugins_loaded',
    'mehranpay_init',
    20
);