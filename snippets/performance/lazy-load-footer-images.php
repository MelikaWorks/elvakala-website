add_filter('wp_get_attachment_image', function ($html, $attachment_id) {

    $lazy_image_ids = array(
        28556, // Elvakala footer logo
        28558  // National standard logo
    );

    if (!in_array((int) $attachment_id, $lazy_image_ids, true)) {
        return $html;
    }

    // Remove conflicting attributes if they already exist.
    $html = preg_replace('/\sloading=(["\']).*?\1/i', '', $html);
    $html = preg_replace('/\sfetchpriority=(["\']).*?\1/i', '', $html);
    $html = preg_replace('/\sdecoding=(["\']).*?\1/i', '', $html);

    // Add our final attributes directly to the <img>.
    $html = preg_replace(
        '/<img\b/i',
        '<img loading="lazy" decoding="async" fetchpriority="low"',
        $html,
        1
    );

    return $html;

}, 20, 2);
