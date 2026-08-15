<?php
/**
 * ELVA — Homepage LCP Preload
 *
 * Preloads the primary homepage hero image based on viewport width
 * and removes the unused Google Roboto stylesheet.
 */

/* =====================================
   Preload homepage LCP image
===================================== */

add_action('wp_head', function () {

    if (!is_front_page()) {
        return;
    }

    echo '<link rel="preload" as="image" href="https://elvakala.com/wp-content/uploads/2026/08/slider02-900x480-1.webp" media="(max-width: 767px)" fetchpriority="high">' . "\n";

    echo '<link rel="preload" as="image" href="https://elvakala.com/wp-content/uploads/2026/07/slider02.png" media="(min-width: 768px)" fetchpriority="high">' . "\n";

}, 1);


/* =====================================
   Remove unused Google Roboto stylesheet
===================================== */

add_action('wp_enqueue_scripts', function () {

    wp_dequeue_style('google-Roboto');
    wp_deregister_style('google-Roboto');

}, 999999);


add_action('wp_print_styles', function () {

    wp_dequeue_style('google-Roboto');
    wp_deregister_style('google-Roboto');

}, 999999);
