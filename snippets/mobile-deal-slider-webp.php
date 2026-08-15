<?php
/**
 * ELVA — Mobile Deal Slider WebP Optimization
 *
 * Converts JPG/PNG images used by the homepage mobile deal slider
 * to WebP and updates the rendered widget output accordingly.
 */

add_filter('elementor/widget/render_content', function ($widget_content, $widget) {

    /* Homepage only */
    if (!is_front_page()) {
        return $widget_content;
    }

    /* Target only the mobile deal slider widget */
    if ($widget->get_name() !== 'mobile-deal-slider-product') {
        return $widget_content;
    }

    $uploads = wp_upload_dir();

    $make_webp = function ($image_url) use ($uploads) {

        /* JPG / JPEG / PNG only */
        if (!preg_match('/\.(jpe?g|png)(\?.*)?$/i', $image_url)) {
            return $image_url;
        }

        /* Remove query string */
        $clean_url = strtok($image_url, '?');

        /* Process only local WordPress upload files */
        if (strpos($clean_url, $uploads['baseurl']) !== 0) {
            return $image_url;
        }

        $relative_path = substr(
            $clean_url,
            strlen($uploads['baseurl'])
        );

        $source_path =
            trailingslashit($uploads['basedir']) .
            ltrim(urldecode($relative_path), '/');

        if (!file_exists($source_path)) {
            return $image_url;
        }

        /* Generate WebP file path and URL */
        $webp_path = preg_replace(
            '/\.(jpe?g|png)$/i',
            '.webp',
            $source_path
        );

        $webp_url = preg_replace(
            '/\.(jpe?g|png)$/i',
            '.webp',
            $clean_url
        );

        /* Reuse existing WebP file */
        if (file_exists($webp_path)) {
            return $webp_url;
        }

        /* Create WebP image */
        $editor = wp_get_image_editor($source_path);

        if (is_wp_error($editor)) {
            return $image_url;
        }

        if (!$editor->supports_mime_type('image/webp')) {
            return $image_url;
        }

        /* WebP quality */
        $editor->set_quality(90);

        $saved = $editor->save(
            $webp_path,
            'image/webp'
        );

        if (is_wp_error($saved)) {
            return $image_url;
        }

        return $webp_url;
    };


    /* Modify only images rendered inside this widget */
    $processor = new WP_HTML_Tag_Processor($widget_content);

    while ($processor->next_tag('img')) {

        $src = $processor->get_attribute('src');

        if (!$src) {
            continue;
        }

        $webp_src = $make_webp($src);

        if ($webp_src === $src) {
            continue;
        }

        /* Replace the original image source with WebP */
        $processor->set_attribute('src', $webp_src);

        /*
         * The existing srcset points to JPG/PNG files.
         * Remove srcset and sizes to prevent the browser
         * from selecting the original image again.
         */
        $processor->remove_attribute('srcset');
        $processor->remove_attribute('sizes');
    }

    return $processor->get_updated_html();

}, 999, 2);
