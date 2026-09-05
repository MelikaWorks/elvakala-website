/**
 * ELVAKALA - DenaPay Category Based Plans
 *
 * EXPERIMENTAL / DISABLED
 *
 * Initial approach for extending DenaPay's default installment plans
 * with per-plan category scope.
 *
 * This implementation added:
 * - A scope selector to each installment plan
 * - Category selection for category-specific plans
 * - Backward compatibility by keeping existing plans global
 *
 * This approach was later abandoned because extending DenaPay's
 * global plan settings did not provide reliable per-product plan
 * isolation and persistence throughout the purchase flow.
 *
 * The final architecture uses ELVA-managed rules and synchronizes
 * product-specific DenaPay installment plans instead.
 *
 * Preserved here as part of the development and debugging history.
 */

add_filter( 'csf_dena_pay_settings_sections', function ( $sections ) {

    foreach ( $sections as &$section ) {

        if ( empty( $section['fields'] ) || ! is_array( $section['fields'] ) ) {
            continue;
        }

        foreach ( $section['fields'] as &$field ) {

            if (
                empty( $field['id'] ) ||
                $field['id'] !== 'default_installment_plans' ||
                empty( $field['fields'] ) ||
                ! is_array( $field['fields'] )
            ) {
                continue;
            }

            $has_scope_field       = false;
            $has_categories_field  = false;

            foreach ( $field['fields'] as $plan_field ) {

                if ( empty( $plan_field['id'] ) ) {
                    continue;
                }

                if ( $plan_field['id'] === 'elva_plan_scope' ) {
                    $has_scope_field = true;
                }

                if ( $plan_field['id'] === 'elva_categories' ) {
                    $has_categories_field = true;
                }
            }

            if ( $has_scope_field && $has_categories_field ) {
                continue;
            }

            $new_fields = array();

            foreach ( $field['fields'] as $plan_field ) {

                $new_fields[] = $plan_field;

                if (
                    ! empty( $plan_field['id'] ) &&
                    $plan_field['id'] === 'title'
                ) {

                    if ( ! $has_scope_field ) {

                        $new_fields[] = array(
                            'id'       => 'elva_plan_scope',
                            'type'     => 'select',
                            'title'    => 'حوزه اجرای این طرح',
                            'subtitle' => 'مشخص کنید این طرح عمومی باشد یا فقط برای دسته‌های خاص اجرا شود.',
                            'options'  => array(
                                'global' => 'عمومی — برای همه محصولات مشمول اقساط',
                                'specific_categories' => 'فقط برای دسته‌های خاص',
                            ),
                            'default'  => 'global',
                        );
                    }

                    if ( ! $has_categories_field ) {

                        $new_fields[] = array(
                            'id'          => 'elva_categories',
                            'type'        => 'select',
                            'title'       => 'دسته‌های این طرح',
                            'subtitle'    => 'این طرح فقط برای محصولات دسته‌های انتخاب‌شده استفاده خواهد شد.',
                            'placeholder' => 'دسته‌ها را انتخاب کنید',
                            'chosen'      => true,
                            'multiple'    => true,
                            'options'     => 'denapay_get_woocommerce_categories',
                            'dependency'  => array(
                                'elva_plan_scope',
                                '==',
                                'specific_categories'
                            ),
                        );
                    }
                }
            }

            $field['fields'] = $new_fields;
        }

        unset( $field );
    }

    unset( $section );

    return $sections;

}, 20 );
