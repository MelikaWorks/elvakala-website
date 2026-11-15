# NikSMS Order Notification Integration

[فارسی (FA)](README_FA.md)

Documented: 2026-11-15

## Existing implementation

Order SMS notifications are configured through the **Persian WooCommerce SMS** plugin (پیامک ووکامرس فارسی) and **NikSMS.com**. This directory documents configuration; it does not contain a new custom SMS sender or redistribute the commercial plugin source.

The following details come from the setup history. The live dashboard was not inspected during this repository update.

| Setting | Recorded configuration |
| --- | --- |
| Provider | NikSMS.com |
| Plugin | Persian WooCommerce SMS |
| Connection tab | Web service (وب‌سرویس) |
| Administrator tab | General administrator SMS (پیامک مدیر کل) |
| Enabled order status | Processing (در حال انجام) |
| Administrator recipients | Three; phone numbers are private |
| Reported result | Customer and administrator SMS delivery working |

## Restore configuration

1. Inspect the installed plugin and open its Web service tab.
2. Select NikSMS and enter credentials from the private provider account. Match field names and requirements to the installed version.
3. In the administrator SMS tab, configure the three approved recipients using private site records.
4. Compare the Processing status selection and message templates with the site's current configuration.
5. Verify customer and administrator delivery separately. Record results without phone numbers or customer data.

The exact message templates, plugin version, sender number, and complete set of enabled events are not available in the setup record. This guide is not a complete settings export or importable backup. Unknown values have not been invented.

## Relationship to Rubika

[Rubika notifications](../../snippets/order-notifications/README.md) operate independently of SMS. A successful Rubika send does not verify SMS delivery or the payment gateway callback. The Rubika snippet does not modify SMS settings.

## History and private data

The [WPCode inventory](../../snippets/WPCODE-INVENTORY.md) records a previous SMS experiment that was rolled back. Do not reactivate that experimental code.

Keep usernames, passwords, API keys, sender numbers, recipient numbers, customer order data, and raw configuration exports out of the public repository. Digits OTP settings are separate from order notifications and are not changed by this guide.
