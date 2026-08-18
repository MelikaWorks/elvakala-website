/**
 * ELVAKALA - Installment Sales Rules
 *
 * 1) فروش اقساطی دناپی فقط برای استان قزوین
 * 2) جلوگیری سمت سرور از ثبت سفارش اقساطی خارج قزوین
 * 3) هشدار زنده در Checkout
 * 4) نمایش شرایط اقساط روی صفحه محصول
 * 5) نمایش ارسال رایگان قزوین زیر همان شرایط
 * 6) نمایش مهلت تحویل اصل چک در صفحه پرداخت پیش‌پرداخت
 */


/* =========================================================
 * 1) SERVER-SIDE VALIDATION
 * فروش اقساطی فقط استان قزوین
 * ========================================================= */

add_action( 'woocommerce_after_checkout_validation', function( $data, $errors ) {

    // فقط برای روش پرداخت دناپی
    if (
        empty( $data['payment_method'] ) ||
        $data['payment_method'] !== 'denapay_cheque'
    ) {
        return;
    }

    // اگر ارسال به آدرس دیگری فعال است، استان ارسال را بررسی کن
    $ship_to_different = ! empty( $_POST['ship_to_different_address'] );

    if ( $ship_to_different ) {

        $state = isset( $data['shipping_state'] )
            ? strtoupper( sanitize_text_field( $data['shipping_state'] ) )
            : '';

    } else {

        $state = isset( $data['billing_state'] )
            ? strtoupper( sanitize_text_field( $data['billing_state'] ) )
            : '';
    }

    // کد استان قزوین در ووکامرس سایت الوا = GZN
    if ( $state !== 'GZN' ) {

        $errors->add(
            'elva_denapay_qazvin_only',
            'خرید اقساطی در حال حاضر فقط برای مشتریان استان قزوین فعال است. لطفاً برای ادامه خرید، روش پرداخت را به «پرداخت نقدی» تغییر دهید.'
        );
    }

}, 10, 2 );


/* =========================================================
 * 2) PRODUCT PAGE NOTICE
 * شرایط فروش اقساطی روی تمام صفحات محصول
 * ========================================================= */

add_action( 'woocommerce_after_add_to_cart_form', function() {

    if ( ! is_product() ) {
        return;
    }
    ?>

    <div class="elva-installment-notice">

        <span class="elva-installment-dot"></span>

        <div class="elva-installment-notice-text">

            <strong class="elva-installment-title">
                فروش اقساطی ویژه استان قزوین
            </strong>

            <div class="elva-installment-condition">
                اصل چک‌ها باید حداکثر ظرف
                <strong>۲۴ تا ۴۸ ساعت</strong>
                پس از ثبت سفارش به فروشگاه الوا کالا تحویل داده شود.
                ارسال کالا پس از دریافت و تأیید اصل چک‌ها انجام خواهد شد.
            </div>

            <div class="elva-qazvin-free-shipping">
                🚚 ارسال سفارش‌های بالای ۵۰۰ هزار تومان در استان قزوین رایگان است.
            </div>

        </div>

    </div>

    <?php
});


/* =========================================================
 * 3) STYLES
 * ========================================================= */

add_action( 'wp_head', function() {
    ?>

    <style>

        /* ---------- Product page notice ---------- */

        .elva-installment-notice {
            margin-top: 14px;
            padding: 12px 14px;
            border: 1px solid #034A73;
            border-radius: 10px;
            line-height: 2;
            font-size: 13px;
            display: flex;
            align-items: flex-start;
            gap: 9px;
            box-sizing: border-box;
            direction: rtl;
        }

        .elva-installment-notice-text {
            flex: 1;
        }

        .elva-installment-title {
            display: block;
            font-size: 14px;
            font-weight: 700;
            color: #034A73;
            margin-bottom: 2px;
        }

        .elva-installment-condition strong {
            font-weight: 700;
        }

        .elva-installment-dot {
            width: 9px;
            height: 9px;
            min-width: 9px;
            border-radius: 50%;
            background: #034A73;
            margin-top: 9px;
            animation: elva-installment-pulse 1.3s infinite;
        }

        .elva-qazvin-free-shipping {
            margin-top: 7px;
            padding-top: 7px;
            border-top: 1px dashed #034A73;
            font-weight: 600;
        }

        @keyframes elva-installment-pulse {

            0%,
            100% {
                opacity: 1;
                transform: scale(1);
            }

            50% {
                opacity: .25;
                transform: scale(.7);
            }
        }


        /* ---------- Checkout permanent info ---------- */

        #elva-denapay-info {
            display: none;
            margin: 12px 0;
            padding: 12px 15px;
            border: 1px solid #034A73;
            border-radius: 8px;
            background: #f5f9fc;
            font-size: 13px;
            line-height: 2;
            box-sizing: border-box;
            direction: rtl;
        }

        #elva-denapay-info strong {
            color: #034A73;
            font-weight: 700;
        }


        /* ---------- Checkout Qazvin error ---------- */

        #elva-denapay-qazvin-warning {
            display: none;
            margin: 12px 0;
            padding: 12px 15px;
            border: 1px solid #d63638;
            border-radius: 8px;
            font-size: 14px;
            line-height: 2;
            background: #fff6f6;
            box-sizing: border-box;
            direction: rtl;
        }

        #elva-denapay-qazvin-warning strong {
            font-weight: 700;
        }


        /* ---------- Order Pay / Deposit page ---------- */

        .elva-order-pay-cheque-notice {
            margin: 15px 0;
            padding: 14px 16px;
            border: 1px solid #034A73;
            border-radius: 10px;
            background: #f5f9fc;
            line-height: 2;
            font-size: 14px;
            direction: rtl;
            box-sizing: border-box;
        }

        .elva-order-pay-cheque-notice-title {
            display: block;
            color: #034A73;
            font-size: 15px;
            font-weight: 700;
            margin-bottom: 4px;
        }

        .elva-order-pay-cheque-notice strong {
            font-weight: 700;
        }

    </style>

    <?php
});


/* =========================================================
 * 4) LIVE CHECKOUT MESSAGES
 *
 * - وقتی دناپی انتخاب شده، شرایط قزوین همیشه نمایش داده شود
 * - اگر استان غیر قزوین بود، هشدار قرمز نیز نمایش داده شود
 * ========================================================= */

add_action( 'wp_footer', function() {

    if (
        ! is_checkout() ||
        is_wc_endpoint_url( 'order-received' ) ||
        is_wc_endpoint_url( 'order-pay' )
    ) {
        return;
    }

    ?>

    <script>

        jQuery(function($) {

            function elvaCheckDenaPayProvince() {

                const paymentMethod =
                    $('input[name="payment_method"]:checked').val();

                let state = '';

                // اگر ارسال به آدرس دیگری فعال باشد
                if (
                    $('#ship-to-different-address-checkbox').length &&
                    $('#ship-to-different-address-checkbox').is(':checked')
                ) {

                    state = $('#shipping_state').val();

                } else {

                    state = $('#billing_state').val();
                }


                /* -----------------------------------------
                 * باکس دائمی شرایط فروش اقساطی
                 * ----------------------------------------- */

                if (!$('#elva-denapay-info').length) {

                    $('#payment').prepend(

                        '<div id="elva-denapay-info">' +

                            '<strong>شرایط خرید اقساطی:</strong><br>' +

                            'فروش اقساطی در حال حاضر ویژه مشتریان استان قزوین است. ' +

                            'اصل چک‌ها باید حداکثر ظرف ' +

                            '<strong>۲۴ تا ۴۸ ساعت</strong> ' +

                            'پس از ثبت سفارش به فروشگاه الوا کالا تحویل داده شوند. ' +

                            'ارسال کالا پس از دریافت و تأیید اصل چک‌ها انجام خواهد شد.' +

                        '</div>'
                    );
                }


                /* -----------------------------------------
                 * هشدار استان غیر قزوین
                 * ----------------------------------------- */

                if (!$('#elva-denapay-qazvin-warning').length) {

                    $('#payment').prepend(

                        '<div id="elva-denapay-qazvin-warning">' +

                            '<strong>توجه:</strong> ' +

                            'خرید اقساطی در حال حاضر فقط برای مشتریان استان قزوین فعال است. ' +

                            'لطفاً برای ادامه خرید، روش پرداخت را به ' +

                            '<strong>«پرداخت نقدی»</strong> تغییر دهید.' +

                        '</div>'
                    );
                }


                /* -----------------------------------------
                 * نمایش باکس شرایط فقط هنگام انتخاب دناپی
                 * ----------------------------------------- */

                if ( paymentMethod === 'denapay_cheque' ) {

                    $('#elva-denapay-info')
                        .stop(true, true)
                        .slideDown(200);

                } else {

                    $('#elva-denapay-info')
                        .stop(true, true)
                        .slideUp(200);
                }


                /* -----------------------------------------
                 * خطا فقط برای دناپی + استان غیر قزوین
                 * ----------------------------------------- */

                if (
                    paymentMethod === 'denapay_cheque' &&
                    state &&
                    state !== 'GZN'
                ) {

                    $('#elva-denapay-qazvin-warning')
                        .stop(true, true)
                        .slideDown(200);

                } else {

                    $('#elva-denapay-qazvin-warning')
                        .stop(true, true)
                        .slideUp(200);
                }
            }


            // بعد از AJAX ووکامرس
            $(document.body).on(
                'updated_checkout',
                elvaCheckDenaPayProvince
            );


            // تغییر استان، روش پرداخت یا آدرس ارسال
            $(document).on(
                'change',
                'input[name="payment_method"], #billing_state, #shipping_state, #ship-to-different-address-checkbox',
                elvaCheckDenaPayProvince
            );


            // اجرای اولیه
            elvaCheckDenaPayProvince();

        });

    </script>

    <?php

});


/* =========================================================
 * 5) ORDER-PAY PAGE NOTICE
 *
 * صفحه‌ای که بعد از ثبت سفارش اقساطی باز می‌شود
 * و مشتری ۳۰٪ پیش‌پرداخت را با زرین‌پال پرداخت می‌کند.
 * ========================================================= */

add_action( 'woocommerce_pay_order_before_payment', function() {

    if ( ! is_wc_endpoint_url( 'order-pay' ) ) {
        return;
    }

    $order_id = absint( get_query_var( 'order-pay' ) );

    if ( ! $order_id ) {
        return;
    }

    $order = wc_get_order( $order_id );

    if ( ! $order ) {
        return;
    }

    /*
     * فقط برای سفارش‌هایی که ابتدا با دناپی ساخته شده‌اند.
     */
    if ( $order->get_payment_method() !== 'denapay_cheque' ) {
        return;
    }

    ?>

    <div class="elva-order-pay-cheque-notice">

        <span class="elva-order-pay-cheque-notice-title">
            توجه – شرایط تحویل اصل چک‌ها
        </span>

        <div>
            پس از پرداخت پیش‌پرداخت،
            اصل چک‌ها باید حداکثر ظرف
            <strong>۲۴ تا ۴۸ ساعت</strong>
            به فروشگاه الوا کالا تحویل داده شوند.
        </div>

        <div>
            پردازش و ارسال سفارش تنها پس از
            <strong>دریافت و تأیید اصل چک‌ها</strong>
            انجام خواهد شد.
        </div>

    </div>

    <?php

}, 5 );
