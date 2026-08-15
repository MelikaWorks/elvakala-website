<?php
/**
 * ELVA — Homepage Category Image Sizes
 *
 * Sets responsive sizes attributes for selected homepage category images
 * so browsers can choose more appropriate image sources from srcset.
 */

add_filter('elementor/frontend/the_content', function ($content) {

    if (!is_front_page()) {
        return $content;
    }

    /* Homepage category image attachment IDs */
    $category_image_ids = [
        28542, // All Categories — WebP
        27603, // Heating Systems
        28545, // Cooling Systems — WebP
        27601, // Kitchen
        27597, // Sanitary Ware
        27598, // Faucets
        28548, // Water Pumps
        28549, // Water Purification
        28550, // Pool Equipment
        28551, // Parts
    ];

    $processor = new WP_HTML_Tag_Processor($content);

    while ($processor->next_tag('img')) {

        $class = $processor->get_attribute('class');

        if (!$class) {
            continue;
        }

        foreach ($category_image_ids as $id) {

            if (strpos($class, 'wp-image-' . $id) !== false) {

                $processor->set_attribute(
                    'sizes',
                    '(max-width: 767px) 107px, (max-width: 770px) 180px, calc(10vw - 20px)'
                );

                break;
            }
        }
    }

    return $processor->get_updated_html();

}, 999);
