<?php
/**
 * Temporary WPCode manual delivery test, sanitized from the setup conversation.
 * Paste without the opening PHP tag. Disable after testing.
 */
defined('ABSPATH') || exit;

add_action('admin_notices', function () {
    if (!current_user_can('manage_options')) return;

    $url = wp_nonce_url(
        admin_url('admin-post.php?action=elva_rubika_test'),
        'elva_rubika_test'
    );

    echo '<div class="notice notice-info"><p>';
    echo '<a class="button button-primary" href="' .
         esc_url($url) . '">تست روبیکا</a>';
    echo '</p></div>';
});

add_action('admin_post_elva_rubika_test', function () {
    if (!current_user_can('manage_options')) {
        wp_die('Access denied');
    }

    check_admin_referer('elva_rubika_test');

    $token = 'YOUR_BOT_TOKEN';
    $chat_ids = [
        'YOUR_FIRST_CHAT_ID',
        'YOUR_SECOND_CHAT_ID'
    ];
    if ($token === 'YOUR_BOT_TOKEN') {
        wp_die('Configure the bot token and chat IDs privately before testing.');
    }

    $results = [];

    foreach ($chat_ids as $chat_id) {
        $response = wp_remote_post(
            "https://botapi.rubika.ir/v3/{$token}/sendMessage",
            [
                'timeout' => 15,
                'headers' => ['Content-Type' => 'application/json'],
                'body' => wp_json_encode([
                    'chat_id' => $chat_id,
                    'text' => "تست اعلان سفارش الوا کالا\nپرداخت موفق. پیگیری شود.\nشماره سفارش: TEST-123"
                ])
            ]
        );

        if (is_wp_error($response)) {
            $success = false;
        } else {
            $body = json_decode(wp_remote_retrieve_body($response), true);
            $success =
                wp_remote_retrieve_response_code($response) === 200
                && ($body['status'] ?? '') === 'OK';
        }

        $results[] = substr($chat_id, 0, 8) . ': ' .
            ($success ? 'SUCCESS' : 'FAILED');
    }

    wp_die(
        esc_html(implode(' | ', $results)),
        'Rubika Test',
        ['response' => 200]
    );
});
