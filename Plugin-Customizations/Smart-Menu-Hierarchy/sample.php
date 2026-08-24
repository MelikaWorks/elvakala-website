<?php
/**
 * Smart Menu Hierarchy - Sample Implementation
 *
 * Project: Elvakala Website
 *
 * This file contains a limited example of the Smart Menu Hierarchy
 * prototype used for managing WooCommerce navigation sources.
 *
 * The complete implementation, including automatic hierarchy management,
 * menu synchronization and branch-management logic, is maintained
 * separately.
 */

defined( 'ABSPATH' ) || exit;


/**
 * Display Smart Menu sources on Appearance > Menus.
 */
add_action( 'admin_footer-nav-menus.php', function () {

    if ( ! current_user_can( 'edit_theme_options' ) ) {
        return;
    }

    /*
     * WooCommerce taxonomy sources used by the prototype.
     */
    $taxonomies = array(
        'product_cat'   => 'Product Categories',
        'product_brand' => 'Product Brands',
    );

    $sources = array();

    foreach ( $taxonomies as $taxonomy => $label ) {

        if ( ! taxonomy_exists( $taxonomy ) ) {
            continue;
        }

        $terms = get_terms(
            array(
                'taxonomy'   => $taxonomy,
                'hide_empty' => false,
            )
        );

        if ( is_wp_error( $terms ) ) {
            continue;
        }

        $sources[ $taxonomy ] = array(
            'label' => $label,

            'terms' => array_map(
                function ( $term ) {

                    return array(
                        'id'     => (int) $term->term_id,
                        'name'   => $term->name,
                        'parent' => (int) $term->parent,
                    );
                },
                $terms
            ),
        );
    }

    ?>

    <style>
        #smh-sample {
            margin-top: 12px;
        }

        #smh-sample .smh-source {
            margin-bottom: 12px;
            border: 1px solid #dcdcde;
            background: #fff;
        }

        #smh-sample .smh-source-title {
            padding: 10px 12px;
            font-weight: 600;
            background: #f6f7f7;
            border-bottom: 1px solid #dcdcde;
        }

        #smh-sample .smh-source-body {
            padding: 10px 12px;
            max-height: 280px;
            overflow-y: auto;
        }

        #smh-sample ul {
            margin: 0;
        }

        #smh-sample ul ul {
            margin-left: 18px;
        }
    </style>

    <script>
    jQuery(function ($) {

        const sources = <?php echo wp_json_encode( $sources ); ?>;

        function escapeHtml(text) {
            return $('<div>').text(text).html();
        }

        /*
         * Render hierarchical taxonomy terms.
         *
         * Note:
         * The production implementation contains additional logic
         * for menu hierarchy management and automatic placement.
         */
        function buildTree(terms, parentId = 0, taxonomy = '') {

            const children = terms.filter(
                term => term.parent === parentId
            );

            if (!children.length) {
                return '';
            }

            let html = '<ul>';

            children.forEach(term => {

                html += `
                    <li>
                        <label>
                            <input
                                type="checkbox"
                                data-term-id="${term.id}"
                                data-taxonomy="${taxonomy}"
                            >

                            ${escapeHtml(term.name)}
                        </label>

                        ${buildTree(
                            terms,
                            term.id,
                            taxonomy
                        )}
                    </li>
                `;
            });

            html += '</ul>';

            return html;
        }


        let html = `
            <div id="smh-sample" class="postbox">

                <div class="postbox-header">
                    <h2 class="hndle">
                        Smart Menu
                    </h2>
                </div>

                <div class="inside">
        `;


        Object.entries(sources).forEach(
            ([taxonomy, source]) => {

                html += `
                    <div class="smh-source">

                        <div class="smh-source-title">
                            ${escapeHtml(source.label)}
                        </div>

                        <div class="smh-source-body">
                            ${buildTree(
                                source.terms,
                                0,
                                taxonomy
                            )}
                        </div>

                    </div>
                `;
            }
        );


        html += `
                </div>
            </div>
        `;


        $('#nav-menus-frame .metabox-holder')
            .first()
            .prepend(html);

    });
    </script>

    <?php
});
