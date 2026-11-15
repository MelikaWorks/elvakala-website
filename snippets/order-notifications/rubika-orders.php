<?php
/**
 * ElvaKala Rubika Orders — sanitized snapshot of the WPCode snippet.
 * In WPCode paste without the opening PHP tag.
 * Replace placeholders privately; never commit production configuration.
 * No scheduled retries or concurrency lock: see README.md.
 */
defined('ABSPATH') || exit;

add_action('woocommerce_payment_complete', function ($order_id) {
    $order = wc_get_order($order_id);
    if (!$order || !$order->is_paid()) {
        return;
    }

    $token = 'YOUR_BOT_TOKEN';
    $chat_ids = [
        'YOUR_FIRST_CHAT_ID',
        'YOUR_SECOND_CHAT_ID'
    ];

    // A repository copy must not send requests before private configuration.
    if ($token === 'YOUR_BOT_TOKEN') {
        return;
    }

    $message = "سفارش جدید الوا کالا\n";
    $message .= "پرداخت موفق. پیگیری شود.\n";
    $message .= "شماره سفارش: " . $order->get_order_number();

    foreach ($chat_ids as $chat_id) {
        $meta_key = '_elva_rubika_sent_' . md5($chat_id);
        if ($order->get_meta($meta_key, true)) {
            continue;
        }

        $response = wp_remote_post(
            "https://botapi.rubika.ir/v3/{$token}/sendMessage",
            [
                'timeout' => 8,
                'headers' => ['Content-Type' => 'application/json'],
                'body' => wp_json_encode([
                    'chat_id' => $chat_id,
                    'text' => $message
                ])
            ]
        );

        if (is_wp_error($response)) {
            continue;
        }

        $result = json_decode(wp_remote_retrieve_body($response), true);
        if (
            wp_remote_retrieve_response_code($response) === 200
            && ($result['status'] ?? '') === 'OK'
        ) {
            $order->update_meta_data($meta_key, 'yes');
            $order->save();
        }
    }
});
