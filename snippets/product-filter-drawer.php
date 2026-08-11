<?php
/**
 * Elvakala – Product Archive Filter Drawer
  * Version: 4.0
 *
 * محل اجرا:
 * WooCommerce Shop / Product Category / Product Taxonomy Archives
 */
/**
 * Elvakala – Product Archive Filter Drawer
  * Version: 4.0
 *
 * Runs on:
 * WooCommerce Shop / Product Category / Product Taxonomy Archives
 */

/* =========================================================
 * تشخیص صفحات آرشیو محصولات/Detect product archive pages
 * ======================================================= */

function elva_is_product_archive_page() {

    if (!function_exists('is_shop')) {
        return false;
    }

    return is_shop() || is_product_taxonomy();
}


/* =========================================================
 * دریافت دسته‌بندی‌های مناسب برای صفحه فعلی/Get the appropriate categories for the current page
 * ======================================================= */

function elva_get_drawer_categories() {

    if (!taxonomy_exists('product_cat')) {
        return array(
            'parent_category' => null,
            'categories'      => array(),
        );
    }

    $current_term    = get_queried_object();
    $parent_category = null;
    $parent_id       = 0;

    /*
     * صفحه یکی از دسته‌بندی‌های محصول/Current page is a product category archive
     */
 
    if (
        $current_term instanceof WP_Term &&
        $current_term->taxonomy === 'product_cat'
    ) {

        /*
         * ابتدا زیردسته‌های خود دسته فعلی را می‌گیریم.
         * hide_empty روی false است تا همه زیردسته‌ها نمایش داده شوند.
         */
        /*
        * First, get the child categories of the current category.
        * hide_empty is set to false to display all child categories.
        */
        $categories = get_terms(array(
            'taxonomy'   => 'product_cat',
            'parent'     => (int) $current_term->term_id,
            'hide_empty' => true,
            'orderby'    => 'menu_order',
            'order'      => 'ASC',
        ));

        /*
         * اگر دسته فعلی زیردسته داشته باشد:
         * خود دسته فعلی، دسته مادر لیست محسوب می‌شود.
         */
        /*
        * If the current category has child categories,
        * the current category is treated as the parent of the list.
        */
        if (
            !is_wp_error($categories) &&
            !empty($categories)
        ) {
            $parent_category = $current_term;

            return array(
                'parent_category' => $parent_category,
                'categories'      => $categories,
            );
        }

        /*
         * اگر دسته فعلی زیردسته نداشته باشد:
         * دسته مادر و دسته‌های هم‌سطح نمایش داده شوند.
         */
        /*
         * If the current category has no child categories,
        * display its parent category and sibling categories.
        */
        $parent_id = (int) $current_term->parent;

        if ($parent_id > 0) {
            $parent_category = get_term(
                $parent_id,
                'product_cat'
            );

            if (is_wp_error($parent_category)) {
                $parent_category = null;
            }
        }

        $categories = get_terms(array(
            'taxonomy'   => 'product_cat',
            'parent'     => $parent_id,
            'hide_empty' => false,
            'orderby'    => 'menu_order',
            'order'      => 'ASC',
        ));

        return array(
            'parent_category' => $parent_category,
            'categories'      => is_wp_error($categories)
                ? array()
                : $categories,
        );
    }

    /*
     * صفحه اصلی فروشگاه یا سایر آرشیوهای محصولات:
     * دسته‌های اصلی نمایش داده شوند.
     */
     /*
    * On the main shop page or other product archives,
    * display the top-level categories.
    */
    $categories = get_terms(array(
        'taxonomy'   => 'product_cat',
        'parent'     => 0,
        'hide_empty' => false,
        'orderby'    => 'menu_order',
        'order'      => 'ASC',
    ));

    return array(
        'parent_category' => null,
        'categories'      => is_wp_error($categories)
            ? array()
            : $categories,
    );
}


/* =========================================================
 * نمایش دسته‌بندی‌ها داخل پنل/Display categories inside the filter drawer
 * ======================================================= */

function elva_render_drawer_categories() {

    $category_data = elva_get_drawer_categories();

    $categories = isset($category_data['categories'])
        ? $category_data['categories']
        : array();

    $parent_category = isset($category_data['parent_category'])
        ? $category_data['parent_category']
        : null;

    $current_term = get_queried_object();

    if (
        empty($categories) &&
        !($parent_category instanceof WP_Term)
    ) {
        return;
    }
    ?>

    <section class="elva-drawer-categories">

        <h3 class="elva-drawer-categories-title">
            دسته‌بندی‌ها
        </h3>

        <?php if ($parent_category instanceof WP_Term) : ?>

            <?php
            $parent_link = get_term_link($parent_category);

            $is_parent_current = (
                $current_term instanceof WP_Term &&
                $current_term->taxonomy === 'product_cat' &&
                (int) $current_term->term_id ===
                (int) $parent_category->term_id
            );
            ?>

            <?php if (!is_wp_error($parent_link)) : ?>

                <a
                    href="<?php echo esc_url($parent_link); ?>"
                    class="elva-parent-category-card<?php echo $is_parent_current ? ' is-active' : ''; ?>"
                    <?php echo $is_parent_current ? 'aria-current="page"' : ''; ?>
                >
                    <span class="elva-parent-category-icon">
                        ←
                    </span>

                    <span>
                        همه محصولات
                        <?php echo esc_html($parent_category->name); ?>
                    </span>
                </a>

            <?php endif; ?>

        <?php endif; ?>

        <?php if (!empty($categories)) : ?>

            <div class="elva-drawer-category-list">

                <?php foreach ($categories as $category) : ?>

                    <?php
                    $category_link = get_term_link($category);

                    if (is_wp_error($category_link)) {
                        continue;
                    }

                    $is_current = (
                        $current_term instanceof WP_Term &&
                        $current_term->taxonomy === 'product_cat' &&
                        (int) $current_term->term_id ===
                        (int) $category->term_id
                    );
                    ?>

                    <a
                        href="<?php echo esc_url($category_link); ?>"
                        class="category-card<?php echo $is_current ? ' is-active' : ''; ?>"
                        <?php echo $is_current ? 'aria-current="page"' : ''; ?>
                    >
                        <span class="category-title">
                            <?php echo esc_html($category->name); ?>
                        </span>
                    </a>

                <?php endforeach; ?>

            </div>

        <?php endif; ?>

    </section>

    <?php
}


/* =========================================================
 * دکمه فیلتر بالای محصولات / Product filter button above the product list
 * ======================================================= */

add_action('woocommerce_before_shop_loop', function () {

    if (!elva_is_product_archive_page()) {
        return;
    }
    ?>

    <button
        type="button"
        id="elva-filter-open"
        class="elva-filter-open"
        aria-controls="elva-filter-drawer"
        aria-expanded="false"
    >
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
        >
            <path d="M4 7h16M7 12h10M10 17h4"></path>
        </svg>

        <span>فیلتر محصولات</span>
    </button>

    <?php
}, 5);


/* =========================================================
 * ساخت پنل کشویی/Build the filter drawer
 * ======================================================= */

add_action('wp_footer', function () {

    if (!elva_is_product_archive_page()) {
        return;
    }
    ?>

    <div
        id="elva-filter-overlay"
        class="elva-filter-overlay"
        aria-hidden="true"
    ></div>

    <aside
        id="elva-filter-drawer"
        class="elva-filter-drawer"
        role="dialog"
        aria-modal="true"
        aria-hidden="true"
        aria-labelledby="elva-filter-title"
        tabindex="-1"
    >

        <div class="elva-filter-header">

            <strong id="elva-filter-title">
                فیلتر محصولات
            </strong>

            <button
                type="button"
                id="elva-filter-close"
                class="elva-filter-close"
                aria-label="بستن فیلتر محصولات"
            >
                <span aria-hidden="true">×</span>
            </button>

        </div>

        <div class="elva-filter-content">

            <?php elva_render_drawer_categories(); ?>

            <?php
            if (class_exists('WooCommerce')) {

                $widget_args = array(
                    'before_widget' => '<section class="elva-filter-widget">',
                    'after_widget'  => '</section>',
                    'before_title'  => '<h3 class="elva-filter-widget-title">',
                    'after_title'   => '</h3>',
                );


                /*
                 * فیلترهای فعال/  Active filters
                 */
             
                if (class_exists('WC_Widget_Layered_Nav_Filters')) {
                    the_widget(
                        'WC_Widget_Layered_Nav_Filters',
                        array(
                            'title' => 'فیلترهای فعال',
                        ),
                        $widget_args
                    );
                }


                /*
                 * فیلتر قیمت /Price filter
                 */
                if (class_exists('WC_Widget_Price_Filter')) {
                    the_widget(
                        'WC_Widget_Price_Filter',
                        array(
                            'title' => 'محدوده قیمت',
                        ),
                        $widget_args
                    );
                }


                /*
                 * ساخت خودکار فیلتر برای ویژگی‌های ووکامرس  /Automatically generate filters for WooCommerce attributes
                 */
             
                if (
                    class_exists('WC_Widget_Layered_Nav') &&
                    function_exists('wc_get_attribute_taxonomies')
                ) {
                    $attributes = wc_get_attribute_taxonomies();

                    foreach ($attributes as $attribute) {

                        $taxonomy = wc_attribute_taxonomy_name(
                            $attribute->attribute_name
                        );

                        if (!taxonomy_exists($taxonomy)) {
                            continue;
                        }

                        /*
                         * ویژگی‌هایی که هیچ مقدار ثبت‌شده‌ای ندارند
                         * داخل پنل ساخته نمی‌شوند.
                         */
                        /*
                        * Attributes with no registered values
                        * are not displayed in the filter drawer.
                        */
                        $attribute_terms = get_terms(array(
                            'taxonomy'   => $taxonomy,
                            'hide_empty' => true,
                            'number'     => 1,
                            'fields'     => 'ids',
                        ));

                        if (
                            empty($attribute_terms) ||
                            is_wp_error($attribute_terms)
                        ) {
                            continue;
                        }

                        the_widget(
                            'WC_Widget_Layered_Nav',
                            array(
                                'title'        => $attribute->attribute_label,
                                'attribute'    => $attribute->attribute_name,
                                'display_type' => 'list',
                                'query_type'   => 'and',
                            ),
                            $widget_args
                        );
                    }
                }

            } else {
                echo '<p class="elva-filter-message">ووکامرس در دسترس نیست.</p>';
            }
            ?>

        </div>

    </aside>

    <?php
}, 20);


/* =========================================================
 * CSS
 * ======================================================= */

add_action('wp_head', function () {

    if (!elva_is_product_archive_page()) {
        return;
    }
    ?>

    <style id="elva-product-filter-style">

        /* =====================================
           دکمه بازکردن فیلتر/Filter open button
        ===================================== */

        .elva-filter-open {
            display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    min-height: 42px;
    margin: 0 0 16px;
    padding: 10px 18px;
    border: 1px solid #034A73;
    border-radius: 10px;
    background: #034A73;
    color: #fff !important;
    font-family: inherit;
    font-size: 14px;
    font-weight: 700;
    line-height: 1;
    cursor: pointer;
    transition:
        background-color .2s ease,
        border-color .2s ease,
        transform .2s ease;
        }

        .elva-filter-open:hover {
            background: #023A5A;
    border-color: #023A5A;
    transform: translateY(-1px);
        }

        .elva-filter-open:focus-visible {
            outline: 3px solid rgba(25, 118, 210, .25);
            outline-offset: 3px;
        }

        .elva-filter-open span {
            color: inherit !important;
        }

        .elva-filter-open svg {
            width: 20px;
            height: 20px;
            flex: 0 0 auto;
            fill: none;
            stroke: currentColor;
            stroke-width: 1.8;
            stroke-linecap: round;
        }


        /* =====================================
           لایه تیره پشت پنل/ Dark overlay behind the filter drawer
        ===================================== */

        .elva-filter-overlay {
            position: fixed;
            inset: 0;
            z-index: 999998;
            visibility: hidden;
            opacity: 0;
            background: rgba(0, 0, 0, .45);
            pointer-events: none;
            transition:
                opacity .25s ease,
                visibility .25s ease;
        }

        .elva-filter-overlay.is-open {
            visibility: visible;
            opacity: 1;
            pointer-events: auto;
        }


        /* =====================================
           پنل کشویی/  Filter drawer
        ===================================== */

        .elva-filter-drawer {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            z-index: 999999;
            display: flex !important;
            flex-direction: column;
            width: min(390px, 92vw);
            max-width: 100%;
            height: 100%;
            height: 100dvh;
            margin: 0 !important;
            padding: 0;
            overflow: hidden;
            visibility: hidden;
            background: #fff;
            box-shadow: -10px 0 40px rgba(3,74,115,.10), 0 0 10px rgba(0,0,0,.06);
            transform: translateX(105%);
            pointer-events: none;
            transition:
                transform .3s ease,
                visibility .3s ease;
        }

        .elva-filter-drawer.is-open {
            visibility: visible;
            transform: translateX(0);
            pointer-events: auto;
        }


        /* =====================================
           سربرگ پنل/Filter drawer header
        ===================================== */

        .elva-filter-header {
            display: flex;
            flex: 0 0 auto;
            align-items: center;
            justify-content: space-between;
            min-height: 64px;
            padding: 12px 20px;
            border-bottom: 1px solid #eee;
            background: #fff;
        }

        .elva-filter-header strong {
            color: #222;
            font-size: 17px;
            font-weight: 700;
        }

        .elva-filter-close {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 36px;
            height: 36px;
            flex: 0 0 auto;
            padding: 0;
            border: 0;
            border-radius: 50%;
            background: #034A73;
            color: #fff !important;
            font-family: Arial, sans-serif;
            font-size: 25px;
            line-height: 1;
            cursor: pointer;
            transition:
                background-color .2s ease,
                transform .2s ease;
        }

        .elva-filter-close:hover {
            background: #023A5A;
            transform: rotate(5deg);
        }

        .elva-filter-close:focus-visible {
            outline: 3px solid rgba(25, 118, 210, .25);
            outline-offset: 2px;
        }


        /* =====================================
           محتوای پنل/Filter drawer content
        ===================================== */

        .elva-filter-content {
            flex: 1 1 auto;
            min-height: 0;
            padding: 20px;
            overflow-x: hidden;
            overflow-y: auto;
            direction: rtl;
            overscroll-behavior: contain;
            -webkit-overflow-scrolling: touch;
        }

        .elva-filter-widget {
            margin: 0 0 26px;
        }

        .elva-filter-widget:last-child {
            margin-bottom: 0;
        }

        .elva-filter-widget-title,
        .elva-filter-content .widget-title,
        .elva-filter-content .wp-block-heading,
        .elva-filter-content h2,
        .elva-filter-content h3 {
            margin: 0 0 14px;
            color: #222;
            font-size: 15px;
            font-weight: 700;
            line-height: 1.6;
        }

        .elva-filter-content ul {
            margin: 0;
            padding: 0;
            list-style: none;
        }

        .elva-filter-content li {
            margin: 0 0 8px;
        }

        .elva-filter-content li:last-child {
            margin-bottom: 0;
        }

        .elva-filter-message {
            margin: 0;
            color: #666;
            font-size: 14px;
        }


        /* =====================================
           دسته‌بندی‌ها/ Category
        ===================================== */

        .elva-drawer-categories {
            margin: 0 0 30px;
        }

        .elva-drawer-categories-title {
            margin: 0 0 14px !important;
            color: #222;
            font-size: 16px !important;
            font-weight: 700;
        }
.elva-parent-category-card {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 7px !important;
    width: 100% !important;
    min-height: 44px !important;
    margin: 0 0 10px !important;
    padding: 9px 12px !important;
    border: 1px solid #034A73 !important;
    border-radius: 10px !important;
    background: #f2f8ff !important;
    color: #034A73 !important;
    box-sizing: border-box !important;
    font-size: 13px !important;
    font-weight: 700 !important;
    line-height: 1.5 !important;
    text-align: center !important;
    text-decoration: none !important;
    transition:
        background-color .2s ease,
        color .2s ease,
        transform .2s ease;
}

.elva-parent-category-card:hover,
.elva-parent-category-card.is-active,
.elva-parent-category-card[aria-current="page"] {
    background: #034A73 !important;
    color: #fff !important;
    transform: translateY(-1px);
}

.elva-parent-category-icon {
    color: inherit !important;
    font-size: 17px !important;
    line-height: 1 !important;
}
        .elva-drawer-category-list {
            display: grid !important;
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: 9px !important;
            width: 100% !important;
        }

        .elva-drawer-category-list .category-card {
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            min-width: 0 !important;
            min-height: 42px !important;
            margin: 0 !important;
            padding: 8px 9px !important;
            border: 1px solid #e2e5e9 !important;
            border-radius: 10px !important;
            background: #fff !important;
            box-shadow: none !important;
            box-sizing: border-box !important;
            color: #333 !important;
            text-decoration: none !important;
            transition:
                background-color .2s ease,
                border-color .2s ease,
                transform .2s ease;
        }

        .elva-drawer-category-list .category-title {
            display: block !important;
            width: 100% !important;
            margin: 0 !important;
            color: inherit !important;
            font-size: 12.5px !important;
            font-weight: 500 !important;
            line-height: 1.55 !important;
            text-align: center !important;
            white-space: normal !important;
            overflow: visible !important;
            text-overflow: clip !important;
            overflow-wrap: break-word !important;
        }

        .elva-drawer-category-list .category-card:hover {
            border-color: #034A73 !important;
            background: #f2f8ff !important;
            color: #034A73 !important;
            transform: translateY(-1px);
        }

        .elva-drawer-category-list .category-card:focus-visible {
            outline: 3px solid rgba(25, 118, 210, .2);
            outline-offset: 2px;
        }

        .elva-drawer-category-list .category-card.is-active,
        .elva-drawer-category-list .category-card[aria-current="page"] {
            border-color: #034A73 !important;
            background: #034A73 !important;
            color: #fff !important;
        }


        /* =====================================
           فیلترهای فعال / َActives Filters
        ===================================== */

        .elva-filter-content
        .woocommerce-widget-layered-nav-list__item--chosen a::before,
        .elva-filter-content
        .chosen a::before {
            color: inherit !important;
        }


        /* =====================================
           فیلتر قیمت / Price filter
        ===================================== */

        /* =====================================
        فیلتر قیمت  /Price filter
        ===================================== */

.elva-filter-content .price_slider_wrapper {
    width: 100%;
}

.elva-filter-content .price_slider {
    width: calc(100% - 12px);
    margin: 10px auto 22px;
}


/* باکس کلی قیمت‌ها و دکمه */
/* Overall price container and button */
.elva-filter-content .price_slider_amount {
    display: flex !important;
    flex-wrap: wrap !important;
    gap: 10px !important;
    width: 100% !important;
    text-align: right !important;
}

/*===========================*/
/* ردیف نمایش بازه قیمت */
/* Price range display row */
.elva-filter-content .price_slider_amount .price_label {
    display: flex !important;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 6px;
    order: 1;
    width: 100% !important;
    margin: 0 !important;
    padding: 12px 10px;
    border: 1px solid #e2e5e9;
    border-radius: 10px;
    background: #fff;
    color: #555 !important;
    box-sizing: border-box;
    font-size: 13px !important;
    line-height: 1.8 !important;
    text-align: center;
	
}

/* عددهای قیمت */
/* Price values */
.elva-filter-content .price_slider_amount .price_label .from,
.elva-filter-content .price_slider_amount .price_label .to {
    display: inline !important;
    width: auto !important;
    min-width: 0 !important;
    min-height: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
    border: 0 !important;
    border-radius: 0 !important;
    background: transparent !important;
    color: #034A73 !important;
    font-size: 13px !important;
    font-weight: 700;
    line-height: inherit !important;
	
}

/* متن خواناتر برای بازه */
/* More readable price range text */
.elva-filter-content .price_slider_amount .price_label::before {
    content: "از";
    color: #555;
    font-size: 12px;
    font-weight: 500;
}

.elva-filter-content .price_slider_amount .price_label .from::after {
    content: " تا ";
    margin: 0 5px;
    color: #555;
    font-size: 12px;
    font-weight: 500;
}

		
		
		
/*===========================*/		
		
/* دکمه صافی تمام‌عرض */
/* Full-width filter button */
.elva-filter-content .price_slider_amount button,
.elva-filter-content .price_slider_amount .button {
    display: flex !important;
    align-items: center;
    justify-content: center;
    order: 2;
    width: 100% !important;
    min-width: 100% !important;
    min-height: 42px;
    margin: 0 !important;
    padding: 9px 15px !important;
    border: 1px solid #034A73 !important;
    border-radius: 10px !important;
    background: #034A73 !important;
    color: #fff !important;
    box-sizing: border-box;
    font-family: inherit;
    font-size: 13px;
    font-weight: 700;
    line-height: 1.4;
    text-align: center;
    cursor: pointer;
    box-shadow: none !important;
}

.elva-filter-content .price_slider_amount button:hover,
.elva-filter-content .price_slider_amount .button:hover {
    border-color: #4E7D9A !important;
    background: #4E7D9A !important;
    color: #fff !important;
}


/* حذف فضای خالی ووکامرس */
/* Remove WooCommerce empty spacing */
.elva-filter-content .price_slider_amount .clear {
    display: none !important;
}


/* رنگ نوار قیمت */
 /* Price slider color */
.elva-filter-content .ui-slider .ui-slider-range {
    background: #034A73 !important;
}

.elva-filter-content .ui-slider .ui-slider-handle {
    width: 16px;
    height: 16px;
    margin-top: -2px;
    border: 2px solid #fff !important;
    border-radius: 50%;
    background: #034A73 !important;
    box-shadow: 0 1px 5px rgba(3, 74, 115, .25);
}


        /* =====================================
           فیلتر ویژگی‌ها /  Attribute filters
        ===================================== */

        .elva-filter-content
        .woocommerce-widget-layered-nav-list__item a,
        .elva-filter-content
        .wc-layered-nav-term a {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            min-height: 40px;
            padding: 9px 12px;
            border: 1px solid #e5e5e5;
            border-radius: 7px;
            background: #fff;
            color: #222 !important;
            text-decoration: none !important;
            box-sizing: border-box;
            transition:
                border-color .2s ease,
                background-color .2s ease,
                color .2s ease;
        }

        .elva-filter-content
        .woocommerce-widget-layered-nav-list__item a:hover,
        .elva-filter-content
        .wc-layered-nav-term a:hover {
            border-color: #034A73;
            background: #f2f8ff;
            color: #034A73 !important;
        }

        .elva-filter-content
        .woocommerce-widget-layered-nav-list__item.chosen a,
        .elva-filter-content
        .woocommerce-widget-layered-nav-list__item--chosen a,
        .elva-filter-content
        .wc-layered-nav-term.chosen a {
            border-color: #034A73;
            background: #034A73;
            color: #fff !important;
        }

        .elva-filter-content
        .woocommerce-widget-layered-nav-list__item.chosen a *,
        .elva-filter-content
        .woocommerce-widget-layered-nav-list__item--chosen a *,
        .elva-filter-content
        .wc-layered-nav-term.chosen a * {
            color: #fff !important;
        }

        .elva-filter-content .count {
            margin-right: 6px;
            color: inherit !important;
            opacity: .7;
        }


        /* =====================================
           اسکرول و قفل صفحه  /   Scrolling and page locking
        ===================================== */

        .elva-filter-content::-webkit-scrollbar {
            width: 6px;
        }

        .elva-filter-content::-webkit-scrollbar-track {
            background: transparent;
        }

        .elva-filter-content::-webkit-scrollbar-thumb {
            border-radius: 10px;
            background: #ccc;
        }

        body.elva-filter-lock {
            overflow: hidden !important;
            touch-action: none;
        }


        /* =====================================
           دسته‌بندی بالای آرشیو مخفی شود  /  Hide categories above the product archive
        ===================================== */

        .bk_category_list.is_dynamic.is_top {
            display: none !important;
        }


        /* =====================================
           موبایل  / Mobile
        ===================================== */

        @media (max-width: 767px) {

            .elva-filter-open {
                width: 100%;
                margin-bottom: 14px;
            }

            .elva-filter-drawer {
                width: 92vw;
            }

            .elva-filter-header {
                min-height: 58px;
                padding: 10px 15px;
            }

            .elva-filter-content {
                padding: 16px;
            }
        }

        @media (max-width: 360px) {

            .elva-drawer-category-list {
                grid-template-columns: 1fr !important;
            }
        }


        /* =====================================
           کاهش انیمیشن برای تنظیمات دسترسی  /   Reduce animations for accessibility preferences
        ===================================== */

        @media (prefers-reduced-motion: reduce) {

            .elva-filter-open,
            .elva-filter-close,
            .elva-filter-overlay,
            .elva-filter-drawer,
            .elva-drawer-category-list .category-card {
                transition: none !important;
            }
        }
		
		#elva-filter-open {
    background-color: #034A73 !important;
    border-color: #034A73 !important;
    color: #fff !important;
}

#elva-filter-open:hover {
    background-color: #023A5A !important;
    border-color: #023A5A !important;
    color: #fff !important;
}

#elva-filter-open:focus,
#elva-filter-open:focus-visible {
    background-color: #034A73 !important;
    border-color: #034A73 !important;
    color: #fff !important;
    outline: 3px solid rgba(3, 74, 115, .25);
}
		#elva-filter-open:hover{
    background:#4E7D9A !important;
    border-color:#4E7D9A !important;
}
#elva-filter-close,
.elva-filter-close{
    background-color:#034A73 !important;
    border-color:#034A73 !important;
    color:#fff !important;
}

#elva-filter-close:hover,
.elva-filter-close:hover{
    background-color:#4E7D9A !important;
    border-color:#4E7D9A !important;
    color:#fff !important;
    transform:rotate(5deg);
}
    </style>

    <?php
});


/* =========================================================
 * JavaScript
 * ======================================================= */

add_action('wp_footer', function () {

    if (!elva_is_product_archive_page()) {
        return;
    }
    ?>

    <script id="elva-product-filter-script">

        document.addEventListener('DOMContentLoaded', function () {

            const openButton  = document.getElementById('elva-filter-open');
            const closeButton = document.getElementById('elva-filter-close');
            const drawer      = document.getElementById('elva-filter-drawer');
            const overlay     = document.getElementById('elva-filter-overlay');

            if (
                !openButton ||
                !closeButton ||
                !drawer ||
                !overlay
            ) {
                return;
            }

            let previousActiveElement = null;


            function openDrawer() {

                previousActiveElement = document.activeElement;

                drawer.classList.add('is-open');
                overlay.classList.add('is-open');
                document.body.classList.add('elva-filter-lock');

                drawer.setAttribute('aria-hidden', 'false');
                overlay.setAttribute('aria-hidden', 'false');
                openButton.setAttribute('aria-expanded', 'true');

                window.requestAnimationFrame(function () {
                    closeButton.focus();
                });
            }


            function closeDrawer() {

                drawer.classList.remove('is-open');
                overlay.classList.remove('is-open');
                document.body.classList.remove('elva-filter-lock');

                drawer.setAttribute('aria-hidden', 'true');
                overlay.setAttribute('aria-hidden', 'true');
                openButton.setAttribute('aria-expanded', 'false');

                if (
                    previousActiveElement &&
                    typeof previousActiveElement.focus === 'function'
                ) {
                    previousActiveElement.focus();
                }
            }


            function isDrawerOpen() {
                return drawer.classList.contains('is-open');
            }


            function keepFocusInsideDrawer(event) {

                if (
                    event.key !== 'Tab' ||
                    !isDrawerOpen()
                ) {
                    return;
                }

                const focusableElements = drawer.querySelectorAll(
                    'a[href], button:not([disabled]), input:not([disabled]), ' +
                    'select:not([disabled]), textarea:not([disabled]), ' +
                    '[tabindex]:not([tabindex="-1"])'
                );

                if (!focusableElements.length) {
                    event.preventDefault();
                    drawer.focus();
                    return;
                }

                const firstElement =
                    focusableElements[0];

                const lastElement =
                    focusableElements[focusableElements.length - 1];

                if (
                    event.shiftKey &&
                    document.activeElement === firstElement
                ) {
                    event.preventDefault();
                    lastElement.focus();
                } else if (
                    !event.shiftKey &&
                    document.activeElement === lastElement
                ) {
                    event.preventDefault();
                    firstElement.focus();
                }
            }


            openButton.addEventListener('click', openDrawer);
            closeButton.addEventListener('click', closeDrawer);
            overlay.addEventListener('click', closeDrawer);


            document.addEventListener('keydown', function (event) {

                if (
                    event.key === 'Escape' &&
                    isDrawerOpen()
                ) {
                    closeDrawer();
                    return;
                }

                keepFocusInsideDrawer(event);
            });


            /*
             * هنگام رفتن به صفحه دیگر با کلیک روی دسته‌بندی،
             * پنل بسته می‌شود تا ظاهر صفحه گیر نکند.
             */
          /*
          * When navigating to another page by clicking a category,
          * close the drawer to prevent the page layout from getting stuck.
          */
            drawer.addEventListener('click', function (event) {

                const categoryLink = event.target.closest(
                    '.elva-drawer-category-list a'
                );

                if (categoryLink) {
                    document.body.classList.remove('elva-filter-lock');
                }
            });

        });

    </script>

    <?php
}, 100);
  
