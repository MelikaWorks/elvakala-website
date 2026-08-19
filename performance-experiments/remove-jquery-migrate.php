add_action('wp_default_scripts', function ($scripts) {
    if (is_admin()) {
        return;
    }

    if (isset($scripts->registered['jquery'])) {
        $jquery = $scripts->registered['jquery'];

        if (!empty($jquery->deps)) {
            $jquery->deps = array_diff($jquery->deps, ['jquery-migrate']);
        }
    }
});
