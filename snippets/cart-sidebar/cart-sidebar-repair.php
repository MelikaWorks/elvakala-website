/**
 * ELVAKALA - Cart Sidebar Repair
 *
 * Fixes the Elementor desktop cart widget, which originally renders only
 * a hover-based mini-cart dropdown and redirects clicks to the cart page.
 *
 * This snippet converts the existing `.shop_detail` mini-cart into a
 * right-side off-canvas panel and provides:
 *
 * - Click-to-open behavior
 * - Overlay and background scroll lock
 * - Close button, overlay click, and Escape-key support
 * - Responsive desktop and mobile styling
 * - Delegated click handling so the the sidebar continues working after
 *   WooCommerce AJAX cart-fragment updates replace the cart trigger
 *
 * Elementor widget dependency:
 * `.elementor-element-2646698`
 *
 * WooCommerce mini-cart content and AJAX functionality remain unchanged.
 */

add_action( 'wp_head', function () {
    ?>
    <style id="elva-header-cart-sidebar-css">
        .elementor-element-2646698 .shop_detail.elva-cart-drawer {
            display: block !important;
            position: fixed !important;
            top: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            left: auto !important;
            z-index: 1000001 !important;

            width: min(420px, 92vw) !important;
            height: 100vh !important;
            height: 100dvh !important;
            max-width: none !important;
            max-height: none !important;

            margin: 0 !important;
            padding: 58px 20px 24px !important;
            overflow-y: auto !important;

            background: #fff !important;
            opacity: 1 !important;
            visibility: visible !important;
            pointer-events: none !important;

            transform: translateX(105%) !important;
            transition: transform 0.3s ease !important;
            box-shadow: -8px 0 28px rgba(0, 0, 0, 0.18) !important;
        }

        body.elva-cart-open
        .elementor-element-2646698
        .shop_detail.elva-cart-drawer {
            pointer-events: auto !important;
            transform: translateX(0) !important;
        }

        .elementor-element-2646698
        .shop_detail.elva-cart-drawer::before,
        .elementor-element-2646698
        .shop_detail.elva-cart-drawer::after {
            display: none !important;
        }

        .elva-cart-overlay {
            position: fixed;
            inset: 0;
            z-index: 1000000;
            background: rgba(0, 0, 0, 0.48);
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
            transition:
                opacity 0.3s ease,
                visibility 0.3s ease;
        }

        body.elva-cart-open .elva-cart-overlay {
            opacity: 1;
            visibility: visible;
            pointer-events: auto;
        }

        body.elva-cart-open {
            overflow: hidden;
        }

        .elva-cart-close {
            position: absolute;
            top: 14px;
            left: 16px;
            width: 34px;
            height: 34px;
            padding: 0;
            border: 0;
            border-radius: 50%;
            background: #f2f3f5;
            color: #222;
            font-size: 25px;
            line-height: 34px;
            cursor: pointer;
            z-index: 2;
        }

        .elva-cart-close:hover {
            background: #e5e7eb;
        }

        .elva-cart-drawer .widget_shopping_cart_content {
            width: 100% !important;
            height: auto !important;
        }

        .elva-cart-drawer .woocommerce-mini-cart {
            max-height: none !important;
            overflow: visible !important;
        }

        @media (max-width: 767px) {
            .elementor-element-2646698 .shop_detail.elva-cart-drawer {
                width: min(360px, 94vw) !important;
                padding: 54px 16px 20px !important;
            }
        }
    </style>
    <?php
}, 100 );

add_action( 'wp_footer', function () {
    ?>
    <script id="elva-header-cart-sidebar-js">
        document.addEventListener('DOMContentLoaded', function () {
            const widget = document.querySelector(
                '.elementor-element-2646698 .elm_cart_s'
            );

            if (!widget) {
                return;
            }

            const trigger = widget.querySelector('.head_cart_total');
            const drawer  = widget.querySelector('.shop_detail');

            if (!trigger || !drawer) {
                return;
            }

            drawer.classList.add('elva-cart-drawer');

            let closeButton = drawer.querySelector('.elva-cart-close');

            if (!closeButton) {
                closeButton = document.createElement('button');
                closeButton.type = 'button';
                closeButton.className = 'elva-cart-close';
                closeButton.setAttribute('aria-label', 'بستن سبد خرید');
                closeButton.innerHTML = '&times;';
                drawer.prepend(closeButton);
            }

            let overlay = document.querySelector('.elva-cart-overlay');

            if (!overlay) {
                overlay = document.createElement('div');
                overlay.className = 'elva-cart-overlay';
                document.body.appendChild(overlay);
            }

           function openCart(event) {
    const currentTrigger = event.target.closest(
        '.elementor-element-2646698 .head_cart_total'
    );

    if (!currentTrigger) {
        return;
    }

    event.preventDefault();
    event.stopPropagation();

    document.body.classList.add('elva-cart-open');
    currentTrigger.setAttribute('aria-expanded', 'true');
}

            function closeCart() {
    document.body.classList.remove('elva-cart-open');

    const currentTrigger = document.querySelector(
        '.elementor-element-2646698 .head_cart_total'
    );

    if (currentTrigger) {
        currentTrigger.setAttribute('aria-expanded', 'false');
    }
}

document.addEventListener('click', openCart, true);
			closeButton.addEventListener('click', closeCart);
            overlay.addEventListener('click', closeCart);

            document.addEventListener('keydown', function (event) {
                if (event.key === 'Escape') {
                    closeCart();
                }
            });
        });
    </script>
    <?php
}, 100 );
