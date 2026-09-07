# Homepage Extendify CSS Optimization

Production optimization for removing the Redux Extendify utility stylesheet from the ELVA KALA homepage.

## Status

**Closed — Production / Passed**

The optimization is active on the production website and has passed functional and responsive regression testing.

## Problem

Chrome DevTools Coverage showed that the following stylesheet was loaded on the homepage:

```text
extendify-utilities.css
```

WordPress handle:

```text
redux-extendify-styles
```

Coverage results showed:

```text
Total size: 53,435 bytes
Unused bytes: 52,920 bytes
Unused CSS: approximately 99%
```

The stylesheet added unnecessary CSS transfer and processing to the homepage while providing almost no used styling.

## Solution

A WordPress snippet dequeues the stylesheet only on the public homepage:

```php
/**
 * ELVAKALA - Disable Extendify CSS on Homepage
 *
 * Removes Redux Extendify utilities CSS only from the homepage.
 */
function elva_disable_extendify_css_on_homepage() {
    if ( is_admin() || ! is_front_page() ) {
        return;
    }

    wp_dequeue_style( 'redux-extendify-styles' );
}

add_action(
    'wp_enqueue_scripts',
    'elva_disable_extendify_css_on_homepage',
    PHP_INT_MAX
);

add_action(
    'wp_print_styles',
    'elva_disable_extendify_css_on_homepage',
    PHP_INT_MAX
);
```

The executable snippet is stored at:

```text
/snippets/performance/disable-extendify-css-on-homepage.php
```

## Scope

The optimization applies only when:

```php
is_front_page()
```

It does not dequeue the stylesheet from:

* WordPress Admin
* Elementor editor screens
* Product pages
* Product archive pages
* Cart
* Checkout
* My Account
* Login pages
* Other frontend pages

## Validation

The production website was used with the optimization active before final closure.

Regression testing covered:

* Desktop homepage
* Responsive layouts
* Header and navigation
* Desktop and mobile menus
* Search
* Hero slider
* Product sliders
* Product cards
* Prices, icons, and buttons
* Footer
* Empty and populated carts
* Add-to-cart and remove-from-cart behavior
* Desktop cart sidebar
* Mobile cart behavior
* WooCommerce AJAX cart-fragment updates

No visual or functional regression was observed.

## Network Verification

After cache clearing and a full page reload, DevTools Network recorded 486 homepage requests.

Filtering for:

```text
extendify-utilities.css
```

returned zero requests, confirming that the stylesheet was no longer loaded.

<p align="center">
  <img src="./screenshots/extendify-css-not-loaded-network.png"
       alt="Network verification showing that Extendify CSS is not loaded"
       width="800">
</p>

## Lighthouse Result

The best recorded Lighthouse Mobile run after the optimization scored:

```text
Performance: 70
First Contentful Paint: 2.9 s
Largest Contentful Paint: 3.5 s
Total Blocking Time: 450 ms
Cumulative Layout Shift: 0
Speed Index: 5.9 s
```

Lighthouse scores may vary between runs because of server response time, network conditions, and CPU throttling. This result is retained as validation evidence and is not presented as proof that the complete score change was caused only by removing Extendify CSS.

<p align="center">
  <img src="./screenshots/lighthouse-mobile-after-extendify-score-70.png"
       alt="Lighthouse Mobile performance result after removing Extendify CSS"
       width="800">
</p>

## Result

The optimization removed approximately 53 KB of almost entirely unused CSS from the homepage without introducing a confirmed regression.

Final status:

```text
Homepage dequeue: PASS
Network verification: PASS
Desktop regression test: PASS
Responsive regression test: PASS
Cart and WooCommerce functionality: PASS
Production observation: PASS
```

## Rollback

To restore the Extendify stylesheet on the homepage:

1. Open the WPCode snippet manager.

2. Deactivate:

   ```text
   ELVA - Disable Extendify CSS on Homepage
   ```

3. Clear WordPress, server, CDN, and browser caches.

4. Reload the homepage.

5. Confirm that `extendify-utilities.css` appears in Network requests again.

No theme or plugin core files were modified.
