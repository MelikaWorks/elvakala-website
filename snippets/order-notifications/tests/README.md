# Rubika Manual Test Snippets

[فارسی (FA)](README_FA.md)

These temporary PHP snippets document the tests used during setup on 2026-11-15. They are manual diagnostic tools, not automated unit tests or production notifications.

The original logic is preserved. Tokens and chat IDs have been replaced with placeholders, and guards for execution outside WordPress and an unconfigured token have been added. The Persian test messages remain unchanged.

## Preparation

1. In WPCode, create a **PHP Snippet** using the name below.
2. Paste the corresponding file without the opening `<?php` tag.
3. Privately replace the token and both chat ID placeholders. All three values must be configured.
4. Select **Auto Insert → Run Everywhere**.
5. Activate only the diagnostic snippet being used. It sends real messages to the configured accounts.

Do not upload a configured copy, dashboard output containing chat IDs, or credentials to this public repository.

## Test 1: Initial connectivity

File: [rubika-initial-test.php](rubika-initial-test.php)  
WPCode name: `ElvaKala Rubika Test`

1. Save and activate the snippet.
2. Open **Dashboard → Home** as an administrator.
3. Read the SUCCESS / FAILED notice for each recipient.
4. Check that the test message arrived on both accounts.
5. Disable the snippet.

The option `elvakala_rubika_test_done` stops subsequent automatic attempts. It is set after the loop even when delivery fails, so it records an attempt, not successful delivery. Deactivating and reactivating the snippet does not clear this option. Use the manual test below for a deliberate retest; do not enable multiple browser requests to this initial test concurrently, since its flag is not a concurrency lock.

## Test 2: Manual notification-format test

File: [rubika-manual-test.php](rubika-manual-test.php)  
WPCode name: `ElvaKala Rubika Manual Test`

1. Save and activate the snippet.
2. Open **Dashboard → Home** as an administrator.
3. Click **تست روبیکا** (Test Rubika).
4. Inspect the SUCCESS / FAILED result for each account.
5. Confirm receipt of the message containing `TEST-123`.
6. Disable the manual-test snippet. The production order snippet remains separate.

The handler requires administrator capability and a valid WordPress nonce. Each click, or reloading the result URL while its nonce is valid, can send another message. A nonce does not make this test single-use.

The displayed “payment successful” text is a synthetic test message. No order is created or modified, no payment is collected, and no SMS-sending function is called by these snippets.

## Recorded result

| Test | Result reported during setup |
| --- | --- |
| Initial connectivity | SUCCESS for both recipients; user confirmed receipt on both phones |
| Manual notification-format test | SUCCESS for both recipients; synthetic order number TEST-123 |

Recipient identifiers are intentionally omitted from this record.

These checks verify the direct Rubika send path and message display. They do **not** invoke the production payment-complete callback, verify its deduplication, or establish that the payment gateway invokes it. Real-payment automatic delivery remains pending verification.

## Repository validation

The archived code was compared with the setup conversation. PHP CLI is unavailable in the editing environment; no PHP lint or WordPress runtime test was performed during this archive update. No new messages were sent.

[Back to integration documentation](../README.md)
