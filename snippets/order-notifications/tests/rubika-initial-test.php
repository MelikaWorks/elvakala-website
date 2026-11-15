<?php
/**
 * Temporary WPCode connectivity test, sanitized from the setup conversation.
 * Paste without the opening PHP tag. Disable after testing.
 */
defined('ABSPATH') || exit;

add_action('admin_notices', function () {
    if (!current_user_can('manage_options')) return;

    $token = 'YOUR_BOT_TOKEN';
    $chat_ids = [
        'YOUR_FIRST_CHAT_ID',
        'YOUR_SECOND_CHAT_ID'
    ];
    if ($token === 'YOUR_BOT_TOKEN') return;

    $message = 'تست ربات الوا کالا - اتصال موفق';

    if (get_option('elvakala_rubika_test_done')) {
        return;
    }

    foreach ($chat_ids as $chat_id) {
        $response = wp_remote_post(
            "https://botapi.rubika.ir/v3/{$token}/sendMessage",
            [
                'timeout' => 15,
                'headers' => ['Content-Type' => 'application/json'],
                'body' => wp_json_encode([
                    'chat_id' => $chat_id,
                    'text' => $message
                ])
            ]
        );

        $result = is_wp_error($response)
            ? null
            : json_decode(wp_remote_retrieve_body($response), true);

        $success = !is_wp_error($response)
            && wp_remote_retrieve_response_code($response) === 200
            && ($result['status'] ?? '') === 'OK';

        echo '<div class="notice notice-info"><p>';
        echo esc_html(
            'Rubika ' . substr($chat_id, 0, 8) . ': '
            . ($success ? 'SUCCESS' : 'FAILED')
        );
        echo '</p></div>';
    }

    update_option('elvakala_rubika_test_done', 1, false);
});
