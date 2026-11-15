# ELVA KALA Order Notifications — Rubika and SMS

[فارسی (FA)](README_FA.md)

Recorded: 2026-11-15

This directory archives a sanitized copy of the Rubika WPCode snippet and links to the existing SMS configuration. Committing these files does not install or change the live website.

## Files

- [Rubika order snippet](rubika-orders.php)
- [NikSMS configuration](../../Plugin-Customizations/NikSMS/README.md)
- [Verification record and limitations](verification.md)

## Install or restore in WPCode

1. Create a PHP Snippet named `ElvaKala Rubika Orders`.
2. Paste the PHP file without its opening `<?php` line.
3. Replace `YOUR_BOT_TOKEN`, `YOUR_FIRST_CHAT_ID`, and `YOUR_SECOND_CHAT_ID` only in the private site dashboard. Never commit the configured copy.
4. Select **Auto Insert → Run Everywhere**.
5. Disable the previous copy when replacing it; keep only one order-notification snippet active.
6. Before enabling on a new site, check the configuration and the payment gateway's payment-complete behavior.

The archived snippet preserves the implementation from the setup conversation. Private values have been replaced with placeholders, and guards have been added for execution outside WordPress and an unconfigured token. This repository update did not change the live snippet.

## Behavior

On `woocommerce_payment_complete`, the snippet loads the order and checks `is_paid()`. It sends a short notification containing the order number to each recipient. Only HTTP 200 with `status = OK` marks that recipient's notification as sent.

The production message remains in Persian. Its English meaning is:

> New ELVA KALA order  
> Payment successful. Please follow up.  
> Order number: [order number]

Order metadata uses the prefix `_elva_rubika_sent_` followed by the MD5 hash of the recipient's chat ID. This prevents repeated sequential sends after success; it does not guarantee exactly-once delivery under concurrent requests.

## Add a recipient

The recipient sends a message to [ElvaKalaOrderBot](https://rubika.ir/ElvaKalaOrderBot). An administrator privately obtains the chat ID and adds it to the `chat_ids` array in WPCode. The token belongs to the bot; a separate token is not needed for each recipient.

Adding a recipient does not automatically send historical orders. The temporary chat-discovery snippet should not remain permanently enabled.

## Snippet status

| Snippet | Recorded status / action |
| --- | --- |
| ElvaKala Rubika Orders | User confirmed activation |
| ElvaKala Rubika Test | User confirmed deactivation |
| ElvaKala Rubika Notifications | User confirmed deactivation |
| ElvaKala Rubika Manual Test | Test succeeded; deactivation was requested, but final confirmation is absent from the available conversation |

Test snippets are separate from the production snippet. The manual test and its result are documented in the verification record.

## Limitations and maintenance

- Automatic delivery after a real gateway payment remains unverified.
- Manually changing order status does not necessarily invoke this callback.
- Concurrent execution or a connection failure after provider acceptance can cause duplicates.
- Failed sends remain unmarked; there is no queue or scheduled retry.
- Requests run synchronously during callback processing, sequentially per recipient, with an eight-second timeout each.
- A previously exposed token should be rotated through bot management and updated privately in WPCode. Rotation was not performed during this repository update.
- This archive adds no SMS-sending code and does not change the SMS plugin configuration.
